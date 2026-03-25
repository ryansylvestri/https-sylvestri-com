import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import {
  getLandingPage,
  landingPageCategories,
  landingPages,
  siteConfig,
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/landing/${page.slug}`,
    },
  };
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

  const landingSchema = {
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
  };

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
            <div>
              <SectionHeading
                eyebrow="Why this page exists"
                title="A more specific message converts better than a generic brand promise."
                description="Each landing page is one clear promise, one audience, and one next step inside the larger sylvestri.com operating system."
              />
              <div className="mt-8 grid gap-4">
                {page.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 text-base leading-7 text-body-ink"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Suggested sequence"
                title="How this landing page moves the lead forward."
                description="The pattern is always the same: capture the right context, route the lead correctly, and then hand the visitor toward the strongest next asset."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {page.steps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5"
                  >
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-copper">
                      Stage {index + 1}
                    </div>
                    <p className="mt-3 text-base leading-7 text-body-ink">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <LeadCaptureForm
            title="Landing-page intake"
            description="Use this when the visitor is ready for a real next step. The intake stays short, preserves source context, and gives Ryan enough detail to respond intelligently."
            submitLabel={page.cta}
            source={`landing:${page.slug}`}
            campaign={page.slug}
          />
        </div>
      </section>

      {relatedPages.length > 0 ? (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <SectionHeading
            eyebrow="Related pages"
            title="Nearby pages in the same funnel family."
            description="These related pages let you catch adjacent intent without building entirely separate sites."
          />
          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {relatedPages.map((entry) => (
              <Link
                key={entry.slug}
                href={`/landing/${entry.slug}`}
                className="rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold"
              >
                <h3 className="font-display text-3xl leading-tight text-brand-ink">
                  {entry.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-body-ink">{entry.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
