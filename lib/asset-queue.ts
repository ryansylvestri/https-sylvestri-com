import "server-only";

import { Queue } from "bullmq";
import IORedis from "ioredis";

export const ASSET_QUEUE_NAME = "asset-processing";

export type AssetProcessJobPayload = {
  assetId: number;
  publicId: string;
  secureUrl: string;
};

type QueueBundle = {
  connection: IORedis;
  queue: Queue<AssetProcessJobPayload>;
};

declare global {
  var __assetQueueBundle: QueueBundle | undefined;
}

function getRedisUrl() {
  return process.env.REDIS_URL?.trim() || "";
}

export function isAssetQueueConfigured() {
  return Boolean(getRedisUrl());
}

function getQueueBundle(): QueueBundle | null {
  const redisUrl = getRedisUrl();
  if (!redisUrl) return null;

  if (!global.__assetQueueBundle) {
    const connection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    });

    const queue = new Queue<AssetProcessJobPayload>(ASSET_QUEUE_NAME, { connection });
    global.__assetQueueBundle = { connection, queue };
  }

  return global.__assetQueueBundle;
}

export async function enqueueAssetProcessingJob(payload: AssetProcessJobPayload) {
  const bundle = getQueueBundle();
  if (!bundle) {
    return { queued: false as const, reason: "REDIS_URL is not configured." };
  }

  const job = await bundle.queue.add("process-asset", payload, {
    attempts: 3,
    backoff: { type: "exponential", delay: 3000 },
    removeOnComplete: 1000,
    removeOnFail: 500,
  });

  return { queued: true as const, jobId: job.id };
}
