import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { isPreview } from "@/lib/site-mode";

/**
 * Everything is crawlable. Internal pages (/design-system, /why-a-website) are kept out of
 * search with `noindex` metadata and the sitemap, NOT Disallow: a disallowed page can't be
 * crawled, so its noindex is never seen and a linked URL can still be indexed.
 *
 * AI crawlers named explicitly (user decision, 2026-09-22: OpenAI only).
 * GPTBot = training, OAI-SearchBot = ChatGPT search index, ChatGPT-User = live fetches for a user.
 * All other crawlers (Googlebot, Bingbot, ClaudeBot, PerplexityBot, ...) are allowed by the `*` group.
 */
const openAiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User"];

export default function robots(): MetadataRoute.Robots {
  // Concept previews: block everything (plus noindex meta and X-Robots-Tag from proxy.ts).
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: openAiBots, allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
