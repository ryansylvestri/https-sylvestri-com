import Link from "next/link";

import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "How information submitted to Sylvestri.com is collected and used.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="A plain-language summary of how information submitted through Sylvestri.com is handled."
        primaryCta={{ href: "/intake", label: "Contact Ryan" }}
      />
      <article className="editorial-section">
        <div className="site-container prose-editorial max-w-3xl">
          <p>Last updated: July 30, 2026.</p>
          <h2>Information you choose to provide</h2>
          <p>Forms may collect your name, email address, phone number, property or market context, timing, message, consent choices, and internal source information needed to understand the request.</p>
          <h2>How information is used</h2>
          <p>Submitted information may be used to respond, route the request, deliver a requested resource, maintain operational records, protect the site, and understand site performance. Email or SMS follow-up is used only when the corresponding consent is provided or another lawful basis applies.</p>
          <h2>Service providers and retention</h2>
          <p>Information may pass through hosting, analytics, automation, email, messaging, storage, and customer-relationship systems used to operate the site. Access should be limited to the operational purpose. Information is retained only as long as reasonably needed for that purpose, legal obligations, security, or recordkeeping.</p>
          <h2>Your choices</h2>
          <p>You may decline optional email or SMS consent and use unsubscribe instructions in a message. To ask about a submission, use the <Link href="/intake">contact form</Link>.</p>
          <h2>Changes</h2>
          <p>This policy may be updated as the site and its service providers change. The date above identifies the current version.</p>
        </div>
      </article>
    </SiteShell>
  );
}
