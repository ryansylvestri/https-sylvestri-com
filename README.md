# sylvestri.com Site

## Purpose
- Personal-brand site for `sylvestri.com`
- Routing layer for buyers, sellers, investors, renters, relocation, and AI / systems traffic
- Home for the landing, squeeze, and resource route framework ported from the Hudson Valley real-estate stack

## Stack
- Next.js App Router
- Tailwind CSS v4
- Three.js for immersive hero visuals
- MDX content engine via `gray-matter` + `next-mdx-remote`
- Supabase-ready auth and metadata coordination
- Cloudinary-ready media helpers
- n8n workflow artifacts for lead capture into Follow Up Boss

## Local Run

```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm ci
npm run dev
```

## Hostinger
- Managed Node app deploy runbook:
  - `ops/hostinger/README.md`
- ZIP packaging command:
  - `npm run hostinger:package`

## Environment
- Copy `.env.example` to your runtime env file and fill in:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_GTM_ID`
  - `NEXT_PUBLIC_GA4_ID`
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `NEXT_PUBLIC_CLARITY_ID`
  - optional `KPI_*_URL` dashboard links for `/kpi`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `NEXT_PUBLIC_CLOUDINARY_FOLDER`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_UPLOAD_FOLDER`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRO_MONTHLY_PRICE_ID`
  - `STRIPE_PRO_ANNUAL_PRICE_ID`
  - `FEATURE_PAID`
  - `REDIS_URL`
  - `ASSET_MAX_BYTES`
  - `ASSET_WORKER_CONCURRENCY`
  - `UPLOAD_ADMIN_TOKEN`
  - `HOSTINGER_N8N_WEBHOOK_TOKEN`
  - `N8N_SIGNATURE_SECRET`
  - `N8N_SOURCE_ID`
  - `GSC_PING_TOKEN`
  - `GSC_PING_ENDPOINT`
  - `INDEXNOW_KEY`
  - `INDEXNOW_HOST`
  - `INDEXNOW_KEY_LOCATION`
  - `LEAD_ROUTER_URL`
  - `LEAD_ROUTER_TOKEN`
  - `LEAD_ROUTER_SIGNING_SECRET`
  - `LEAD_AUTORESPONDER_WEBHOOK_URL`
  - `LEAD_NOTIFICATION_EMAILS`
  - `LEAD_NOTIFICATION_FROM`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `FUB_API_BASE_URL`
  - `FUB_API_TOKEN`

## Important Paths
- `app/`
  - website routes
- `content/`
  - MDX docs, articles, and migrated resources
- `components/lead-capture-form.tsx`
  - shared lead intake form
- `app/api/lead/route.ts`
  - canonical lead intake, router handoff, direct FUB fallback, and bot notification fanout
- `lib/content-engine.ts`
  - shared MDX loader, schema validation, and search index source
- `supabase/migrations/`
  - SQL scaffolding for waitlist, stripe events, and assets
- `components/immersive-stage.tsx`
  - Three.js-driven immersive stage
- `lib/site-content.ts`
  - site-wide content and domain registry
- `lib/cloudinary.ts`
  - Cloudinary URL helper
- `ops/n8n/`
  - daily content templates plus the lead-intake router runbook
- `ops/analytics/`
  - GTM event mapping and verification checklist
- `ops/hostinger/`
  - packaging script and deploy notes
- `ops/runbooks/`
  - tracked operational runbooks moved out of loose root planning files
- `ops/state/`
  - idempotency state for content and PDF publish operations
- `scripts/lead-smoke.mjs`
  - deterministic local smoke harness for `/api/lead`, router failover, and SMTP preview
- `scripts/verify-live-lead.mjs`
  - synthetic live submission harness for post-deploy verification

## Cloudinary Signed Upload API
- Endpoints:
  - `POST /api/cloudinary/sign`
  - `POST /api/cloudinary/upload-complete`
- Security:
  - requests must include `x-upload-admin-token` matching `UPLOAD_ADMIN_TOKEN`
- Supported upload request params (`/api/cloudinary/sign`):
  - `resource_type` (`image`, `video`, `audio`, `raw`, `auto`)
  - `folder`, `public_id`, `tags`, `context`

## Docs and Gated Content
- New route surfaces:
  - `/docs`
  - `/docs/[...slug]`
  - `/articles`
  - `/articles/[slug]`
  - `/login`
  - `/account`
  - `/podcast/feed.xml`
- New API surfaces:
  - `POST /api/waitlist/pro`
  - `POST /api/stripe/webhook`
  - `POST /api/assets/upload-url`
  - `POST /api/assets/complete`
  - `GET /api/assets/:id/access-url`
  - `POST /api/ops/content/publish`
  - `POST /api/ops/assets/publish-pdf`
  - `POST /api/seo/ping`
  - `POST /api/seo/push`
- Local scaffolding:
  - `npm run plans:scaffold`
  - `npm run assets:worker`
  - `npm run hostinger:package`

## Daily Publishing Contract
- One `n8n` instance per source/blog
- Run `dryRun=true` against `POST /api/ops/content/publish` before live publish
- Use the auth headers documented in `ops/n8n/README.md`
- Publish PDFs back into the matching MDX document through `POST /api/ops/assets/publish-pdf`
- Trigger search refresh through `POST /api/seo/push` after deploy

## Lead Intake Contract
- Browser forms post only to `POST /api/lead`
- Primary delivery path:
  - app -> `LEAD_ROUTER_URL` -> n8n router -> Follow Up Boss
- App fallback path:
  - direct Follow Up Boss delivery through `FUB_API_TOKEN`
- Operator email path:
  - app-owned SMTP notification to `bot@sylvestri.com`
- Deterministic local verification:

```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm ci
npm run lead:smoke
```

### Deterministic Live Verification
```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm run lead:verify:live -- --base-url https://sylvestri.com
```

### Deterministic Local Upload Test
```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm run dev
```

In another shell:

```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
UPLOAD_ADMIN_TOKEN="your-upload-token" npm run cloudinary:test-upload -- \
  --base-url http://127.0.0.1:3000 \
  --admin-token "your-upload-token" \
  --resource-type image \
  --file /absolute/path/to/test-image.jpg
```
