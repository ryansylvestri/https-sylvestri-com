import { ImmersiveStage } from "@/components/immersive-stage";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import { coreLeadMagnets } from "@/lib/lead-magnets";
import { buildPageMetadata } from "@/lib/seo";
import { brandEntries } from "@/lib/site-content";

export const metadata = buildPageMetadata({
  title: "Network Architecture",
  description:
    "Brand, domain, media, CRM, and intake-routing architecture for the sylvestri.com ecosystem.",
  path: "/network",
  noIndex: true,
});

const systemBlocks = [
  {
    title: "Domain registry",
    text: "Every domain gets one clear role: canonical hub, feeder brand, or systems layer. That keeps future acquisitions from becoming random parked clutter.",
  },
  {
    title: "Cloudinary media layer",
    text: "Media lives in Cloudinary so all brands can share one asset pipeline, transformation layer, and delivery origin.",
  },
  {
    title: "n8n intake router",
    text: "All form submissions hit a single n8n webhook that validates, enriches, tags, and forwards the lead into Follow Up Boss.",
  },
  {
    title: "Follow Up Boss handoff",
    text: "After validation and tagging, the workflow creates or updates the person, attaches source metadata, and triggers the correct assignment or follow-up sequence.",
  },
];

export default function NetworkPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Network architecture"
        title="This is a multi-domain lead system, not just a website."
        description="The front end, media, automation, and CRM layers are being shaped so new domains can slot into one architecture instead of creating more fragmentation."
        primaryCta={{ href: "/intake", label: "Use the intake layer" }}
        secondaryCta={{ href: "/brands", label: "See domain roles" }}
      >
        <ImmersiveStage
          eyebrow="Systems Layer"
          title="Cloudinary + n8n + Follow Up Boss"
          detail="The visual stage mirrors the architecture: one core engine, multiple orbital entry points, and a backend that routes every signal into the same operating spine."
        />
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <SectionHeading
          eyebrow="System blocks"
          title="The stack is intentionally modular."
          description="This lets you add new domains, new offers, and new campaigns later without rebuilding the core every time."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {systemBlocks.map((block) => (
            <div
              key={block.title}
              className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7"
            >
              <h2 className="font-display text-3xl leading-tight text-brand-ink">
                {block.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-body-ink">{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div>
            <SectionHeading
              eyebrow="Domain roles"
              title="Each domain has a job."
              description="Even if some URLs are still parked, they become useful once each one is mapped to a distinct funnel responsibility under the main sylvestri.com system."
            />
            <div className="mt-10 grid gap-4">
              {brandEntries.map((brand) => (
                <div
                  key={brand.slug}
                  className="rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                    {brand.role}
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                    {brand.name}
                  </h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted-ink">
                    {brand.domainLabel}
                  </p>
                  <p className="mt-4 text-base leading-7 text-body-ink">{brand.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <LeadCaptureForm
            title="Network intake"
            description="Use this for routed leads, partner referrals, or any situation where the right agent match matters more than a specific page path."
            submitLabel="Submit network lead"
            source="network-page"
            campaign="sylvestri-network"
            defaultLeadType="agent-match"
            leadMagnetOptions={coreLeadMagnets}
          />
        </div>
      </section>
    </SiteShell>
  );
}
