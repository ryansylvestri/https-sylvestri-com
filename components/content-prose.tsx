import Link from "next/link";
import { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import type { ContentDocument } from "@/lib/content-engine";
import { buildBreadcrumbJsonLd, buildContentJsonLd } from "@/lib/seo";

type ContentProseProps = {
  doc: ContentDocument;
  body: ReactNode;
  related: ContentDocument[];
};

export function ContentProse({ doc, body, related }: ContentProseProps) {
  const sectionLabel = doc.section.charAt(0).toUpperCase() + doc.section.slice(1);

  return (
    <>
      <JsonLd
        data={[
          buildContentJsonLd(doc),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: sectionLabel, path: `/${doc.section}` },
            { name: doc.title, path: doc.routePath },
          ]),
        ]}
      />
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-copper">
            {doc.section} / {doc.category}
          </p>
          <h1 className="font-display text-5xl leading-none text-balance text-brand-ink md:text-7xl">
            {doc.title}
          </h1>
          <p className="text-xl leading-9 text-body-ink">{doc.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-ink">
            <span>Published {new Date(doc.publishedAt).toLocaleDateString("en-US")}</span>
            <span>Updated {new Date(doc.updatedAt).toLocaleDateString("en-US")}</span>
            <span>{doc.author}</span>
            <span>{doc.access}</span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 pb-20">
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-ink prose-p:text-body-ink prose-a:text-brand-copper prose-strong:text-brand-ink prose-li:text-body-ink">
          {body}
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <h2 className="font-display text-3xl text-brand-ink">Related content</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.id}
                href={item.routePath}
                className="rounded-[1.6rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6 transition hover:border-brand-gold"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-copper">
                  {item.category}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-brand-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-body-ink">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
