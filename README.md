# Annette Low: personal website

Personal website for **Annette Low, BND(Hon), APD, AdvDipNat**, Accredited Practising Dietitian, nutritionist and naturopath (Marrickville and Potts Point, Sydney, plus telehealth Australia-wide). The site works alongside her practice site, [Nutritionpath](https://nutritionpath.com.au), and all booking buttons go to the existing Nutritionpath booking system.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next/font, next/image and next/og. Every page is static HTML. There's no backend and no database, and no environment variables are required (the optional preview-mode variables are below).

## Run locally

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Edit content

**All text lives in [`content/site.ts`](content/site.ts).** Change it there and the page, structured data, `/llms.txt` and social image all update together.

- `practitioner`: name, credentials, qualifications, memberships, photo
- `contact`: phone, booking link, clinic addresses, social links
- `site`: domain, default title and description, navigation
- `home`: every homepage section (hero, about, services, approach, testimonials, FAQ, call to action, footer)
- `whyWebsite`: the internal `/why-a-website` pitch

Rules:
- Only publish facts Annette has confirmed. The verified source notes are in [`content/practitioner.md`](content/practitioner.md).
- Empty sections hide themselves. For example, `home.testimonials.items` is `[]`, so there's no testimonials section until real ones are added.
- Search `content/site.ts` for `TODO` to see what's still waiting on Annette.
- Headings can highlight one word by wrapping it in asterisks, e.g. `"What Annette can *help* with"`. Keep it to one word per heading.
- `home.concerns.chips` labels must match an item in `home.services.items[].items` exactly, or the build stops with an error.
- To replace the headshot, overwrite `public/images/annette-low.jpg` and update `width`, `height` and `alt` in `practitioner.image`. Strip location (EXIF/GPS) data from phone photos first.

## Design system

Tokens (colours, type, spacing, radii, shadows, motion) are defined once in the `@theme` block of [`app/globals.css`](app/globals.css). Reusable pieces are in `components/ui/` (primitives) and `components/sections/` (page sections). Scroll motion is a small anime.js layer in `components/motion/` (loaded after the page, skipped entirely for visitors who prefer reduced motion). Mood photos are free Unsplash images listed in `content/stock.ts`, with credits in `research/asset-manifest.md`.

- Full reference and contrast table: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md)
- Live preview: run the site and open `/design-system` (noindex, not in the sitemap)
- Use tokens only: no raw hex codes or arbitrary Tailwind values in components.

## SEO and GEO

The metadata, JSON-LD structured data, sitemap, robots, `/llms.txt` and OG images are all documented in [`SEO_GEO.md`](SEO_GEO.md), including the steps to follow once the domain is chosen.

## Deploy to Vercel

1. Push this repo to GitHub, GitLab or Bitbucket.
2. At [vercel.com/new](https://vercel.com/new), **import** the repository. The Next.js preset is detected automatically, so leave every setting at its default and add no environment variables.
3. Click **Deploy**. Every later push to `main` redeploys automatically, and pull requests get preview URLs.
4. **Custom domain:** open Project → Settings → Domains, add the domain (e.g. `annettelow.com.au`), and set the DNS records Vercel shows at the domain registrar. HTTPS is automatic.
5. Set `site.url` in `content/site.ts` to the final domain (e.g. `"https://annettelow.com.au"`) and push. Canonical URLs, the sitemap, robots and structured data then use it. Until then they fall back to the Vercel production URL.
6. After launch, submit `https://<domain>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Plan note: Vercel's free Hobby plan is for non-commercial use only, so a practice website should be on the **Pro** plan.

## Preview mode (concept preview for Annette)

The same code can run as a **concept preview**: a noindex demo of the proposed site where parts of the homepage are locked as "To be built" and items waiting on Annette are marked "Needs your input". Everything is controlled by environment variables (see [`.env.example`](.env.example)); with none set, the site is the real, indexable site.

| Variable | Value | Effect |
|---|---|---|
| `SITE_MODE` | `preview` | Preview mode. Unset (or anything else) = full site. |
| `PREVIEW_UNLOCK_CODE` | any secret string | Optional. Lets you show the full content on a call via an unlock link. |
| `PREVIEW_COOKIE_SECRET` | long random string | Optional. Extra secret mixed into the unlock cookie's signature. |

What preview mode does:
- `noindex, nofollow` meta on every page, `X-Robots-Tag: noindex, nofollow, noarchive` on every response (`proxy.ts`), `robots.txt` = `Disallow: /`, an empty sitemap, a one-line `llms.txt`, and **no JSON-LD** (it would publish every answer).
- Homepage teaser: the first service, approach pillar, "what to expect" step and two FAQ answers are live; the rest show their **title only** with skeleton text. The withheld copy is removed on the server (`lib/content.ts`), so it is not in the HTML or the page's data payload. Testimonials, clinic hours and fees show "Needs your input" placeholders, a "What the full site includes" band sits above the footer, and a dismissible badge credits the author.
- `/why-a-website` stays fully readable.

Deploy a preview on Vercel (keep it separate from the real site):
1. **Recommended:** create a second Vercel project from the same repository (e.g. `annette-low-preview`). In Project → Settings → Environment Variables, add `SITE_MODE=preview` for the **Production** environment (optionally `PREVIEW_UNLOCK_CODE` and `PREVIEW_COOKIE_SECRET` too), then redeploy. Share that project's production URL. The real project keeps no variables and stays indexable.
2. **Alternative:** in the real project, add `SITE_MODE=preview` for the **Preview** environment only. Every branch/PR preview URL is then a concept preview, while Production stays the full site.
3. Environment variable changes only apply to new deployments, so redeploy after changing them.

Unlock link: with `PREVIEW_UNLOCK_CODE` set, open `https://<preview-url>/?unlock=<code>`. It sets a signed, HTTP-only cookie for 4 hours and redirects to the clean URL, and the homepage then shows the full content (it's still noindex and still has no JSON-LD). A wrong code just redirects without a cookie. With an unlock code set, `/` is rendered per request (it reads the cookie); without one, the preview is fully static.

Local check:

```bash
SITE_MODE=preview npm run build && SITE_MODE=preview npm run start
SITE_MODE=preview PREVIEW_UNLOCK_CODE=test npm run build && SITE_MODE=preview PREVIEW_UNLOCK_CODE=test npm run start
# then open http://localhost:3000/?unlock=test
```

## Project notes for Claude Code

`CLAUDE.md` holds the standing project rules. `.claude/handoff.md` carries progress between sessions: a SessionStart hook injects it and a Stop hook reminds you to update it. Project sub-agents are in `.claude/agents/`.
