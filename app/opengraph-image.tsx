import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home, practitioner } from "@/content/site";

/**
 * Site-wide Open Graph image (1200×630), generated at build time and inherited by every route.
 * app/twitter-image.tsx re-exports this file for twitter:image.
 *
 * ImageResponse (Satori) can't read CSS custom properties, so the design tokens from
 * app/globals.css are copied here as hex. Keep them in sync if the palette changes.
 * Default font only: Satori needs TTF/OTF/WOFF and next/font ships woff2.
 */
const tokens = {
  surface: "#fef9ef", // --color-surface
  surfaceSage: "#ebeedd", // --color-surface-sage
  text: "#231c16", // --color-text
  textMuted: "#5e5247", // --color-text-muted
  primary: "#99582a", // --color-primary
  border: "#e3d5c1", // --color-border
};

// Keep in sync with socialImage.alt in lib/seo/metadata.ts.
export const alt = `${practitioner.name}, ${practitioner.shortTitle}. ${home.footer.summary}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at build time (static route): the headshot as a data URI.
const headshot = `data:image/jpeg;base64,${await readFile(join(process.cwd(), "public", practitioner.image.src), "base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: tokens.surface, color: tokens.text }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 700, padding: "0 0 0 80px" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: tokens.primary }}>
            {home.hero.eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1.05, marginTop: 28, letterSpacing: -2 }}>{practitioner.name}</div>
          <div style={{ display: "flex", fontSize: 38, lineHeight: 1.25, marginTop: 20, color: tokens.text }}>{practitioner.shortTitle}</div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 12, color: tokens.textMuted }}>{practitioner.postNominals}</div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.4,
              marginTop: 40,
              paddingTop: 28,
              borderTop: `2px solid ${tokens.border}`,
              color: tokens.textMuted,
              maxWidth: 560,
            }}
          >
            {home.footer.summary}
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              top: 110,
              bottom: 0,
              background: tokens.surfaceSage,
              borderTopLeftRadius: 200,
              borderTopRightRadius: 200,
            }}
          />
          <img
            src={headshot}
            alt=""
            width={400}
            height={560}
            style={{ objectFit: "cover", borderTopLeftRadius: 200, borderTopRightRadius: 200 }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
