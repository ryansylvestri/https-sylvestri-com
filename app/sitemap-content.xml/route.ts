import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const revalidate = 600;

type SitemapSectionConfig = {
  section: "articles" | "resources" | "docs";
  changefreq: "daily" | "weekly";
  priority: number;
};

type SitemapEntry = {
  routePath: string;
  updatedAt: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SECTION_CONFIG: SitemapSectionConfig[] = [
  { section: "articles", changefreq: "daily", priority: 0.9 },
  { section: "resources", changefreq: "daily", priority: 0.9 },
  { section: "docs", changefreq: "weekly", priority: 0.7 },
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createUrlEntry(url: string, lastModified: string, changefreq: string, priority: number) {
  const normalizedDate = new Date(lastModified);
  const safeLastModified = Number.isNaN(normalizedDate.getTime())
    ? new Date().toISOString()
    : normalizedDate.toISOString();

  return [
    "<url>",
    `<loc>${escapeXml(url)}</loc>`,
    `<lastmod>${safeLastModified}</lastmod>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority.toFixed(1)}</priority>`,
    "</url>",
  ].join("");
}

function listMdxFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) return listMdxFiles(absolutePath);
    return absolutePath.endsWith(".mdx") ? [absolutePath] : [];
  });
}

function getRoutePath(section: SitemapSectionConfig["section"], slug: string) {
  const normalizedSlug = slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean)
    .join("/");

  if (!normalizedSlug) return null;
  if (section === "docs") return `/docs/${normalizedSlug}`;
  const leafSlug = normalizedSlug.split("/").at(-1);
  return leafSlug ? `/${section}/${leafSlug}` : null;
}

function loadFallbackSectionEntries(section: SitemapSectionConfig["section"]): SitemapEntry[] {
  const sectionDir = path.join(CONTENT_ROOT, section);
  const files = listMdxFiles(sectionDir);

  return files
    .map((filePath) => {
      const parsed = matter(fs.readFileSync(filePath, "utf8"));
      if (parsed.data.status !== "published") return null;

      const slug = typeof parsed.data.slug === "string"
        ? parsed.data.slug
        : path.relative(sectionDir, filePath).replace(/\.mdx$/, "");
      const routePath = getRoutePath(section, slug);
      if (!routePath) return null;

      const updatedAt =
        typeof parsed.data.updatedAt === "string"
          ? parsed.data.updatedAt
          : typeof parsed.data.publishedAt === "string"
            ? parsed.data.publishedAt
            : new Date().toISOString();

      return {
        routePath,
        updatedAt,
      };
    })
    .filter((entry): entry is SitemapEntry => Boolean(entry));
}

async function getSectionEntries(section: SitemapSectionConfig["section"]): Promise<SitemapEntry[]> {
  try {
    const { getPublishedContent } = await import("@/lib/content-engine");
    return getPublishedContent(section).map((doc) => ({
      routePath: doc.routePath,
      updatedAt: doc.updatedAt,
    }));
  } catch (error) {
    console.error(`[sitemap-content] content engine load failed for ${section}`, error);
    return loadFallbackSectionEntries(section);
  }
}

export async function GET() {
  const entryGroups = await Promise.all(
    SECTION_CONFIG.map(async (config) => {
      const docs = await getSectionEntries(config.section);
      return docs.map((doc) =>
        createUrlEntry(absoluteUrl(doc.routePath), doc.updatedAt, config.changefreq, config.priority),
      );
    }),
  );

  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...entryGroups.flat(),
    "</urlset>",
  ].join("");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
