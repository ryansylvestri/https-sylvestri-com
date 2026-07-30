// guide-topics.ts — Shared guide metadata used by /guides routes and the sitemap

export type GuideTopic = {
  slug: string;
  title: string;
  description: string;
  category: "buyer" | "seller" | "investor" | "lifestyle" | "process" | "systems";
  /** FAQ source keys from faq-content.ts and faq-content-extended.ts */
  faqKeys: string[];
  /** Matching landing page slug for cross-link, if any */
  relatedLanding?: string;
  /** Form context. When omitted the category default is used. */
  contactLeadType?: string;
  /** Explicit null prevents a resource from being preselected. */
  defaultLeadMagnet?: string | null;
  /** Date of the latest editorial review, when completed. */
  reviewedAt?: string;
  sources?: readonly { title: string; url: string }[];
};

export const guideTopics: GuideTopic[] = [
  // ── Buyer guides ──
  {
    slug: "buyers",
    title: "Complete Buyer's Guide to the Hudson Valley",
    description:
      "Everything first-time and experienced buyers need to know about purchasing a home in Dutchess, Putnam, and Orange counties.",
    category: "buyer",
    faqKeys: ["buyers"],
    relatedLanding: "first-time-buyers",
  },
  {
    slug: "first-time",
    title: "First-Time Homebuyer Guide — Hudson Valley Edition",
    description:
      "Step-by-step guide for first-time buyers covering pre-approval, down payment programs, inspections, and closing in New York.",
    category: "buyer",
    faqKeys: ["first-time", "buyers"],
    relatedLanding: "first-time-buyers",
  },
  {
    slug: "relocation",
    title: "Relocating to the Hudson Valley — What You Need to Know",
    description:
      "Town comparisons, commute data, school districts, and lifestyle tradeoffs for families and remote workers moving to the Hudson Valley.",
    category: "lifestyle",
    faqKeys: ["relocation"],
    relatedLanding: "hudson-valley-relocation",
  },
  {
    slug: "river-town",
    title: "Hudson River Towns — Beacon, Cold Spring, Newburgh & More",
    description:
      "A guide to the character, pricing, walkability, and investment potential of the Hudson Valley's river-town communities.",
    category: "lifestyle",
    faqKeys: ["river-town", "relocation"],
    relatedLanding: "river-town-buyer-match",
  },

  // ── Seller guides ──
  {
    slug: "sellers",
    title: "Complete Seller's Guide to the Hudson Valley",
    description:
      "Pricing strategy, closing costs, staging, negotiation, and timeline planning for homeowners selling in the Hudson Valley.",
    category: "seller",
    faqKeys: ["sellers"],
    relatedLanding: "home-valuation",
  },
  {
    slug: "valuation",
    title: "How to Determine Your Home's Market Value",
    description:
      "Understand CMAs, assessed vs. market value, online estimates, and the improvements that actually move the needle on price.",
    category: "seller",
    faqKeys: ["valuation", "sellers"],
    relatedLanding: "home-valuation",
  },
  {
    slug: "staging",
    title: "Home Staging Guide for Hudson Valley Sellers",
    description:
      "Room-by-room staging tips, cost expectations, and the DIY vs. professional decision for sellers in the Hudson Valley.",
    category: "seller",
    faqKeys: ["staging", "sellers"],
    relatedLanding: "seller-launch-plan",
  },

  // ── Process guides ──
  {
    slug: "closing",
    title: "The Real Estate Closing Process in New York",
    description:
      "Attorney review, title search, final walkthrough, and everything that happens between accepted offer and key handoff in New York.",
    category: "process",
    faqKeys: ["closing"],
  },
  {
    slug: "inspection",
    title: "Home Inspection Guide — What to Expect in the Hudson Valley",
    description:
      "What inspectors check, how much it costs, radon and septic testing, and how to negotiate after the report comes back.",
    category: "process",
    faqKeys: ["inspection"],
    contactLeadType: "buyer",
    defaultLeadMagnet: null,
    reviewedAt: "2026-07-30",
    sources: [
      {
        title: "New York Department of State: Home Inspector",
        url: "https://dos.ny.gov/node/66086",
      },
      {
        title: "New York Department of Health: Radon",
        url: "https://www.health.ny.gov/environmental/radon/",
      },
      {
        title: "New York Department of Health: Private Wells",
        url: "https://www.health.ny.gov/environmental/water/drinking/private_wells",
      },
    ],
  },
  {
    slug: "negotiation",
    title: "Real Estate Negotiation Strategies for Buyers and Sellers",
    description:
      "Offer strategy, escalation clauses, multiple-offer situations, and post-inspection negotiation tactics in the Hudson Valley.",
    category: "process",
    faqKeys: ["negotiation"],
  },

  // ── Investor guides ──
  {
    slug: "investors",
    title: "Real Estate Investing in the Hudson Valley",
    description:
      "Rental analysis, landlord-tenant law, 1031 exchanges, short-term rental rules, and property tax impact for Hudson Valley investors.",
    category: "investor",
    faqKeys: ["investors"],
    relatedLanding: "investor-intake",
  },

  // ── Life-event & distressed seller guides ──
  {
    slug: "divorce",
    title: "Selling Your Home During a Divorce in New York",
    description:
      "Property division, equitable distribution, court-ordered sales, and how to protect your equity during a divorce home sale.",
    category: "seller",
    faqKeys: ["divorce", "sellers"],
  },
  {
    slug: "probate",
    title: "Selling an Inherited or Probate Property in New York",
    description:
      "Probate timelines, executor responsibilities, stepped-up basis, and estate sale strategies in the Hudson Valley.",
    category: "seller",
    faqKeys: ["probate"],
  },
  {
    slug: "foreclosure",
    title: "Pre-Foreclosure Options for Hudson Valley Homeowners",
    description:
      "Loss mitigation, short sales, loan modification, and the timeline you need to understand before foreclosure becomes final.",
    category: "seller",
    faqKeys: ["foreclosure", "behind"],
  },
  {
    slug: "inherited",
    title: "Inherited a House? Here's What to Do Next",
    description:
      "Step-by-step guide for heirs dealing with an inherited property — from title transfer to sell-vs-keep decisions.",
    category: "seller",
    faqKeys: ["inherited", "probate"],
  },
  {
    slug: "tax-lien",
    title: "Tax Liens and Delinquent Property Taxes in New York",
    description:
      "How tax liens work, redemption periods, and options for homeowners facing delinquent property taxes in the Hudson Valley.",
    category: "seller",
    faqKeys: ["tax-lien"],
  },
  {
    slug: "vacant",
    title: "Selling a Vacant Property in the Hudson Valley",
    description:
      "Insurance, liability, maintenance, and marketing strategies for owners of vacant homes in Dutchess, Putnam, and Orange counties.",
    category: "seller",
    faqKeys: ["vacant"],
  },
  {
    slug: "downsizing",
    title: "Downsizing Guide for Hudson Valley Homeowners",
    description:
      "When to downsize, what to keep, how to time the sale and purchase, and senior-specific considerations in the Hudson Valley.",
    category: "lifestyle",
    faqKeys: ["downsizing", "sellers"],
  },
  {
    slug: "behind",
    title: "Behind on Mortgage Payments? Your Options Explained",
    description:
      "Forbearance, loan modification, short sale, and pre-foreclosure timelines for homeowners falling behind in New York.",
    category: "seller",
    faqKeys: ["behind", "foreclosure"],
  },
  {
    slug: "code-violation",
    title: "Selling a Property with Code Violations in New York",
    description:
      "How building code violations affect your sale, what to disclose, and whether to fix or sell as-is in the Hudson Valley.",
    category: "seller",
    faqKeys: ["code-violation"],
  },

  // ── Other guides ──
  {
    slug: "renters",
    title: "Renter's Guide to the Hudson Valley",
    description:
      "Rental market overview, tenant rights, lease terms, and the rent-vs-buy calculation for Hudson Valley residents.",
    category: "lifestyle",
    faqKeys: ["renters"],
  },
  {
    slug: "market",
    title: "Hudson Valley Real Estate Market Overview",
    description:
      "Current market conditions, pricing trends, inventory levels, and what the data means for buyers and sellers in the Hudson Valley.",
    category: "process",
    faqKeys: ["market"],
  },
  {
    slug: "ai",
    title: "How AI Is Changing Real Estate — A Practical Guide",
    description:
      "AI tools for home search, valuation, marketing, and transaction management — what works, what doesn't, and what's next.",
    category: "systems",
    faqKeys: ["ai"],
  },
];

/** All guide slugs — used by generateStaticParams and the sitemap */
export const guideSlugs = guideTopics.map((t) => t.slug);

/** Look up a single guide topic by slug */
export function getGuideTopic(slug: string): GuideTopic | undefined {
  return guideTopics.find((t) => t.slug === slug);
}

/** Category display labels */
export const guideCategoryLabels: Record<GuideTopic["category"], string> = {
  buyer: "Buyer Guides",
  seller: "Seller Guides",
  investor: "Investor Guides",
  lifestyle: "Lifestyle & Relocation",
  process: "Process & Transactions",
  systems: "Systems & Technology",
};
