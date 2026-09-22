# QA report

Date: 2026-09-22
Server: `npm run start -- -p 3300` (production build)
Pages checked: `/` and `/why-a-website` (full), `/design-system` (quick visual only)

## 1. Build & lint

| Check | Result |
|---|---|
| `npm run build` | Pass — 0 errors, all 9 routes prerendered static |
| `npm run lint` | Pass — 0 errors, 0 warnings |

## 2. Score table

### Definition-of-done status

| Page | Perf (mobile) | Perf (desktop) | A11y | Best Practices | SEO |
|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 100 |
| `/why-a-website` | 98 | 100 | 100 | 100 | 66* |

\* `/why-a-website` is `noindex` by design (internal pitch page, excluded from sitemap). The only failing audit dragging SEO down is **is-crawlable** ("Page is blocked from indexing") — expected and correct per `SEO_GEO.md`. Not counted as a defect. All other SEO audits pass on that page.

All public-page (`/`) scores meet the Definition of Done's "≥95 across all four categories" bar, on both mobile and desktop.

### Accessibility (axe-core, injected via CDN)

| Page | Violations |
|---|---|
| `/` | 0 |
| `/why-a-website` | 0 |

`/design-system` was not run through axe (quick visual check only, per scope — its two H1s are a known/accepted exception).

### Structured data

- One `application/ld+json` block on `/`, valid JSON, `@graph` with 14 nodes.
- `@type`s present: `WebSite`, `WebPage`, `BreadcrumbList`, `Person`, `["MedicalBusiness","ProfessionalService"]`, `Place` ×2, `Service` ×6, `FAQPage` — matches `SEO_GEO.md` exactly.
- `FAQPage.mainEntity`: 8 Question/Answer pairs, text diffed against `content/site.ts` `home.faq.items` — **identical**, no drift.

### Crawl surfaces

| Surface | Result |
|---|---|
| `/robots.txt` | 200. No `Disallow` lines anywhere (intentional, per SEO_GEO.md — noindex pages stay crawlable so the noindex tag itself is read). `Allow: /` for `*` and for GPTBot/OAI-SearchBot/ChatGPT-User. |
| `/sitemap.xml` | 200. Contains only `/`, as documented. |
| `/llms.txt` | 200. Well-formed, matches site content (About/Services/Approach/FAQ/Contact, clinics, credentials, services). |
| `/opengraph-image` | 200, `content-type: image/png`. |
| `/` `<meta name="robots">` | absent (indexable, correct) |
| `/why-a-website` `<meta name="robots">` | `noindex, nofollow` (correct) |
| `/design-system` `<meta name="robots">` | `noindex, nofollow` (correct) |

Note: canonical/sitemap/robots URLs resolve to `http://localhost:3000/...` even though the server ran on port 3300 — this is `lib/seo/site-url.ts`'s documented local-build fallback (`http://localhost:3000` is hardcoded, independent of the actual dev/start port), not a bug.

## 3. Visual / functional checks

### Viewport-resize limitation (read this first)

`resize_window` **did not change the actual rendered viewport** in this environment: every call (375×900, 800×600, 1920×1080) was acknowledged as "successful" but `window.innerWidth`/`innerHeight` stayed unaffected by the request — the browser reported the viewport it happened to have (`window.outerWidth`/`outerHeight` both read `0`, consistent with a fixed remote/CDP viewport that ignores resize requests). Observed actual widths during the session ranged ~1348–1497px (it drifted on its own between calls, not in response to my requests). No device-emulation tool was available to substitute for a real resize.

**Consequence:** I could not get a true rendering at 375px or 768px. All visual/functional testing below was performed at the actual available width (~1350–1500px, i.e. desktop-class), which is close to the 1440px target but not the mobile/tablet targets. I supplemented this with:
- Static review of the Tailwind breakpoints in the source (`Nav.tsx`: mobile `<details>` menu is `lg:hidden`, desktop nav is `hidden lg:flex`, breakpoint = 1024px — standard Tailwind `lg`).
- Functional testing of the mobile `<details>` nav by force-showing it via `display` override in JS (independent of viewport, since it's native HTML `<details>`/`<summary>` with no client JS) and clicking it — see below.

This should be re-verified with a real device/emulator or a working resize tool before sign-off; I could not confirm true small-viewport layout, overflow or tap-target sizing.

### `/` (home)

- Scrolled full page at the actual (~1350–1500px) width: hero, about/credentials, services grid (6 cards), approach (3-step + "what to expect"), FAQ (8 items, confirmed all present in DOM), CTA with two clinic cards, footer. No overflow, no broken layout, fonts loaded correctly (serif display font + sans body).
- One `<h1>`; heading order is clean (H1 → H2 per section → H3 cards/questions → H4 steps under "What to expect"), matches `SEO_GEO.md`'s spec.
- Console: **0 errors/warnings** on load.
- Keyboard focus: Tab through logo link and first nav link — both show a clear visible focus ring. No focus-trap or invisible-focus issues observed.
- Mobile `<details>` nav (forced visible via JS since real viewport couldn't go below ~1350px): opens on click (`open` toggles false→true), contains all 6 expected links (About, Services, Approach, FAQ, Contact, Book a consultation) with correct `href`s. Functions correctly.
- Testimonials section: absent from the DOM — consistent with `content/site.ts` (`home.testimonials.items: []`) and the "no fabricated testimonials" content rule; not a bug.

### `/why-a-website`

- Full scroll: hero, 9-point numbered grid ("It adds to Nutritionpath...", ..., "Low running cost, little maintenance"), a "What we need from you" checklist (clinic hours confirmation, contact email), footer.
- Console: 0 errors.
- One `<h1>`, axe: 0 violations.
- Two H1s note from the brief doesn't apply here (that's `/design-system`); this page had exactly one H1.

### `/design-system` (quick visual only)

- Loads cleanly: internal/noindex banner visible at top ("INTERNAL · NOINDEX"), colour swatches and type scale render correctly with token names labelled.
- Two H1s on this page are a known/accepted exception per the task brief — not re-litigated.

## 4. Issues

### Blocking
None found. Build, lint, structured data, crawl surfaces, and axe accessibility all pass clean; Lighthouse meets the ≥95 bar on the public page.

### Non-blocking

1. **Viewport testing incomplete (tooling, not a site defect).** `resize_window` did not work in this session (see above) — true 375px/768px visual QA (overflow, tap targets, mobile nav in situ) was not possible and should be re-run with working device emulation. This is the single biggest gap in this QA pass.
2. **Lighthouse performance insights (all pages, mobile and desktop).** Several Lighthouse "insight" audits scored 0, though they don't pull the aggregate Performance score below 95:
   - `unused-javascript` ("Reduce unused JavaScript") — scored 0 on mobile for both pages, 0.5 on desktop.
   - `lcp-discovery-insight`, `network-dependency-tree-insight`, `render-blocking-insight`, `legacy-javascript-insight` — all scored 0 or 0.5.
   - Likely source: third-party/framework JS (Next.js runtime, or the booking-link/font loading chain) not yet code-split or preloaded optimally. No specific file is clearly at fault from the JSON alone; worth a follow-up Lighthouse trace review (`--view`) if perf headroom is wanted before the ≥95 mobile Performance score (currently 96 on home) gets eaten by future additions.
   - Not fixed here: outside "trivial" scope, needs a perf-focused pass with the actual trace, not a guess-fix.
3. **`largest-contentful-paint` scored 0.82 on home/mobile only** (LCP element likely the hero headshot `next/image`). Desktop is fine (no such audit failure). Worth checking whether the hero image has `priority`/appropriate `sizes` for mobile if this needs tightening later — did not change it since Performance is already ≥95 and this is a judgement call on an already-passing category.

## 5. Fixed

None. No trivial issues (typos, missing alt, obvious a11y attributes) were found during this pass — axe-core reported 0 violations on both fully-checked pages, and manual review of headings, alt text, focus, and console found nothing to correct.

## 6. Not verified (see limitation above)

- True mobile (375px) and tablet (768px) rendering, overflow, and tap-target sizing.
- Real-viewport interaction with the mobile `<details>` menu (functionality was confirmed via forced display, not via genuine narrow-viewport tap).

## Addendum (coordinator): true-viewport checks at 375 / 768

The Chrome extension's `resize_window` didn't change the viewport, and headless Chrome on macOS won't go below 500px (`--window-size=375` → `innerWidth=500`). So the coordinator re-ran with DevTools device emulation (puppeteer-core `setViewport`, `isMobile` at 375):

| Page | Width | scrollWidth | Overflowing elements | Tap targets < 24px |
|---|---|---|---|---|
| `/` | 375 | 375 | none | none |
| `/why-a-website` | 375 | 375 | none | none |
| `/` | 768 | 768 | none | none |
| `/why-a-website` | 768 | 768 | none | none |

- Full-page screenshots reviewed by eye: hero, about, services, approach, FAQ + aside card, CTA, clinics and footer all stack cleanly, with no clipped text.
- Mobile `<details>` menu opens on tap and shows all links plus the booking button.
- Known minor issue: the menu stays open after tapping an in-page anchor (it's a native `<details>` with no JS). Accepted for now; closing it on tap needs a small client component.
- **Result: pass at 375, 768 and 1440.**
