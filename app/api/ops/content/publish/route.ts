import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { normalizeContentSlug } from "@/lib/content-engine";
import { validateN8nRequestAuth } from "@/lib/ops-contract";
import {
  buildContentValidation,
  buildDeterministicCommitMetadata,
  computeContentChecksum,
  contentPublishPayloadSchema,
  ensureOpsStateDir,
  findDuplicateSlug,
  findDuplicateTitle,
  getContentFilePathFromSlug,
  loadMdxDocument,
  readContentPublishState,
  resolveRequestId,
  upsertStateRecord,
  writeContentPublishState,
  writeMdxDocument,
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

  const parsed = contentPublishPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Invalid publish payload.",
        issues: parsed.error.flatten(),
      },
      400,
    );
  }

  ensureOpsStateDir();

  const normalizedFrontmatter = {
    ...parsed.data.frontmatter,
    slug: normalizeContentSlug(parsed.data.frontmatter.slug),
    slugBase: parsed.data.frontmatter.slugBase ?? normalizeContentSlug(parsed.data.frontmatter.slug),
    sourceBlog: parsed.data.sourceBlog ?? parsed.data.frontmatter.sourceBlog,
    sourceChannel: parsed.data.sourceChannel ?? parsed.data.frontmatter.sourceChannel,
  };
  const filePath = getContentFilePathFromSlug(parsed.data.section, normalizedFrontmatter.slug);
  const checksum = computeContentChecksum(normalizedFrontmatter, parsed.data.content);
  const requestId = resolveRequestId(parsed.data.requestId, parsed.data.idempotencyKey, checksum);
  const validation = buildContentValidation({
    ...parsed.data,
    frontmatter: normalizedFrontmatter,
  });
  const failedChecks = validation.filter((check) => !check.ok);

  const state = readContentPublishState();
  const stateHit = state.byRequestId[requestId] || state.byChecksum[checksum];
  if (stateHit) {
    return json({
      ok: true,
      idempotent: true,
      requestId,
      path: stateHit.path,
      checksum: stateHit.checksum,
      section: stateHit.section,
      slug: stateHit.slug,
      validation,
      commit: buildDeterministicCommitMetadata({
        action: "unchanged",
        section: stateHit.section,
        slug: stateHit.slug,
        checksum: stateHit.checksum,
        sourceBlog: normalizedFrontmatter.sourceBlog,
        sourceChannel: normalizedFrontmatter.sourceChannel,
        path: stateHit.path,
      }),
    });
  }

  const duplicatePath = findDuplicateSlug(normalizedFrontmatter.slug, filePath);
  if (duplicatePath) {
    return json(
      {
        ok: false,
        message: `Duplicate slug detected for "${normalizedFrontmatter.slug}".`,
        duplicatePath,
      },
      409,
    );
  }

  const duplicateTitlePath = findDuplicateTitle(normalizedFrontmatter.title, filePath);
  if (duplicateTitlePath) {
    return json(
      {
        ok: false,
        message: `Duplicate title detected for "${normalizedFrontmatter.title}".`,
        duplicatePath: duplicateTitlePath,
      },
      409,
    );
  }

  if (failedChecks.length > 0) {
    return json(
      {
        ok: false,
        message: "Publish quality gates failed.",
        validation,
      },
      422,
    );
  }

  const existingDoc = (() => {
    try {
      return loadMdxDocument(filePath);
    } catch {
      return null;
    }
  })();
  const existingChecksum = existingDoc
    ? computeContentChecksum(existingDoc.frontmatter, existingDoc.body)
    : null;
  const inferredAction = existingChecksum === checksum
    ? "unchanged"
    : existingDoc
      ? "updated"
      : "created";
  const commit = buildDeterministicCommitMetadata({
    action: inferredAction,
    section: parsed.data.section,
    slug: normalizedFrontmatter.slug,
    checksum,
    sourceBlog: normalizedFrontmatter.sourceBlog,
    sourceChannel: normalizedFrontmatter.sourceChannel,
    path: filePath,
  });

  if (parsed.data.dryRun) {
    return json({
      ok: true,
      dryRun: true,
      requestId,
      action: inferredAction,
      checksum,
      path: filePath,
      routePath:
        parsed.data.section === "docs"
          ? `/docs/${normalizedFrontmatter.slug}`
          : `/${parsed.data.section}/${normalizedFrontmatter.slug.split("/").at(-1)}`,
      validation,
      commit,
    });
  }

  const result = writeMdxDocument(filePath, normalizedFrontmatter, parsed.data.content);
  upsertStateRecord(
    state,
    {
      requestId,
      checksum: result.checksum,
      path: filePath,
      section: parsed.data.section,
      slug: normalizedFrontmatter.slug,
      updatedAt: new Date().toISOString(),
      mode: "write",
    },
    writeContentPublishState,
  );

  const routePath =
    parsed.data.section === "docs"
      ? `/docs/${normalizedFrontmatter.slug}`
      : `/${parsed.data.section}/${normalizedFrontmatter.slug.split("/").at(-1)}`;
  revalidatePath("/articles");
  revalidatePath(routePath);
  revalidatePath("/sitemap.xml");
  revalidatePath("/sitemap-content.xml");

  return json(
    {
      ok: true,
      requestId,
      idempotent: false,
      action: result.action,
      checksum: result.checksum,
      path: filePath,
      routePath,
      validation,
      commit: {
        ...commit,
        checksum: result.checksum,
      },
    },
    result.action === "created" ? 201 : 200,
  );
}
