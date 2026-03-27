import Image from "next/image";
import Link from "next/link";

import { GoogleReviewsPanel } from "@/components/google-reviews-panel";
import { ImmersiveStage } from "@/components/immersive-stage";
import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustStrip } from "@/components/trust-strip";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { coreLeadMagnets } from "@/lib/lead-magnets";
import {
  audienceRoutes,
  brandEcosystem,
  credibilityPills,
  operatingPrinciples,
  personalMedia,
  personalSiteConfig,
  selectedStories,
  storyMilestones,
} from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-content";

export const metadata = buildPageMetadata({
  title: "Hudson Valley Real Estate Broker, Systems Builder, and AI Operator",
  description:
    "Ryan Sylvestri's personal brand hub for Hudson Valley real estate, systems thinking, and applied AI, with clear routes for buyers, sellers, investors, renters, and future coaching clients.",
  path: "/",
});

const firstMinuteAnswers = [
  {
    title: "Who Ryan is",
    detail:
      "A Hudson Valley real-estate broker with a systems-minded, property-level lens shaped by technical training and real field experience.",
  },
  {
    title: "What Ryan does",
    detail:
      "Helps buyers, sellers, investors, renters, and relocation clients move with clearer strategy, then gives the AI and systems side its own lane.",
  },
  {
    title: "Why Ryan is credible",
    detail:
      "Brokerage experience, ABR and PSA designations, RE/MAX backing, contractor-adjacent property experience, and operator-grade follow-up thinking.",
  },
  {
    title: "Where to go next",
    detail:
      "Choose your lane, use the shared intake, and get routed into the strongest next step instead of one generic contact page.",
  },
];

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: personalSiteConfig.name,
    url: personalSiteConfig.siteUrl,
    description:
      "Personal hub for Ryan Sylvestri: Hudson Valley real estate, systems thinking, applied AI, and direct audience routing.",
    publisher: { "@id": localBusinessSchema["@id"] },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalSiteConfig.founderName,
    telephone: personalSiteConfig.phone,
    email: personalSiteConfig.email,
    jobTitle: "Licensed Associate Real Estate Broker",
    worksFor: { "@id": localBusinessSchema["@id"] },
    address: {
      "@type": "PostalAddress",
      streetAddress: "584 Route 9",
      addressLocality: "Fishkill",
      addressRegion: "NY",
      postalCode: "12524",
      addressCountry: "US",
    },
    sameAs: siteConfig.sameAs,
  },
];

export default function HomePage() {
  const featuredMarkets = siteConfig.neighborhoods.slice(0, 6);
  const featuredStats = siteConfig.stats.slice(0, 4);
  const headshotUrl = getCloudinaryAssetUrl(personalMedia.headshot, {
    crop: "fill",
    gravity: "face",
    width: 900,
    height: 900,
  });
  const portraitUrl = getCloudinaryAssetUrl(personalMedia.portrait, {
    crop: "fill",
    gravity: "auto",
    width: 1200,
    height: 900,
  });
  const systemsLogoUrl = getCloudinaryAssetUrl(personalMedia.systemsLogo, {
    crop: "fit",
    width: 900,
    height: 900,
  });
  const signUrl = getCloudinaryAssetUrl(personalMedia.sign, {
    crop: "fill",
    gravity: "auto",
    width: 1400,
    height: 960,
  });
  const ambientUrl = getCloudinaryAssetUrl(personalMedia.ambient, {
    crop: "fill",
    width: 1400,
    height: 1400,
  });

  return (
    <SiteShell>
      <JsonLd data={homeSchema} />

      <PageHero
        eyebrow="sylvestri.com"
        title="One personal brand with clearer paths for buyers, sellers, investors, renters, and AI clients."
        description="This site is built to route people fast. Buyers get clarity, sellers get valuation and launch strategy, investors get cleaner underwriting, renters get relocation help, and AI clients get the systems lane."
        primaryCta={{ href: "/intake", label: "Start here" }}
        secondaryCta={{ href: "/story", label: "Read the story" }}
      >
        <ImmersiveStage
          eyebrow="Personal brand hub"
          title="Not another generic agent page."
          detail="This is Ryan's front door: the human brand, the real-estate conversion engine, and the systems lane in one place."
          portraitUrl={headshotUrl}
          orbitLabels={["Buyers", "Sellers", "Investors", "AI / Systems"]}
        />
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {firstMinuteAnswers.map((item, i) => (
            <RevealSection key={item.title} delay={i * 100} direction="scale">
              <div className="mesh-panel rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                  {item.title}
                </p>
                <p className="mt-4 text-base leading-7 text-body-ink">{item.detail}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="mesh-panel glow-outline rounded-[2.25rem] border border-[rgba(15,23,42,0.08)] bg-white/88 px-6 py-7 lg:px-8 lg:py-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                Market footprint
              </p>
              <h2 className="font-display text-4xl leading-tight text-brand-ink md:text-5xl">
                Local Hudson Valley trust, with a cleaner route after the first click.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-body-ink">
                Ryan&apos;s name is the front door, but the site still does the real work: market
                focus, intent capture, audience routing, and the next step that actually matches
                the visitor.
              </p>
              <div className="flex flex-wrap gap-3">
                {featuredMarkets.map((market) => (
                  <span
                    key={market}
                    className="rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.92)] px-4 py-2 text-sm font-semibold text-brand-ink"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featuredStats.map((stat) => (
                <div
                  key={stat.label}
                  className="mesh-panel rounded-[1.65rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,252,247,0.94)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
                >
                  <div className="text-3xl font-semibold tracking-[-0.04em] text-brand-ink md:text-4xl">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-body-ink">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {credibilityPills.map((pill) => (
            <div
              key={pill}
              className="mesh-panel rounded-[1.6rem] border border-[rgba(15,23,42,0.08)] bg-white/84 px-5 py-4 text-sm font-medium leading-6 text-brand-ink shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              {pill}
            </div>
          ))}
        </div>
      </section>

      <TrustStrip />

      <section id="paths" className="mx-auto max-w-7xl px-6 py-18">
        <RevealSection>
          <SectionHeading
            eyebrow="Choose your lane"
            title="The homepage should route people fast."
            description="Each audience gets one clear promise, one path, and one next step. That keeps the personal brand broad without turning the site into a mess."
          />
        </RevealSection>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {audienceRoutes.map((route, index) => (
            <RevealSection key={route.href} delay={index * 100} direction="scale">
            <Link
              href={route.href}
              className="group mesh-panel relative block rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/84 p-7 transition hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-copper via-brand-gold to-brand-ink opacity-80" />
              <div className="absolute right-5 top-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-ink">
                0{index + 1}
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                {route.label}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-brand-ink">
                {route.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-body-ink">{route.promise}</p>
              <p className="mt-4 text-sm leading-6 text-muted-ink">{route.detail}</p>
              <p className="mt-6 text-sm font-semibold text-brand-ink transition group-hover:text-brand-copper">
                Explore this lane
              </p>
            </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,252,247,0.82)] px-6 py-18 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        {ambientUrl ? (
          <Image
            src={ambientUrl}
            alt=""
            aria-hidden
            width={512}
            height={512}
            className="pointer-events-none absolute right-[-14rem] top-[-8rem] h-[32rem] w-[32rem] opacity-10"
          />
        ) : null}
        <div className="relative z-10 grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(20,32,51,0.94)] shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
            {portraitUrl ? (
              <Image
                src={portraitUrl}
                alt={personalSiteConfig.founderName}
                width={1200}
                height={900}
                className="h-full min-h-[28rem] w-full object-cover"
              />
            ) : null}
          </div>
          <div>
            <SectionHeading
              eyebrow="Why this works"
              title="Ryan&apos;s background gives the site a different point of view."
              description="The strongest trust signals are already there: technical depth, property reality, brokerage experience, and a more deliberate operator lens."
            />
            <div className="mt-10 grid gap-4">
              {storyMilestones.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                    {item.phase}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <SectionHeading
          eyebrow="Brand stack"
          title="Each brand property should do one job well."
          description="The point is not to create random domains. It is to give each lane a clear role so the personal brand, the real-estate conversion engine, and the systems story reinforce each other."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {brandEcosystem.map((brand) => (
            <div
              key={brand.domain}
              className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                {brand.status}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-brand-ink">
                {brand.title}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-muted-ink">
                {brand.domain}
              </p>
              <p className="mt-5 text-base leading-8 text-body-ink">{brand.summary}</p>
              <Link
                href={brand.href}
                className="mt-6 inline-flex rounded-full border border-[rgba(15,23,42,0.12)] px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
              >
                Open this lane
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="mesh-panel overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(20,32,51,0.96)] p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              Core operating principle
            </p>
            <h2 className="mt-4 font-display text-5xl leading-tight">
              Real estate stays revenue-close, and the systems side amplifies it.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/74">
              The site should make it obvious that Ryan helps people buy, sell, invest, rent, and
              relocate in the Hudson Valley while still giving the operator, automation, and AI
              work a defined place to live.
            </p>
            <div className="mt-8 grid gap-3">
              {operatingPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/78"
                >
                  {principle}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="mesh-panel overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              {signUrl ? (
                <Image
                  src={signUrl}
                  alt="Ryan Sylvestri real-estate branding"
                  width={1400}
                  height={960}
                  className="h-[15rem] w-full object-cover"
                />
              ) : null}
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                  Real-estate lane
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                  Buyer clarity, seller certainty, and local trust.
                </h3>
                <p className="mt-3 text-base leading-7 text-body-ink">
                  This is the client-facing engine: buyers, sellers, investors, renters, and all
                  the real-estate offers that need clean intake and stronger follow-up.
                </p>
              </div>
            </div>

            <div className="mesh-panel overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              {systemsLogoUrl ? (
                <Image
                  src={systemsLogoUrl}
                  alt="Sylvestri Systems"
                  width={900}
                  height={900}
                  className="h-[15rem] w-full object-cover"
                />
              ) : null}
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                  Systems lane
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                  Automation, AI workflows, and leverage.
                </h3>
                <p className="mt-3 text-base leading-7 text-body-ink">
                  This is where the operator side can grow into media, products, and implementation
                  without diluting the main real-estate conversion path.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <SectionHeading
              eyebrow="Stories to build out"
              title="These are the narrative blocks worth expanding next."
              description="These story cards can grow into deeper content, media, or dedicated pages as the brand keeps compounding."
            />
            <div className="mt-10 grid gap-4">
              {selectedStories.map((story) => (
                <div
                  key={story.title}
                  className="mesh-panel rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-white/84 p-6"
                >
                  <h3 className="font-display text-3xl leading-tight text-brand-ink">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">{story.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <LeadCaptureForm
              title="Start here"
              description="Tell Ryan what you are trying to do and where you are getting stuck. The shared intake will carry the source context and route the next step correctly."
              submitLabel="Send my details"
              source="homepage"
              campaign="sylvestri-home"
              defaultLeadType="agent-match"
              leadMagnetOptions={coreLeadMagnets}
            />
          </div>
        </div>
      </section>

      <GoogleReviewsPanel />
      <TestimonialsSection />
      <NewsletterSignup source="homepage-newsletter" campaign="sylvestri-newsletter-home" />
    </SiteShell>
  );
}
