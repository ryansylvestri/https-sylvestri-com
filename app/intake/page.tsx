import Link from "next/link";

import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Ryan",
  description:
    "Contact Ryan Sylvestri with a Hudson Valley real estate, property, technology, or editorial question.",
  path: "/intake",
});

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact Ryan"
        title="Share the question and the context around it."
        description="Use this page for a Hudson Valley real estate, property, technology, or editorial question. Include the details that would make a first response more useful."
        primaryCta={{ href: "#contact-form", label: "Go to the form" }}
        secondaryCta={{ href: "/", label: "Back home" }}
      />
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Contact Ryan</span>
      </nav>
      <section id="contact-form" className="editorial-section scroll-mt-24">
        <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Before you send</p>
            <h2 className="section-title mt-4">A little context goes a long way.</h2>
            <ul className="mt-7 space-y-4 text-sm leading-7 text-body-ink">
              <li className="border-t border-[rgba(20,32,51,0.18)] pt-4">What decision are you trying to make?</li>
              <li className="border-t border-[rgba(20,32,51,0.18)] pt-4">What timing, location, or property details matter?</li>
              <li className="border-t border-[rgba(20,32,51,0.18)] pt-4">Which facts are known, and which still need verification?</li>
            </ul>
            <p className="mt-7 text-xs leading-6 text-muted-ink">
              Submitting this form does not create an agency, advisory, or professional-client relationship.
            </p>
          </div>
          <LeadCaptureForm
            title="Contact Ryan"
            description="Tell Ryan what you are working through."
            submitLabel="Send message"
            source="contact-page"
            campaign="editorial-contact"
            defaultLeadType="agent-match"
            leadMagnetOptions={[]}
          />
        </div>
      </section>
    </SiteShell>
  );
}
