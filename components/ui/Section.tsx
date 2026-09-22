import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export type Tone = "surface" | "muted" | "sage" | "inverse";

const tones: Record<Tone, string> = {
  surface: "bg-surface",
  muted: "bg-surface-muted",
  sage: "bg-surface-sage",
  inverse: "",
};

type SectionProps = {
  tone?: Tone;
  /** Wrap children in a Container (default true). */
  contained?: boolean;
  width?: "content" | "narrow";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

/**
 * Page section with vertical rhythm (py-section) and a background tone.
 * `tone="inverse"` sets data-tone so all child tokens re-map for dark backgrounds.
 */
export function Section({ tone = "surface", contained = true, width, className, children, ...rest }: SectionProps) {
  return (
    <section
      data-tone={tone === "inverse" ? "inverse" : undefined}
      className={cn("py-section", tones[tone], className)}
      {...rest}
    >
      {contained ? <Container width={width}>{children}</Container> : children}
    </section>
  );
}
