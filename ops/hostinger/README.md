# Hostinger Packaging

`npm run hostinger:package` builds a deployment tarball from the Next standalone output.

## Behavior

- Runs `npm run hostinger:verify` unless `SKIP_VERIFY=1`
- Copies `.next/standalone`, `.next/static`, `public/`, and `content/`
- Writes the artifact to `dist/hostinger/sylvestri-hostinger-package.tgz`

## Deterministic usage

```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm ci
npm run hostinger:package
```

## Live Lead Activation

- Post-deploy live verification runbook:
  - `ops/hostinger/live-lead-activation.md`
- Synthetic submission harness:
  - `npm run lead:verify:live -- --base-url https://sylvestri.com`
