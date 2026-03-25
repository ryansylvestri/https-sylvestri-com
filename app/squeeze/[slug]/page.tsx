import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { getSqueezePage, siteConfig, squeezePages } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return squeezePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSqueezePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.subheadline,
    alternates: {
      canonical: `/squeeze/${page.slug}`,
    },
  };
}

export default async function SqueezePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSqueezePage(slug);

  if (!page) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.subheadline,
    url: `${siteConfig.siteUrl}/squeeze/${page.slug}`,
  };

  return (
    <>
      <JsonLd data={schema} />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,166,90,0.22),_transparent_25%),linear-gradient(180deg,_#f5ede2_0%,_#fbf7f1_38%,_#f2ece4_100%)] px-6 py-10 text-foreground">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <section className="overflow-hidden rounded-[2.2rem] border border-white/60 bg-[linear-gradient(160deg,_rgba(20,32,51,0.96)_0%,_rgba(37,18,10,0.92)_100%)] p-8 text-white shadow-[0_28px_90px_rgba(15,23,42,0.2)] md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/70">
                {page.title}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-none text-balance md:text-6xl">
                {page.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{page.subheadline}</p>

              <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/6 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  Offer
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight">{page.offer}</h2>
                <div className="mt-6 grid gap-3">
                  {page.bullets.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/82"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href={page.followThroughHref} className="text-brand-gold transition hover:text-white">
                  Continue into the deeper page
                </Link>
                <Link href="/squeeze" className="text-white/72 transition hover:text-white">
                  All squeeze pages
                </Link>
                <Link href="/" className="text-white/72 transition hover:text-white">
                  Back to Ryan&apos;s site
                </Link>
              </div>
            </section>

            <LeadCaptureForm
              title="Quick intake"
              description={page.trustLine}
              submitLabel={page.cta}
              source={`squeeze:${page.slug}`}
              campaign={page.slug}
            />
          </div>
        </div>
      </main>
    </>
  );
}
