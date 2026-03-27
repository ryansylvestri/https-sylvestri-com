import "server-only";

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

import {
  contentFrontmatterSchema,
  type ContentSection,
  normalizeContentSlug,
} from "@/lib/content-engine";
import { getRepoStatePath, readRepoState, writeRepoState } from "@/lib/ops-contract";

export type PublishAction = "created" | "updated" | "unchanged";
export type PublishMode = "write" | "dry-run";

export const contentPublishPayloadSchema = z.object({
  section: z.enum(["docs", "resources", "articles"]),
  frontmatter: contentFrontmatterSchema,
  content: z
    .string()
    .trim()
    .min(160, "content must have at least 160 characters for publish quality checks"),
  dryRun: z.boolean().optional().default(false),
  requestId: z.string().trim().min(1).optional(),
  idempotencyKey: z.string().trim().min(1).optional(),
  sourceBlog: z.string().trim().min(1).optional(),
  sourceChannel: z.string().trim().min(1).optional(),
}).superRefine((payload, ctx) => {
  if (payload.frontmatter.section !== payload.section) {
    ctx.addIssue({
      code: "custom",
      message: "frontmatter.section must match the top-level section.",
      path: ["frontmatter", "section"],
    });
  }

  const normalizedSlug = normalizeContentSlug(payload.frontmatter.slug);
  if (payload.section !== "docs" && normalizedSlug.includes("/")) {
    ctx.addIssue({
      code: "custom",
      message: "Only docs may use nested slugs. Articles and resources must use a single slug.",
      path: ["frontmatter", "slug"],
    });
  }
});

export const pdfPublishPayloadSchema = z.object({
  section: z.enum(["docs", "resources", "articles"]),
  slug: z.string().trim().min(1),
  pdfUrl: z.string().url(),
  cloudinaryPublicId: z.string().trim().min(1).optional(),
  checksum: z.string().trim().min(16).optional(),
  filename: z.string().trim().min(1).optional(),
  dryRun: z.boolean().optional().default(false),
  requestId: z.string().trim().min(1).optional(),
  idempotencyKey: z.string().trim().min(1).optional(),
  sourceBlog: z.string().trim().min(1).optional(),
  sourceChannel: z.string().trim().min(1).optional(),
}).superRefine((payload, ctx) => {
  const normalizedSlug = normalizeContentSlug(payload.slug);
  if (payload.section !== "docs" && normalizedSlug.includes("/")) {
    ctx.addIssue({
      code: "custom",
      message: "Only docs may use nested slugs. Articles and resources must use a single slug.",
      path: ["slug"],
    });
  }
});

export type ContentPublishPayload = z.infer<typeof contentPublishPayloadSchema>;
export type PdfPublishPayload = z.infer<typeof pdfPublishPayloadSchema>;

export type PublishStateRecord = {
  requestId: string;
  checksum: string;
  path: string;
  section: ContentSection;
  slug: string;
  updatedAt: string;
  mode: PublishMode;
};

export type PublishState = {
  byRequestId: Record<string, PublishStateRecord>;
  byPath: Record<string, PublishStateRecord>;
  byChecksum: Record<string, PublishStateRecord>;
};

export type PublishValidationCheck = {
  name: string;
  ok: boolean;
  message: string;
};

export const DEFAULT_PUBLISH_CHECKSUM_SEED = "sylvestri-content-v1";

function stableJson(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableJson).join(",")}]`;
  }

  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
    .join(",");

  return `{${entries}}`;
}

function walkMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return walkMdxFiles(absolutePath);
    }

    return entry.isFile() && entry.name.endsWith(".mdx") ? [absolutePath] : [];
  });
}

function normalizePublishState(value: unknown): PublishState {
  const state = value as Partial<PublishState> | undefined;
  return {
    byRequestId: state?.byRequestId ?? {},
    byPath: state?.byPath ?? {},
    byChecksum: state?.byChecksum ?? {},
  };
}

export function ensureOpsStateDir() {
  fs.mkdirSync(path.dirname(getRepoStatePath("content-publish.json")), { recursive: true });
}

export function getContentFilePathFromSlug(section: ContentSection, slug: string): string {
  return path.join(process.cwd(), "content", section, `${normalizeContentSlug(slug)}.mdx`);
}

export function readContentPublishState(): PublishState {
  return normalizePublishState(readRepoState<PublishState>("content-publish.json"));
}

export function writeContentPublishState(state: PublishState): void {
  writeRepoState("content-publish.json", state);
}

export function readPdfPublishState(): PublishState {
  return normalizePublishState(readRepoState<PublishState>("pdf-publish.json"));
}

export function writePdfPublishState(state: PublishState): void {
  writeRepoState("pdf-publish.json", state);
}

export function upsertStateRecord(
  state: PublishState,
  record: PublishStateRecord,
  writer: (nextState: PublishState) => void,
): void {
  state.byRequestId[record.requestId] = record;
  state.byPath[record.path] = record;
  state.byChecksum[record.checksum] = record;
  writer(state);
}

export function resolveRequestId(
  explicitRequestId: string | undefined,
  explicitIdempotencyKey: string | undefined,
  checksum: string,
): string {
  return explicitRequestId?.trim()
    || explicitIdempotencyKey?.trim()
    || checksum;
}

export function computeContentChecksum(frontmatter: Record<string, unknown>, content: string): string {
  const hasher = createHash("sha256");
  hasher.update(stableJson(frontmatter));
  hasher.update("\n---\n");
  hasher.update(content.trim());
  hasher.update("\n");
  hasher.update(DEFAULT_PUBLISH_CHECKSUM_SEED);
  return hasher.digest("hex");
}

export function computePdfChecksum(input: {
  section: string;
  slug: string;
  pdfUrl: string;
  filename?: string | undefined;
  cloudinaryPublicId?: string | undefined;
}): string {
  const hasher = createHash("sha256");
  hasher.update(
    [
      input.section,
      normalizeContentSlug(input.slug),
      input.pdfUrl,
      input.filename ?? "",
      input.cloudinaryPublicId ?? "",
      DEFAULT_PUBLISH_CHECKSUM_SEED,
    ].join("\n"),
  );
  return hasher.digest("hex");
}

export function loadMdxDocument(filePath: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return {
    frontmatter: parsed.data,
    body: parsed.content.trim(),
  };
}

export function writeMdxDocument(
  filePath: string,
  frontmatter: Record<string, unknown>,
  content: string,
): {
  action: PublishAction;
  checksum: string;
  path: string;
} {
  const existed = fs.existsSync(filePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const normalizedFrontmatter = contentFrontmatterSchema.parse(frontmatter);
  const normalizedContent = content.trim();
  const serialized = matter.stringify(normalizedContent, normalizedFrontmatter);

  if (existed) {
    const current = fs.readFileSync(filePath, "utf8");
    if (current === serialized) {
      return {
        action: "unchanged",
        checksum: computeContentChecksum(normalizedFrontmatter, normalizedContent),
        path: filePath,
      };
    }
  }

  fs.writeFileSync(filePath, serialized, "utf8");

  return {
    action: existed ? "updated" : "created",
    checksum: computeContentChecksum(normalizedFrontmatter, normalizedContent),
    path: filePath,
  };
}

export function findDuplicateSlug(slug: string, ignoreFilePath?: string): string | null {
  const normalizedSlug = normalizeContentSlug(slug);
  const sections: ContentSection[] = ["docs", "resources", "articles"];

  for (const section of sections) {
    const files = walkMdxFiles(path.join(process.cwd(), "content", section));
    for (const filePath of files) {
      if (ignoreFilePath && filePath === ignoreFilePath) {
        continue;
      }

      try {
        const parsed = loadMdxDocument(filePath);
        const currentSlug = normalizeContentSlug(String(parsed.frontmatter.slug ?? ""));
        if (currentSlug === normalizedSlug) {
          return filePath;
        }
      } catch {
        continue;
      }
    }
  }

  return null;
}

export function findDuplicateTitle(title: string, ignoreFilePath?: string): string | null {
  const normalizedTitle = title.trim().toLowerCase();
  const sections: ContentSection[] = ["docs", "resources", "articles"];

  for (const section of sections) {
    const files = walkMdxFiles(path.join(process.cwd(), "content", section));
    for (const filePath of files) {
      if (ignoreFilePath && filePath === ignoreFilePath) {
        continue;
      }

      try {
        const parsed = loadMdxDocument(filePath);
        const currentTitle = String(parsed.frontmatter.title ?? "").trim().toLowerCase();
        if (currentTitle && currentTitle === normalizedTitle) {
          return filePath;
        }
      } catch {
        continue;
      }
    }
  }

  return null;
}

export function buildContentValidation(payload: ContentPublishPayload): PublishValidationCheck[] {
  const title = payload.frontmatter.seoTitle ?? payload.frontmatter.title;
  const description = payload.frontmatter.seoDescription ?? payload.frontmatter.description;

  return [
    {
      name: "title",
      ok: title.length >= 20 && title.length <= 70,
      message: "SEO title should stay between 20 and 70 characters.",
    },
    {
      name: "description",
      ok: description.length >= 110 && description.length <= 170,
      message: "SEO description should stay between 110 and 170 characters.",
    },
    {
      name: "body-length",
      ok: payload.content.trim().length >= 600,
      message: "Body should contain at least 600 characters for publish readiness.",
    },
    {
      name: "seo-image",
      ok: Boolean(payload.frontmatter.seoImage),
      message: "Each publish item should include an explicit SEO image URL.",
    },
    {
      name: "tags",
      ok: payload.frontmatter.tags.length >= 2,
      message: "Each publish item should include at least two tags.",
    },
    {
      name: "canonical-slug",
      ok: payload.frontmatter.slug === normalizeContentSlug(payload.frontmatter.slug),
      message: "Slug must already be normalized before publish.",
    },
  ];
}

export function buildPdfRef(payload: {
  pdfUrl: string;
  filename?: string | undefined;
  cloudinaryPublicId?: string | undefined;
}): string {
  if (payload.cloudinaryPublicId) {
    return `pdf:${payload.cloudinaryPublicId}`;
  }

  if (payload.filename) {
    return `pdf:${payload.filename}:${payload.pdfUrl}`;
  }

  return `pdf:${payload.pdfUrl}`;
}

export function buildDeterministicCommitMetadata(input: {
  action: PublishAction;
  section: ContentSection;
  slug: string;
  checksum: string;
  sourceBlog?: string | undefined;
  sourceChannel?: string | undefined;
  path: string;
}) {
  const scope = input.sourceBlog ?? input.sourceChannel ?? input.section;

  return {
    branch: "content-staging",
    path: path.relative(process.cwd(), input.path),
    checksum: input.checksum,
    message: `content(${scope}): ${input.action} ${input.section}/${input.slug}`,
  };
}
