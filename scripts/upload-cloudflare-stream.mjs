import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const apiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN?.trim();
const inputPath = path.resolve(process.argv[2] || "videos/video-1.mp4");

if (!accountId || !apiToken) {
  console.error(
    "Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_STREAM_API_TOKEN before running this command.",
  );
  process.exit(1);
}

const inputStat = await stat(inputPath).catch(() => null);
if (!inputStat?.isFile()) {
  console.error(`Video file not found: ${inputPath}`);
  process.exit(1);
}

const extension = path.extname(inputPath).toLowerCase();
const contentType =
  extension === ".mov"
    ? "video/quicktime"
    : extension === ".webm"
      ? "video/webm"
      : "video/mp4";
const bytes = await readFile(inputPath);
const form = new FormData();
form.append("file", new File([bytes], path.basename(inputPath), { type: contentType }));

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/stream`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${apiToken}` },
    body: form,
  },
);
const payload = await response.json().catch(() => null);

if (!response.ok || !payload?.success || !payload.result?.uid) {
  const message = payload?.errors?.[0]?.message || `HTTP ${response.status}`;
  console.error(`Cloudflare Stream upload failed: ${message}`);
  process.exit(1);
}

const result = payload.result;
const customerHost = (() => {
  const candidate = result.preview || result.thumbnail || result.playback?.hls;
  if (!candidate) return null;
  try {
    return new URL(candidate).hostname;
  } catch {
    return null;
  }
})();
const customerCode = customerHost?.match(/^customer-([^.]+)\.cloudflarestream\.com$/)?.[1] || null;

console.log(
  JSON.stringify(
    {
      file: inputPath,
      sizeBytes: inputStat.size,
      videoId: result.uid,
      customerCode,
      readyToStream: Boolean(result.readyToStream),
      status: result.status?.state || "processing",
    },
    null,
    2,
  ),
);
