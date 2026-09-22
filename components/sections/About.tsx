import type { home, practitioner as practitionerData } from "@/content/site";
import type { StockImage } from "@/content/stock";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { TextLink } from "@/components/ui/Link";
import { Eyebrow } from "./SectionIntro";

export type AboutProps = {
  content: typeof home.about;
  practitioner: typeof practitionerData;
  /** Full-bleed photo for the split (decorative mood image by default). */
  image?: StockImage;
  id?: string;
};

/**
 * Edge-to-edge 50/50 split: a full-bleed photo on one half, the story and credentials on a tinted
 * half. The quote follows as a large centred serif pull-quote (no box).
 */
export function About({ content, practitioner, image, id = "about" }: AboutProps) {
  const headingId = `${id}-heading`;
  const credentials = [...practitioner.credentials, ...practitioner.qualifications];
  return (
    <section id={id} aria-labelledby={headingId}>
      <div className="grid bg-surface-muted lg:grid-cols-2">
        {image ? (
          <div className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-auto">
            {/* Mood photo only: decorative, so it doesn't repeat the story for screen readers. */}
            <Image src={image.src} alt="" fill rounded="none" sizes="(min-width: 64rem) 50vw, 100vw" />
          </div>
        ) : null}

        <div className="px-gutter py-section lg:pr-gutter lg:pl-16 xl:pl-20">
          <Reveal className="max-w-measure">
            <div data-reveal>
              {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
              <Heading id={headingId} className="mt-5">
                {content.heading}
              </Heading>
            </div>
            <p data-reveal className="mt-6 text-lead text-text">
              {content.lead}
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {content.paragraphs.map((p) => (
                <p data-reveal key={p} className="text-body text-text-muted">
                  {p}
                </p>
              ))}
            </div>

            {credentials.length > 0 ? (
              <div data-reveal className="mt-10">
                <h3 className="text-eyebrow font-semibold text-primary uppercase">{content.credentialsLabel}</h3>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {credentials.map((c) => (
                    <li key={c} className="flex items-baseline gap-4 py-3 text-body text-text">
                      <span aria-hidden="true" className="font-display text-h4 text-primary">
                        ✦
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {practitioner.memberships.length > 0 ? (
              <p data-reveal className="mt-5 flex flex-wrap items-center gap-x-5 text-small text-text-muted">
                <span>{content.membershipsLabel}</span>
                {practitioner.memberships.map((m) => (
                  <TextLink key={m.name} href={m.url} className="inline-flex min-h-tap items-center">
                    {m.name}
                  </TextLink>
                ))}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>

      {content.quote ? (
        <div className="bg-surface pt-section">
          <Container width="narrow">
            <Reveal>
              <figure className="flex flex-col items-center text-center">
                <span aria-hidden="true" className="font-display text-display leading-none text-primary">
                  &ldquo;
                </span>
                <blockquote>
                  <p className="font-display text-h1 text-balance text-text">{content.quote.text}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-small font-medium text-text-muted">
                  <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
                  {content.quote.attribution}
                  <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
                </figcaption>
              </figure>
            </Reveal>
          </Container>
        </div>
      ) : null}
    </section>
  );
}
