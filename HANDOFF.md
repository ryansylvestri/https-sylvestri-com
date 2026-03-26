# Session Handoff — sylvestri.com SEO & Guide Expansion

**Last updated:** 2026-03-25
**Last commit:** `56ffb53` (feat: add long-form prose to guide pages + hub-and-spoke cross-links)
**Branch:** `main`
**Repo local path:** `/Users/ryansylvestri/dev/github/https-sylvestri-com`
**Sandbox mirror:** `/sessions/zealous-blissful-wozniak/mnt/https-sylvestri-com`

---

## What's Done (ALL COMPLETE)

1. **Cloudinary media integration** across all 120+ pages (landing, squeeze, resource, homepage)
2. **ARIA accessibility** — skip-to-content, landmarks, aria-live, mobile nav with aria-expanded/aria-modal
3. **RevealSection scroll animations** — IntersectionObserver with prefers-reduced-motion respect
4. **FAQ content** — 150+ Q&As across 23 categories in `lib/faq-content.ts` and `lib/faq-content-extended.ts`
5. **FAQPage JSON-LD** on landing pages
6. **Dynamic sitemap** at `app/sitemap.ts` — 150+ URLs with priority tiers
7. **robots.txt** at `app/robots.ts` — points to sitemap
8. **Guide topics metadata** at `lib/guide-topics.ts` — 23 guides
9. **Guide index page** at `app/guides/page.tsx` — category-grouped cards
10. **Guide dynamic route** at `app/guides/[topic]/page.tsx` — prose + FAQ + hero + lead capture + related guides
11. **Guide prose content** at `lib/guide-prose.ts` — 23 guides × 3-4 article sections (~75 sections total)
12. **Hub-and-spoke cross-links** in `components/route-page-template.tsx` — /buyers, /sellers, /investors, /renters all link to matching guide pages

## What Could Be Done Next

- Enable Hostinger Reach for SEO/SMO readiness (manual step in Hostinger dashboard)
- Verify "Domain is not working" status on Hostinger (may need DNS check)
- Submit sitemap to Google Search Console: `https://sylvestri.com/sitemap.xml`
- Add guide cross-links from landing pages and squeeze pages (not just audience hub pages)
- Add Open Graph images per guide page using Cloudinary dynamic OG image generation
- Consider adding structured data (HowTo, LocalBusiness) to more pages

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
