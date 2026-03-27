"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchItem = {
  id: string;
  title: string;
  routePath: string;
  category: string;
  summary: string;
  tags: string[];
  access: string;
};

type ContentSearchProps = {
  items: SearchItem[];
  emptyLabel: string;
};

export function ContentSearch({ items, emptyLabel }: ContentSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...new Set(items.map((item) => item.category))],
    [items],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const categoryMatch = category === "all" || item.category === category;
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;

      const haystack = [item.title, item.summary, item.category, item.tags.join(" ")]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [category, items, query]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-[1.75rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-5 md:grid-cols-[1fr_16rem]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search titles, summaries, or tags"
          className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-5 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-gold"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-5 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-gold"
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? "All categories" : value}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <Link
              key={item.id}
              href={item.routePath}
              className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold hover:shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-copper">
                <span>{item.category}</span>
                <span>{item.access}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl leading-tight text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-body-ink">{item.summary}</p>
            </Link>
          ))
        ) : (
          <div className="rounded-[1.8rem] border border-dashed border-[rgba(15,23,42,0.14)] bg-white/70 p-8 text-body-ink">
            {emptyLabel}
          </div>
        )}
      </div>
    </div>
  );
}
