# Design System

Calm, clinical-but-warm system for Annette Low's personal site. Visual language follows the **Holistic** Framer template as a *style reference only* (no assets or copy are taken from it): cream + terracotta, Instrument Serif + Inter, pill buttons, **one accent word per heading**, **floating pill chips** around a centred headline, **edge-to-edge 50/50 splits**, **line icons joined by a dotted path**, a **centred narrow FAQ with pill rows**, and tall **image-topped tiles**. Deliberately few boxed cards. Mood photography is free Unsplash stock (`content/stock.ts`, credits in `research/asset-manifest.md`); the only photo of Annette is the hero headshot. Motion is a small anime.js layer (see Motion).

- **Source of truth:** `app/globals.css` (`@theme`). Tailwind's default colours, font sizes, radii and shadows are reset (`--color-*: initial` etc.), so only these tokens exist as utilities.
- **Fonts:** `app/fonts.ts` (next/font/google) → `--font-inter`, `--font-instrument-serif`, exposed as `font-sans` / `font-display`.
- **Preview:** `/design-system` (noindex, nofollow; keep out of the sitemap).
- **Light-only theme.** `html` and `body` have explicit `bg-surface` backgrounds and `color-scheme: light`.

## Tokens

### Colour

| Token | Utility examples | Hex | Use |
|---|---|---|---|
| `surface` | `bg-surface` | #FEF9EF | Page background (cream) |
| `surface-muted` | `bg-surface-muted` | #F5EDE1 | Alternate sections (blush), muted cards |
| `surface-raised` | `bg-surface-raised` | #FFFDF8 | Cards on cream/blush |
| `surface-sage` | `bg-surface-sage` | #EBEEDD | Tonal accent panels (quote, approach pillars) |
| `surface-inverse` | via `tone="inverse"` | #2B211A | Dark CTA band, FAQ booking card |
| `text` | `text-text` | #231C16 | Headings and body |
| `text-muted` | `text-text-muted` | #5E5247 | Secondary copy, captions |
| `primary` | `bg-primary`, `text-primary` | #99582A | Terracotta: buttons, links, eyebrows, numerals |
| `primary-hover` | `hover:bg-primary-hover` | #7E4620 | Hover/pressed |
| `primary-foreground` | `text-primary-foreground` | #FEF9EF | Text on primary |
| `border` | `border-border` | #E3D5C1 | Decorative dividers only (not a UI boundary) |
| `border-strong` | `border-border-strong` | #8A7A6A | Outline buttons, badges, accordion icon (≥ 3:1) |
| `focus` | outline colour | #99582A | Global `:focus-visible` ring (2px, 3px offset) |

**Inverse scope.** `[data-tone="inverse"]` (set by `<Section tone="inverse">` and `<Card tone="inverse">`) re-maps `text`, `text-muted`, `primary`, `primary-hover`, `primary-foreground`, `border`, `border-strong` and `focus` to their inverse values, so every primitive works unchanged on dark backgrounds:

| Token (inverse scope) | Hex |
|---|---|
| `text` → `text-inverse` | #FEF9EF |
| `text-muted` → `text-inverse-muted` | #D8CBBA |
| `primary` → `primary-inverse` | #E9B98F |
| `primary-hover` → `primary-inverse-hover` | #F3D2B3 |
| `primary-foreground` | #2B211A |
| `border` → `border-inverse` | #4D3E32 |
| `border-strong` → `border-inverse-strong` | #A8978A |
| `focus` | #E9B98F |

### Contrast (WCAG 2.2)

Computed with the WCAG relative-luminance formula (node script, sRGB). Text pairs need 4.5:1 (AA normal text); UI boundaries/focus need 3:1. **Every pair passes; no adjustments were needed after tuning `surface-sage`** (first draft #E4E6D3 gave primary-on-sage 4.38:1, lightened to #EBEEDD → 4.71:1).

| Scope | Foreground | Background | Ratio | Result |
|---|---|---|---|---|
| light | `text` #231C16 | `surface` #FEF9EF | 16.02:1 | AAA |
| light | `text` #231C16 | `surface-muted` #F5EDE1 | 14.48:1 | AAA |
| light | `text` #231C16 | `surface-raised` #FFFDF8 | 16.54:1 | AAA |
| light | `text` #231C16 | `surface-sage` #EBEEDD | 14.25:1 | AAA |
| light | `text-muted` #5E5247 | `surface` #FEF9EF | 7.21:1 | AAA |
| light | `text-muted` #5E5247 | `surface-muted` #F5EDE1 | 6.52:1 | AA |
| light | `text-muted` #5E5247 | `surface-raised` #FFFDF8 | 7.45:1 | AAA |
| light | `text-muted` #5E5247 | `surface-sage` #EBEEDD | 6.42:1 | AA |
| light | `primary` #99582A | `surface` #FEF9EF | 5.29:1 | AA |
| light | `primary` #99582A | `surface-muted` #F5EDE1 | 4.78:1 | AA |
| light | `primary` #99582A | `surface-raised` #FFFDF8 | 5.46:1 | AA |
| light | `primary` #99582A | `surface-sage` #EBEEDD | 4.71:1 | AA |
| light | `primary-hover` #7E4620 | `surface` #FEF9EF | 7.19:1 | AAA |
| light | `primary-hover` #7E4620 | `surface-muted` #F5EDE1 | 6.50:1 | AA |
| light | `primary-hover` #7E4620 | `surface-raised` #FFFDF8 | 7.42:1 | AAA |
| light | `primary-hover` #7E4620 | `surface-sage` #EBEEDD | 6.40:1 | AA |
| light | `primary-foreground` #FEF9EF | `primary` #99582A | 5.29:1 | AA |
| light | `primary-foreground` #FEF9EF | `primary-hover` #7E4620 | 7.19:1 | AAA |
| light | `border-strong` #8A7A6A | `surface` #FEF9EF | 3.94:1 | Pass (UI 3:1) |
| light | `focus` #99582A | `surface` #FEF9EF | 5.29:1 | Pass (UI 3:1) |
| light | `border-strong` #8A7A6A | `surface-muted` #F5EDE1 | 3.56:1 | Pass (UI 3:1) |
| light | `focus` #99582A | `surface-muted` #F5EDE1 | 4.78:1 | Pass (UI 3:1) |
| light | `border-strong` #8A7A6A | `surface-raised` #FFFDF8 | 4.07:1 | Pass (UI 3:1) |
| light | `focus` #99582A | `surface-raised` #FFFDF8 | 5.46:1 | Pass (UI 3:1) |
| light | `border-strong` #8A7A6A | `surface-sage` #EBEEDD | 3.51:1 | Pass (UI 3:1) |
| light | `focus` #99582A | `surface-sage` #EBEEDD | 4.71:1 | Pass (UI 3:1) |
| inverse | `text` #FEF9EF | `surface-inverse` #2B211A | 14.99:1 | AAA |
| inverse | `text-muted` #D8CBBA | `surface-inverse` #2B211A | 9.86:1 | AAA |
| inverse | `primary` #E9B98F | `surface-inverse` #2B211A | 8.84:1 | AAA |
| inverse | `primary-hover` #F3D2B3 | `surface-inverse` #2B211A | 11.00:1 | AAA |
| inverse | `primary-foreground` #2B211A | `primary` #E9B98F | 8.84:1 | AAA |
| inverse | `primary-foreground` #2B211A | `primary-hover` #F3D2B3 | 11.00:1 | AAA |
| inverse | `border-strong` #A8978A | `surface-inverse` #2B211A | 5.59:1 | Pass (UI 3:1) |
| inverse | `focus` #E9B98F | `surface-inverse` #2B211A | 8.84:1 | Pass (UI 3:1) |

**Added in the redesign** (same script, `rgba` layers blended onto the background first):

| Pair | Ratio | Result |
|---|---|---|
| Lock chip: `text-inverse` #FEF9EF on `surface-inverse`/90 over `surface` / `surface-muted` / `surface-sage` / `surface-raised` | 11.08 / 11.37 / 11.41 / 11.07 | AAA |
| Lock chip inside `data-tone="inverse"`: `text-inverse` on `surface-inverse` | 14.99:1 | AAA (was dark-on-dark before the fix: it used `primary-foreground`, which re-maps to the dark surface) |
| Input chip: `primary-foreground` on `primary` (light / inverse scope) | 5.29 / 8.84 | AA / AAA |
| Chip label: `text` on `surface-raised` | 16.54:1 | AAA |
| Open FAQ row: `text-muted` on `surface-sage` | 6.42:1 | AA |
| CTA over photo wash (`surface`/85 over the image), **worst case = black pixel** → wash #D8D4CB: `text` / `text-muted` | 11.37 / 5.12 | AAA / AA |
| Same wash: `primary` (accent word, large text only) | 3.75:1 | Pass for large text (≥ 3:1). Small `primary` text is not used there: the "Clinics" label is `text`. |

Decorative only (not for text/UI): border on surface 1.37:1; inverse border 1.54:1; skeleton bars (`border`), dotted path and timeline line (`border-strong`, aria-hidden).

Lowest text pair: `primary` on `surface-sage` 4.71:1 and `primary` on `surface-muted` 4.78:1 (both AA). Don't put `primary` text on any darker tint than these.

### Typography

| Token | Utility | Size | Line height / tracking | Font |
|---|---|---|---|---|
| display | `text-display` | clamp(2.75rem → 5.25rem) | 1 / -0.03em | Instrument Serif 400 |
| h1 | `text-h1` | clamp(2.25rem → 3.75rem) | 1.05 / -0.025em | Instrument Serif 400 |
| h2 | `text-h2` | clamp(1.875rem → 2.875rem) | 1.1 / -0.02em | Instrument Serif 400 |
| h3 | `text-h3` | clamp(1.375rem → 1.75rem) | 1.2 / -0.01em | Instrument Serif 400 |
| h4 | `text-h4` | 1.125rem | 1.4 | Inter 600 |
| lead | `text-lead` | clamp(1.0625rem → 1.25rem) | 1.6 | Inter 400 |
| body | `text-body` | 1rem | 1.65 | Inter 400 |
| small | `text-small` | 0.875rem | 1.55 | Inter 400/500 |
| eyebrow | `text-eyebrow` | 0.8125rem | 1.2 / 0.08em, uppercase | Inter 600 |

Families: `font-display` (Instrument Serif, fallback Georgia), `font-sans` (Inter, default on `body`).

### Spacing, layout, breakpoints

| Token | Utility | Value |
|---|---|---|
| `--spacing` | `p-4`, `gap-6` … | 0.25rem base unit |
| `--spacing-gutter` | `px-gutter` | clamp(1rem → 2.5rem) side padding |
| `--spacing-section` | `py-section` | clamp(4rem → 7.5rem) section rhythm |
| `--spacing-tap` | `min-h-tap` | 2.75rem (44px tap target) |
| `--container-content` | `max-w-content` | 76rem |
| `--container-narrow` | `max-w-narrow` | 48rem |
| `--container-measure` | `max-w-measure` | 40rem (readable line length) |
| Breakpoints | `sm: md: lg: xl:` | 40 / 48 / 64 / 80rem |

### Radii, shadows, motion

| Token | Utility | Value |
|---|---|---|
| `radius-sm` / `md` | `rounded-sm` / `rounded-md` | 0.5rem / 1rem |
| `radius-card` | `rounded-card` | 1.5rem |
| `radius-panel` | `rounded-panel` | 2rem |
| `radius-arch` | `rounded-arch` | 12rem 12rem 1.5rem 1.5rem (portrait frame) |
| `radius-thumb` | `rounded-thumb` | 0.625rem (square chip thumbnails) |
| `radius-pill` | `rounded-pill` | 9999px (buttons, badges) |
| `shadow-soft` | `shadow-soft` | Resting cards |
| `shadow-lift` | `shadow-lift` | Headshot, mobile menu |
| `shadow-chip` | `shadow-chip` | Floating pill chips |
| `ease-calm` | `ease-calm` | cubic-bezier(0.22, 1, 0.36, 1) (also the default transition easing) |
| `ease-drift` | `ease-drift` | cubic-bezier(0.37, 0, 0.63, 1) (idle float; anime.js uses the equivalent `inOutSine`) |
| default duration | `transition-*` | 200ms |
| `animate-rise` | `animate-rise` | 700ms fade/slide-up (available; not used above the fold to protect LCP) |

`prefers-reduced-motion: reduce` collapses all animations/transitions globally; smooth scrolling is only enabled for `no-preference`.

## Primitives (`components/ui/`)

| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant: primary \| secondary \| ghost`, `size: md \| lg`, `href?` | `href` → next/link (internal `/`, `#`) or `<a>` (external, `tel:`); otherwise `<button type="button">`. Pill, min 44px high. |
| `Container` | `width: content \| narrow` | Centred, `px-gutter`. |
| `Section` | `tone: surface \| muted \| sage \| inverse`, `contained`, `width`, any `<section>` attrs | `py-section`; `inverse` sets `data-tone`. |
| `Heading` | `as: h1–h4 \| p`, `size: display \| h1–h4` | Level and look decoupled; colour inherits the scope. **String children render one `*accent*` word** as an italic serif `<em>` in `primary` (`Accent` is exported too). |
| `Text` | `as`, `size: lead \| body \| small \| eyebrow`, `tone: default \| muted \| primary` | Eyebrow defaults to primary. |
| `Card` | `as`, `tone: raised \| muted \| sage \| outline \| inverse`, `padding: md \| lg` | `rounded-card`. |
| `Badge` | `tone: neutral \| primary` | Non-interactive pill label. |
| `TextLink` (`Link.tsx`) | `href`, `tone: primary \| inherit`, `underline` | Named to avoid clashing with next/link. |
| `Image` | next/image props + required `alt`, `rounded: none \| thumb \| card \| arch` | Use `preload` (Next 16 replaced `priority`) only for the LCP image (the hero headshot). Stock photos: meaningful `alt` from `content/stock.ts` for content images, `alt=""` for mood/decorative ones; always pass `sizes`. |
| `Chip` | `label`, `image: StockKey` | Pill with a small square stock thumbnail (`alt=""`, the label carries meaning) + label. Carries `data-chip` for `FloatChips`. |
| `Accordion` | `items: {title, content?, aside?, id?}[]`, `headingLevel`, `variant: lines \| pill` | Native `<details>`; no client JS. `pill`: soft-tinted rounded rows (open row turns sage). An item without `content` renders as a static row with `aside` (used for locked preview questions). |

Helpers: `lib/cn.ts` (`cn(...classes)`), `components/ui/href.ts` (`isInternalHref`), `lib/accent.ts` (`splitAccent`, `plain` to strip `*accent*` markers for metadata/JSON-LD/llms.txt/aria labels), `lib/gated.ts` (`Gated<T>`, `isLocked`).

```tsx
<Section id="services" tone="muted" aria-labelledby="services-heading">
  <Text size="eyebrow">{content.eyebrow}</Text>
  <Heading id="services-heading" className="mt-4">{content.heading}</Heading>
  <Button href={contact.bookingUrl} size="lg">{home.cta.primaryCta.label}</Button>
</Section>
```

## Section patterns (`components/sections/`)

All take props typed from `content/site.ts`; none hard-code marketing copy. Sections that can be gated accept `Gated<T>` items and render locked ones as **title only + skeleton + "To be built" chip**.

| Pattern | Props | Behaviour |
|---|---|---|
| `Nav` | `name, title?, links: Link[], cta?: Link, labels?` | Sticky. Desktop inline links + pill CTA; mobile `<details>` menu (no JS; stays open after tapping an anchor). |
| `Hero` | `content: typeof home.hero, image` | The page's only H1, eyebrow badge, answer-first lead, two CTAs, arch-framed headshot with `preload`. Two verified-fact chips (`hero.chips`) overlap the arch's lower half and only drift (no entrance). **H1 and headshot never animate.** |
| `Concerns` | `content: typeof home.concerns` | Holistic "signs" pattern. lg+: 12-col, 3-row stage, centred intro in the middle row, 8 chips scattered around it. Below lg: intro first, then a wrapped, gently offset chip cluster (no absolute positioning). Chip labels must be verbatim `services.items[].items` entries (the build fails otherwise, see `lib/content.ts`). |
| `About` | `content, practitioner, image?` | Edge-to-edge 50/50 split: full-bleed decorative photo (`about-desk`) \| story on `surface-muted`, credentials as a hairline list (not a card), memberships inline. Then the quote as a large centred serif pull-quote. |
| `Services` | `content: {…, items: Gated<Service>[], consultHeading?, rebatesLabel?, consultTypes?}` | Image-topped tiles, no card chrome. Mobile: horizontal scroll-snap row (focusable, labelled). md: 2 cols. lg: 3 cols, middle column dropped for an editorial stagger. Consult types: two-column contrast split with a hairline divider. Each live tile keeps `id={slug}` (schema URLs). |
| `Approach` | `content: {…, pillars: Gated<Step>[], steps: Gated<Step>[]}` | Pillars as inline line icons in outlined circles joined by a curved dotted SVG path that draws in on scroll (md+). "What to expect" as a vertical dashed timeline with numbered markers. |
| `Testimonials` | `content, placeholder?` | Real quotes as open serif pull-quotes. **Renders null when `items` is empty**, unless `placeholder` is passed (preview only): blurred quote-mark/skeleton silhouettes + "Needs your input" chip. Never fake quotes. |
| `FAQ` | `content: {…, items: Gated<FaqItem>[]}`, `aside?` | Centred narrow column, `Accordion variant="pill"`. Locked questions are static rows with a "To be built" chip. The "still wondering" prompt sits centred below, under a short vertical rule. |
| `CTA` | `content, clinics?, background?, hours?` | Centred, `id="contact"`: botanical sprig line mark (drawn on scroll), heading, CTAs over a soft `cta-botanical` wash (`surface`/85). Clinics as a two-column address list with hairline dividers. `hours` (preview only) shows the "Needs your input" row. |
| `Footer` | `name, title, postNominals, summary, nav, clinics, phone, email?, social, practiceLink, internalLinks` | Social links carry `rel="me"`. Email hidden while `contact.email` is undefined. |
| `SiteChrome` | `children` | Nav + `<main>` + Footer wired to `content/site.ts`. |
| `SectionIntro` / `Eyebrow` | `eyebrow?, heading, lead?, headingId?, align: start \| center` | Pill eyebrow (dot + uppercase label), H2 with accent word, lead. |

## Motion (`components/motion/`, anime.js v4)

Three small client wrappers; everything they wrap is server-rendered. Constants live in `components/motion/config.ts` (mirrors the motion note in `globals.css`).

| Wrapper | Marks | What it does |
|---|---|---|
| `Reveal` (`as: div \| ul \| ol`) | `data-reveal` children (or itself) | Fade + 24px rise, 900ms `outQuart`, 90ms stagger, when it enters (`onScroll`, `enter: "bottom-=10% top"`, once). |
| `FloatChips` | `data-chip` | Chips below the fold float in (opacity, rise, scale .94→1, 110ms stagger); every chip then drifts ±6px / ±0.8° on 3.6–5.4s `inOutSine` loops. Drift pauses while off-screen. |
| `DrawPath` (`mode: play \| scrub`) | `data-draw` SVG strokes | `createDrawable` draw-in (1.5s `inOutSine`) on enter; `scrub` ties it to scroll. Dotted lines: put `data-draw` on a solid path inside an SVG `<mask>` (createDrawable uses `stroke-dasharray`, which would erase the dots). |

Rules (enforced in code):
- **Progressive enhancement.** No CSS pre-hiding. Elements are hidden inside the effect, and only if they start **below the fold**, so nothing visible ever flashes visible → hidden → visible. Without JS everything is visible.
- **Reduced motion:** `prefers-reduced-motion: reduce` → no animation and anime.js is never downloaded.
- **Never animate the LCP** (hero H1, headshot).
- **Small and late:** anime.js is loaded with a dynamic `import()` of only `animejs/animation`, `/events`, `/utils`, `/svg` after hydration (`loadAnime()` / `withAnime()`), so it never competes with the LCP image. Every animation, `set()` and `onScroll` observer is `revert()`ed on unmount.

## Preview primitives (`components/preview/`, SITE_MODE=preview only)

| Component | Use |
|---|---|
| `LockChip kind="lock"` | "To be built": dark pill (`surface-inverse`/90, `text-inverse`), lock icon. Readable on light and inverse sections. |
| `LockChip kind="input"` | "Needs your input": terracotta pill, pen icon. For items blocked on Annette (testimonials, hours, fees). |
| `SkeletonText` | Text-shaped bars (aria-hidden) standing in for withheld paragraphs. Usually with `blur-xs`. |
| `LockedOverlay` | Blurs placeholder children and centres a chip; `srLabel` is announced. |
| `PreviewBadge`, `FullBuildPanel` | Dismissible corner badge; "What the full site includes" band above the footer. |

Gating is server-side (`lib/content.ts`): a locked item is `{ locked: true, title, image? }` (image = stock key only), so withheld copy never reaches the HTML or RSC payload. The blur is cosmetic.

## Do / Don't

**Do**
- Use token utilities only (`bg-surface-muted`, `text-text-muted`, `py-section`). Add new tokens to `@theme` and to this file, with contrast ratios.
- Keep one H1 per page (Hero). Use `Heading as=` for semantics and `size=` for looks.
- Put dark content inside `tone="inverse"` so tokens re-map; don't hand-pick light text colours.
- Alternate `surface` and `surface-muted` sections for rhythm; use `surface-sage` sparingly as an accent panel.
- Mark exactly one accent word per heading in `content/site.ts` (`*word*`), and run any heading used outside `<Heading>` through `plain()`.
- Prefer open layouts (splits, hairline lists, chips, icon rows, timelines) over boxed cards.
- Give every image a real `alt`; `preload` only the hero headshot.
- Keep tap targets at `min-h-tap` and rely on the global focus ring.

**Don't**
- No raw hex, px, or arbitrary `[...]` values in components.
- Don't use `border` (#E3D5C1) as the only boundary of an interactive control; use `border-strong`.
- Don't put `primary` text on backgrounds darker than `surface-muted`/`surface-sage`.
- No stats strips, fabricated testimonials, or placeholder copy; hide sections whose data is empty (preview placeholders excepted, clearly marked "Needs your input").
- Don't imply a stock photo shows Annette, her clinic or a client.
- No entrance animation on the LCP (hero H1/headshot) or on anything already visible at load; nothing that ignores reduced motion; no static `import` of animejs.
- Don't put small `primary` text over the CTA photo wash.
- Don't add `"use client"` for disclosure UI; use `<details>`.
