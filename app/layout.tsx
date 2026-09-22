import type { Metadata } from "next";
import { inter, instrumentSerif } from "./fonts";
import { practitioner, preview, site } from "@/content/site";
import { siteUrl } from "@/lib/seo";
import { isPreview } from "@/lib/site-mode";
import { PreviewBadge } from "@/components/preview/PreviewBadge";
import "./globals.css";

// Site-wide defaults. Pages override title/description/canonical/openGraph/twitter via buildMetadata().
// Favicon: app/favicon.ico is picked up automatically by the file convention.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.defaultTitle, template: site.titleTemplate },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: practitioner.name }],
  creator: practitioner.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.description,
  },
  // Concept previews are never indexed. Pages spread their own `robots`, so page metadata re-applies this via buildMetadata.
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-surface text-text">
        {children}
        {isPreview ? <PreviewBadge {...preview.banner} /> : null}
      </body>
    </html>
  );
}
