import type { Metadata } from "next";

import type { ContentDocument } from "@/lib/content-engine";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { personalMedia } from "@/lib/personal-brand-content";
import { siteConfig } from "@/lib/site-content";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  openGraphType?: "website" | "article";
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
}

export function getDefaultSeoImage(): string {
  return getCloudinaryAssetUrl(personalMedia.sign, {
    crop: "fill",
    gravity: "auto",
    width: 1200,
    height: 630,
    format: "jpg",
  });
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const image = input.image || getDefaultSeoImage();
  const canonicalPath = input.path.startsWith("/") ? input.path : `/${input.path}`;
  const robots = input.noIndex
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      }
    : {
        index: true,
        follow: true,
      };

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots,
    openGraph: {
      type: input.openGraphType ?? "website",
      url: absoluteUrl(canonicalPath),
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function buildContentMetadata(doc: ContentDocument): Metadata {
  return buildPageMetadata({
    title: doc.seoTitle ?? doc.title,
    description: doc.seoDescription ?? doc.description,
    path: doc.routePath,
    image: doc.seoImage,
    keywords: doc.tags,
    openGraphType: "article",
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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildContentJsonLd(doc: ContentDocument) {
  const schemaType =
    doc.section === "articles"
      ? "BlogPosting"
      : doc.section === "resources"
        ? "Article"
        : "TechArticle";

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: doc.seoTitle ?? doc.title,
    description: doc.seoDescription ?? doc.description,
    image: [doc.seoImage || getDefaultSeoImage()],
    url: absoluteUrl(doc.routePath),
    mainEntityOfPage: absoluteUrl(doc.routePath),
    articleSection: doc.category,
    keywords: doc.tags.join(", "),
    datePublished: doc.publishedAt,
    dateModified: doc.updatedAt,
    author: {
      "@type": "Person",
      name: doc.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
}
