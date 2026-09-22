import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isInternalHref } from "./href";

type Tone = "primary" | "inherit";

const tones: Record<Tone, string> = {
  primary: "text-primary hover:text-primary-hover",
  inherit: "text-inherit hover:text-primary",
};

type TextLinkProps = {
  href: string;
  tone?: Tone;
  /** Underline at rest (default true; always underlined on hover). */
  underline?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/**
 * Inline text link. next/link for internal routes and anchors, <a> otherwise
 * (external, tel:, mailto:). Named TextLink to avoid clashing with next/link.
 */
export function TextLink({ href, tone = "primary", underline = true, className, children, ...rest }: TextLinkProps) {
  const classes = cn(
    "underline-offset-4 decoration-1 transition-colors hover:underline",
    underline && "underline",
    tones[tone],
    className,
  );
  if (isInternalHref(href)) {
    return (
      <NextLink href={href} className={classes} {...rest}>
        {children}
      </NextLink>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
