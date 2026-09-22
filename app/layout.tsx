import type { Metadata } from "next";
import { inter, instrumentSerif } from "./fonts";
import { practitioner } from "@/content/site";
import "./globals.css";

// Minimal placeholder. The SEO agent owns full metadata (lib/seo/).
export const metadata: Metadata = {
  title: practitioner.name,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-surface text-text">{children}</body>
    </html>
  );
}
