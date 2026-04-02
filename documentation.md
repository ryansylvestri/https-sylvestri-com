# Thread Documentation

Date: 2026-03-24
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

## Initial Request

Initialize the repository locally in the current directory and pull down:

`git@github.com:ryansylvestri/https-sylvestri-com.git`

## Initial Actions

1. Verified the target directory was empty and not already a Git repository.
2. Ran `git init` in `/Users/ryansylvestri/dev/github/https-sylvestri-com`.
3. Added remote `origin` pointing to `git@github.com:ryansylvestri/https-sylvestri-com.git`.
4. Resolved the remote default branch and confirmed `HEAD` points to `main`.
5. Fetched `origin/main`.
6. Checked out local branch `main` tracking `origin/main`.

## Main Build Request

Use the `sylvestrirealty.com` framework as the model for `sylvestri.com`, then do the research and build stronger conversion-oriented copy for the leading landing pages, squeeze pages, and core audience routes.

## Research and Architecture Findings

1. The old `https-sylvestri-com` repo content was a static real-estate site and not the right long-term architecture for the new ask.
2. The real reusable framework lives in `/Users/ryansylvestri/dev/github/hudsonriverrealtors/site`, which is a Next.js App Router project with:
   - shared shell and lead-capture components
   - typed content registries for route pages
   - dynamic landing and squeeze page systems driven by content arrays
   - static generation for the large page inventory
3. Live `sylvestrirealty.com` confirmed the personal-brand direction and page family structure:
   - home
   - about
   - story
   - buyers
   - sellers
   - investors
   - renters
   - ai
   - brands
   - intake
4. Research on current conversion patterns supported these copy choices:
   - buyers convert on clarity, not hype
   - sellers convert on valuation, equity, timing, and next-step certainty
   - investors convert on criteria, speed, and underwriting logic
   - relocation converts on town fit, commute, and reduced uncertainty
   - motivated-seller flows convert on privacy, options, and calm directness

## Implementation Decisions

1. Replaced the legacy static-site direction with the Next.js multi-page framework.
2. Repositioned `sylvestri.com` as the personal-brand hub rather than a Hudson River Realtors canonical hub.
3. Kept the landing-page and squeeze-page architecture so campaign pages can still scale from content arrays.
4. Rewrote the highest-leverage shared copy surfaces:
   - homepage
   - about
   - story
   - brands
   - intake
   - network
   - lane pages and their shared template
   - landing and squeeze indexes
   - landing and squeeze detail framing
   - shared footer and global intake messaging
5. Rewrote the core registries:
   - `lib/personal-brand-content.ts`
   - `lib/site-content.ts`
6. Updated supporting strings so the app no longer presents itself as Hudson River Realtors.
7. Deleted the old legacy static HTML/CSS/JS bundle from the repo root and `public_html/`.
8. Removed Hudson-specific packaging and deployment leftovers that were not part of the live app path.
9. Added `copy-system.md` to preserve the conversion rules and messaging hierarchy behind the rewrite.
10. Reviewed sibling repositories for ideas, especially:
    - `brand-@ryansylvestri`
    - `brand-@sylvestrisystems`
    - `chat-sylvestri-com`
11. Incorporated two concrete ideas from those repos:
    - a homepage layer that answers who Ryan is, what he does, why he is credible, and where the visitor should go next
    - a stronger entity/search-footprint model through shared `sameAs` structured-data references

## Verification

1. Ran `npm ci`.
2. Ran `npm run build`.
3. Build completed successfully with static generation across the route inventory, including:
   - core personal-brand pages
   - brand detail pages
   - landing pages
   - squeeze pages
   - resource pages

## Current Status

- The repo now contains the Next.js app architecture for `sylvestri.com`.
- The visible copy is aligned to Ryan Sylvestri's personal-brand routing strategy.
- Landing and squeeze page systems are active and build correctly.
- `npm ci` reported 2 vulnerabilities in dependencies; they were not addressed in this thread.

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request

Migrate the Monkey Maghees listing site off Hudson River Realtors and make it available as a sub-page at:

`sylvestri.com/monkeymaghees`

### Actions Completed (So Far)

1. Located the authoritative Monkey Maghees standalone page source in:
   - `/Users/ryansylvestri/dev/github/new-monkey-maghees-for-sale-dot-com/public/index.html`
2. Copied that page into this repo at:
   - `public/monkeymaghees/index.html`
3. Added a Next.js rewrite in `next.config.ts` so `/monkeymaghees` resolves directly to the migrated static page:
   - `/monkeymaghees` -> `/monkeymaghees/index.html`
4. Added `/monkeymaghees` to `app/sitemap.ts` so the new sub-page is indexed in generated sitemap output.

### Verification

1. Ran `npm run build` successfully.
2. Started the app with `npm run start` on local test ports and confirmed:
   - `GET /monkeymaghees` returns `HTTP/1.1 200 OK`
   - Response body includes:
     - `OWN A <em>CASH MACHINE</em>`
     - `Monkey Maghees — Poughkeepsie's Legendary Bar | Turnkey Asset Sale`
3. Confirmed no Hudson River Realtors domain/brand references inside the migrated page file.
4. Confirmed sitemap output contains:
   - `<loc>https://sylvestri.com/monkeymaghees</loc>`

### Status

- Migration to `sylvestri.com/monkeymaghees` is complete in this repo.
- The route is now served from `https-sylvestri-com` infrastructure.
- Existing Hudson River Realtors hosting/deployment removal is not modified by this repo change and should be decommissioned at its source host after deploy.

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Implement Cloudinary signed upload APIs in Hudson River Realtors `blog-site` first, then mirror to this repo after HRR validation.

### Status For This Repo

- No runtime Cloudinary upload API code changes were applied yet in this repo.
- Cross-repo parity note was added to:
  - `/Users/ryansylvestri/dev/github/https-sylvestri-com/README.md`
- This repo remains on delivery-only Cloudinary helper usage (`lib/cloudinary.ts`) at this point.

### Next Planned Action

Mirror the validated signed-upload API pattern from:
- `/Users/ryansylvestri/dev/github/hudsonriverrealtors/blog-site`

Into:
- `/Users/ryansylvestri/dev/github/https-sylvestri-com`

with matching endpoints, env contract, token gate, and local verification script.

### Mirror Execution Update (Completed)

- Mirrored Cloudinary signed-upload implementation from HRR `blog-site` into this repo.

#### Added
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/lib/cloudinary-upload-server.ts`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/app/api/cloudinary/sign/route.ts`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/app/api/cloudinary/upload-complete/route.ts`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/scripts/test-cloudinary-signed-upload.mjs`

#### Updated
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/.env.example`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/package.json`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/README.md`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/codex.md`
- `/Users/ryansylvestri/dev/github/https-sylvestri-com/HANDOFF.md`

#### Result
- This repo now has Cloudinary upload signature API parity with:
  - `/Users/ryansylvestri/dev/github/hudsonriverrealtors/blog-site`

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Implement the docs/resources/articles platform v1 in this repo while preserving the current guides, landing pages, and squeeze pages.

### Architecture Landed

1. Added a shared MDX content engine with:
   - frontmatter schema validation
   - duplicate slug rejection
   - normalized routing/search metadata
   - published-only indexing
2. Added new content roots:

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Implement the repo-hygiene, production-SEO-parity, and daily publishing plan without losing the existing in-progress source work.

### Actions Completed

1. Fixed packaging artifact hygiene so generated Hostinger output no longer pollutes source review:
   - updated `.gitignore` to ignore `dist/` Hostinger staging output and packaged tarballs
   - updated `eslint.config.mjs` to ignore `dist/**`
   - updated `ops/hostinger/package-upload.sh` to remove stale staging output and artifacts before `hostinger:verify`
2. Tightened crawl/index controls for non-public routes:
   - added `/kpi` and `/thank-you` to noindex proxy handling
   - extended `app/robots.ts` disallow rules for `/kpi` and `/thank-you`
3. Standardized metadata coverage on remaining route gaps:
   - moved `/lead-magnets`, `/case-studies`, `/kpi`, and `/thank-you` onto `buildPageMetadata`
   - added route metadata to `/tools` by splitting the calculators into a server wrapper plus client component
   - added breadcrumb JSON-LD to `app/case-studies/[slug]/page.tsx`
4. Unified public lead capture under the canonical site route:
   - routed `components/motivated-seller-form.tsx` through `/api/lead`
   - routed the `public/monkeymaghees/index.html` asset-sale form through `/api/lead`
   - added notification-email fanout support for `bot@sylvestri.com`
   - added Follow Up Boss direct fallback when router delivery is unavailable and FUB credentials are present

### Verification

1. Passed the full hygiene loop:
   - `npm run lint`
   - `npm run build`
   - `npm run hostinger:package`

---

## Thread Update

Date: 2026-04-02
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Finish production lead operations end to end:

- site -> `/api/lead` -> n8n router primary
- direct Follow Up Boss fallback in app
- direct SMTP notification to `bot@sylvestri.com`
- verify all lead surfaces use the canonical site route
- deploy and validate the live path

### Repo-Side Status

1. The app-side lead contract, delivery helpers, smoke harness, and docs were already implemented and committed on `main`.
2. This pass did not add new source-code runtime files to the repo.
3. This pass did update the operational record here so the production state and blocker are preserved.

### Production Ops Work Completed

1. Confirmed the pushed lead-ops code was already on `origin/main`.
2. Audited the live n8n workflows and found the existing website router (`Sylvestri Website Lead Intake Router v2`) was not preserving the full modern site payload as a rich Follow Up Boss event.
3. Built and activated a new n8n workflow:
   - Name: `Sylvestri Website Lead Intake Router v3`
   - Workflow ID: `25iFVf4YQ9NuhfNq`
   - Webhook path: `sylvestri-website-lead-router-v3-20260402`
4. The new router now:
   - requires bearer auth
   - validates the site HMAC signature
   - performs best-effort request-id duplicate suppression
   - posts the same rich lead summary into Follow Up Boss that the app fallback uses
5. Direct signed webhook tests succeeded against the live n8n endpoint after the signature harness was corrected.
6. Verified Follow Up Boss receipt directly over the API:
   - person record updated
   - rich event found for the test lead
   - example confirmed event time: `2026-04-02T13:07:24Z`
7. Verified email delivery path directly against the bot mailbox:
   - SMTP send through `smtp.gmail.com:465` succeeded using `bot@sylvestri.com`
   - IMAP check against `bot@sylvestri.com` confirmed inbox receipt of the verification message

### Hostinger Status

1. Reached the Hostinger deployment settings page for `sylvestri.com`.
2. Confirmed the environment variable UI supports bulk `.env` import.
3. Prepared a local import file containing the required production lead envs at:
   - `/tmp/sylvestri-n8n-audit/hostinger-prod-leads.env`
4. Required keys prepared for import:
   - `LEAD_ROUTER_URL`
   - `LEAD_ROUTER_TOKEN`
   - `LEAD_ROUTER_SIGNING_SECRET`
   - `FUB_API_TOKEN`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `LEAD_NOTIFICATION_EMAILS`
   - `LEAD_NOTIFICATION_FROM`

### Current Blocker

1. Hostinger environment import is blocked by Google sign-in for the Hostinger account.
2. The flow reaches the correct Google account (`ryansylvestri@gmail.com`) but stops at a password/passkey challenge that cannot be safely completed from local automation alone.
3. Because the envs are not yet imported into Hostinger:
   - live `https://sylvestri.com/api/lead` is still not fully wired to the new router
   - a true production synthetic submission has not been run yet
   - live Follow Up Boss and live `bot@sylvestri.com` confirmation for website-originated leads is still pending

### Operational Truth As Of 2026-04-02

1. Downstream systems are ready:
   - n8n router verified
   - Follow Up Boss verified
   - bot mailbox verified
2. The only remaining gap is injecting the prepared env file into Hostinger and redeploying.
3. Once that login step is cleared, the remaining production sequence is:
   - import env file
   - save and redeploy
   - submit one synthetic live lead to `https://sylvestri.com/api/lead`
   - confirm n8n execution, Follow Up Boss event, and bot mailbox notification
   - `npm run lint` again after packaging
2. Confirmed local production output serves the intended homepage metadata:
   - local `/` title is `Hudson Valley Real Estate Broker, Systems Builder, and AI Operator`
   - local `/kpi` and `/thank-you` emit `noindex, nofollow, nocache`
3. Confirmed local `GET /sitemap-content.xml` returns content-stream URLs.
4. Confirmed local lead-route verification:
   - `/api/lead` forwarded normalized payloads into a mock router with `X-Lead-Request-Id` and `X-Lead-Signature`
   - JSON-transport notification preview generated the `bot@sylvestri.com` lead email payload

### Current State

- Source parity is correct locally.
- The live `https://sylvestri.com/` homepage still returning `<title>Home</title>` is now confirmed to be a deployment gap rather than a source-code gap.
- Hostinger packaging is rerunnable from a dirty artifact state without breaking lint.
   - `content/docs`
   - `content/resources`
   - `content/articles`
3. Added route surfaces:
   - `/docs`
   - `/docs/[...slug]`
   - `/articles`
   - `/articles/[slug]`
   - `/login`
   - `/account`
4. Migrated `/resources` to a hybrid model:
   - MDX resource first
   - legacy `lib/resource-pages.ts` fallback when no migrated slug exists
5. Preserved `/guides` as-is while adding optional redirect support when an article declares a matching `legacyUrl`.

### Auth and API Additions

1. Added Supabase-ready auth helpers and magic-link routes:
   - `app/auth/magic-link/route.ts`
   - `app/auth/callback/route.ts`
2. Added entitlement-aware gating for `public`, `free`, and discoverable-but-locked `pro` content.
3. Added new API endpoints:
   - `POST /api/waitlist/pro`
   - `POST /api/stripe/webhook`
   - `POST /api/assets/upload-url`
   - `POST /api/assets/complete`
   - `GET /api/assets/[id]/access-url`
4. Added Supabase SQL scaffolding in:
   - `supabase/migrations/20260326_docs_platform_v1.sql`

### Supporting Updates

1. Extended visible nav ownership in `lib/personal-brand-content.ts` to expose:
   - `/docs`
   - `/articles`
2. Extended `.env.example` with Supabase, Stripe, and `FEATURE_PAID` entries.
3. Added `scripts/scaffold-plans.mjs` plus npm script:
   - `npm run plans:scaffold`
4. Updated sitemap generation to include the new MDX content surfaces while avoiding duplicate legacy resource entries for migrated slugs.

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Continue implementation to close the remaining media subsystem gap with queue-based processing and podcast feed output.

### Additional Media Pipeline Work Completed

1. Added queue and policy helpers:
   - `lib/asset-queue.ts`
   - `lib/asset-policy.ts`
2. Updated asset APIs:
   - `POST /api/assets/upload-url` now returns v1 allowlist/size limits
   - `POST /api/assets/complete` now writes `processing` state and enqueues BullMQ jobs
   - `GET /api/assets/[id]/access-url` now enforces `status=ready` before URL release
3. Added worker runtime script:
   - `scripts/asset-worker.mjs`
   - package script: `npm run assets:worker`
4. Added podcast feed route:
   - `GET /podcast/feed.xml`
5. Added expanded Supabase schema scaffolding:
   - `supabase/migrations/20260326_docs_platform_v1_worker.sql`
   - includes `user_roles`, `entitlements`, `stripe_customers`, `subscriptions`, `asset_jobs`, `asset_text_chunks`, and indexes.

### Environment and Docs Updated

1. Added env keys:
   - `REDIS_URL`
   - `ASSET_MAX_BYTES`
   - `ASSET_WORKER_CONCURRENCY`
2. Updated `README.md` with worker and feed endpoint coverage.

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64

### Request Context

Implement the full Sylvestri.com audit execution plan: tracking stack, SEO fixes, lead contract v2, conversion infrastructure, trust surfaces, and expansion pages.

### Major Implementation Pass 1 (Foundation + Lead Contract)

1. Added tracking infrastructure:
   - `lib/tracking.ts`
   - `components/tracking-scripts.tsx` (GTM, GA4 fallback, Meta Pixel, Clarity)
   - `components/tracking-client.tsx` (page view + CTA click dataLayer events)
2. Wired tracking globally in:
   - `app/layout.tsx`
3. Added explicit robots metadata in:
   - `app/layout.tsx`
4. Implemented canonical host redirect (`www` -> apex):
   - `next.config.ts` redirect rule
   - `proxy.ts` runtime fallback redirect
5. Updated homepage title from generic `Home` to keyworded title in:
   - `app/page.tsx`
6. Added AggregateRating schema support tied to env-configurable rating/count:
   - `lib/schema.ts`
7. Reworked lead intake contract and API:
   - replaced `app/api/lead/route.ts` with v2 payload contract
   - required fields: `fullName`, `email`, `leadType`, `source`, `campaign`, `sourcePath`, `submittedAt`
   - conditional required: `propertyAddress` for `home-valuation` and `seller-distress`
   - added request IDs, optional HMAC signing (`LEAD_ROUTER_SIGNING_SECRET`), anti-spam honeypot handling, and in-memory rate limit
   - added optional autoresponder webhook fanout (`LEAD_AUTORESPONDER_WEBHOOK_URL`)
8. Rebuilt shared form component to lane-aware schema:
   - replaced `components/lead-capture-form.tsx`
   - added dataLayer events: `lead_form_view`, `lead_form_submit`, `lead_form_success`, `lead_magnet_download`
   - added consent flags and lead-magnet selection support
9. Migrated motivated-seller form flow to `/api/lead`:
   - `components/motivated-seller-form.tsx`
10. Added thank-you conversion page and event tracker:
    - `app/thank-you/page.tsx`
    - `components/thank-you-tracker.tsx`
11. Added lead-magnet registry:
    - `lib/lead-magnets.ts`
12. Updated all major intake surfaces to pass lead type + magnet options:
    - `app/page.tsx`
    - `app/about/page.tsx`
    - `app/intake/page.tsx`
    - `app/network/page.tsx`
    - `app/landing/page.tsx`
    - `app/squeeze/page.tsx`
    - `app/landing/[slug]/page.tsx`
    - `app/squeeze/[slug]/page.tsx`
    - `app/guides/[topic]/page.tsx`
    - `app/brands/[slug]/page.tsx`
    - `components/route-page-template.tsx`
    - `components/global-lead-capture.tsx`
13. Added env contract updates in:
    - `.env.example`

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Implement the Sylvestri.com audit + 30-item conversion plan end-to-end, including technical changes and audit/report deliverables.

### Major Implementation Pass 2 (Verification + Deliverables)

1. Completed verification cycle after implementation:
   - `npm run lint` (warnings only)
   - `npm run build` (pass)
   - `npm run audit:sitemap`
2. Upgraded audit crawler script for deterministic local-vs-live validation:
   - `scripts/audit-sitemap.mjs`
   - added `--origin` override support
   - added non-HTML skip handling
   - added redirect tracking block to prevent false H1 negatives on auth-redirected resources
3. Expanded tracking coverage:
   - added `cta_click_start_here` tracking attributes to hero and route-template intake CTAs
   - added `cta_click_call` tracking attributes on additional call anchors in resources and motivated-seller success states
4. Closed H1 issues found on docs/article indexes:
   - `app/docs/page.tsx`
   - `app/articles/page.tsx`
5. Added canonical/robots metadata to migrated static subpage:
   - `public/monkeymaghees/index.html`
6. Produced implementation artifacts in `ops/audits/`:
   - `2026-03-26-sylvestri-full-audit-report.md`
   - `2026-03-26-sylvestri-remediation-spec.md`
   - `2026-03-26-sylvestri-30-item-action-plan.md`

### Verification Snapshot (Local)

- Build status: pass
- Redirect status: `www` host redirects to apex (`308` in local host-header test)
- API contract check:
  - missing `propertyAddress` for `home-valuation` => `400`
  - valid `home-valuation` payload => accepted (`202` when router env unset)
- Sitemap audit with local origin override:
  - no non-200 pages
  - no missing canonical/meta description/robots on audited HTML pages
  - no missing H1 on public routes
  - residual heading skip flag only on legacy static page `/monkeymaghees`

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Shell: zsh
OS: Darwin arm64
Node: v22.22.0

### Request Context

Implement the aggressive SEO-first publishing and daily content automation plan with repo-driven MDX publishing, n8n webhook contracts, and Hostinger-ready packaging.

### What Landed

1. Added repo-first ops publishing surfaces:
   - `POST /api/ops/content/publish`
   - `POST /api/ops/assets/publish-pdf`
   - shared helpers in:
     - `lib/ops-contract.ts`
     - `lib/ops-publish-utils.ts`
2. Added SEO push helpers:
   - `POST /api/seo/ping`
   - `POST /api/seo/push`
   - helper module:
     - `lib/seo-ping.ts`
3. Added a shared metadata and structured-data layer:
   - `lib/seo.ts`
   - content JSON-LD and breadcrumbs in `components/content-prose.tsx`
   - breadcrumb / FAQ JSON-LD added across dynamic guide, landing, squeeze, resource, and brand routes
4. Hardened crawl/index behavior:
   - explicit `robots.txt` disallow rules for `/login`, `/account`, `/auth/`, `/api/`
   - `X-Robots-Tag` handling in `proxy.ts`
   - `noIndex` metadata for `/login` and `/account`
   - dedicated `app/sitemap-content.xml/route.ts`
   - freshness-aware tuning in `app/sitemap.ts`
5. Replaced remaining core-route raw images with `next/image`:
   - homepage
   - about
   - story
   - brands
   - immersive stage
   - route page template
6. Fixed the broken Hostinger package command:
   - added `ops/hostinger/package-upload.sh`
   - added `ops/hostinger/README.md`
7. Added n8n rollout artifacts:
   - `ops/n8n/README.md`
   - `ops/n8n/daily-content-publisher.json`
   - `ops/n8n/daily-pdf-publisher.json`
8. Expanded env/docs contract:
   - `.env.example`
   - `README.md`
   - added:
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
     - optional helper vars for GSC and IndexNow
9. Updated all public lead forms to route through `/api/lead`, including the motivated-seller and Monkey Maghees flows.

### Verification

1. `npm run lint` passes clean.
2. `npm run build` passes clean.
3. `npm run hostinger:package` passes and creates:
   - `/Users/ryansylvestri/dev/github/https-sylvestri-com/dist/hostinger/sylvestri-hostinger-package.tgz`

### Remaining Constraints

- The new SEO push worker supports Bing sitemap pings and optional custom GSC/IndexNow helpers, but live third-party indexing still depends on env configuration outside this repo.
- The n8n templates are scaffolded and ready for import, but they still need live credential wiring and signature generation in the actual n8n instances.

---

## Thread Update

Date: 2026-03-26
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Scope: deploy follow-through, Hostinger parity hardening, and lead-routing verification

### Source Changes Added In This Pass

1. Hardened the content sitemap route for Hostinger runtime compatibility:
   - moved `next-mdx-remote/rsc` to a lazy import inside `renderContentDocument()` in `lib/content-engine.ts`
   - added resilient dynamic import + filesystem fallback in `app/sitemap-content.xml/route.ts`
   - added XML escaping and invalid-date guards in the sitemap serializer
2. Fixed packaging duplication in `ops/hostinger/package-upload.sh`:
   - no longer nests `content/content/**` inside the staging artifact when `.next/standalone` already contains `content/`
3. Reduced homepage staleness risk after deploy:
   - added `export const revalidate = 300` to `app/page.tsx`

### Verification Completed In This Pass

1. Repo/build/package checks:
   - `npm run lint`
   - `npm run build`
   - `npm run hostinger:package`
   - `npm run lint` again after packaging
2. Standalone runtime checks:
   - local standalone server returns `200` for `/sitemap-content.xml`
   - homepage now emits `Cache-Control: s-maxage=300, stale-while-revalidate=31535700`
   - staging artifact now contains only:
     - `dist/hostinger/staging/content/articles`
     - `dist/hostinger/staging/content/resources`
     - `dist/hostinger/staging/content/docs`
3. Lead-path smoke checks against the real `/api/lead` implementation with a mock router and bot-email preview transport:
   - verified payloads for:
     - shared intake form
     - home valuation form
     - motivated seller / distress form
     - newsletter signup
     - exit-intent capture
     - Monkey Maghees static form
   - verified normalized payload forwarding with deterministic `requestId`
   - verified `X-Lead-Signature` and `X-Lead-Request-Id` headers on routed submissions
   - verified notification email fanout targets `bot@sylvestri.com` when SMTP is configured

### Production Findings

1. Git push deploy path is active:
   - live origin serves new robots rules and cache-busted homepage metadata from the latest code
2. Production CDN is still serving stale homepage HTML on `/` without a cache-busting query string:
   - stale response still shows `<title>Home</title>`
   - cache-busted response shows `Hudson Valley Real Estate Broker, Systems Builder, and AI Operator`
3. Production lead routing is not configured yet:
   - live `POST https://sylvestri.com/api/lead` returned:
     - `Lead captured in the site layer. Set LEAD_ROUTER_URL or FUB_API_TOKEN to forward submissions.`
   - this confirms live leads are currently not being forwarded to Follow Up Boss
   - bot email delivery on production also cannot be confirmed until SMTP envs are configured in Hostinger
4. Production `sitemap-content.xml` was still returning `500` before this hardening patch was committed and pushed

### Operational Conclusion

- The repo now contains the code needed for:
  - resilient content sitemap generation
  - repo-first content publishing
  - lead notification fanout to `bot@sylvestri.com`
  - direct or router-based Follow Up Boss delivery
- Production still requires live environment configuration for:
  - `LEAD_ROUTER_URL` or `FUB_API_TOKEN`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`

---

## Thread Update

Date: 2026-03-28
Workspace: /Users/ryansylvestri/dev/github/https-sylvestri-com
Scope: production lead ops completion

### Source Changes Added In This Pass

1. Standardized the canonical lead contract across client and server:
   - added shared lead types and helpers in `lib/lead-contract.ts`
   - added shared client submit helper in `lib/lead-client.ts`
   - updated `app/api/lead/route.ts` to use shared contract helpers for property-address rules and source token normalization
2. Tightened every distinct lead surface onto the same payload shape:
   - `components/lead-capture-form.tsx`
   - `components/motivated-seller-form.tsx`
   - `components/newsletter-signup.tsx`
   - `components/exit-intent-capture.tsx`
   - `public/monkeymaghees/index.html`
3. Fixed the motivated-seller UX mismatch:
   - property address is now required in the UI when the inferred lead type is `home-valuation` or `seller-distress`
4. Added deterministic verification tooling:
   - `scripts/lead-smoke.mjs`
   - `npm run lead:smoke`
5. Added lead-router operational docs for n8n:
   - `ops/n8n/lead-intake-router.md`
   - updated `ops/n8n/README.md`, `README.md`, and `HANDOFF.md`

### Verification Completed In This Pass

1. Repo checks:
   - `npm run lint`
   - `npm run build`
   - `npm run lead:smoke -- --skip-build`
   - `npm run hostinger:package`
2. Lead smoke harness results:
   - router success path returned `200`
   - router failure fell back to direct Follow Up Boss delivery
   - missing required fields returned `400`
   - address-required lead types rejected missing `propertyAddress`
   - honeypot submissions returned `202` without router/FUB fanout
   - rate limit returned `429` on the seventh duplicate request
   - SMTP JSON transport generated `bot@sylvestri.com` notification previews
3. Packaging result:
   - Hostinger artifact rebuilt at:
     - `/Users/ryansylvestri/dev/github/https-sylvestri-com/dist/hostinger/sylvestri-hostinger-package.tgz`

### Live Findings

1. Production lead routing is still not configured:
   - live `POST https://sylvestri.com/api/lead` on March 28, 2026 returned:
     - `Lead captured in the site layer. Set LEAD_ROUTER_URL or FUB_API_TOKEN to forward submissions.`
   - this confirms production leads are still not reaching Follow Up Boss from the live site
   - live `bot@sylvestri.com` notification delivery also remains unconfirmed until SMTP envs are configured in Hostinger
2. Live SEO surfaces are mixed:
   - `robots.txt` is correct
   - `sitemap-content.xml` returns `200`
   - stable homepage `/` currently serves `<title>Home</title>` again
3. VPS inspection confirmed the n8n stack is online:
   - `n8n-n8n-1`
   - `n8n-runners-1`
   - no lead-router workflow was imported from this repo in this pass

### Operational Conclusion

- The repo now contains the app-side code needed for:
  - canonical lead intake through `/api/lead`
  - n8n-primary router handoff
  - direct Follow Up Boss fallback
  - app-owned SMTP notifications to `bot@sylvestri.com`
  - deterministic local smoke verification
- Production still requires external configuration and deployment work for:
  - `LEAD_ROUTER_URL`
  - `LEAD_ROUTER_TOKEN`
  - `LEAD_ROUTER_SIGNING_SECRET`
  - `FUB_API_TOKEN`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
