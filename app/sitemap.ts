import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Public, indexable pages only. /why-a-website and /design-system are noindex and excluded.
 * lastModified is omitted on purpose: a build timestamp would claim a change on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 }];
}
