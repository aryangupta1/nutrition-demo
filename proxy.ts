import { NextResponse, type NextRequest } from "next/server";
import { UNLOCK_COOKIE, UNLOCK_TTL_SECONDS, checkUnlockCode, createUnlockToken, getSiteMode } from "@/lib/site-mode";

/**
 * Preview deployments only (SITE_MODE=preview):
 *  - `?unlock=<code>` sets a signed, short-lived cookie and redirects to the clean URL.
 *  - Every response carries `X-Robots-Tag: noindex, nofollow` (belt and braces with the meta tag).
 * In full mode this is a pass-through.
 */
export async function proxy(req: NextRequest) {
  if (getSiteMode() !== "preview") return NextResponse.next();

  const code = req.nextUrl.searchParams.get("unlock");
  if (code !== null) {
    const clean = req.nextUrl.clone();
    clean.searchParams.delete("unlock");
    const res = NextResponse.redirect(clean, 303);
    if (checkUnlockCode(code)) {
      res.cookies.set(UNLOCK_COOKIE, await createUnlockToken(), {
        httpOnly: true,
        secure: req.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: UNLOCK_TTL_SECONDS,
      });
    }
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico).*)"],
};
