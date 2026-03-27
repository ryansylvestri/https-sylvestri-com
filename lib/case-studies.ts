export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  lane: "seller-distress" | "seller" | "renter";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "probate-sale-fishkill",
    title: "Probate Sale in Fishkill",
    summary:
      "Family needed a clean estate sale path with minimal conflict and clear deadlines for legal counsel.",
    challenge:
      "Unclear timeline, deferred maintenance, and multiple heirs with different assumptions about value.",
    approach:
      "Ran a fast valuation range, documented prep priorities, and aligned attorney + listing sequence before launch.",
    outcome:
      "Property sold with fewer surprises, and every heir had a transparent record of pricing logic and offers.",
    lane: "seller-distress",
  },
  {
    slug: "divorce-home-sale-beacon",
    title: "Divorce Home Sale in Beacon",
    summary:
      "Two parties needed neutral communication and a market-backed price strategy during a sensitive transition.",
    challenge:
      "High emotional tension and disagreement on launch timing, repairs, and expected net proceeds.",
    approach:
      "Used a step-by-step launch plan, shared pricing framework, and written negotiation checkpoints.",
    outcome:
      "Sale closed on schedule with a documented process both parties could trust.",
    lane: "seller-distress",
  },
  {
    slug: "relocation-buy-sell-sequence",
    title: "Relocation Buy/Sell Sequence",
    summary:
      "Client needed to sell locally and secure a move timeline without carrying two homes longer than planned.",
    challenge:
      "Timing risk between sale and next move, plus uncertainty around market conditions by town.",
    approach:
      "Mapped move windows, staged listing prep, and routed lender + search decisions around deadline risk.",
    outcome:
      "Client exited with clearer timeline control and avoided expensive overlap pressure.",
    lane: "renter",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
