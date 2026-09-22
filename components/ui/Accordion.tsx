import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * `content` omitted = a static (non-expandable) row, e.g. a locked preview item.
 * `aside` renders at the end of a static row (e.g. a "To be built" chip).
 */
export type AccordionItem = { id?: string; title: ReactNode; content?: ReactNode; aside?: ReactNode };

type Variant = "lines" | "pill";

const shells: Record<Variant, { list: string; row: string; summary: string; body: string }> = {
  lines: {
    list: "divide-y divide-border border-y border-border",
    row: "",
    summary: "items-start py-5",
    body: "pb-6 pr-12",
  },
  pill: {
    list: "flex flex-col gap-3",
    row: "rounded-panel bg-surface-muted transition-colors open:bg-surface-sage",
    summary: "items-center px-6 py-4 sm:px-7",
    body: "px-6 pb-6 pr-14 sm:px-7",
  },
};

/**
 * Native <details>/<summary> accordion: keyboard accessible and works without JS.
 * `headingLevel` wraps each title in a heading so it appears in the outline.
 * `variant="pill"`: soft-tinted rounded rows (Holistic FAQ) instead of hairline dividers.
 */
export function Accordion({
  items,
  headingLevel = "h3",
  variant = "lines",
  className,
}: {
  items: AccordionItem[];
  headingLevel?: "h3" | "h4";
  variant?: Variant;
  className?: string;
}) {
  if (items.length === 0) return null;
  const HeadingTag = headingLevel;
  const shell = shells[variant];
  return (
    <div className={cn(shell.list, className)}>
      {items.map((item, i) =>
        item.content === undefined ? (
          <div
            key={item.id ?? i}
            id={item.id}
            className={cn("flex min-h-tap flex-wrap items-center justify-between gap-x-6 gap-y-3", shell.row, shell.summary)}
          >
            <HeadingTag className="text-h4 font-medium text-text">{item.title}</HeadingTag>
            {item.aside}
          </div>
        ) : (
          <details key={item.id ?? i} id={item.id} className={cn("group", shell.row)}>
            <summary
              className={cn(
                "flex min-h-tap cursor-pointer justify-between gap-6 text-text transition-colors hover:text-primary",
                shell.summary,
              )}
            >
              <HeadingTag className="text-h4 font-medium">{item.title}</HeadingTag>
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-pill border border-border-strong transition-transform duration-300 group-open:rotate-45"
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className={cn("max-w-measure text-body text-text-muted", shell.body)}>{item.content}</div>
          </details>
        ),
      )}
    </div>
  );
}
