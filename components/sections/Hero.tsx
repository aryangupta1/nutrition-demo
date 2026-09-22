import type { home, practitioner } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { Text } from "@/components/ui/Text";

export type HeroProps = {
  content: typeof home.hero;
  image: typeof practitioner.image;
};

/** Page-top hero: the page's only H1, answer-first lead, CTAs and the headshot (preloaded LCP). */
export function Hero({ content, image }: HeroProps) {
  return (
    <section className="overflow-hidden bg-surface pb-section pt-12 sm:pt-16 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
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

        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-6 -bottom-6 top-12 rounded-arch bg-surface-sage" />
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
        </div>
      </Container>
    </section>
  );
}
