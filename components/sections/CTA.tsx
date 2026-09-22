import type { Clinic, Link } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export type CTAProps = {
  content: { heading: string; body?: string; primaryCta: Link; secondaryCta?: Link };
  clinics?: Clinic[];
  id?: string;
};

/** Closing booking band on the inverse tone, doubling as the contact/clinics block. */
export function CTA({ content, clinics = [], id = "contact" }: CTAProps) {
  const headingId = `${id}-heading`;
  return (
    <Section id={id} tone="inverse" aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Heading id={headingId} size="h1">
            {content.heading}
          </Heading>
          {content.body ? (
            <Text size="lead" tone="muted" className="mt-6 max-w-measure">
              {content.body}
            </Text>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={content.primaryCta.href} size="lg">
              {content.primaryCta.label}
            </Button>
            {content.secondaryCta ? (
              <Button href={content.secondaryCta.href} size="lg" variant="secondary">
                {content.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>

        {clinics.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1 xl:grid-cols-2">
            {clinics.map((clinic) => (
              <Card as="li" key={clinic.name} tone="outline">
                <Heading as="h3" size="h4">
                  {clinic.name}
                </Heading>
                <address className="mt-3 text-body not-italic text-text">
                  {clinic.streetAddress}
                  <br />
                  {clinic.locality} {clinic.region} {clinic.postalCode}
                </address>
                <Text size="small" tone="muted" className="mt-3">
                  {clinic.directions}
                </Text>
              </Card>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}
