import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Accessibility",
  description: "Sylvestri.com accessibility approach and feedback channel.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Accessibility"
        title="A site designed to work for more people."
        description="Sylvestri.com aims for clear structure, keyboard access, readable contrast, reduced-motion support, responsive layouts, and useful alternative text."
        primaryCta={{ href: "/intake", label: "Report an accessibility issue" }}
      />
      <article className="editorial-section">
        <div className="site-container prose-editorial max-w-3xl">
          <p>Last updated: July 30, 2026.</p>
          <h2>Current approach</h2>
          <p>The site uses semantic headings, visible focus indicators, a skip link, keyboard-operable navigation, labeled forms, status announcements, stable image dimensions, and responsive layouts intended to remain usable at high zoom.</p>
          <h2>Feedback</h2>
          <p>If a page or control creates an access barrier, use the contact form and describe the page, device, browser, assistive technology, and task you were trying to complete.</p>
        </div>
      </article>
    </SiteShell>
  );
}
