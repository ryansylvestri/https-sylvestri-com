import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { brandEcosystem, personalMedia } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Brands",
  description: "Brand and domain map for sylvestri.com, its feeder voices, and the systems infrastructure supporting the Hudson Valley real estate stack.",
};

export default function BrandsPage() {
  const systemsLogoUrl = getCloudinaryAssetUrl(personalMedia.systemsLogo, {
    crop: "fit",
    width: 900,
    height: 900,
  });
  const headshotUrl = getCloudinaryAssetUrl(personalMedia.headshot, {
    crop: "fill",
    gravity: "face",
    width: 900,
    height: 900,
  });
  const signUrl = getCloudinaryAssetUrl(personalMedia.sign, {
    crop: "fill",
    gravity: "auto",
    width: 1400,
    height: 900,
  });

  const cardImages = [headshotUrl, signUrl, systemsLogoUrl, systemsLogoUrl, signUrl];

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Brands and projects"
          title="Each property does one job well."
          description="This page maps how the personal-brand hub, the real-estate conversion lane, the systems lane, and the direct-response voices are meant to work together."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 xl:grid-cols-2">
          {brandEcosystem.map((brand, index) => (
            <div
              key={brand.domain}
              className="overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              {cardImages[index] ? (
                <img
                  src={cardImages[index]}
                  alt={brand.title}
                  className="h-[16rem] w-full object-cover"
                />
              ) : null}
              <div className="p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                  {brand.status}
                </p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-brand-ink">
                  {brand.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted-ink">
                  {brand.domain}
                </p>
                <p className="mt-5 text-base leading-8 text-body-ink">{brand.summary}</p>
                <Link
                  href={brand.href}
                  className="mt-6 inline-flex rounded-full border border-[rgba(15,23,42,0.12)] px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
                >
                  Open this lane
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
