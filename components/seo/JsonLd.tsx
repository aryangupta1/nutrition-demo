import type { JsonLdGraph, JsonLdNode } from "@/lib/seo";

/**
 * Renders structured data as a server-side <script type="application/ld+json">.
 * `<` is escaped to < so content can never close the script tag (XSS-safe),
 * per node_modules/next/dist/docs/01-app/02-guides/json-ld.md.
 */
export function JsonLd({ data }: { data: JsonLdGraph | (JsonLdNode & { "@context": "https://schema.org" }) }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
