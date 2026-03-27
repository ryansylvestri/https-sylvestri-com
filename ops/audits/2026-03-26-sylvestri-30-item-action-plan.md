# Sylvestri.com 30-Item Conversion Action Plan

Date: March 26, 2026  
Legend: `Done (Local)`, `Partial`, `Pending`  
Effort scale: `S` (small), `M` (medium), `L` (large)

## Phase 1 — Foundation

| # | Action | Status | Effort | Validation Criteria |
|---|---|---|---|---|
| 1 | Add GTM bootstrap (env-driven) at root layout | Done (Local) | S | `NEXT_PUBLIC_GTM_ID` injects GTM scripts and dataLayer boot |
| 2 | Configure GA4 via GTM with pageview + lane attribution | Partial | M | GA4 events visible in DebugView after GTM container publish |
| 3 | Add Meta Pixel events via GTM | Partial | M | Pixel helper/network shows `PageView` + mapped custom events |
| 4 | Add Microsoft Clarity tag | Partial | S | Clarity session appears for production traffic |
| 5 | Implement `www -> apex` permanent redirect | Done (Local) | S | Host-header test returns permanent redirect to apex |
| 6 | Replace homepage title `Home` with keyworded brand title | Done (Local) | S | `<title>` on `/` is descriptive and brand-keyword aligned |
| 7 | Add explicit global robots metadata | Done (Local) | S | `<meta name="robots" content="index, follow">` present |
| 8 | Add AggregateRating schema | Done (Local) | S | JSON-LD includes `aggregateRating` with rating + count |
| 9 | Fix missing H1 on `/story`, `/brands`, `/landing`, `/squeeze` | Done (Local) | S | Sitemap audit reports no missing H1 on these routes |
| 10 | Fix heading level jumps on affected templates | Partial | M | Core templates pass heading-order checks; legacy static monkey page still flagged |

## Phase 2 — Lead Capture Infrastructure

| # | Action | Status | Effort | Validation Criteria |
|---|---|---|---|---|
| 11 | Split shared intake into lane-aware schemas | Done (Local) | M | Lead type controls helper + conditional fields |
| 12 | Require `propertyAddress` for valuation/distress lanes | Done (Local) | S | API returns 400 when missing for required lanes |
| 13 | Route `MotivatedSellerForm` through `/api/lead` | Done (Local) | M | Form posts to `/api/lead`, no parallel direct webhook |
| 14 | Extend `/api/lead` normalization/validation to v2 contract | Done (Local) | M | Required fields enforced; normalized payload generated |
| 15 | Add router auth/signature + request IDs | Done (Local) | M | `X-Lead-Request-Id`, optional signature/token on forward |
| 16 | Add anti-spam controls | Done (Local) | S | Honeypot + rate-limit behavior in API route |
| 17 | Add thank-you state/page with conversion event | Done (Local) | S | `/thank-you` loads and emits success/magnet events |
| 18 | Gate top 5 lead magnets behind capture | Partial | M | Lead magnet request flow exists; full content-lock gating for all target assets pending |
| 19 | Add auto-delivery email workflow per lead magnet | Partial | L | Autoresponder webhook hook exists; production workflow templates pending |
| 20 | Add lead-type autoresponder sequences | Partial | L | Lead-type payload support exists; sequence logic pending in n8n/email system |

## Phase 3 — Trust + Offer Depth

| # | Action | Status | Effort | Validation Criteria |
|---|---|---|---|---|
| 21 | Add testimonial component + seed 5 testimonials | Done (Local) | S | Testimonials section renders with seeded entries |
| 22 | Embed Google reviews module on high-intent pages | Done (Local) | S | Reviews panel included in home/template high-intent paths |
| 23 | Add 3 case-study pages (probate/divorce/relocation) | Done (Local) | M | Case studies index + 3 detail routes in sitemap/build |
| 24 | Add trust strip (designations, SLA, market coverage) | Done (Local) | S | Trust strip component rendered on key pages |
| 25 | Resolve duplicate-intent title collisions | Done (Local) | M | Landing/squeeze/resource templates now have distinct title suffixes |
| 26 | Add newsletter capture module | Done (Local) | S | Newsletter module posts capture into lead pipeline |

## Phase 4 — Conversion Expansion

| # | Action | Status | Effort | Validation Criteria |
|---|---|---|---|---|
| 27 | Add chat widget with route-aware context | Done (Local) | S | Chat launcher routes to intake with source context |
| 28 | Add exit-intent capture (desktop + mobile soft exit) | Done (Local) | M | Exit intent modal triggers and submits lead payload |
| 29 | Add tools: mortgage/affordability/net proceeds | Done (Local) | M | `/tools` calculators render and compute correctly |
| 30 | Stand up weekly KPI dashboard + review cadence | Partial | M | KPI page/checklist shipped; live GA4/Clarity/n8n/FUB dashboard integration pending |

## Current Priority Queue (Next 7 Days)

1. Deploy current branch to production.
2. Configure and publish GTM container with GA4/Meta/Clarity mappings.
3. Set production `LEAD_ROUTER_*` and `LEAD_AUTORESPONDER_WEBHOOK_URL` secrets.
4. Run production E2E submission tests for buyer, seller, investor, renter, AI, valuation, and distress lanes.
5. Confirm FUB attribution field persistence (`sourcePath`, `campaign`, `leadType`, `requestId`).
6. Implement magnet auto-delivery templates and autoresponder sequence content.
7. Clean legacy heading structure on `/monkeymaghees`.
