import "server-only";

/**
 * Single source of truth for the preview/full switch (ported from the raresg-v1 pattern).
 * Nothing else may read SITE_MODE or PREVIEW_* from process.env.
 *
 *  - Deployment mode (getSiteMode / isPreview): fixed per deployment. Drives robots, sitemap,
 *    llms.txt, noindex, JSON-LD and the preview chrome. Unset = "full", so the real site stays zero-config.
 *  - Content access (getContentAccess): per request. In a preview deployment, a visitor with a valid
 *    unlock cookie sees full content, but the deployment stays noindex for everyone.
 */

export type SiteMode = "preview" | "full";

export function getSiteMode(): SiteMode {
  return process.env.SITE_MODE?.trim().toLowerCase() === "preview" ? "preview" : "full";
}

export const isPreview: boolean = getSiteMode() === "preview";

// ---------------------------------------------------------------- unlock cookie

export const UNLOCK_COOKIE = "al_unlock";
export const UNLOCK_TTL_SECONDS = 60 * 60 * 4; // one working session

function unlockCode(): string | null {
  const code = process.env.PREVIEW_UNLOCK_CODE?.trim();
  return code ? code : null;
}

export function unlockEnabled(): boolean {
  return getSiteMode() === "preview" && unlockCode() !== null;
}

// Web Crypto HMAC so the same code runs in the proxy and in server components.
async function hmac(message: string): Promise<string> {
  const secret = `${process.env.PREVIEW_COOKIE_SECRET ?? ""}:${unlockCode()}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message)));
  return btoa(String.fromCharCode(...sig)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** True when `candidate` matches PREVIEW_UNLOCK_CODE (constant-time). */
export function checkUnlockCode(candidate: string | null | undefined): boolean {
  const code = unlockCode();
  return !!code && !!candidate && safeEqual(candidate, code);
}

/** Cookie value: `<expiryEpochSeconds>.<hmac>`. */
export async function createUnlockToken(now = Date.now()): Promise<string> {
  const exp = Math.floor(now / 1000) + UNLOCK_TTL_SECONDS;
  return `${exp}.${await hmac(String(exp))}`;
}

export async function verifyUnlockToken(token: string | null | undefined, now = Date.now()): Promise<boolean> {
  if (!unlockEnabled() || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) * 1000 < now) return false;
  return safeEqual(sig, await hmac(exp));
}

/**
 * What the current request may see. In full mode (and in preview without an unlock code)
 * this never touches cookies, so those pages stay statically generated.
 */
export async function getContentAccess(): Promise<SiteMode> {
  if (getSiteMode() === "full") return "full";
  if (!unlockEnabled()) return "preview";
  const { cookies } = await import("next/headers");
  const token = (await cookies()).get(UNLOCK_COOKIE)?.value;
  return (await verifyUnlockToken(token)) ? "full" : "preview";
}
