import { site } from "@/content/site";

/**
 * Canonical origin for metadata, sitemap, robots, llms.txt and JSON-LD.
 * Resolution order (no env var is required):
 *   1. content/site.ts `site.url` (set this once her domain is registered)
 *   2. https://$VERCEL_PROJECT_PRODUCTION_URL (set automatically by Vercel at build and run time)
 *   3. http://localhost:3000 (local builds)
 * Always returned without a trailing slash.
 */
function resolveSiteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw = site.url ?? (vercel ? `https://${vercel}` : "http://localhost:3000");
  return raw.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

/** Absolute URL for a site path ("/" or "/#faq" or "/why-a-website"). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/" || path === "") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
