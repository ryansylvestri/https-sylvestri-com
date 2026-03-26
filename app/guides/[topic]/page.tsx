import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { getFaqsForCategory } from "@/lib/faq-content";
import { getExtendedFaqsForCategory } from "@/lib/faq-content-extended";
import {
  getGuideTopic,
  guideCategoryLabels,
  guideSlugs,
  guideTopics,
} from "@/lib/guide-topics";
import { guideProse } from "@/lib/guide-prose";
import { getPageImage } from "@/lib/media-map";
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

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { topic } = await params;
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
  const heroUrl = getCloudinaryAssetUrl(heroPublicId, {
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
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    ...(allFaqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          },
        ]
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
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}
      </PageHero>

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
                />
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ── Related landing page ── */}
      {guide.relatedLanding && (
        <section className="mx-auto max-w-7xl px-6 py-10">
          <RevealSection>
            <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-brand-cream p-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink">
                Related landing page
              </p>
              <p className="mt-3 text-base leading-7 text-body-ink">
                Ready for a more specific offer and next step?
              </p>
              <Link
                href={`/landing/${guide.relatedLanding}`}
                className="mt-4 inline-block rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-gold hover:text-brand-ink"
              >
                Open the landing page
              </Link>
            </div>
          </RevealSection>
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
