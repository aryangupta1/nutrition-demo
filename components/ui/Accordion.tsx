import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id?: string; title: ReactNode; content: ReactNode };

/**
 * Native <details>/<summary> accordion: keyboard accessible and works without JS.
 * `headingLevel` wraps each title in a heading so it appears in the outline.
 */
export function Accordion({
  items,
  headingLevel = "h3",
  className,
}: {
  items: AccordionItem[];
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  if (items.length === 0) return null;
  const HeadingTag = headingLevel;
  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => (
        <details key={item.id ?? i} id={item.id} className="group">
          <summary className="flex min-h-tap cursor-pointer items-start justify-between gap-6 py-5 text-text transition-colors hover:text-primary">
            <HeadingTag className="text-h4 font-medium">{item.title}</HeadingTag>
            <span
              aria-hidden="true"
              className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-pill border border-border-strong transition-transform duration-300 group-open:rotate-45"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2v12M2 8h12" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="max-w-measure pb-6 pr-12 text-body text-text-muted">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
