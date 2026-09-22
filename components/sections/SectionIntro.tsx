import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";

/** Shared eyebrow + H2 + lead block used at the top of sections. */
export function SectionIntro({
  eyebrow,
  heading,
  lead,
  headingId,
  className,
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  headingId?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-narrow", className)}>
      {eyebrow ? <Text size="eyebrow">{eyebrow}</Text> : null}
      <Heading id={headingId} className={eyebrow ? "mt-4" : undefined}>
        {heading}
      </Heading>
      {lead ? (
        <Text size="lead" tone="muted" className="mt-6">
          {lead}
        </Text>
      ) : null}
    </div>
  );
}
