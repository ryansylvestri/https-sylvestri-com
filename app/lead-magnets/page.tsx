import { LeadCaptureForm } from "@/components/lead-capture-form";
import { SiteShell } from "@/components/site-shell";
import { coreLeadMagnets } from "@/lib/lead-magnets";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Lead Magnets",
  description:
    "Request the five core Hudson Valley buyer, seller, investor, relocation, and divorce/seller guides.",
  path: "/lead-magnets",
});

export default function LeadMagnetsPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
          Guide library
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-brand-ink md:text-6xl">
          Five core lead magnets, one clean request flow
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-body-ink">
          Choose the guide that matches your situation and submit once. Delivery and follow-up
          sequence are triggered from the same lead contract.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreLeadMagnets.map((item) => (
            <div
              key={item.value}
              className="rounded-[1.7rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-copper">
                Lead magnet
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-brand-ink">{item.label}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <LeadCaptureForm
          title="Request a guide"
          description="Pick one lead magnet and submit your details. The request is routed with source + campaign metadata for immediate follow-up."
          submitLabel="Send my guide"
          source="lead-magnets-page"
          campaign="lead-magnets"
          defaultLeadType="agent-match"
          leadMagnetOptions={coreLeadMagnets}
        />
      </section>
    </SiteShell>
  );
}
