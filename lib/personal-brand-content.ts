export type NavItem = {
  href: string;
  label: string;
};

export type BrandCard = {
  title: string;
  domain: string;
  status: string;
  summary: string;
  href: string;
};

export type AudienceRoute = {
  href: string;
  label: string;
  title: string;
  promise: string;
  detail: string;
};

export type StoryMilestone = {
  phase: string;
  title: string;
  detail: string;
};

export type StoryCard = {
  title: string;
  detail: string;
};

export type RoutePageContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  quickPoints: string[];
  process: { title: string; detail: string }[];
  fitCards: { title: string; detail: string }[];
  leadForm: {
    title: string;
    description: string;
    submitLabel: string;
    source: string;
    campaign: string;
    defaultInterest: string;
  };
  heroImageId?: string;
  detailImageId?: string;
};

export const personalSiteConfig = {
  name: "Ryan Sylvestri",
  founderName: "Ryan Sylvestri",
  title: "Hudson Valley real estate, systems thinking, and applied AI.",
  tagline: "Hudson Valley real estate, systems thinking, and applied AI.",
  phone: "(845) 867-2646",
  phoneHref: "tel:+18458672646",
  officePhone: "(845) 867-2450",
  officePhoneHref: "tel:+18458672450",
  email: "ryan@sylvestri.com",
  emailHref: "mailto:ryan@sylvestri.com",
  office: "RE/MAX Town & Country",
  address: "584 Route 9, Fishkill, NY 12524",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sylvestri.com",
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
  ] satisfies NavItem[],
};

export const personalMedia = {
  headshot: "ryan-sylvestri/site-draft/ryan-headshot-remax",
  portrait: "ryan-sylvestri/site-draft/ryan-portrait-01",
  systemsLogo: "ryan-sylvestri/site-draft/sylvestri-systems-logo",
  sign: "ryan-sylvestri/site-draft/remax-sign",
  ambient: "samples/waves",
  radial: "samples/radial_02",
};

export const credibilityPills = [
  "Licensed Associate Real Estate Broker serving the Hudson Valley",
  "ABR and PSA designations for buyer advocacy and pricing discipline",
  "Property-preservation and REO background that catches friction early",
  "Computer science and systems thinking behind the follow-up and marketing",
  "Structured routing for buyers, sellers, investors, renters, and AI clients",
  "RE/MAX Town & Country backing with direct Ryan-level accountability",
];

export const audienceRoutes: AudienceRoute[] = [
  {
    href: "/buyers",
    label: "Buy a home",
    title: "Buyers",
    promise:
      "A buyer lane for first-time buyers, relocations, move-ups, and pragmatic searchers who want fewer false starts.",
    detail:
      "Get clear on buying power, town fit, financing, and offer strategy before weekends disappear into random showings.",
  },
  {
    href: "/sellers",
    label: "Sell a home",
    title: "Sellers",
    promise:
      "A seller lane built around valuation, equity, timing, and a cleaner launch plan.",
    detail:
      "Start with what the home could realistically sell for, what it could net, and what needs to happen before going live.",
  },
  {
    href: "/investors",
    label: "Invest in property",
    title: "Investors",
    promise:
      "A separate lane for investors who care about criteria, speed, downside, and clean underwriting.",
    detail:
      "This path is about deal fit, condition, and opportunity screening instead of consumer-style browsing.",
  },
  {
    href: "/renters",
    label: "Rent or relocate",
    title: "Renters",
    promise:
      "A renter and relocation lane for people who need the right move now and the right next step after that.",
    detail:
      "Capture timing, geography, and urgency fast, then separate true rental needs from future-buyer opportunities.",
  },
  {
    href: "/ai",
    label: "AI and systems",
    title: "AI / Systems",
    promise:
      "The operator lane for AI workflows, automation, systems thinking, and future coaching or implementation work.",
    detail:
      "This is where the builder side of the brand grows without muddying the real-estate conversion path.",
  },
];

export const storyMilestones: StoryMilestone[] = [
  {
    phase: "Ground truth",
    title: "The advice is shaped by real property work, not just polished real-estate marketing.",
    detail:
      "Property-preservation, REO, and contractor-adjacent experience built an eye for condition, hidden friction, and execution risk that many brochure-style agent sites never communicate.",
  },
  {
    phase: "Systems thinking",
    title: "Technical training changed how Ryan sees process, risk, and leverage.",
    detail:
      "Computer science and information-systems thinking show up in the intake design, follow-up logic, offer preparation, and the way the brand stack is being built as an operating system instead of a loose pile of domains.",
  },
  {
    phase: "Brokerage work",
    title: "The brokerage lane turns that technical lens into practical help for buyers, sellers, and investors.",
    detail:
      "The real client-facing product is clearer guidance, stronger pricing conversations, faster pattern recognition, and more disciplined next steps in the Hudson Valley market.",
  },
  {
    phase: "Leverage layer",
    title: "Now the brand is expanding into automation, AI workflows, and media built around leverage.",
    detail:
      "sylvestri.com becomes the umbrella where real estate, systems, and AI can reinforce each other without competing for the same visitor.",
  },
];

export const selectedStories: StoryCard[] = [
  {
    title: "Why the technical background matters",
    detail:
      "A systems-minded operator tends to see bottlenecks, edge cases, and downstream risk earlier. That changes how leads are handled, how offers are structured, and how decisions get made.",
  },
  {
    title: "Why the property background matters",
    detail:
      "The contractor and property-preservation eye adds a practical layer to client guidance because condition, deferred maintenance, and risk are not abstract when a real deal is on the line.",
  },
  {
    title: "Why your name should be the front door",
    detail:
      "People search Ryan first. The site should make that traffic useful by routing it cleanly into the right lane instead of sending everyone into the same generic agent pitch.",
  },
];

export const operatingPrinciples = [
  "Lead with the visitor's real situation before talking about the brand.",
  "Keep each page to one promise, one form, and one obvious next step.",
  "Put trust, proof, and privacy close to the CTA instead of burying them below the fold.",
  "Route every inquiry into the right conversation quickly instead of forcing every lead through one blunt funnel.",
];

export const brandEcosystem: BrandCard[] = [
  {
    title: "Sylvestri",
    domain: "sylvestri.com",
    status: "personal brand hub",
    summary:
      "The umbrella site for Ryan's name-search traffic, personal trust, story, and route selection across real estate, systems, and AI.",
    href: "/",
  },
  {
    title: "Sylvestri Realty",
    domain: "sylvestrirealty.com",
    status: "real-estate trust lane",
    summary:
      "The real-estate lane for buyers, sellers, investors, and relocations when the visitor wants market guidance, strong calls to action, and a more direct property-first experience.",
    href: "/sellers",
  },
  {
    title: "Sylvestri Systems",
    domain: "sylvestrisystems.com",
    status: "systems lane",
    summary:
      "The place for automation, infrastructure, AI workflows, and the operator-story side of the ecosystem once that offer grows into its own clearer product set.",
    href: "/brands",
  },
  {
    title: "RyGuyDoesAI",
    domain: "brand in progress",
    status: "media lane",
    summary:
      "The education, coaching, demo, and creator layer for AI tools, practical experiments, and future products.",
    href: "/ai",
  },
  {
    title: "RE/MAX valuation path",
    domain: "ryansylvestri.remax.com",
    status: "seller bridge",
    summary:
      "The current valuation endpoint that still captures homeowner intent while the native seller funnel on sylvestri.com keeps getting stronger.",
    href: "/landing/home-valuation",
  },
];

export const routePages: Record<"buyers" | "sellers" | "investors" | "renters" | "ai", RoutePageContent> =
  {
    buyers: {
      eyebrow: "Buyer lane",
      title: "Buy in the Hudson Valley with more clarity and fewer false starts.",
      description:
        "If you are buying in Beacon, Fishkill, Cold Spring, Poughkeepsie, Rhinebeck, Newburgh, or the surrounding Hudson Valley towns, this lane turns scattered browsing into a sharper buyer plan.",
      primaryCta: { href: "/intake", label: "Start buyer intake" },
      secondaryCta: { href: "/landing/first-time-buyers", label: "See the buyer plan" },
      quickPoints: [
        "Clarify buying power before you fall in love with the wrong inventory",
        "Match towns to commute, lifestyle, and resale logic",
        "Move decisively when the right property finally appears",
      ],
      process: [
        {
          title: "Define buying power first",
          detail:
            "Start with budget, financing readiness, cash position, and timeline so the search has constraints instead of chaos.",
        },
        {
          title: "Filter towns and tradeoffs",
          detail:
            "Separate what sounds exciting online from what actually fits your commute, lifestyle, school goals, and resale logic.",
        },
        {
          title: "Tour with a real screen",
          detail:
            "The point is not to see everything. It is to notice what matters faster and stop wasting weekends on bad-fit inventory.",
        },
        {
          title: "Write cleaner offers",
          detail:
            "When the right property shows up, the process should move with confidence instead of rebuilding the strategy from scratch.",
        },
      ],
      fitCards: [
        {
          title: "First-time buyers",
          detail:
            "People who want calm explanation, financing clarity, and a process that feels legible instead of overwhelming.",
        },
        {
          title: "Relocation buyers",
          detail:
            "People who need fast local context, sharper town matching, and someone who can compress the learning curve.",
        },
        {
          title: "Move-up and pragmatic buyers",
          detail:
            "People balancing timing, equity, family needs, and multiple moving pieces at once.",
        },
      ],
      leadForm: {
        title: "Buyer intake",
        description:
          "Tell Ryan what you want to buy, where you are looking, and how soon you need to move. The goal is to replace random searching with a cleaner plan.",
        submitLabel: "Build my buyer plan",
        source: "sylvestri-buyers-page",
        campaign: "sylvestri-buyers",
        defaultInterest: "buyer",
      },
      heroImageId: personalMedia.portrait,
      detailImageId: personalMedia.sign,
    },
    sellers: {
      eyebrow: "Seller lane",
      title: "Sell with a sharper read on value, timing, and what your home could really net.",
      description:
        "This seller lane is built for homeowners who want more than an instant estimate. Start with pricing reality, prep priorities, launch timing, and the smartest next step after the sale.",
      primaryCta: { href: "/landing/home-valuation", label: "Get valuation clarity" },
      secondaryCta: { href: "/landing/seller-launch-plan", label: "Build a launch plan" },
      quickPoints: [
        "Start with equity and net proceeds instead of guesswork",
        "Separate ready-now sellers from prep-stage owners fast",
        "Surface condition, access, and timing friction before it costs you",
      ],
      process: [
        {
          title: "Start with pricing reality",
          detail:
            "Anchor the conversation in comparable sales, buyer perception, condition, and what the property could realistically net after selling costs.",
        },
        {
          title: "Build the launch plan",
          detail:
            "Prep, timing, photography, positioning, and showing strategy should line up before the home ever goes live.",
        },
        {
          title: "Control the move",
          detail:
            "A good seller conversation connects the sale to the next purchase, relocation, downsizing move, or equity decision instead of treating listing day like the finish line.",
        },
      ],
      fitCards: [
        {
          title: "Ready-now sellers",
          detail:
            "Owners who need pricing clarity, fast timing, and a direct route from curiosity to action.",
        },
        {
          title: "Prep-stage sellers",
          detail:
            "Owners who are not listing this week but want a concrete plan to get ready without wasted effort.",
        },
        {
          title: "Complex-situation owners",
          detail:
            "Homeowners dealing with condition issues, difficult timing, or multiple constraints at once.",
        },
      ],
      leadForm: {
        title: "Seller intake",
        description:
          "If you want a human read on value, timing, or sale strategy before diving into a deeper valuation flow, start here.",
        submitLabel: "Get my seller plan",
        source: "sylvestri-sellers-page",
        campaign: "sylvestri-sellers",
        defaultInterest: "seller",
      },
      heroImageId: personalMedia.headshot,
      detailImageId: personalMedia.sign,
    },
    investors: {
      eyebrow: "Investor lane",
      title: "Invest with cleaner underwriting, faster screening, and less consumer-style noise.",
      description:
        "This lane is for investors evaluating rentals, flips, land, multifamily, and opportunistic acquisitions across the Hudson Valley with a stronger focus on criteria, speed, and downside.",
      primaryCta: { href: "/landing/investor-intake", label: "Submit deal criteria" },
      secondaryCta: { href: "/network", label: "See the routing system" },
      quickPoints: [
        "Keep investor conversations separate from consumer lead noise",
        "Look at condition, upside, and execution risk early",
        "Route opportunities by strategy instead of by generic contact form",
      ],
      process: [
        {
          title: "Define the model",
          detail:
            "Buy-and-hold, value-add, multifamily, land, and flips all need different assumptions. The intake should make that explicit on day one.",
        },
        {
          title: "Screen deals faster",
          detail:
            "The useful conversation is about fit, risk, condition, and expected outcome, not endless browsing through the wrong inventory.",
        },
        {
          title: "Keep the follow-up sharp",
          detail:
            "Good investor leads should carry criteria, geography, and timing all the way through the system so the next conversation starts ahead of zero.",
        },
      ],
      fitCards: [
        {
          title: "Buy-and-hold investors",
          detail:
            "People who want durable rental logic, local market context, and long-term portfolio discipline.",
        },
        {
          title: "Value-add operators",
          detail:
            "People who need a sharper eye on condition, execution, and where the upside really sits.",
        },
        {
          title: "Deal-minded locals",
          detail:
            "People who want an operator who can understand both the property and the process without sales fluff.",
        },
      ],
      leadForm: {
        title: "Investor intake",
        description:
          "Share your target deal type, preferred areas, and timeline so Ryan can respond in the right lane with better context.",
        submitLabel: "Send my criteria",
        source: "sylvestri-investors-page",
        campaign: "sylvestri-investors",
        defaultInterest: "investor",
      },
      heroImageId: personalMedia.sign,
      detailImageId: personalMedia.portrait,
    },
    renters: {
      eyebrow: "Renter and relocation lane",
      title: "Move faster with a renter and relocation path built for real timing, geography, and next-step clarity.",
      description:
        "Whether you need a Hudson Valley rental now or you are relocating and may buy later, this lane captures the details that matter without dropping you into the wrong funnel.",
      primaryCta: { href: "/intake", label: "Start renter intake" },
      secondaryCta: { href: "/landing/hudson-valley-relocation", label: "See relocation guidance" },
      quickPoints: [
        "Capture move date, towns, and urgency immediately",
        "Use local guidance to narrow the map faster",
        "Separate rental needs now from future-buyer intent later",
      ],
      process: [
        {
          title: "Surface the move window",
          detail:
            "A renter or relocation path should quickly identify when you need to move, where you need to be, and what cannot be compromised.",
        },
        {
          title: "Reduce the geography",
          detail:
            "Town fit, commute patterns, school goals, and lifestyle tradeoffs matter more than a giant undifferentiated search radius.",
        },
        {
          title: "Route the next step correctly",
          detail:
            "Some people need a rental now. Some need a relocation guide. Some are really future buyers who need a bridge plan. The system should know the difference.",
        },
      ],
      fitCards: [
        {
          title: "Relocation clients",
          detail:
            "People moving into the area who need fast orientation, town guidance, and a practical local read.",
        },
        {
          title: "Time-sensitive renters",
          detail:
            "People who need to move quickly and benefit from a cleaner intake than an open-ended text thread.",
        },
        {
          title: "Future buyers",
          detail:
            "People who may rent first but should be nurtured toward a buying conversation once timing and finances align.",
        },
      ],
      leadForm: {
        title: "Renter and relocation intake",
        description:
          "Share your move window, target area, and what kind of help you need so the follow-up fits the real situation.",
        submitLabel: "Plan my move",
        source: "sylvestri-renters-page",
        campaign: "sylvestri-renters",
        defaultInterest: "renter",
      },
      heroImageId: personalMedia.portrait,
      detailImageId: personalMedia.headshot,
    },
    ai: {
      eyebrow: "AI and systems lane",
      title: "Build leverage through AI, systems, and operator-grade workflow design.",
      description:
        "This lane is where the builder side of Ryan Sylvestri lives: automation, AI workflows, systems thinking, and future coaching or implementation offers for real-world operators.",
      primaryCta: { href: "/intake", label: "Start the systems conversation" },
      secondaryCta: { href: "/brands", label: "See the brand stack" },
      quickPoints: [
        "Translate messy manual work into repeatable workflow design",
        "Focus on applied AI instead of abstract theory",
        "Turn experiments into usable operating leverage",
      ],
      process: [
        {
          title: "Start with the bottleneck",
          detail:
            "The useful question is not which model is trendy. It is where the workflow is leaking time, attention, or consistency today.",
        },
        {
          title: "Design the repeatable system",
          detail:
            "The target output is rarely a one-off prompt. It is a repeatable flow, asset, or operating pattern that compounds over time.",
        },
        {
          title: "Ship leverage",
          detail:
            "This lane can support coaching, implementation, demos, and future products once the offer is tight enough to scale without losing the operator edge.",
        },
      ],
      fitCards: [
        {
          title: "AI-curious operators",
          detail:
            "People who want help applying current tools to real work instead of collecting disconnected demos.",
        },
        {
          title: "Service businesses",
          detail:
            "Teams that need more workflow leverage, cleaner intake, and better follow-up instead of another isolated app.",
        },
        {
          title: "Future students and clients",
          detail:
            "People who may want coaching, implementation help, or productized systems as this lane grows.",
        },
      ],
      leadForm: {
        title: "AI and systems intake",
        description:
          "Use this to reach Ryan about automation, AI, workflow design, or coaching while the dedicated media lane keeps taking shape.",
        submitLabel: "Send my systems brief",
        source: "sylvestri-ai-page",
        campaign: "sylvestri-ai",
        defaultInterest: "ai-coaching",
      },
      heroImageId: personalMedia.systemsLogo,
      detailImageId: personalMedia.portrait,
    },
  };
