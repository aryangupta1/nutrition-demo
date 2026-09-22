import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isInternalHref } from "./href";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-tap items-center justify-center gap-2 rounded-pill font-medium text-center transition-colors focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "border border-border-strong text-text hover:border-primary hover:text-primary",
  ghost: "text-primary underline-offset-4 hover:text-primary-hover hover:underline",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2 text-small",
  lg: "px-7 py-3 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

/**
 * Pill button. Pass `href` to render a link (next/link for internal routes,
 * <a> for external/tel/mailto), otherwise renders a <button>.
 */
export function Button({ variant = "primary", size = "md", className, children, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AsLink;
    if (isInternalHref(href)) {
      return (
        <NextLink href={href} className={classes} {...anchorProps}>
          {children}
        </NextLink>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as AsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
