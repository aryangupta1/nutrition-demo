import type { Metadata } from "next";
import type { ReactNode } from "react";
import { contact, home, practitioner, preview, site } from "@/content/site";
import { stock } from "@/content/stock";
import { DrawPath } from "@/components/motion/DrawPath";
import { FloatChips } from "@/components/motion/FloatChips";
import { Reveal } from "@/components/motion/Reveal";
import { LockChip, LockedOverlay, SkeletonText } from "@/components/preview/Locked";
import { Chip } from "@/components/ui/Chip";
import { Concerns } from "@/components/sections/Concerns";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { buildMetadata } from "@/lib/seo";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Image } from "@/components/ui/Image";
import { TextLink } from "@/components/ui/Link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

// Internal reference page. Never indexed, excluded from the sitemap.
export const metadata: Metadata = buildMetadata({
  title: "Design system",
  path: "/design-system",
  noindex: true,
});

// Class names are literal so Tailwind can detect them.
const surfaces = [
  { token: "surface", className: "bg-surface" },
  { token: "surface-muted", className: "bg-surface-muted" },
  { token: "surface-raised", className: "bg-surface-raised" },
  { token: "surface-sage", className: "bg-surface-sage" },
  { token: "surface-inverse", className: "bg-surface-inverse" },
];
const foregrounds = [
  { token: "text", className: "bg-text" },
  { token: "text-muted", className: "bg-text-muted" },
  { token: "primary", className: "bg-primary" },
  { token: "primary-hover", className: "bg-primary-hover" },
  { token: "border", className: "bg-border" },
  { token: "border-strong", className: "bg-border-strong" },
];
const typeScale = [
  { token: "display", className: "font-display text-display" },
  { token: "h1", className: "font-display text-h1" },
  { token: "h2", className: "font-display text-h2" },
  { token: "h3", className: "font-display text-h3" },
  { token: "h4", className: "font-sans text-h4 font-semibold" },
  { token: "lead", className: "text-lead" },
  { token: "body", className: "text-body" },
  { token: "small", className: "text-small" },
  { token: "eyebrow", className: "text-eyebrow font-semibold uppercase text-primary" },
];
const radii = [
  { token: "sm", className: "rounded-sm" },
  { token: "thumb", className: "rounded-thumb" },
  { token: "md", className: "rounded-md" },
  { token: "card", className: "rounded-card" },
  { token: "panel", className: "rounded-panel" },
  { token: "arch", className: "rounded-arch" },
  { token: "pill", className: "rounded-pill" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-border py-12">
      <Heading as="h2" size="h3">
        {title}
      </Heading>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Swatch({ token, className }: { token: string; className: string }) {
  return (
    <li className="flex flex-col gap-2">
      <span className={`block h-20 rounded-md border border-border ${className}`} />
      <code className="text-small text-text-muted">--color-{token}</code>
    </li>
  );
}

export default function DesignSystemPage() {
  const faqSample = home.faq.items.slice(0, 3);
  return (
    <main className="flex-1">
      <Container className="py-16">
        <Text size="eyebrow">Internal · noindex</Text>
        <Heading as="h1" size="h1" className="mt-4">
          Design system
        </Heading>
        <Text size="lead" tone="muted" className="mt-4 max-w-measure">
          Tokens live in app/globals.css. Contrast ratios and usage rules are in DESIGN_SYSTEM.md.
        </Text>

        <Block title="Colour: surfaces">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {surfaces.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </ul>
        </Block>

        <Block title="Colour: foreground, brand, borders">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {foregrounds.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </ul>
        </Block>

        <Block title="Type scale">
          <ul className="flex flex-col gap-6">
            {typeScale.map((t) => (
              <li key={t.token} className="grid gap-2 sm:grid-cols-6 sm:items-baseline">
                <code className="text-small text-text-muted">text-{t.token}</code>
                <span className={`sm:col-span-5 ${t.className}`}>{practitioner.name}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Radii and shadows">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {radii.map((r) => (
              <li key={r.token} className="flex flex-col gap-2">
                <span className={`block h-24 bg-surface-sage ${r.className}`} />
                <code className="text-small text-text-muted">rounded-{r.token}</code>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card bg-surface-raised p-6 shadow-soft">
              <code className="text-small">shadow-soft</code>
            </div>
            <div className="rounded-card bg-surface-raised p-6 shadow-lift">
              <code className="text-small">shadow-lift</code>
            </div>
            <div className="rounded-pill bg-surface-raised px-6 py-4 shadow-chip">
              <code className="text-small">shadow-chip</code>
            </div>
          </div>
        </Block>

        <Block title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button href={home.cta.primaryCta.href} size="lg">
              {home.cta.primaryCta.label}
            </Button>
            <Button href={home.hero.secondaryCta.href} size="lg" variant="secondary">
              {home.hero.secondaryCta.label}
            </Button>
            <Button>{home.cta.primaryCta.label}</Button>
            <Button variant="secondary">{home.cta.primaryCta.label}</Button>
            <Button variant="ghost">{home.cta.primaryCta.label}</Button>
          </div>
          <div data-tone="inverse" className="mt-6 flex flex-wrap gap-3 rounded-card p-6">
            <Button href={home.cta.primaryCta.href}>{home.cta.primaryCta.label}</Button>
            <Button href={home.cta.secondaryCta.href} variant="secondary">
              {home.cta.secondaryCta.label}
            </Button>
            <Button variant="ghost">{home.cta.primaryCta.label}</Button>
          </div>
        </Block>

        <Block title="Badge, text, links">
          <div className="flex flex-wrap gap-3">
            <Badge tone="primary">{home.hero.eyebrow}</Badge>
            <Badge>{practitioner.credentials[0]}</Badge>
          </div>
          <div className="mt-6 flex max-w-measure flex-col gap-3">
            <Text size="eyebrow">{home.about.eyebrow}</Text>
            <Text size="lead">{home.about.lead}</Text>
            <Text>{home.about.paragraphs[0]}</Text>
            <Text size="small" tone="muted">
              {home.services.items[5].note}
            </Text>
            <Text>
              <TextLink href={practitioner.practiceUrl}>{home.footer.practiceLinkLabel}</TextLink>
            </Text>
          </div>
        </Block>

        <Block title="Accent headings and eyebrow pill">
          <div className="flex flex-col items-start gap-4">
            <Eyebrow>{home.services.eyebrow}</Eyebrow>
            <Heading as="p" size="h2">
              {home.services.heading}
            </Heading>
            <Text size="small" tone="muted">
              Content strings mark one accent word with asterisks; Heading renders it. Use plain() from lib/accent.ts for
              metadata, JSON-LD and llms.txt.
            </Text>
          </div>
        </Block>

        <Block title="Chips (FloatChips: staggered float-in, slow idle drift)">
          <FloatChips className="flex flex-wrap gap-4">
            {home.concerns.chips.slice(0, 4).map((chip) => (
              <Chip key={chip.label} label={chip.label} image={chip.image} />
            ))}
          </FloatChips>
        </Block>

        <Block title="Motion: Reveal and DrawPath">
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {home.approach.pillars.map((p) => (
              <div key={p.title} data-reveal className="border-t border-border-strong pt-4">
                <Heading as="p" size="h4">
                  {p.title}
                </Heading>
                <Text tone="muted" className="mt-2">
                  {p.body}
                </Text>
              </div>
            ))}
          </Reveal>
          <DrawPath mode="play" className="mt-8 text-primary">
            <svg viewBox="0 0 400 60" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-full max-w-md">
              <path data-draw d="M10 40C80 0 140 0 200 30S330 60 390 20" strokeLinecap="round" />
            </svg>
          </DrawPath>
        </Block>

        <Block title="Preview primitives (SITE_MODE=preview only)">
          <div className="flex flex-wrap items-center gap-3">
            <LockChip />
            <LockChip kind="input" />
          </div>
          <div data-tone="inverse" className="mt-6 flex flex-wrap items-center gap-3 rounded-card p-6">
            <LockChip />
            <LockChip kind="input" />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <SkeletonText lines={4} />
            <LockedOverlay srLabel={preview.lockChip}>
              <SkeletonText lines={4} />
            </LockedOverlay>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(["raised", "muted", "sage", "outline", "inverse"] as const).map((tone) => (
              <Card key={tone} tone={tone}>
                <Text size="eyebrow">{tone}</Text>
                <Heading as="h3" className="mt-3">
                  {home.services.items[0].title}
                </Heading>
                <Text tone="muted" className="mt-2">
                  {home.services.items[0].summary}
                </Text>
              </Card>
            ))}
          </div>
        </Block>

        <Block title="Image">
          <div className="grid max-w-narrow grid-cols-2 gap-5">
            <Image
              src={practitioner.image.src}
              width={practitioner.image.width}
              height={practitioner.image.height}
              alt={practitioner.image.alt}
              rounded="arch"
              sizes="(min-width: 48rem) 24rem, 45vw"
              className="aspect-4/5 w-full"
            />
            <Image
              src={practitioner.image.src}
              width={practitioner.image.width}
              height={practitioner.image.height}
              alt={practitioner.image.alt}
              sizes="(min-width: 48rem) 24rem, 45vw"
              className="aspect-square w-full"
            />
          </div>
        </Block>

        <Block title="Accordion">
          <Accordion
            className="max-w-narrow"
            items={faqSample.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))}
          />
        </Block>
      </Container>

      <Container>
        <Heading as="h2" size="h3" className="border-t border-border pt-12">
          Section patterns
        </Heading>
      </Container>
      <div className="mt-8 flex flex-col">
        <Nav name={practitioner.name} title={practitioner.shortTitle} links={site.nav} cta={home.hero.primaryCta} />
        <Hero content={home.hero} image={practitioner.image} />
        <Concerns content={home.concerns} id="ds-concerns" />
        <About content={home.about} practitioner={practitioner} image={stock["about-desk"]} id="ds-about" />
        <Services content={home.services} id="ds-services" />
        <Approach content={home.approach} id="ds-approach" />
        <Testimonials content={home.testimonials} id="ds-testimonials" />
        <Testimonials content={home.testimonials} placeholder={preview.needsInput.testimonials} id="ds-testimonials-preview" />
        <FAQ
          content={home.faq}
          id="ds-faq"
          aside={{ heading: home.cta.heading, body: home.cta.body, cta: home.hero.secondaryCta }}
        />
        <CTA
          content={home.cta}
          clinics={contact.clinics}
          background={stock["cta-botanical"]}
          hours={preview.needsInput.hours}
          id="ds-contact"
        />
        <Section tone="sage">
          <Text size="small" tone="muted">
            The first Testimonials renders nothing because home.testimonials.items is empty; the second shows the
            preview-only placeholder. The CTA above shows the preview-only clinic hours row.
          </Text>
        </Section>
        <Footer
          name={practitioner.name}
          title={practitioner.shortTitle}
          postNominals={practitioner.postNominals}
          summary={home.footer.summary}
          nav={site.nav}
          clinics={contact.clinics}
          phone={{ display: contact.phone, e164: contact.phoneE164 }}
          social={contact.social}
          practiceLink={{ label: home.footer.practiceLinkLabel, href: practitioner.practiceUrl }}
          internalLinks={home.footer.internalLinks}
        />
      </div>
    </main>
  );
}
