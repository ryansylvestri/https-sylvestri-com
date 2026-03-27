import "server-only";

import type { CloudinaryNormalizedAsset } from "@/lib/cloudinary-upload-server";

const DEFAULT_MAX_ASSET_BYTES = 100 * 1024 * 1024;

const allowedKinds = new Set<CloudinaryNormalizedAsset["kind"]>([
  "image",
  "video",
  "audio",
  "document",
  "spreadsheet",
  "slides",
  "graphic",
  "raw",
]);

export function getAssetMaxBytes() {
  const parsed = Number(process.env.ASSET_MAX_BYTES ?? DEFAULT_MAX_ASSET_BYTES);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_MAX_ASSET_BYTES;
  return Math.trunc(parsed);
}

export function getAllowedAssetKinds() {
  return [...allowedKinds];
}

export function validateAssetPolicy(asset: CloudinaryNormalizedAsset) {
  if (!allowedKinds.has(asset.kind)) {
    return {
      ok: false as const,
      error: `Asset kind "${asset.kind}" is not allowlisted in v1.`,
    };
  }

  const maxBytes = getAssetMaxBytes();
  if (asset.bytes > maxBytes) {
    return {
      ok: false as const,
      error: `Asset size ${asset.bytes} exceeds v1 limit ${maxBytes}.`,
    };
  }

  return { ok: true as const };
}
