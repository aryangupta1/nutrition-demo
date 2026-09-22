import type { home, practitioner } from "@/content/site";
import { FloatChips } from "@/components/motion/FloatChips";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { Text } from "@/components/ui/Text";

export type HeroProps = {
  content: typeof home.hero;
  image: typeof practitioner.image;
};

// Chip placements around the arch (presentation only; labels come from content).
const chipPlacement = [
  // Kept to the lower half (shoulders), clear of the face. Hidden below `sm`, where the arch is too narrow to keep them off her face.
  "bottom-1/3 left-2 sm:-left-10 lg:-left-16",
  "right-2 bottom-8 sm:-right-8 lg:-right-10",
];

/**
 * Page-top hero: the page's only H1, answer-first lead, CTAs and the headshot (preloaded LCP).
 * The H1 and headshot never animate. The chips only drift gently (no entrance), and not at all
 * under reduced motion.
 */
export function Hero({ content, image }: HeroProps) {
  const chips = content.chips.slice(0, chipPlacement.length);
  return (
    <section className="overflow-hidden bg-surface pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-20">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {content.eyebrow ? <Badge tone="primary">{content.eyebrow}</Badge> : null}
          <Heading as="h1" size="display" className="mt-6">
            {content.heading}
          </Heading>
          <Text size="lead" tone="muted" className="mt-6 max-w-measure">
            {content.lead}
          </Text>
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

        <FloatChips className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-6 top-12 -bottom-6 rounded-arch bg-surface-sage" />
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            rounded="arch"
            preload
            sizes="(min-width: 64rem) 36vw, (min-width: 40rem) 28rem, 90vw"
            className="relative aspect-4/5 w-full shadow-lift"
          />
          {chips.length > 0 ? (
            <ul className="contents">
              {chips.map((chip, i) => (
                <li key={chip.label} className={`absolute hidden sm:block ${chipPlacement[i]}`}>
                  <Chip label={chip.label} image={chip.image} className="max-w-56" />
                </li>
              ))}
            </ul>
          ) : null}
        </FloatChips>
      </Container>
    </section>
  );
}
