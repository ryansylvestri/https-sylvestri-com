import Link from "next/link";

import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="editorial-section">
        <div className="site-container max-w-3xl">
          <p className="eyebrow">404 / Not found</p>
          <h1 className="page-title mt-5">This page is not available.</h1>
          <p className="mt-6 text-lg leading-8 text-body-ink">
            The address may have changed, or the material may be withheld while it is reviewed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="button-primary">Return home</Link>
            <Link href="/articles" className="button-secondary">Browse stories</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
