import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { ShareControls } from "@/components/share-controls";
import type { ContentDocument } from "@/lib/content-engine";
import { buildBreadcrumbJsonLd, buildContentJsonLd } from "@/lib/seo";

export function ReportedFact({ children }: { children: ReactNode }) {
  return <aside className="my-8 border-l-2 border-brand-ink bg-[#f4ede3] p-5"><p className="eyebrow">Reported fact</p><div className="mt-3">{children}</div></aside>;
}

export function RyanOpinion({ children }: { children: ReactNode }) {
  return <aside className="my-8 border-l-2 border-brand-copper p-5"><p className="eyebrow">Ryan’s view</p><div className="mt-3">{children}</div></aside>;
}

export function ContentProse({ doc, body, related }: { doc: ContentDocument; body: ReactNode; related: ContentDocument[] }) {
  const sectionLabel = doc.section.charAt(0).toUpperCase() + doc.section.slice(1);

  return (
    <>
      <JsonLd data={[
        buildContentJsonLd(doc),
        buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: sectionLabel, path: `/${doc.section}` },
          { name: doc.title, path: doc.routePath },
        ]),
      ]} />
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-brand-copper">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/${doc.section}`} className="hover:text-brand-copper">{sectionLabel}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{doc.title}</li>
        </ol>
      </nav>
      <header className="editorial-section pt-10">
        <div className="site-container">
          <p className="eyebrow">{doc.contentKind} / {doc.category}</p>
          <h1 className="page-title mt-5">{doc.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body-ink md:text-xl">{doc.description}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-ink">
            <span>By {doc.author}</span>
            <span>Published {new Date(doc.publishedAt).toLocaleDateString("en-US")}</span>
            <span>Updated {new Date(doc.updatedAt).toLocaleDateString("en-US")}</span>
            {doc.reviewedAt ? <span>Reviewed {new Date(doc.reviewedAt).toLocaleDateString("en-US")}</span> : null}
          </div>
          <div className="mt-8"><ShareControls title={doc.title} /></div>
          <Image
            src={doc.featuredImage.src}
            alt={doc.featuredImage.alt}
            width={1600}
            height={900}
            priority
            sizes="(max-width: 1240px) 100vw, 1200px"
            className="mt-10 aspect-[16/9] w-full border border-[rgba(20,32,51,0.18)] object-cover"
          />
        </div>
      </header>
      <article className="editorial-section">
        <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,46rem)_15rem] lg:justify-between">
          <div className="prose-editorial min-w-0">
            {doc.whyItMatters ? (
              <aside className="mb-10 border-y border-brand-copper bg-[#f4ede3] p-6">
                <p className="eyebrow">Why it matters</p>
                <p className="mt-3 text-brand-ink">{doc.whyItMatters}</p>
              </aside>
            ) : null}
            {body}
          </div>
          <aside>
            <h2 className="eyebrow">Primary sources</h2>
            {doc.sources.length ? (
              <ul className="mt-4 space-y-4">
                {doc.sources.map((source) => (
                  <li key={source.url} className="border-t border-[rgba(20,32,51,0.18)] pt-3">
                    <a href={source.url} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-6 text-brand-ink underline decoration-brand-copper underline-offset-4">
                      {source.title}
                    </a>
                    {source.primary ? <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand-copper">Primary</span> : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs leading-6 text-muted-ink">No external factual sources were required for this first-person or internal story.</p>
            )}
          </aside>
        </div>
      </article>
      {related.length ? (
        <section className="editorial-section bg-[#f4ede3]">
          <div className="site-container">
            <h2 className="section-title">Related content</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.id} className="editorial-card">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-copper">{item.contentKind}</p>
                  <h3 className="mt-3 font-display text-2xl text-brand-ink">
                    <Link href={item.routePath} className="hover:text-brand-copper">{item.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-body-ink">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
