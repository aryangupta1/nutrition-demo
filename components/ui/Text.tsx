import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Size = "lead" | "body" | "small" | "eyebrow";
type Tone = "default" | "muted" | "primary";

const sizes: Record<Size, string> = {
  lead: "text-lead",
  body: "text-body",
  small: "text-small",
  eyebrow: "text-eyebrow font-semibold uppercase",
};

const tones: Record<Tone, string> = {
  default: "text-text",
  muted: "text-text-muted",
  primary: "text-primary",
};

/** Body copy. `size="eyebrow"` defaults to the primary tone. */
export function Text({
  as: Tag = "p",
  size = "body",
  tone,
  className,
  children,
}: {
  as?: "p" | "span" | "div" | "li" | "small";
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const resolvedTone: Tone = tone ?? (size === "eyebrow" ? "primary" : "default");
  return <Tag className={cn(sizes[size], tones[resolvedTone], className)}>{children}</Tag>;
}
