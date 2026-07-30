"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ArticleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[article-error]", error);
  }, [error]);

  return (
    <section className="editorial-section">
      <div className="site-container max-w-3xl">
        <p className="eyebrow">Article unavailable</p>
        <h1 className="page-title mt-5">This article could not be rendered.</h1>
        <p className="mt-6 text-lg leading-8 text-body-ink">The article remains unpublished to this response rather than showing a blank page.</p>
        {error.digest ? <p className="mt-4 text-xs text-muted-ink">Reference: {error.digest}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="button-primary">Try again</button>
          <Link href="/articles" className="button-secondary">All stories</Link>
        </div>
      </div>
    </section>
  );
}
