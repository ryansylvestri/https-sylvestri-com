import { NextResponse } from "next/server";

import {
  normalizeCloudinaryUploadCompletePayload,
  validateUploadAdminToken,
} from "@/lib/cloudinary-upload-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authResult = validateUploadAdminToken(request);
  if (!authResult.ok) {
    const status = authResult.error.startsWith("Server configuration error") ? 500 : 401;
    return NextResponse.json({ message: authResult.error }, { status });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const normalizedPayload = normalizeCloudinaryUploadCompletePayload(payload);
  if (!normalizedPayload.ok) {
    return NextResponse.json({ message: normalizedPayload.error }, { status: 400 });
  }

  console.info("[cloudinary-upload-complete]", JSON.stringify(normalizedPayload.value));

  return NextResponse.json({
    message: "Upload payload recorded.",
    asset: normalizedPayload.value,
  });
}
