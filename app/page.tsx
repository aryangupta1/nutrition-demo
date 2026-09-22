import { contact, home, practitioner } from "@/content/site";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SiteChrome } from "@/components/sections/SiteChrome";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <SiteChrome>
      <Hero content={home.hero} image={practitioner.image} />
      <About content={home.about} practitioner={practitioner} />
      <Services content={home.services} />
      <Approach content={home.approach} />
      <Testimonials content={home.testimonials} />
      <FAQ content={home.faq} aside={home.faq.aside} />
      <CTA content={home.cta} clinics={contact.clinics} />
    </SiteChrome>
  );
}
