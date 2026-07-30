#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");
const requiredStrings = [
  "title",
  "slug",
  "section",
  "contentKind",
  "category",
  "description",
  "summary",
  "access",
  "status",
  "reviewState",
  "publishedAt",
  "updatedAt",
  "author",
];
const allowedKinds = new Set(["news", "guide", "tutorial", "experiment", "idea", "story"]);

function listMdxFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listMdxFiles(filePath)
      : entry.isFile() && entry.name.endsWith(".mdx")
        ? [filePath]
        : [];
  });
}

function validDate(value) {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

async function validateFile(filePath) {
  const relativePath = path.relative(process.cwd(), filePath);
  const errors = [];
  let parsed;
  try {
    parsed = matter(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return { relativePath, data: {}, errors: [`frontmatter: ${error.message}`] };
  }

  const data = parsed.data;
  for (const key of requiredStrings) {
    if (typeof data[key] !== "string" || !data[key].trim()) {
      errors.push(`${key} is required`);
    }
  }
  if (!Array.isArray(data.tags) || !data.tags.length || data.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    errors.push("tags must be a non-empty string array");
  }
  if (!allowedKinds.has(data.contentKind)) errors.push("contentKind is invalid");
  if (!validDate(data.publishedAt)) errors.push("publishedAt is invalid");
  if (!validDate(data.updatedAt)) errors.push("updatedAt is invalid");
  if (data.contentKind === "guide" && !validDate(data.reviewedAt)) errors.push("guides require a valid reviewedAt date");
  if (data.status === "published" && data.reviewState !== "approved") errors.push("published content must be approved");
  if (!data.featuredImage || typeof data.featuredImage.src !== "string" || !URL.canParse(data.featuredImage.src)) {
    errors.push("featuredImage.src must be an absolute URL");
  }
  if (!data.featuredImage || typeof data.featuredImage.alt !== "string" || !data.featuredImage.alt.trim()) {
    errors.push("featuredImage.alt is required");
  }
  if (!Array.isArray(data.sources)) errors.push("sources must be an array");
  if (data.contentKind === "news") {
    if (typeof data.whyItMatters !== "string" || !data.whyItMatters.trim()) errors.push("news requires whyItMatters");
    if (!data.sources?.some((source) => source?.primary === true && URL.canParse(source.url))) {
      errors.push("news requires at least one primary source URL");
    }
  }
  if (!parsed.content.trim()) errors.push("MDX body is empty");

  try {
    await compile(parsed.content, { development: false });
  } catch (error) {
    errors.push(`MDX compile failed: ${error.message}`);
  }

  return { relativePath, data, errors };
}

const files = listMdxFiles(contentRoot).sort();
const results = await Promise.all(files.map(validateFile));
const slugOwners = new Map();
const titleOwners = new Map();

for (const result of results) {
  const slug = String(result.data.slug || "").trim().toLowerCase();
  const title = String(result.data.title || "").trim().toLowerCase();
  if (slug) {
    if (slugOwners.has(slug)) result.errors.push(`duplicate slug also used by ${slugOwners.get(slug)}`);
    else slugOwners.set(slug, result.relativePath);
  }
  if (title) {
    if (titleOwners.has(title)) result.errors.push(`duplicate title also used by ${titleOwners.get(title)}`);
    else titleOwners.set(title, result.relativePath);
  }
}

const failed = results.filter((result) => result.errors.length);
console.log(JSON.stringify({
  ok: failed.length === 0,
  filesChecked: files.length,
  errors: failed.map(({ relativePath, errors }) => ({ file: relativePath, errors })),
}, null, 2));

if (failed.length) process.exitCode = 1;
