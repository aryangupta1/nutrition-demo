import type { FaqItem, Link } from "@/content/site";
import { LockChip } from "@/components/preview/Locked";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { isLocked, type Gated } from "@/lib/gated";
import { SectionIntro } from "./SectionIntro";

export type FaqAside = { heading: string; body?: string; cta: Link };

export type FAQProps = {
  content: { eyebrow?: string; heading: string; lead?: string; items: Gated<FaqItem>[] };
  /** Optional "still wondering? book a free call" prompt, centred below the list. */
  aside?: FaqAside;
  id?: string;
};

/**
 * Centred, narrow FAQ with soft-tinted pill rows (native <details>, no JS).
 * Locked (preview) questions show the question only, as a static row with a "To be built" chip.
 */
export function FAQ({ content, aside, id = "faq" }: FAQProps) {
  if (content.items.length === 0) return null;
  const headingId = `${id}-heading`;
  return (
    <Section id={id} width="narrow" aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} headingId={headingId} align="center" />
      <Accordion
        variant="pill"
        className="mt-12"
        items={content.items.map((item) =>
          isLocked(item)
            ? { title: item.title, aside: <LockChip /> }
            : { title: item.question, content: <p>{item.answer}</p> },
        )}
      />
      {aside ? (
        <Reveal className="mt-16 flex flex-col items-center text-center">
          <span aria-hidden="true" className="h-10 w-px bg-border-strong" />
          <Heading as="h3" className="mt-6">
            {aside.heading}
          </Heading>
          {aside.body ? (
            <Text tone="muted" className="mt-3 max-w-measure">
              {aside.body}
            </Text>
          ) : null}
          <Button href={aside.cta.href} size="lg" className="mt-6">
            {aside.cta.label}
          </Button>
        </Reveal>
      ) : null}
    </Section>
  );
}
