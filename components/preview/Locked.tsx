import type { ReactNode } from "react";
import { preview } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Preview-only visuals. Placeholder geometry only: never renders withheld copy,
 * so any blur is cosmetic and the server-side gating in lib/content.ts stays intact.
 */

function LockIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function PenIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path d="M10.5 2.5l3 3-8 8H2.5v-3z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

/** "To be built" (kind="lock") or "Needs your input" (kind="input") pill. */
export function LockChip({ kind = "lock", label, className }: { kind?: "lock" | "input"; label?: string; className?: string }) {
  const text = label ?? (kind === "lock" ? preview.lockChip : preview.needsInputChip);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-small font-medium shadow-soft backdrop-blur-md",
        kind === "lock" ? "bg-surface-inverse/85 text-primary-foreground" : "bg-primary text-primary-foreground",
        className,
      )}
    >
      {kind === "lock" ? <LockIcon className="size-3.5" /> : <PenIcon className="size-3.5" />}
      {text}
    </span>
  );
}

const widths = ["w-11/12", "w-4/5", "w-5/6", "w-3/5", "w-3/4", "w-full", "w-1/2"];

/** Text-shaped bars standing in for withheld paragraphs. */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-2.5", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={cn("h-3 rounded-pill bg-border", widths[i % widths.length])} />
      ))}
    </div>
  );
}

/**
 * Wraps placeholder content with a soft blur and a centred chip.
 * `label` is announced to screen readers so the locked state isn't purely visual.
 */
export function LockedOverlay({
  kind = "lock",
  srLabel,
  className,
  children,
}: {
  kind?: "lock" | "input";
  srLabel: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden="true" className="pointer-events-none select-none blur-sm">
        {children}
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <LockChip kind={kind} />
        <span className="sr-only">{srLabel}</span>
      </div>
    </div>
  );
}
