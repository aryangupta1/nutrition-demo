# SEO & GEO

How this site is made findable by search engines (SEO) and quotable by AI assistants (GEO), where each piece lives, and how to maintain it.

**Single source of truth:** every fact in metadata, JSON-LD, llms.txt and the OG image comes from `content/site.ts`, which only holds facts verified in `content/practitioner.md`. Edit the copy there and all surfaces update on the next build.

## What lives where

| Surface | File | Notes |
|---|---|---|
| Site URL resolution | `lib/seo/site-url.ts` | `siteUrl`, `absoluteUrl()` |
| Page metadata helper | `lib/seo/metadata.ts` | `buildMetadata({ title, description, path, absoluteTitle?, noindex? })` |
| JSON-LD builders | `lib/seo/jsonld.ts` | Typed node builders + `homeGraph()` |
| JSON-LD renderer | `components/seo/JsonLd.tsx` | Server component, escapes `<` as `<` |
| Root defaults | `app/layout.tsx` | `metadataBase`, title template, default OG/Twitter |
| Social image | `app/opengraph-image.tsx`, `app/twitter-image.tsx` | 1200×630 PNG from `next/og`, built statically |
| robots.txt | `app/robots.ts` | |
| sitemap.xml | `app/sitemap.ts` | `/` only |
| llms.txt | `app/llms.txt/route.ts` | `dynamic = "force-static"`, Markdown, built from `content/site.ts` |
| Favicon | `app/favicon.ico` | Scaffold file, picked up by the file convention (no `icons` config) |

## Site URL (domain not chosen yet)

`siteUrl` resolves in this order. No env var is required.

1. `site.url` in `content/site.ts` (currently `undefined`)
2. `https://${VERCEL_PROJECT_PRODUCTION_URL}`: set automatically by Vercel on every build, so production deploys get absolute URLs for the `*.vercel.app` production domain
3. `http://localhost:3000`: local builds (so local `robots.txt`/`sitemap.xml`/canonicals show localhost; that's expected)

### When the domain is chosen

1. Set `site.url` in `content/site.ts`, e.g. `url: "https://annettelow.com.au"` (no trailing slash needed; it's stripped).
2. Add the domain in Vercel (Project → Domains) and make it the primary. Redirect `www` to the apex (or the other way) so there's one canonical host.
3. Rebuild/redeploy. Canonicals, `og:url`, sitemap, robots `Sitemap:` line, llms.txt links and every JSON-LD `@id` switch to the new domain.
4. Verify the domain in Google Search Console and Bing Webmaster Tools; submit `https://<domain>/sitemap.xml`.
5. Ask Annette to link the new site from Instagram, Facebook, her Nutritionpath about-me page and her Google Business Profile. Then add the new URL to `sameAs` on the Person/practice if she creates new profiles (LinkedIn etc.) in `content/site.ts`.
6. If she gets an email on that domain, set `contact.email` (the footer shows it; add `email` to the practice node in `lib/seo/jsonld.ts`).

## Metadata

- `app/layout.tsx` sets `metadataBase` (from `siteUrl`), `title: { default: site.defaultTitle, template: site.titleTemplate }`, `description`, and default `openGraph` (`type: website`, `locale: en_AU`, `siteName`) and `twitter` (`summary_large_image`).
- Every page calls `buildMetadata()`, which returns a unique title, description, `alternates.canonical`, a full `openGraph` and `twitter` object, and the shared social image. Next merges metadata **shallowly**, so a page's `openGraph` replaces the layout's; that's why the helper always rebuilds the whole object and references `/opengraph-image` and `/twitter-image` explicitly (file-based images only attach automatically in the segment that defines them).
- Home uses `absoluteTitle: true` (`Annette Low: Dietitian, Nutritionist & Naturopath in Sydney`). Other pages render as `<title> | Annette Low`.
- `/why-a-website` and `/design-system` pass `noindex: true` (`robots: noindex, nofollow`).

**Adding a page:** `export const metadata = buildMetadata({ title, description, path: "/new-page" })`, add it to `app/sitemap.ts` if it's public, add a `BreadcrumbList` (`breadcrumbNode(path, [{ name: site.homeLabel, path: "/" }, { name: title, path }])`) plus a `WebPage` node, and a link in `app/llms.txt/route.ts`.

## Social image

`app/opengraph-image.tsx` renders the name, short title, post-nominals, locations (hero eyebrow) and footer summary, with the headshot (read from `public/` at build time as a data URI) in an arch. `ImageResponse` can't read CSS variables, so the token hex values from `app/globals.css` are copied into the file with a comment; update them if the palette changes. It uses the built-in font (Satori needs TTF/OTF/WOFF; `next/font` ships woff2). `app/twitter-image.tsx` re-exports it. The alt text is defined in both `opengraph-image.tsx` and `lib/seo/metadata.ts` (keep in sync).

## robots.txt

```
User-Agent: *
Allow: /

User-Agent: GPTBot
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
Allow: /

Sitemap: <siteUrl>/sitemap.xml
```

- User decision: name **OpenAI only** (GPTBot = training, OAI-SearchBot = ChatGPT search, ChatGPT-User = live fetches). Every other crawler (Googlebot, Bingbot, ClaudeBot, PerplexityBot, Google-Extended, Applebot…) is allowed by the `*` group.
- `/design-system` and `/why-a-website` are **not** disallowed on purpose. They're kept out of search by `noindex` metadata + sitemap exclusion. A `Disallow` would stop Google reading the noindex, and `/why-a-website` is linked from the footer, so its bare URL could still be indexed.
- To block a crawler later: add `{ userAgent: "BotName", disallow: "/" }` to `rules`.

## sitemap.xml

`/` only. `lastModified` is intentionally omitted (a build timestamp would claim a change on every deploy). Add public pages as they're created.

## /llms.txt

Follows the [llms.txt](https://llmstxt.org) convention: H1 name, blockquote summary, short intro, then link sections (Site anchors, Booking and contact, Clinics incl. telehealth, Credentials, Services incl. consult types, FAQ, Optional: Nutritionpath site, about-me page, socials). It's generated from `content/site.ts` at build time (`export const dynamic = "force-static"`), so it never drifts from the page. Only structural section labels live in the route file.

## JSON-LD (home page `@graph`)

Rendered once on `/` via `<JsonLd data={homeGraph()} />`. `@id`s are stable (`${siteUrl}/#person`, `#practice`, `#website`, `/#webpage`, `/#breadcrumb`, `#faq`, `#clinic-marrickville`, `#clinic-potts-point`, `#service-<slug>`) so nodes cross-reference instead of repeating.

| Node | Key properties | Source |
|---|---|---|
| `WebSite` | name, url, inLanguage `en-AU`, publisher/about → Person | `site` |
| `WebPage` | name, description, isPartOf → WebSite, about/mainEntity → Person, breadcrumb, primaryImageOfPage | `site` |
| `BreadcrumbList` | Home | `site.homeLabel` |
| `Person` | name, given/family name, honorificSuffix, jobTitle, image, `worksFor` → practice, `workLocation` → clinics, `hasCredential` (5 × EducationalOccupationalCredential), `memberOf` (Dietitians Australia, Complementary Medicine Association), `knowsAbout`, `sameAs` (Nutritionpath about-me page) | `practitioner` |
| Practice `["MedicalBusiness","ProfessionalService"]` | name Nutritionpath, url nutritionpath.com.au, telephone, `location` → 2 Places, `areaServed` Sydney + Australia, `sameAs` (nutritionpath.com.au, Instagram, Facebook), `potentialAction` ReserveAction → PracSuite booking | `practitioner`, `contact` |
| `Place` × 2 | name, PostalAddress, directions | `contact.clinics` |
| `Service` × 6 | name, serviceType, description (summary + visible list + note), url `/#slug`, provider → Person, brand → practice, areaServed Australia | `home.services.items` |
| `FAQPage` | 8 Question/Answer pairs, text identical to the visible accordion | `home.faq.items` |

### Modelling decisions

- **Two locations: `location` → two `Place` nodes** on one practice entity. schema.org's `Organization.location` is defined as "the location of … where an organization is located" and accepts `Place`, so this is the literal fit. Alternatives rejected: `department` means an organisational sub-unit (a separately managed department), which these rooms aren't; two `address` values on one LocalBusiness are ambiguous (consumers pick one); modelling each clinic as its own `MedicalBusiness` would invent two businesses, and neither room is a business of its own (one is inside Urban CoWork, the other inside True Health Medical Practice). The Person's `workLocation` points at the same Places. If location landing pages are added later, each can become its own `MedicalBusiness` with `parentOrganization` → `#practice`.
- **Practice type:** `MedicalBusiness` (a LocalBusiness subtype for health practices) plus `ProfessionalService` as the agent brief asked. `medicalSpecialty` is not used because schema.org doesn't define it on MedicalBusiness.
- **Service `provider` → Person** because she delivers every service personally; `brand` → practice ties it to Nutritionpath.
- **Credentials:** category is derived from the qualification text (`degree` for Bachelor/Master, `diploma` for the Advanced Diploma, `professional certification` for APD) and the year is parsed from the trailing `, 2010`. `recognizedBy` is omitted (awarding institutions aren't in practitioner.md).
- **Deliberately omitted until confirmed:** `openingHours`/`openingHoursSpecification`, `email`, `priceRange`/offers, `aggregateRating`/`review`, `logo`, `geo` coordinates, `foundingDate`, `founder`.

### Validate

After deploying, paste the URL into the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). Locally: `curl -s localhost:3000 | node -e '…'` (see QA steps in `research/seo-audit.md`).

Note: Google only shows FAQ rich results for authoritative government and health sites, so don't expect FAQ snippets. The markup still helps AI assistants and other consumers.

## Adding things later

### Opening hours (once Annette confirms)
1. Set `contact.openingHours` in `content/site.ts` (add a per-clinic field if hours differ by location, which they currently seem to).
2. In `lib/seo/jsonld.ts`, add `openingHoursSpecification` to each clinic `Place` (for per-room hours) or to the practice node: `{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday"], opens: "09:00", closes: "18:00" }`. Use 24-hour times. Saturday "once or twice a month" can't be expressed as a regular spec; leave it to visible text.
3. Render the hours in the UI (the CTA/clinic cards) so the markup matches visible content, and add them to `app/llms.txt/route.ts` under Clinics.

### Testimonials (real, approved only)
1. Add them to `home.testimonials.items`; the section appears automatically.
2. **Do not** add `review` or `aggregateRating` markup for testimonials the site collects about itself: Google treats self-serving reviews on LocalBusiness/Organization as ineligible for review snippets. Keep testimonials genuine, with the client's written consent, and free of outcome claims (Australian Consumer Law prohibits misleading testimonials; check Dietitians Australia's current advertising guidance with Annette before publishing).
3. Better for search: link to her Google Business Profile reviews.

### Other profiles
Add LinkedIn / Google Business Profile URLs to `contact.social` (practice) or a new `practitioner.sameAs` list (person), and extend `personNode().sameAs`.

### Articles
Each article page: `buildMetadata()`, `Article`/`BlogPosting` JSON-LD with `author` → `{ "@id": ids.person }`, a `BreadcrumbList`, a sitemap entry, and an llms.txt link.

## Content rules for GEO

- Answer-first: every section opens with a self-contained sentence naming Annette Low, what she does, who she helps and where.
- Entities spelled identically everywhere: **Annette Low**, **Nutritionpath**, **Marrickville**, **Potts Point**, **Sydney**. Pull them from `content/site.ts`; never retype.
- FAQ answers in JSON-LD are generated from the same array as the visible accordion, so they can't drift.
- One H1 per page; headings in order (H1 → H2 per section → H3 cards/questions → H4 steps).
