import type { Testimonial } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "./SectionIntro";

export type TestimonialsProps = {
  content: { eyebrow?: string; heading: string; items: Testimonial[] };
  id?: string;
};

/** Real, approved client quotes only. Renders nothing when there are none. */
export function Testimonials({ content, id = "testimonials" }: TestimonialsProps) {
  if (content.items.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <Section id={id} aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} headingId={headingId} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {content.items.map((t) => (
          <li key={`${t.name}-${t.quote.slice(0, 24)}`}>
            <Card as="figure" tone="raised" className="flex h-full flex-col">
              <blockquote className="flex-1">
                <p className="font-display text-h3 text-text">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 text-small">
                <span className="font-semibold text-text">{t.name}</span>
                {t.context ? <span className="text-text-muted">, {t.context}</span> : null}
              </figcaption>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
