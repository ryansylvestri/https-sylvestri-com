import Link from "next/link";

import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Ryan Sylvestri websites and digital services collect, use, disclose, retain, and protect personal information.",
  path: "/privacypolicy",
});

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How information is collected, used, disclosed, retained, and protected across websites and digital services operated by Ryan Sylvestri."
        primaryCta={{ href: "/intake", label: "Contact Ryan" }}
      />
      <article className="editorial-section">
        <div className="site-container prose-editorial max-w-3xl">
          <p><strong>Effective date and last updated:</strong> September 1, 2026.</p>

          <p>
            Ryan Sylvestri (&quot;Sylvestri,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
            This Privacy Policy explains how we collect, use, disclose, retain, and protect personal
            information when you interact with our covered services.
          </p>

          <h2>1. Scope</h2>
          <p>
            This Policy applies to sylvestri.com and any other website, subdomain, landing page,
            online form, application, or digital service operated by Ryan Sylvestri that displays
            or links to this Policy (collectively, the &quot;Services&quot;). It also applies to related
            communications by email, phone, text message, social media, and other channels when
            those communications arise from the Services.
          </p>
          <p>
            A third-party website or service is governed by its own privacy policy unless it
            expressly adopts this Policy. A property owner, brokerage, property-management company,
            or other client may also provide a separate notice for information processed on its
            behalf. If a more specific notice conflicts with this Policy, the more specific notice
            controls for that interaction.
          </p>

          <h2>2. Information we collect</h2>
          <p>The information we collect depends on how you use the Services and may include:</p>
          <ul>
            <li>
              <strong>Contact and identity information:</strong> name, email address, telephone
              number, mailing address, account identifiers, and communication preferences.
            </li>
            <li>
              <strong>Real-estate and service information:</strong> property address, market or
              town, ownership or occupancy context, buying, selling, renting, investing, maintenance,
              or management interests, desired timing, budget or criteria, and inquiry details.
            </li>
            <li>
              <strong>Application and transaction information:</strong> when specifically requested
              through an appropriate workflow, information relevant to a rental, purchase, sale,
              financing, vendor, or service transaction, including supporting documents. Any
              consumer report or screening information is obtained and used only as authorized and
              permitted by applicable law.
            </li>
            <li>
              <strong>Account and subscription information:</strong> email address, login/session
              data, membership or access tier, requested resources, newsletter selections, and
              subscription status.
            </li>
            <li>
              <strong>Content and communications:</strong> messages, notes, form responses, uploaded
              files, photos, videos, documents, call or meeting details, feedback, and other content
              you choose to provide.
            </li>
            <li>
              <strong>Payment information:</strong> purchase, billing, and transaction details.
              Payment-card information is processed by the applicable payment provider; we do not
              need to receive your complete card number.
            </li>
            <li>
              <strong>Device and usage information:</strong> IP address, browser and device type,
              operating system, referring and exit pages, pages or content viewed, links clicked,
              timestamps, approximate location derived from IP address, cookie or advertising
              identifiers, and diagnostic, security, and interaction data.
            </li>
            <li>
              <strong>Source and campaign information:</strong> the page, form, advertisement,
              campaign, referral source, or search that led to an interaction and consent records
              associated with that interaction.
            </li>
          </ul>

          <h2>3. How we collect information</h2>
          <p>We may collect information:</p>
          <ul>
            <li>directly from you through forms, accounts, uploads, calls, email, SMS, or meetings;</li>
            <li>automatically through cookies, pixels, logs, analytics, and similar technologies;</li>
            <li>
              from service providers, advertising or referral partners, social platforms, public
              records, property or listing sources, and transaction participants; and
            </li>
            <li>
              from a client or organization when we operate a site, form, automation, or other
              service on its behalf.
            </li>
          </ul>

          <h2>4. How we use information</h2>
          <p>We may use personal information to:</p>
          <ul>
            <li>respond to inquiries and provide requested information, resources, or services;</li>
            <li>
              route real-estate, property, technology, consulting, vendor, or other requests to the
              appropriate person, client, brokerage, manager, or service provider;
            </li>
            <li>create and manage accounts, access permissions, subscriptions, and transactions;</li>
            <li>
              communicate about a request, appointment, showing, property, service, account, or
              transaction;
            </li>
            <li>
              send newsletters, marketing email, or text messages when you have consented or when
              otherwise permitted by law;
            </li>
            <li>
              personalize content, measure traffic and campaign performance, understand how the
              Services are used, and improve features and user experience;
            </li>
            <li>
              maintain business, consent, transaction, and compliance records; enforce agreements;
              and protect legal rights;
            </li>
            <li>
              detect, investigate, and prevent spam, fraud, abuse, security incidents, or unlawful
              activity; and
            </li>
            <li>comply with legal obligations and respond to lawful requests.</li>
          </ul>

          <h2>5. Confidential, sensitive, and regulated information</h2>
          <p>
            Property details, deal terms, business information, uploaded content, and communications
            may be confidential. We limit their use and disclosure to the purposes described in this
            Policy, the relevant service relationship, and applicable law. Access is restricted to
            people and providers with an operational need to handle the information.
          </p>
          <p>
            General website forms, ordinary email, and standard text messages are not designed as
            secure channels for highly sensitive information. Unless a specific secure workflow asks
            for it, do not submit Social Security numbers, government identification numbers,
            passwords, complete bank or payment-card numbers, medical records, consumer reports, or
            information subject to attorney-client or another professional privilege. Submitting
            information does not by itself create a confidential, fiduciary, brokerage, attorney-client,
            or other professional relationship.
          </p>

          <h2>6. Cookies, analytics, advertising, and Google services</h2>
          <p>
            The Services may use cookies, pixels, local storage, tags, session technologies, and
            server logs for essential operation, security, preferences, analytics, attribution, and
            advertising. Depending on the site or feature, providers may include Google Analytics,
            Google Tag Manager, Microsoft Clarity, and Meta technologies. These providers may receive
            device, usage, and interaction information under their own privacy policies.
          </p>
          <p>
            The Services may also use Google Maps, Google Business Profile, or other Google features.
            Google may collect information such as device identifiers, IP address, activity, and
            location-related information in accordance with the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Google Privacy Policy
            </a>. If a feature requests precise device location, it will be collected only with the
            permission provided through your browser or device, and you may revoke that permission in
            your browser or device settings.
          </p>
          <p>
            You can control many cookies through your browser settings and use the privacy and ad
            controls offered by the relevant providers. Blocking cookies may affect how some features
            work. The Services do not currently respond to browser &quot;Do Not Track&quot; signals because
            there is no uniform industry standard for those signals.
          </p>

          <h2>7. How we disclose information</h2>
          <p>We may disclose personal information to:</p>
          <ul>
            <li>
              <strong>Service providers:</strong> website hosting, content delivery, cloud storage,
              analytics, security, authentication, email, messaging, automation, customer-relationship
              management, payment processing, document, media, and technical-support providers.
            </li>
            <li>
              <strong>Transaction and service participants:</strong> a brokerage, agent, property
              owner, manager, landlord, vendor, contractor, attorney, lender, title or insurance
              professional, or other party when reasonably necessary to address your request or
              complete an authorized service or transaction.
            </li>
            <li>
              <strong>Advertising and analytics partners:</strong> providers that help measure
              campaigns, understand audiences, or deliver and assess advertising, subject to your
              choices and applicable law.
            </li>
            <li>
              <strong>Legal and safety recipients:</strong> government authorities, courts, law
              enforcement, advisers, or other parties when required by law or reasonably necessary to
              protect rights, safety, property, users, or the Services.
            </li>
            <li>
              <strong>Business-transfer recipients:</strong> parties involved in a merger,
              acquisition, financing, reorganization, sale of assets, or similar transaction, subject
              to appropriate confidentiality and legal requirements.
            </li>
            <li>
              <strong>Other recipients at your direction:</strong> when you request or consent to the
              disclosure.
            </li>
          </ul>
          <p>
            Depending on configuration, these providers may include Hostinger, Cloudflare, Google,
            Microsoft, Meta, Supabase, Cloudinary, Stripe, Follow Up Boss, n8n, and email or messaging
            providers. A provider is listed for transparency and not as an endorsement.
          </p>

          <h2>8. Sale, sharing, and targeted advertising</h2>
          <p>
            We do not sell personal information for money. Some privacy laws define &quot;sale&quot; or
            &quot;sharing&quot; broadly enough to include certain advertising, analytics, or cross-context
            behavioral advertising technologies. Where applicable, you may request to opt out of that
            activity by contacting us using the information below. We may need information sufficient
            to identify the browser, device, or record connected with your request.
          </p>

          <h2>9. Email and text messaging choices</h2>
          <p>
            You may unsubscribe from marketing email by using the unsubscribe link in the message or
            by contacting us. If you opt in to text messages, message frequency may vary and message
            and data rates may apply. Reply STOP to opt out and HELP for help. Consent to marketing
            texts is not a condition of purchasing goods or services.
          </p>
          <p>
            Mobile information will not be shared with third parties or affiliates for their own
            marketing or promotional purposes. Text-message originator opt-in data and consent will
            not be sold or shared with third parties for their own marketing or promotional purposes.
            We may disclose this information to providers that support delivery of the messaging
            service, or when required by law.
          </p>

          <h2>10. Data retention</h2>
          <p>
            We retain personal information for as long as reasonably necessary for the purposes for
            which it was collected, including to provide services, maintain accounts and business or
            transaction records, honor consent and opt-out choices, resolve disputes, enforce
            agreements, protect security, and meet legal, tax, accounting, brokerage, or other
            compliance obligations. Retention varies by the information, service, and legal context.
            When information is no longer reasonably needed, we may delete it, de-identify it, or
            isolate it from further use, subject to backup and legal-retention requirements.
          </p>

          <h2>11. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational safeguards designed to
            protect personal information. These may include encryption in transit, access controls,
            scoped credentials, authentication, monitoring, backups, and provider security controls.
            No method of transmission or storage is completely secure, so we cannot guarantee absolute
            security.
          </p>

          <h2>12. Your privacy rights and choices</h2>
          <p>
            Depending on where you live and subject to applicable exceptions, you may have the right
            to request access to, correction of, deletion of, or a copy of certain personal
            information; to opt out of certain sale, sharing, targeted advertising, or profiling; to
            limit certain uses of sensitive information; to withdraw consent; or to appeal a decision
            about a request.
          </p>
          <p>
            To submit a request, email{" "}
            <a href={siteConfig.emailHref}>{siteConfig.email}</a> or use the{" "}
            <Link href="/intake">contact form</Link>. State the right you wish to exercise and the
            website or interaction involved. We may verify your identity and authority before acting.
            You may use an authorized agent where permitted by law. We will not discriminate against
            you for exercising an applicable privacy right.
          </p>

          <h2>13. Children&apos;s privacy</h2>
          <p>
            The Services are intended for a general adult audience and are not directed to children
            under 13. We do not knowingly collect personal information from children under 13. If you
            believe a child has submitted such information, contact us so we can review and delete it
            as appropriate.
          </p>

          <h2>14. External links and third-party services</h2>
          <p>
            The Services may link to or embed websites, maps, videos, social networks, payment tools,
            listings, applications, or other services operated by third parties. Their privacy and
            security practices are governed by their own terms and policies, and we encourage you to
            review them before providing information.
          </p>

          <h2>15. Changes to this Policy</h2>
          <p>
            We may update this Policy as the Services, providers, or legal requirements change. The
            revised Policy will be posted at this URL with a new effective or last-updated date. If a
            change materially affects how previously collected information is used, we will provide
            additional notice or obtain consent when required by law.
          </p>

          <h2>16. Contact us</h2>
          <address className="not-italic">
            <strong>Ryan Sylvestri</strong><br />
            {siteConfig.address}<br />
            Email: <a href={siteConfig.emailHref}>{siteConfig.email}</a><br />
            Phone: <a href={siteConfig.phoneHref}>{siteConfig.phone}</a><br />
            Website: <a href="https://sylvestri.com">sylvestri.com</a>
          </address>
        </div>
      </article>
    </SiteShell>
  );
}
