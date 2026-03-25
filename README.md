# sylvestri.com Site

## Purpose
- Personal-brand site for `sylvestri.com`
- Routing layer for buyers, sellers, investors, renters, relocation, and AI / systems traffic
- Home for the landing, squeeze, and resource route framework ported from the Hudson Valley real-estate stack

## Stack
- Next.js App Router
- Tailwind CSS v4
- Three.js for immersive hero visuals
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
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `NEXT_PUBLIC_CLOUDINARY_FOLDER`
  - `LEAD_ROUTER_URL`
  - `LEAD_ROUTER_TOKEN`
  - `FUB_API_BASE_URL`

## Important Paths
- `app/`
  - website routes
- `components/lead-capture-form.tsx`
  - shared lead intake form
- `components/immersive-stage.tsx`
  - Three.js-driven immersive stage
- `lib/site-content.ts`
  - site-wide content and domain registry
- `lib/cloudinary.ts`
  - Cloudinary URL helper
- `automation/n8n/fub-intake-router/`
  - workflow artifacts and `WORKFLOW.json`
- `automation/n8n/home-value-router/`
  - home-value webhook workflow artifacts
- `ops/hostinger/`
  - Hudson-specific deployment files
- `ops/media/cloudinary-architecture.md`
  - media strategy
