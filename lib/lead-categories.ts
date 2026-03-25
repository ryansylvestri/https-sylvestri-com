// lead-categories.ts — Motivated seller lead categories for landing, squeeze, and resource pages
// Each category targets a specific homeowner situation to funnel them into Follow Up Boss

import type { LandingPageContent, SqueezePageContent } from "./site-content";

/* ─── Sub-category for filtering/grouping ─── */
export type MotivatedSellerTag =
  | "distressed"
  | "life-event"
  | "lifestyle"
  | "property"
  | "market";

/* ─── Resource page type for the resource library ─── */
export type ResourcePageContent = {
  slug: string;
  tag: MotivatedSellerTag;
  title: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  ctaHeadline: string;
  ctaBody: string;
  relatedSlugs: string[];
};

/* ═══════════════════════════════════════════════
   LANDING PAGES — 21 motivated-seller categories
   ═══════════════════════════════════════════════ */
export const motivatedSellerLandingPages: LandingPageContent[] = [
  /* 1 ── DIVORCE ── */
  {
    slug: "divorce-home-sale",
    category: "sellers",
    title: "Selling Your Home During a Divorce",
    description:
      "A guided path for couples navigating a home sale during divorce. Get fair pricing, neutral guidance, and a clear timeline so both parties can move forward.",
    audience:
      "Divorcing homeowners in the Hudson Valley who need to sell their shared property fairly and efficiently.",
    cta: "Get a confidential consultation",
    benefits: [
      "Neutral, professional guidance that serves both parties fairly.",
      "Strategic pricing to maximize equity before the split.",
      "Discreet handling — no yard signs required if privacy matters.",
    ],
    steps: [
      "Confidential intake: property details, timeline, and attorney contacts.",
      "Market analysis and pricing strategy for equitable division.",
      "Route into listing prep, valuation, or attorney coordination.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 2 ── PROBATE ── */
  {
    slug: "probate-property-sale",
    category: "sellers",
    title: "Selling a Probate Property in the Hudson Valley",
    description:
      "Guidance for executors and heirs navigating a probate home sale. We handle the complexity so you can focus on your family.",
    audience:
      "Executors, administrators, and heirs managing a deceased person's real estate through probate court.",
    cta: "Get probate selling guidance",
    benefits: [
      "Experience with probate timelines, court requirements, and estate attorneys.",
      "Property condition assessment — sell as-is or invest to maximize value.",
      "Coordination with estate attorneys and the surrogate's court process.",
    ],
    steps: [
      "Capture property details, executor status, and probate stage.",
      "Provide market analysis with as-is and improved value estimates.",
      "Route into listing, estate cleanout coordination, or referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 3 ── TAX LIEN ── */
  {
    slug: "tax-lien-property",
    category: "sellers",
    title: "Facing a Tax Lien? Explore Your Options",
    description:
      "Unpaid property taxes can spiral. Understand your options — from paying off the lien to selling the property — before the county takes action.",
    audience:
      "Homeowners with delinquent property taxes facing or at risk of a tax lien sale in Dutchess, Putnam, or Orange County.",
    cta: "Explore your tax lien options",
    benefits: [
      "Understand the timeline before a tax lien becomes a tax deed.",
      "Know the equity you may still have, even with a lien in place.",
      "Get a realistic path: pay, negotiate, or sell before it's too late.",
    ],
    steps: [
      "Capture property address, tax status, and lien amount if known.",
      "Review property value vs. lien balance to assess equity position.",
      "Route into listing strategy, short sale guidance, or attorney referral.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 4 ── FORECLOSURE ── */
  {
    slug: "foreclosure-help",
    category: "sellers",
    title: "Facing Foreclosure? Know Your Options Before It's Too Late",
    description:
      "If you've received a foreclosure notice, you still have options. A fast, strategic sale can protect your credit and preserve your equity.",
    audience:
      "Homeowners in active foreclosure proceedings in the Hudson Valley who need to act fast.",
    cta: "Get foreclosure help now",
    benefits: [
      "Understand the foreclosure timeline and your remaining options.",
      "A fast sale can stop the process and protect your credit score.",
      "No-pressure guidance — know the facts before you decide.",
    ],
    steps: [
      "Capture property details, lender info, and foreclosure stage.",
      "Evaluate sale price vs. mortgage balance and timeline.",
      "Route into fast listing, short sale negotiation, or attorney referral.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 5 ── PRE-FORECLOSURE ── */
  {
    slug: "pre-foreclosure",
    category: "sellers",
    title: "Behind on Mortgage Payments? Act Before Foreclosure",
    description:
      "If you're behind on payments, the clock is ticking. Explore your options while you still have leverage to sell on your terms.",
    audience:
      "Homeowners who have missed mortgage payments and are receiving lender notices but are not yet in foreclosure.",
    cta: "Explore your options now",
    benefits: [
      "Selling before foreclosure preserves your credit and equity.",
      "More negotiating power now than after a foreclosure filing.",
      "Confidential — no one needs to know your situation.",
    ],
    steps: [
      "Capture payment status, lender details, and property info.",
      "Assess equity position and realistic sale timeline.",
      "Route into fast listing, loan modification guidance, or referral.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 6 ── LIS PENDENS ── */
  {
    slug: "lis-pendens",
    category: "sellers",
    title: "Lis Pendens Filed on Your Property? Understand Your Options",
    description:
      "A lis pendens signals a pending lawsuit affecting your property. Learn what it means for your ability to sell and what steps to take next.",
    audience:
      "Homeowners who have had a lis pendens filed against their property due to pending litigation.",
    cta: "Get lis pendens guidance",
    benefits: [
      "Understand how a lis pendens affects your ability to sell or refinance.",
      "Know the difference between a lis pendens and a lien.",
      "Get connected with attorneys who can help resolve the filing.",
    ],
    steps: [
      "Capture property details and nature of the pending lawsuit.",
      "Assess whether the property can be sold with the filing in place.",
      "Route into attorney coordination, listing strategy, or hold plan.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 7 ── MOVING ── */
  {
    slug: "selling-before-moving",
    category: "sellers",
    title: "Planning a Move? Sell Smart Before You Go",
    description:
      "Whether you're moving across town or across the country, selling your current home strategically sets up your next chapter financially.",
    audience:
      "Homeowners planning a move who need to sell their current property to fund or facilitate the transition.",
    cta: "Plan your move sale",
    benefits: [
      "Timing strategy: sell first, buy first, or bridge the gap.",
      "Home prep checklist to maximize sale price on a timeline.",
      "Coordination between your sale, your move, and your next purchase.",
    ],
    steps: [
      "Capture move timeline, destination, and property details.",
      "Develop pricing and prep strategy based on your move date.",
      "Route into listing, bridge financing guidance, or relocation referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 8 ── DOWNSIZING ── */
  {
    slug: "downsizing-sale",
    category: "sellers",
    title: "Ready to Downsize? Maximize Your Equity",
    description:
      "Downsizing doesn't mean settling for less. Turn your larger home into financial freedom and a lifestyle that fits where you are now.",
    audience:
      "Empty nesters, retirees, and homeowners whose current home is larger than they need.",
    cta: "Start your downsizing plan",
    benefits: [
      "Equity analysis: how much your larger home can fund your next chapter.",
      "Decluttering and staging guidance tailored to downsizers.",
      "Help finding the right-sized home, condo, or 55+ community.",
    ],
    steps: [
      "Capture property details, ideal timeline, and lifestyle priorities.",
      "Provide home value estimate and downsizing equity projection.",
      "Route into listing prep, buyer search for new home, or referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 9 ── UPSIZING ── */
  {
    slug: "upsizing-sale",
    category: "sellers",
    title: "Growing Family? Time to Upsize Your Home",
    description:
      "When your family outgrows your space, selling strategically lets you upgrade without overextending. Get a plan that works for your budget and timeline.",
    audience:
      "Growing families in the Hudson Valley who need more bedrooms, yard space, or proximity to better schools.",
    cta: "Plan your upgrade",
    benefits: [
      "Sell-buy timing strategy to avoid carrying two mortgages.",
      "Know your upgrade budget before you start touring bigger homes.",
      "School district guidance and family-friendly neighborhood matching.",
    ],
    steps: [
      "Capture current home details, family size, and must-haves.",
      "Estimate sale proceeds and calculate upgrade buying power.",
      "Route into listing, buyer search, or dual-track coordination.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 10 ── RELOCATION ── */
  {
    slug: "relocation-sale",
    category: "sellers",
    title: "Relocating? Sell Your Hudson Valley Home with Confidence",
    description:
      "Relocation sales require speed, coordination, and trust. Get a strategy that sells your home fast while you focus on your move.",
    audience:
      "Homeowners relocating out of the Hudson Valley for personal, family, or lifestyle reasons.",
    cta: "Start your relocation sale",
    benefits: [
      "Fast-track listing strategy for time-sensitive relocations.",
      "Remote seller support — handle showings, negotiations, and closing from anywhere.",
      "Referral network to connect you with an agent at your destination.",
    ],
    steps: [
      "Capture move date, destination, and property details.",
      "Build a fast-track pricing and marketing strategy.",
      "Route into listing, remote closing coordination, and destination referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 11 ── EXPIRED LISTING ── */
  {
    slug: "expired-listing",
    category: "sellers",
    title: "Your Listing Expired — Now What?",
    description:
      "If your home didn't sell, it wasn't the market's fault. Get a fresh strategy, honest feedback, and a better plan this time around.",
    audience:
      "Homeowners whose listing expired or was withdrawn without a sale, frustrated and unsure what went wrong.",
    cta: "Get a fresh strategy",
    benefits: [
      "Honest analysis of why it didn't sell — pricing, photos, marketing, or exposure.",
      "A new plan with better positioning, not just a lower price.",
      "No long lockout contracts — earn the listing with results.",
    ],
    steps: [
      "Capture previous listing details, MLS number if available, and feedback.",
      "Diagnose pricing, marketing, and showing activity gaps.",
      "Route into re-listing strategy, price adjustment, or staging plan.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 12 ── FSBO ── */
  {
    slug: "fsbo-help",
    category: "sellers",
    title: "For Sale By Owner Not Working? Get Professional Help",
    description:
      "Selling on your own sounded great until it didn't. Get the pricing, marketing, and negotiation support FSBO sellers miss.",
    audience:
      "For-sale-by-owner sellers who are struggling with pricing, marketing, showings, or buyer negotiations.",
    cta: "Get FSBO rescue help",
    benefits: [
      "Honest assessment: is FSBO saving you money or costing you more?",
      "MLS exposure, professional photography, and buyer agent access.",
      "Negotiation and contract support that protects your interests.",
    ],
    steps: [
      "Capture listing details, time on market, and showing activity.",
      "Compare FSBO net proceeds vs. agent-assisted net proceeds.",
      "Route into full listing, flat-fee MLS support, or consultation.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 13 ── VACANT PROPERTY ── */
  {
    slug: "vacant-property",
    category: "sellers",
    title: "Own a Vacant Property? Stop the Financial Drain",
    description:
      "Empty homes cost money every month — taxes, insurance, maintenance, liability. Turn your vacant property into cash or income.",
    audience:
      "Owners of vacant homes in the Hudson Valley who are paying carrying costs on a property no one is using.",
    cta: "Get a vacant property plan",
    benefits: [
      "Calculate your true monthly cost of keeping a vacant home.",
      "Sell, rent, or renovate — know which option nets the most.",
      "Fast-track listing options for vacant homes ready to sell.",
    ],
    steps: [
      "Capture property details, condition, and carrying costs.",
      "Provide sell vs. rent analysis with local market data.",
      "Route into listing, property management referral, or renovation plan.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 14 ── CODE VIOLATION ── */
  {
    slug: "code-violation-property",
    category: "sellers",
    title: "Code Violations on Your Property? Know Your Options",
    description:
      "Building code violations can block a sale or pile up fines. Understand what to fix, what to disclose, and how to sell even with violations.",
    audience:
      "Homeowners who have received code violation notices or know their property has unpermitted work.",
    cta: "Get code violation guidance",
    benefits: [
      "Know which violations must be resolved before sale and which can be disclosed.",
      "Contractor connections for fast, cost-effective code compliance.",
      "As-is sale strategies for properties with significant code issues.",
    ],
    steps: [
      "Capture property details, known violations, and notice history.",
      "Assess cost to cure vs. as-is sale discount.",
      "Route into repair coordination, as-is listing, or investor referral.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 15 ── INHERITED PROPERTY ── */
  {
    slug: "inherited-property",
    category: "sellers",
    title: "Inherited a Home You Don't Want to Keep?",
    description:
      "Inheriting a property comes with taxes, maintenance, and tough decisions. Get clarity on selling, keeping, or renting what you've been given.",
    audience:
      "Heirs who have inherited a home and need to decide whether to sell, rent, or occupy it.",
    cta: "Get inherited property help",
    benefits: [
      "Tax implications guidance — stepped-up basis, capital gains, and estate taxes.",
      "Property condition assessment for sell-now vs. renovate-first decisions.",
      "Coordination with estate attorneys and co-heirs.",
    ],
    steps: [
      "Capture property details, ownership situation, and timeline.",
      "Provide market value estimate and sell vs. hold analysis.",
      "Route into listing, estate cleanout, or property management.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 16 ── BANKRUPTCY ── */
  {
    slug: "bankruptcy-home-sale",
    category: "sellers",
    title: "Selling Your Home During Bankruptcy",
    description:
      "Bankruptcy doesn't always mean losing your home. In many cases, a strategic sale can satisfy creditors and give you a fresh start.",
    audience:
      "Homeowners in Chapter 7 or Chapter 13 bankruptcy who may need or want to sell their property.",
    cta: "Get bankruptcy sale guidance",
    benefits: [
      "Understand how bankruptcy affects your ability to sell.",
      "Work with the trustee and your attorney to get court approval.",
      "A strategic sale can satisfy debts and protect remaining equity.",
    ],
    steps: [
      "Capture bankruptcy type, attorney info, and property details.",
      "Assess equity, exemptions, and trustee requirements.",
      "Route into court-approved listing, attorney coordination, or hold strategy.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 17 ── JOB TRANSFER ── */
  {
    slug: "job-transfer-sale",
    category: "sellers",
    title: "Job Transfer? Sell Your Home Fast",
    description:
      "When work moves you, your home sale shouldn't slow you down. Get a fast-track plan that works on your employer's timeline.",
    audience:
      "Employees being transferred or taking a new position that requires relocating out of the Hudson Valley.",
    cta: "Start your fast-track sale",
    benefits: [
      "Employer relocation benefit coordination and documentation.",
      "Aggressive pricing and marketing for speed without leaving money behind.",
      "Remote closing support — sign from your new city.",
    ],
    steps: [
      "Capture transfer date, employee relocation benefits, and property details.",
      "Build a fast-track pricing and marketing timeline.",
      "Route into accelerated listing, remote closing, and destination referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 18 ── MILITARY RELOCATION ── */
  {
    slug: "military-relocation",
    category: "sellers",
    title: "PCS Orders? Sell Your Home Before You Move",
    description:
      "Military families face unique timelines and challenges when selling. Get support from an agent who understands PCS moves.",
    audience:
      "Active duty military families at West Point, Stewart ANGB, or other Hudson Valley installations receiving PCS orders.",
    cta: "Get military move help",
    benefits: [
      "Understanding of PCS timelines, BAH considerations, and VA loan implications.",
      "Fast-track listing to match your orders timeline.",
      "Connection to MRP-certified agents at your new duty station.",
    ],
    steps: [
      "Capture PCS date, current property details, and VA loan status.",
      "Build a listing timeline that aligns with your report date.",
      "Route into fast listing, VA assumption guidance, or destination referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 19 ── ESTATE SALE ── */
  {
    slug: "estate-sale",
    category: "sellers",
    title: "Estate Sale: Settling a Loved One's Property",
    description:
      "Selling an estate property involves emotions, logistics, and legal steps. Let us handle the real estate so you can focus on your family.",
    audience:
      "Family members and executors responsible for selling a deceased person's home as part of estate settlement.",
    cta: "Get estate sale help",
    benefits: [
      "Full-service support: cleanout coordination, repairs, staging, and sale.",
      "Experience with estate attorneys, courts, and multi-heir situations.",
      "Sensitive, respectful handling of a difficult process.",
    ],
    steps: [
      "Capture property details, executor status, and family timeline.",
      "Assess property condition and recommend sell-now vs. improve-first.",
      "Route into listing, cleanout resources, or attorney coordination.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 20 ── ABSENTEE OWNER ── */
  {
    slug: "absentee-owner",
    category: "sellers",
    title: "Own Property You Don't Live In? Explore Your Options",
    description:
      "Managing a property from a distance is expensive and stressful. Whether it's a rental, vacation home, or neglected asset — know your exit options.",
    audience:
      "Out-of-area property owners with homes in the Hudson Valley that they don't occupy or actively manage.",
    cta: "Get an absentee owner plan",
    benefits: [
      "Remote selling support — we handle everything on-site.",
      "Sell vs. rent vs. hold analysis with current market data.",
      "Property condition assessment without you needing to visit.",
    ],
    steps: [
      "Capture property details, location, and current status (vacant, rented, etc.).",
      "Provide market value and cash flow analysis.",
      "Route into listing, property management referral, or renovation strategy.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 21 ── RETIREMENT ── */
  {
    slug: "retirement-sale",
    category: "sellers",
    title: "Retiring? Right-Size Your Home & Your Life",
    description:
      "Retirement is your chance to unlock equity, reduce overhead, and live where and how you want. Start with a plan that puts your finances first.",
    audience:
      "Pre-retirees and new retirees in the Hudson Valley looking to sell their family home and transition into their next chapter.",
    cta: "Plan your retirement sale",
    benefits: [
      "Equity analysis: what your home can fund in your retirement.",
      "Tax-smart timing strategies for retirees.",
      "Help finding 55+ communities, condos, or smaller homes.",
    ],
    steps: [
      "Capture property details, retirement timeline, and lifestyle goals.",
      "Provide equity estimate and retirement housing options.",
      "Route into listing, buyer search for downsized home, or financial advisor referral.",
    ],
    sourceBrands: ["Sylvestri"],
  },
];

/* ═══════════════════════════════════════════════
   SQUEEZE PAGES — fast-capture versions
   ═══════════════════════════════════════════════ */
export const motivatedSellerSqueezePages: SqueezePageContent[] = [
  {
    slug: "divorce-sell-fast",
    category: "sellers",
    title: "Divorce Home Sale — Fast Guidance",
    headline: "Going through a divorce and need to sell the house?",
    subheadline: "Get confidential, no-pressure guidance on your options — from pricing to timing to next steps.",
    offer: "Confidential home-sale consultation for divorcing couples",
    cta: "Get confidential help",
    bullets: [
      "Discreet, fair process for both parties.",
      "Equity analysis so you know what you're splitting.",
      "Fast-track timeline if the court requires it.",
    ],
    trustLine: "Your situation is private. So is this consultation.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/divorce-home-sale",
  },
  {
    slug: "probate-sell-help",
    category: "sellers",
    title: "Probate Property — Get Help Selling",
    headline: "Named executor and need to sell a property?",
    subheadline: "Navigating probate real estate is confusing. Get clear next steps without the pressure.",
    offer: "Probate property selling guide and consultation",
    cta: "Get probate help",
    bullets: [
      "Step-by-step guidance through the court process.",
      "Property value estimate for the estate.",
      "Attorney coordination included.",
    ],
    trustLine: "We've handled probate sales before. You don't have to figure this out alone.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/probate-property-sale",
  },
  {
    slug: "tax-lien-options",
    category: "sellers",
    title: "Tax Lien — Know Your Options",
    headline: "Property taxes piling up? Don't wait until it's too late.",
    subheadline: "Find out if selling could clear the lien and still put money in your pocket.",
    offer: "Free tax lien equity assessment",
    cta: "Check my options",
    bullets: [
      "Know the lien timeline before the county acts.",
      "Equity check: do you have value above the lien?",
      "Sell, negotiate, or hold — get an honest answer.",
    ],
    trustLine: "No judgment. Just a clear picture of where you stand.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/tax-lien-property",
  },
  {
    slug: "foreclosure-options",
    category: "sellers",
    title: "Foreclosure — Explore Your Options",
    headline: "Received a foreclosure notice? You still have time to act.",
    subheadline: "A fast sale can stop the process and protect your credit. Find out if you qualify.",
    offer: "Foreclosure options assessment",
    cta: "Explore foreclosure options",
    bullets: [
      "Understand the timeline — you have more time than you think.",
      "A sale can stop foreclosure and preserve your credit.",
      "No obligation — just honest guidance.",
    ],
    trustLine: "Every day counts. Let's figure out your best path forward.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/foreclosure-help",
  },
  {
    slug: "behind-on-payments",
    category: "sellers",
    title: "Behind on Mortgage — Get Help",
    headline: "Missing mortgage payments? You have options before foreclosure.",
    subheadline: "The earlier you act, the more options you have. Get a free, private assessment.",
    offer: "Pre-foreclosure options review",
    cta: "Get private help now",
    bullets: [
      "Selling before foreclosure saves your credit score.",
      "You may have more equity than you think.",
      "Everything is 100% confidential.",
    ],
    trustLine: "Private, no-pressure, and completely confidential.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/pre-foreclosure",
  },
  {
    slug: "lis-pendens-help",
    category: "sellers",
    title: "Lis Pendens Filed — Get Guidance",
    headline: "Has a lis pendens been filed against your property?",
    subheadline: "Understand what this means for your ability to sell, refinance, or transfer your home.",
    offer: "Lis pendens impact assessment",
    cta: "Get lis pendens help",
    bullets: [
      "Know how it affects your title and sale ability.",
      "Attorney referrals for resolution.",
      "Selling may still be possible — find out how.",
    ],
    trustLine: "Legal filings are scary. Clear answers make them manageable.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/lis-pendens",
  },
  {
    slug: "selling-to-move",
    category: "sellers",
    title: "Sell Before You Move",
    headline: "Planning a move and need to sell first?",
    subheadline: "Get a sell-first strategy that maximizes your proceeds and minimizes the stress.",
    offer: "Move-sale coordination plan",
    cta: "Plan my sale",
    bullets: [
      "Sell-first vs. buy-first strategy comparison.",
      "Timeline coordination so you're not homeless between homes.",
      "One agent handling both sides of the move.",
    ],
    trustLine: "Moving is stressful enough. Selling shouldn't add to it.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/selling-before-moving",
  },
  {
    slug: "downsizing-equity",
    category: "sellers",
    title: "Downsizing — Unlock Your Equity",
    headline: "Ready to trade space for freedom?",
    subheadline: "Find out how much equity you can unlock by downsizing — and what your next home could look like.",
    offer: "Downsizing equity analysis",
    cta: "Check my equity",
    bullets: [
      "Free equity estimate on your current home.",
      "Right-sized home options in your area.",
      "Tax-smart timing advice for your situation.",
    ],
    trustLine: "Downsizing is a strategy, not a step down.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/downsizing-sale",
  },
  {
    slug: "upsizing-plan",
    category: "sellers",
    title: "Upsizing — Upgrade Smart",
    headline: "Need more space for your growing family?",
    subheadline: "Find out what you can afford to upgrade to based on your current home's value.",
    offer: "Upgrade buying-power analysis",
    cta: "Calculate my upgrade",
    bullets: [
      "Know your upgrade budget before you start looking.",
      "Avoid carrying two mortgages with smart timing.",
      "School district and neighborhood matching.",
    ],
    trustLine: "More space doesn't have to mean more stress.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/upsizing-sale",
  },
  {
    slug: "relocation-sell",
    category: "sellers",
    title: "Relocation Sale — Sell Fast",
    headline: "Relocating and need to sell your Hudson Valley home?",
    subheadline: "Fast-track strategies for sellers who can't wait for perfection.",
    offer: "Relocation fast-track plan",
    cta: "Start my relocation sale",
    bullets: [
      "Aggressive pricing for speed without leaving money behind.",
      "Remote closing support from anywhere.",
      "Agent referral at your destination.",
    ],
    trustLine: "Your move doesn't wait. Neither do we.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/relocation-sale",
  },
  {
    slug: "expired-listing-fix",
    category: "sellers",
    title: "Expired Listing — Get a Better Plan",
    headline: "Your listing expired. That doesn't mean your home can't sell.",
    subheadline: "Get an honest diagnosis of what went wrong and a new strategy that works.",
    offer: "Free expired listing diagnosis",
    cta: "Diagnose my listing",
    bullets: [
      "Honest feedback on pricing, photos, and marketing.",
      "New strategy, not just a price cut.",
      "No long lockout contract required.",
    ],
    trustLine: "The market didn't fail. The strategy did. Let's fix it.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/expired-listing",
  },
  {
    slug: "fsbo-rescue",
    category: "sellers",
    title: "FSBO Not Working — Get Help",
    headline: "Trying to sell by owner and hitting a wall?",
    subheadline: "Find out if going FSBO is actually saving you money — or costing you thousands.",
    offer: "FSBO vs. agent net-proceeds comparison",
    cta: "Compare my options",
    bullets: [
      "Free net-proceeds comparison: FSBO vs. listed.",
      "MLS access, professional photos, and buyer exposure.",
      "You keep control — we add the firepower.",
    ],
    trustLine: "No guilt trip. Just the math.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/fsbo-help",
  },
  {
    slug: "vacant-home-plan",
    category: "sellers",
    title: "Vacant Home — Stop Paying for Nothing",
    headline: "Paying taxes, insurance, and upkeep on an empty house?",
    subheadline: "Find out what your vacant property is worth and whether selling beats holding.",
    offer: "Vacant property value and cost analysis",
    cta: "Analyze my vacant home",
    bullets: [
      "Calculate your true monthly carrying cost.",
      "Get a current market value estimate.",
      "Sell, rent, or renovate — see the real numbers.",
    ],
    trustLine: "Empty homes drain money. Full stop.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/vacant-property",
  },
  {
    slug: "code-violation-sell",
    category: "sellers",
    title: "Code Violations — Can You Still Sell?",
    headline: "Got code violations or unpermitted work on your property?",
    subheadline: "Find out if you can sell as-is, what it costs to fix, or if an investor is your best bet.",
    offer: "Code violation selling options assessment",
    cta: "Check my options",
    bullets: [
      "Know what must be fixed vs. what can be disclosed.",
      "Cost-to-cure estimates from local contractors.",
      "As-is sale strategies for tough situations.",
    ],
    trustLine: "Code issues don't always kill a deal. Let's find out.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/code-violation-property",
  },
  {
    slug: "inherited-home-sell",
    category: "sellers",
    title: "Inherited Property — Sell or Keep?",
    headline: "Inherited a home and don't know what to do with it?",
    subheadline: "Get the tax facts, value estimate, and decision framework to make the right call.",
    offer: "Inherited property decision guide",
    cta: "Get my options",
    bullets: [
      "Stepped-up basis and capital gains explained simply.",
      "Sell vs. rent vs. keep — see the real numbers.",
      "Estate cleanout and prep coordination available.",
    ],
    trustLine: "No rush, no pressure. Just clarity when you need it.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/inherited-property",
  },
  {
    slug: "bankruptcy-sell-help",
    category: "sellers",
    title: "Bankruptcy — Can You Sell Your Home?",
    headline: "Filing for bankruptcy? Your home may still be an asset you can control.",
    subheadline: "Understand whether selling makes sense — and how the process works with your trustee.",
    offer: "Bankruptcy home-sale assessment",
    cta: "Get bankruptcy guidance",
    bullets: [
      "Chapter 7 vs. Chapter 13 — how each affects your home.",
      "Court approval process for bankruptcy home sales.",
      "Protect remaining equity where possible.",
    ],
    trustLine: "Bankruptcy isn't the end. It can be a strategic reset.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/bankruptcy-home-sale",
  },
  {
    slug: "job-transfer-sell",
    category: "sellers",
    title: "Job Transfer — Sell Fast",
    headline: "New job, new city — need to sell your home ASAP?",
    subheadline: "Get a fast-track listing strategy that works on your employer's timeline.",
    offer: "Fast-track job transfer sale plan",
    cta: "Start my fast sale",
    bullets: [
      "Employer relocation benefit coordination.",
      "Aggressive marketing for maximum speed.",
      "Remote closing — sign from your new city.",
    ],
    trustLine: "Your career won't wait. Your home sale shouldn't slow it down.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/job-transfer-sale",
  },
  {
    slug: "pcs-home-sale",
    category: "sellers",
    title: "PCS Orders — Military Home Sale",
    headline: "Got PCS orders and need to sell before you report?",
    subheadline: "Military families face unique timelines. Get support from someone who understands.",
    offer: "Military PCS home-sale plan",
    cta: "Get PCS move help",
    bullets: [
      "Timeline aligned to your report date.",
      "VA loan implications and assumption options.",
      "Agent referral at your new duty station.",
    ],
    trustLine: "Thank you for your service. Let us serve you back.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/military-relocation",
  },
  {
    slug: "estate-property-help",
    category: "sellers",
    title: "Estate Property — Selling Help",
    headline: "Need to sell a loved one's home as part of the estate?",
    subheadline: "We handle the real estate so you can handle the family.",
    offer: "Estate property selling support",
    cta: "Get estate help",
    bullets: [
      "Cleanout coordination, staging, and listing.",
      "Multi-heir coordination and communication.",
      "Sensitive, respectful approach guaranteed.",
    ],
    trustLine: "This is a difficult time. We make the selling part easier.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/estate-sale",
  },
  {
    slug: "absentee-owner-sell",
    category: "sellers",
    title: "Absentee Owner — Remote Selling Options",
    headline: "Own a Hudson Valley property but live somewhere else?",
    subheadline: "Find out what it's worth and whether selling beats holding from a distance.",
    offer: "Remote property value assessment",
    cta: "Get my property value",
    bullets: [
      "Full remote selling support — we handle everything locally.",
      "Current value estimate without you needing to visit.",
      "Sell vs. rent vs. hold analysis with real numbers.",
    ],
    trustLine: "You don't need to be here. We do, and we are.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/absentee-owner",
  },
  {
    slug: "retirement-home-plan",
    category: "sellers",
    title: "Retirement — Right-Size Your Life",
    headline: "Retiring soon and thinking about your next move?",
    subheadline: "Unlock the equity in your home and plan a retirement that works on your terms.",
    offer: "Retirement home-sale financial plan",
    cta: "Plan my retirement sale",
    bullets: [
      "Equity projection for your retirement funding.",
      "55+ communities, condos, and right-size options.",
      "Tax-smart timing for retirees.",
    ],
    trustLine: "You've earned this chapter. Let's fund it properly.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/retirement-sale",
  },
];

/* ═══════════════════════════════════════════════
   Helper to get all new slugs for sitemap/routing
   ═══════════════════════════════════════════════ */
export const allMotivatedSellerLandingSlugs = motivatedSellerLandingPages.map(
  (p) => p.slug,
);
export const allMotivatedSellerSqueezeSlugs = motivatedSellerSqueezePages.map(
  (p) => p.slug,
);

/* ═══════════════════════════════════════════════
   BUYER LANDING PAGES — 15 buyer categories
   ═══════════════════════════════════════════════ */
export const buyerLandingPages: LandingPageContent[] = [
  /* 1 ── FIRST-TIME BUYER PLAN ── */
  {
    slug: "first-time-buyer-plan",
    category: "buyers",
    title: "First-Time Homebuyer Plan for Hudson Valley",
    description:
      "Navigate your first home purchase with a clear roadmap. Learn what lenders look for, how much you can afford, and what to expect at closing.",
    audience:
      "First-time homebuyers in Hudson Valley who want clarity on the process, financing, and timelines before they start house hunting.",
    cta: "Get your buyer blueprint",
    benefits: [
      "Pre-approval strategy that gets you competitive offers.",
      "Step-by-step guide from pre-qualification through closing.",
      "Avoid costly mistakes that first-time buyers commonly make.",
    ],
    steps: [
      "Financial readiness check: credit, down payment, and pre-approval.",
      "Market orientation: neighborhoods, schools, commute times, values.",
      "Offer strategy: how to be competitive without overpaying.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 2 ── MOVE-UP BUYER ── */
  {
    slug: "move-up-buyer",
    category: "buyers",
    title: "Move-Up Buyer — Trade Up to Your Next Home",
    description:
      "Ready to upgrade from your starter home? Strategy to sell current property and buy next one without leaving yourself short.",
    audience:
      "Current homeowners in Hudson Valley who have built equity and want to move to a larger or better-located property.",
    cta: "Plan your upgrade move",
    benefits: [
      "Coordinate timing to avoid double mortgages or gaps.",
      "Maximize equity from your current home for the next down payment.",
      "Negotiate both sales and purchase in your favor.",
    ],
    steps: [
      "Equity and down-payment analysis on your current home.",
      "Target neighborhoods and price range based on your budget.",
      "Contingency strategy: bridge options if timing is tight.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 3 ── AGING BUYER ── */
  {
    slug: "aging-buyer",
    category: "buyers",
    title: "Senior Living — Right-Size for Retirement",
    description:
      "Find an accessible, lower-maintenance home perfect for your retirement. Explore 55+ communities, condos, and age-friendly properties.",
    audience:
      "Homeowners 55+ in Hudson Valley ready to simplify their living situation while maintaining independence and community.",
    cta: "Explore your options",
    benefits: [
      "Accessible properties with single-level living and minimal maintenance.",
      "55+ communities and condos with activities and services.",
      "Proximity to hospitals, shopping, and family without isolation.",
    ],
    steps: [
      "Lifestyle assessment: active community, condo, or single-family preferred?",
      "Budget and down-payment planning for your transition.",
      "Tour communities and neighborhoods that fit your social needs.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 4 ── VA/MILITARY BUYER ── */
  {
    slug: "va-military-buyer",
    category: "buyers",
    title: "VA Loan Buyer — Maximize Your Military Benefit",
    description:
      "Use your VA loan benefit to buy with no down payment in Hudson Valley. Understand rates, inspections, and appraisals specific to VA loans.",
    audience:
      "Active-duty and veteran homebuyers near West Point, Stewart ANGB, and Hudson Valley who qualify for VA loan benefits.",
    cta: "Get VA loan details",
    benefits: [
      "Zero down payment and favorable interest rates for eligible veterans.",
      "VA appraisal protections that keep you from overpaying.",
      "No PMI (private mortgage insurance) required.",
    ],
    steps: [
      "Verify eligibility and obtain your Certificate of Eligibility (COE).",
      "Get pre-approved with a lender experienced in VA loans.",
      "Understand VA appraisal process and how it protects you.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 5 ── RELOCATION BUYER INTAKE ── */
  {
    slug: "relocation-buyer-intake",
    category: "buyers",
    title: "Moving to Hudson Valley — Relocation Guide",
    description:
      "Relocating to Hudson Valley from out of state? Get oriented to neighborhoods, schools, commute patterns, and communities before you arrive.",
    audience:
      "Incoming professionals and families moving to Hudson Valley for work or lifestyle, unfamiliar with the region.",
    cta: "Get my relocation guide",
    benefits: [
      "Understand Hudson Valley towns, commute times, and lifestyle fit.",
      "School ratings, proximity to employment hubs, and community vibe.",
      "Avoid overpaying due to market unfamiliarity.",
    ],
    steps: [
      "Town-by-town overview: Beacon, Wappingers, Poughkeepsie, Rhinebeck, and more.",
      "Commute mapping to your workplace(s) and lifestyle anchors.",
      "Budget alignment with Hudson Valley market realities.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 6 ── CONDO/TOWNHOME BUYER ── */
  {
    slug: "condo-townhome-buyer",
    category: "buyers",
    title: "Condo & Townhome Buyer — Navigate HOA & Financing",
    description:
      "Buying a condo or townhome? Understand HOA costs, shared-wall restrictions, and special financing rules before you make an offer.",
    audience:
      "Buyers in Hudson Valley interested in condos or townhomes who want clarity on HOA rules, fees, and what lenders require.",
    cta: "Understand condo buying",
    benefits: [
      "HOA documents explained — find hidden fees before you buy.",
      "Understand reserve studies and special assessments.",
      "Financing requirements specific to condos (and condo-friendly lenders).",
    ],
    steps: [
      "HOA review: budget, rules, approval process, pending assessments.",
      "Building inspection focus: roof, parking, foundation, common areas.",
      "Lender coordination: some require higher reserves or specific documentation.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 7 ── LUXURY BUYER ── */
  {
    slug: "luxury-buyer",
    category: "buyers",
    title: "Luxury Homes in Hudson Valley — Strategic Approach",
    description:
      "Buying a high-end Hudson Valley property requires market knowledge and patience. Find properties with lasting value and strong appreciation.",
    audience:
      "Affluent buyers seeking luxury properties in Hudson Valley with strong bones, location, and appreciation potential.",
    cta: "Discuss your luxury search",
    benefits: [
      "Access to off-market luxury listings and pocket deals.",
      "Market analysis of comparable sales in your target segment.",
      "Strategic negotiation for properties in the $1M+ range.",
    ],
    steps: [
      "Define lifestyle priorities: waterfront, privacy, estates, proximity.",
      "Market analysis of similar sales to understand fair value.",
      "Due diligence: structural integrity, systems, hidden costs of luxury properties.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 8 ── SECOND HOME BUYER ── */
  {
    slug: "second-home-buyer",
    category: "buyers",
    title: "Second Home Buyer — Vacation or Investment?",
    description:
      "Buy a Hudson Valley vacation or weekend home with clarity on financing, rental income potential, and tax implications.",
    audience:
      "Buyers interested in a second home in Hudson Valley for personal use or rental income, seeking tax and financing strategy.",
    cta: "Plan your second home",
    benefits: [
      "Financing strategy for vacation homes (different down payment rules).",
      "Rental income projection if you plan to rent when you're not using it.",
      "Tax implications and deduction opportunities for second homes.",
    ],
    steps: [
      "Budget clarity: purchase price, carrying costs, maintenance, property tax.",
      "Rental income analysis if you'll rent the property seasonally.",
      "Down payment and lending options specific to second homes.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 9 ── LAND/LOT BUYER ── */
  {
    slug: "land-lot-buyer",
    category: "buyers",
    title: "Land & Lot Buyer — Build Your Own",
    description:
      "Buying raw land or a buildable lot in Hudson Valley? Understand zoning, septic, utilities, and builder timelines before you commit.",
    audience:
      "Buyers interested in purchasing vacant land or buildable lots in Hudson Valley to build custom homes.",
    cta: "Evaluate land opportunity",
    benefits: [
      "Zoning and building code clarity so you know what you can build.",
      "Septic, well, utility availability and cost assessment.",
      "Timeline and cost reality for bringing raw land to buildable status.",
    ],
    steps: [
      "Zoning and code review: setbacks, lot size, allowed uses.",
      "Septic, well, and utility feasibility study.",
      "Soil and environmental testing; wetland or stream easements.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 10 ── NEW CONSTRUCTION BUYER ── */
  {
    slug: "new-construction-buyer",
    category: "buyers",
    title: "New Construction Buyer — Negotiate with Builders",
    description:
      "Buying new construction in Hudson Valley? Understand builder incentives, warranty coverage, and negotiation leverage.",
    audience:
      "Buyers considering new homes or developments in Hudson Valley who want to understand builder deals and what to ask for.",
    cta: "Get builder negotiation tips",
    benefits: [
      "Builder incentive strategy: upgrades, closing costs, rate buydowns.",
      "Warranty coverage comparison across builders.",
      "Timeline and performance risk assessment.",
    ],
    steps: [
      "Compare developments and builders: reputation, quality, timeline.",
      "Incentive negotiation: upgrades, financing support, closing cost credits.",
      "Inspection protocol as construction progresses and at final walk-through.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 11 ── MULTI-FAMILY BUYER ── */
  {
    slug: "multi-family-buyer",
    category: "buyers",
    title: "Multi-Family Buyer — House-Hack or Small Portfolio",
    description:
      "Buy a 2-4 unit property in Hudson Valley to live in one unit and rent the others. Build wealth through real estate.",
    audience:
      "Investors and owner-occupants interested in multi-family properties (2-4 units) for portfolio building or house-hacking.",
    cta: "Explore multi-family options",
    benefits: [
      "Owner-occupant financing on multi-family (better rates than pure investment).",
      "Rental income analysis: verify landlord expenses and actual cash flow.",
      "Portfolio strategy: how multi-family fits into wealth building.",
    ],
    steps: [
      "Financial model: rental income minus taxes, insurance, maintenance, vacancy.",
      "Tenant due diligence: verify existing leases, tenant quality, compliance.",
      "Financing: owner-occupant loan options for 2-4 unit properties.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 12 ── FIX-FLIP BUYER ── */
  {
    slug: "fix-flip-buyer",
    category: "buyers",
    title: "Fix-and-Flip Buyer — Investor Opportunity Analysis",
    description:
      "Buy a property that needs work in Hudson Valley with accurate rehab cost projections and exit strategy.",
    audience:
      "Real estate investors in Hudson Valley seeking fix-and-flip opportunities with clear value-add and sale potential.",
    cta: "Analyze investment potential",
    benefits: [
      "Contractor-level property assessment: structural, systems, code issues.",
      "Realistic rehab cost estimates based on Hudson Valley market rates.",
      "After-repair-value (ARV) analysis and exit strategy.",
    ],
    steps: [
      "Property inspection: identify scope, estimate contractor-level costs.",
      "ARV analysis: what will similar renovated homes sell for?",
      "Financing options: hard money, bridge loans, and exit strategy.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 13 ── FHA BUYER ── */
  {
    slug: "fha-buyer",
    category: "buyers",
    title: "FHA Loan Buyer — Lower Down Payment Option",
    description:
      "Buy with 3.5% down using an FHA loan in Hudson Valley. Understand FHA appraisals, insurance, and property requirements.",
    audience:
      "First-time and other buyers in Hudson Valley who qualify for FHA financing and want clarity on the process.",
    cta: "Understand FHA loans",
    benefits: [
      "Lower down payment (3.5%) makes homeownership accessible.",
      "More flexible credit and income requirements than conventional loans.",
      "FHA appraisal protects you from overpaying.",
    ],
    steps: [
      "Pre-approval with FHA-experienced lender; understand mortgage insurance costs.",
      "Understand FHA appraisal requirements: property must be safe and habitable.",
      "Budget for FHA mortgage insurance premium (one-time and annual).",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 14 ── DIVORCE BUYER ── */
  {
    slug: "divorce-buyer",
    category: "buyers",
    title: "Divorce Buyer — Fresh Start in Hudson Valley",
    description:
      "Buying your first home post-divorce? Navigate financing, custody considerations, and emotional fresh start with confidence.",
    audience:
      "Individuals recently divorced in Hudson Valley who are ready to buy independently and want a clear buying process.",
    cta: "Plan your fresh start",
    benefits: [
      "Financing clarity if divorce affected credit or income verification.",
      "Neighborhood guidance: proximity to schools (if custody), social community.",
      "Neutral, judgment-free guidance through a major life transition.",
    ],
    steps: [
      "Financial clarity: income verification, credit review, down payment planning.",
      "Neighborhood fit: schools, safety, social connections, commute.",
      "Offer strategy that positions you as a strong buyer.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 15 ── CASH BUYER ── */
  {
    slug: "cash-buyer",
    category: "buyers",
    title: "Cash Buyer — Immediate Purchase Power",
    description:
      "Buying all-cash in Hudson Valley? Use your leverage to negotiate and close on timeline. Understand cash advantages and strategy.",
    audience:
      "Affluent buyers or investors with cash reserves who want to understand negotiating leverage and tax implications.",
    cta: "Discuss cash strategy",
    benefits: [
      "Negotiating leverage: sellers prefer certain closings, no financing contingency.",
      "Faster closing timeline — advantage in competitive markets.",
      "Opportunity to negotiate after-close terms or inspector-requested repairs.",
    ],
    steps: [
      "Property inspection and due diligence (your only contingency).",
      "Title and survey review for any issues before closing.",
      "Closing timeline coordination; potential holdback for final repairs.",
    ],
    sourceBrands: ["Sylvestri"],
  },
];

/* ═══════════════════════════════════════════════
   BUYER SQUEEZE PAGES
   ═══════════════════════════════════════════════ */
export const buyerSqueezePages: SqueezePageContent[] = [
  {
    slug: "first-time-buyer-blueprint",
    category: "buyers",
    title: "First-Time Buyer Blueprint",
    headline: "Ready to buy but don't know where to start?",
    subheadline: "Get a step-by-step guide to pre-approval, offers, and closing — tailored to Hudson Valley.",
    offer: "Free first-time buyer roadmap",
    cta: "Get my roadmap",
    bullets: [
      "Pre-approval process: credit, income, down payment requirements.",
      "Market overview: neighborhoods, schools, and what homes cost where.",
      "Offer and closing timeline from inspection to keys.",
    ],
    trustLine: "You're not alone in this. We've guided hundreds of first-time buyers.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/first-time-buyer-plan",
  },
  {
    slug: "move-up-strategy",
    category: "buyers",
    title: "Move-Up Home Strategy",
    headline: "Ready to upgrade to your next home?",
    subheadline: "Sell your current property and buy next one without leaving yourself short.",
    offer: "Move-up timing and financing strategy",
    cta: "Plan my upgrade",
    bullets: [
      "Equity analysis: how much can you put toward your next down payment?",
      "Contingency strategy if timing is tight between sales.",
      "Negotiation power when you're both selling and buying.",
    ],
    trustLine: "We've coordinated hundreds of upgrades. Timing is everything.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/move-up-buyer",
  },
  {
    slug: "senior-housing-options",
    category: "buyers",
    title: "Senior Housing Options Guide",
    headline: "Ready to downsize or simplify your living?",
    subheadline: "Explore 55+ communities, condos, and accessible homes in Hudson Valley.",
    offer: "Senior living options assessment",
    cta: "Explore options",
    bullets: [
      "55+ communities with activities, amenities, and social groups.",
      "Single-level condos and low-maintenance homes.",
      "Proximity to hospitals, shopping, family, and quality of life factors.",
    ],
    trustLine: "This is your time. Let's make it comfortable and connected.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/aging-buyer",
  },
  {
    slug: "va-loan-guide",
    category: "buyers",
    title: "VA Loan Buyer Guide",
    headline: "Did you serve? You may qualify for a VA loan.",
    subheadline: "Learn how zero down and no PMI could work for your Hudson Valley home.",
    offer: "VA loan benefit breakdown and pre-approval info",
    cta: "Check my VA eligibility",
    bullets: [
      "Zero down payment and favorable rates for eligible veterans.",
      "VA appraisal protections that keep you from overpaying.",
      "No PMI (mortgage insurance) required.",
    ],
    trustLine: "You've served the country. Let's make sure you get your benefit.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/va-military-buyer",
  },
  {
    slug: "relocating-to-hudson-valley",
    category: "buyers",
    title: "Relocating to Hudson Valley",
    headline: "Moving to Hudson Valley from out of state?",
    subheadline: "Get oriented to towns, commutes, schools, and neighborhoods before you arrive.",
    offer: "Comprehensive relocation guide and neighborhood overview",
    cta: "Get relocation guide",
    bullets: [
      "Town profiles: Beacon, Wappingers, Rhinebeck, Poughkeepsie, and more.",
      "Commute times to job hubs and quality-of-life factors.",
      "School ratings and family-friendly neighborhoods.",
    ],
    trustLine: "We know Hudson Valley inside and out. Let us be your guide.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/relocation-buyer-intake",
  },
  {
    slug: "condo-buyer-checklist",
    category: "buyers",
    title: "Condo Buyer Checklist",
    headline: "Interested in a condo or townhome?",
    subheadline: "Understand HOA costs, shared-wall issues, and financing before you make an offer.",
    offer: "Condo due-diligence checklist and HOA guide",
    cta: "Get condo checklist",
    bullets: [
      "HOA review: fees, rules, reserves, special assessments.",
      "Building inspection focus: shared walls, roof, common areas, systems.",
      "Financing: which lenders work with condos and what they require.",
    ],
    trustLine: "We've reviewed hundreds of HOA documents. You won't miss anything important.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/condo-townhome-buyer",
  },
  {
    slug: "luxury-home-strategy",
    category: "buyers",
    title: "Luxury Home Buyer Strategy",
    headline: "Looking for a high-end property in Hudson Valley?",
    subheadline: "Learn how to identify lasting value and negotiate in the luxury segment.",
    offer: "Luxury market analysis and acquisition strategy",
    cta: "Discuss luxury purchase",
    bullets: [
      "Off-market access and pocket listings in your price range.",
      "Comparable sales analysis for fair valuation at high price points.",
      "Strategic negotiation and due diligence for luxury properties.",
    ],
    trustLine: "We've sold luxury properties across Hudson Valley. Integrity and results matter.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/luxury-buyer",
  },
  {
    slug: "second-home-plan",
    category: "buyers",
    title: "Second Home Buyer Plan",
    headline: "Ready to invest in a vacation or weekend home?",
    subheadline: "Understand financing, rental income potential, and tax strategy.",
    offer: "Second home financial projection and strategy",
    cta: "Plan second home purchase",
    bullets: [
      "Financing options: down payment and rates for vacation homes.",
      "Rental income analysis and seasonal management strategy.",
      "Tax implications and deduction opportunities.",
    ],
    trustLine: "We help owners maximize both personal enjoyment and financial returns.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/second-home-buyer",
  },
  {
    slug: "land-buyer-guide",
    category: "buyers",
    title: "Land Buyer Guide",
    headline: "Considering raw land or a buildable lot?",
    subheadline: "Learn zoning, utilities, septic, and builder coordination before you commit.",
    offer: "Land feasibility assessment and builder coordination",
    cta: "Evaluate land opportunity",
    bullets: [
      "Zoning and building code review: what can you actually build?",
      "Septic, well, and utility feasibility and cost estimates.",
      "Soil, environmental, and wetland assessment.",
    ],
    trustLine: "Land development is complex. We help you avoid costly mistakes.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/land-lot-buyer",
  },
  {
    slug: "new-construction-tips",
    category: "buyers",
    title: "New Construction Buyer Tips",
    headline: "Interested in a brand-new home?",
    subheadline: "Understand builder incentives, warranties, and negotiation leverage.",
    offer: "Builder negotiation strategy and incentive analysis",
    cta: "Get builder strategy",
    bullets: [
      "Incentive negotiation: upgrades, closing costs, rate buydowns.",
      "Warranty coverage and builder reputation comparison.",
      "Construction timeline, inspection protocol, final walk-through.",
    ],
    trustLine: "Builders have leverage. So do you. We level the playing field.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/new-construction-buyer",
  },
  {
    slug: "multifamily-analysis",
    category: "buyers",
    title: "Multi-Family Investment Analysis",
    headline: "Thinking about a 2-4 unit property?",
    subheadline: "Live in one unit and rent the others. Build wealth through real estate.",
    offer: "Cash flow analysis and house-hack strategy",
    cta: "Analyze investment",
    bullets: [
      "Rental income projection: real numbers after expenses and vacancy.",
      "Tenant due diligence: lease verification and quality assessment.",
      "Owner-occupant financing options and wealth-building strategy.",
    ],
    trustLine: "Multi-family is powerful. Numbers have to make sense. We make sure they do.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/multi-family-buyer",
  },
  {
    slug: "fix-flip-evaluation",
    category: "buyers",
    title: "Fix-and-Flip Evaluation",
    headline: "Found a property that needs work?",
    subheadline: "Understand rehab costs, after-repair value, and exit strategy before you buy.",
    offer: "Rehab cost estimate and investment analysis",
    cta: "Evaluate opportunity",
    bullets: [
      "Structural and systems assessment: scope of work and cost realism.",
      "After-repair-value (ARV) analysis based on comps.",
      "Financing options: hard money, bridge loans, exit timing.",
    ],
    trustLine: "Numbers don't lie. We help you find deals where the numbers actually work.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/fix-flip-buyer",
  },
  {
    slug: "fha-loan-breakdown",
    category: "buyers",
    title: "FHA Loan Breakdown",
    headline: "Want to buy with a lower down payment?",
    subheadline: "FHA loans can get you into a home with just 3.5% down.",
    offer: "FHA loan qualification and cost breakdown",
    cta: "Check FHA eligibility",
    bullets: [
      "Lower down payment (3.5%) — more accessible entry point.",
      "Flexible credit and income requirements.",
      "FHA appraisal protection against overpaying.",
    ],
    trustLine: "We work with FHA lenders who understand the program inside and out.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/fha-buyer",
  },
  {
    slug: "post-divorce-buyer-guide",
    category: "buyers",
    title: "Post-Divorce Homebuyer Guide",
    headline: "Ready for a fresh start after divorce?",
    subheadline: "Buy your own home with clarity on financing, timing, and community.",
    offer: "Post-divorce buying strategy and financial guidance",
    cta: "Plan my fresh start",
    bullets: [
      "Financing options if divorce affected credit or income.",
      "Neighborhood fit: schools, community, and quality of life.",
      "Timeline to close and moving forward with confidence.",
    ],
    trustLine: "This is a new chapter. Let's make it a strong one.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/divorce-buyer",
  },
  {
    slug: "cash-buyer-advantage",
    category: "buyers",
    title: "Cash Buyer Advantage",
    headline: "Buying with cash? You have significant leverage.",
    subheadline: "Understand negotiation power, closing speed, and tax strategy.",
    offer: "Cash buyer negotiation and strategy framework",
    cta: "Discuss cash strategy",
    bullets: [
      "Seller preference for all-cash deals — use it to your advantage.",
      "Faster closing timeline and no financing contingency.",
      "Negotiation leverage on price, repairs, and timeline.",
    ],
    trustLine: "Cash is king. We help you use that leverage strategically.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/cash-buyer",
  },
];

/* ═══════════════════════════════════════════════
   ADDITIONAL SELLER LANDING PAGES — 10 more categories
   ═══════════════════════════════════════════════ */
export const additionalSellerLandingPages: LandingPageContent[] = [
  /* 1 ── DEATH IN FAMILY (emotional side) ── */
  {
    slug: "loss-sell-home",
    category: "sellers",
    title: "Selling a Home After Loss — Compassionate Support",
    description:
      "Grieving the loss of a loved one and now facing the emotional task of selling their home. Get compassionate guidance with time and dignity.",
    audience:
      "Family members dealing with the emotional aftermath of a loved one's death who need to sell their home without pressure or timeline.",
    cta: "Get compassionate support",
    benefits: [
      "No pressure timeline — we respect your grieving process.",
      "Handling the emotional side while managing the business side.",
      "Discreet, dignified process that honors the home's history.",
    ],
    steps: [
      "Intake conversation: your timeline, emotional needs, and any items of value.",
      "Market analysis and fair pricing to maximize estate value.",
      "Flexible timeline: we'll work at your pace, not a calendar's.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 2 ── PENDING SALE FALLTHROUGH ── */
  {
    slug: "pending-sale-fallthrough",
    category: "sellers",
    title: "Deal Fell Through? Relist Your Home",
    description:
      "Your sale fell through, and now you need to relist quickly. Get a fresh strategy and competitive positioning to move your property.",
    audience:
      "Homeowners whose sale fell through and need to relist their property quickly with renewed confidence and market positioning.",
    cta: "Relist with a fresh strategy",
    benefits: [
      "Honest analysis of why the deal fell through — and how to prevent it again.",
      "Pricing and positioning strategy to regain buyer momentum.",
      "Inspection and disclosure items identified so there are no surprises.",
    ],
    steps: [
      "Post-fallthrough debrief: terms, appraisal issues, inspection surprises.",
      "Adjust pricing, repair strategy, or timeline based on market feedback.",
      "Aggressive marketing to signal that the home is ready to sell.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 3 ── HIGH EQUITY HOMEOWNER ── */
  {
    slug: "high-equity-homeowner",
    category: "sellers",
    title: "High Equity Home — Should You Sell or Hold?",
    description:
      "You've built significant equity. Understand the financial case for selling now vs. holding, plus tax implications of a big sale.",
    audience:
      "Homeowners with substantial equity who are considering selling and want financial clarity on timing and tax strategy.",
    cta: "Analyze your options",
    benefits: [
      "Equity analysis: how much could you walk away with after taxes and costs?",
      "Tax planning: primary residence capital gains exclusion and timing.",
      "Hold vs. sell financial comparison with real numbers.",
    ],
    steps: [
      "Equity projection and net proceeds estimate (after costs and taxes).",
      "Tax scenario: capital gains impact and strategies to reduce liability.",
      "Reinvestment analysis: what could you do with the proceeds?",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 4 ── TIRED LANDLORD ── */
  {
    slug: "tired-landlord-exit",
    category: "sellers",
    title: "Tired Landlord — Exit Your Rental Property",
    description:
      "Renting out your property isn't what you hoped. Get out cleanly with a clear strategy for tenant relocation and market timing.",
    audience:
      "Rental property owners in Hudson Valley tired of management, tenant issues, or low cash flow who want to sell and move on.",
    cta: "Plan your exit",
    benefits: [
      "Tenant notice and relocation strategy so you exit cleanly.",
      "Market analysis: optimal sale timing given rents and cap rates.",
      "Buyer positioning: investor properties sell differently than owner-occupied.",
    ],
    steps: [
      "Tenant situation review: notice requirements and relocation logistics.",
      "Rent rolls and property financials to market to investors.",
      "Pricing strategy: cap rate analysis and investor-friendly terms.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 5 ── SECOND HOME SELLER ── */
  {
    slug: "second-home-sale",
    category: "sellers",
    title: "Selling a Second Home — Maximize Your Capital",
    description:
      "Selling a vacation or weekend property? Understand tax implications, timing, and buyer positioning for a faster, smarter sale.",
    audience:
      "Owners of vacation homes or weekend properties in Hudson Valley who want to sell and understand tax and timing strategies.",
    cta: "Sell your second home",
    benefits: [
      "Tax strategy: capital gains treatment for second homes (different rules).",
      "Seasonal buyer positioning: market timing for maximum exposure.",
      "Out-of-state marketing to reach seasonal buyers and investors.",
    ],
    steps: [
      "Tax analysis: capital gains rules for second properties (no primary residence exclusion).",
      "Seasonal market timing: when buyers search for vacation homes.",
      "Listing positioning: highlight seasonal appeal and rental income potential.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 6 ── LUXURY HOME SELLER ── */
  {
    slug: "luxury-home-sale",
    category: "sellers",
    title: "Luxury Home Sale — Command Top Market Value",
    description:
      "Selling a high-end Hudson Valley property requires different marketing and buyer pool. Reach the right buyers and command premium pricing.",
    audience:
      "Sellers of luxury or high-end properties in Hudson Valley who want sophisticated marketing and access to affluent buyer networks.",
    cta: "Discuss luxury sale strategy",
    benefits: [
      "Access to affluent buyer networks and off-market buyer inquiries.",
      "Sophisticated marketing: professional photography, video, targeted advertising.",
      "Strategic pricing and negotiation in the luxury segment.",
    ],
    steps: [
      "Market analysis: comparable luxury sales and fair positioning.",
      "Professional media: photography, drone, video, 3D tour.",
      "Targeted marketing to high-net-worth individuals and second-home buyers.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 7 ── LAND SELLER ── */
  {
    slug: "land-sale",
    category: "sellers",
    title: "Land Sale — Find Builders and Developers",
    description:
      "Selling raw land or a large parcel in Hudson Valley. Reach builders, developers, and investors who value your property for development.",
    audience:
      "Landowners with buildable parcels or vacant land in Hudson Valley who want to connect with builders, developers, and investors.",
    cta: "List your land",
    benefits: [
      "Builder and developer network — reach the right buyer pool.",
      "Zoning and development potential explained to attract qualified buyers.",
      "Pricing strategy based on development potential, not just comparable land.",
    ],
    steps: [
      "Land analysis: zoning, development potential, site constraints.",
      "Positioning: market to builders, investors, and owner-builders.",
      "Outreach to development community in Hudson Valley and nearby markets.",
    ],
    sourceBrands: ["Sylvestri"],
  },
  /* 8 ── NEW CONSTRUCTION SELLER ── */
  {
    slug: "new-construction-sale",
    category: "sellers",
    title: "New Construction or Builder Inventory — Quick Exit",
    description:
      "Builder, contractor, or selling a new build you own? Get strategies to sell inventory quickly and attract owner-occupant buyers.",
    audience:
      "Builders, contractors, and new construction sellers in Hudson Valley looking for rapid inventory turnover and buyer acquisition.",
    cta: "Sell new construction",
    benefits: [
      "Builder network and contractor-to-builder relationships to move inventory.",
      "Financing programs understanding: FHA, VA, first-time buyer incentives.",
      "Pricing strategy to stay competitive in new construction markets.",
    ],
    steps: [
      "Inventory review: phase planning, pricing by unit, timing.",
      "New construction buyer program awareness: incentives and financing programs.",
      "Outreach to first-time buyers and builder-friendly loan programs.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 9 ── FIRE/STORM DAMAGE ── */
  {
    slug: "fire-storm-damage-sale",
    category: "sellers",
    title: "Fire or Storm Damage — Sell As-Is or Rebuild?",
    description:
      "Your home is damaged by fire or storm. Understand your options: sell as-is to an investor, rebuild, or delay. Get clear numbers.",
    audience:
      "Homeowners with fire, water, or storm-damaged properties who need clarity on selling options, insurance, and next steps.",
    cta: "Explore your options",
    benefits: [
      "As-is sale option to investors (quick close, no repairs required).",
      "Insurance claim process and coverage understanding.",
      "Rebuild vs. sell financial analysis with realistic costs.",
    ],
    steps: [
      "Damage assessment and insurance claim coordination.",
      "Buyer positioning: as-is cash investors, rebuild timeline, insurance payoff.",
      "Timeline clarity: hold for insurance, rebuild, or sell quickly.",
    ],
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
  },
  /* 10 ── SENIOR TRANSITION ── */
  {
    slug: "senior-transition-sale",
    category: "sellers",
    title: "Senior Living Transition — Downsize or Move to Care",
    description:
      "Moving to assisted living, memory care, or independent senior community. Sell your home with dignity and timeline flexibility.",
    audience:
      "Seniors and adult children helping manage a parent's transition to care facilities who need to sell their longtime home.",
    cta: "Plan your transition sale",
    benefits: [
      "Flexible timeline — no pressure to rush during a major life change.",
      "Estate or downsizing coordination: what stays, what sells, what you keep.",
      "Compassionate process that honors your home's legacy while moving forward.",
    ],
    steps: [
      "Transition planning: timeline, care facility placement, family coordination.",
      "Preserve-or-sell decisions: valuables, memories, and what goes to new home.",
      "Flexible listing: rent-back option if your move timing is flexible.",
    ],
    sourceBrands: ["Sylvestri"],
  },
];

/* ═══════════════════════════════════════════════
   ADDITIONAL SELLER SQUEEZE PAGES
   ═══════════════════════════════════════════════ */
export const additionalSellerSqueezePages: SqueezePageContent[] = [
  {
    slug: "loss-support-guide",
    category: "sellers",
    title: "Selling After Loss — Compassionate Guide",
    headline: "Grieving and need to sell a loved one's home?",
    subheadline: "We can handle the details so you can focus on what matters — saying goodbye on your own timeline.",
    offer: "Compassionate home-sale consultation",
    cta: "Get support",
    bullets: [
      "No pressure timeline — we respect your grieving process.",
      "Coordination of estate items, appraisals, and valuables.",
      "Fair market pricing that honors the home's legacy.",
    ],
    trustLine: "This is hard. We'll make the business side easier.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/loss-sell-home",
  },
  {
    slug: "relist-strategy",
    category: "sellers",
    title: "Relist and Sell Fast",
    headline: "Did your sale fall through?",
    subheadline: "Let's relist strategically and get your home back on the market stronger than before.",
    offer: "Fresh relist strategy and market repositioning",
    cta: "Relist now",
    bullets: [
      "Honest feedback: why the deal fell through and how to prevent it again.",
      "Adjusted pricing, repairs, or terms based on buyer feedback.",
      "Aggressive marketing to rebuild buyer momentum.",
    ],
    trustLine: "Relists happen. We know how to move them fast.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/pending-sale-fallthrough",
  },
  {
    slug: "equity-analysis",
    category: "sellers",
    title: "Equity Analysis & Net Proceeds",
    headline: "Sitting on a lot of equity?",
    subheadline: "Find out exactly how much you'd net from a sale — after taxes, costs, and everything else.",
    offer: "Detailed equity and net proceeds analysis",
    cta: "Get my numbers",
    bullets: [
      "Your home's value, your equity, and net proceeds estimate.",
      "Capital gains tax impact and strategies to minimize.",
      "Comparison: what happens if you hold vs. sell now.",
    ],
    trustLine: "Money matters. We give you the real numbers so you can decide.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/high-equity-homeowner",
  },
  {
    slug: "landlord-exit-plan",
    category: "sellers",
    title: "Landlord Exit Plan",
    headline: "Done with being a landlord?",
    subheadline: "Exit your rental property cleanly and move on to what's next.",
    offer: "Tenant relocation and exit strategy",
    cta: "Plan my exit",
    bullets: [
      "Tenant notification and relocation logistics.",
      "Investor-friendly pricing and market timing.",
      "Cap rate analysis and sales strategy.",
    ],
    trustLine: "We've helped dozens of tired landlords exit cleanly. You're not alone.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/tired-landlord-exit",
  },
  {
    slug: "second-home-seller-guide",
    category: "sellers",
    title: "Selling Your Second Home",
    headline: "Ready to sell your vacation home?",
    subheadline: "Understand tax implications and positioning to attract the right buyer.",
    offer: "Second home tax and marketing strategy",
    cta: "Sell my second home",
    bullets: [
      "Tax implications specific to second homes (different than primary).",
      "Seasonal buyer positioning and marketing.",
      "Rental income documentation if you've rented it out.",
    ],
    trustLine: "We've sold many vacation homes. We know the seasonal rhythm.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/second-home-sale",
  },
  {
    slug: "luxury-sale-strategy",
    category: "sellers",
    title: "Luxury Home Sale Strategy",
    headline: "Selling a high-end Hudson Valley home?",
    subheadline: "Command top market value with sophisticated marketing and access to affluent buyers.",
    offer: "Luxury marketing plan and buyer outreach",
    cta: "Discuss luxury sale",
    bullets: [
      "Professional media: photography, video, and 3D tours.",
      "High-net-worth buyer network and marketing reach.",
      "Strategic negotiation at premium price points.",
    ],
    trustLine: "Luxury sales require a different approach. We know what works.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/luxury-home-sale",
  },
  {
    slug: "land-buyer-outreach",
    category: "sellers",
    title: "Land Sale — Builder Outreach",
    headline: "Selling land or a large parcel?",
    subheadline: "Reach builders, developers, and investors who want your property for development.",
    offer: "Land marketing and developer outreach",
    cta: "Sell my land",
    bullets: [
      "Direct outreach to builders and developer networks.",
      "Zoning and development potential highlighted for qualified buyers.",
      "Pricing based on development value, not just land comparables.",
    ],
    trustLine: "Land buyers are different. We know exactly how to reach them.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/land-sale",
  },
  {
    slug: "new-construction-exit",
    category: "sellers",
    title: "Sell New Construction Fast",
    headline: "Builder inventory or new construction to move?",
    subheadline: "Attract owner-occupant buyers and use financing programs to accelerate your sale.",
    offer: "New construction marketing and buyer program strategy",
    cta: "Sell inventory",
    bullets: [
      "First-time buyer program awareness and marketing.",
      "Builder-friendly financing program positioning.",
      "Rapid inventory turnover strategy.",
    ],
    trustLine: "New construction moves differently. We know the playbook.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/new-construction-sale",
  },
  {
    slug: "damage-recovery-options",
    category: "sellers",
    title: "Fire or Storm Damage — Your Options",
    headline: "Fire or storm damage to your home?",
    subheadline: "Understand your options: sell as-is, rebuild, or delay. Get real numbers for each path.",
    offer: "Damage assessment and as-is sale analysis",
    cta: "Explore options",
    bullets: [
      "As-is cash buyer network for quick close.",
      "Insurance claim and rebuilding cost coordination.",
      "Timeline scenarios: hold, rebuild, or sell fast.",
    ],
    trustLine: "Damage is stressful. We'll help you navigate your best path forward.",
    sourceBrands: ["Sylvestri", "The Realist Realtors"],
    followThroughHref: "/landing/fire-storm-damage-sale",
  },
  {
    slug: "senior-move-planning",
    category: "sellers",
    title: "Senior Living Move — Home Sale Planning",
    headline: "Moving to assisted living or care?",
    subheadline: "Sell your home with flexibility and dignity during this major life transition.",
    offer: "Senior transition home-sale coordination",
    cta: "Plan my move",
    bullets: [
      "Flexible timeline — no rush during a major life change.",
      "Estate and downsizing coordination.",
      "Rent-back option if your timing needs flexibility.",
    ],
    trustLine: "This is a big change. We'll make the home-sale part simple.",
    sourceBrands: ["Sylvestri"],
    followThroughHref: "/landing/senior-transition-sale",
  },
];

/* ═══════════════════════════════════════════════
   Helper exports for routing and sitemap
   ═══════════════════════════════════════════════ */
export const allBuyerLandingSlugs = buyerLandingPages.map((p) => p.slug);
export const allBuyerSqueezeSlugs = buyerSqueezePages.map((p) => p.slug);
export const allAdditionalSellerLandingSlugs = additionalSellerLandingPages.map(
  (p) => p.slug,
);
export const allAdditionalSellerSqueezeSlugs = additionalSellerSqueezePages.map(
  (p) => p.slug,
);
