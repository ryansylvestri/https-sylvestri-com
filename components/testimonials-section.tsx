import Link from "next/link";

import { testimonials } from "@/lib/testimonials";

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-18">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
          Client proof
        </p>
        <h2 className="font-display text-4xl leading-tight text-brand-ink md:text-5xl">
          What clients say after the transaction closes
        </h2>
        <Link
          href="/case-studies"
          className="inline-flex rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
        >
          Read case studies
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={`${item.name}-${item.location}`}
            className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm leading-7 text-body-ink">&ldquo;{item.quote}&rdquo;</p>
            <div className="mt-5 border-t border-[rgba(15,23,42,0.08)] pt-4">
              <p className="text-sm font-semibold text-brand-ink">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-ink">
                {item.location} · {item.scenario}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
