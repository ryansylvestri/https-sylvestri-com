"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[route-error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-3xl border-t-2 border-brand-copper pt-8">
        <p className="eyebrow">Page error</p>
        <h1 className="page-title mt-5">This page could not be displayed.</h1>
        <p className="mt-6 text-lg leading-8 text-body-ink">
          Try the page again. If the problem continues, use the contact page and include what you were trying to open.
        </p>
        {error.digest ? <p className="mt-4 text-xs text-muted-ink">Reference: {error.digest}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="button-primary">Try again</button>
          <Link href="/" className="button-secondary">Return home</Link>
        </div>
      </div>
    </main>
  );
}
