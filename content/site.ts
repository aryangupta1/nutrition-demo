/**
 * All site copy lives here. Components never hard-code copy.
 *
 * Rules (see CLAUDE.md):
 * - Only facts verified in content/practitioner.md. Never invent credentials,
 *   testimonials, statistics, prices or health claims.
 * - Anything unconfirmed stays `undefined` / empty, and the UI hides it.
 *   Search this file for "TODO" to see what Annette still needs to confirm.
 */

export type Link = { label: string; href: string };

export type Clinic = {
  name: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  directions: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  items: string[];
  note?: string;
};

export type ConsultType = {
  title: string;
  summary: string;
  rebates: string;
};

export type Step = { title: string; body: string };

export type FaqItem = { question: string; answer: string };

export type Testimonial = { quote: string; name: string; context?: string };

export const practitioner = {
  name: "Annette Low",
  givenName: "Annette",
  familyName: "Low",
  postNominals: "BND(Hon), APD, AdvDipNat",
  jobTitle: "Accredited Practising Dietitian, Nutritionist and Naturopath",
  shortTitle: "Dietitian, Nutritionist & Naturopath",
  practiceName: "Nutritionpath",
  practiceUrl: "https://nutritionpath.com.au",
  /** Her own bio page on the Nutritionpath site (source A in practitioner.md). Used for schema sameAs. */
  profileUrl: "https://nutritionpath.com.au/blog/f/about-me",
  image: {
    src: "/images/annette-low.jpg",
    width: 1200,
    height: 1257,
    alt: "Portrait of Annette Low, Accredited Practising Dietitian, smiling in a black top against a light grey wall",
  },
  qualifications: [
    "Bachelor of Nutrition and Dietetics (Honours, First Class), 2010",
    "Advanced Diploma of Naturopathy, 2018",
    "Master of Commerce",
    "Bachelor of Business (Communications)",
  ],
  credentials: ["Accredited Practising Dietitian (APD)"],
  memberships: [
    { name: "Dietitians Australia", url: "https://dietitiansaustralia.org.au" },
    { name: "Complementary Medicine Association", url: "https://www.cma.asn.au" },
  ],
  knowsAbout: [
    "Digestive health",
    "Irritable bowel syndrome (IBS)",
    "Reflux",
    "SIBO",
    "Food intolerances",
    "Insulin resistance",
    "Type 2 diabetes",
    "Weight management",
    "PCOS",
    "Perimenopause and menopause",
    "Thyroid health",
    "Heart health",
    "Bone health",
    "Medical nutrition therapy",
    "Naturopathy",
  ],
} as const;

export const contact = {
  phone: "0414 994 958",
  phoneE164: "+61414994958",
  // TODO: her live site links hello@nutritionpath.co (.co, not .com.au). Confirm before displaying.
  email: undefined as string | undefined,
  bookingUrl: "https://nutritionpath.bookings.pracsuite.com",
  enquiryUrl: "https://nutritionpath.com.au/contact-us",
  telehealthArea: "Australia-wide",
  clinics: [
    {
      name: "Marrickville clinic",
      streetAddress: "Suite 3, 136 Marrickville Road",
      locality: "Marrickville",
      region: "NSW",
      postalCode: "2204",
      country: "AU",
      directions: "Inside Urban CoWork, on the corner of Gerald Street. Free council parking on Frampton Avenue, about a 7-minute walk.",
    },
    {
      name: "Potts Point clinic",
      streetAddress: "6/1 Ward Avenue",
      locality: "Potts Point",
      region: "NSW",
      postalCode: "2011",
      country: "AU",
      directions: "Within True Health Medical Practice, entered via Barncleuth Square. About 500 m from Kings Cross station.",
    },
  ] satisfies Clinic[],
  // TODO: her site lists conflicting clinic days/hours. Confirm, then add openingHours for schema + UI.
  openingHours: undefined as undefined | { days: string; hours: string; location: string }[],
  social: [
    { label: "Instagram", href: "https://instagram.com/nutritionpath_by_annette" },
    { label: "Facebook", href: "https://www.facebook.com/Nutritionpath" },
  ] satisfies Link[],
};

export const site = {
  // TODO: set once her personal domain is registered (e.g. annettelow.com.au).
  // Until then lib/seo falls back to the Vercel production URL.
  url: undefined as string | undefined,
  locale: "en_AU",
  name: `${practitioner.name}, ${practitioner.shortTitle}`,
  titleTemplate: `%s | ${practitioner.name}`,
  /** Label for the home item in BreadcrumbList schema. */
  homeLabel: "Home",
  defaultTitle: `${practitioner.name}: Dietitian, Nutritionist & Naturopath in Sydney`,
  description:
    "Annette Low is an Accredited Practising Dietitian, nutritionist and naturopath seeing adults and teenagers in Marrickville and Potts Point, Sydney, and by telehealth across Australia.",
  nav: [
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Approach", href: "/#approach" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ] satisfies Link[],
};

export const home = {
  hero: {
    eyebrow: "Marrickville · Potts Point · Telehealth",
    heading: "Annette Low, dietitian, nutritionist and naturopath in Sydney",
    // Answer-first: who, what, who she helps, where.
    lead:
      "I'm an Accredited Practising Dietitian and naturopath. I help adults and teenagers with digestive, metabolic, hormonal and chronic health concerns, in clinic in Marrickville and Potts Point and by telehealth across Australia.",
    primaryCta: { label: "Book a consultation", href: contact.bookingUrl },
    secondaryCta: { label: "Book a free 10-minute call", href: contact.bookingUrl },
  },

  about: {
    eyebrow: "About Annette",
    heading: "Evidence-based nutrition, with a whole-person view",
    lead:
      "Annette Low is an Accredited Practising Dietitian (APD) in private practice, with an Honours degree in Nutrition and Dietetics and an Advanced Diploma of Naturopathy.",
    paragraphs: [
      "Many of her clients have diagnosed, sometimes complex medical conditions. Others are generally well and want professional guidance to feel and perform at their best.",
      "Alongside medical nutrition therapy, Annette offers naturopathic services such as holistic health assessments, functional pathology testing and herbal supplement advice.",
      "Before nutrition, Annette completed a Master of Commerce and a Bachelor of Business (Communications). She describes it as a long journey, and one she's very glad she made.",
    ],
    quote: {
      text: "I haven't given up hope that everyone can improve their health via nutrition, even in small ways.",
      attribution: "Annette Low",
    },
  },

  services: {
    eyebrow: "Areas of expertise",
    heading: "What Annette can help with",
    lead:
      "Annette Low works with adults and teenagers on digestive, metabolic, hormonal, immune and chronic health concerns, using food first and adding supplements or functional testing where appropriate.",
    items: [
      {
        slug: "digestive-health",
        title: "Digestive health",
        summary: "Support for ongoing gut symptoms and digestive conditions.",
        items: ["Reflux and upper digestive symptoms", "IBS, bloating and abdominal discomfort", "Constipation and diarrhoea", "SIBO", "Food intolerances and sensitivities"],
      },
      {
        slug: "metabolic-health",
        title: "Metabolic health & weight",
        summary: "Nutrition care for blood sugar, cholesterol and weight concerns.",
        items: ["Weight management", "Insulin resistance, prediabetes and type 2 diabetes", "High cholesterol and triglycerides", "Fatty liver disease", "Metabolic syndrome"],
      },
      {
        slug: "hormonal-health",
        title: "Hormonal health",
        summary: "Nutrition support through hormonal change and conditions.",
        items: ["Perimenopause and menopause", "PCOS", "Thyroid conditions, including hypothyroidism", "Hormone-related weight concerns"],
      },
      {
        slug: "allergies-immune",
        title: "Allergies, intolerances & immunity",
        summary: "Working out which foods affect you, and supporting immune health.",
        items: ["Food intolerances", "Histamine-related symptoms", "Allergic conditions", "Recurrent infections"],
      },
      {
        slug: "chronic-conditions",
        title: "Chronic health conditions",
        summary: "Long-term nutrition care as part of your health care team.",
        items: ["Cardiovascular disease", "Healthy ageing", "Osteoporosis and bone health", "Inflammatory conditions", "Complex health concerns"],
      },
      {
        slug: "functional-testing",
        title: "Functional health testing",
        summary: "Testing, where appropriate, to understand what's driving your symptoms.",
        items: ["Gut microbiome testing", "SIBO breath testing", "Vitamin and mineral testing", "Comprehensive thyroid testing", "Stress hormone testing"],
        note: "Functional tests aren't covered by Medicare and may involve additional costs.",
      },
    ] satisfies Service[],
    consultTypes: [
      {
        title: "Dietetic consultation",
        summary: "Evidence-based medical nutrition therapy for diagnosed health conditions, using a food-first approach.",
        rebates: "Medicare rebates may apply with a GP Chronic Disease or Eating Disorders Management Plan. Some private health funds cover dietetics under Extras.",
      },
      {
        title: "Naturopathic consultation",
        summary: "A broader, holistic approach that can include functional testing and herbal or nutritional supplements.",
        rebates: "Not covered by Medicare or private health funds.",
      },
    ] satisfies ConsultType[],
  },

  approach: {
    eyebrow: "How Annette works",
    heading: "Patterns, processes and personalisation",
    lead:
      "Annette Low's approach combines evidence-based nutrition with a detailed look at your symptoms, health history, diet and relevant test results, because everyone responds to food differently.",
    pillars: [
      { title: "Patterns of intake", body: "What you eat and take, including your diet, supplements, meal structure and timing." },
      { title: "Health processes", body: "How digestion, metabolism and hormones influence the way your body is working and responding to food, with testing where appropriate." },
      { title: "Personal situation", body: "Your lifestyle, stress levels, routine and environment." },
    ] satisfies Step[],
    stepsHeading: "What to expect",
    steps: [
      { title: "Initial consultation", body: "About 60 minutes to assess your needs and goals, gather information and identify health priorities." },
      { title: "Your treatment plan", body: "At the second session, Annette sets up your plan of action and treatment program." },
      { title: "Review and adjust", body: "Regular follow-ups track your progress, arrange further tests if needed, and adjust the plan." },
    ] satisfies Step[],
    stepsNote: "Annette encourages clients to plan for at least three sessions.",
  },

  // TODO: none published on her current site. Add only real, approved testimonials. Section hides when empty.
  testimonials: {
    eyebrow: "Client stories",
    heading: "What clients say",
    items: [] as Testimonial[],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions clients often ask",
    aside: {
      heading: "Still wondering if it's the right fit?",
      body: "Book a free 10-minute phone call to talk it through before you commit.",
      cta: { label: "Book a free 10-minute call", href: contact.bookingUrl },
    },
    items: [
      {
        question: "Should I book a dietetic or a naturopathic consultation?",
        answer:
          "If you have a medical condition that needs medical nutrition therapy, book a dietetic consultation, which uses established dietetic practice to treat health conditions. If you'd prefer a holistic approach that can include wellbeing, herbal supplements and functional health testing, a naturopathic consultation suits you better.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "For chronic health problems of six months or more, three to five consultations is a good start. For long-standing and complex problems, a 12-month membership is available for ongoing coaching and support. If you're unsure, you can book a free 10-minute discovery call first.",
      },
      {
        question: "What happens in the first consultation?",
        answer:
          "The initial consultation takes about 60 minutes. Annette assesses your needs and goals, identifies health priorities and drafts a plan of action. Follow-up sessions review how the plan is working, arrange further tests if needed, and then focus on maintaining your progress.",
      },
      {
        question: "Can I claim a Medicare rebate?",
        answer:
          "Medicare rebates apply only to dietetic consultations under a Chronic Disease Management Plan or an Eating Disorders Management Plan. Your GP can check your eligibility. Consultations aren't bulk billed, but you can claim the rebate with a valid referral. Naturopathic services aren't covered by Medicare.",
      },
      {
        question: "Can I claim through my private health fund?",
        answer:
          "Some health funds offer rebates for dietetics under Extras cover, so check with your fund. Private health fund claiming is available in clinic via HealthPoint. Naturopathy is no longer covered by private health funds.",
      },
      {
        question: "Do you offer telehealth appointments?",
        answer:
          "Yes. Annette offers video and phone consultations Monday to Friday for clients anywhere in Australia.",
      },
      {
        question: "Where are the clinics?",
        answer:
          "Annette sees clients in person at Suite 3, 136 Marrickville Road, Marrickville NSW 2204, and at 6/1 Ward Avenue, Potts Point NSW 2011, inside True Health Medical Practice.",
      },
      {
        question: "How do I book an appointment?",
        answer:
          "Book online through the Nutritionpath booking system. You'll get an SMS confirming your appointment and an email with a link to the Pre-Assessment Form, which helps Annette prepare for your first consultation.",
      },
    ] satisfies FaqItem[],
  },

  cta: {
    heading: "Ready to talk about your health?",
    body: "Book a consultation online, or start with a free 10-minute phone call to see whether Annette is the right fit for you.",
    primaryCta: { label: "Book a consultation", href: contact.bookingUrl },
    secondaryCta: { label: `Call ${contact.phone}`, href: `tel:${contact.phoneE164}` },
  },

  footer: {
    summary: "Consultations by appointment in Marrickville and Potts Point, Sydney, and online throughout Australia.",
    practiceLinkLabel: "Visit the Nutritionpath practice site",
    internalLinks: [{ label: "Why a personal website?", href: "/why-a-website" }] satisfies Link[],
  },
};

/**
 * /why-a-website: an internal pitch addressed to Annette (noindex, footer link only).
 * Written in second person. No statistics or promised outcomes.
 */
export const whyWebsite = {
  meta: {
    title: "Why a personal website?",
    description: "Why a personal website under Annette Low's own name works alongside the Nutritionpath practice site.",
  },
  hero: {
    eyebrow: "For Annette",
    heading: "Why a personal website, alongside Nutritionpath?",
    lead:
      "Nutritionpath already does a lot of work for your practice. This site adds a second front door with your own name on it. It's built to be found in search engines and AI assistants, and every booking still goes through the Nutritionpath booking system you already use.",
  },
  sections: [
    {
      id: "complement",
      heading: "It adds to Nutritionpath, it doesn't replace it",
      body: "The Nutritionpath site holds your practice details: fees, forms, the reflux guide, the online store and your booking system. This site is a focused introduction to you, the practitioner. Its booking buttons send people straight to your existing Nutritionpath bookings, so nothing about how you run your practice changes.",
    },
    {
      id: "brand",
      heading: "Your name becomes your brand",
      body: "People often search for a practitioner by name after a GP referral or a friend's recommendation. A site under your own name answers that search directly, with your qualifications, experience and approach in one place. It stays yours whatever happens to any practice name, platform or website builder in the future.",
    },
    {
      id: "domain",
      heading: "Your own domain and a professional email",
      body: "A domain like annettelow.com.au, with a matching email address, looks established and is easy to remember. It also fixes small inconsistencies: at the moment your contact email and website use different domain endings, which can confuse people.",
    },
    {
      id: "control",
      heading: "Full control over how you're presented",
      body: "You decide the wording, the order of your services and what's emphasised. All the text lives in one file, so updating a detail such as clinic hours is quick. The site is also fast, works well on phones, and meets accessibility standards.",
    },
    {
      id: "seo",
      heading: "Being found on Google (SEO)",
      body: "SEO, or search engine optimisation, simply means making a website easy for Google to understand and show to the right people. This site is built so Google can clearly see who you are, what you help with and where you practise, so it can appear for searches like your name, \"dietitian Marrickville\", \"naturopath Potts Point\" or \"reflux dietitian Sydney\". Each page carries structured information that Google reads directly, such as your clinic addresses and your answers to common questions.",
    },
    {
      id: "geo",
      heading: "Being recommended by AI assistants (GEO)",
      body: "More people now ask ChatGPT, Claude, Perplexity or Google's AI answers questions like \"who's a good dietitian for IBS in Sydney?\". GEO, or generative engine optimisation, means shaping your website so these tools can understand and quote it. They favour clear, factual, consistent information: who you are, your credentials, what you treat, where you are, and plain answers to common questions. This site is written that way. It includes a summary file written specifically for AI tools, and it keeps your name, qualifications and locations identical everywhere so they can be confident they're describing the right person.",
    },
    {
      id: "share",
      heading: "One link to share everywhere",
      body: "Use one simple address on your Instagram and Facebook profiles, business cards, email signature and GP referral letters. It gives people a clear first impression and a direct path to book.",
    },
    {
      id: "grow",
      heading: "Room to grow",
      body: "The site can grow with you: articles, downloadable resources, a newsletter or online programs can be added later without starting again. Every useful article is also another page for Google and AI assistants to find.",
    },
    {
      id: "cost",
      heading: "Low running cost, little maintenance",
      body: "The site runs on Vercel, a hosting service used by many large websites. There's no database and no plugins to update, so there's very little that can break or be hacked. Running costs are the yearly domain renewal and a modest monthly hosting plan for business use. Day-to-day changes mean editing one text file.",
    },
  ],
  together: {
    heading: "How it works together",
    lead: "Two sites, one booking system. Each one brings people to you in a different way.",
    channels: [
      {
        title: "Your personal site",
        points: ["Found when people search your name", "Recommended by AI assistants", "Shared on social media, business cards and referrals"],
      },
      {
        title: "Nutritionpath",
        points: ["Your existing search presence", "Fees, forms, guides and online store", "Your established practice brand"],
      },
    ],
    destination: {
      title: "Nutritionpath bookings",
      body: "Both sites send clients to the same online booking system, so your diary, reminders and pre-assessment forms stay exactly as they are.",
    },
  },
  nextSteps: {
    heading: "What we need from you",
    lead: "A few details need your confirmation before the site goes live. Nothing is published until you're happy with it.",
    items: [
      "Your current clinic days and hours for Marrickville, Potts Point and Saturdays",
      "Your preferred contact email (your site currently shows hello@nutritionpath.co)",
      "Whether you'd like your fees shown, and the current amounts",
      "Any client testimonials you're comfortable publishing, with the client's permission",
      "Your preferred domain name, plus links to any LinkedIn or Google Business Profile",
      "A higher-resolution headshot, if you have one",
    ],
  },
};
