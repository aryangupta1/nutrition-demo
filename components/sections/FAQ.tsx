import type { FaqItem, Link } from "@/content/site";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SectionIntro } from "./SectionIntro";

export type FaqAside = { heading: string; body?: string; cta: Link };

export type FAQProps = {
  content: { eyebrow?: string; heading: string; lead?: string; items: FaqItem[] };
  /** Optional "still wondering? book a free call" card beside the accordion. */
  aside?: FaqAside;
  id?: string;
};

/** FAQ accordion (native <details>) with an optional dark booking card alongside. */
export function FAQ({ content, aside, id = "faq" }: FAQProps) {
  if (content.items.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <Section id={id} aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} headingId={headingId} />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <Accordion
          className={aside ? "lg:col-span-8" : "lg:col-span-12"}
          items={content.items.map((item) => ({ title: item.question, content: <p>{item.answer}</p> }))}
        />
        {aside ? (
          <Card as="aside" tone="inverse" padding="lg" className="lg:sticky lg:top-28 lg:col-span-4">
            <Heading as="h3">{aside.heading}</Heading>
            {aside.body ? (
              <Text tone="muted" className="mt-4">
                {aside.body}
              </Text>
            ) : null}
            <Button href={aside.cta.href} className="mt-6 w-full">
              {aside.cta.label}
            </Button>
          </Card>
        ) : null}
      </div>
    </Section>
  );
}
