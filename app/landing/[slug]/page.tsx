import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GoogleReviewsPanel } from "@/components/google-reviews-panel";
import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { getFaqsForCategory } from "@/lib/faq-content";
import { getExtendedFaqsForCategory } from "@/lib/faq-content-extended";
import { getLeadMagnetsForLane } from "@/lib/lead-magnets";
import { getCategoryTopic, getPageImage } from "@/lib/media-map";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";
import {
  getLandingPage,
  landingPageCategories,
  landingPages,
  siteConfig,
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function inferLeadTypeFromLanding(category: string, slug: string) {
  if (slug.includes("home-valuation")) return "home-valuation";
  if (
    /(foreclosure|pre-foreclosure|probate|divorce|tax-lien|lis-pendens|code-violation|bankruptcy|inherited|estate|fsbo|vacant|expired)/.test(
      slug,
    )
  ) {
    return "seller-distress";
  }
  if (category === "buyers") return "buyer";
  if (category === "sellers") return "seller";
  if (category === "investors") return "investor";
  if (category === "referrals") return "agent-match";
  return "agent-match";
}

export async function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    return {};
  }

  return buildPageMetadata({
    title: `${page.title} | Landing Page`,
    description: page.description,
    path: `/landing/${page.slug}`,
  });
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = landingPages.filter(
    (entry) => entry.category === page.category && entry.slug !== page.slug,
  );
  const defaultLeadType = inferLeadTypeFromLanding(page.category, page.slug);

  const allFaqs = [
    ...getFaqsForCategory(page.category),
    ...getExtendedFaqsForCategory(page.category),
  ];
  const slugParts = page.slug.split("-");
  for (const part of slugParts) {
    const extra = [
      ...getFaqsForCategory(part),
      ...getExtendedFaqsForCategory(part),
    ];
    for (const item of extra) {
      if (!allFaqs.some((f) => f.q === item.q)) allFaqs.push(item);
    }
  }

  const landingSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: page.title,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        telephone: siteConfig.phone,
        email: siteConfig.email,
      },
      areaServed: [...siteConfig.neighborhoods, ...siteConfig.regions],
      description: page.description,
      url: `${siteConfig.siteUrl}/landing/${page.slug}`,
    },
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Landing Pages", path: "/landing" },
      { name: page.title, path: `/landing/${page.slug}` },
    ]),
    ...(allFaqs.length > 0 ? [buildFaqJsonLd(allFaqs.slice(0, 8))] : []),
  ];

  const topics = getCategoryTopic(page.category);
  const heroPublicId = getPageImage(page.slug, topics);
  const heroUrl = getCloudinaryAssetUrl(heroPublicId, {
    crop: "fill",
    gravity: "auto",
    width: 800,
    height: 600,
    quality: "auto",
    format: "auto",
  });

  return (
    <SiteShell>
      <JsonLd data={landingSchema} />

      <PageHero
        eyebrow={landingPageCategories[page.category]}
        title={page.title}
        description={page.description}
        primaryCta={{ href: "/intake", label: page.cta }}
        secondaryCta={{ href: "/landing", label: "All landing pages" }}
      >
        <div className="space-y-4">
          {heroUrl && (
            <div className="overflow-hidden rounded-[1.5rem]">
              <Image
                src={heroUrl}
                alt={page.title}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}
          <div className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-brand-cream p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-ink">
              Best fit
            </p>
            <p className="mt-3 text-sm leading-7 text-body-ink">{page.audience}</p>
          </div>
          <div className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-brand-cream p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-ink">
              Best next step
            </p>
            <p className="mt-3 text-sm leading-7 text-body-ink">
              {page.cta}
            </p>
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-14">
            <RevealSection>
              <SectionHeading
                eyebrow="Why this page exists"
                title="A more specific message converts better than a generic brand promise."
                description="Each landing page is one clear promise, one audience, and one next step inside the larger sylvestri.com operating system."
              />
              <div className="mt-8 grid gap-4">
                {page.benefits.map((benefit, i) => (
                  <RevealSection key={benefit} delay={i * 80}>
                    <div className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 text-base leading-7 text-body-ink">
                      {benefit}
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>

            <RevealSection>
              <SectionHeading
                eyebrow="Suggested sequence"
                title="How this landing page moves the lead forward."
                description="The pattern is always the same: capture the right context, route the lead correctly, and then hand the visitor toward the strongest next asset."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {page.steps.map((step, index) => (
                  <RevealSection key={step} delay={index * 100} direction="scale">
                    <div className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5">
                      <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-copper">
                        Stage {index + 1}
                      </div>
                      <p className="mt-3 text-base leading-7 text-body-ink">{step}</p>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </RevealSection>
          </div>

          <RevealSection direction="right" delay={150}>
            <LeadCaptureForm
              title="Landing-page intake"
              description="Use this when the visitor is ready for a real next step. The intake stays short, preserves source context, and gives Ryan enough detail to respond intelligently."
              submitLabel={page.cta}
              source={`landing:${page.slug}`}
              campaign={page.slug}
              defaultLeadType={defaultLeadType}
              leadMagnetOptions={getLeadMagnetsForLane(defaultLeadType)}
            />
          </RevealSection>
        </div>
      </section>

      {allFaqs.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <RevealSection>
            <SectionHeading
              eyebrow="Common questions"
              title="What people actually ask about this topic."
              description="Real questions from buyers, sellers, and homeowners in the Hudson Valley — answered clearly so you can move forward with confidence."
            />
          </RevealSection>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {allFaqs.slice(0, 8).map((item, i) => (
              <RevealSection key={i} delay={i * 70}>
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

      {relatedPages.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <RevealSection>
            <SectionHeading
              eyebrow="Related pages"
              title="Nearby pages in the same funnel family."
              description="These related pages let you catch adjacent intent without building entirely separate sites."
            />
          </RevealSection>
          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {relatedPages.map((entry, i) => {
              const relTopics = getCategoryTopic(entry.category);
              const relImageId = getPageImage(entry.slug, relTopics);
              const relImageUrl = getCloudinaryAssetUrl(relImageId, {
                crop: "fill",
                gravity: "auto",
                width: 600,
                height: 340,
                quality: "auto",
                format: "auto",
              });

              return (
                <RevealSection key={entry.slug} delay={i * 100} direction="scale">
                  <Link
                    href={`/landing/${entry.slug}`}
                    className="group block overflow-hidden rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 transition hover:border-brand-gold"
                  >
                    {relImageUrl && (
                      <Image
                        src={relImageUrl}
                        alt={entry.title}
                        width={600}
                        height={340}
                        className="h-44 w-full object-cover transition group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="p-7">
                      <h3 className="font-display text-3xl leading-tight text-brand-ink">
                        {entry.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-body-ink">{entry.description}</p>
                    </div>
                  </Link>
                </RevealSection>
              );
            })}
          </div>
        </section>
      ) : null}

      <GoogleReviewsPanel />
    </SiteShell>
  );
}
