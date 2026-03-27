import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) return {};

  return buildPageMetadata({
    title: `${item.title} | Case Study`,
    description: item.summary,
    path: `/case-studies/${item.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) notFound();

  return (
    <SiteShell>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: item.title, path: `/case-studies/${item.slug}` },
        ])}
      />
      <article className="mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/case-studies"
          className="text-sm font-semibold uppercase tracking-[0.26em] text-brand-copper"
        >
          ← All case studies
        </Link>
        <h1 className="mt-6 font-display text-5xl leading-tight text-brand-ink md:text-6xl">
          {item.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-body-ink">{item.summary}</p>

        <div className="mt-10 grid gap-6">
          <section className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-copper">
              Challenge
            </p>
            <p className="mt-3 text-base leading-8 text-body-ink">{item.challenge}</p>
          </section>
          <section className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-copper">
              Approach
            </p>
            <p className="mt-3 text-base leading-8 text-body-ink">{item.approach}</p>
          </section>
          <section className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-copper">
              Outcome
            </p>
            <p className="mt-3 text-base leading-8 text-body-ink">{item.outcome}</p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}
