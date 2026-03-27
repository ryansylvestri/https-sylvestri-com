# Sylvestri.com Remediation Specification

Date: March 26, 2026  
Environment: `/Users/ryansylvestri/dev/github/https-sylvestri-com`

## 1) Objective

Lock sylvestri.com to a single conversion contract and instrumentation model:
- canonical host (`sylvestri.com`)
- canonical intake endpoint (`/api/lead`)
- canonical event taxonomy (`dataLayer`)
- canonical router handoff (n8n -> FUB with attribution context)

## 2) Code Surfaces

Primary implementation surfaces:
- `next.config.ts`
- `proxy.ts`
- `app/layout.tsx`
- `components/tracking-scripts.tsx`
- `components/tracking-client.tsx`
- `components/lead-capture-form.tsx`
- `components/motivated-seller-form.tsx`
- `app/api/lead/route.ts`
- `lib/tracking.ts`
- `lib/schema.ts`

## 3) Canonical Lead Contract (`POST /api/lead`)

### Required
- `fullName: string`
- `email: string`
- `leadType: string`
- `source: string`
- `campaign: string`
- `sourcePath: string`
- `submittedAt: ISO-8601 string`

### Conditional required
- `propertyAddress: string` when `leadType` in:
  - `home-valuation`
  - `seller-distress`

### Standard optional
- `phone: string`
- `timeline: string`
- `market: string`
- `notes: string`
- `leadMagnet: string`
- `consentEmail: boolean`
- `consentSms: boolean`
- `sourceToken: string`

### Server-normalized fields
- `requestId`
- `receivedAt`
- normalized lowercase email
- normalized source token when absent

## 4) Router Handoff Contract (n8n)

### Required in forwarded payload
- `requestId`
- `leadType`
- `source`
- `campaign`
- `sourcePath`
- all normalized lead fields

### Security headers
- `X-Lead-Request-Id`
- `X-Lead-Signature` (when `LEAD_ROUTER_SIGNING_SECRET` is set)
- `Authorization: Bearer <token>` (when `LEAD_ROUTER_TOKEN` is set)

### Failure behavior
- If router URL missing: intake accepted locally (202) with explicit message.
- If router call fails: API returns 502 and logs routing failure.

## 5) Anti-Spam Controls

Implemented in API route:
- honeypot trap field (`honeypot`)
- in-memory rate limit by key: `ip:email:leadType`
- window: 10 minutes
- threshold: 6 submissions

## 6) Tracking Contract (`dataLayer`)

### Required events
- `lead_form_view`
- `lead_form_submit`
- `lead_form_success`
- `lead_magnet_download`
- `cta_click_call`
- `cta_click_start_here`

### Common payload keys
- `source`
- `campaign`
- `sourcePath`
- `leadType` (where applicable)
- `leadMagnet` (where applicable)
- `label`/`href` for CTA click events

### Emission points
- form views/submits/success from lead capture components
- thank-you page success and magnet events
- delegated CTA click tracking from `data-track-event` attributes
- route page view with inferred lane attribution

## 7) Domain Canonicalization

- Next config host redirect: `www.sylvestri.com` -> `https://sylvestri.com/:path*` (permanent)
- Proxy fallback redirect for host-level safety in runtime path

## 8) Structured Data

Schema source: `lib/schema.ts`
- `@type: RealEstateAgent`
- `aggregateRating` enabled via env:
  - `NEXT_PUBLIC_GBP_RATING_VALUE`
  - `NEXT_PUBLIC_GBP_REVIEW_COUNT`

## 9) Environment Variables

### Tracking
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_CLARITY_ID`

### Lead routing
- `LEAD_ROUTER_URL`
- `LEAD_ROUTER_TOKEN`
- `LEAD_ROUTER_SIGNING_SECRET`
- `LEAD_AUTORESPONDER_WEBHOOK_URL`

### Schema
- `NEXT_PUBLIC_GBP_RATING_VALUE`
- `NEXT_PUBLIC_GBP_REVIEW_COUNT`

## 10) Validation Protocol

### Build/lint
```bash
source ~/.nvm/nvm.sh && nvm use >/dev/null
npm run lint
npm run build
```

### Sitemap QA (local)
```bash
npm run start -- --port 4010
npm run audit:sitemap -- http://localhost:4010/sitemap.xml --origin=http://localhost:4010
```

### Redirect QA
```bash
curl -I http://localhost:4010/ -H 'Host: www.sylvestri.com'
```
Expected: `308` with `location: https://sylvestri.com`

### Lead contract QA
```bash
# Should fail: missing propertyAddress for home-valuation
curl -X POST http://localhost:4010/api/lead -H 'Content-Type: application/json' -d '{...}'

# Should pass (202/200 depending router env)
curl -X POST http://localhost:4010/api/lead -H 'Content-Type: application/json' -d '{...,"propertyAddress":"123 Main St"}'
```

## 11) Deployment Gate Checklist

Do not launch paid traffic until:
- GTM container publishes and receives all required events.
- GA4 custom event mapping is verified.
- Meta and Clarity tags are live and firing.
- n8n router auth/signature checks pass.
- FUB records include `sourcePath`, `campaign`, `leadType`, and request IDs.
- thank-you redirect + event flow passes for each lane.

## 12) Residual Items

- `monkeymaghees` legacy page still has heading-level skip pattern due inherited static markup.
- This does not block core conversion/routing contract; schedule as content QA task.
