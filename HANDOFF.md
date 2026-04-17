# Session Handoff — sylvestri.com SEO & Guide Expansion

**Last updated:** 2026-04-02
**Last synced commit:** `c7c665a` (document lead ops production checkpoint)
**Branch:** `main`
**Repo local path:** `/Users/ryansylvestri/dev/github/https-sylvestri-com`
**Sandbox mirror:** `/sessions/zealous-blissful-wozniak/mnt/https-sylvestri-com`

---

## Latest State (2026-04-02)

- `main` is aligned with `origin/main`; local quality gates pass (`npm run lint`, `npm run build`).
- Repo-side follow-up work now includes:
  - lead-magnet detail pages under `/lead-magnets/[slug]`
  - deterministic autoresponder sequence planning in the app payload sent to `LEAD_AUTORESPONDER_WEBHOOK_URL`
  - a synthetic live submission harness at `npm run lead:verify:live -- --base-url https://sylvestri.com`
  - a more operational `/kpi` page with configuration status cards and weekly cadence
  - tracked ops runbooks in `ops/analytics/`, `ops/hostinger/`, `ops/n8n/`, and `ops/runbooks/`
  - cleaned heading structure for the legacy `/monkeymaghees` static page
- A synthetic live submission on 2026-04-02 still returned:
  - `202 Accepted`
  - `Lead captured in the site layer. Set LEAD_ROUTER_URL or FUB_API_TOKEN to forward submissions.`
  - request id `19ce57e8-239f-4a7e-9ab1-43b07582e688`
- Remaining external blockers are still outside the repo:
  - Hostinger hPanel env import + redeploy
  - GTM container publish
  - live n8n autoresponder workflow deployment
  - live dashboard URLs or system credentials for `/kpi`

Historical notes from the March build-out remain below.

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

## What's Also Done (Session 3)

13. **Google Search Console verification** — HTML tag method via `metadata.verification.google` in `app/layout.tsx`
14. **Sitemap submitted to GSC** — `https://sylvestri.com/sitemap.xml` submitted Mar 26, 2026; Google will index 248 URLs

## What Could Be Done Next

- Monitor GSC sitemap status — initial "Couldn't fetch" is normal, should resolve within hours
- Enable Hostinger Reach for SEO/SMO readiness (manual step in Hostinger dashboard)
- Add guide cross-links from landing pages and squeeze pages (not just audience hub pages)
- Add Open Graph images per guide page using Cloudinary dynamic OG image generation
- Consider adding structured data (HowTo, LocalBusiness) to more pages
- Delete the old `/sitemap.website.xml` entry in GSC (legacy Hostinger sitemap, 1 error, 0 pages)

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
| `app/layout.tsx` | Root layout with GSC verification meta tag (`metadata.verification.google`) |
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

---

## Thread Update

Date: 2026-03-26
Scope: Cloudinary signed upload API parity planning

### Context
- Cloudinary signed upload API was implemented first in:
  - `/Users/ryansylvestri/dev/github/hudsonriverrealtors/blog-site`
- This repo has not yet received the mirrored implementation in this execution step.

### This Repo Update
- Added cross-repo parity note in `README.md`.
- Updated `documentation.md` with the current parity status.
- Added `codex.md` for standardized session orientation.
- Kept this handoff file as the canonical handoff artifact (case-insensitive filesystem means `handoff.md` maps to `HANDOFF.md`).

### Pending Mirror Work
- Add:
  - `POST /api/cloudinary/sign`
  - `POST /api/cloudinary/upload-complete`
- Add env vars:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_UPLOAD_FOLDER`
  - `UPLOAD_ADMIN_TOKEN`
- Add deterministic test script equivalent to HRR `blog-site/scripts/test-cloudinary-signed-upload.mjs`.

### Mirror Completion
- The pending Cloudinary signed-upload mirror work is now complete in this repo.
- Added endpoints:
  - `POST /api/cloudinary/sign`
  - `POST /api/cloudinary/upload-complete`
- Added supporting files:
  - `lib/cloudinary-upload-server.ts`
  - `scripts/test-cloudinary-signed-upload.mjs`
- Updated env contract and npm script:
  - `.env.example`
  - `package.json` (`cloudinary:test-upload`)

---

## Thread Update

Date: 2026-03-26
Scope: Docs/resources/articles platform v1

### What Landed

- Added a shared MDX content engine:
  - `lib/content-engine.ts`
- Added access and auth helpers:
  - `lib/content-access.ts`
  - `lib/supabase.ts`
  - `lib/stripe.ts`
- Added content roots:
  - `content/docs`
  - `content/resources`
  - `content/articles`
- Added route surfaces:
  - `/docs`
  - `/docs/[...slug]`
  - `/articles`
  - `/articles/[slug]`
  - `/login`
  - `/account`
- Added hybrid `/resources` behavior:
  - MDX resource first
  - legacy `lib/resource-pages.ts` fallback for non-migrated slugs
- Preserved `/guides` and added optional redirect support to migrated articles via `legacyUrl`.
- Added APIs:
  - `POST /api/waitlist/pro`
  - `POST /api/stripe/webhook`
  - `POST /api/assets/upload-url`
  - `POST /api/assets/complete`
  - `GET /api/assets/[id]/access-url`
- Added Supabase SQL scaffold:
  - `supabase/migrations/20260326_docs_platform_v1.sql`

### Verification

- `npx tsc --noEmit` passes
- `npm run build` passes
- `npm run lint` required one pre-existing `RevealSection` hook fix, then passed aside from existing image warnings if not yet addressed in follow-up work

### Media Pipeline Continuation

- Added queue and policy helpers:
  - `lib/asset-queue.ts`
  - `lib/asset-policy.ts`
- Updated asset endpoints for queue-first processing:
  - `POST /api/assets/upload-url`
  - `POST /api/assets/complete`
  - `GET /api/assets/[id]/access-url`
- Added worker script and npm command:
  - `scripts/asset-worker.mjs`
  - `npm run assets:worker`
- Added podcast feed endpoint:
  - `GET /podcast/feed.xml`
- Added expanded Supabase migration:
  - `supabase/migrations/20260326_docs_platform_v1_worker.sql`

---

## Thread Update

Date: 2026-03-26
Scope: Aggressive SEO + SEO-first publishing automation baseline

### What Landed

- Added signed n8n publish surfaces:
  - `POST /api/ops/content/publish`
  - `POST /api/ops/assets/publish-pdf`
- Added SEO refresh worker endpoints:
  - `POST /api/seo/ping`
  - `POST /api/seo/push`
- Added helper modules:
  - `lib/ops-publish-utils.ts`
  - `lib/seo.ts`
  - `lib/seo-ping.ts`
- Added dedicated content sitemap:
  - `/sitemap-content.xml`
- Tightened robots/noindex behavior:
  - `/login`, `/account`, `/auth/*`, `/api/*`
- Replaced remaining critical raw images in core public routes with `next/image`.
- Added Hostinger packaging script and runbook:
  - `ops/hostinger/package-upload.sh`
  - `ops/hostinger/README.md`
- Added n8n workflow templates and docs:
  - `ops/n8n/README.md`
  - `ops/n8n/daily-content-publisher.json`
  - `ops/n8n/daily-pdf-publisher.json`
  - `ops/n8n/lead-intake-router.md`
- Expanded env contract:
  - `HOSTINGER_N8N_WEBHOOK_TOKEN`
  - `N8N_SIGNATURE_SECRET`
  - `N8N_SOURCE_ID`
  - `GSC_PING_TOKEN`
  - `LEAD_NOTIFICATION_EMAILS`
  - `LEAD_NOTIFICATION_FROM`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - optional GSC/IndexNow helper vars

### Verification

- `npm run lint` passes
- `npm run build` passes
- `npm run hostinger:package` passes
- Hostinger artifact created at:
  - `/Users/ryansylvestri/dev/github/https-sylvestri-com/dist/hostinger/sylvestri-hostinger-package.tgz`

### Notes For Next Session

- Import the `ops/n8n/*.json` workflow templates into the live Hostinger n8n instances.
- Wire real signature generation inside n8n for `x-n8n-signature`.
- Configure `GSC_PING_ENDPOINT` and/or `INDEXNOW_KEY` if live indexing pushes should fire beyond Bing sitemap pings.
- Use `npm run lead:smoke` before production lead changes to verify:
  - router success
  - router failure -> direct Follow Up Boss fallback
  - honeypot handling
  - address-required validation
  - rate limiting
  - SMTP JSON preview for `bot@sylvestri.com`
