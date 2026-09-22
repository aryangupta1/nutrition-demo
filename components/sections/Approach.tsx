import type { Step } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SectionIntro } from "./SectionIntro";

export type ApproachProps = {
  content: {
    eyebrow?: string;
    heading: string;
    lead?: string;
    pillars: Step[];
    stepsHeading?: string;
    steps: Step[];
    stepsNote?: string;
  };
  id?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered approach pillars in a tonal panel, then a "what to expect" step row. */
export function Approach({ content, id = "approach" }: ApproachProps) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} tone="muted" aria-labelledby={headingId}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionIntro
          eyebrow={content.eyebrow}
          heading={content.heading}
          lead={content.lead}
          headingId={headingId}
          className="lg:col-span-5"
        />
        {content.pillars.length > 0 ? (
          <Card tone="sage" padding="lg" className="lg:col-span-7">
            <ol className="flex flex-col divide-y divide-border">
              {content.pillars.map((pillar, i) => (
                <li key={pillar.title} className="flex gap-6 py-6 first:pt-0 last:pb-0">
                  <span aria-hidden="true" className="w-12 shrink-0 font-display text-h2 leading-none text-primary tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <div>
                    <Heading as="h3" size="h4">
                      {pillar.title}
                    </Heading>
                    <Text tone="muted" className="mt-2">
                      {pillar.body}
                    </Text>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        ) : null}
      </div>

      {content.steps.length > 0 ? (
        <div className="mt-16">
          {content.stepsHeading ? <Heading as="h3">{content.stepsHeading}</Heading> : null}
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <Card as="li" key={step.title} tone="raised">
                <Text size="eyebrow" as="span">
                  {pad(i + 1)}
                </Text>
                <Heading as="h4" size="h4" className="mt-3">
                  {step.title}
                </Heading>
                <Text tone="muted" className="mt-2">
                  {step.body}
                </Text>
              </Card>
            ))}
          </ol>
          {content.stepsNote ? (
            <Text size="small" tone="muted" className="mt-6">
              {content.stepsNote}
            </Text>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}
