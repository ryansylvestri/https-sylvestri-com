# Session Handoff — sylvestri.com SEO & Guide Expansion

**Last updated:** 2026-03-25
**Last commit:** `0111dc5` (feat: add /guides/[topic] routes)
**Branch:** `main`
**Repo local path:** `/Users/ryansylvestri/dev/github/https-sylvestri-com`
**Sandbox mirror:** `/sessions/zealous-blissful-wozniak/mnt/https-sylvestri-com`

---

## What's Done

1. **Cloudinary media integration** across all 120+ pages (landing, squeeze, resource, homepage)
2. **ARIA accessibility** — skip-to-content, landmarks, aria-live, mobile nav with aria-expanded/aria-modal
3. **RevealSection scroll animations** — IntersectionObserver with prefers-reduced-motion respect
4. **FAQ content** — 150+ Q&As across 23 categories in `lib/faq-content.ts` and `lib/faq-content-extended.ts`
5. **FAQPage JSON-LD** on landing pages
6. **Dynamic sitemap** at `app/sitemap.ts` — 150+ URLs with priority tiers, includes all static routes, landing, squeeze, resource, brand, and guide pages
7. **robots.txt** at `app/robots.ts` — points to sitemap
8. **Guide topics metadata** at `lib/guide-topics.ts` — 23 guides with slug, title, description, category, faqKeys, relatedLanding
9. **Guide index page** at `app/guides/page.tsx` — category-grouped cards with RevealSection
10. **Guide dynamic route** at `app/guides/[topic]/page.tsx` — FAQ content, Cloudinary hero, JSON-LD Article + FAQPage, lead capture, related guides
11. **Guide prose content** at `lib/guide-prose.ts` — JUST CREATED, 23 guides × 3-4 sections each of original long-form article content

## What's In Progress

### Task 1: Render prose sections in guide pages (NOT YET DONE)
- **File:** `app/guides/[topic]/page.tsx`
- **Action:** Import `guideProse` from `lib/guide-prose.ts`, render sections between the hero and FAQ section
- **Pattern:** Each section gets a `<RevealSection>` wrapper with staggered delay, `<h2>` heading, `<p>` body

### Task 2: Hub-and-spoke cross-links (NOT YET DONE)
- **File:** `components/route-page-template.tsx`
- **Action:** Add a "Related Guides" section between the process/steps section and the final CTA
- **Data source:** Import `guideTopics` from `lib/guide-topics.ts`, filter by matching category:
  - `buyer` interest → buyer + lifestyle guides
  - `seller` interest → seller guides
  - `investor` interest → investor guides
- **Design:** Grid of guide cards linking to `/guides/{slug}`, using the same card style as the guides index page

### Task 3: TypeScript verification
- Run `npx tsc --noEmit` after both tasks above
- Fix any errors

### Task 4: Commit and push
- Stage: `lib/guide-prose.ts`, `app/guides/[topic]/page.tsx`, `components/route-page-template.tsx`
- Commit message format: `feat: add long-form prose to guide pages + hub-and-spoke cross-links`
- Push via Desktop Commander: `cd /Users/ryansylvestri/dev/github/https-sylvestri-com && git push origin main`
- Hostinger auto-deploys from main

## Key File Reference

| File | Purpose |
|------|---------|
| `lib/guide-topics.ts` | 23 guide metadata objects (slug, title, desc, category, faqKeys, relatedLanding) |
| `lib/guide-prose.ts` | Long-form article sections keyed by guide slug |
| `lib/faq-content.ts` | 9 FAQ categories (~70 Q&As) |
| `lib/faq-content-extended.ts` | 14 FAQ categories (~80+ Q&As) |
| `lib/media-map.ts` | Cloudinary topic→image mapping + stable hash |
| `lib/cloudinary.ts` | Cloudinary URL builder (cloud: `dtmh3eypz`) |
| `lib/site-content.ts` | landingPages, squeezePages, siteConfig, brandEntries |
| `lib/resource-pages.ts` | 21+ resource pages |
| `app/sitemap.ts` | Dynamic sitemap covering 150+ URLs |
| `app/robots.ts` | robots.txt pointing to sitemap |
| `app/guides/page.tsx` | Guide index page |
| `app/guides/[topic]/page.tsx` | Individual guide dynamic route |
| `components/route-page-template.tsx` | Shared template for /buyers, /sellers, /investors, /renters, /ai |
| `components/reveal-section.tsx` | IntersectionObserver scroll animation component |
| `components/site-shell.tsx` | SiteShell, PageHero, SectionHeading components |
| `components/lead-capture-form.tsx` | Lead capture with aria-live |

## Component Signatures (for quick reference)

```tsx
// RevealSection
<RevealSection delay={100} direction="up" | "left" | "right" | "scale">

// SectionHeading (description is required)
<SectionHeading eyebrow="string" title="string" description="string" />

// LeadCaptureForm
<LeadCaptureForm title="" description="" submitLabel="" source="" campaign="" defaultInterest?="" />

// getPageImage(slug, topics?) → Cloudinary public_id
// getCloudinaryAssetUrl(publicId, { crop, gravity, width, height, quality, format })
```

## Deployment

- GitHub repo → Hostinger auto-deploy on push to `main`
- Desktop Commander MCP runs git commands on Ryan's Mac (SSH keys there)
- TypeScript check: `npx tsc --noEmit` (run in sandbox, zero errors expected)
- Build check: Cannot fully build in sandbox (lightningcss ARM binary issue), but tsc confirms type safety

## Guide Category Mapping (for hub-and-spoke)

| Route | `defaultInterest` | Guide categories to show |
|-------|-------------------|--------------------------|
| `/buyers` | `buyer` | buyer, lifestyle |
| `/sellers` | `seller` | seller, process |
| `/investors` | `investor` | investor |
| `/renters` | `renter` | lifestyle |
| `/ai` | (none/systems) | systems |
