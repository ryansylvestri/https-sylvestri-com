import {
  additionalSellerLandingPages,
  additionalSellerSqueezePages,
  buyerLandingPages,
  buyerSqueezePages,
  motivatedSellerLandingPages,
  motivatedSellerSqueezePages,
} from "./lead-categories";

export const siteConfig = {
  name: "Ryan Sylvestri",
  founder: "Ryan Sylvestri",
  title: "Hudson Valley real estate broker, systems builder, and AI operator",
  phone: "(845) 867-2646",
  phoneHref: "tel:+18458672646",
  officePhone: "(845) 867-2450",
  officePhoneHref: "tel:+18458672450",
  email: "ryan@sylvestri.com",
  emailHref: "mailto:ryan@sylvestri.com",
  address: "584 Route 9, Fishkill, NY 12524",
  canonicalDomain: "sylvestri.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sylvestri.com",
  tagline:
    "Personal brand hub with cleaner real-estate routing, sharper offers, and room for the systems lane to grow.",
  heroTitle: "One personal brand with cleaner paths for buyers, sellers, investors, renters, and AI clients",
  heroSubtitle:
    "Buying, selling, relocating, investing, or building systems? sylvestri.com is the front door that routes people into the right next step instead of one generic pitch.",
  proofLine:
    "Licensed Associate RE Broker | ABR and PSA | RE/MAX Town & Country | Hudson Valley coverage",
  navItems: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/story", label: "Story" },
    { href: "/buyers", label: "Buyers" },
    { href: "/sellers", label: "Sellers" },
    { href: "/investors", label: "Investors" },
    { href: "/renters", label: "Renters" },
    { href: "/ai", label: "AI" },
    { href: "/brands", label: "Brands" },
    { href: "/intake", label: "Start Here" },
  ],
  googleBusinessProfile: "https://g.page/r/CV5BYkl3vmZuEBM",
  googleReviewUrl: "https://g.page/r/CV5BYkl3vmZuEBM/review",
  sameAs: [
    "https://sylvestri.com",
    "https://sylvestrirealty.com",
    "https://sylvestrisystems.com",
    "https://www.instagram.com/ryansylvestri/",
    "https://twitter.com/ryansylvestri",
    "https://www.linkedin.com/in/ryan-sylvestri-02874116b/",
    "https://www.tiktok.com/@ryansylvestri",
    "https://ryansylvestri.remax.com/seller/valuation/",
    "https://www.zillow.com/profile/ryansylvestri0",
    "https://www.realtor.com/realestateagents/56cbb29b89a68901006f31e1",
    "https://www.onekeymls.com/realtor/agents/Ryan-S-dot-Sylvestri/31845",
    "https://g.page/r/CV5BYkl3vmZuEBM",
  ],
  regions: [
    "Hudson Valley",
    "Dutchess County",
    "Putnam County",
    "Orange County",
    "Ulster County",
    "Sullivan County",
  ],
  neighborhoods: [
    "Fishkill",
    "Beacon",
    "Cold Spring",
    "Hopewell Junction",
    "Wappingers Falls",
    "Poughkeepsie",
    "Rhinebeck",
    "Newburgh",
  ],
  stats: [
    { value: "Hudson Valley", label: "Local market focus across buyers, sellers, investors, and relocation" },
    { value: "ABR + PSA", label: "Designations that support buyer advocacy and pricing discipline" },
    { value: "Systems", label: "Technical workflow thinking behind the follow-up and routing" },
    { value: "Direct", label: "Real access to Ryan instead of a generic contact chain" },
  ],
  differentiators: [
    "Personal-brand trust with direct Ryan-level accountability instead of a faceless agent stack.",
    "Separate paths for buyers, sellers, investors, renters, relocation clients, and complex seller situations.",
    "A contractor-adjacent and property-preservation lens that surfaces condition and friction early.",
    "Systems-minded follow-up, cleaner routing, and stronger next-step design from first click through handoff.",
  ],
  funnelSteps: [
    {
      step: "01",
      title: "Choose the right lane",
      text: "The first win is matching the visitor to the right problem, promise, and next step instead of dumping everyone into one form.",
    },
    {
      step: "02",
      title: "Capture the real context",
      text: "Collect the few facts that actually matter: timing, geography, lead type, goals, and the friction shaping the decision.",
    },
    {
      step: "03",
      title: "Route the follow-up correctly",
      text: "Once the signal is clear, the next move can be valuation, buyer planning, investor criteria review, relocation help, or a systems conversation.",
    },
    {
      step: "04",
      title: "Move with confidence",
      text: "The outcome is not just a lead record. It is a clearer decision, a cleaner plan, and the right human follow-up.",
    },
  ],
  buyerAdvantages: [
    "Town-by-town guidance that turns broad Hudson Valley interest into sharper market fit.",
    "A buying process built around financing clarity, timing, and realistic offer strategy.",
    "Straight talk about condition, resale logic, and the tradeoffs hidden behind polished listings.",
    "A better path for first-time buyers, relocations, and move-up decisions than random portal browsing.",
  ],
  sellerAdvantages: [
    "Human valuation guidance anchored in pricing reality, net proceeds, and timing.",
    "Specialized landing pages for divorce, probate, pre-foreclosure, inherited homes, vacant property, and more.",
    "A launch-plan mindset that coordinates prep, timing, marketing, and the move after the sale.",
    "Direct language and cleaner calls to action for homeowners who want clarity before pressure.",
  ],
  investorAdvantages: [
    "Investor-specific intake that captures criteria, strategy, geography, and urgency fast.",
    "A more analytical conversation around condition, upside, and execution risk.",
    "Campaign-ready landing and squeeze pages for buy-and-hold, value-add, and opportunistic leads.",
    "A personal brand that can speak to both real estate and systems-minded operators credibly.",
  ],
};

export type BrandEntry = {
  slug: string;
  name: string;
  role: "canonical" | "feeder" | "systems";
  domainLabel: string;
  domains: string[];
  headline: string;
  summary: string;
  audience: string;
  promise: string[];
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export const brandEntries: BrandEntry[] = [
  {
    slug: "sylvestri",
    name: "Sylvestri",
    role: "canonical",
    domainLabel: "sylvestri.com + sylvestrirealty.com",
    domains: [
      "sylvestri.com",
      "www.sylvestri.com",
      "sylvestrirealty.com",
      "www.sylvestrirealty.com",
    ],
    headline: "The umbrella where Ryan's name, real-estate offers, and operator story finally live together.",
    summary:
      "This is the personal-brand layer that captures name-search trust and routes serious real-estate, relocation, investor, and systems traffic into the right next step.",
    audience:
      "People who know Ryan by name, referral partners, sphere traffic, branded search visitors, and anyone who wants the human front door before a deeper landing page.",
    promise: [
      "Personal-brand trust without turning the site into a vanity brochure.",
      "Cleaner routing into buyers, sellers, investors, renters, and systems lanes.",
      "A front-end hub that can support both the real-estate business and future AI offers.",
    ],
    primaryHref: "/intake",
    primaryLabel: "Start here",
    secondaryHref: "/story",
    secondaryLabel: "Read the story",
  },
  {
    slug: "the-realist-realtors",
    name: "The Realist Realtors",
    role: "feeder",
    domainLabel: "direct-response voice",
    domains: [],
    headline: "The blunt, no-fluff angle for buyers and sellers who respond to realism over polish.",
    summary:
      "This voice is useful for hard-offer pages, seller certainty, investor realism, and direct-response campaigns that need straighter language than a polished brokerage brand normally uses.",
    audience:
      "Pragmatic homeowners, skeptical buyers, and investor-minded leads who want a clearer answer faster.",
    promise: [
      "A sharper ad and landing-page voice without rebuilding the backend.",
      "Good fit for valuation, reality-check, and motivated-seller style offers.",
      "Feeds into the same intake and routing system as the main personal brand.",
    ],
    primaryHref: "/squeeze/realist-home-plan",
    primaryLabel: "Open the realist page",
    secondaryHref: "/landing/seller-launch-plan",
    secondaryLabel: "See the deeper page",
  },
  {
    slug: "sylvestri-systems",
    name: "Sylvestri Systems",
    role: "systems",
    domainLabel: "sylvestrisystems.com",
    domains: ["sylvestrisystems.com", "www.sylvestrisystems.com"],
    headline: "The systems and infrastructure layer behind the client-facing brand.",
    summary:
      "This property carries the automation, workflow, and platform-thinking side of Ryan's work without stealing attention from the main real-estate conversion engine.",
    audience:
      "Operators, service businesses, and infrastructure-minded visitors who care about workflow leverage, automation, and systems design.",
    promise: [
      "A clean lane for operations, AI workflows, and implementation thinking.",
      "Useful for explaining the technical backbone behind the brand stack.",
      "Keeps revenue-facing real-estate messaging separate from the systems narrative.",
    ],
    primaryHref: "/ai",
    primaryLabel: "Open the AI lane",
    secondaryHref: "/network",
    secondaryLabel: "See the stack",
  },
  {
    slug: "ryguydoesai",
    name: "RyGuyDoesAI",
    role: "feeder",
    domainLabel: "media lane",
    domains: [],
    headline: "The creator, demo, and education layer for Ryan's AI work.",
    summary:
      "This is the lighter, more public-facing media lane where experiments, explainers, courses, and live demos can grow without confusing the real-estate side of the business.",
    audience:
      "AI-curious operators, future students, and media audiences who want the practical version of applied AI.",
    promise: [
      "A clear container for AI education and creator-led traffic.",
      "Good fit for demos, workshops, and future product offers.",
      "Can feed implementation or systems work back into the main brand.",
    ],
    primaryHref: "/ai",
    primaryLabel: "Open AI lane",
    secondaryHref: "/brands",
    secondaryLabel: "See all brands",
  },
];

export function getBrandEntry(slug: string) {
  return brandEntries.find((brand) => brand.slug === slug);
}

export function getBrandEntryByDomain(hostname: string) {
  const normalizedHost = hostname.toLowerCase().replace(/^www\./, "");
  return brandEntries.find((brand) =>
    brand.domains.some((domain) => domain.replace(/^www\./, "") === normalizedHost),
  );
}

export const audiencePaths = [
  {
    title: "Buyer planning",
    description:
      "Route first-time buyers, relocations, and move-up searchers into a cleaner buyer strategy instead of random listing alerts.",
    href: "/buyers",
  },
  {
    title: "Seller valuation and launch",
    description:
      "Lead homeowners with equity, timing, and next-step clarity before they drift into generic estimate tools.",
    href: "/sellers",
  },
  {
    title: "Investor criteria",
    description:
      "Keep investor conversations numbers-first, criteria-first, and separate from consumer lead noise.",
    href: "/landing/investor-intake",
  },
  {
    title: "Systems and AI",
    description:
      "Give the operator side of the brand a defined place to grow without muddying the real-estate funnel.",
    href: "/ai",
  },
] as const;

export type LeadCategory = "buyers" | "sellers" | "investors" | "referrals";

export const landingPageCategories: Record<LeadCategory, string> = {
  buyers: "Buyer Pages",
  sellers: "Seller Pages",
  investors: "Investor Pages",
  referrals: "Routing Pages",
};

export type LandingPageContent = {
  slug: string;
  category: LeadCategory;
  title: string;
  description: string;
  audience: string;
  cta: string;
  benefits: string[];
  steps: string[];
  sourceBrands: string[];
};

export const landingPages: LandingPageContent[] = [
  {
    slug: "home-valuation",
    category: "sellers",
    title: "What Is Your Hudson Valley Home Worth Right Now?",
    description:
      "A seller-first page for homeowners who want a human read on price, net proceeds, and timing before making the wrong move.",
    audience:
      "Seller-curious homeowners from branded search, postcards, QR codes, retargeting, sphere traffic, and anyone who wants pricing clarity without a hard sell.",
    cta: "Get my home value review",
    benefits: [
      "Lead with a human valuation lens, not a generic estimate widget.",
      "Turn seller curiosity into a real pricing and timing conversation.",
      "Create a clean bridge into listing strategy, prep planning, or the next move.",
    ],
    steps: [
      "Collect address, timing, and seller context.",
      "Review realistic pricing range and likely net proceeds.",
      "Route into valuation follow-up, launch planning, or direct listing strategy.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  {
    slug: "seller-launch-plan",
    category: "sellers",
    title: "Build Your Hudson Valley Seller Launch Plan",
    description:
      "For homeowners who are not ready to list this minute but want a sharper path for prep, timing, pricing, and the move after the move.",
    audience:
      "Prep-stage sellers who need structure and accountability before they need pressure.",
    cta: "Build my launch plan",
    benefits: [
      "Better fit for future sellers than a blunt contact form.",
      "Creates a stronger nurture path for listing opportunities that are not ready today.",
      "Connects prep decisions to timing, value, and the next purchase or relocation move.",
    ],
    steps: [
      "Capture property details, blockers, and timeline.",
      "Define the highest-leverage prep moves and launch sequence.",
      "Route into valuation, listing prep, or a future-seller follow-up plan.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  {
    slug: "first-time-buyers",
    category: "buyers",
    title: "First-Time Buyer Game Plan",
    description:
      "A structured page for first-time buyers who need clarity on financing, towns, touring, offer strategy, and the next right move.",
    audience:
      "First-time buyers who want a plain-English process and a more thoughtful entry into the market.",
    cta: "Build my buyer plan",
    benefits: [
      "Turns general buyer curiosity into a cleaner plan.",
      "Works across SEO, organic, referral, and paid traffic.",
      "Moves people from dream-home browsing into practical readiness.",
    ],
    steps: [
      "Capture budget, timing, and target areas.",
      "Sort the buyer into the right resource path and readiness level.",
      "Route into a consult, alerts, or the strongest next buyer step.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  {
    slug: "hudson-valley-relocation",
    category: "buyers",
    title: "Relocating to the Hudson Valley",
    description:
      "A relocation page for inbound movers comparing towns, commute patterns, river towns, and lifestyle tradeoffs before they start the wrong search.",
    audience:
      "Out-of-area buyers and families who need orientation, local context, and cleaner town matching before they talk inventory.",
    cta: "Plan my move",
    benefits: [
      "Reduces uncertainty around towns, timing, and lifestyle fit.",
      "Supports guide offers, consults, and a smoother relocation handoff.",
      "Turns broad regional curiosity into structured intake data.",
    ],
    steps: [
      "Capture move goals, timing, and likely target towns.",
      "Recommend the strongest next local guidance or search path.",
      "Route into buyer planning, relocation resources, or direct conversation.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  {
    slug: "river-town-buyer-match",
    category: "buyers",
    title: "Hudson River Town Buyer Match",
    description:
      "A page focused on matching buyers to the right river-town path based on commute, walkability, schools, price, and lifestyle fit.",
    audience:
      "Buyers exploring Beacon, Cold Spring, Newburgh, Kingston, and other Hudson Valley river-town markets.",
    cta: "Find my town fit",
    benefits: [
      "Makes the local guidance feel purposeful instead of generic.",
      "Captures richer buyer intent than a standard listing-alert CTA.",
      "Bridges lifestyle curiosity into a real buying conversation.",
    ],
    steps: [
      "Ask about lifestyle, commute, and budget.",
      "Map likely towns and property patterns.",
      "Route into a town guide, consult, or search setup.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  {
    slug: "realist-buyer-plan",
    category: "buyers",
    title: "Realist Buyer Plan",
    description:
      "A direct-response buyer page for people who want realism, fast clarity, and a no-fluff game plan before wasting time on the wrong inventory.",
    audience:
      "Pragmatic buyers who respond better to straight talk than polished real-estate language.",
    cta: "Get the realist plan",
    benefits: [
      "Distinct direct-response voice without splitting the backend.",
      "Ideal for paid traffic, blunt positioning, and skeptical prospects.",
      "Feeds into the same buyer-routing system as the main site.",
    ],
    steps: [
      "Capture real constraints and dealbreakers.",
      "Define the most realistic path forward.",
      "Route into consult, alerts, or buyer planning.",
    ],
    sourceBrands: ["The Realist Realtors"],
  },
  {
    slug: "investor-intake",
    category: "investors",
    title: "Hudson Valley Investor Intake",
    description:
      "A focused landing page for investors evaluating value-add, multifamily, flips, rentals, land, and opportunistic acquisitions.",
    audience:
      "Investors who need sharper intake on strategy, criteria, geography, speed, and risk tolerance.",
    cta: "Submit my criteria",
    benefits: [
      "Separates investor intent from consumer buyers and sellers.",
      "Supports direct mail, PPC, referral network, and outbound traffic.",
      "Creates a cleaner handoff into the right follow-up lane.",
    ],
    steps: [
      "Capture strategy, budget, geography, and deal type.",
      "Sort by buy-and-hold, value-add, multifamily, land, or flip intent.",
      "Route to the right conversation or referral path.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  {
    slug: "agent-match",
    category: "referrals",
    title: "Need the Right Agent, Not a Random Form?",
    description:
      "A routing page for people who care more about being matched well, fast, and intelligently than landing on the first agent page they happen to see.",
    audience:
      "Leads who want the right guide, referral, or lane based on situation, geography, and urgency.",
    cta: "Match me correctly",
    benefits: [
      "Explains the routing model in plain language.",
      "Lets Ryan's personal brand own the operating-system story.",
      "Works as a neutral endpoint for multiple campaign and referral sources.",
    ],
    steps: [
      "Capture lead type, geography, and urgency.",
      "Qualify for direct handling or referral routing.",
      "Send into the right human follow-up sequence.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  ...motivatedSellerLandingPages,
  ...additionalSellerLandingPages,
  ...buyerLandingPages,
];

export function getLandingPage(slug: string) {
  return landingPages.find((page) => page.slug === slug);
}

export type SqueezePageContent = {
  slug: string;
  category: LeadCategory;
  title: string;
  headline: string;
  subheadline: string;
  offer: string;
  cta: string;
  bullets: string[];
  trustLine: string;
  sourceBrands: string[];
  followThroughHref: string;
};

export const squeezePages: SqueezePageContent[] = [
  {
    slug: "instant-home-value",
    category: "sellers",
    title: "Instant Hudson Valley Home Value",
    headline: "Want a sharper idea of what your home could sell for right now?",
    subheadline:
      "This squeeze page is built for seller curiosity before it fades. Perfect for ads, postcards, retargeting, branded search, and simple CTA traffic.",
    offer: "Fast home-value review plus the smartest next step",
    cta: "Request my value review",
    bullets: [
      "Strong first conversion for seller-curious homeowners.",
      "Designed to hand off into valuation and launch-plan pages.",
      "Short enough to convert quickly without losing context.",
    ],
    trustLine:
      "Fast first step, human follow-up. No pressure, no generic estimate pitch.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/home-valuation",
  },
  {
    slug: "buyer-alerts",
    category: "buyers",
    title: "Hudson Valley Buyer Alerts",
    headline: "Start the right Hudson Valley search before random listings waste your time.",
    subheadline:
      "A light-friction squeeze page for buyers who are interested enough to raise a hand but not ready for a long form or full consult.",
    offer: "Better-fit alerts plus a buyer-plan next step",
    cta: "Start my alerts",
    bullets: [
      "Good fit for social, SMS, sphere, and early buyer traffic.",
      "Creates a gentle first conversion without losing attribution.",
      "Hands off naturally into first-time buyer and relocation pages.",
    ],
    trustLine:
      "Useful when the lead wants help, but not a heavy intake, on day one.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/first-time-buyers",
  },
  {
    slug: "hudson-river-move",
    category: "buyers",
    title: "Hudson Valley Move Guide",
    headline: "Thinking about a move into the Hudson Valley but not sure where you fit yet?",
    subheadline:
      "This squeeze layer captures relocation and lifestyle curiosity fast, then routes the visitor into the deeper town-fit and buyer-planning journey.",
    offer: "Town-fit move guide and relocation next step",
    cta: "Send me the guide",
    bullets: [
      "Built for relocation, lifestyle, and river-town campaigns.",
      "Works well when the first question is geography, not listings.",
      "Routes naturally into the deeper relocation funnel.",
    ],
    trustLine:
      "A quick first step for people who need orientation before a full buyer conversation.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/hudson-valley-relocation",
  },
  {
    slug: "realist-home-plan",
    category: "sellers",
    title: "Realist Home Plan",
    headline: "Need the straight version of whether to sell now, prep first, or hold?",
    subheadline:
      "A no-fluff squeeze page for homeowners who want a realistic decision path instead of polished sales language.",
    offer: "Direct seller reality check",
    cta: "Get the realist plan",
    bullets: [
      "Strong fit for blunt direct-response messaging.",
      "Useful for homeowners who want clarity before they want charm.",
      "Routes naturally into valuation and seller-launch pages.",
    ],
    trustLine:
      "Sharper voice, same underlying intake discipline and follow-up system.",
    sourceBrands: ["The Realist Realtors"],
    followThroughHref: "/landing/seller-launch-plan",
  },
  {
    slug: "investor-criteria",
    category: "investors",
    title: "Investor Criteria Snapshot",
    headline: "Drop your criteria and stop wasting time on the wrong opportunities.",
    subheadline:
      "This is the fast entry point for investor traffic before the full intake happens.",
    offer: "Investor criteria capture",
    cta: "Send my criteria",
    bullets: [
      "Better fit for investors than a consumer-style contact page.",
      "Useful for outbound, PPC, and referral-network traffic.",
      "Moves quickly into the investor intake route.",
    ],
    trustLine:
      "Built for speed and clarity. Full deal qualification happens after the first capture.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/investor-intake",
  },
  ...motivatedSellerSqueezePages,
  ...additionalSellerSqueezePages,
  ...buyerSqueezePages,
];

export function getSqueezePage(slug: string) {
  return squeezePages.find((page) => page.slug === slug);
}

export const intakeOptions = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "home-valuation", label: "Home valuation" },
  { value: "seller-distress", label: "Seller (distress / urgent)" },
  { value: "investor", label: "Investor" },
  { value: "renter", label: "Renter / relocation" },
  { value: "ai-coaching", label: "AI / systems" },
  { value: "newsletter", label: "Newsletter" },
  { value: "agent-match", label: "Need the right route" },
  { value: "other", label: "Other" },
] as const;
