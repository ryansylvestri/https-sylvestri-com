import { NextResponse } from "next/server";

import {
  buildCloudinarySignableParams,
  createCloudinarySignature,
  getCloudinaryServerConfig,
  normalizeCloudinarySignRequest,
} from "@/lib/cloudinary-upload-server";
import { getAllowedAssetKinds, getAssetMaxBytes } from "@/lib/asset-policy";
import { getCurrentViewer } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const viewer = await getCurrentViewer();
  if (!viewer || viewer.tier !== "pro") {
    return NextResponse.json(
      { message: "Only authenticated Pro/admin upload flows are enabled for asset sessions." },
      { status: 403 },
    );
  }

  const config = getCloudinaryServerConfig();
  if (!config.ok) {
    return NextResponse.json({ message: config.error }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const normalized = normalizeCloudinarySignRequest(payload, config.value.uploadFolder);
  if (!normalized.ok) {
    return NextResponse.json({ message: normalized.error }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signedParams = buildCloudinarySignableParams(normalized.value, timestamp);

  return NextResponse.json({
    uploadUrl: `https://api.cloudinary.com/v1_1/${config.value.cloudName}/${normalized.value.resourceType}/upload`,
    signature: createCloudinarySignature(signedParams, config.value.apiSecret),
    signedParams,
    timestamp,
    apiKey: config.value.apiKey,
    assetContract: {
      kind: "raw",
      status: "processing",
      storageProvider: "cloudinary",
      previewUrl: null,
      downloadable: true,
    },
    limits: {
      maxBytes: getAssetMaxBytes(),
      allowlistedKinds: getAllowedAssetKinds(),
    },
  });
}
