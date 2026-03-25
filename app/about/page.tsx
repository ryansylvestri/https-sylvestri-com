import type { Metadata } from "next";

import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import {
  credibilityPills,
  operatingPrinciples,
  personalMedia,
  personalSiteConfig,
  storyMilestones,
} from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "About",
  description: "About Ryan Sylvestri: local credibility, operating style, and the thinking behind the personal brand.",
};

export default function AboutPage() {
  const portraitUrl = getCloudinaryAssetUrl(personalMedia.portrait, {
    crop: "fill",
    gravity: "auto",
    width: 1200,
    height: 900,
  });

  return (
    <SiteShell>
      <PageHero
        eyebrow="About Ryan Sylvestri"
        title="Local broker, operator, and builder in one coherent personal brand."
        description={`${personalSiteConfig.founderName} is building sylvestri.com as the umbrella for Hudson Valley real estate, systems thinking, and applied AI, with a reputation shaped by practical property experience and direct client guidance.`}
        primaryCta={{ href: "/intake", label: "Start the conversation" }}
        secondaryCta={{ href: "/story", label: "Read the full story" }}
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(20,32,51,0.96)]">
          {portraitUrl ? (
            <img
              src={portraitUrl}
              alt={personalSiteConfig.founderName}
              className="h-[28rem] w-full object-cover"
            />
          ) : null}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <SectionHeading
          eyebrow="At a glance"
          title="What is clear in the first minute"
          description="This page is not trying to say everything. It is trying to establish trust, context, and why this brand approaches Hudson Valley real estate differently."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {credibilityPills.map((pill) => (
            <div
              key={pill}
              className="rounded-[1.6rem] border border-[rgba(15,23,42,0.08)] bg-white/80 px-5 py-4 text-sm font-medium leading-6 text-brand-ink"
            >
              {pill}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <SectionHeading
              eyebrow="Current positioning"
              title="A stronger brand summary"
              description={`${personalSiteConfig.founderName} is an Associate Real Estate Broker based in Fishkill, New York. sylvestri.com brings together local real-estate service, systems thinking, property-level pragmatism, and a cleaner routing model for different client situations.`}
            />
            <div className="mt-10 grid gap-4">
              {storyMilestones.slice(0, 3).map((item) => (
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

          <LeadCaptureForm
            title="Start a conversation"
            description="Use the shared intake to start the conversation while the dedicated audience paths keep getting sharper."
            submitLabel="Send details"
            source="about-page"
            campaign="sylvestri-about"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading
          eyebrow="How the brand works"
          title="Operator principles"
          description="This is the current language for how the site frames the style and philosophy behind the work."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {operatingPrinciples.map((principle) => (
            <div
              key={principle}
              className="rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6 text-base leading-7 text-body-ink"
            >
              {principle}
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
