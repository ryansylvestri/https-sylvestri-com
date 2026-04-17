import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SiteShell } from "@/components/site-shell";
import { buildLeadAutoresponderPlan } from "@/lib/lead-autoresponder";
import {
  coreLeadMagnets,
  getLeadMagnetBySlug,
  getLeadMagnetHref,
} from "@/lib/lead-magnets";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return coreLeadMagnets.map((magnet) => ({ slug: magnet.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const magnet = getLeadMagnetBySlug(slug);

  if (!magnet) return {};

  return buildPageMetadata({
    title: magnet.label,
    description: magnet.summary,
    path: getLeadMagnetHref(magnet.slug),
  });
}

export default async function LeadMagnetDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const magnet = getLeadMagnetBySlug(slug);
  if (!magnet) notFound();

  const sequencePlan = buildLeadAutoresponderPlan({
    fullName: "Lead Magnet Preview",
    email: "preview@example.com",
    leadType: magnet.lane,
    leadMagnet: magnet.value,
    source: "lead-magnet-preview",
    campaign: magnet.slug,
    sourcePath: getLeadMagnetHref(magnet.slug),
    consentEmail: true,
    consentSms: false,
  });

  return (
    <SiteShell>
      <PageHero
        eyebrow="Lead magnet"
        title={magnet.label}
        description={magnet.summary}
        primaryCta={{ href: "#request", label: "Request this guide" }}
        secondaryCta={{ href: magnet.resourceHref, label: "Preview the route" }}
      >
        <div className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-copper">
            Delivery promise
          </p>
          <p className="mt-3 text-lg leading-8 text-body-ink">{magnet.deliveryLabel}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sequencePlan.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[1.2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] px-4 py-3 text-sm leading-6 text-body-ink"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-6">
            <div className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-copper">
                Sequence timing
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                {sequencePlan.sequenceLabel}
              </h2>
              <p className="mt-3 text-base leading-7 text-body-ink">
                Delivery target: {sequencePlan.deliveryWindow}. This route stays tied to the
                canonical site lead contract so delivery, attribution, and follow-up all move
                through the same system.
              </p>
              <div className="mt-6 grid gap-4">
                {sequencePlan.followUps.map((step) => (
                  <div
                    key={`${step.offsetHours}-${step.objective}`}
                    className="rounded-[1.2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] px-4 py-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-copper">
                      {step.offsetHours === 0 ? "Immediate" : `${step.offsetHours} hours`}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-body-ink">{step.objective}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-copper">
                Operator notes
              </p>
              <div className="mt-4 grid gap-3">
                {sequencePlan.operatorNotes.map((note) => (
                  <p
                    key={note}
                    className="rounded-[1.1rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] px-4 py-3 text-sm leading-6 text-body-ink"
                  >
                    {note}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/lead-magnets"
                  className="rounded-full border border-[rgba(15,23,42,0.14)] bg-white px-5 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
                >
                  All lead magnets
                </Link>
                <Link
                  href={magnet.resourceHref}
                  className="rounded-full bg-brand-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-copper"
                >
                  Preview related route
                </Link>
              </div>
            </div>
          </div>

          <div id="request" className="lg:sticky lg:top-8">
            <LeadCaptureForm
              title={`Request ${magnet.label}`}
              description="This request stays gated behind the shared lead contract so delivery, attribution, and follow-up all move through one system."
              submitLabel="Request this guide"
              source={`lead-magnet:${magnet.slug}`}
              campaign={magnet.slug}
              defaultLeadType={magnet.lane}
              defaultLeadMagnet={magnet.value}
              leadMagnetOptions={[magnet]}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
