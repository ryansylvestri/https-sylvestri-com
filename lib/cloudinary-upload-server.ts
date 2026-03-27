import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

const SAFE_SEGMENT = /^[a-zA-Z0-9_-]+$/;
const SAFE_TAG = /^[a-zA-Z0-9_-]{1,64}$/;
const SAFE_CONTEXT_KEY = /^[a-zA-Z0-9_-]{1,64}$/;

const AUDIO_FORMATS = new Set([
  "aac",
  "aiff",
  "flac",
  "m4a",
  "mp3",
  "oga",
  "ogg",
  "opus",
  "wav",
  "wma",
]);

const DOCUMENT_FORMATS = new Set([
  "doc",
  "docx",
  "md",
  "odt",
  "pages",
  "pdf",
  "rtf",
  "txt",
]);

const SPREADSHEET_FORMATS = new Set([
  "csv",
  "ods",
  "tsv",
  "xls",
  "xlsx",
]);

const SLIDE_FORMATS = new Set([
  "key",
  "odp",
  "ppt",
  "pptx",
]);

const GRAPHIC_FORMATS = new Set([
  "ai",
  "eps",
  "psd",
  "svg",
]);

const ARCHIVE_FORMATS = new Set([
  "7z",
  "bz2",
  "gz",
  "rar",
  "tar",
  "zip",
]);

type CloudinaryResourceType = "image" | "video" | "raw" | "auto";

type CloudinarySignRequest = {
  resourceType: CloudinaryResourceType;
  folder: string;
  publicId?: string;
  tags?: string;
  context?: string;
};

export type CloudinaryNormalizedAsset = {
  assetId: string | null;
  publicId: string;
  secureUrl: string;
  bytes: number;
  format: string;
  resourceType: string;
  kind:
    | "image"
    | "video"
    | "audio"
    | "document"
    | "spreadsheet"
    | "slides"
    | "graphic"
    | "archive"
    | "raw";
  duration: number | null;
  pages: number | null;
  width: number | null;
  height: number | null;
  originalFilename: string | null;
  version: number | null;
  tags: string[];
  context: Record<string, string>;
  createdAt: string | null;
  recordedAt: string;
};

type OkResult<T> = { ok: true; value: T };
type ErrorResult = { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePathLike(value: string): string | null {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return null;
  if (trimmed.includes("..")) return null;

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  if (!segments.every((segment) => SAFE_SEGMENT.test(segment))) return null;

  return segments.join("/");
}

function normalizeResourceType(value: unknown): CloudinaryResourceType | null {
  if (value === undefined || value === null || value === "") return "image";
  const lower = String(value).trim().toLowerCase();

  if (lower === "audio") return "video";
  if (lower === "image" || lower === "video" || lower === "raw" || lower === "auto") {
    return lower;
  }

  return null;
}

function normalizeTags(value: unknown): OkResult<string | undefined> | ErrorResult {
  if (value === undefined || value === null || value === "") {
    return { ok: true, value: undefined };
  }

  const sourceTags = Array.isArray(value)
    ? value.map((item) => String(item))
    : String(value).split(",");

  const cleaned = sourceTags
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  if (cleaned.length === 0) {
    return { ok: true, value: undefined };
  }

  if (cleaned.length > 20) {
    return { ok: false, error: "tags supports a maximum of 20 values." };
  }

  if (!cleaned.every((tag) => SAFE_TAG.test(tag))) {
    return {
      ok: false,
      error: "tags must contain only letters, numbers, underscores, and dashes.",
    };
  }

  return { ok: true, value: cleaned.join(",") };
}

function normalizeContext(value: unknown): OkResult<string | undefined> | ErrorResult {
  if (value === undefined || value === null || value === "") {
    return { ok: true, value: undefined };
  }

  const entries: Array<[string, string]> = [];

  if (typeof value === "string") {
    const pairs = value.split("|").map((item) => item.trim()).filter(Boolean);
    for (const pair of pairs) {
      const separatorIndex = pair.indexOf("=");
      if (separatorIndex <= 0) {
        return { ok: false, error: "context string must use key=value pairs." };
      }
      const key = pair.slice(0, separatorIndex).trim();
      const rawValue = pair.slice(separatorIndex + 1).trim();
      if (!SAFE_CONTEXT_KEY.test(key)) {
        return { ok: false, error: `context key "${key}" is invalid.` };
      }
      if (!rawValue || rawValue.includes("|")) {
        return { ok: false, error: `context value for "${key}" is invalid.` };
      }
      entries.push([key, rawValue.replace(/=/g, "-")]);
    }
  } else if (isRecord(value)) {
    for (const [rawKey, rawValue] of Object.entries(value)) {
      const key = rawKey.trim();
      if (!SAFE_CONTEXT_KEY.test(key)) {
        return { ok: false, error: `context key "${key}" is invalid.` };
      }
      const normalizedValue = String(rawValue ?? "").trim();
      if (!normalizedValue || normalizedValue.includes("|")) {
        return { ok: false, error: `context value for "${key}" is invalid.` };
      }
      entries.push([key, normalizedValue.replace(/=/g, "-")]);
    }
  } else {
    return { ok: false, error: "context must be an object or key=value string." };
  }

  if (entries.length === 0) {
    return { ok: true, value: undefined };
  }

  if (entries.length > 20) {
    return { ok: false, error: "context supports a maximum of 20 key/value pairs." };
  }

  const valueString = entries
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, item]) => `${key}=${item}`)
    .join("|");

  return { ok: true, value: valueString };
}

function toInteger(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.trunc(parsed);
}

function toNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

function normalizeContextResult(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  const bucket = isRecord(value.custom) ? value.custom : value;
  const normalized: Record<string, string> = {};
  for (const [rawKey, rawValue] of Object.entries(bucket)) {
    const key = rawKey.trim();
    if (!SAFE_CONTEXT_KEY.test(key)) continue;
    const parsedValue = String(rawValue ?? "").trim();
    if (!parsedValue) continue;
    normalized[key] = parsedValue;
  }
  return normalized;
}

function deriveAssetKind(resourceType: string, format: string): CloudinaryNormalizedAsset["kind"] {
  const normalizedResourceType = resourceType.toLowerCase();
  const normalizedFormat = format.toLowerCase();

  if (normalizedResourceType === "image") return "image";
  if (normalizedResourceType === "video") {
    return AUDIO_FORMATS.has(normalizedFormat) ? "audio" : "video";
  }

  if (SLIDE_FORMATS.has(normalizedFormat)) return "slides";
  if (SPREADSHEET_FORMATS.has(normalizedFormat)) return "spreadsheet";
  if (DOCUMENT_FORMATS.has(normalizedFormat)) return "document";
  if (GRAPHIC_FORMATS.has(normalizedFormat)) return "graphic";
  if (ARCHIVE_FORMATS.has(normalizedFormat)) return "archive";
  return "raw";
}

function safeTokenEquals(expected: string, provided: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export function validateUploadAdminToken(request: Request): OkResult<true> | ErrorResult {
  const configuredToken = process.env.UPLOAD_ADMIN_TOKEN?.trim();
  if (!configuredToken) {
    return {
      ok: false,
      error: "Server configuration error: UPLOAD_ADMIN_TOKEN is not set.",
    };
  }

  const requestToken = request.headers.get("x-upload-admin-token")?.trim();
  if (!requestToken || !safeTokenEquals(configuredToken, requestToken)) {
    return { ok: false, error: "Unauthorized upload token." };
  }

  return { ok: true, value: true };
}

export function getCloudinaryServerConfig(): OkResult<{
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadFolder: string;
}> | ErrorResult {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const uploadFolderInput = process.env.CLOUDINARY_UPLOAD_FOLDER?.trim();

  if (!cloudName || !apiKey || !apiSecret || !uploadFolderInput) {
    return {
      ok: false,
      error:
        "Missing Cloudinary server env vars. Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_FOLDER.",
    };
  }

  const normalizedFolder = normalizePathLike(uploadFolderInput);
  if (!normalizedFolder) {
    return {
      ok: false,
      error: "CLOUDINARY_UPLOAD_FOLDER is invalid. Use slash-delimited safe path segments.",
    };
  }

  return {
    ok: true,
    value: {
      cloudName,
      apiKey,
      apiSecret,
      uploadFolder: normalizedFolder,
    },
  };
}

export function normalizeCloudinarySignRequest(
  payload: unknown,
  uploadFolderPrefix: string,
): OkResult<CloudinarySignRequest> | ErrorResult {
  if (!isRecord(payload)) {
    return { ok: false, error: "Expected a JSON object payload." };
  }

  const resourceType = normalizeResourceType(payload.resource_type);
  if (!resourceType) {
    return {
      ok: false,
      error: "resource_type must be one of: image, video, audio, raw, auto.",
    };
  }

  const requestedFolderRaw =
    payload.folder === undefined || payload.folder === null ? "" : String(payload.folder);
  const requestedFolder = requestedFolderRaw.trim()
    ? normalizePathLike(requestedFolderRaw)
    : uploadFolderPrefix;

  if (!requestedFolder) {
    return { ok: false, error: "folder is invalid." };
  }

  if (
    requestedFolder !== uploadFolderPrefix &&
    !requestedFolder.startsWith(`${uploadFolderPrefix}/`)
  ) {
    return {
      ok: false,
      error: `folder must remain inside configured prefix "${uploadFolderPrefix}".`,
    };
  }

  const publicIdRaw =
    payload.public_id === undefined || payload.public_id === null
      ? ""
      : String(payload.public_id);
  const normalizedPublicId = publicIdRaw.trim() ? normalizePathLike(publicIdRaw) : null;
  const publicId = normalizedPublicId ?? undefined;
  if (publicIdRaw.trim() && !publicId) {
    return { ok: false, error: "public_id is invalid." };
  }

  const tagsResult = normalizeTags(payload.tags);
  if (!tagsResult.ok) return tagsResult;

  const contextResult = normalizeContext(payload.context);
  if (!contextResult.ok) return contextResult;

  return {
    ok: true,
    value: {
      resourceType,
      folder: requestedFolder,
      publicId,
      tags: tagsResult.value,
      context: contextResult.value,
    },
  };
}

export function buildCloudinarySignableParams(
  request: CloudinarySignRequest,
  timestamp: number,
): Record<string, string | number> {
  return {
    ...(request.context ? { context: request.context } : {}),
    ...(request.folder ? { folder: request.folder } : {}),
    ...(request.publicId ? { public_id: request.publicId } : {}),
    ...(request.tags ? { tags: request.tags } : {}),
    timestamp,
  };
}

export function createCloudinarySignature(
  params: Record<string, string | number>,
  apiSecret: string,
): string {
  const toSign = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}

export function normalizeCloudinaryUploadCompletePayload(
  payload: unknown,
): OkResult<CloudinaryNormalizedAsset> | ErrorResult {
  if (!isRecord(payload)) {
    return { ok: false, error: "Expected a JSON object payload." };
  }

  const publicId = String(payload.public_id ?? "").trim();
  const secureUrl = String(payload.secure_url ?? "").trim();
  const resourceType = String(payload.resource_type ?? "").trim().toLowerCase();
  const format = String(payload.format ?? "").trim().toLowerCase();
  const bytes = toInteger(payload.bytes);

  if (!publicId) {
    return { ok: false, error: "public_id is required." };
  }

  if (!secureUrl) {
    return { ok: false, error: "secure_url is required." };
  }

  try {
    new URL(secureUrl);
  } catch {
    return { ok: false, error: "secure_url must be a valid URL." };
  }

  if (!resourceType || !["image", "video", "raw"].includes(resourceType)) {
    return {
      ok: false,
      error: "resource_type is required and must be one of image, video, raw.",
    };
  }

  if (!format) {
    return { ok: false, error: "format is required." };
  }

  if (bytes === null) {
    return { ok: false, error: "bytes is required and must be a non-negative number." };
  }

  const tags = Array.isArray(payload.tags)
    ? payload.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

  const normalized: CloudinaryNormalizedAsset = {
    assetId: payload.asset_id ? String(payload.asset_id) : null,
    publicId,
    secureUrl,
    bytes,
    format,
    resourceType,
    kind: deriveAssetKind(resourceType, format),
    duration: toNumber(payload.duration),
    pages: toInteger(payload.pages),
    width: toInteger(payload.width),
    height: toInteger(payload.height),
    originalFilename: payload.original_filename
      ? String(payload.original_filename)
      : null,
    version: toInteger(payload.version),
    tags,
    context: normalizeContextResult(payload.context),
    createdAt: payload.created_at ? String(payload.created_at) : null,
    recordedAt: new Date().toISOString(),
  };

  return { ok: true, value: normalized };
}
