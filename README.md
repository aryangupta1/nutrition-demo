# Annette Low: personal website

Personal website for **Annette Low, BND(Hon), APD, AdvDipNat**, Accredited Practising Dietitian, nutritionist and naturopath (Marrickville and Potts Point, Sydney, plus telehealth Australia-wide). The site works alongside her practice site, [Nutritionpath](https://nutritionpath.com.au), and all booking buttons go to the existing Nutritionpath booking system.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, next/font, next/image and next/og. Every page is static HTML. There's no backend, no database and no environment variables.

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
- To replace the headshot, overwrite `public/images/annette-low.jpg` and update `width`, `height` and `alt` in `practitioner.image`. Strip location (EXIF/GPS) data from phone photos first.

## Design system

Tokens (colours, type, spacing, radii, shadows, motion) are defined once in the `@theme` block of [`app/globals.css`](app/globals.css). Reusable pieces are in `components/ui/` (primitives) and `components/sections/` (page sections).

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

## Project notes for Claude Code

`CLAUDE.md` holds the standing project rules. `.claude/handoff.md` carries progress between sessions: a SessionStart hook injects it and a Stop hook reminds you to update it. Project sub-agents are in `.claude/agents/`.
