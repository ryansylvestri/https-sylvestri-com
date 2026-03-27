import { NextResponse } from "next/server";

import {
  buildCloudinarySignableParams,
  createCloudinarySignature,
  getCloudinaryServerConfig,
  normalizeCloudinarySignRequest,
  validateUploadAdminToken,
} from "@/lib/cloudinary-upload-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authResult = validateUploadAdminToken(request);
  if (!authResult.ok) {
    const status = authResult.error.startsWith("Server configuration error") ? 500 : 401;
    return NextResponse.json({ message: authResult.error }, { status });
  }

  const configResult = getCloudinaryServerConfig();
  if (!configResult.ok) {
    return NextResponse.json({ message: configResult.error }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const normalizedRequest = normalizeCloudinarySignRequest(
    payload,
    configResult.value.uploadFolder,
  );

  if (!normalizedRequest.ok) {
    return NextResponse.json({ message: normalizedRequest.error }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signableParams = buildCloudinarySignableParams(normalizedRequest.value, timestamp);
  const signature = createCloudinarySignature(signableParams, configResult.value.apiSecret);

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: configResult.value.apiKey,
    cloudName: configResult.value.cloudName,
    folder: normalizedRequest.value.folder,
    resourceType: normalizedRequest.value.resourceType,
    publicId: normalizedRequest.value.publicId ?? null,
    tags: normalizedRequest.value.tags ?? null,
    context: normalizedRequest.value.context ?? null,
    uploadUrl: `https://api.cloudinary.com/v1_1/${configResult.value.cloudName}/${normalizedRequest.value.resourceType}/upload`,
    signedParams: signableParams,
  });
}
