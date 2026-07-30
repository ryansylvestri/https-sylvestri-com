import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentLockState } from "@/components/content-lock-state";
import { ContentProse } from "@/components/content-prose";
import { JsonLd } from "@/components/json-ld";
import { RevealSection } from "@/components/reveal-section";
import { SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import {
  getPublishedContent,
  getPublishedDocBySlug,
  getRelatedContent,
  renderContentDocument,
} from "@/lib/content-engine";
import { requireAccessOrRedirect } from "@/lib/content-access";
import { getPageImage } from "@/lib/media-map";
import { getResourcePage, resourcePages } from "@/lib/resource-pages";
import { buildBreadcrumbJsonLd, buildContentMetadata, buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const mdxSlugs = getPublishedContent("resources").map((doc) => ({
    slug: doc.slugParts[doc.slugParts.length - 1],
  }));
  const legacySlugs = resourcePages
    .filter(
      (page) =>
        !getPublishedDocBySlug("resources", page.slug),
    )
    .map((page) => ({ slug: page.slug }));

  return [...mdxSlugs, ...legacySlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mdxDoc = getPublishedDocBySlug("resources", slug);
  if (mdxDoc) {
    return buildContentMetadata(mdxDoc);
  }

  const page = getResourcePage(slug);
  if (!page) return {};

  return buildPageMetadata({
    title: `${page.title} | Resource Guide`,
    description: page.metaDescription,
    path: `/resources/${page.slug}`,
    noIndex: true,
  });
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const mdxDoc = getPublishedDocBySlug("resources", slug);

  if (mdxDoc) {
    const access = await requireAccessOrRedirect(mdxDoc.access, mdxDoc.routePath);
    if (access.kind === "upgrade_required") {
      return (
        <SiteShell>
          <ContentLockState
            title={mdxDoc.title}
            description="This migrated resource is part of the discoverable Pro layer. It stays visible, but full access remains locked while paid plans are disabled."
            nextPath={mdxDoc.routePath}
            locked="pro"
          />
        </SiteShell>
      );
    }

    const { content } = await renderContentDocument(mdxDoc);

    return (
      <SiteShell>
        <ContentProse doc={mdxDoc} body={content} related={getRelatedContent(mdxDoc)} />
      </SiteShell>
    );
  }

  const page = getResourcePage(slug);
  if (!page) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.heroHeadline,
    description: page.metaDescription,
    author: { "@type": "Person", name: "Ryan Sylvestri" },
    url: `${siteConfig.siteUrl}/resources/${page.slug}`,
  };
  const breadcrumbSchema = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: page.title, path: `/resources/${page.slug}` },
  ]);
  const faqSchema = page.faq.length > 0 ? buildFaqJsonLd(page.faq) : null;

  const heroPublicId = getPageImage(page.slug);
  const heroUrl = getCloudinaryAssetUrl(heroPublicId, {
    crop: "fill",
    gravity: "auto",
    width: 1000,
    height: 500,
    quality: "auto",
    format: "auto",
  });

  return (
    <SiteShell>
      <JsonLd data={[schema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="space-y-5">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-copper transition hover:text-brand-gold"
          >
            ← All Resources
          </Link>
          {heroUrl && (
            <div className="overflow-hidden rounded-[2rem]">
              <Image
                src={heroUrl}
                alt={page.heroHeadline}
                width={1000}
                height={500}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}
          <h1 className="font-display text-4xl leading-tight text-balance text-brand-ink md:text-6xl">
            {page.heroHeadline}
          </h1>
          <p className="max-w-3xl text-xl leading-9 text-body-ink">{page.heroSubheadline}</p>
          <p className="border-l-2 border-brand-copper pl-4 text-sm leading-7 text-muted-ink">
            Legacy resource pending source and claims review. It is retained at this URL but withheld from public discovery.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-12">
          {page.sections.map((section, index) => (
            <RevealSection key={index} delay={index * 60}>
              <section className="space-y-4">
                <h2 className="font-display text-2xl leading-tight text-brand-ink md:text-3xl">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-body-ink">{section.body}</p>
                {section.bullets ? (
                  <ul className="ml-1 space-y-2">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 text-base leading-7 text-body-ink"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-copper" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            </RevealSection>
          ))}
        </div>
      </article>

      {page.faq.length > 0 ? (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <RevealSection>
            <h2 className="font-display text-3xl text-brand-ink">Frequently Asked Questions</h2>
          </RevealSection>
          <div className="mt-8 space-y-6">
            {page.faq.map((item, index) => (
              <RevealSection key={index} delay={index * 80}>
                <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-8">
                  <h3 className="text-lg font-semibold text-brand-ink">{item.q}</h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">{item.a}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      ) : null}

    </SiteShell>
  );
}
