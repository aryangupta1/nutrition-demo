import type { Chip as ChipData } from "@/content/site";
import { FloatChips } from "@/components/motion/FloatChips";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { SectionIntro } from "./SectionIntro";

export type ConcernsProps = {
  content: { eyebrow?: string; heading: string; lead?: string; chips: ChipData[] };
  id?: string;
};

/*
 * Desktop (lg+): a 12-column, 3-row stage. The intro sits in the middle row; chips are scattered
 * above, beside and below it. Placement is presentation only, one entry per chip slot.
 * Mobile/tablet: the intro comes first and the chips form a centred, wrapped cluster.
 */
const placement = [
  "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:self-end lg:ml-8",
  "lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:justify-self-center lg:self-start",
  "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:justify-self-end lg:self-end lg:mr-4",
  "lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:justify-self-start lg:self-center",
  "lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:justify-self-end lg:self-center",
  "lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:justify-self-center lg:self-start",
  "lg:col-span-4 lg:col-start-5 lg:row-start-3 lg:justify-self-center lg:self-end",
  "lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:justify-self-start lg:self-start lg:ml-6",
];

/** Holistic "signs" pattern: a centred headline with floating concern chips around it. */
export function Concerns({ content, id = "concerns" }: ConcernsProps) {
  if (content.chips.length === 0) return null;
  const headingId = `${id}-heading`;
  const chips = content.chips.slice(0, placement.length);
  return (
    <section id={id} aria-labelledby={headingId} className="overflow-hidden bg-surface pt-8 pb-section sm:pt-12">
      <Container>
        <FloatChips className="flex flex-wrap justify-center gap-x-6 gap-y-4 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <SectionIntro
            eyebrow={content.eyebrow}
            heading={content.heading}
            lead={content.lead}
            headingId={headingId}
            align="center"
            className="mb-8 w-full lg:col-span-6 lg:col-start-4 lg:row-start-2 lg:mb-0"
          />
          <ul className="contents">
            {chips.map((chip, i) => (
              <li
                key={chip.label}
                // Below lg: nudge alternate chips left/right so the wrapped cluster reads as scattered.
                className={cn("flex lg:translate-x-0", i % 2 === 0 ? "-translate-x-2" : "translate-x-2", placement[i])}
              >
                <Chip label={chip.label} image={chip.image} />
              </li>
            ))}
          </ul>
        </FloatChips>
      </Container>
    </section>
  );
}
