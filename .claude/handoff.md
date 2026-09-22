# Handoff

_Last updated: 2026-09-22 (end of Phase 2 — awaiting user decisions)_

## Current phase
Phase 2 done. **Blocked on user: template choice + site framing** (see Blockers).

## Completed
- Phase 0: Next.js 16.3.5 scaffold, CLAUDE.md, SessionStart/Stop hooks (tested end-to-end with `claude -p`), 5 sub-agents.
- Phase 1: `content/practitioner.md` — Annette Low, BND(Hon), APD, AdvDipNat; practice "Nutritionpath"; Marrickville + Potts Point (Sydney) + telehealth AU-wide. Sourced per fact.
- Phase 2: `research/templates.md` — shortlist Holistic / the practice / Avelune Well (all Free, Framer Community Terms "Limited Commercial License").

## Decisions
- Project agents in .claude/agents/ don't register until a new session; this session ran them as general-purpose agents given the agent file as instructions.
- Licence: Free Content may be used/modified for client work in a broader product; still treating template as layout/style reference only (no assets/copy copied).
- Fees, hours, cancellation policy NOT to be published until Annette reconfirms (her site has conflicting values).

## Key finding
nutritionpath.com.au is **Annette's own practice website** (GoDaddy builder), not a third-party directory. The brief's "/why-a-website = bonus on top of NutritionPath listing" framing needs adjusting. Asked user.

## Open TODOs (need Annette)
- Testimonials: none exist on her site → section hidden until she supplies approved ones.
- Reconcile clinic days/hours (about-me vs Contact vs Visit Us), fees dates, 24h vs 48h cancellation, email `hello@nutritionpath.co` (.co?).
- High-res headshot; LinkedIn / Google Business Profile URLs for sameAs.
- FAQ answers for Qs 10–13 in practitioner.md.
- Node 20.9 → suggest upgrading to 22 LTS (EBADENGINE warnings).

## Blockers
User to choose template and confirm framing/domain.

## Next step
On user's choice: run design-system-builder (Phase 3) with the chosen template.
