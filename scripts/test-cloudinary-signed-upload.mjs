#!/usr/bin/env node

import { basename, extname } from "node:path";
import { readFile } from "node:fs/promises";

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];
    if (!current.startsWith("--")) continue;

    const key = current.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
      continue;
    }

    args[key] = next;
    i += 1;
  }

  return args;
}

function inferMimeType(filePath, resourceType) {
  const ext = extname(filePath).toLowerCase();
  if (resourceType === "raw") {
    if (ext === ".pdf") return "application/pdf";
    if (ext === ".doc") return "application/msword";
    if (ext === ".docx") {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    if (ext === ".xls") return "application/vnd.ms-excel";
    if (ext === ".xlsx") {
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    if (ext === ".ppt") return "application/vnd.ms-powerpoint";
    if (ext === ".pptx") {
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    }
    if (ext === ".csv") return "text/csv";
    return "application/octet-stream";
  }

  if (resourceType === "video" || resourceType === "audio") {
    if (ext === ".mp4") return "video/mp4";
    if (ext === ".mov") return "video/quicktime";
    if (ext === ".mp3") return "audio/mpeg";
    if (ext === ".wav") return "audio/wav";
    if (ext === ".m4a") return "audio/mp4";
    return "application/octet-stream";
  }

  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

async function run() {
  const args = parseArgs(process.argv.slice(2));

  const baseUrl = (args["base-url"] || "http://127.0.0.1:3000").replace(/\/+$/, "");
  const adminToken = args["admin-token"] || process.env.UPLOAD_ADMIN_TOKEN;
  const resourceType = (args["resource-type"] || "image").toLowerCase();
  const filePath = args.file;

  if (!adminToken) {
    fail("Missing upload admin token. Provide --admin-token or set UPLOAD_ADMIN_TOKEN.");
  }

  if (!filePath) {
    fail("Missing --file argument.");
  }

  const signBody = {
    resource_type: resourceType,
    ...(args.folder ? { folder: args.folder } : {}),
    ...(args["public-id"] ? { public_id: args["public-id"] } : {}),
    ...(args.tags ? { tags: args.tags } : {}),
    ...(args.context ? { context: args.context } : {}),
  };

  const signResponse = await fetch(`${baseUrl}/api/cloudinary/sign`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-upload-admin-token": adminToken,
    },
    body: JSON.stringify(signBody),
  });

  if (!signResponse.ok) {
    const details = await signResponse.text();
    fail(`/api/cloudinary/sign failed (${signResponse.status}): ${details}`);
  }

  const signResult = await signResponse.json();

  const fileBuffer = await readFile(filePath);
  const fileBlob = new Blob([fileBuffer], {
    type: inferMimeType(filePath, resourceType),
  });

  const formData = new FormData();
  formData.append("file", fileBlob, basename(filePath));
  formData.append("api_key", signResult.apiKey);
  formData.append("timestamp", String(signResult.timestamp));
  formData.append("signature", signResult.signature);
  if (signResult.folder) formData.append("folder", signResult.folder);
  if (signResult.publicId) formData.append("public_id", signResult.publicId);
  if (signResult.tags) formData.append("tags", signResult.tags);
  if (signResult.context) formData.append("context", signResult.context);

  const uploadResponse = await fetch(signResult.uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    const details = await uploadResponse.text();
    fail(`Cloudinary upload failed (${uploadResponse.status}): ${details}`);
  }

  const cloudinaryResult = await uploadResponse.json();

  const completeResponse = await fetch(`${baseUrl}/api/cloudinary/upload-complete`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-upload-admin-token": adminToken,
    },
    body: JSON.stringify(cloudinaryResult),
  });

  if (!completeResponse.ok) {
    const details = await completeResponse.text();
    fail(`/api/cloudinary/upload-complete failed (${completeResponse.status}): ${details}`);
  }

  const completeResult = await completeResponse.json();
  console.log(JSON.stringify(completeResult, null, 2));
}

run().catch((error) => {
  fail(error instanceof Error ? error.message : "Unknown upload test error.");
});
