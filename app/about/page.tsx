import Image from "next/image";
import Link from "next/link";

import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Ryan Sylvestri",
  description:
    "About Ryan Sylvestri and the editorial purpose behind his Hudson Valley real estate, technology, and ideas site.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About Ryan"
        title="Practical guidance shaped by hands-on work."
        description="Ryan Sylvestri uses this site to share Hudson Valley real estate guidance, useful technology, and lessons from work that benefits from better research and clearer systems."
        primaryCta={{ href: "/articles", label: "Read the stories" }}
        secondaryCta={{ href: "/intake", label: "Contact Ryan" }}
      >
        <Image
          src="/images/hudson-valley-editorial-home.webp"
          alt="A Hudson Valley home framed by mature trees"
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 1024px) 100vw, 44vw"
          className="aspect-[4/3] w-full border border-[rgba(20,32,51,0.18)] object-cover"
        />
      </PageHero>

      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">About</span>
      </nav>

      <section className="editorial-section">
        <div className="site-container grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow">The purpose</p>
            <h2 className="section-title mt-4">A public notebook for useful work.</h2>
          </div>
          <div className="prose-editorial max-w-3xl">
            <p>
              This site is organized around information that can help someone prepare, ask better
              questions, or understand a process. Real estate is one part of that work. Technology,
              automation, experiments, and operating ideas are another.
            </p>
            <p>
              The editorial standard is straightforward: separate verified facts from opinion,
              show sources for factual or time-sensitive claims, mark unknowns, and avoid filling
              gaps with invented certainty.
            </p>
            <p>
              Articles and guides may describe what Ryan is testing or learning. Those notes are
              not a substitute for legal, financial, tax, engineering, inspection, or other
              professional advice.
            </p>
          </div>
        </div>
      </section>

      <section className="editorial-section bg-[#f4ede3]">
        <div className="site-container">
          <p className="eyebrow">Editorial principles</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[
              ["Use direct evidence", "Link to primary sources and records when a factual claim depends on them."],
              ["Name the uncertainty", "Make assumptions, open questions, and limits visible instead of smoothing them over."],
              ["Make it practical", "Leave the reader with a clearer decision, question, or next step."],
            ].map(([title, copy], index) => (
              <article key={title} className="editorial-card">
                <span className="text-xs font-bold text-brand-copper">0{index + 1}</span>
                <h2 className="mt-3 font-display text-3xl text-brand-ink">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-body-ink">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(20,32,51,0.18)] py-14">
        <div className="site-container flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-brand-ink">Have a question for Ryan?</h2>
            <p className="mt-3 text-base text-body-ink">Share the context and the decision you are working through.</p>
          </div>
          <Link href="/intake" className="button-primary shrink-0">Contact Ryan</Link>
        </div>
      </section>
    </SiteShell>
  );
}
