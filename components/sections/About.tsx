import type { home, practitioner as practitionerData } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { TextLink } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export type AboutProps = {
  content: typeof home.about;
  practitioner: typeof practitionerData;
  id?: string;
};

/** Story + pull quote + verified credentials. No photography required. */
export function About({ content, practitioner, id = "about" }: AboutProps) {
  const headingId = `${id}-heading`;
  const credentials = [...practitioner.credentials, ...practitioner.qualifications];
  return (
    <Section id={id} tone="muted" aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Text size="eyebrow">{content.eyebrow}</Text>
          <Heading id={headingId} className="mt-4">
            {content.heading}
          </Heading>
          <Text size="lead" className="mt-6 max-w-measure">
            {content.lead}
          </Text>
          <div className="mt-6 flex max-w-measure flex-col gap-4">
            {content.paragraphs.map((p) => (
              <Text key={p} tone="muted">
                {p}
              </Text>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          {content.quote ? (
            <Card as="figure" tone="sage" padding="lg">
              <blockquote>
                <p className="font-display text-h3 text-text">&ldquo;{content.quote.text}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-4 text-small font-medium text-text-muted">{content.quote.attribution}</figcaption>
            </Card>
          ) : null}

          {credentials.length > 0 || practitioner.memberships.length > 0 ? (
            <Card tone="raised">
              {credentials.length > 0 ? (
                <ul className="flex flex-col gap-3">
                  {credentials.map((c) => (
                    <li key={c} className="flex gap-3 text-small text-text">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-pill bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : null}
              {practitioner.memberships.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
                  {practitioner.memberships.map((m) => (
                    <li key={m.name}>
                      <TextLink href={m.url} className="inline-flex min-h-tap items-center text-small">
                        {m.name}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
