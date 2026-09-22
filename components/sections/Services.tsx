import type { ConsultType, Service } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SectionIntro } from "./SectionIntro";

export type ServicesProps = {
  content: {
    eyebrow?: string;
    heading: string;
    lead?: string;
    items: Service[];
    consultTypes?: ConsultType[];
  };
  id?: string;
};

/** Services card grid (6-up on desktop) plus consultation types with rebate notes. */
export function Services({ content, id = "services" }: ServicesProps) {
  if (content.items.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <Section id={id} aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} headingId={headingId} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((service) => (
          <Card as="li" key={service.slug} tone="raised" className="flex flex-col">
            <article id={service.slug} className="flex flex-1 flex-col">
              <Heading as="h3">{service.title}</Heading>
              <Text tone="muted" className="mt-3">
                {service.summary}
              </Text>
              <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 text-small text-text">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-pill bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              {service.note ? (
                <Text size="small" tone="muted" className="mt-auto pt-5 italic">
                  {service.note}
                </Text>
              ) : null}
            </article>
          </Card>
        ))}
      </ul>

      {content.consultTypes && content.consultTypes.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {content.consultTypes.map((type) => (
            <Card as="li" key={type.title} tone="muted" padding="lg">
              <Heading as="h3">{type.title}</Heading>
              <Text className="mt-3">{type.summary}</Text>
              <Text size="small" tone="muted" className="mt-4 border-t border-border pt-4">
                {type.rebates}
              </Text>
            </Card>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}
