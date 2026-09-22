import type { Clinic, Link } from "@/content/site";
import type { StockImage } from "@/content/stock";
import { LockChip } from "@/components/preview/Locked";
import { DrawPath } from "@/components/motion/DrawPath";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { Text } from "@/components/ui/Text";

export type CTAProps = {
  content: { heading: string; body?: string; primaryCta: Link; secondaryCta?: Link; clinicsLabel?: string };
  clinics?: Clinic[];
  /** Soft full-bleed background photo (decorative). */
  background?: StockImage;
  /** Preview only: where clinic hours will go, marked "Needs your input". */
  hours?: { label: string; body: string } | null;
  id?: string;
};

/** Botanical sprig line mark. Each stroke is drawn in on scroll by <DrawPath mode="play">. */
function SprigMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-20"
    >
      <path data-draw d="M32 60C32 46 30.5 30 33 6" />
      <path data-draw d="M31.8 48C25 47 21 42.5 20 36c6.5.5 11 5 11.8 12Z" />
      <path data-draw d="M31.6 40c6.8-1 10.8-5.5 11.8-12-6.5.5-11 5-11.8 12Z" />
      <path data-draw d="M32 30.5c-5.5-.8-8.8-4.5-9.6-9.8 5.3.4 8.9 4 9.6 9.8Z" />
      <path data-draw d="M32.6 22.5c4.6-.8 7.4-4 8-8.4-4.4.4-7.4 3.4-8 8.4Z" />
    </svg>
  );
}

/**
 * Closing CTA: centred, with a drawn botanical line mark over a soft photo wash, then the
 * clinics as a clean two-column address list (no boxes). Doubles as the contact block.
 */
export function CTA({ content, clinics = [], background, hours, id = "contact" }: CTAProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="relative isolate overflow-hidden bg-surface py-section">
      {background ? (
        <>
          <Image src={background.src} alt="" fill rounded="none" sizes="100vw" className="-z-20" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-surface/85" />
        </>
      ) : null}

      <Container width="narrow" className="flex flex-col items-center text-center">
        <DrawPath mode="play" className="text-primary">
          <SprigMark />
        </DrawPath>
        <Heading id={headingId} size="h1" className="mt-6">
          {content.heading}
        </Heading>
        {content.body ? (
          <Text size="lead" tone="muted" className="mt-6 max-w-measure">
            {content.body}
          </Text>
        ) : null}
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <Button href={content.primaryCta.href} size="lg">
            {content.primaryCta.label}
          </Button>
          {content.secondaryCta ? (
            <Button href={content.secondaryCta.href} size="lg" variant="secondary" className="bg-surface/60">
              {content.secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </Container>

      {clinics.length > 0 ? (
        <Container className="mt-20 max-w-content">
          {content.clinicsLabel ? (
            // text-text, not primary: small text over the photo wash must hold 4.5:1 even on a dark pixel.
            <h3 className="text-center text-eyebrow font-semibold text-text uppercase">{content.clinicsLabel}</h3>
          ) : null}
          <Reveal as="ul" className="mx-auto mt-6 grid max-w-4xl border-t border-border-strong md:grid-cols-2 md:divide-x md:divide-border-strong">
            {clinics.map((clinic, i) => (
              <li
                key={clinic.name}
                data-reveal
                className={i === 0 ? "py-8 md:pr-10" : "border-t border-border-strong py-8 md:border-t-0 md:pl-10"}
              >
                <Heading as="h4" size="h3">
                  {clinic.name}
                </Heading>
                <address className="mt-3 text-body text-text not-italic">
                  {clinic.streetAddress}
                  <br />
                  {clinic.locality} {clinic.region} {clinic.postalCode}
                </address>
                <Text size="small" tone="muted" className="mt-3">
                  {clinic.directions}
                </Text>
              </li>
            ))}
          </Reveal>
          {hours ? (
            <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 border-t border-border-strong pt-8 sm:flex-row sm:items-center sm:gap-5">
              <Heading as="h4" size="h4">
                {hours.label}
              </Heading>
              <LockChip kind="input" />
              <Text size="small" tone="muted" className="sm:flex-1">
                {hours.body}
              </Text>
            </div>
          ) : null}
        </Container>
      ) : null}
    </section>
  );
}
