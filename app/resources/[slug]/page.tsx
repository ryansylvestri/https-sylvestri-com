import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { MotivatedSellerForm } from "@/components/motivated-seller-form";
import { RevealSection } from "@/components/reveal-section";
import { SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { getPageImage } from "@/lib/media-map";
import {
  getResourcePage,
  resourcePages,
} from "@/lib/resource-pages";
import { siteConfig } from "@/lib/site-content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return resourcePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `/resources/${page.slug}` },
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.heroHeadline,
    description: page.metaDescription,
    author: {
      "@type": "RealEstateAgent",
      name: siteConfig.founder,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    url: `${siteConfig.siteUrl}/resources/${page.slug}`,
  };

  const related = page.relatedSlugs
    .map((s) => getResourcePage(s))
    .filter(Boolean);

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
      <JsonLd data={schema} />

      {/* ── Hero ── */}
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
          <p className="max-w-3xl text-xl leading-9 text-body-ink">
            {page.heroSubheadline}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/landing/${page.linkedLandingSlug}`}
              className="rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
            >
              Get Help With This
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Content Sections ── */}
      <article className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-12">
          {page.sections.map((section, i) => (
            <RevealSection key={i} delay={i * 60}>
              <section className="space-y-4">
                <h2 className="font-display text-2xl leading-tight text-brand-ink md:text-3xl">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-body-ink">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="ml-1 space-y-2">
                    {section.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-base leading-7 text-body-ink"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-copper" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </RevealSection>
          ))}
        </div>
      </article>

      {/* ── FAQ ── */}
      {page.faq.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <RevealSection>
            <h2 className="font-display text-3xl text-brand-ink">
              Frequently Asked Questions
            </h2>
          </RevealSection>
          <div className="mt-8 space-y-6">
            {page.faq.map((item, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-8">
                  <h3 className="text-lg font-semibold text-brand-ink">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">
                    {item.a}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA + Form ── */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/90 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12">
          <h2 className="font-display text-3xl text-brand-ink">
            {page.ctaHeadline}
          </h2>
          <p className="mt-3 text-lg leading-8 text-body-ink">
            {page.ctaBody}
          </p>
          <div className="mt-8">
            <MotivatedSellerForm
              sourceSlug={page.slug}
              ctaLabel="Get My Free Consultation"
              variant="embedded"
            />
          </div>
        </div>
      </section>

      {/* ── Related Resources ── */}
      {related.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-display text-2xl text-brand-ink">
            Related Resources
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map(
              (r) =>
                r && (
                  <Link
                    key={r.slug}
                    href={`/resources/${r.slug}`}
                    className="group rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6 transition hover:border-brand-gold"
                  >
                    <h3 className="font-display text-lg text-brand-ink transition group-hover:text-brand-copper">
                      {r.heroHeadline}
                    </h3>
                    <p className="mt-2 text-sm text-body-ink">
                      {r.heroSubheadline.slice(0, 120)}…
                    </p>
                  </Link>
                ),
            )}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
