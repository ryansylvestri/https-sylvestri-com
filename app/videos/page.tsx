import { CloudflareStreamPlayer } from "@/components/cloudflare-stream-player";
import { JsonLd } from "@/components/json-ld";
import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Video Field Notes",
  description:
    "Video field notes from Ryan Sylvestri, delivered through Cloudflare Stream.",
  path: "/videos",
});

const customerCode =
  process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE?.trim() || "imffr46gncqz7u1u";
const videoId =
  process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_VIDEO_ID?.trim() ||
  "279ac8444511f6a6f2a72af6b4cba239";

export default function VideosPage() {
  const isConfigured = Boolean(customerCode && videoId);

  return (
    <SiteShell>
      {isConfigured ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Glacier landscape",
            description: "The first Cloudflare Stream delivery test for sylvestri.com.",
            thumbnailUrl: [
              `https://customer-${customerCode}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`,
            ],
            uploadDate: "2026-07-31T14:36:34Z",
            duration: "PT10.677S",
            embedUrl: `https://customer-${customerCode}.cloudflarestream.com/${videoId}/iframe`,
            contentUrl: `https://customer-${customerCode}.cloudflarestream.com/${videoId}/manifest/video.m3u8`,
          }}
        />
      ) : null}

      <PageHero
        eyebrow="Video"
        title="Video field notes."
        description="Short visual stories, property perspectives, field observations, and experiments from Ryan Sylvestri."
        primaryCta={{ href: "/articles", label: "Read the latest" }}
        secondaryCta={{ href: "/intake", label: "Contact Ryan" }}
      />

      <section className="editorial-section">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="eyebrow">Stream test No. 01</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-brand-ink md:text-5xl">
                Glacier landscape.
              </h2>
              <p className="mt-5 text-base leading-8 text-body-ink">
                The first Cloudflare Stream delivery test for sylvestri.com.
              </p>
            </div>

            {isConfigured ? (
              <CloudflareStreamPlayer
                customerCode={customerCode!}
                videoId={videoId!}
                title="Glacier landscape — Cloudflare Stream test"
              />
            ) : (
              <div
                role="status"
                className="flex aspect-video items-center justify-center border border-dashed border-[rgba(20,32,51,0.28)] bg-[#f4ede3] p-8 text-center"
              >
                <p className="max-w-md text-base leading-8 text-body-ink">
                  The first video is being prepared for Cloudflare Stream.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
