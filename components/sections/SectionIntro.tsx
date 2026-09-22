import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

/** Small pill label above a heading (Holistic-style eyebrow). */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border-strong px-3.5 py-1 text-eyebrow font-semibold uppercase text-primary",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-pill bg-primary" />
      {children}
    </p>
  );
}

/** Shared eyebrow pill + H2 (with optional accent word) + lead block used at the top of sections. */
export function SectionIntro({
  eyebrow,
  heading,
  lead,
  headingId,
  align = "start",
  className,
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  headingId?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={cn("max-w-narrow", center && "mx-auto flex flex-col items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading id={headingId} className={eyebrow ? "mt-5" : undefined}>
        {heading}
      </Heading>
      {lead ? (
        <Text size="lead" tone="muted" className={cn("mt-5", center && "max-w-measure")}>
          {lead}
        </Text>
      ) : null}
    </div>
  );
}
