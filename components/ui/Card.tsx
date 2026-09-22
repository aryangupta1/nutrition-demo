import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "raised" | "muted" | "sage" | "outline" | "inverse";

const tones: Record<Tone, string> = {
  raised: "bg-surface-raised border border-border shadow-soft",
  muted: "bg-surface-muted",
  sage: "bg-surface-sage",
  outline: "border border-border",
  inverse: "",
};

/** Rounded content panel. `tone="inverse"` re-maps child tokens for a dark fill. */
export function Card({
  as: Tag = "div",
  tone = "raised",
  padding = "md",
  className,
  children,
}: {
  as?: "div" | "article" | "li" | "aside" | "figure";
  tone?: Tone;
  padding?: "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      data-tone={tone === "inverse" ? "inverse" : undefined}
      className={cn("rounded-card", tones[tone], padding === "lg" ? "p-8 sm:p-10" : "p-6 sm:p-8", className)}
    >
      {children}
    </Tag>
  );
}
