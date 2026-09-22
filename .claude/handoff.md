# Handoff

_Last updated: 2026-09-22 (Phase 3 in progress)_

## Current phase
Phase 3 (design system) running via design-system-builder. content/site.ts written (home + whyWebsite copy).

## Completed
- Phase 0: Next.js 16.3.5 scaffold, CLAUDE.md, SessionStart/Stop hooks (tested end-to-end with `claude -p`), 5 sub-agents.
- Phase 1: `content/practitioner.md` — Annette Low, BND(Hon), APD, AdvDipNat; practice "Nutritionpath"; Marrickville + Potts Point (Sydney) + telehealth AU-wide. Sourced per fact.
- Phase 2: `research/templates.md` — shortlist Holistic / the practice / Avelune Well (all Free, Framer Community Terms "Limited Commercial License").

## Decisions
- Project agents in .claude/agents/ don't register until a new session; this session ran them as general-purpose agents given the agent file as instructions.
- Licence: Free Content may be used/modified for client work in a broader product; still treating template as layout/style reference only (no assets/copy copied).
- Fees, hours, cancellation policy NOT to be published until Annette reconfirms (her site has conflicting values).

## User decisions (2026-09-22)
- Template: **Holistic** visual style + **the practice** services-grid/FAQ structure.
- Framing: **personal-name site** for Annette; Nutritionpath remains practice/booking site. Bookings link to PracSuite.
- robots.ts: `*` allow all; explicitly name **OpenAI only** (GPTBot, OAI-SearchBot, ChatGPT-User). Others still allowed via wildcard, confirm with user they didn't mean to block.
- Headshot downloaded from her site to public/images, EXIF/GPS stripped.
- /why-a-website: don't claim free hosting (Vercel Hobby is non-commercial; business needs Pro).

## Key finding
nutritionpath.com.au is **Annette's own practice website** (GoDaddy builder), not a third-party directory. The brief's "/why-a-website = bonus on top of NutritionPath listing" framing needs adjusting. Asked user.

## Open TODOs (need Annette)
- Testimonials: none exist on her site → section hidden until she supplies approved ones.
- Reconcile clinic days/hours (about-me vs Contact vs Visit Us), fees dates, 24h vs 48h cancellation, email `hello@nutritionpath.co` (.co?).
- High-res headshot; LinkedIn / Google Business Profile URLs for sameAs.
- FAQ answers for Qs 10–13 in practitioner.md.
- Node 20.9 → suggest upgrading to 22 LTS (EBADENGINE warnings).

## Blockers
None (domain TBD, site.url falls back to Vercel URL).

## Next step
Review Phase 3 output, commit, then Phase 4 pages + Phase 5 seo-geo-specialist.
