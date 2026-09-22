import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary";

const tones: Record<Tone, string> = {
  neutral: "border-border-strong text-text",
  primary: "border-primary text-primary",
};

/** Small pill label (e.g. hero eyebrow, tags). Not interactive. */
export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-3 py-1 text-small font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
