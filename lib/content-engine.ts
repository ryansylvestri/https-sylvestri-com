import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export const contentFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  section: z.enum(["docs", "resources", "articles"]),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)),
  description: z.string().min(1),
  summary: z.string().min(1),
  access: z.enum(["public", "free", "pro"]),
  status: z.enum(["published", "draft"]),
  publishedAt: z.string().datetime({ offset: true }).or(z.string().date()),
  updatedAt: z.string().datetime({ offset: true }).or(z.string().date()),
  author: z.string().min(1),
  assetIds: z.array(z.string().min(1)).optional(),
  seoTitle: z.string().min(1).optional(),
  seoDescription: z.string().min(1).optional(),
  seoImage: z.string().url().optional(),
  publishWindow: z.string().min(1).optional(),
  sourceChannel: z.string().min(1).optional(),
  sourceBlog: z.string().min(1).optional(),
  slugBase: z.string().min(1).optional(),
  assetRefs: z.array(z.string().min(1)).optional(),
  legacyUrl: z.string().min(1).optional(),
});

export type ContentSection = z.infer<typeof contentFrontmatterSchema>["section"];
export type ContentAccess = z.infer<typeof contentFrontmatterSchema>["access"];
export type ContentFrontmatter = z.infer<typeof contentFrontmatterSchema>;

export type ContentDocument = ContentFrontmatter & {
  id: string;
  filePath: string;
  body: string;
  excerpt: string;
  routePath: string;
  slugParts: string[];
};

type ContentIndex = {
  all: ContentDocument[];
  docs: ContentDocument[];
  resources: ContentDocument[];
  articles: ContentDocument[];
};

type ParsedDocResult = {
  frontmatter: ContentFrontmatter;
  body: string;
};

export function normalizeContentSlug(rawSlug: string): string {
  const slug = rawSlug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9/_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/\/\/+/, "/")
    .replace(/^[-/]+|[-/]+$/g, "")
    .replace(/\/\-+|\-+\//g, "/");

  if (!slug) {
    throw new Error("Slug cannot be empty after normalization.");
  }

  return slug;
}

function normalizeSectionPath(_section: ContentSection, slug: string): string {
  const normalizedSlug = normalizeContentSlug(slug);
  const segmentParts = normalizedSlug.split("/").filter(Boolean);
  if (segmentParts.some((segment) => !segment)) {
    throw new Error(`Invalid content slug "${slug}".`);
  }

  return segmentParts.join("/");
}

export function getContentFilePath(section: ContentSection, slug: string): string {
  const normalizedSlug = normalizeSectionPath(section, slug);
  return path.join(CONTENT_ROOT, section, `${normalizedSlug}.mdx`);
}

export function parseContentSource(filePath: string): ParsedDocResult {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return {
    frontmatter: contentFrontmatterSchema.parse(parsed.data),
    body: String(parsed.content ?? "").trim(),
  };
}

export function normalizeContentRoutePath(section: ContentSection, slugParts: string[]) {
  const routeSlug = slugParts.join("/");
  if (section === "docs") return `/docs/${routeSlug}`;
  return `/${section}/${slugParts.at(-1)}`;
}

function listMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return listMdxFiles(absolutePath);
    }

    return absolutePath.endsWith(".mdx") ? [absolutePath] : [];
  });
}

function createExcerpt(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*`[\]-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}

function normalizeDoc(filePath: string): ContentDocument {
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = contentFrontmatterSchema.parse(parsed.data);

  const expectedSection = relativePath.split(path.sep)[0];
  if (frontmatter.section !== expectedSection) {
    throw new Error(
      `Frontmatter section mismatch in ${relativePath}. Expected "${expectedSection}", received "${frontmatter.section}".`,
    );
  }

  const slugParts = frontmatter.slug.split("/").filter(Boolean);
  if (slugParts.length === 0) {
    throw new Error(`Invalid empty slug in ${relativePath}.`);
  }

  const routePath = normalizeContentRoutePath(frontmatter.section, slugParts);

  return {
    ...frontmatter,
    id: `${frontmatter.section}:${frontmatter.slug}`,
    filePath,
    body: parsed.content.trim(),
    excerpt: createExcerpt(parsed.content),
    routePath,
    slugParts,
  };
}

function buildIndex(): ContentIndex {
  const sections: ContentSection[] = ["docs", "resources", "articles"];
  const all = sections.flatMap((section) =>
    listMdxFiles(path.join(CONTENT_ROOT, section)).map(normalizeDoc),
  );

  const seen = new Map<string, string>();
  for (const doc of all) {
    const existing = seen.get(doc.slug);
    if (existing) {
      throw new Error(
        `Duplicate content slug "${doc.slug}" found in ${existing} and ${path.relative(
          process.cwd(),
          doc.filePath,
        )}.`,
      );
    }
    seen.set(doc.slug, path.relative(process.cwd(), doc.filePath));
  }

  return {
    all,
    docs: all.filter((doc) => doc.section === "docs"),
    resources: all.filter((doc) => doc.section === "resources"),
    articles: all.filter((doc) => doc.section === "articles"),
  };
}

const getContentIndex = cache(buildIndex);

function byPublishedDateDescending(left: ContentDocument, right: ContentDocument) {
  return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
}

export function getPublishedContent(section: ContentSection): ContentDocument[] {
  return [...getContentIndex()[section]]
    .filter((doc) => doc.status === "published")
    .sort(byPublishedDateDescending);
}

export function getPublishedDocBySlug(
  section: ContentSection,
  slug: string,
): ContentDocument | undefined {
  return getPublishedContent(section).find((doc) => doc.slug === slug);
}

export function getPublishedDocByLegacyUrl(legacyUrl: string): ContentDocument | undefined {
  return getPublishedContent("articles").find((doc) => doc.legacyUrl === legacyUrl);
}

export function getRelatedContent(doc: ContentDocument, limit = 3): ContentDocument[] {
  return getPublishedContent(doc.section)
    .filter((candidate) => candidate.slug !== doc.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) => doc.tags.includes(tag)).length;
      const sharedCategory = candidate.category === doc.category ? 1 : 0;
      return { candidate, score: sharedTags * 2 + sharedCategory };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export async function renderContentDocument(doc: ContentDocument) {
  return compileMDX<ContentFrontmatter>({
    source: doc.body,
    options: { parseFrontmatter: false },
  });
}

export function getContentSearchIndex() {
  return getContentIndex().all
    .filter((doc) => doc.status === "published")
    .map((doc) => ({
      id: doc.id,
      title: doc.title,
      section: doc.section,
      category: doc.category,
      tags: doc.tags,
      summary: doc.summary,
      excerpt: doc.excerpt,
      routePath: doc.routePath,
      access: doc.access,
    }));
}
