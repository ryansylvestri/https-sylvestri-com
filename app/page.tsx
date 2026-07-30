import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hudson Valley Real Estate Guidance, Technology, and Ideas",
  description:
    "Practical Hudson Valley real estate resources, homeowner guides, market insights, AI news, tools, experiments, and stories from Ryan Sylvestri.",
  path: "/",
});

const realEstatePaths = [
  { label: "Buy", href: "/buyers", copy: "Plan the search, financing, offer, inspection, and closing." },
  { label: "Sell", href: "/sellers", copy: "Prepare the property and make informed pricing and launch decisions." },
  { label: "Invest", href: "/investors", copy: "Evaluate goals, assumptions, property condition, and risk." },
  { label: "Rent & Relocate", href: "/renters", copy: "Organize a move and learn the Hudson Valley landscape." },
];

const learningPaths = [
  { label: "Buyer guides", href: "/guides#buyer-guides" },
  { label: "Seller guides", href: "/guides#seller-guides" },
  { label: "Homeownership", href: "/guides#homeownership" },
  { label: "Property maintenance", href: "/guides#property-maintenance" },
  { label: "Market updates", href: "/guides#market-updates" },
];

const aiPaths = [
  { label: "AI News", href: "/ai#ai-news", copy: "What changed, what is confirmed, and why it matters." },
  { label: "Tools & Tutorials", href: "/ai#tools-tutorials", copy: "Practical walkthroughs for useful technology." },
  { label: "Experiments & Builds", href: "/ai#experiments-builds", copy: "Working notes from things being tested and built." },
  { label: "Useful Ideas", href: "/ai#useful-ideas", copy: "Clear concepts worth carrying into real work." },
];

export default function HomePage() {
  const articles = getPublishedContent("articles").slice(0, 3);
  const heroImage = "/images/hudson-valley-editorial-hero.webp";
  const realEstateImage = "/images/hudson-valley-editorial-home.webp";
  const learnImage = "/images/editorial-learning-inspection.webp";
  const aiImage = "/images/editorial-ai-ideas.webp";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ryan Sylvestri",
      url: "https://sylvestri.com",
      description: "Hudson Valley real estate guidance, useful technology, and ideas.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ryan Sylvestri",
      url: "https://sylvestri.com/about",
      knowsAbout: ["Hudson Valley real estate", "Property ownership", "Applied technology"],
    },
  ];

  return (
    <SiteShell>
      <JsonLd data={schemas} />

      <section className="border-b border-[rgba(20,32,51,0.16)] py-12 md:py-16 lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="eyebrow">Hudson Valley field notes</p>
            <h1 className="page-title mt-5">
              Real estate guidance, useful technology, and ideas worth sharing.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-body-ink md:text-xl md:leading-9">
              Explore practical Hudson Valley real estate resources, homeowner guides, market
              insights, AI news, tools, experiments and stories from Ryan Sylvestri.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#real-estate" className="button-primary w-full sm:w-auto">Explore Real Estate</Link>
              <Link href="/articles" className="button-secondary w-full sm:w-auto">Read the Latest</Link>
            </div>
          </div>
          <figure className="relative border border-[rgba(20,32,51,0.18)] bg-[#eee6da] p-3">
            <Image
              src={heroImage}
              alt="A Hudson Valley landscape framed by trees and open sky"
              width={1400}
              height={980}
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="aspect-[10/7] h-auto w-full object-cover"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 px-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-ink">
              <span>Hudson Valley, New York</span>
              <span>Field guide No. 01</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="real-estate" className="editorial-section scroll-mt-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Real Estate"
            title="Guidance for every move."
            description="Resources for buyers, sellers, investors, renters, and homeowners across the Hudson Valley."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Image
              src={realEstateImage}
              alt="A Hudson Valley home and surrounding landscape"
              width={1100}
              height={760}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/3] w-full border border-[rgba(20,32,51,0.16)] object-cover"
            />
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {realEstatePaths.map((item, index) => (
                <Link key={item.href} href={item.href} className="editorial-card group">
                  <span className="text-xs font-bold text-muted-ink">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-3xl text-brand-ink group-hover:text-brand-copper">{item.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-body-ink">{item.copy}</p>
                  <span className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.15em] text-brand-copper">Explore →</span>
                </Link>
              ))}
              <Link href="/markets" className="sm:col-span-2 border-t border-[rgba(20,32,51,0.18)] pt-5 text-sm font-bold text-brand-ink hover:text-brand-copper">
                Explore Hudson Valley markets →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section bg-[#f4ede3]">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Learn"
              title="Practical answers for owning and moving."
              description="Straightforward guides for the decisions that come before, during, and after a real estate move."
            />
            <ol className="mt-10 border-t border-[rgba(20,32,51,0.18)]">
              {learningPaths.map((item, index) => (
                <li key={item.href} className="border-b border-[rgba(20,32,51,0.18)]">
                  <Link href={item.href} className="group flex min-h-16 items-center gap-5 py-3">
                    <span className="text-xs font-bold text-brand-copper">0{index + 1}</span>
                    <span className="font-display text-xl text-brand-ink group-hover:text-brand-copper">{item.label}</span>
                    <span aria-hidden="true" className="ml-auto text-brand-copper">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <Image
            src={learnImage}
            alt="Home inspection details being reviewed"
            width={1100}
            height={760}
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="aspect-[4/3] w-full border border-[rgba(20,32,51,0.16)] object-cover"
          />
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <SectionHeading
              eyebrow="AI & Ideas"
              title="AI, tools, experiments, and useful ideas."
              description="Plain-English reporting, practical tutorials, and things worth trying."
            />
            <Image
              src={aiImage}
              alt="A restrained abstract illustration representing technology and connected ideas"
              width={1100}
              height={760}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[16/9] w-full border border-[rgba(20,32,51,0.16)] object-cover"
            />
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {aiPaths.map((item, index) => (
              <Link key={item.href} href={item.href} className="editorial-card group">
                <span className="text-xs font-bold text-muted-ink">0{index + 1}</span>
                <h3 className="mt-3 font-display text-2xl text-brand-ink group-hover:text-brand-copper">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-body-ink">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section bg-[#172338] text-white">
        <div className="site-container">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[#e19b73]">Stories</p>
              <h2 className="section-title mt-4 text-white">Latest stories and updates.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#d7dce3]">
                Recent reporting, guides, experiments, and personal stories.
              </p>
            </div>
            <Link href="/articles" className="button-secondary border-white text-white hover:border-[#e19b73] hover:text-[#e19b73]">
              View all stories
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {articles.length ? articles.map((article) => (
              <article key={article.slug} className="border-t border-[#e19b73] pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e19b73]">{article.category}</p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-white">
                  <Link href={article.routePath} className="hover:text-[#e19b73]">{article.title}</Link>
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#c8ced8]">{article.summary}</p>
              </article>
            )) : (
              <p className="text-[#d7dce3]">New stories are being reviewed for publication.</p>
            )}
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <Image
            src={realEstateImage}
            alt="A Hudson Valley home framed by mature trees"
            width={1536}
            height={1024}
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="aspect-[4/3] w-full border border-[rgba(20,32,51,0.16)] object-cover"
          />
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title mt-4">About Ryan.</h2>
            <p className="section-copy mt-5">
              Ryan Sylvestri shares practical Hudson Valley real estate guidance, useful technology,
              and lessons from hands-on work.
            </p>
            <Link href="/about" className="button-secondary mt-8">Read more about Ryan</Link>
          </div>
        </div>
      </section>

      <NewsletterSignup source="homepage" campaign="editorial-newsletter" />

      <section className="border-t border-[rgba(20,32,51,0.18)] bg-[#e8ddd0] py-14">
        <div className="site-container flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 font-display text-3xl text-brand-ink md:text-4xl">Have a question or a move to plan?</h2>
            <p className="mt-3 text-base leading-7 text-body-ink">Tell Ryan what you’re working through and get a clear next step.</p>
          </div>
          <Link href="/intake" className="button-primary shrink-0">Contact Ryan</Link>
        </div>
      </section>
    </SiteShell>
  );
}
