import Image from "next/image";

import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getCloudinaryAssetUrl } from "@/lib/cloudinary";
import { personalMedia, selectedStories, storyMilestones } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Story",
  description:
    "The story behind Ryan Sylvestri's operator-first approach to Hudson Valley real estate, systems, and leverage.",
  path: "/story",
});

export default function StoryPage() {
  const signUrl = getCloudinaryAssetUrl(personalMedia.sign, {
    crop: "fill",
    gravity: "auto",
    width: 1600,
    height: 1000,
  });

  return (
    <SiteShell>
      <h1 className="sr-only">Story</h1>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(20,32,51,0.96)] shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            {signUrl ? (
              <Image
                src={signUrl}
                alt="Ryan Sylvestri real-estate branding"
                width={1600}
                height={1000}
                className="h-full min-h-[28rem] w-full object-cover"
              />
            ) : null}
          </div>
          <SectionHeading
            eyebrow="Brand story"
            title="This page turns Ryan's background into positioning people can actually remember."
            description="The goal is not to dump a resume on the page. It is to show why the property background, technical lens, and operator mindset change the way clients experience the work."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="grid gap-6 lg:grid-cols-2">
          {storyMilestones.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
                {item.phase}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-brand-ink">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-body-ink">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionHeading
          eyebrow="Story blocks"
          title="The next stories to expand"
          description="These are the narrative blocks that can become longer storytelling sections, videos, or supporting pages as the brand grows."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {selectedStories.map((story) => (
            <div
              key={story.title}
              className="rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-6"
            >
              <h3 className="font-display text-3xl leading-tight text-brand-ink">{story.title}</h3>
              <p className="mt-3 text-base leading-7 text-body-ink">{story.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
