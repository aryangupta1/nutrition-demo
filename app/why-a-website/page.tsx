import type { Metadata } from "next";
import { whyWebsite } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { SiteChrome } from "@/components/sections/SiteChrome";

// Internal pitch for Annette: noindex, excluded from the sitemap, linked from the footer only.
export const metadata: Metadata = {
  title: whyWebsite.meta.title,
  description: whyWebsite.meta.description,
  robots: { index: false, follow: false },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function WhyAWebsite() {
  const { hero, sections, together, nextSteps } = whyWebsite;
  return (
    <SiteChrome>
      <Section width="narrow">
        <Badge tone="primary">{hero.eyebrow}</Badge>
        <Heading as="h1" size="display" className="mt-6">
          {hero.heading}
        </Heading>
        <Text size="lead" tone="muted" className="mt-6">
          {hero.lead}
        </Text>
      </Section>

      <Section tone="muted" aria-label="Benefits">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((item, i) => (
            <Card as="li" key={item.id} padding="lg">
              <Text size="eyebrow">{pad(i + 1)}</Text>
              <Heading as="h2" size="h3" id={item.id} className="mt-3">
                {item.heading}
              </Heading>
              <Text tone="muted" className="mt-4">
                {item.body}
              </Text>
            </Card>
          ))}
        </ol>
      </Section>

      <Section tone="sage" aria-labelledby="together-heading">
        <SectionIntro heading={together.heading} lead={together.lead} headingId="together-heading" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {together.channels.map((channel) => (
            <Card key={channel.title} padding="lg">
              <Heading as="h3">{channel.title}</Heading>
              <ul className="mt-4 flex flex-col gap-2">
                {channel.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="text-primary">
                      •
                    </span>
                    <Text as="span">{point}</Text>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p aria-hidden="true" className="my-4 text-center font-display text-h2 text-primary">
          ↓
        </p>
        <Card tone="inverse" padding="lg" className="text-center">
          <Heading as="h3">{together.destination.title}</Heading>
          <Text tone="muted" className="mx-auto mt-4 max-w-measure">
            {together.destination.body}
          </Text>
        </Card>
      </Section>

      <Section width="narrow" aria-labelledby="next-steps-heading">
        <SectionIntro heading={nextSteps.heading} lead={nextSteps.lead} headingId="next-steps-heading" />
        <ul className="mt-8 flex flex-col divide-y divide-border">
          {nextSteps.items.map((item) => (
            <li key={item} className="flex gap-4 py-4">
              <span aria-hidden="true" className="text-primary">
                ☐
              </span>
              <Text as="span">{item}</Text>
            </li>
          ))}
        </ul>
      </Section>
    </SiteChrome>
  );
}
