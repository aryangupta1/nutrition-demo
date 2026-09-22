# Handoff

_Last updated: 2026-09-22 (all phases 0–7 complete)_

## Current phase
Build complete. Awaiting Annette's confirmations and the user's domain/deploy decision.

## Completed
- Phase 0: Next.js 16.3.5 + TS + Tailwind v4 scaffold, CLAUDE.md, SessionStart/Stop hooks (tested), 5 sub-agents.
- Phase 1: content/practitioner.md (sourced facts; TODOs listed).
- Phase 2: research/templates.md. Chosen: Holistic style + "the practice" services/FAQ structure (Framer Community Terms; used as reference only).
- Phase 3: tokens in app/globals.css, components/ui + components/sections, DESIGN_SYSTEM.md, /design-system (noindex).
- Phase 4/6: `/` and `/why-a-website` (noindex, footer link only), all copy in content/site.ts.
- Phase 5: lib/seo, JSON-LD @graph, robots (OpenAI named, no Disallow), sitemap (/ only), llms.txt, OG/Twitter images, SEO_GEO.md, research/seo-audit.md.
- Phase 7: research/qa-report.md. Lighthouse `/`: mobile 96/100/100/100, desktop 100/100/100/100. axe 0 violations. JSON-LD valid, FAQ matches. True 375/768/1440 checks pass (via puppeteer emulation). README written.

## Decisions (and why)
- Personal-name site; Nutritionpath is her own practice site, and bookings go to PracSuite (https://nutritionpath.bookings.pracsuite.com).
- robots: `*` allow all, OpenAI bots named per user. Internal pages use noindex, NOT Disallow (so Google can see the noindex).
- H1 includes her name (entity signal).
- Headshot: EXIF/GPS stripped.
- No prices, hours, email or testimonials published until Annette confirms them.

## Open TODOs (need Annette / user)
- Clinic days/hours (her site conflicts) → contact.openingHours + schema.
- Email (site shows hello@nutritionpath.co).
- Fees: publish or not? (Her fees page has conflicting dates.)
- Testimonials (none exist) → home.testimonials.items.
- Domain → site.url; LinkedIn / Google Business Profile → sameAs.
- Higher-res headshot (current is 1200px from her site).
- Brand capitalisation "Nutritionpath" vs "NutritionPath" (using "Nutritionpath" to match her logo).
- User: confirm robots intent (only OpenAI named; others allowed via wildcard, not blocked).
- Optional: close mobile menu on anchor tap (tiny client component); upgrade Node to 22 LTS.

## Blockers
None technical. Deploy/domain needs user go-ahead.

## Next step
Share `/why-a-website` + TODO list with Annette. On answers, update content/site.ts, run build/lint, push to a Git remote, and import it into Vercel (see README).
