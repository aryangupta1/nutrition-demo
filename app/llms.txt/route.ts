import { contact, home, practitioner, site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt (https://llmstxt.org): a plain Markdown summary for AI assistants.
 * Generated at build time from content/site.ts, so it always matches the visible site.
 * Section labels below are structural; every fact comes from content/site.ts.
 */
export const dynamic = "force-static";

const link = (label: string, href: string, note?: string) => `- [${label}](${href})${note ? `: ${note}` : ""}`;

function body(): string {
  const { hero, about, services, approach, faq, cta } = home;
  const address = (c: (typeof contact.clinics)[number]) =>
    `${c.streetAddress}, ${c.locality} ${c.region} ${c.postalCode}, Australia`;
  const telehealth = faq.items.find((f) => /telehealth/i.test(f.question));

  const lines: string[] = [
    `# ${practitioner.name}`,
    "",
    `> ${site.description}`,
    "",
    `${practitioner.name}, ${practitioner.postNominals}, is an ${practitioner.jobTitle}. ${home.footer.summary}`,
    `Her practice is ${practitioner.practiceName} (${practitioner.practiceUrl}); bookings go through the ${practitioner.practiceName} online booking system.`,
    "",
    "## Site",
    link(about.eyebrow, absoluteUrl("/#about"), about.lead),
    link(services.heading, absoluteUrl("/#services"), services.lead),
    link(approach.heading, absoluteUrl("/#approach"), approach.lead),
    link(faq.heading, absoluteUrl("/#faq")),
    link(cta.heading, absoluteUrl("/#contact"), home.footer.summary),
    "",
    "## Booking and contact",
    link(hero.primaryCta.label, hero.primaryCta.href, `${practitioner.practiceName} online booking`),
    link(hero.secondaryCta.label, hero.secondaryCta.href),
    `- Phone / SMS: ${contact.phone} (${contact.phoneE164})`,
    link(`${practitioner.practiceName} contact page`, contact.enquiryUrl),
    "",
    "## Clinics",
    ...contact.clinics.map((c) => `- ${c.name}: ${address(c)}. ${c.directions}`),
    ...(telehealth ? [`- Telehealth (${contact.telehealthArea}): ${telehealth.answer}`] : []),
    "",
    "## Credentials",
    ...practitioner.credentials.map((c) => `- ${c}`),
    ...practitioner.qualifications.map((q) => `- ${q}`),
    ...practitioner.memberships.map((m) => `- Member of ${m.name} (${m.url})`),
    "",
    "## Services",
    ...services.items.map(
      (s) => `- ${s.title}: ${s.summary} Includes ${s.items.join("; ")}.${s.note ? ` ${s.note}` : ""}`,
    ),
    ...services.consultTypes.map((t) => `- ${t.title}: ${t.summary} ${t.rebates}`),
    "",
    "## FAQ",
    ...faq.items.map((f) => `- ${f.question} ${f.answer}`),
    "",
    "## Optional",
    link(home.footer.practiceLinkLabel, practitioner.practiceUrl),
    link(`About ${practitioner.name} on ${practitioner.practiceName}`, practitioner.profileUrl),
    ...contact.social.map((s) => link(s.label, s.href)),
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
