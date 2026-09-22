/**
 * Typed JSON-LD builders (schema.org). Every value comes from content/site.ts, which only holds
 * facts verified in content/practitioner.md. Rule: omit a property rather than guess.
 * Deliberately absent until confirmed: openingHours, email, prices, reviews/aggregateRating.
 */
import { contact, home, practitioner, site, type Clinic, type FaqItem, type Service } from "@/content/site";
import { absoluteUrl, siteUrl } from "./site-url";

/** Minimal JSON-LD node type: no schema-dts dependency. */
export type JsonLdNode = { "@type": string | string[]; "@id"?: string; [key: string]: unknown };
export type JsonLdGraph = { "@context": "https://schema.org"; "@graph": JsonLdNode[] };

const ref = (id: string) => ({ "@id": id });

/** Stable @ids so every node links to the same entities across pages. */
export const ids = {
  person: `${siteUrl}/#person`,
  practice: `${siteUrl}/#practice`,
  website: `${siteUrl}/#website`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  faq: `${siteUrl}/#faq`,
  clinic: (clinic: Clinic) => `${siteUrl}/#clinic-${clinic.locality.toLowerCase().replace(/\s+/g, "-")}`,
  service: (service: Service) => `${siteUrl}/#service-${service.slug}`,
};

const imageUrl = absoluteUrl(practitioner.image.src);

function postalAddress(clinic: Clinic) {
  return {
    "@type": "PostalAddress",
    streetAddress: clinic.streetAddress,
    addressLocality: clinic.locality,
    addressRegion: clinic.region,
    postalCode: clinic.postalCode,
    addressCountry: clinic.country,
  };
}

/** Each clinic is a Place the practice operates from (not a separate business). */
export function clinicPlace(clinic: Clinic): JsonLdNode {
  return {
    "@type": "Place",
    "@id": ids.clinic(clinic),
    name: `${practitioner.practiceName} ${clinic.name}`,
    description: clinic.directions,
    address: postalAddress(clinic),
  };
}

/** Split "Bachelor of X (Hons), 2010" into name + year. */
function parseCredential(text: string) {
  const match = text.match(/^(.*),\s*(\d{4})$/);
  return match ? { name: match[1], year: match[2] } : { name: text, year: undefined };
}

function credentialCategory(name: string): string {
  if (/\b(Bachelor|Master)/i.test(name)) return "degree";
  if (/\bDiploma\b/i.test(name)) return "diploma";
  return "professional certification";
}

function credentials(): JsonLdNode[] {
  return [...practitioner.credentials, ...practitioner.qualifications].map((text) => {
    const { name, year } = parseCredential(text);
    return {
      "@type": "EducationalOccupationalCredential",
      name,
      credentialCategory: credentialCategory(name),
      ...(year ? { dateCreated: year } : {}),
    };
  });
}

export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: practitioner.name,
    givenName: practitioner.givenName,
    familyName: practitioner.familyName,
    honorificSuffix: practitioner.postNominals,
    jobTitle: practitioner.jobTitle,
    description: site.description,
    url: `${siteUrl}/`,
    image: { "@type": "ImageObject", url: imageUrl, width: practitioner.image.width, height: practitioner.image.height, caption: practitioner.image.alt },
    worksFor: ref(ids.practice),
    workLocation: contact.clinics.map((c) => ref(ids.clinic(c))),
    hasCredential: credentials(),
    memberOf: practitioner.memberships.map((m) => ({ "@type": "Organization", name: m.name, url: m.url })),
    knowsAbout: [...practitioner.knowsAbout],
    sameAs: [practitioner.profileUrl],
  };
}

export function practiceNode(): JsonLdNode {
  return {
    "@type": ["MedicalBusiness", "ProfessionalService"],
    "@id": ids.practice,
    name: practitioner.practiceName,
    url: practitioner.practiceUrl,
    telephone: contact.phoneE164,
    image: imageUrl,
    description: home.footer.summary,
    location: contact.clinics.map((c) => ref(ids.clinic(c))),
    areaServed: [
      { "@type": "City", name: "Sydney", containedInPlace: { "@type": "State", name: "New South Wales" } },
      { "@type": "Country", name: "Australia" },
    ],
    sameAs: [practitioner.practiceUrl, ...contact.social.map((s) => s.href)],
    potentialAction: {
      "@type": "ReserveAction",
      name: home.hero.primaryCta.label,
      target: { "@type": "EntryPoint", urlTemplate: contact.bookingUrl },
    },
  };
}

export function serviceNode(service: Service): JsonLdNode {
  return {
    "@type": "Service",
    "@id": ids.service(service),
    name: service.title,
    serviceType: service.title,
    description: [service.summary, `${service.items.join("; ")}.`, service.note].filter(Boolean).join(" "),
    url: absoluteUrl(`/#${service.slug}`),
    provider: ref(ids.person),
    brand: ref(ids.practice),
    areaServed: { "@type": "Country", name: "Australia" },
  };
}

export function faqNode(items: FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": ids.faq,
    url: absoluteUrl("/#faq"),
    isPartOf: ref(ids.webpage("/")),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbNode(path: string, trail: { name: string; path: string }[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(path),
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${siteUrl}/`,
    name: site.name,
    description: site.description,
    inLanguage: "en-AU",
    publisher: ref(ids.person),
    about: ref(ids.person),
  };
}

export function webPageNode({ path, name, description }: { path: string; name: string; description: string }): JsonLdNode {
  return {
    "@type": "WebPage",
    "@id": ids.webpage(path),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-AU",
    isPartOf: ref(ids.website),
    about: ref(ids.person),
    mainEntity: ref(ids.person),
    primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
    breadcrumb: ref(ids.breadcrumb(path)),
  };
}

/** Full @graph for the home page. */
export function homeGraph(): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      webPageNode({ path: "/", name: site.defaultTitle, description: site.description }),
      breadcrumbNode("/", [{ name: site.homeLabel, path: "/" }]),
      personNode(),
      practiceNode(),
      ...contact.clinics.map(clinicPlace),
      ...home.services.items.map(serviceNode),
      faqNode(home.faq.items),
    ],
  };
}
