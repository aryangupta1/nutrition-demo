@AGENTS.md

# Nutritionist Site — Project Instructions

## Overview
- **Client:** Annette Low, BND(Hon), APD, AdvDipNat, dietitian, nutritionist and naturopath (Marrickville + Potts Point, Sydney, and telehealth). Her own practice site is Nutritionpath (https://nutritionpath.com.au, profile: /blog/f/about-me). Verified details live in `content/practitioner.md`.
- **Purpose:** a **personal-name** website that builds her own brand, ranks for her name and local/specialty searches (SEO), and gets cited by AI assistants (GEO). It complements the Nutritionpath practice site, and all booking goes to its PracSuite system.
- **Audience:** prospective clients looking for a nutritionist in her area or specialty. `/why-a-website` is an internal pitch for the practitioner herself.
- **Design:** Framer template **Holistic** (visual style) + **the practice** (services grid/FAQ structure), both free under the Framer Community Terms. Used as a layout/style reference only; no template assets or copy (see `research/templates.md`).

## Stack & commands
Next.js 16 (App Router, TypeScript), Tailwind CSS v4 (`@theme` in `app/globals.css`), next/font, next/image, next/og. No backend, no DB, no env vars. Deploy: Vercel zero-config.
- `npm run dev`: local dev at http://localhost:3000
- `npm run build`: production build (must pass)
- `npm run lint`: ESLint (must be clean)
- Next 16 differs from older versions. Check `node_modules/next/dist/docs/` before using an API.

## Where things live
| Path | What |
|---|---|
| `content/site.ts` | **All site copy** (single source; components never hard-code copy) |
| `content/practitioner.md` | Raw verified facts extracted from NutritionPath (TODOs marked) |
| `app/globals.css` | Design tokens (`@theme`): colours, type, spacing, radii, shadows, motion |
| `components/ui/` | Primitives: Button, Container, Section, Heading, Text, Card, Badge, Link, Image, Accordion |
| `components/sections/` | Patterns: Nav, Hero, About, Services, Approach, Testimonials, FAQ, CTA, Footer |
| `lib/seo/` | Metadata helpers + JSON-LD builders |
| `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts` | Crawl + AI surface |
| `research/` | Template research, audits, QA reports |
| `DESIGN_SYSTEM.md`, `SEO_GEO.md` | Docs to keep in sync with code |
| `.claude/agents/` | Project sub-agents (content-extractor, template-scout, design-system-builder, seo-geo-specialist, qa-reviewer) |

## Design system rules
- Use tokens only. No raw hex, px values, or arbitrary Tailwind values (`[...]`) in components.
- Reuse primitives. Build new UI from `components/ui/` before writing new markup/styling.
- Server components by default. Add `"use client"` only when interaction truly needs it (prefer native `<details>`).
- WCAG AA contrast for all text/background token pairs. Visible focus states. Respect `prefers-reduced-motion`.

## Content rules
- **Never fabricate** qualifications, memberships, years of experience, testimonials, statistics, prices, or health claims.
- Only use facts verified in `content/practitioner.md`. Missing = `TODO` (and hide the section in UI, don't fill it with placeholder copy).
- All copy lives in `content/site.ts`. No sample/lorem data.
- Plain-English, warm, factual tone. No promises of outcomes ("cure", "guaranteed").

## SEO / GEO rules
- Every page exports metadata: unique title, description, canonical, Open Graph, Twitter.
- Every public page emits relevant JSON-LD (Person, ProfessionalService, Service, FAQPage, BreadcrumbList) via `lib/seo/`.
- Answer-first: each section opens with a self-contained sentence (who, what, who she helps, where).
- One H1 per page, logical heading order, descriptive alt text, content server-rendered.
- Name / practice name / location spelled identically everywhere (pulled from `content/site.ts`).
- `/design-system` and `/why-a-website`: `noindex` and excluded from the sitemap.

## Definition of done
1. `npm run build` passes, `npm run lint` has no errors or warnings.
2. Visual check in Chrome at 375, 768, and 1440px.
3. JSON-LD valid; sitemap/robots/llms.txt served.
4. Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, and SEO on public pages.
5. Docs (`DESIGN_SYSTEM.md`, `SEO_GEO.md`, README) updated if conventions changed.

## Workflow
- Main session = coordinator. Delegate to sub-agents in `.claude/agents/`; run independent work in parallel (sequentially if both need the browser).
- Ask the user before hard-to-reverse decisions (template choice, AI-crawler list, domain, deploy).
- Keep dependencies minimal. Ask before adding one.

## Testing notes
- The Chrome extension's `resize_window` may not change the viewport, and headless Chrome on macOS has a 500px minimum width. For true 375/768 checks, use puppeteer-core `setViewport` (see research/qa-report.md addendum).
- `.claude/agents/*` load only at session start. In the session that creates them, run a general-purpose agent pointed at the agent file.

## Session handoff (mandatory)
- `.claude/handoff.md` is injected at session start by a SessionStart hook (`.claude/settings.json`).
- **After completing any phase, and before ending a session, overwrite `.claude/handoff.md`** with: current phase, completed, decisions (and why), open TODOs, blockers, exact next step.
- A Stop hook reminds you if the handoff file hasn't been updated this session.
