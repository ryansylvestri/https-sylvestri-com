import { NextResponse } from "next/server";

import { contentFrontmatterSchema, normalizeContentSlug } from "@/lib/content-engine";
import { validateN8nRequestAuth } from "@/lib/ops-contract";
import {
  buildDeterministicCommitMetadata,
  buildPdfRef,
  computeContentChecksum,
  computePdfChecksum,
  getContentFilePathFromSlug,
  loadMdxDocument,
  pdfPublishPayloadSchema,
  readPdfPublishState,
  resolveRequestId,
  upsertStateRecord,
  writeMdxDocument,
  writePdfPublishState,
} from "@/lib/ops-publish-utils";

export const runtime = "nodejs";

function json(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const auth = validateN8nRequestAuth(request, rawBody);
  if (!auth.ok) {
    return json({ ok: false, message: auth.message }, auth.status);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, message: "Invalid JSON payload." }, 400);
  }

  const parsed = pdfPublishPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Invalid PDF publish payload.",
        issues: parsed.error.flatten(),
      },
      400,
    );
  }

  const slug = normalizeContentSlug(parsed.data.slug);
  const filePath = getContentFilePathFromSlug(parsed.data.section, slug);

  try {
    const existing = loadMdxDocument(filePath);
    const normalizedFrontmatter = contentFrontmatterSchema.parse({
      ...existing.frontmatter,
      slug,
      section: parsed.data.section,
    });
    const checksum = parsed.data.checksum || computePdfChecksum({
      section: parsed.data.section,
      slug,
      pdfUrl: parsed.data.pdfUrl,
      filename: parsed.data.filename,
      cloudinaryPublicId: parsed.data.cloudinaryPublicId,
    });
    const requestId = resolveRequestId(parsed.data.requestId, parsed.data.idempotencyKey, checksum);
    const state = readPdfPublishState();
    const stateHit = state.byRequestId[requestId] || state.byChecksum[checksum];
    if (stateHit) {
      return json({
        ok: true,
        idempotent: true,
        requestId,
        checksum: stateHit.checksum,
        path: stateHit.path,
        cloudinaryUrl: parsed.data.pdfUrl,
      });
    }

    const assetRef = buildPdfRef({
      pdfUrl: parsed.data.pdfUrl,
      filename: parsed.data.filename,
      cloudinaryPublicId: parsed.data.cloudinaryPublicId,
    });
    const nextAssetRefs = Array.from(
      new Set([...(normalizedFrontmatter.assetRefs ?? []), assetRef]),
    ).sort((left, right) => left.localeCompare(right));
    const nextFrontmatter = {
      ...normalizedFrontmatter,
      assetRefs: nextAssetRefs,
      updatedAt: new Date().toISOString(),
      sourceBlog: parsed.data.sourceBlog ?? normalizedFrontmatter.sourceBlog,
      sourceChannel: parsed.data.sourceChannel ?? normalizedFrontmatter.sourceChannel,
    };
    const contentChecksum = computeContentChecksum(nextFrontmatter, existing.body);
    const commit = buildDeterministicCommitMetadata({
      action: normalizedFrontmatter.assetRefs?.includes(assetRef) ? "unchanged" : "updated",
      section: parsed.data.section,
      slug,
      checksum: contentChecksum,
      sourceBlog: parsed.data.sourceBlog ?? normalizedFrontmatter.sourceBlog,
      sourceChannel: parsed.data.sourceChannel ?? normalizedFrontmatter.sourceChannel,
      path: filePath,
    });

    if (parsed.data.dryRun) {
      return json({
        ok: true,
        dryRun: true,
        requestId,
        checksum,
        assetRef,
        assetRefs: nextAssetRefs,
        cloudinaryUrl: parsed.data.pdfUrl,
        commit,
      });
    }

    const result = writeMdxDocument(filePath, nextFrontmatter, existing.body);
    upsertStateRecord(
      state,
      {
        requestId,
        checksum,
        path: filePath,
        section: parsed.data.section,
        slug,
        updatedAt: new Date().toISOString(),
        mode: "write",
      },
      writePdfPublishState,
    );

    return json({
      ok: true,
      requestId,
      action: result.action,
      checksum,
      assetRef,
      assetRefs: nextAssetRefs,
      cloudinaryUrl: parsed.data.pdfUrl,
      commit: {
        ...commit,
        checksum,
      },
    });
  } catch (error) {
    return json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Could not load the content document for PDF registration.",
      },
      404,
    );
  }
}
