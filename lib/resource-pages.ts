// resource-pages.ts — Informational content pages that live on the sylvestri.com stack
// Each page provides educational, non-salesy content for a specific lead category
// These are the "information hub" pages that leads get funneled back to

export type ResourcePageContent = {
  slug: string;
  tag: "distressed" | "life-event" | "lifestyle" | "property" | "market";
  title: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faq: { q: string; a: string }[];
  ctaHeadline: string;
  ctaBody: string;
  relatedSlugs: string[];
  linkedLandingSlug: string;
  linkedSqueezeSlug: string;
};

export const resourcePages: ResourcePageContent[] = [
  {
    slug: "divorce",
    tag: "life-event",
    title: "Selling Your Home During a Divorce — What You Need to Know",
    metaDescription:
      "Comprehensive guide for divorcing homeowners in the Hudson Valley. Learn about property division, sale timelines, and how to protect your equity during a divorce home sale.",
    heroHeadline: "Divorce & Your Home: A Guide for Hudson Valley Homeowners",
    heroSubheadline:
      "Divorce is hard enough without the confusion of selling a shared home. This page covers the practical steps, legal considerations, and financial strategies you need to know.",
    sections: [
      {
        heading: "How Does Divorce Affect Your Home Sale?",
        body: "In New York, marital property is subject to equitable distribution — which doesn't always mean 50/50. The home is often the largest shared asset, and deciding what to do with it is one of the most consequential decisions in the process.",
        bullets: [
          "Both spouses must agree to sell, or the court can order it.",
          "The proceeds are divided based on the equitable distribution agreement.",
          "A neutral real estate professional helps both parties get fair market value.",
          "You may need to sell before the divorce is finalized or after.",
        ],
      },
      {
        heading: "Your Options: Sell, Buy Out, or Hold",
        body: "Not every divorcing couple needs to sell. Here are the three most common paths:",
        bullets: [
          "Sell the home and split the proceeds — cleanest financial break.",
          "One spouse buys the other out — requires refinancing in one name.",
          "Co-own temporarily — sometimes used when children are involved, but financially risky.",
        ],
      },
      {
        heading: "Timeline Considerations",
        body: "Divorce home sales can be faster or slower than typical sales depending on cooperation, court schedules, and market conditions. In the Hudson Valley, average days on market vary by town, but a well-priced home can sell in 30-60 days.",
      },
      {
        heading: "Working with Attorneys and the Court",
        body: "Your real estate agent should coordinate with both attorneys, provide court-ready documentation (CMA, listing agreement), and maintain neutrality throughout the process.",
      },
    ],
    faq: [
      { q: "Can I sell the house if my spouse doesn't agree?", a: "In New York, both owners generally must consent. If agreement can't be reached, the court can order a sale through a partition action." },
      { q: "Who pays the mortgage during the sale?", a: "This is typically addressed in the separation agreement or temporary court order. The mortgage still needs to be paid regardless of who lives in the home." },
      { q: "Do I need a special agent for divorce sales?", a: "Not legally, but working with an experienced agent who has handled divorce sales ensures neutrality, proper documentation, and sensitivity to both parties." },
    ],
    ctaHeadline: "Need Confidential Help Selling During a Divorce?",
    ctaBody: "Get a private, no-pressure consultation. Ryan has experience working with both parties and their attorneys to ensure a fair, efficient sale.",
    relatedSlugs: ["probate", "inherited-property", "estate-sale"],
    linkedLandingSlug: "divorce-home-sale",
    linkedSqueezeSlug: "divorce-sell-fast",
  },
  {
    slug: "probate",
    tag: "life-event",
    title: "Selling a Probate Property in the Hudson Valley",
    metaDescription:
      "Step-by-step guide for executors and heirs selling a probate property in Dutchess, Putnam, or Orange County. Learn about court requirements, timelines, and as-is sale options.",
    heroHeadline: "Probate Property Sales: A Guide for Executors & Heirs",
    heroSubheadline:
      "If you've been named executor and need to sell a home, this guide walks you through the probate sale process in New York — from petition to closing.",
    sections: [
      {
        heading: "What Is a Probate Sale?",
        body: "A probate sale occurs when a deceased person's property must be sold as part of settling their estate. In New York, the executor (named in the will) or administrator (appointed by the court) has the authority to sell — but only after receiving Letters Testamentary or Letters of Administration.",
      },
      {
        heading: "Steps to Sell a Probate Property",
        body: "The probate selling process has specific legal requirements:",
        bullets: [
          "File the will with the Surrogate's Court in the relevant county.",
          "Receive Letters Testamentary (if there's a will) or Letters of Administration.",
          "Get the property appraised for estate tax purposes.",
          "List the property — as-is or after improvements.",
          "Report the sale proceeds to the court during estate settlement.",
        ],
      },
      {
        heading: "Selling As-Is vs. Making Improvements",
        body: "Many probate properties have deferred maintenance. Executors must weigh the cost of repairs against the potential increase in sale price. In some cases, selling as-is to an investor or buyer who accepts condition issues is the fastest path.",
      },
      {
        heading: "Tax Implications for Heirs",
        body: "Inherited property receives a 'stepped-up basis' — meaning your cost basis is the fair market value at the date of death, not what the deceased originally paid. This can significantly reduce or eliminate capital gains tax on the sale.",
      },
    ],
    faq: [
      { q: "How long does probate take in New York?", a: "Typically 7-12 months, but it can take longer if the estate is complex or contested. You can often list the property before probate is fully settled." },
      { q: "Can I sell before probate is complete?", a: "You can list and market the property, but the closing usually can't happen until you have Letters Testamentary or Administration." },
      { q: "What if there are multiple heirs who disagree?", a: "The executor has legal authority to make decisions in the best interest of the estate. If heirs dispute, the Surrogate's Court can intervene." },
    ],
    ctaHeadline: "Need Help Selling an Estate Property?",
    ctaBody: "Get experienced guidance through the probate process. We coordinate with estate attorneys, handle property prep, and manage the sale from listing to closing.",
    relatedSlugs: ["inherited-property", "estate-sale", "divorce"],
    linkedLandingSlug: "probate-property-sale",
    linkedSqueezeSlug: "probate-sell-help",
  },
  {
    slug: "tax-lien",
    tag: "distressed",
    title: "Property Tax Liens in the Hudson Valley — What Homeowners Should Know",
    metaDescription:
      "Guide for Hudson Valley homeowners facing property tax liens. Learn about redemption periods, tax lien sales, and options to sell or resolve delinquent property taxes.",
    heroHeadline: "Facing a Tax Lien? Here's What You Need to Know",
    heroSubheadline:
      "Unpaid property taxes don't just sit there. They accrue penalties, interest, and can eventually lead to the loss of your home. Understanding the timeline gives you power.",
    sections: [
      {
        heading: "How Property Tax Liens Work in New York",
        body: "When property taxes go unpaid, the county places a lien on the property. In Dutchess, Putnam, and Orange County, the county may sell these liens to investors at auction, or pursue foreclosure directly.",
        bullets: [
          "Liens accrue interest and penalties — the longer you wait, the more you owe.",
          "New York counties have different timelines and processes for tax lien enforcement.",
          "You have a redemption period to pay off the lien before losing the property.",
          "Even with a lien, you may still have significant equity in the home.",
        ],
      },
      {
        heading: "Your Options When Facing a Tax Lien",
        body: "Depending on how much you owe, your equity position, and your timeline, you have several paths:",
        bullets: [
          "Pay off the lien — sometimes with a payment plan through the county.",
          "Sell the property — use  proceeds to clear the lien and keep remaining equity.",
          "Negotiate with the lien holder — in some cases, settlements are possible.",
          "Do nothing — risk losing the property at a tax deed sale.",
        ],
      },
    ],
    faq: [
      { q: "Can I sell my home with a tax lien on it?", a: "Yes. The lien must be satisfied at closing from the sale proceeds. If you have equity above the lien amount, you'll receive the difference." },
      { q: "How long before I lose my home?", a: "Timelines vary by county. In Dutchess County, the foreclosure process for tax liens typically takes 1-3 years from the date of delinquency, but you should act well before that." },
    ],
    ctaHeadline: "Not Sure Where You Stand? Get a Free Equity Assessment",
    ctaBody: "Find out if selling makes sense. We'll estimate your property value, compare it to your lien balance, and show you your real options.",
    relatedSlugs: ["foreclosure", "pre-foreclosure", "bankruptcy"],
    linkedLandingSlug: "tax-lien-property",
    linkedSqueezeSlug: "tax-lien-options",
  },
  {
    slug: "foreclosure",
    tag: "distressed",
    title: "Facing Foreclosure in the Hudson Valley — Your Options Explained",
    metaDescription:
      "Guide for Hudson Valley homeowners in foreclosure. Learn about the foreclosure timeline in New York, your legal rights, and how selling can stop the process.",
    heroHeadline: "Foreclosure in New York: A Homeowner's Guide",
    heroSubheadline:
      "Receiving a foreclosure notice is terrifying. But understanding the timeline and your options gives you the power to act — not just react.",
    sections: [
      {
        heading: "The Foreclosure Timeline in New York",
        body: "New York is a judicial foreclosure state, meaning the lender must go through the court system. This gives you more time than many homeowners realize.",
        bullets: [
          "Pre-foreclosure: 90-day notice required before filing (RPAPL §1304).",
          "Filing: Lender files a lis pendens and summons.",
          "Settlement conferences: Mandatory in New York — court-supervised negotiations.",
          "Judgment: If no resolution, court issues a judgment of foreclosure.",
          "Auction: Property is sold at public auction, typically months after judgment.",
        ],
      },
      {
        heading: "How Selling Stops Foreclosure",
        body: "A voluntary sale — even at a market-adjusted price — can stop the foreclosure process, satisfy the lender, preserve your credit score, and protect any remaining equity you have in the home.",
      },
      {
        heading: "Short Sales — When You Owe More Than the Home Is Worth",
        body: "If your mortgage balance exceeds market value, a short sale may still be possible. The lender agrees to accept less than what's owed. This requires lender approval and an experienced agent to negotiate.",
      },
    ],
    faq: [
      { q: "How long do I have before I lose my home?", a: "In New York, the foreclosure process typically takes 12-36 months from the first missed payment. You have time to act, but the sooner you start, the more options you have." },
      { q: "Will foreclosure ruin my credit?", a: "A foreclosure stays on your credit report for 7 years. Selling before foreclosure — even via short sale — is significantly less damaging to your credit." },
      { q: "Can I sell if I'm already in foreclosure?", a: "Yes, up until the auction date. Many homeowners sell during the process and avoid the auction entirely." },
    ],
    ctaHeadline: "You Have More Time Than You Think — But Don't Wait",
    ctaBody: "Get a free, confidential assessment of your situation. We'll review your equity, timeline, and options so you can make the best decision for your family.",
    relatedSlugs: ["pre-foreclosure", "tax-lien", "lis-pendens", "bankruptcy"],
    linkedLandingSlug: "foreclosure-help",
    linkedSqueezeSlug: "foreclosure-options",
  },
  {
    slug: "pre-foreclosure",
    tag: "distressed",
    title: "Behind on Mortgage Payments? Act Before Foreclosure Hits",
    metaDescription:
      "If you're behind on mortgage payments in the Hudson Valley, you have options before foreclosure begins. Learn about loan modification, selling, and protecting your credit.",
    heroHeadline: "Behind on Payments? You Have Options Right Now",
    heroSubheadline:
      "Missing payments doesn't mean losing your home — yet. The window between missed payments and foreclosure is when you have the most leverage.",
    sections: [
      {
        heading: "What Happens When You Miss Payments?",
        body: "After 30 days, your lender begins reporting the delinquency. After 90-120 days, you'll typically receive notices. At 120+ days, formal foreclosure proceedings can begin. But you have rights and options at every stage.",
      },
      {
        heading: "Options Before Foreclosure",
        body: "Acting early gives you the most choices:",
        bullets: [
          "Loan modification — restructure your payment with the lender.",
          "Forbearance — temporary payment pause or reduction.",
          "Sell the property — use equity to pay off the mortgage and walk away clean.",
          "Refinance — if you have equity, lock in a lower payment.",
          "Deed in lieu — voluntarily transfer the property to the lender (less credit damage than foreclosure).",
        ],
      },
    ],
    faq: [
      { q: "Will my lender work with me?", a: "Most lenders prefer alternatives to foreclosure because it's expensive for them too. Contact your servicer's loss mitigation department early." },
      { q: "Can I sell if I'm behind on payments?", a: "Absolutely. If you have equity, selling is often the best option. The mortgage gets paid at closing." },
    ],
    ctaHeadline: "Don't Wait for the Notice — Act Now",
    ctaBody: "Get a private assessment of your equity and options. The earlier you move, the more control you keep.",
    relatedSlugs: ["foreclosure", "tax-lien", "bankruptcy"],
    linkedLandingSlug: "pre-foreclosure",
    linkedSqueezeSlug: "behind-on-payments",
  },
  {
    slug: "lis-pendens",
    tag: "distressed",
    title: "Lis Pendens Filed on Your Property — What It Means & What to Do",
    metaDescription:
      "A lis pendens affects your ability to sell or refinance. Learn what a lis pendens filing means for Hudson Valley homeowners and how to resolve it.",
    heroHeadline: "Lis Pendens: What It Means for Your Property",
    heroSubheadline:
      "A lis pendens is a public notice that a lawsuit has been filed affecting your property. It clouds the title and can complicate a sale — but it doesn't mean you're out of options.",
    sections: [
      {
        heading: "What Is a Lis Pendens?",
        body: "Latin for 'pending suit,' a lis pendens is filed in the county clerk's office to notify anyone searching the title that there is active litigation involving the property. It's commonly filed in foreclosure, boundary disputes, divorce, and mechanic's lien cases.",
      },
      {
        heading: "How It Affects Your Property",
        body: "A lis pendens doesn't transfer ownership or place a lien, but it effectively 'clouds' the title, making it difficult or impossible to sell, refinance, or transfer the property until the underlying lawsuit is resolved.",
      },
    ],
    faq: [
      { q: "Can I sell with a lis pendens on the property?", a: "It's very difficult because title companies won't insure around it. The lawsuit typically needs to be resolved or the lis pendens vacated first." },
      { q: "How do I get a lis pendens removed?", a: "You can resolve the underlying lawsuit, negotiate a settlement, or ask the court to cancel (vacate) the lis pendens if it was improperly filed." },
    ],
    ctaHeadline: "Need Help Understanding Your Situation?",
    ctaBody: "We can help you understand how the filing affects your options and connect you with attorneys who specialize in clearing title issues.",
    relatedSlugs: ["foreclosure", "tax-lien", "code-violation"],
    linkedLandingSlug: "lis-pendens",
    linkedSqueezeSlug: "lis-pendens-help",
  },
  {
    slug: "moving",
    tag: "lifestyle",
    title: "Selling Before You Move — A Smart Seller's Guide",
    metaDescription:
      "Planning a move from the Hudson Valley? Learn how to time your home sale, maximize proceeds, and coordinate your move without carrying two mortgages.",
    heroHeadline: "Moving? Sell Smart, Not Stressed",
    heroSubheadline:
      "Whether you're moving for lifestyle, family, or opportunity — your home sale is the financial engine that funds your next chapter. Here's how to do it right.",
    sections: [
      {
        heading: "Sell First vs. Buy First",
        body: "The age-old question. Selling first gives you financial certainty but requires temporary housing. Buying first gives you comfort but risks carrying two mortgages. A bridge strategy can give you the best of both worlds.",
      },
      {
        heading: "Preparing Your Home for a Fast Sale",
        body: "When you're on a move timeline, every week counts. Focus on high-ROI improvements:",
        bullets: [
          "Declutter aggressively — less is more for showings.",
          "Fresh paint in neutral colors.",
          "Professional photography is non-negotiable.",
          "Price strategically from day one — overpricing costs time.",
        ],
      },
    ],
    faq: [
      { q: "What if I need to move before the house sells?", a: "Options include rent-back agreements, bridge loans, or listing with a contingency. We'll build a strategy around your timeline." },
    ],
    ctaHeadline: "Let's Build Your Move-Sale Timeline",
    ctaBody: "Get a customized plan that coordinates your sale, your move, and your next home purchase.",
    relatedSlugs: ["relocation", "job-transfer", "downsizing", "upsizing"],
    linkedLandingSlug: "selling-before-moving",
    linkedSqueezeSlug: "selling-to-move",
  },
  {
    slug: "downsizing",
    tag: "lifestyle",
    title: "Downsizing Your Home — Unlock Equity & Simplify Your Life",
    metaDescription:
      "Guide for Hudson Valley homeowners ready to downsize. Learn how to maximize equity, find the right-sized home, and make the transition smoothly.",
    heroHeadline: "Downsizing: More Freedom, Not Less",
    heroSubheadline: "Downsizing isn't about giving things up — it's about gaining financial freedom, less maintenance, and a lifestyle that matches where you are now.",
    sections: [
      {
        heading: "The Financial Case for Downsizing",
        body: "Selling a larger home and moving to a smaller one can free up significant equity. In the Hudson Valley, the median home price varies widely by town, creating opportunities to downsize and pocket a substantial difference.",
      },
      {
        heading: "Where to Downsize in the Hudson Valley",
        body: "Popular downsizing options include:",
        bullets: [
          "Condos and townhomes in Fishkill, Wappingers, or Beacon.",
          "55+ active adult communities in Dutchess and Putnam County.",
          "Smaller single-family homes in less expensive towns.",
          "New construction ranch-style homes designed for aging in place.",
        ],
      },
    ],
    faq: [
      { q: "How much equity could I unlock?", a: "It depends on your current home's value and what you buy next. We provide a detailed equity projection comparing your options." },
    ],
    ctaHeadline: "Ready to See What Downsizing Could Do for You?",
    ctaBody: "Get a free equity analysis showing how much your current home is worth and what your right-sized options look like.",
    relatedSlugs: ["retirement", "moving", "upsizing"],
    linkedLandingSlug: "downsizing-sale",
    linkedSqueezeSlug: "downsizing-equity",
  },
  {
    slug: "upsizing",
    tag: "lifestyle",
    title: "Upsizing Your Home — When Your Family Needs More Space",
    metaDescription:
      "Growing family? Learn how to sell your current home and upgrade to a larger property in the Hudson Valley without overextending your budget.",
    heroHeadline: "Need More Space? Here's How to Upgrade Smart",
    heroSubheadline: "A bigger home doesn't have to mean bigger stress. With the right strategy, your current home's equity can power a smooth upgrade.",
    sections: [
      {
        heading: "When to Upsize",
        body: "Common triggers include a growing family, need for a home office, desire for more outdoor space, or wanting to be in a better school district. The key is timing the sale of your current home with the purchase of the next.",
      },
      {
        heading: "Calculating Your Upgrade Budget",
        body: "Your upgrade buying power = current home equity + new mortgage qualification. We help you model this before you start looking so you don't fall in love with something you can't afford.",
      },
    ],
    faq: [
      { q: "Should I sell first or buy first?", a: "For most upsizers, selling first (or simultaneously) is safer. We can structure contingent offers or use bridge strategies to make the timing work." },
    ],
    ctaHeadline: "Let's Calculate Your Upgrade Power",
    ctaBody: "Find out exactly what you can afford based on your current home's value and your mortgage options.",
    relatedSlugs: ["moving", "downsizing", "relocation"],
    linkedLandingSlug: "upsizing-sale",
    linkedSqueezeSlug: "upsizing-plan",
  },
  {
    slug: "relocation",
    tag: "lifestyle",
    title: "Relocating from the Hudson Valley — How to Sell Fast & Move Confidently",
    metaDescription:
      "Relocating out of the Hudson Valley? Learn how to sell your home quickly, manage the process remotely, and get connected with an agent at your destination.",
    heroHeadline: "Relocating? Here's Your Fast-Track Sale Plan",
    heroSubheadline: "Relocation sales require speed and precision. This guide covers how to price aggressively, market effectively, and close remotely.",
    sections: [
      { heading: "Speed vs. Top Dollar", body: "In relocation sales, time is usually more valuable than squeezing out every last dollar. Strategic pricing from day one attracts serious buyers fast." },
      { heading: "Remote Seller Support", body: "You don't need to be here for showings, negotiations, or closing. Electronic signatures, virtual tours, and your agent's local presence handle everything." },
    ],
    faq: [
      { q: "Can I sell remotely?", a: "Absolutely. We handle everything on the ground — showings, inspections, repairs, and closing. You sign digitally from wherever you are." },
    ],
    ctaHeadline: "Get Your Relocation Sale Started",
    ctaBody: "We'll build a fast-track plan matched to your move date and connect you with an agent at your destination.",
    relatedSlugs: ["job-transfer", "military-relocation", "moving"],
    linkedLandingSlug: "relocation-sale",
    linkedSqueezeSlug: "relocation-sell",
  },
  {
    slug: "expired-listing",
    tag: "market",
    title: "Your Listing Expired — What Went Wrong & How to Fix It",
    metaDescription:
      "Home didn't sell? Learn the most common reasons listings expire in the Hudson Valley and what a fresh strategy looks like.",
    heroHeadline: "Your Listing Expired. Here's What Went Wrong.",
    heroSubheadline: "An expired listing isn't a failed home — it's a failed strategy. Let's diagnose the problem and build one that works.",
    sections: [
      {
        heading: "Top Reasons Listings Expire",
        body: "In the Hudson Valley, the most common reasons are:",
        bullets: [
          "Overpricing — the #1 killer. Buyers compare online instantly.",
          "Poor photography — dark, cluttered, or amateur photos kill clicks.",
          "Weak marketing — listed on MLS but not actively marketed.",
          "Wrong agent fit — not every agent knows every market.",
          "Condition issues — buyers see problems the seller doesn't.",
        ],
      },
    ],
    faq: [
      { q: "Should I lower the price?", a: "Maybe, but not always. Sometimes the issue is marketing, photos, or positioning — not price. We diagnose first, then recommend." },
    ],
    ctaHeadline: "Get a Free Expired Listing Diagnosis",
    ctaBody: "We'll review your previous listing — pricing, photos, marketing, and showing activity — and tell you exactly what needs to change.",
    relatedSlugs: ["fsbo", "vacant-property"],
    linkedLandingSlug: "expired-listing",
    linkedSqueezeSlug: "expired-listing-fix",
  },
  {
    slug: "fsbo",
    tag: "market",
    title: "For Sale By Owner Not Working? Here's Why",
    metaDescription:
      "Struggling to sell your home by yourself? Learn the hidden costs of FSBO and when hiring an agent actually nets you more money.",
    heroHeadline: "FSBO: Is It Really Saving You Money?",
    heroSubheadline: "The FSBO dream is keeping the commission. The FSBO reality is often a lower sale price, longer time on market, and more stress. Let's look at the math.",
    sections: [
      {
        heading: "The FSBO Net-Proceeds Problem",
        body: "Studies consistently show that FSBO homes sell for less than agent-listed homes — often enough less to more than offset the commission savings. You save the listing commission but frequently lose more on the sale price.",
      },
      {
        heading: "What You're Missing Without an Agent",
        body: "Key services include:",
        bullets: [
          "MLS exposure — 90%+ of buyers start their search online.",
          "Professional photography and marketing materials.",
          "Pricing strategy based on comparable sales data.",
          "Negotiation experience — especially with buyer's agents.",
          "Contract and disclosure management to reduce legal liability.",
        ],
      },
    ],
    faq: [
      { q: "Can you just put me on the MLS?", a: "Yes — we offer options from flat-fee MLS entry to full-service listing. You choose the level of support that works for your situation." },
    ],
    ctaHeadline: "Let's Compare Your FSBO Net vs. Agent-Assisted Net",
    ctaBody: "No guilt trip. Just the math. We'll show you both scenarios so you can make the best decision.",
    relatedSlugs: ["expired-listing", "moving"],
    linkedLandingSlug: "fsbo-help",
    linkedSqueezeSlug: "fsbo-rescue",
  },
  {
    slug: "vacant-property",
    tag: "property",
    title: "Vacant Property Costs — Should You Sell, Rent, or Hold?",
    metaDescription:
      "Own an empty house in the Hudson Valley? Learn the true cost of a vacant property and whether selling, renting, or renovating makes the most financial sense.",
    heroHeadline: "Your Vacant Property Is Costing You Every Month",
    heroSubheadline: "Taxes, insurance, maintenance, liability — empty homes drain money even when nobody's home. Here's how to make the right call.",
    sections: [
      { heading: "The True Cost of Vacancy", body: "Most owners underestimate the carrying cost. Property taxes, homeowner's insurance (higher for vacant homes), utility minimums, lawn care, winterization, and potential vandalism or damage all add up quickly." },
      {
        heading: "Sell vs. Rent vs. Renovate",
        body: "Your best option depends on the property's condition, location, and your financial situation. We model all three scenarios with real Hudson Valley market data.",
      },
    ],
    faq: [
      { q: "What if the property needs work?", a: "We can sell as-is, connect you with contractors for key improvements, or help you evaluate whether renovation ROI justifies the cost." },
    ],
    ctaHeadline: "Find Out What Your Vacant Property Is Really Costing You",
    ctaBody: "Free carrying-cost analysis plus a current market value estimate. See the real numbers before you decide.",
    relatedSlugs: ["absentee-owner", "code-violation", "inherited-property"],
    linkedLandingSlug: "vacant-property",
    linkedSqueezeSlug: "vacant-home-plan",
  },
  {
    slug: "code-violation",
    tag: "property",
    title: "Selling a Home with Code Violations — What You Need to Know",
    metaDescription:
      "Have building code violations or unpermitted work? Learn what must be fixed, what can be disclosed, and how to sell your home even with code issues.",
    heroHeadline: "Code Violations Don't Always Kill a Deal",
    heroSubheadline: "Unpermitted work, open permits, and code violations are common — especially in older Hudson Valley homes. Here's how to handle them when selling.",
    sections: [
      { heading: "Common Code Issues in Older Homes", body: "Finished basements without permits, deck additions, bathroom conversions, unpermitted electrical or plumbing work, and non-conforming structures are extremely common in Hudson Valley homes built before the 1990s." },
      { heading: "Fix, Disclose, or Sell As-Is", body: "Not every code issue needs a fix. Some can be disclosed and priced accordingly. Others must be resolved for a clear title. We help you sort the must-fix from the disclose-and-adjust items." },
    ],
    faq: [
      { q: "Will a buyer walk away because of code violations?", a: "Some will, but many buyers — especially investors — accept these issues at the right price. Proper disclosure protects you legally." },
    ],
    ctaHeadline: "Let's Assess Your Property's Code Situation",
    ctaBody: "We'll help you understand which issues need resolution, which can be disclosed, and what the cost-to-cure looks like.",
    relatedSlugs: ["vacant-property", "lis-pendens", "fsbo"],
    linkedLandingSlug: "code-violation-property",
    linkedSqueezeSlug: "code-violation-sell",
  },
  {
    slug: "inherited-property",
    tag: "life-event",
    title: "Inherited a Home? Here's What You Need to Decide",
    metaDescription:
      "Inherited a house in the Hudson Valley? Learn about stepped-up basis, capital gains, probate requirements, and whether to sell, rent, or keep it.",
    heroHeadline: "Inherited Property: Sell, Rent, or Keep?",
    heroSubheadline: "Inheriting a home comes with emotions, responsibilities, and financial decisions. This guide helps you make the right call for your situation.",
    sections: [
      { heading: "The Stepped-Up Basis Advantage", body: "When you inherit property, your cost basis is 'stepped up' to the fair market value at the date of death. If you sell shortly after, your capital gains tax may be zero or very low." },
      { heading: "Deciding What to Do", body: "Consider: Do you want to live in it? Can you afford the carrying costs? Is renting viable? Would selling free up capital you need? We help you model each scenario with real numbers." },
    ],
    faq: [
      { q: "How soon should I sell after inheriting?", a: "If you plan to sell, doing so within the first year takes advantage of the stepped-up basis and minimizes capital gains. But there's no legal requirement to rush." },
    ],
    ctaHeadline: "Need Help Deciding What to Do with an Inherited Home?",
    ctaBody: "Get a property value estimate, tax implications overview, and a clear comparison of your options.",
    relatedSlugs: ["probate", "estate-sale", "vacant-property"],
    linkedLandingSlug: "inherited-property",
    linkedSqueezeSlug: "inherited-home-sell",
  },
  {
    slug: "bankruptcy",
    tag: "distressed",
    title: "Selling Your Home During Bankruptcy — What You Need to Know",
    metaDescription:
      "Can you sell your home during bankruptcy? Learn how Chapter 7 and Chapter 13 affect home sales and how to work with your trustee and attorney.",
    heroHeadline: "Bankruptcy & Your Home: What You Can Do",
    heroSubheadline: "Bankruptcy doesn't always mean losing your home. Understanding the rules can help you make the best decision for your financial fresh start.",
    sections: [
      { heading: "Chapter 7 vs. Chapter 13", body: "In Chapter 7, non-exempt assets may be sold to pay creditors — but New York's homestead exemption may protect some equity. In Chapter 13, you typically keep your home while following a repayment plan." },
      { heading: "Can You Sell During Bankruptcy?", body: "Yes, but you need court approval (called a 'motion to sell'). Your bankruptcy trustee and attorney guide this process. The proceeds go toward satisfying creditors, but remaining equity may be yours." },
    ],
    faq: [
      { q: "Will I lose my home in bankruptcy?", a: "Not necessarily. New York's homestead exemption (up to $179,975 in Dutchess County) may protect your home equity." },
    ],
    ctaHeadline: "Understand Your Options Before You Decide",
    ctaBody: "We work with bankruptcy attorneys to help you understand whether selling is in your best interest.",
    relatedSlugs: ["foreclosure", "pre-foreclosure", "tax-lien"],
    linkedLandingSlug: "bankruptcy-home-sale",
    linkedSqueezeSlug: "bankruptcy-sell-help",
  },
  {
    slug: "job-transfer",
    tag: "lifestyle",
    title: "Job Transfer Home Sale — Sell Fast Without Leaving Money Behind",
    metaDescription:
      "Transferring for work? Learn how to coordinate your employer's timeline with a fast home sale in the Hudson Valley.",
    heroHeadline: "Job Transfer? Here's Your Fast-Track Plan",
    heroSubheadline: "When your employer sets the timeline, your home sale needs to match. Here's how to move fast without selling short.",
    sections: [
      { heading: "Employer Relocation Benefits", body: "Some employers offer relocation packages that include home sale assistance, buyouts, or loss-on-sale protection. Understand your benefits before listing." },
      { heading: "Pricing for Speed", body: "In job transfer sales, pricing 2-5% below market can attract multiple offers in the first week. The time savings and carrying cost avoidance often more than offset the discount." },
    ],
    faq: [
      { q: "Can my employer buy my house?", a: "Some relocation companies offer guaranteed buyout programs. Check with your HR department or relocation coordinator." },
    ],
    ctaHeadline: "Let's Match Your Sale to Your Transfer Date",
    ctaBody: "Get a fast-track plan coordinated with your employer's timeline and relocation benefits.",
    relatedSlugs: ["relocation", "military-relocation", "moving"],
    linkedLandingSlug: "job-transfer-sale",
    linkedSqueezeSlug: "job-transfer-sell",
  },
  {
    slug: "military-relocation",
    tag: "lifestyle",
    title: "PCS Orders — Selling Your Home for Military Relocation",
    metaDescription:
      "Military PCS move from the Hudson Valley? Learn how to sell your home on a military timeline, VA loan considerations, and finding an agent at your next duty station.",
    heroHeadline: "PCS Orders: Your Military Home Sale Guide",
    heroSubheadline: "Military families face compressed timelines and unique financial considerations. This guide covers everything from VA assumptions to remote closings.",
    sections: [
      { heading: "VA Loan Considerations", body: "If you have a VA loan, buyers may be able to assume it at your current rate — a powerful selling feature in high-rate markets. Alternatively, you can pay off the VA loan at closing and restore your entitlement for your next purchase." },
    ],
    faq: [
      { q: "Can a buyer assume my VA loan?", a: "Yes, VA loans are assumable. This can be a major selling point, especially if your rate is lower than current market rates." },
    ],
    ctaHeadline: "Let's Get Your PCS Sale on Track",
    ctaBody: "We align your sale timeline with your report date and connect you with an MRP-certified agent at your next station.",
    relatedSlugs: ["job-transfer", "relocation", "moving"],
    linkedLandingSlug: "military-relocation",
    linkedSqueezeSlug: "pcs-home-sale",
  },
  {
    slug: "estate-sale",
    tag: "life-event",
    title: "Estate Sale: Settling a Loved One's Property",
    metaDescription:
      "Guide for families settling an estate property in the Hudson Valley. Covers cleanout coordination, multi-heir communication, and the listing process.",
    heroHeadline: "Estate Property Sales: A Compassionate Guide",
    heroSubheadline: "Selling a loved one's home is emotional and logistically complex. We handle the real estate so you can take care of your family.",
    sections: [
      { heading: "Estate Sale vs. Probate Sale", body: "Not all estate sales go through formal probate. If the property was held in a trust, had a transfer-on-death deed, or is jointly owned by a surviving spouse, you may be able to sell without court involvement." },
      { heading: "Preparing the Property", body: "Estate homes often need cleanout, minor repairs, and staging. We coordinate with local cleanout companies, handyman services, and stagers to prepare the home for sale." },
    ],
    faq: [
      { q: "Do we need to clean out the home before listing?", a: "Ideally yes, but we can help coordinate the cleanout. In some cases, we can list with a cleanout contingency for the buyer." },
    ],
    ctaHeadline: "We'll Handle the Real Estate — You Handle the Family",
    ctaBody: "Get compassionate, experienced support for selling an estate property. We coordinate everything from cleanout to closing.",
    relatedSlugs: ["probate", "inherited-property", "divorce"],
    linkedLandingSlug: "estate-sale",
    linkedSqueezeSlug: "estate-property-help",
  },
  {
    slug: "absentee-owner",
    tag: "property",
    title: "Absentee Owner? Manage or Sell Your Hudson Valley Property",
    metaDescription:
      "Own a property in the Hudson Valley but live elsewhere? Learn about remote selling options, property management, and how to stop paying for a property you don't use.",
    heroHeadline: "Own Property You Don't Live In? Let's Figure It Out",
    heroSubheadline: "Distance makes property ownership expensive and stressful. Whether you want to sell, rent, or hold — you need a local partner.",
    sections: [
      { heading: "The Hidden Costs of Absentee Ownership", body: "Property taxes, insurance, maintenance, and liability don't stop because you moved away. And without someone checking in, small problems become expensive ones." },
      { heading: "Remote Selling Made Easy", body: "We handle every aspect of the sale locally — from property access and showings to inspections and closing. You sign electronically from wherever you are." },
    ],
    faq: [
      { q: "Do I need to come back to sell?", a: "No. We handle everything on the ground. You can sign documents remotely and close without traveling." },
    ],
    ctaHeadline: "Get a Remote Property Assessment",
    ctaBody: "We'll visit the property, assess its current value and condition, and show you your options — all without you needing to travel.",
    relatedSlugs: ["vacant-property", "inherited-property"],
    linkedLandingSlug: "absentee-owner",
    linkedSqueezeSlug: "absentee-owner-sell",
  },
  {
    slug: "retirement",
    tag: "lifestyle",
    title: "Retiring? Right-Size Your Home & Fund Your Future",
    metaDescription:
      "Planning to retire in the Hudson Valley? Learn how selling your family home can fund retirement, reduce expenses, and simplify your lifestyle.",
    heroHeadline: "Retirement Starts with a Smart Home Decision",
    heroSubheadline: "Your family home may be your biggest retirement asset. Here's how to turn decades of equity into the retirement you've earned.",
    sections: [
      { heading: "Your Home as a Retirement Tool", body: "For many retirees, home equity represents 30-60% of their net worth. Selling and right-sizing can free up capital for retirement income, reduce monthly expenses, and eliminate maintenance burdens." },
      { heading: "Tax Considerations for Retirees", body: "The capital gains exclusion ($250K single / $500K married) may eliminate most or all of your tax liability on the sale. Timing the sale relative to your retirement date can also impact your tax bracket." },
    ],
    faq: [
      { q: "Should I sell before or after I retire?", a: "It depends on your income timeline. Selling while still working may keep you in a higher bracket. We connect you with a financial planner to optimize timing." },
    ],
    ctaHeadline: "Let's Plan Your Retirement Sale",
    ctaBody: "Get a home equity projection and see how your largest asset can fund your next chapter.",
    relatedSlugs: ["downsizing", "moving"],
    linkedLandingSlug: "retirement-sale",
    linkedSqueezeSlug: "retirement-home-plan",
  },
];

export function getResourcePage(slug: string) {
  return resourcePages.find((p) => p.slug === slug);
}

export const allResourceSlugs = resourcePages.map((p) => p.slug);
