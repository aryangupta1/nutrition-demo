import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { isPreview } from "@/lib/site-mode";

/**
 * Public, indexable pages only. /why-a-website and /design-system are noindex and excluded.
 * lastModified is omitted on purpose: a build timestamp would claim a change on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return []; // concept previews are never indexed
  return [{ url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 }];
}
