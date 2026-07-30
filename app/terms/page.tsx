import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "Terms for using the educational information and tools on Sylvestri.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The conditions that apply when using the information, guides, and tools on Sylvestri.com."
        primaryCta={{ href: "/", label: "Return home" }}
      />
      <article className="editorial-section">
        <div className="site-container prose-editorial max-w-3xl">
          <p>Last updated: July 30, 2026.</p>
          <h2>Educational information</h2>
          <p>The site provides general educational information. It is not legal, tax, financial, lending, engineering, inspection, medical, or other professional advice.</p>
          <h2>No guaranteed outcome</h2>
          <p>Examples, calculators, experiments, and opinions do not guarantee a transaction, result, response time, price, performance, or availability. Verify decisions with current evidence and the appropriate qualified professionals.</p>
          <h2>Accuracy and third-party material</h2>
          <p>Reasonable efforts are made to label dates and sources, but information can change. External links and services are provided for context and remain under their own terms and policies.</p>
          <h2>Acceptable use</h2>
          <p>Do not misuse the site, attempt unauthorized access, submit unlawful material, interfere with operation, or represent site content as your own.</p>
        </div>
      </article>
    </SiteShell>
  );
}
