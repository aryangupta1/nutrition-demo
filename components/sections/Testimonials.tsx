import type { Testimonial } from "@/content/site";
import { LockChip, SkeletonText } from "@/components/preview/Locked";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { SectionIntro } from "./SectionIntro";

export type TestimonialsProps = {
  content: { eyebrow?: string; heading: string; items: Testimonial[] };
  /** Preview only: where testimonials will go, marked "Needs your input". Never fake quotes. */
  placeholder?: { eyebrow?: string; heading: string; body: string } | null;
  id?: string;
};

/**
 * Real, approved client quotes only, as open serif pull-quotes (no cards).
 * Full mode with no quotes: renders nothing. Preview: a blurred placeholder with quote-mark silhouettes.
 */
export function Testimonials({ content, placeholder, id = "testimonials" }: TestimonialsProps) {
  const headingId = `${id}-heading`;

  if (content.items.length === 0) {
    if (!placeholder) return null;
    return (
      <Section id={id} tone="muted" aria-labelledby={headingId}>
        <SectionIntro eyebrow={placeholder.eyebrow} heading={placeholder.heading} lead={placeholder.body} headingId={headingId} align="center" />
        <div className="mt-6 flex justify-center">
          <LockChip kind="input" />
        </div>
        <div aria-hidden="true" className="pointer-events-none mt-14 grid gap-12 select-none md:grid-cols-3 md:gap-10">
          {[5, 4, 5].map((lines, i) => (
            <div key={i} className={cn("flex-col items-center text-center", i === 0 ? "flex" : "hidden md:flex")}>
              <span className="font-display text-display leading-none text-primary opacity-60">&ldquo;</span>
              <div className="flex w-full flex-col items-center opacity-80 blur-xs">
                <SkeletonText lines={lines} className="w-full items-center" />
                <span className="mt-6 h-2.5 w-24 rounded-pill bg-border-strong" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section id={id} tone="muted" aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} headingId={headingId} align="center" />
      <Reveal as="ul" className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {content.items.map((t) => (
          <li key={`${t.name}-${t.quote.slice(0, 24)}`} data-reveal>
            <figure className="flex h-full flex-col items-center text-center">
              <span aria-hidden="true" className="font-display text-display leading-none text-primary">
                &ldquo;
              </span>
              <blockquote className="flex-1">
                <p className="font-display text-h3 text-text">{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 text-small">
                <span className="font-semibold text-text">{t.name}</span>
                {t.context ? <span className="text-text-muted">, {t.context}</span> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
