#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DIST_DIR="$ROOT_DIR/dist/hostinger"
STAGING_DIR="$DIST_DIR/staging"
ARTIFACT_PATH="$DIST_DIR/sylvestri-hostinger-package.tgz"

cd "$ROOT_DIR"

if [[ -n "${NVM_DIR:-}" && -s "${NVM_DIR}/nvm.sh" ]]; then
  # Respect the repo's `.nvmrc` when the caller has NVM available.
  # shellcheck disable=SC1090
  . "${NVM_DIR}/nvm.sh"
  nvm use >/dev/null
fi

rm -rf "$STAGING_DIR"
rm -f "$ARTIFACT_PATH"

if [[ "${SKIP_VERIFY:-0}" != "1" ]]; then
  npm run hostinger:verify
fi

if [[ ! -d ".next/standalone" ]]; then
  echo "Missing .next/standalone. Run npm run build first."
  exit 1
fi

mkdir -p "$STAGING_DIR/.next"

cp -R .next/standalone/. "$STAGING_DIR/"
cp -R .next/static "$STAGING_DIR/.next/static"

if [[ -d "public" ]]; then
  cp -R public "$STAGING_DIR/public"
fi

if [[ -d "content" && ! -d "$STAGING_DIR/content" ]]; then
  cp -R content "$STAGING_DIR/content"
fi

cp package.json "$STAGING_DIR/package.json"

mkdir -p "$DIST_DIR"
tar -czf "$ARTIFACT_PATH" -C "$STAGING_DIR" .

echo "Created Hostinger package:"
echo "$ARTIFACT_PATH"
