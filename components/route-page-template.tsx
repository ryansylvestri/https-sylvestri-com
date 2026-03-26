import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { getFaqsForCategory } from "@/lib/faq-content";
import { getExtendedFaqsForCategory } from "@/lib/faq-content-extended";
import { guideTopics, type GuideTopic } from "@/lib/guide-topics";
import { type RoutePageContent } from "@/lib/personal-brand-content";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-content";

type RoutePageTemplateProps = {
  page: RoutePageContent;
};

function getLaneTheme(defaultInterest?: string) {
  switch (defaultInterest) {
    case "buyer":
      return {
        badgeClass: "border-sky-200/90 bg-sky-50/90 text-sky-800",
        accentClass: "text-sky-700",
        surfaceClass: "border-sky-100/90 bg-[rgba(244,250,255,0.9)]",
        stripClass: "from-sky-500 via-brand-sky to-brand-ink",
        panelClass:
          "border-sky-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_24%),linear-gradient(160deg,_rgba(247,251,255,0.95)_0%,_rgba(234,245,255,0.92)_100%)]",
        ctaClass:
          "bg-[linear-gradient(135deg,_rgba(8,47,73,0.98),_rgba(37,99,235,0.92),_rgba(20,32,51,0.98))]",
      };
    case "seller":
      return {
        badgeClass: "border-amber-200/90 bg-amber-50/90 text-amber-900",
        accentClass: "text-amber-700",
        surfaceClass: "border-amber-100/90 bg-[rgba(255,249,239,0.92)]",
        stripClass: "from-brand-copper via-brand-gold to-brand-ink",
        panelClass:
          "border-amber-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.22),_transparent_24%),linear-gradient(160deg,_rgba(255,251,244,0.95)_0%,_rgba(255,244,226,0.92)_100%)]",
        ctaClass:
          "bg-[linear-gradient(135deg,_rgba(69,26,3,0.98),_rgba(183,90,36,0.94),_rgba(20,32,51,0.98))]",
      };
    case "investor":
      return {
        badgeClass: "border-emerald-200/90 bg-emerald-50/90 text-emerald-900",
        accentClass: "text-emerald-700",
        surfaceClass: "border-emerald-100/90 bg-[rgba(241,253,248,0.92)]",
        stripClass: "from-emerald-500 via-brand-forest to-brand-ink",
        panelClass:
          "border-emerald-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.2),_transparent_24%),linear-gradient(160deg,_rgba(246,254,250,0.95)_0%,_rgba(233,248,242,0.92)_100%)]",
        ctaClass:
          "bg-[linear-gradient(135deg,_rgba(6,78,59,0.98),_rgba(16,185,129,0.92),_rgba(20,32,51,0.98))]",
      };
    case "renter":
      return {
        badgeClass: "border-indigo-200/90 bg-indigo-50/90 text-indigo-900",
        accentClass: "text-indigo-700",
        surfaceClass: "border-indigo-100/90 bg-[rgba(245,246,255,0.92)]",
        stripClass: "from-indigo-500 via-brand-sky to-brand-ink",
        panelClass:
          "border-indigo-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.22),_transparent_24%),linear-gradient(160deg,_rgba(248,249,255,0.95)_0%,_rgba(238,241,255,0.92)_100%)]",
        ctaClass:
          "bg-[linear-gradient(135deg,_rgba(49,46,129,0.98),_rgba(79,70,229,0.92),_rgba(20,32,51,0.98))]",
      };
    default:
      return {
        badgeClass: "border-fuchsia-200/90 bg-fuchsia-50/90 text-fuchsia-900",
        accentClass: "text-fuchsia-700",
        surfaceClass: "border-fuchsia-100/90 bg-[rgba(253,245,255,0.92)]",
        stripClass: "from-fuchsia-500 via-brand-plum to-brand-ink",
        panelClass:
          "border-fuchsia-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(217,70,239,0.22),_transparent_24%),linear-gradient(160deg,_rgba(253,248,255,0.95)_0%,_rgba(247,236,252,0.92)_100%)]",
        ctaClass:
          "bg-[linear-gradient(135deg,_rgba(88,28,135,0.98),_rgba(168,85,247,0.92),_rgba(20,32,51,0.98))]",
      };
  }
}

function getRelatedGuides(interest?: string): GuideTopic[] {
  const categoryMap: Record<string, GuideTopic["category"][]> = {
    buyer: ["buyer", "lifestyle"],
    seller: ["seller", "process"],
    investor: ["investor"],
    renter: ["lifestyle"],
  };
  const categories = interest ? categoryMap[interest] ?? [] : [];
  if (categories.length === 0) return [];
  return guideTopics.filter((g) => categories.includes(g.category)).slice(0, 6);
}

function getServiceSchema(page: RoutePageContent) {
  const serviceMap: Record<string, { name: string; description: string }> = {
    buyer: {
      name: "Buyer Representation — Hudson Valley",
      description:
        "Structured buyer planning for first-time buyers, relocations, and move-up searchers across Dutchess, Putnam, Orange, and Ulster counties.",
    },
    seller: {
      name: "Seller Launch Strategy — Hudson Valley",
      description:
        "Human valuation, pricing strategy, prep planning, and listing launch for homeowners across the Hudson Valley.",
    },
    investor: {
      name: "Investor Intake — Hudson Valley",
      description:
        "Criteria-first intake for value-add, multifamily, flip, rental, and opportunistic investment opportunities in the Hudson Valley.",
    },
    renter: {
      name: "Relocation & Rental Guidance — Hudson Valley",
      description:
        "Town-matching, commute analysis, and lifestyle-fit orientation for renters and inbound Hudson Valley movers.",
    },
  };
  const interest = page.leadForm.defaultInterest ?? "";
  const service = serviceMap[interest];
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": localBusinessSchema["@id"] },
    areaServed: siteConfig.regions.map((r) => ({
      "@type": "AdministrativeArea",
      name: r,
    })),
    url: `${siteConfig.siteUrl}/${interest === "renter" ? "renters" : interest + "s"}`,
  };
}

function getFaqSchema(interest?: string) {
  const faqKeyMap: Record<string, string[]> = {
    buyer: ["buyers"],
    seller: ["sellers"],
    investor: ["investors"],
    renter: ["renters", "relocation"],
  };
  const keys = interest ? faqKeyMap[interest] ?? [] : [];
  if (keys.length === 0) return null;

  const faqs = keys.flatMap((k) => [...getFaqsForCategory(k), ...getExtendedFaqsForCategory(k)]);
  if (faqs.length === 0) return null;

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

export function RoutePageTemplate({ page }: RoutePageTemplateProps) {
  const theme = getLaneTheme(page.leadForm.defaultInterest);
  const relatedGuides = getRelatedGuides(page.leadForm.defaultInterest);
  const serviceSchema = getServiceSchema(page);
  const faqSchema = getFaqSchema(page.leadForm.defaultInterest);
  const heroImageUrl = page.heroImageId
    ? getCloudinaryAssetUrl(page.heroImageId, {
        crop: "fill",
        gravity: "auto",
        width: 1200,
        height: 1400,
      })
    : "";
  const detailImageUrl = page.detailImageId
    ? getCloudinaryAssetUrl(page.detailImageId, {
        crop: "fill",
        gravity: "auto",
        width: 1400,
        height: 900,
      })
    : "";

  return (
    <SiteShell>
      {serviceSchema ? <JsonLd data={serviceSchema} /> : null}
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        primaryCta={page.primaryCta}
        secondaryCta={page.secondaryCta}
      >
        <div className="space-y-5">
          {heroImageUrl ? (
            <div
              className={`mesh-panel overflow-hidden rounded-[1.9rem] border ${theme.panelClass} shadow-[0_24px_70px_rgba(15,23,42,0.12)]`}
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.stripClass}`} />
              <img src={heroImageUrl} alt={page.title} className="h-[24rem] w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(20,32,51,0.75)] to-transparent" />
              <div
                className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] shadow-[0_10px_30px_rgba(15,23,42,0.12)] ${theme.badgeClass}`}
              >
                {page.eyebrow}
              </div>
            </div>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-3">
            {page.quickPoints.map((point, index) => (
              <div
                key={point}
                className={`mesh-panel rounded-[1.25rem] border px-4 py-4 text-sm leading-6 text-body-ink ${theme.surfaceClass}`}
              >
                <div className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${theme.accentClass}`}>
                  0{index + 1}
                </div>
                <div className="mt-2">{point}</div>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className={`mesh-panel glow-outline rounded-[2rem] border p-7 lg:p-8 ${theme.panelClass}`}>
          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div className="space-y-4">
              <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${theme.accentClass}`}>
                What this lane feels like
              </p>
              <h2 className="font-display text-4xl leading-tight text-brand-ink">
                Clear local guidance, cleaner follow-up, and one obvious next step.
              </h2>
              <p className="text-base leading-8 text-body-ink">
                The structure is built so Ryan can guide the right person into the right
                conversation without burying them in a generic funnel.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {page.fitCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.5rem] border border-white/70 bg-white/78 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                >
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${theme.accentClass}`}>
                    Best fit
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-brand-ink">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <SectionHeading
          eyebrow="Good fit"
          title="Who this lane is really for"
          description="This lane is intentionally structured so each audience gets a clearer next step and better follow-up context."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {page.fitCards.map((card) => (
            <div
              key={card.title}
              className={`mesh-panel rounded-[1.9rem] border p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${theme.surfaceClass}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.stripClass}`} />
              <h2 className="font-display text-3xl leading-tight text-brand-ink">{card.title}</h2>
              <p className="mt-4 text-base leading-7 text-body-ink">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="The page moves from clarity to action"
              description="Each lane needs a simple structure: identify the situation, explain the angle, reduce friction, and offer one clean CTA."
            />
            <div className="mt-10 grid gap-4">
              {page.process.map((step, index) => (
                <div
                  key={step.title}
                  className={`mesh-panel rounded-[1.6rem] border p-6 ${theme.surfaceClass}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${theme.stripClass}`} />
                  <p className={`text-sm font-semibold uppercase tracking-[0.28em] ${theme.accentClass}`}>
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-body-ink">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {detailImageUrl ? (
              <div
                className={`mesh-panel overflow-hidden rounded-[2rem] border shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${theme.panelClass}`}
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${theme.stripClass}`} />
                <img
                  src={detailImageUrl}
                  alt={`${page.eyebrow} visual`}
                  className="h-[20rem] w-full object-cover"
                />
              </div>
            ) : null}

            <LeadCaptureForm
              title={page.leadForm.title}
              description={page.leadForm.description}
              submitLabel={page.leadForm.submitLabel}
              source={page.leadForm.source}
              campaign={page.leadForm.campaign}
              defaultInterest={page.leadForm.defaultInterest}
            />
          </div>
        </div>
      </section>

      {/* ── Related guides (hub-and-spoke SEO) ── */}
      {relatedGuides.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-18">
          <RevealSection>
            <SectionHeading
              eyebrow="Go deeper"
              title="Free guides for your situation"
              description="Each guide covers one topic in depth — the specific answers that help you move forward with confidence."
            />
          </RevealSection>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((guide, i) => (
              <RevealSection key={guide.slug} delay={i * 80} direction="scale">
                <Link
                  href={`/guides/${guide.slug}`}
                  className={`group block rounded-[1.9rem] border p-7 transition hover:border-brand-gold ${theme.surfaceClass}`}
                >
                  <h3 className="font-display text-xl leading-tight text-brand-ink transition group-hover:text-brand-gold">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-body-ink">
                    {guide.description}
                  </p>
                </Link>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className={`rounded-[2.25rem] border border-[rgba(15,23,42,0.08)] px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] ${theme.ctaClass}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Next step
              </p>
              <h2 className="font-display text-4xl leading-tight">
                If this sounds like your situation, start the conversation now.
              </h2>
              <p className="text-base leading-7 text-white/72">
                The goal is simple: turn a vague inquiry into a clear next step with better context,
                better follow-up, and less wasted motion.
              </p>
            </div>
            <Link
              href="/intake"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-gold"
            >
              Open the shared intake
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
