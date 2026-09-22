# Design System

Calm, clinical-but-warm system for Annette Low's personal site. Visual language follows the **Holistic** Framer template (cream + terracotta, Instrument Serif + Inter, pill buttons, flat tinted cards) as a *style reference only*; no assets or copy are taken from it. Structure borrows from **the practice** (services card grid, FAQ accordion beside a booking card, numbered approach points). Designed to look complete with a single headshot: no photo cards, no stats strip.

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

Decorative only (not for text/UI): border on surface 1.37:1; inverse border 1.54:1

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
| `radius-pill` | `rounded-pill` | 9999px (buttons, badges) |
| `shadow-soft` | `shadow-soft` | Resting cards |
| `shadow-lift` | `shadow-lift` | Headshot, mobile menu |
| `ease-calm` | `ease-calm` | cubic-bezier(0.22, 1, 0.36, 1) (also the default transition easing) |
| default duration | `transition-*` | 200ms |
| `animate-rise` | `animate-rise` | 700ms fade/slide-up (available; not used above the fold to protect LCP) |

`prefers-reduced-motion: reduce` collapses all animations/transitions globally; smooth scrolling is only enabled for `no-preference`.

## Primitives (`components/ui/`)

| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant: primary \| secondary \| ghost`, `size: md \| lg`, `href?` | `href` → next/link (internal `/`, `#`) or `<a>` (external, `tel:`); otherwise `<button type="button">`. Pill, min 44px high. |
| `Container` | `width: content \| narrow` | Centred, `px-gutter`. |
| `Section` | `tone: surface \| muted \| sage \| inverse`, `contained`, `width`, any `<section>` attrs | `py-section`; `inverse` sets `data-tone`. |
| `Heading` | `as: h1–h4 \| p`, `size: display \| h1–h4` | Level and look decoupled; colour inherits the scope. |
| `Text` | `as`, `size: lead \| body \| small \| eyebrow`, `tone: default \| muted \| primary` | Eyebrow defaults to primary. |
| `Card` | `as`, `tone: raised \| muted \| sage \| outline \| inverse`, `padding: md \| lg` | `rounded-card`. |
| `Badge` | `tone: neutral \| primary` | Non-interactive pill label. |
| `TextLink` (`Link.tsx`) | `href`, `tone: primary \| inherit`, `underline` | Named to avoid clashing with next/link. |
| `Image` | next/image props + required `alt`, `rounded: none \| card \| arch` | Use `preload` (Next 16 replaced `priority`) only for the LCP image. |
| `Accordion` | `items: {title, content, id?}[]`, `headingLevel` | Native `<details>`; no client JS; plus icon rotates on open. |

Helper: `lib/cn.ts` (`cn(...classes)`), `components/ui/href.ts` (`isInternalHref`).

```tsx
<Section id="services" tone="muted" aria-labelledby="services-heading">
  <Text size="eyebrow">{content.eyebrow}</Text>
  <Heading id="services-heading" className="mt-4">{content.heading}</Heading>
  <Button href={contact.bookingUrl} size="lg">{home.cta.primaryCta.label}</Button>
</Section>
```

## Section patterns (`components/sections/`)

All take props typed from `content/site.ts`; none hard-code marketing copy.

| Pattern | Props | Behaviour |
|---|---|---|
| `Nav` | `name, title?, links: Link[], cta?: Link, labels?` | Sticky. Desktop inline links + pill CTA; mobile `<details>` menu (no JS; stays open after tapping an anchor). |
| `Hero` | `content: typeof home.hero, image: typeof practitioner.image` | The page's only H1, eyebrow badge, answer-first lead, two CTAs, arch-framed headshot with `preload`. |
| `About` | `content: typeof home.about, practitioner` | Story + sage quote card + credentials/memberships card. No second photo. |
| `Services` | `content: {eyebrow, heading, lead, items: Service[], consultTypes?}` | 3-col card grid (each card has `id={slug}`), then consult types with rebate notes. Null if no items. |
| `Approach` | `content: typeof home.approach` | Numbered pillars (01/02/03) in a sage panel + numbered "what to expect" cards. |
| `Testimonials` | `content: {eyebrow, heading, items: Testimonial[]}` | **Renders null when `items` is empty** (current state). |
| `FAQ` | `content: {…, items: FaqItem[]}`, `aside?: {heading, body?, cta}` | Accordion (8 cols) beside a sticky inverse booking card (4 cols). Without `aside` the accordion is full width. |
| `CTA` | `content: typeof home.cta, clinics?: Clinic[]` | Inverse band, `id="contact"`, CTAs + clinic address cards with directions. |
| `Footer` | `name, title, postNominals, summary, nav, clinics, phone, email?, social, practiceLink, internalLinks` | Social links carry `rel="me"`. Email hidden while `contact.email` is undefined. |
| `SiteChrome` | `children` | Nav + `<main>` + Footer wired to `content/site.ts`. |
| `SectionIntro` | `eyebrow?, heading, lead?, headingId?` | Shared eyebrow/H2/lead block. |

## Do / Don't

**Do**
- Use token utilities only (`bg-surface-muted`, `text-text-muted`, `py-section`). Add new tokens to `@theme` and to this file, with contrast ratios.
- Keep one H1 per page (Hero). Use `Heading as=` for semantics and `size=` for looks.
- Put dark content inside `tone="inverse"` so tokens re-map; don't hand-pick light text colours.
- Alternate `surface` and `surface-muted` sections for rhythm; use `surface-sage` sparingly as an accent panel.
- Give every image a real `alt`; `preload` only the hero headshot.
- Keep tap targets at `min-h-tap` and rely on the global focus ring.

**Don't**
- No raw hex, px, or arbitrary `[...]` values in components.
- Don't use `border` (#E3D5C1) as the only boundary of an interactive control; use `border-strong`.
- Don't put `primary` text on backgrounds darker than `surface-muted`/`surface-sage`.
- No photo-card grids, stats strips, fabricated testimonials, or placeholder copy; hide sections whose data is empty.
- No entrance animation on above-the-fold content (hurts LCP); nothing that ignores reduced motion.
- Don't add `"use client"` for disclosure UI; use `<details>`.
