import type { Metadata } from "next";
import { contact, practitioner, site } from "@/content/site";
import { stock } from "@/content/stock";
import { JsonLd } from "@/components/seo/JsonLd";
import { FullBuildPanel } from "@/components/preview/FullBuildPanel";
import { buildMetadata, homeGraph } from "@/lib/seo";
import { getHomeContent } from "@/lib/content";
import { getContentAccess, isPreview } from "@/lib/site-mode";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Concerns } from "@/components/sections/Concerns";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SiteChrome } from "@/components/sections/SiteChrome";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = buildMetadata({
  title: site.defaultTitle,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

/**
 * Full mode: static. Preview mode: content is gated server-side (lib/content.ts), so locked
 * copy never reaches the HTML or RSC payload; with PREVIEW_UNLOCK_CODE set the page reads the
 * unlock cookie and becomes dynamic.
 */
export default async function Home() {
  const access = await getContentAccess();
  const content = getHomeContent(access);
  return (
    <SiteChrome>
      {/* JSON-LD would publish every FAQ answer and service description, so previews omit it. */}
      {isPreview ? null : <JsonLd data={homeGraph()} />}
      <Hero content={content.hero} image={practitioner.image} />
      <Concerns content={content.concerns} />
      <About content={content.about} practitioner={practitioner} image={stock["about-desk"]} />
      <Services content={content.services} />
      <Approach content={content.approach} />
      <Testimonials content={content.testimonials} placeholder={content.needsInput?.testimonials} />
      <FAQ content={content.faq} aside={content.faq.aside} />
      <CTA
        content={content.cta}
        clinics={contact.clinics}
        background={stock["cta-botanical"]}
        hours={content.needsInput?.hours}
      />
      {isPreview ? <FullBuildPanel /> : null}
    </SiteChrome>
  );
}
