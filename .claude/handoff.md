# Handoff

_Last updated: 2026-09-22 (Phase 0)_

## Current phase
Phase 1 (content extraction) + Phase 2 (template scouting), in progress.

## Completed
- Phase 0: Next.js 16.3.5 scaffold (App Router, TS, Tailwind v4, ESLint) at ~/nutritionist-site with git init.
- CLAUDE.md, SessionStart + Stop hooks (.claude/settings.json, .claude/hooks/), 5 sub-agents (.claude/agents/).

## Decisions
- Project dir `~/nutritionist-site` (neutral name until the practitioner's name/brand is confirmed; can rename).
- Tailwind v4 → tokens live in `@theme` in app/globals.css (no tailwind.config).
- Stop hook only nags when project files changed since session start and handoff wasn't updated (avoids noise on Q&A sessions); loop-guarded via stop_hook_active.

## Open TODOs
- Phase 1: extract content → content/practitioner.md
- Phase 2: shortlist 3 free Framer templates → research/templates.md, then WAIT for user choice.
- Node is 20.9.0; some dev deps want ≥20.19 (EBADENGINE warnings). Suggest upgrading Node to 22 LTS.

## Blockers
None.

## Next step
Run content-extractor and template-scout; present the template shortlist to the user and wait for a choice.
