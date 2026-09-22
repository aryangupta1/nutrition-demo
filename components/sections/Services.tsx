import type { ConsultType, Service } from "@/content/site";
import { stock } from "@/content/stock";
import { LockChip, SkeletonText } from "@/components/preview/Locked";
import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { plain } from "@/lib/accent";
import { cn } from "@/lib/cn";
import { isLocked, type Gated } from "@/lib/gated";
import { SectionIntro } from "./SectionIntro";

export type ServicesProps = {
  content: {
    eyebrow?: string;
    heading: string;
    lead?: string;
    items: Gated<Service>[];
    consultHeading?: string;
    rebatesLabel?: string;
    consultTypes?: ConsultType[];
  };
  id?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Image-topped service tiles without card chrome. Mobile: a horizontal scroll-snap row;
 * md: two columns; lg: three columns with the middle column dropped for an editorial stagger.
 * Locked (preview) tiles keep their title and photo only, with skeleton text.
 * Consultation types follow as a two-column contrast split with a hairline divider.
 */
export function Services({ content, id = "services" }: ServicesProps) {
  if (content.items.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <Section id={id} aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} headingId={headingId} align="center" />

      <Reveal className="mt-14">
        <ul
          tabIndex={0}
          aria-label={plain(content.heading)}
          className="-mx-gutter flex snap-x snap-mandatory scroll-px-gutter gap-5 overflow-x-auto px-gutter pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-x-10"
        >
          {content.items.map((service, i) => {
            const img = service.image ? stock[service.image] : undefined;
            const locked = isLocked(service);
            return (
              <li
                key={service.title}
                data-reveal
                className={cn("w-4/5 shrink-0 snap-start sm:w-3/5 md:w-auto", i % 3 === 1 && "lg:mt-16")}
              >
                <article id={locked ? undefined : service.slug} className="flex h-full flex-col">
                  {img ? (
                    <div className="relative overflow-hidden rounded-panel">
                      <Image
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        alt={img.alt}
                        rounded="none"
                        sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 45vw, 75vw"
                        className={cn("aspect-4/5 w-full", locked && "scale-105 blur-sm")}
                      />
                      {locked ? (
                        <div className="absolute inset-0 grid place-items-center">
                          <LockChip />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <Text size="eyebrow" as="span" className="mt-6 tabular-nums">
                    {pad(i + 1)}
                  </Text>
                  <Heading as="h3" className="mt-2">
                    {service.title}
                  </Heading>
                  {locked ? (
                    <SkeletonText lines={4} className="mt-4 blur-xs" />
                  ) : (
                    <>
                      <Text tone="muted" className="mt-3">
                        {service.summary}
                      </Text>
                      <ul className="mt-4 flex flex-col gap-1.5">
                        {service.items.map((item) => (
                          <li key={item} className="flex gap-3 text-small text-text">
                            <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {service.note ? (
                        <Text size="small" tone="muted" className="mt-4 italic">
                          {service.note}
                        </Text>
                      ) : null}
                    </>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {content.consultTypes && content.consultTypes.length > 0 ? (
        <div className="mt-section">
          {content.consultHeading ? (
            <Heading as="h3" size="h2" className="mx-auto max-w-narrow text-center">
              {content.consultHeading}
            </Heading>
          ) : null}
          <Reveal as="ul" className="mt-10 grid border-t border-border md:grid-cols-2 md:divide-x md:divide-border">
            {content.consultTypes.map((type, i) => (
              <li
                key={type.title}
                data-reveal
                className={cn("flex flex-col py-10", i === 0 ? "md:pr-10 lg:pr-14" : "border-t border-border md:border-t-0 md:pl-10 lg:pl-14")}
              >
                <Text size="eyebrow" as="span" className="tabular-nums">
                  {pad(i + 1)}
                </Text>
                <Heading as="h4" size="h3" className="mt-2">
                  {type.title}
                </Heading>
                <Text size="lead" className="mt-4">
                  {type.summary}
                </Text>
                <Text size="small" tone="muted" className="mt-6">
                  {content.rebatesLabel ? <span className="font-semibold text-text">{content.rebatesLabel}. </span> : null}
                  {type.rebates}
                </Text>
              </li>
            ))}
          </Reveal>
        </div>
      ) : null}
    </Section>
  );
}
