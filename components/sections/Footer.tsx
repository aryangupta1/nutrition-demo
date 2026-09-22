import type { Clinic, Link } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";

export type FooterProps = {
  name: string;
  title?: string;
  postNominals?: string;
  summary?: string;
  nav: Link[];
  clinics?: Clinic[];
  phone?: { display: string; e164: string };
  email?: string;
  social?: Link[];
  practiceLink?: Link;
  internalLinks?: Link[];
  /** Accessible label for the footer nav (UI chrome). */
  navLabel?: string;
};

const linkClass = "inline-flex min-h-tap items-center text-small";

/** Site footer: identity, nav, clinic addresses, contact and social (rel="me"). */
export function Footer({
  name,
  title,
  postNominals,
  summary,
  nav,
  clinics = [],
  phone,
  email,
  social = [],
  practiceLink,
  internalLinks = [],
  navLabel = "Footer",
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-h3 text-text">{name}</p>
            {title || postNominals ? (
              <Text size="small" tone="muted" className="mt-1">
                {[title, postNominals].filter(Boolean).join(" · ")}
              </Text>
            ) : null}
            {summary ? (
              <Text size="small" tone="muted" className="mt-4 max-w-measure">
                {summary}
              </Text>
            ) : null}
          </div>

          <nav aria-label={navLabel} className="lg:col-span-2">
            <ul className="flex flex-col">
              {nav.map((l) => (
                <li key={l.href}>
                  <TextLink href={l.href} tone="inherit" underline={false} className={linkClass}>
                    {l.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </nav>

          {clinics.length > 0 ? (
            <ul className="flex flex-col gap-4 lg:col-span-3">
              {clinics.map((c) => (
                <li key={c.name}>
                  <p className="text-small font-semibold text-text">{c.name}</p>
                  <address className="text-small not-italic text-text-muted">
                    {c.streetAddress}, {c.locality} {c.region} {c.postalCode}
                  </address>
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="flex flex-col lg:col-span-3">
            {phone ? (
              <li>
                <TextLink href={`tel:${phone.e164}`} className={linkClass}>
                  {phone.display}
                </TextLink>
              </li>
            ) : null}
            {email ? (
              <li>
                <TextLink href={`mailto:${email}`} className={linkClass}>
                  {email}
                </TextLink>
              </li>
            ) : null}
            {social.map((s) => (
              <li key={s.href}>
                <TextLink href={s.href} rel="me" tone="inherit" className={linkClass}>
                  {s.label}
                </TextLink>
              </li>
            ))}
            {practiceLink ? (
              <li>
                <TextLink href={practiceLink.href} tone="inherit" className={linkClass}>
                  {practiceLink.label}
                </TextLink>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Text size="small" tone="muted">
            &copy; {year} {name}
          </Text>
          {internalLinks.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6">
              {internalLinks.map((l) => (
                <li key={l.href}>
                  <TextLink href={l.href} tone="inherit" underline={false} className={linkClass}>
                    {l.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
