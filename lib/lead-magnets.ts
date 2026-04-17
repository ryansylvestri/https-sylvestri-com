export type LeadMagnetLane = "buyer" | "seller" | "investor" | "renter" | "seller-distress";

export type LeadMagnet = {
  value: string;
  slug: string;
  label: string;
  lane: LeadMagnetLane;
  summary: string;
  deliveryLabel: string;
  resourceHref: string;
};

export const coreLeadMagnets: LeadMagnet[] = [
  {
    value: "first-time-buyer-blueprint",
    slug: "first-time-buyer-blueprint",
    label: "First-Time Buyer Blueprint",
    lane: "buyer",
    summary:
      "A clean starting point for budget, lender prep, offer timing, and the first-step path into the Hudson Valley market.",
    deliveryLabel: "Blueprint + first-call prep",
    resourceHref: "/guides/first-time",
  },
  {
    value: "seller-pricing-guide",
    slug: "seller-pricing-guide",
    label: "What's My Home Worth? Seller Pricing Guide",
    lane: "seller",
    summary:
      "A pricing and positioning guide for home value, listing timing, and what changes the number before you go live.",
    deliveryLabel: "Pricing guide + valuation next step",
    resourceHref: "/landing/home-valuation",
  },
  {
    value: "hudson-valley-investor-playbook",
    slug: "hudson-valley-investor-playbook",
    label: "Hudson Valley Investor Playbook",
    lane: "investor",
    summary:
      "An investor-facing operating brief for criteria, underwriting posture, and how to route the right deal flow faster.",
    deliveryLabel: "Playbook + investor intake route",
    resourceHref: "/landing/investor-intake",
  },
  {
    value: "relocation-guide",
    slug: "relocation-guide",
    label: "Relocating to the Hudson Valley Guide",
    lane: "renter",
    summary:
      "A relocation guide focused on town fit, commute logic, and how to reduce moving friction before the search sprawls.",
    deliveryLabel: "Relocation guide + town-fit call",
    resourceHref: "/guides/relocation",
  },
  {
    value: "divorce-home-guide",
    slug: "divorce-home-guide",
    label: "Navigating Divorce and Your Home Guide",
    lane: "seller-distress",
    summary:
      "A situation-specific guide for equity, timing, communication, and how to sell without turning the process into chaos.",
    deliveryLabel: "Divorce guide + seller strategy follow-up",
    resourceHref: "/resources/divorce",
  },
];

const leadTypeLabels: Record<string, string> = {
  buyer: "Buyer",
  seller: "Seller",
  "home-valuation": "Home valuation",
  "seller-distress": "Seller (distress / urgent)",
  investor: "Investor",
  renter: "Renter / relocation",
  "ai-coaching": "AI / systems",
  newsletter: "Newsletter",
  "agent-match": "Need the right route",
  other: "Other",
};

export function getLeadMagnetsForLane(lane: string) {
  const normalized = lane.trim();
  if (!normalized) return coreLeadMagnets;
  const laneMagnets = coreLeadMagnets.filter((item) => item.lane === normalized);
  return laneMagnets.length > 0 ? laneMagnets : coreLeadMagnets;
}

export function getLeadMagnetByValue(value?: string) {
  if (!value?.trim()) return null;
  return coreLeadMagnets.find((item) => item.value === value.trim()) || null;
}

export function getLeadMagnetBySlug(slug: string) {
  return coreLeadMagnets.find((item) => item.slug === slug) || null;
}

export function getLeadMagnetHref(slug: string) {
  return `/lead-magnets/${slug}`;
}

export function getLeadTypeLabel(leadType?: string) {
  if (!leadType?.trim()) return "General inquiry";
  return leadTypeLabels[leadType.trim()] || leadType.trim();
}
