import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { getPublishedDocByLegacyUrl } from "@/lib/content-engine";
import { getFaqsForCategory } from "@/lib/faq-content";
import { getExtendedFaqsForCategory } from "@/lib/faq-content-extended";
import { getLeadMagnetsForLane } from "@/lib/lead-magnets";
import {
  getGuideTopic,
  guideCategoryLabels,
  guideSlugs,
  guideTopics,
} from "@/lib/guide-topics";
import { guideProse } from "@/lib/guide-prose";
import { getPageImage } from "@/lib/media-map";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return guideSlugs.map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const guide = getGuideTopic(topic);

  if (!guide) return {};

  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    noIndex: !guide.reviewedAt,
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { topic } = await params;
  const migratedArticle = getPublishedDocByLegacyUrl(`/guides/${topic}`);
  if (migratedArticle) {
    redirect(migratedArticle.routePath);
  }

  const guide = getGuideTopic(topic);

  if (!guide) notFound();

  /* ── Collect all FAQs for this guide's keys ── */
  const allFaqs: { q: string; a: string }[] = [];
  for (const key of guide.faqKeys) {
    const items = [
      ...getFaqsForCategory(key),
      ...getExtendedFaqsForCategory(key),
    ];
    for (const item of items) {
      if (!allFaqs.some((f) => f.q === item.q)) allFaqs.push(item);
    }
  }

  /* ── Hero image ── */
  const heroPublicId = getPageImage(guide.slug);
  const heroUrl =
    guide.slug === "inspection"
      ? "/images/editorial-learning-inspection.webp"
      : getCloudinaryAssetUrl(heroPublicId, {
          crop: "fill",
          gravity: "auto",
          width: 900,
          height: 500,
          quality: "auto",
          format: "auto",
        });

  /* ── Prose sections ── */
  const sections = guideProse[guide.slug] ?? [];

  /* ── Related guides in the same category ── */
  const relatedGuides = guideTopics.filter(
    (t) => t.category === guide.category && t.slug !== guide.slug,
  );

  const defaultLeadTypeByCategory: Record<string, string> = {
    buyer: "buyer",
    seller: "seller",
    investor: "investor",
    lifestyle: "renter",
    process: "agent-match",
    systems: "ai-coaching",
  };
  const defaultLeadType =
    guide.contactLeadType || defaultLeadTypeByCategory[guide.category] || "agent-match";

  /* ── JSON-LD ── */
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url: `${siteConfig.siteUrl}/guides/${guide.slug}`,
      author: {
        "@type": "Person",
        name: siteConfig.founder,
      },
      publisher: {
        "@type": "Person",
        name: "Ryan Sylvestri",
      },
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
    ...(allFaqs.length > 0
      ? [buildFaqJsonLd(allFaqs)]
      : []),
  ];

  return (
    <SiteShell>
      <JsonLd data={schemas} />

      <PageHero
        eyebrow={guideCategoryLabels[guide.category]}
        title={guide.title}
        description={guide.description}
        primaryCta={{ href: "/intake", label: "Talk to Ryan" }}
        secondaryCta={{ href: "/guides", label: "All guides" }}
      >
        {heroUrl && (
          <div className="overflow-hidden rounded-[1.5rem]">
            <Image
              src={heroUrl}
              alt={guide.title}
              width={guide.slug === "inspection" ? 1448 : 900}
              height={guide.slug === "inspection" ? 1086 : 500}
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="h-auto w-full object-cover"
              priority
              fetchPriority="high"
            />
          </div>
        )}
      </PageHero>
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <Link href="/guides" className="hover:text-brand-copper">Guides</Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">{guide.title}</span>
      </nav>
      <div className="site-container border-y border-[rgba(20,32,51,0.14)] py-4 text-xs leading-6 text-muted-ink">
        {guide.reviewedAt ? `Last reviewed ${new Date(guide.reviewedAt).toLocaleDateString("en-US")}. ` : "Editorial review date pending. "}
        Educational information only. Verify time-sensitive facts and consult the appropriate licensed professional for your situation.
      </div>
      {guide.sources?.length ? (
        <aside className="site-container py-6" aria-labelledby="guide-sources">
          <h2 id="guide-sources" className="eyebrow">Reviewed sources</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap">
            {guide.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-brand-ink underline decoration-brand-copper underline-offset-4">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      {/* ── Article prose ── */}
      {sections.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-18">
          <article className="prose-brand space-y-12">
            {sections.map((section, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div>
                  <h2 className="font-display text-3xl leading-tight text-brand-ink">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-body-ink">
                    {section.body}
                  </p>
                </div>
              </RevealSection>
            ))}
          </article>
        </section>
      )}

      {/* ── FAQ section ── */}
      {allFaqs.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
            <div>
              <RevealSection>
                <SectionHeading
                  eyebrow="Common questions"
                  title={`What people ask about ${guide.slug.replace(/-/g, " ")}`}
                  description="Real questions from buyers, sellers, and homeowners in the Hudson Valley — answered clearly so you can move forward with confidence."
                />
              </RevealSection>
              <div className="mt-10 grid gap-6">
                {allFaqs.map((item, i) => (
                  <RevealSection key={i} delay={i * 60}>
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
            </div>

            <RevealSection direction="right" delay={150}>
              <div className="lg:sticky lg:top-8">
                <LeadCaptureForm
                  title="Ready for the next step?"
                  description="Drop your info and Ryan will follow up with guidance specific to your situation."
                  submitLabel="Get in touch"
                  source={`guide:${guide.slug}`}
                  campaign={guide.slug}
                  defaultLeadType={defaultLeadType}
                  leadMagnetOptions={getLeadMagnetsForLane(defaultLeadType)}
                  defaultLeadMagnet={guide.defaultLeadMagnet}
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── Related guides ── */}
      {relatedGuides.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <RevealSection>
            <SectionHeading
              eyebrow="Related guides"
              title="Keep going deeper"
              description="These related guides cover adjacent topics in the same category."
            />
          </RevealSection>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {relatedGuides.slice(0, 6).map((related, i) => (
              <RevealSection key={related.slug} delay={i * 80} direction="scale">
                <Link
                  href={`/guides/${related.slug}`}
                  className="group block rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold"
                >
                  <h3 className="font-display text-2xl leading-tight text-brand-ink transition group-hover:text-brand-gold">
                    {related.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">
                    {related.description}
                  </p>
                </Link>
              </RevealSection>
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
