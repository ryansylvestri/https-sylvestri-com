import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ImmersiveStage } from "@/components/immersive-stage";
import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { coreLeadMagnets } from "@/lib/lead-magnets";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { brandEntries, getBrandEntry, landingPages, squeezePages } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return brandEntries.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandEntry(slug);

  if (!brand) {
    return {};
  }

  return buildPageMetadata({
    title: brand.name,
    description: brand.summary,
    path: `/brands/${brand.slug}`,
  });
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrandEntry(slug);

  if (!brand) {
    notFound();
  }

  const relatedLandingPages = landingPages.filter((page) =>
    page.sourceBrands.includes(brand.name),
  );
  const relatedSqueezePages = squeezePages.filter((page) =>
    page.sourceBrands.includes(brand.name),
  );

  return (
    <SiteShell>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ])}
      />
      <PageHero
        eyebrow={`${brand.role} brand`}
        title={brand.name}
        description={brand.summary}
        primaryCta={{ href: brand.primaryHref, label: brand.primaryLabel }}
        secondaryCta={{ href: "/brands", label: "All brands" }}
      >
        <ImmersiveStage
          eyebrow={brand.domainLabel}
          title={brand.headline}
          detail={brand.audience}
        />
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-14">
            <div>
              <SectionHeading
                eyebrow="Role"
                title="What this brand does."
                description="A domain becomes useful once its role is explicit. That applies whether the domain is live now or still parked."
              />
              <div className="mt-8 grid gap-4">
                {brand.promise.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 text-base leading-7 text-body-ink"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {relatedLandingPages.length > 0 ? (
              <div>
                <SectionHeading
                  eyebrow="Landing handoff"
                  title="Canonical landing pages connected to this brand."
                  description="These are the deeper pages this brand sends traffic into once the first click or opt-in happens."
                />
                <div className="mt-8 grid gap-4">
                  {relatedLandingPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/landing/${page.slug}`}
                      className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 transition hover:border-brand-gold"
                    >
                      <h2 className="font-display text-3xl leading-tight text-brand-ink">
                        {page.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-body-ink">{page.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedSqueezePages.length > 0 ? (
              <div>
                <SectionHeading
                  eyebrow="Fast entry pages"
                  title="Squeeze pages that fit this brand's voice."
                  description="Use these pages when the first conversion needs to stay quick and light before the canonical site takes over."
                />
                <div className="mt-8 grid gap-4">
                  {relatedSqueezePages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/squeeze/${page.slug}`}
                      className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 transition hover:border-brand-gold"
                    >
                      <h2 className="font-display text-3xl leading-tight text-brand-ink">
                        {page.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-body-ink">{page.subheadline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <LeadCaptureForm
            title={`${brand.name} intake`}
            description="This form keeps the source brand attached to the lead so the n8n router can tag and route it correctly downstream."
            submitLabel="Submit brand lead"
            source={`brand:${brand.slug}`}
            campaign={brand.slug}
            defaultLeadType="agent-match"
            leadMagnetOptions={coreLeadMagnets}
          />
        </div>
      </section>
    </SiteShell>
  );
}
