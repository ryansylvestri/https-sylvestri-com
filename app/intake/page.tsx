import type { Metadata } from "next";

import { ImmersiveStage } from "@/components/immersive-stage";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { personalMedia } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Start Here",
  description:
    "Shared intake page for sylvestri.com with one clean first step for buyers, sellers, investors, renters, and AI or referral conversations.",
};

export default function IntakePage() {
  const headshotUrl = getCloudinaryAssetUrl(personalMedia.headshot, {
    crop: "fill",
    gravity: "face",
    width: 900,
    height: 900,
  });

  return (
    <SiteShell>
      <PageHero
        eyebrow="Shared intake"
        title="One clean intake for the whole sylvestri.com brand stack."
        description="This is the neutral entry point for buyers, sellers, investors, renters, referrals, and systems conversations. It keeps the first touch short without losing the context Ryan needs."
        primaryCta={{ href: "/", label: "Back to home" }}
        secondaryCta={{ href: "/brands", label: "See the brand map" }}
      >
        <ImmersiveStage
          eyebrow="Capture once"
          title="Then route correctly."
          detail="The intake works across buyers, sellers, investors, renters, relocation, and the AI / systems lane without forcing five separate backends."
          portraitUrl={headshotUrl}
          orbitLabels={["Buyer", "Seller", "Investor", "AI / Coaching"]}
        />
      </PageHero>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <LeadCaptureForm
          title="Shared intake form"
          description="Use the common intake to start the conversation. As the site evolves, it can stay central or split into lane-specific variants without changing the routing model."
          submitLabel="Submit details"
          source="intake-page"
          campaign="sylvestri-intake"
        />
      </section>
    </SiteShell>
  );
}
