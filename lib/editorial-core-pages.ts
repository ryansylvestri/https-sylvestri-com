export type EditorialCorePage = {
  slug: "buyers" | "sellers" | "investors" | "renters";
  eyebrow: string;
  title: string;
  description: string;
  imageTopic: string;
  imageAlt: string;
  process: readonly { title: string; detail: string }[];
  resourceCategory: "buyer" | "seller" | "investor" | "lifestyle";
  cta: {
    title: string;
    description: string;
    submitLabel: string;
    source: string;
    campaign: string;
    leadType: "buyer" | "seller" | "investor" | "renter";
  };
};

export const editorialCorePages: Record<EditorialCorePage["slug"], EditorialCorePage> = {
  buyers: {
    slug: "buyers",
    eyebrow: "Buying in the Hudson Valley",
    title: "A practical path from first questions to closing day.",
    description:
      "Understand the process, organize the decisions, and use local context to make a Hudson Valley home search more focused.",
    imageTopic: "buyer",
    imageAlt: "A Hudson Valley home viewed from a quiet residential road",
    resourceCategory: "buyer",
    process: [
      { title: "Set the starting point", detail: "Clarify budget, financing, timing, location needs, and the tradeoffs that will shape the search." },
      { title: "Learn the market", detail: "Compare towns and properties using current facts, direct observation, and questions that still need answers." },
      { title: "Evaluate each property", detail: "Look beyond the listing presentation to condition, documents, inspection findings, and long-term fit." },
      { title: "Move through the contract", detail: "Keep the offer, due diligence, lending, appraisal, and closing steps organized." },
    ],
    cta: {
      title: "Ask a buyer question",
      description: "Share where you are in the process and what you are trying to figure out.",
      submitLabel: "Send my question",
      source: "buyers-page",
      campaign: "editorial-buyers",
      leadType: "buyer",
    },
  },
  sellers: {
    slug: "sellers",
    eyebrow: "Selling in the Hudson Valley",
    title: "Prepare the property, understand the choices, and plan the sale.",
    description:
      "A useful selling plan starts with the property, your timing, and the information needed to make careful pricing and preparation decisions.",
    imageTopic: "seller",
    imageAlt: "A well-kept Hudson Valley home prepared for a move",
    resourceCategory: "seller",
    process: [
      { title: "Document the starting point", detail: "Review the property, known work, records, condition, timing, and goals before choosing a plan." },
      { title: "Prioritize preparation", detail: "Separate important repairs and presentation work from changes that may not be worth the time or cost." },
      { title: "Review pricing context", detail: "Use relevant property and market information while clearly marking assumptions and unknowns." },
      { title: "Plan the launch and move", detail: "Coordinate presentation, access, communication, offers, and the next housing step." },
    ],
    cta: {
      title: "Ask a seller question",
      description: "Share the property context and the decision you are working through.",
      submitLabel: "Send my question",
      source: "sellers-page",
      campaign: "editorial-sellers",
      leadType: "seller",
    },
  },
  investors: {
    slug: "investors",
    eyebrow: "Property investing",
    title: "Start with the thesis, test the assumptions, and investigate the property.",
    description:
      "Organize an investment search around goals, numbers, condition, execution requirements, and risks that still need evidence.",
    imageTopic: "investor",
    imageAlt: "Hudson Valley residential buildings viewed as part of a property review",
    resourceCategory: "investor",
    process: [
      { title: "Define the strategy", detail: "State the intended use, time horizon, location limits, capital constraints, and acceptable complexity." },
      { title: "Build transparent assumptions", detail: "Record the inputs behind income, expenses, financing, work, timing, and possible outcomes." },
      { title: "Investigate the asset", detail: "Review physical condition, records, occupancy, permitted use, and the professionals or documents still needed." },
      { title: "Revisit the downside", detail: "Stress-test the decision before treating a promising scenario as an expected result." },
    ],
    cta: {
      title: "Discuss an investment question",
      description: "Share the property type, location, and the assumptions you want to examine.",
      submitLabel: "Send the context",
      source: "investors-page",
      campaign: "editorial-investors",
      leadType: "investor",
    },
  },
  renters: {
    slug: "renters",
    eyebrow: "Renting and relocating",
    title: "Organize the move and narrow the Hudson Valley map.",
    description:
      "Use timing, practical requirements, and direct local research to make a rental or relocation search easier to manage.",
    imageTopic: "relocation",
    imageAlt: "A road through the Hudson Valley representing a move into the region",
    resourceCategory: "lifestyle",
    process: [
      { title: "Set the move window", detail: "Document dates, budget, household needs, commute constraints, and non-negotiable requirements." },
      { title: "Narrow the geography", detail: "Compare places through practical travel, housing, services, and daily-life questions." },
      { title: "Verify availability", detail: "Treat listing status, advertising, application readiness, and move-in readiness as separate facts." },
      { title: "Plan the transition", detail: "Keep documents, communications, travel, and the next housing decision in one clear plan." },
    ],
    cta: {
      title: "Ask a rental or relocation question",
      description: "Share your timing, target area, and the part of the move that needs clarity.",
      submitLabel: "Send my question",
      source: "renters-page",
      campaign: "editorial-renters",
      leadType: "renter",
    },
  },
};
