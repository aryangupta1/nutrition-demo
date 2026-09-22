# Framer Marketplace Template Research — Nutritionist / Wellness Practitioner Site

Scope: browsed https://www.framer.com/marketplace/templates/ (Wellness and Therapy categories), filtered to **Free** only. Considered ~10 free candidates (Wellness: Lubrix, Avelune Well, Serena Yoga, Human Home, Yogagrove, Feluciaa, Stillnes, Wisp, Wellns; Therapy: Holistic, MindLeaf, Mindora, the practice, TheGrace, FullBalance) before shortlisting the 3 below. Each was opened, checked for a confirmed Free price and licence, then previewed live (full scroll) with colours/fonts read via `getComputedStyle` in the browser (not guessed).

**Licence (identical on all three — Framer's Community Terms, "Limited Commercial License / Free Content", https://www.framer.com/legal/community-terms):**

> "End User may: Use and modify such Free Content in its own projects, including commercial projects; and Use the Free Content for client work, provided the Free Content is incorporated into a broader end product. End User shall not: Resell, redistribute, sublicense, share, publish, or make the Free Content available as a standalone asset; Repost or offer the Free Content on any competing marketplace... Claim ownership of the Free Content or represent it as End User's original work... The Free Content is licensed, not sold. All intellectual property rights remain with the Creator."

Practical read: safe to use as a **layout/style reference and remix starting point** for this project (a "broader end product," not resale). We are rebuilding in Next.js/Tailwind rather than shipping the Framer file itself, which is even more conservative than the licence requires. Per `CLAUDE.md`, treated here as reference only.

---

## 1. Holistic

- **Template URL:** https://www.framer.com/marketplace/templates/holistic/
- **Preview URL:** https://holistic.framer.media/
- **Creator:** Hamza Ehsan (@hamza-ehsan)
- **Price:** Free (confirmed on template page)
- **Licence:** Limited (Framer Community Terms, quoted above)

**Section-by-section layout:**
1. Nav (Home / About / Services / Journal) + pill CTA "Begin Your Journey"
2. Hero — full-bleed portrait photo, eyebrow badge "Mind · Body · Lifestyle", large serif headline, sub-copy, two CTAs, stat strip (300+ Hours of Coaching / 200+ Client Sessions / 95% Report Reduced Stress)
3. "The signs that something needs to change" — 6 staggered photo+caption cards (pain points), on cream background
4. About — practitioner story ("Hi, I'm Maya...") with portrait
5. Services CTA band — "Guiding you back to balance" + "Explore Services" button
6. Testimonials — 3-card grid with avatar, name, role
7. "Featured in" logo strip
8. Programs CTA — "Find the support that fits your life"
9. Final CTA — "You deserve to feel like yourself again" + "Begin Your Journey"
10. Footer — Navigate / Connect (incl. "Book a Call") / Legal columns, copyright

**Colour palette (real hex, via `getComputedStyle`):**
| Role | Value |
|---|---|
| Page background (cream) | `rgb(254,249,239)` → `#FEF9EF` |
| Secondary section background (blush) | `rgb(245,237,225)` → `#F5EDE1` (approx, sampled near hero text) |
| Primary button / accent (terracotta) | `rgb(153,88,42)` → `#99582A` |
| Body/heading text (on cream) | near-black `#1a1a1a`-range (dark warm grey, not pure black) |
| Button text on terracotta | `rgb(254,249,239)` → `#FEF9EF` (same cream) |

**Typography:**
- Display/headline: **Instrument Serif**, e.g. H1 90px / weight 400 / line-height 90px / letter-spacing ‑2.7px
- Body/UI: **Inter**, e.g. nav/paragraph 14–20px / weight 400–500

**Spacing/feel:** generous negative space, large single-column hero, cards with soft rounded corners and drop-shadow-free flat cream fills; scroll-reveal fade/slide animation on section entry (not scroll-jacking).

**Buttons/cards:** fully pill-shaped (`border-radius: 50px`), solid terracotta primary, white/outline secondary; testimonial and "signs" cards use soft, slightly-tinted cream rectangles with rounded corners.

**Notable interactions:** scroll-triggered fade-ins section by section; an exit/scroll-triggered email-capture modal ("Start feeling calmer in 5 days") appeared during preview — would need to be removed/repurposed, not left as-is.

**Fit for a nutritionist (pros/cons):**
- Pros: copy is literally written for "stress coaches, **nutritionists**, life coaches..."; has Booking (Calendly-ready) CTA, Journal/blog, testimonials, stats bar — matches the practitioner-site brief closely; warm, calm, trustworthy tone; CMS-ready blog for SEO/GEO content.
- Cons: imagery/copy skews "burnout coaching," would need full photo and copy replacement to read as clinical-nutrition rather than life-coaching; email-capture modal needs removing to match "no lorem/gimmicks" project rules; only 8 pages (no dedicated multi-service architecture like "the practice").

---

## 2. the practice

- **Template URL:** https://www.framer.com/marketplace/templates/the-practice/
- **Preview URL:** https://thepractice.framer.website/
- **Creator:** Ahsan Habib (@findahsanhabib)
- **Price:** Free (confirmed on template page)
- **Licence:** Limited (Framer Community Terms, same as above)

**Section-by-section layout (homepage):**
1. Nav — logo "the practice.", Explore ▾ / Services / Therapists / Journal / Contact, dark pill "Book a consult"
2. Hero — announcement pill ("Now welcoming new clients"), large serif/sans mixed headline "A softer place to *begin again*.", sub-copy, primary pill CTA + text link, oversized outline wordmark graphic under the fold
3. "Our Approach" — 3 numbered points (01/02/03) in a lavender card beside a photo, plus an olive "Every journey here begins with a conversation" callout with CTA
4. "By the numbers" — small practice stats
5. Services grid — 4 photo cards (Individual / Couples / Teens & Families / Online therapy), each with a tag badge and arrow icon
6. FAQ — "Before you reach out" accordion (7 questions) beside a dark "Still wondering? Book a free consultation" card
7. Consultation/contact form section
8. Final CTA — dark section, "Therapy that meets you where you are" + oversized wordmark repeated in sage-on-black
9. Footer — dark, multi-column nav (About/Approach/Services/Therapists/How it works/FAQ/Fees & Insurance/Locations/Journal), contact links, "Need urgent support?" safety callout, legal links (Privacy/Terms/Accessibility/Cancellation)

Full template also ships separate pages for About, Approach, Services (4 sub-pages), Therapists, How It Works, Fees & Insurance, Locations, FAQ, Contact, Journal + article template, and legal pages — the most complete page set of the three.

**Colour palette (real hex, via `getComputedStyle`):**
| Role | Value |
|---|---|
| Page background (blush) | `rgb(244,230,224)` → `#F4E6E0` |
| Primary text / button fill (near-black, warm) | `rgb(20,23,17)` → `#141711` |
| Button text on black (cream) | `rgb(251,246,238)` → `#FBF6EE` |
| Accent block 1 (dusty lavender-blue, "Our Approach" card) | ≈ `#A9B7D6` (sampled from screenshot) |
| Accent block 2 (sage/olive, callouts & footer wordmark) | ≈ `#C9DA8C` (sampled from screenshot; used for "Book a free consultation" pill and footer script text) |
| Footer background | near-black `#14150F`-range, same family as button fill |

**Typography:**
- Headline sans: **Switzer**, e.g. H1 76px / weight 400 / line-height ~74px / letter-spacing ‑3.4px
- Italic display accent: **Instrument Serif** (italic), used for emphasis words like "*begin again.*", "*reach out.*" — e.g. 92px for hero accent word
- Body copy also Switzer, ~24px/500 for lead paragraphs

**Spacing/feel:** editorial magazine feel — asymmetric grids, oversized outline type as a graphic device, generous blush background, warm interior photography (rattan chairs, florals). Cards have soft rounded corners (~24px) and sit on tonal-tinted panels (lavender, olive) rather than plain white — a distinctive multi-accent palette.

**Buttons/cards:** pill buttons (100px radius) — solid black primary with cream text, olive-green pill for secondary CTAs, black-bordered ghost buttons; FAQ items are flat rounded rows with a plus-icon accordion.

**Notable interactions:** scroll-reveal fades (content blurs/fades in as you scroll, same pattern as Holistic); sticky nav; oversized wordmark repeats as a design motif (hero + footer).

**Fit for a nutritionist (pros/cons):**
- Pros: by far the most complete information architecture (services sub-pages, fees & insurance, locations, team/therapists, FAQ, journal) — maps directly onto Services/About/Approach/Testimonials/FAQ/Contact sections this site needs; most "editorial/premium" look of the three; multi-accent tonal palette (not just one brand colour) gives good flexibility for a design system.
- Cons: copy and section names ("Therapists," "Couples Therapy," "Fees & Insurance," crisis-support footer callout) are clinical-therapy-specific and would need the heaviest rewrite to fit a solo nutrition practitioner (single practitioner, not a multi-therapist practice); richest but also most complex template to rebuild faithfully.

---

## 3. Avelune Well

- **Template URL:** https://www.framer.com/marketplace/templates/avelune-well/
- **Preview URL:** https://avelune-template.framer.website/
- **Creator:** Ava Wilson (@ava-wilson)
- **Price:** Free (confirmed on template page)
- **Licence:** Limited (Framer Community Terms, same as above)

**Section-by-section layout:**
1. Sticky nav — wordmark "Avelune", "Book a call" pill (with avatar), hamburger menu
2. Hero — full-bleed sky/flower photo, mono eyebrow "COACHING · CONSULTING · WORKSHOPS", large serif headline "Clarity, structure, and one expert who sees it through", sub-copy, two pill CTAs (solid white "Book a Consultation", outline "See How I Can Help")
3. "Sound familiar? You're not alone" — floating photo collage + serif problem statement (parallax-style images around centred text)
4. Services — **dark (near-black) section** with sticky left-hand tab list (Private Coaching / Signature Program / Workshops & Speaking), each tab showing a full-bleed photo + price/duration meta + description + CTA
5. Stats band over a second sky photo — 50+ Teams aligned / 1500+ Pages rewritten / 99% Strategic clarity
6. About — "After a decade in operating and leadership roles..." practitioner story with floral imagery
7. Offer/pricing block — "From $2,800 · 90 Days" + "See If We're a Fit" CTA
8. Testimonials — dark ocean-cliff photo backdrop, horizontal scroll of client photo cards, "What clients say once the work is done"
9. FAQ accordion
10. Final CTA — dark teal/green nebula-style photo background, "Ready to bring structure to what's next?" + two pill CTAs
11. Footer — black, Avelune wordmark + social icons, Home/About/Service/Member/Contact columns, "Get Started"/"Free Resource" columns, tiled repeating wordmark, legal line

**Colour palette (real hex, via `getComputedStyle`):**
| Role | Value |
|---|---|
| Page background (off-white) | `rgb(251,251,251)` → `#FBFBFB` |
| Primary button fill | `rgb(251,251,251)` → `#FBFBFB` (white pill on photo hero) |
| Primary button text | `rgb(14,14,13)` → `#0E0E0D` |
| Secondary/outline button text (on photo) | `rgb(251,251,251)` → `#FBFBFB` white, transparent fill, white border |
| Dark section background (services/testimonial/CTA) | near-black `#0E0E0D`-range |
| Eyebrow label colour | white on photo / dark-grey on light sections |

**Typography:**
- Headline serif: **Libre Caslon Condensed**, e.g. H1 68px / weight 400 / line-height 72px, normal letter-spacing — classic, editorial-magazine condensed serif
- Body/UI sans: **IBM Plex Sans**, e.g. buttons 14px/500
- Eyebrow/meta mono: **IBM Plex Mono**, e.g. "COACHING · CONSULTING · WORKSHOPS" 10px/500, uppercase, letter-spaced

**Spacing/feel:** high-contrast, high-fashion "premium coach" styling — big sky/floral photography, generous whitespace on light sections, stark black on dark sections, small-caps mono labels used throughout as a structural device (eyebrows, tags, meta info like "3 MONTHS · COHORT OR 1:1").

**Buttons/cards:** fully pill-shaped (~99px radius); dark-section content cards have thin 1px hairline borders rather than filled backgrounds (outline-card style); testimonial cards are photo-first with tight text underneath.

**Notable interactions:** scroll-reveal fades/opacity transitions on text and floating images; sticky tab-list on the services section (click/scroll swaps the photo + copy on the right); horizontal-scroll testimonial carousel with prev/next arrows; a "Free Resource" email opt-in is part of the footer nav (not an intrusive modal like Holistic's).

**Fit for a nutritionist (pros/cons):**
- Pros: elegant, editorial, very calm and premium — closest to a "high-trust solo practitioner" feel among the three; explicit About/services/testimonials/FAQ/contact sections; CMS blog and enquiry form included; mono eyebrow-label system is a nice differentiator for a design system.
- Cons: written for a **business/life coach** ("Women coaches, consultants and mentors"), not health — pricing block ("$2,800 · 90 Days") and "teams aligned" stat are corporate-coaching-flavoured and would need full replacement for a nutrition practice; heavy full-bleed photography requires strong original photography to look right (stock sky/floral shots won't carry a health brand); dark high-contrast sections are more dramatic than the calm/clinical tone the project brief wants.

---

## Comparison table

| | Holistic | the practice | Avelune Well |
|---|---|---|---|
| Creator | Hamza Ehsan | Ahsan Habib | Ava Wilson |
| Price | Free | Free | Free |
| Licence | Limited (Community Terms) | Limited (Community Terms) | Limited (Community Terms) |
| Pages (as shipped) | 8 | ~20 (incl. service sub-pages, legal) | 9 |
| Copy written for | Wellness/life coaches, **explicitly incl. nutritionists** | Therapy practice (multi-therapist clinic) | Business/life coaches, consultants |
| Headline font | Instrument Serif | Switzer + Instrument Serif (italic accent) | Libre Caslon Condensed |
| Body font | Inter | Switzer | IBM Plex Sans (+ IBM Plex Mono labels) |
| Core palette | Cream `#FEF9EF` + terracotta `#99582A` | Blush `#F4E6E0` + near-black `#141711` + lavender/olive accents | Off-white `#FBFBFB` + near-black `#0E0E0D`, photo-led |
| Booking/CTA | Calendly-ready "Begin Your Journey" | "Book a consult" + consultation form | "Book a Consultation" / "Book a call" |
| Blog/Journal (SEO) | Yes, CMS journal | Yes, CMS journal + article template | Yes, CMS blog (7 sample articles) |
| Animation | Scroll fade-ins; stray email-capture modal | Scroll fade-ins; oversized wordmark motif | Scroll fades; sticky tab panel; horizontal testimonial carousel |
| Overall tone | Warm, approachable, coaching-calm | Editorial, premium-clinical, most complete IA | High-fashion, premium, coach-editorial |

## Recommendation

**Holistic** is the strongest starting reference. It is the only one of the three explicitly written for nutritionists ("Perfect for stress coaches, **nutritionists**, life coaches..."), its section set (hero with credibility stats, "signs/pain points," about, services, testimonials, journal, booking CTA, footer) maps directly onto the practitioner site's required sections without reinterpretation, its single warm cream/terracotta palette is easy to turn into clean design tokens, and Instrument Serif + Inter is a calm, readable, accessible pairing. It needs the least conceptual rework — mainly removing the intrusive email-capture modal and swapping "coaching" language for clinical-nutrition language.

**the practice** is the best structural/IA reference — if the site later grows into multiple service pages (e.g., 1:1 consults, group programs, corporate wellness) or a fuller Fees/FAQ/Locations architecture, borrow its page list and its tonal multi-accent palette (blush + lavender + olive) rather than its therapy-specific copy.

**Avelune Well** is the best reference for typography/eyebrow-label system and photography-led premium feel, but its corporate-coaching pricing/positioning is the furthest from a nutrition practice and would need the most content rework; keep it as a secondary mood reference rather than the primary base.

**Runners-up rejected (one line each):**
- **MindLeaf** — calming therapist-landing-page aesthetic, but single-page only and copy is mental-health/therapy specific.
- **Mindora** — nice soft therapist aesthetic, but single landing page with no additional pages/blog, too thin for an SEO-driven site.
- **TheGrace** — solid warm therapist template with testimonials/FAQ, but positioning and section copy are clinically therapy-specific, redundant with "the practice."
- **FullBalance** — beautiful cream/serif yoga-studio template, but structured around class schedules/pricing, not a 1:1 practitioner.
- **Human Home** — generic hackathon-demo template with no extra pages; testimonials-only structure too thin for this brief.
