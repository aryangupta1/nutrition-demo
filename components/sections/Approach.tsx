import type { ReactNode } from "react";
import type { Step } from "@/content/site";
import { LockChip, SkeletonText } from "@/components/preview/Locked";
import { DrawPath } from "@/components/motion/DrawPath";
import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { isLocked, type Gated } from "@/lib/gated";
import { SectionIntro } from "./SectionIntro";

export type ApproachProps = {
  content: {
    eyebrow?: string;
    heading: string;
    lead?: string;
    pillars: Gated<Step>[];
    stepsHeading?: string;
    steps: Gated<Step>[];
    stepsNote?: string;
  };
  id?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/* Line icons for the three pillars (intake, processes, personal). Decorative. */
const iconProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "size-9",
};

const icons: ReactNode[] = [
  // A bowl with steam: patterns of intake.
  <svg key="intake" {...iconProps}>
    <path d="M5 16h22c0 6-5 10-11 10S5 22 5 16Z" />
    <path d="M12 27.5h8" />
    <path d="M11 12c0-2 2-2.5 2-4.5M16 12c0-2 2-2.5 2-4.5M21 12c0-2 2-2.5 2-4.5" />
  </svg>,
  // A cycle: health processes.
  <svg key="processes" {...iconProps}>
    <path d="M25 16a9 9 0 0 1-15.4 6.4" />
    <path d="M7 16a9 9 0 0 1 15.4-6.4" />
    <path d="M22.6 4.8v4.8h-4.8" />
    <path d="M9.4 27.2v-4.8h4.8" />
    <circle cx="16" cy="16" r="2" />
  </svg>,
  // A person with a small spark: personal situation.
  <svg key="personal" {...iconProps}>
    <circle cx="15" cy="11" r="4.5" />
    <path d="M6.5 27c0-4.8 3.8-8.5 8.5-8.5s8.5 3.7 8.5 8.5" />
    <path d="M25 4v5M22.5 6.5h5" />
  </svg>,
];

/**
 * Three pillars as line icons joined by a curved dotted path that draws on scroll (anime.js),
 * then "what to expect" as a vertical timeline. No cards.
 */
export function Approach({ content, id = "approach" }: ApproachProps) {
  const headingId = `${id}-heading`;
  const maskId = `${id}-path-mask`;
  // Gentle wave through the three icon centres (columns at 1/6, 1/2, 5/6 of the row).
  const wave = "M200 40C330 0 470 0 600 40S870 80 1000 40";
  return (
    <Section id={id} tone="sage" aria-labelledby={headingId}>
      <SectionIntro eyebrow={content.eyebrow} heading={content.heading} lead={content.lead} headingId={headingId} align="center" />

      {content.pillars.length > 0 ? (
        <div className="relative mt-16">
          {content.pillars.length === 3 ? (
            <DrawPath className="pointer-events-none absolute inset-x-0 top-0 hidden h-20 text-border-strong md:block">
              <svg viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" className="size-full">
                <defs>
                  <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="-20" width="1200" height="120">
                    <path data-draw d={wave} fill="none" stroke="white" strokeWidth="40" />
                  </mask>
                </defs>
                <path
                  d={wave}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="0 9"
                  vectorEffect="non-scaling-stroke"
                  mask={`url(#${maskId})`}
                />
              </svg>
            </DrawPath>
          ) : null}

          <Reveal as="ol" className="relative grid gap-14 md:grid-cols-3 md:gap-10">
            {content.pillars.map((pillar, i) => (
              <li key={pillar.title} data-reveal className="flex flex-col items-center text-center">
                <span className="flex size-20 items-center justify-center rounded-pill border border-border-strong bg-surface-sage text-primary">
                  {icons[i % icons.length]}
                </span>
                <Text size="eyebrow" as="span" className="mt-6 tabular-nums">
                  {pad(i + 1)}
                </Text>
                <Heading as="h3" className="mt-2">
                  {pillar.title}
                </Heading>
                {isLocked(pillar) ? (
                  <div className="mt-4 flex w-full max-w-xs flex-col items-center gap-4">
                    <SkeletonText lines={2} className="w-full items-center blur-xs" />
                    <LockChip />
                  </div>
                ) : (
                  <Text tone="muted" className="mt-3 max-w-xs">
                    {pillar.body}
                  </Text>
                )}
              </li>
            ))}
          </Reveal>
        </div>
      ) : null}

      {content.steps.length > 0 ? (
        <div className="mt-section grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            {content.stepsHeading ? (
              <Heading as="h3" size="h2">
                {content.stepsHeading}
              </Heading>
            ) : null}
            {content.stepsNote ? (
              <Text tone="muted" className="mt-4 max-w-measure">
                {content.stepsNote}
              </Text>
            ) : null}
          </div>
          <Reveal as="ol" className="ml-5 border-l border-dashed border-border-strong lg:col-span-7 lg:col-start-6">
            {content.steps.map((step, i) => (
              <li key={step.title} data-reveal className="relative pb-12 pl-10 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute top-0 -left-5 flex size-10 items-center justify-center rounded-pill border border-primary bg-surface-sage font-display text-h4 text-primary tabular-nums"
                >
                  {i + 1}
                </span>
                <Heading as="h4" size="h3" className="pt-1">
                  {step.title}
                </Heading>
                {isLocked(step) ? (
                  <div className="mt-3 flex flex-col items-start gap-4">
                    <SkeletonText lines={2} className="w-full max-w-md blur-xs" />
                    <LockChip />
                  </div>
                ) : (
                  <Text tone="muted" className="mt-2 max-w-measure">
                    {step.body}
                  </Text>
                )}
              </li>
            ))}
          </Reveal>
        </div>
      ) : null}
    </Section>
  );
}
