import NextLink from "next/link";
import type { Link } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export type NavProps = {
  name: string;
  title?: string;
  links: Link[];
  cta?: Link;
  /** Accessible labels (UI chrome, not marketing copy). */
  labels?: { nav?: string; menu?: string };
};

/**
 * Sticky header. Mobile menu is a native <details> disclosure: no client JS.
 * Trade-off: the panel stays open after tapping an in-page anchor.
 */
export function Nav({ name, title, links, cta, labels = {} }: NavProps) {
  const navLabel = labels.nav ?? "Main";
  const menuLabel = labels.menu ?? "Menu";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6 py-3">
        <NextLink href="/" className="flex min-h-tap flex-col justify-center leading-tight">
          <span className="font-display text-h3 leading-none text-text">{name}</span>
          {title ? <span className="text-small text-text-muted">{title}</span> : null}
        </NextLink>

        {/* Desktop */}
        <nav aria-label={navLabel} className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <NextLink
                  href={link.href}
                  className="inline-flex min-h-tap items-center text-small font-medium text-text transition-colors hover:text-primary"
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>
          {cta ? (
            <Button href={cta.href} size="md">
              {cta.label}
            </Button>
          ) : null}
        </nav>

        {/* Mobile */}
        <details className="group relative lg:hidden">
          <summary className="inline-flex min-h-tap cursor-pointer items-center gap-2 rounded-pill border border-border-strong px-4 text-small font-medium text-text">
            {menuLabel}
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <nav
            aria-label={navLabel}
            className="absolute right-0 top-full mt-3 w-72 rounded-card border border-border bg-surface-raised p-4 shadow-lift"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    className="flex min-h-tap items-center rounded-sm px-3 text-body text-text hover:bg-surface-muted hover:text-primary"
                  >
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
            {cta ? (
              <Button href={cta.href} className="mt-3 w-full">
                {cta.label}
              </Button>
            ) : null}
          </nav>
        </details>
      </Container>
    </header>
  );
}
