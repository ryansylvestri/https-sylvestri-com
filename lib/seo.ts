import type { Metadata } from "next";

import type { ContentDocument } from "@/lib/content-engine";
import { siteConfig } from "@/lib/site-content";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  category?: string;
};

type BreadcrumbItem = { name: string; path: string };

export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return new URL(pathname.startsWith("/") ? pathname : `/${pathname}`, siteConfig.siteUrl).toString();
}

export function buildSocialCardUrl(title: string, category = "Field Notes"): string {
  const query = new URLSearchParams({ title, category });
  return absoluteUrl(`/api/social-card?${query.toString()}`);
}

export function getDefaultSeoImage(title = "Ryan Sylvestri", category = "Hudson Valley"): string {
  return buildSocialCardUrl(title, category);
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonicalPath = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const image = input.image || buildSocialCardUrl(input.title, input.category);
  const imageAlt = input.imageAlt || `${input.title} — Ryan Sylvestri`;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    authors: input.authors?.map((name) => ({ name })),
    alternates: { canonical: absoluteUrl(canonicalPath) },
    robots: input.noIndex
      ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } }
      : { index: true, follow: true },
    openGraph: {
      type: input.openGraphType ?? "website",
      url: absoluteUrl(canonicalPath),
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      ...(input.openGraphType === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
            section: input.category,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export function buildContentMetadata(doc: ContentDocument, noIndex = false): Metadata {
  return buildPageMetadata({
    title: doc.seoTitle ?? doc.title,
    description: doc.seoDescription ?? doc.description,
    path: doc.routePath,
    image: doc.seoImage ?? doc.featuredImage.src,
    imageAlt: doc.featuredImage.alt,
    keywords: doc.tags,
    openGraphType: "article",
    publishedTime: doc.publishedAt,
    modifiedTime: doc.updatedAt,
    authors: [doc.author],
    category: doc.category,
    noIndex,
  });
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildContentJsonLd(doc: ContentDocument) {
  const isNews = doc.contentKind === "news";
  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "Article",
    headline: doc.seoTitle ?? doc.title,
    description: doc.seoDescription ?? doc.description,
    image: [{ url: doc.featuredImage.src, caption: doc.featuredImage.alt }],
    url: absoluteUrl(doc.routePath),
    mainEntityOfPage: absoluteUrl(doc.routePath),
    articleSection: doc.category,
    keywords: doc.tags.join(", "),
    datePublished: doc.publishedAt,
    dateModified: doc.updatedAt,
    author: { "@type": "Person", name: doc.author, url: absoluteUrl("/about") },
    publisher: { "@type": "Person", name: "Ryan Sylvestri", url: absoluteUrl("/about") },
  };
}
