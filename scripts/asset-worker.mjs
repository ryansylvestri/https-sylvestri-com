#!/usr/bin/env node

import { Worker } from "bullmq";
import IORedis from "ioredis";
import { createClient } from "@supabase/supabase-js";

const QUEUE_NAME = "asset-processing";

const redisUrl = process.env.REDIS_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const concurrency = Number(process.env.ASSET_WORKER_CONCURRENCY || "4");

if (!redisUrl || !supabaseUrl || !serviceRoleKey) {
  console.error(
    "[asset-worker] Missing required env vars. Needed: REDIS_URL, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

function nowIso() {
  return new Date().toISOString();
}

async function upsertJobState({
  assetId,
  queueJobId,
  status,
  attempts,
  errorMessage,
  startedAt,
  completedAt,
}) {
  const payload = {
    asset_id: assetId,
    queue_job_id: queueJobId,
    status,
    attempts,
    error_message: errorMessage ?? null,
    started_at: startedAt ?? null,
    completed_at: completedAt ?? null,
    updated_at: nowIso(),
  };

  await supabase.from("asset_jobs").upsert(payload, {
    onConflict: "queue_job_id",
  });
}

function inferPreviewFromKind(asset) {
  if (asset.kind === "document" || asset.kind === "spreadsheet" || asset.kind === "slides") {
    return asset.secure_url;
  }

  if (asset.kind === "image" || asset.kind === "video" || asset.kind === "audio") {
    return asset.secure_url;
  }

  return null;
}

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    const assetId = Number(job.data.assetId);
    const queueJobId = String(job.id);
    const startedAt = nowIso();

    await upsertJobState({
      assetId,
      queueJobId,
      status: "processing",
      attempts: job.attemptsMade,
      startedAt,
    });

    await supabase
      .from("assets")
      .update({ status: "processing", updated_at: nowIso() })
      .eq("id", assetId);

    const { data: asset, error: assetError } = await supabase
      .from("assets")
      .select("id, secure_url, kind, format")
      .eq("id", assetId)
      .maybeSingle();

    if (assetError || !asset) {
      throw new Error(assetError?.message || `Asset ${assetId} not found.`);
    }

    const probe = await fetch(asset.secure_url, { method: "HEAD" });
    if (!probe.ok) {
      throw new Error(`HEAD probe failed for ${asset.secure_url} with status ${probe.status}.`);
    }

    const previewUrl = inferPreviewFromKind(asset);
    await supabase
      .from("assets")
      .update({
        status: "ready",
        preview_url: previewUrl,
        updated_at: nowIso(),
      })
      .eq("id", assetId);

    await upsertJobState({
      assetId,
      queueJobId,
      status: "completed",
      attempts: job.attemptsMade,
      startedAt,
      completedAt: nowIso(),
    });
  },
  { connection, concurrency: Number.isFinite(concurrency) ? Math.max(1, Math.trunc(concurrency)) : 4 },
);

worker.on("ready", () => {
  console.info(`[asset-worker] listening on queue "${QUEUE_NAME}"`);
});

worker.on("failed", async (job, error) => {
  if (!job) return;
  const assetId = Number(job.data.assetId);
  const queueJobId = String(job.id);
  const errorMessage = error instanceof Error ? error.message : String(error);

  await upsertJobState({
    assetId,
    queueJobId,
    status: "failed",
    attempts: job.attemptsMade,
    errorMessage,
    completedAt: nowIso(),
  });

  await supabase
    .from("assets")
    .update({ status: "failed", updated_at: nowIso() })
    .eq("id", assetId);

  console.error(`[asset-worker] failed job ${queueJobId}: ${errorMessage}`);
});

worker.on("error", (error) => {
  console.error("[asset-worker] worker error", error);
});

async function shutdown(signal) {
  console.info(`[asset-worker] received ${signal}, shutting down...`);
  await worker.close();
  await connection.quit();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
