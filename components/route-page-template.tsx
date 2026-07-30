import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import type { EditorialCorePage } from "@/lib/editorial-core-pages";
import { guideTopics } from "@/lib/guide-topics";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";

export function RoutePageTemplate({ page }: { page: EditorialCorePage }) {
  const image =
    page.slug === "renters"
      ? "/images/hudson-valley-editorial-hero.webp"
      : "/images/hudson-valley-editorial-home.webp";
  const relatedGuides = guideTopics
    .filter((guide) => guide.category === page.resourceCategory)
    .slice(0, 4);
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: page.eyebrow, path: `/${page.slug}` },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.eyebrow,
    description: page.description,
    url: absoluteUrl(`/${page.slug}`),
    provider: {
      "@type": "Person",
      name: "Ryan Sylvestri",
      url: absoluteUrl("/about"),
    },
  };

  return (
    <SiteShell>
      <JsonLd data={[breadcrumbs, serviceSchema]} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        primaryCta={{ href: "#process", label: "See the process" }}
        secondaryCta={{ href: "#contact", label: "Ask Ryan" }}
      >
        <Image
          src={image}
          alt={page.imageAlt}
          width={1400}
          height={980}
          priority
          sizes="(max-width: 1024px) 100vw, 44vw"
          className="aspect-[10/7] w-full border border-[rgba(20,32,51,0.18)] object-cover"
        />
      </PageHero>

      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-brand-copper">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{page.eyebrow}</li>
        </ol>
      </nav>

      <section id="process" className="editorial-section scroll-mt-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Practical process"
            title="A clear sequence for the work ahead."
            description="The details change with every property and person. These stages keep the important questions visible without pretending every answer is known at the start."
          />
          <ol className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {page.process.map((step, index) => (
              <li key={step.title} className="editorial-card">
                <span className="text-xs font-bold text-brand-copper">0{index + 1}</span>
                <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">{step.title}</h2>
                <p className="mt-4 text-base leading-8 text-body-ink">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="editorial-section bg-[#f4ede3]">
        <div className="site-container">
          <SectionHeading
            eyebrow="Continue learning"
            title="Related educational resources."
            description="Use these guides to prepare better questions and understand the next decision."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {relatedGuides.map((guide) => (
              <article key={guide.slug} className="border-t border-[rgba(20,32,51,0.22)] pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-copper">{guide.category}</p>
                <h2 className="mt-3 font-display text-2xl leading-tight text-brand-ink">
                  <Link href={`/guides/${guide.slug}`} className="hover:text-brand-copper">{guide.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-7 text-body-ink">{guide.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="editorial-section scroll-mt-24">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Contextual next step</p>
            <h2 className="section-title mt-4">{page.cta.title}</h2>
            <p className="section-copy mt-5">{page.cta.description}</p>
            <p className="mt-5 text-sm leading-7 text-muted-ink">
              No outcome, response time, or service availability is promised. This form starts a conversation.
            </p>
          </div>
          <LeadCaptureForm
            title={page.cta.title}
            description={page.cta.description}
            submitLabel={page.cta.submitLabel}
            source={page.cta.source}
            campaign={page.cta.campaign}
            defaultInterest={page.cta.leadType}
            defaultLeadType={page.cta.leadType}
            leadMagnetOptions={[]}
          />
        </div>
      </section>
    </SiteShell>
  );
}
