import type { ReactNode } from "react";
import { splitAccent } from "@/lib/accent";
import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4" | "p";
type Size = "display" | "h1" | "h2" | "h3" | "h4";

const sizes: Record<Size, string> = {
  display: "font-display text-display font-normal",
  h1: "font-display text-h1 font-normal",
  h2: "font-display text-h2 font-normal",
  h3: "font-display text-h3 font-normal",
  h4: "font-sans text-h4 font-semibold",
};

/** Renders "*word*" in a content string as the accent word (italic serif, primary colour). */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {splitAccent(text).map((part, i) =>
        part.accent ? (
          <em key={i} className="font-display italic text-primary">
            {part.text}
          </em>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

/**
 * Semantic level (`as`) is decoupled from visual `size`, so heading order stays
 * logical while the look can change. Colour inherits from the section tone.
 * String children support one `*accent*` word (see lib/accent.ts).
 */
export function Heading({
  as: Tag = "h2",
  size,
  id,
  className,
  children,
}: {
  as?: Level;
  size?: Size;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const visual: Size = size ?? (Tag === "p" ? "h3" : Tag);
  return (
    <Tag id={id} className={cn("text-balance text-text", sizes[visual], className)}>
      {typeof children === "string" ? <Accent text={children} /> : children}
    </Tag>
  );
}
