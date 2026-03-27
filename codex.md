# Codex Notes — https-sylvestri-com

Repo path: `/Users/ryansylvestri/dev/github/https-sylvestri-com`

## Runtime baseline
- Node: `22.x` via `nvm`
- Package manager: `npm`

Bootstrap:
```bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
```

## Current Cloudinary state
- Delivery helper:
  - `lib/cloudinary.ts`
- Signed upload API layer:
  - `app/api/cloudinary/sign/route.ts`
  - `app/api/cloudinary/upload-complete/route.ts`
  - `lib/cloudinary-upload-server.ts`
  - `scripts/test-cloudinary-signed-upload.mjs`
- Server env vars:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `CLOUDINARY_UPLOAD_FOLDER`
  - `UPLOAD_ADMIN_TOKEN`

## Current docs platform state
- Shared content engine:
  - `lib/content-engine.ts`
- Access/auth helpers:
  - `lib/content-access.ts`
  - `lib/supabase.ts`
  - `lib/stripe.ts`
- Content roots:
  - `content/docs`
  - `content/resources`
  - `content/articles`
- New route surfaces:
  - `/docs`
  - `/articles`
  - `/login`
  - `/account`
- New APIs:
  - `POST /api/waitlist/pro`
  - `POST /api/stripe/webhook`
  - `POST /api/assets/upload-url`
  - `POST /api/assets/complete`
  - `GET /api/assets/[id]/access-url`

## Current media worker state
- Queue helper:
  - `lib/asset-queue.ts`
- Asset policy helper:
  - `lib/asset-policy.ts`
- Worker runtime:
  - `scripts/asset-worker.mjs`
  - `npm run assets:worker`
- Podcast feed:
  - `app/podcast/feed.xml/route.ts`
- Worker env vars:
  - `REDIS_URL`
  - `ASSET_MAX_BYTES`
  - `ASSET_WORKER_CONCURRENCY`

## Documentation governance
- Keep updated after each major milestone:
  - `documentation.md`
  - `handoff.md`
  - `README.md`
  - `codex.md`
