# SEO / GEO audit

_2026-09-22 · seo-geo-specialist · scope: `content/site.ts` copy, `/`, `/why-a-website`, `/design-system`, crawl surfaces._

## Summary

The copy was already strong for GEO: the hero lead and About lead are answer-first and name the entity, the FAQ is server-rendered in native `<details>` (in the HTML for crawlers), and locations are spelled consistently. Two section leads opened without the full name or without an entity-first sentence; both were fixed with restatements of verified facts. The main open issue is that the home H1 doesn't contain "Annette Low" (needs a decision, see below).

## Copy changes made (content/site.ts)

| # | Where | Before | After | Basis |
|---|---|---|---|---|
| 1 | `home.services.lead` | "Annette works with adults and teenagers on…" | "Annette Low works with adults and teenagers on…" | Full name on the first mention in a section so the sentence stands alone when quoted. practitioner.md "Name" [A, H] |
| 2 | `home.approach.lead` | "Everyone responds to food differently. Annette's approach combines evidence-based nutrition with a detailed look at your symptoms, health history, diet and relevant test results." | "Annette Low's approach combines evidence-based nutrition with a detailed look at your symptoms, health history, diet and relevant test results, because everyone responds to food differently." | Answer-first reorder (who + what first). Same facts; practitioner.md "Approach / philosophy" [H] |

Non-copy data added to `content/site.ts`:
- `practitioner.profileUrl` = `https://nutritionpath.com.au/blog/f/about-me` (source A in practitioner.md), used for Person `sameAs` and llms.txt.
- `site.homeLabel` = "Home", the BreadcrumbList item name.

No new claims were added.

## Checks

| Check | Result |
|---|---|
| One H1 per page | `/`: 1 (hero). `/why-a-website`: 1. `/design-system`: 2 (its own H1 plus the embedded Hero pattern demo). It's noindex, so acceptable. |
| Heading order | `/`: H1 → H2 per section → H3 cards / FAQ questions / clinic cards → H4 steps under the H3 "What to expect". No skipped levels. |
| Answer-first openings | Hero lead ✓ ("I'm Annette Low, an Accredited Practising Dietitian and naturopath. I help… in Marrickville and Potts Point and by telehealth"), About lead ✓, Services lead ✓ (after fix 1), Approach lead ✓ (after fix 2), FAQ answers ✓ (each answers in its first sentence), CTA body ✓. |
| Entity consistency | "Annette Low", "Nutritionpath", "Marrickville", "Potts Point", "Sydney" identical across copy, metadata, JSON-LD, llms.txt and the OG image (all pulled from `content/site.ts`). No "NutritionPath" in visible copy. |
| Alt text | Headshot: "Portrait of Annette Low, Accredited Practising Dietitian, smiling in a black top against a light grey wall" ✓. Decorative SVGs are `aria-hidden`. OG image alt set. |
| Internal linking | Nav + footer link every home section anchor (`/#about`, `/#services`, `/#approach`, `/#faq`, `/#contact`). Each service card has an `id` (`/#digestive-health` …), used as Service `url` in JSON-LD. |
| Server rendering | All copy, FAQ answers and JSON-LD are in the initial HTML (static prerender). |
| FAQ JSON-LD = visible | Generated from the same array; verified by script: 8/8 questions and answers found verbatim in the visible HTML. |
| JSON-LD validity | 1 block on `/`, parses as JSON. @types: WebSite, WebPage, BreadcrumbList, Person, [MedicalBusiness, ProfessionalService], Place ×2, Service ×6, FAQPage. |
| Metadata | Unique title/description/canonical/OG/Twitter on `/` and `/why-a-website`; `/design-system` has its own title + canonical (inherits the default description; noindex). |
| noindex + sitemap exclusion | `/why-a-website`, `/design-system`: `noindex, nofollow`, absent from sitemap, intentionally NOT disallowed in robots (so crawlers can see the noindex) ✓ |

## Recommendations (need a decision, not applied)

1. **Put the name in the H1.** The H1 is "Dietitian, nutritionist and naturopath in Sydney". For a personal-name site, "Annette Low" in the H1 is the strongest on-page signal for name searches and for AI entity matching. Suggested: "Annette Low, dietitian, nutritionist and naturopath in Sydney" (or keep the H1 and rely on the title tag, nav and lead, which all have the name). Changes the hero at display size, so it needs a visual check.
2. **Footer link to `/why-a-website` on the public site.** It's an internal pitch addressed to Annette. Fine for review, but remove it from `home.footer.internalLinks` before launch (or keep the page and share the URL directly).
3. **FAQ "private health fund" answer** says "under Extras cover" and "HealthPoint". practitioner.md's summary says "Some health funds cover dietetic services (varies by fund) via Healthpoint in-clinic claiming" and doesn't mention "Extras". Probably from the live FAQ page wording, but confirm with Annette. Also, practitioner.md spells it "Healthpoint" while the copy says "HealthPoint". Match whatever her live FAQ uses.
4. **Telehealth days.** The FAQ says "Monday to Friday" (about-me). The Visit Us page adds "(Saturday once a month)". Fine to leave as-is until hours are reconciled.
5. **Future GEO wins** once Annette supplies content: an article per core condition (reflux, IBS, PCOS, insulin resistance) with a clear first-sentence answer; a Google Business Profile linked in `sameAs`; LinkedIn in `sameAs`; confirmed opening hours in schema.
6. **`recognizedBy` on APD credential**: the APD credential is administered by Dietitians Australia, which could be added as `recognizedBy`. Omitted because practitioner.md doesn't state it explicitly.

## QA commands used

```bash
npm run build && npm run lint
npx next start -p 3200 &
curl -s localhost:3200/robots.txt; curl -s localhost:3200/sitemap.xml; curl -s localhost:3200/llms.txt
curl -s -o og.png localhost:3200/opengraph-image
curl -s localhost:3200/ > home.html && node ld.mjs home.html   # parses every ld+json block, logs @types, diffs FAQ vs visible text, prints heading outline
```
