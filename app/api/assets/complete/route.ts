import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { enqueueAssetProcessingJob } from "@/lib/asset-queue";
import { validateAssetPolicy } from "@/lib/asset-policy";
import { normalizeCloudinaryUploadCompletePayload } from "@/lib/cloudinary-upload-server";
import { getCurrentViewer } from "@/lib/supabase";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  const viewer = await getCurrentViewer();
  if (!viewer || viewer.tier !== "pro") {
    return NextResponse.json({ message: "Asset completion requires authenticated access." }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const normalized = normalizeCloudinaryUploadCompletePayload(payload);
  if (!normalized.ok) {
    return NextResponse.json({ message: normalized.error }, { status: 400 });
  }

  const policyCheck = validateAssetPolicy(normalized.value);
  if (!policyCheck.ok) {
    return NextResponse.json({ message: policyCheck.error }, { status: 400 });
  }

  const client = getServiceClient();
  if (!client) {
    console.info("[assets.complete] accepted without Supabase", normalized.value);
    return NextResponse.json({ message: "Asset metadata accepted locally.", asset: normalized.value }, { status: 202 });
  }

  const { data: assetRow, error: assetError } = await client.from("assets").upsert({
    public_id: normalized.value.publicId,
    secure_url: normalized.value.secureUrl,
    kind: normalized.value.kind,
    status: "processing",
    storage_provider: "cloudinary",
    preview_url: null,
    downloadable: true,
    access: "public",
    bytes: normalized.value.bytes,
    format: normalized.value.format,
    width: normalized.value.width,
    height: normalized.value.height,
    duration: normalized.value.duration,
    pages: normalized.value.pages,
    original_filename: normalized.value.originalFilename,
    context: normalized.value.context,
    tags: normalized.value.tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }, {
    onConflict: "public_id",
  }).select("id");

  if (assetError || !assetRow || assetRow.length === 0) {
    return NextResponse.json({ message: assetError?.message || "Could not upsert asset metadata." }, { status: 500 });
  }

  const assetId = Number(assetRow[0].id);

  try {
    const queued = await enqueueAssetProcessingJob({
      assetId,
      publicId: normalized.value.publicId,
      secureUrl: normalized.value.secureUrl,
    });

    await client.from("asset_jobs").insert({
      asset_id: assetId,
      queue_job_id: queued.queued ? String(queued.jobId) : null,
      status: queued.queued ? "queued" : "skipped",
      attempts: 0,
      error_message: queued.queued ? null : queued.reason,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (!queued.queued) {
      await client.from("assets").update({
        status: "ready",
        preview_url: normalized.value.secureUrl,
        updated_at: new Date().toISOString(),
      }).eq("id", assetId);
    }

    return NextResponse.json({
      message: queued.queued
        ? "Asset metadata recorded and queued for processing."
        : "Asset metadata recorded. Queue unavailable; asset marked ready without worker processing.",
      assetId,
      queued,
    }, { status: queued.queued ? 202 : 200 });
  } catch (error) {
    await client.from("asset_jobs").insert({
      asset_id: assetId,
      queue_job_id: null,
      status: "queue_failed",
      attempts: 0,
      error_message: error instanceof Error ? error.message : "Unknown queue error",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    await client.from("assets").update({
      status: "ready",
      preview_url: normalized.value.secureUrl,
      updated_at: new Date().toISOString(),
    }).eq("id", assetId);

    return NextResponse.json({
      message:
        "Asset metadata recorded, but queueing failed. Asset was marked ready via fallback.",
      assetId,
      queueError: error instanceof Error ? error.message : "Unknown queue error",
    }, { status: 200 });
  }
}
