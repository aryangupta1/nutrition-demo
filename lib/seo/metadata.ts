import type { Metadata } from "next";
import { home, practitioner, site } from "@/content/site";

/**
 * Shared social image (app/opengraph-image.tsx, app/twitter-image.tsx). File-based images only
 * attach automatically in the segment that defines them; a child page that sets its own
 * openGraph/twitter object would otherwise lose the image, so it is referenced explicitly.
 */
const socialImage = {
  width: 1200,
  height: 630,
  alt: `${practitioner.name}, ${practitioner.shortTitle}. ${home.footer.summary}`,
};

type BuildMetadataOptions = {
  /** Page title. Rendered through site.titleTemplate unless `absoluteTitle` is true. */
  title: string;
  /** Unique meta description. Omit to inherit the root layout description. */
  description?: string;
  /** Site-relative path used for the canonical and og:url, e.g. "/" or "/why-a-website". */
  path: string;
  /** Use the title as-is (no "| Annette Low" suffix). Used by the home page. */
  absoluteTitle?: boolean;
  /** noindex + nofollow, for internal pages. */
  noindex?: boolean;
};

/**
 * Per-page metadata: title, description, canonical, Open Graph and Twitter.
 * Next merges metadata shallowly, so every page must pass its own openGraph/twitter
 * objects (a page-level openGraph replaces the layout's rather than extending it).
 * Images come from the file-based app/opengraph-image.tsx and app/twitter-image.tsx.
 */
export function buildMetadata({ title, description, path, absoluteTitle, noindex }: BuildMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : site.titleTemplate.replace("%s", title);
  const desc = description ?? site.description;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description: desc,
      images: [{ url: "/opengraph-image", type: "image/png", ...socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [{ url: "/twitter-image", ...socialImage }],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
