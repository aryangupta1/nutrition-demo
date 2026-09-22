import type { ReactNode } from "react";
import { contact, home, practitioner, site } from "@/content/site";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/** Nav + main + Footer wired to content/site.ts, shared by public pages. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav name={practitioner.name} title={practitioner.shortTitle} links={site.nav} cta={home.hero.primaryCta} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer
        name={practitioner.name}
        title={practitioner.shortTitle}
        postNominals={practitioner.postNominals}
        summary={home.footer.summary}
        nav={site.nav}
        clinics={contact.clinics}
        phone={{ display: contact.phone, e164: contact.phoneE164 }}
        email={contact.email}
        social={contact.social}
        practiceLink={{ label: home.footer.practiceLinkLabel, href: practitioner.practiceUrl }}
        internalLinks={home.footer.internalLinks}
      />
    </>
  );
}
