export type LeadMagnet = {
  value: string;
  label: string;
  lane: "buyer" | "seller" | "investor" | "renter" | "seller-distress";
};

export const coreLeadMagnets: LeadMagnet[] = [
  {
    value: "first-time-buyer-blueprint",
    label: "First-Time Buyer Blueprint",
    lane: "buyer",
  },
  {
    value: "seller-pricing-guide",
    label: "What's My Home Worth? Seller Pricing Guide",
    lane: "seller",
  },
  {
    value: "hudson-valley-investor-playbook",
    label: "Hudson Valley Investor Playbook",
    lane: "investor",
  },
  {
    value: "relocation-guide",
    label: "Relocating to the Hudson Valley Guide",
    lane: "renter",
  },
  {
    value: "divorce-home-guide",
    label: "Navigating Divorce and Your Home Guide",
    lane: "seller-distress",
  },
];

export function getLeadMagnetsForLane(lane: string) {
  const normalized = lane.trim();
  if (!normalized) return coreLeadMagnets;
  const laneMagnets = coreLeadMagnets.filter((item) => item.lane === normalized);
  return laneMagnets.length > 0 ? laneMagnets : coreLeadMagnets;
}
