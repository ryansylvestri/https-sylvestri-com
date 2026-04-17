import { getLeadMagnetByValue, getLeadTypeLabel } from "@/lib/lead-magnets";

type LeadAutoresponderInput = {
  fullName: string;
  email: string;
  leadType: string;
  leadMagnet: string;
  source: string;
  campaign: string;
  sourcePath: string;
  consentEmail: boolean;
  consentSms: boolean;
};

export type LeadAutoresponderPlan = {
  sequenceKey: string;
  sequenceLabel: string;
  leadTypeLabel: string;
  deliveryWindow: string;
  primaryCta: {
    label: string;
    href: string;
  };
  email: {
    subject: string;
    previewText: string;
    intro: string;
  };
  highlights: string[];
  followUps: Array<{
    offsetHours: number;
    objective: string;
  }>;
  operatorNotes: string[];
  magnet: null | {
    value: string;
    label: string;
    summary: string;
    deliveryLabel: string;
    resourceHref: string;
  };
};

type BaseSequence = {
  key: string;
  label: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  subject: string;
  previewText: string;
  intro: string;
  highlights: string[];
  followUps: Array<{
    offsetHours: number;
    objective: string;
  }>;
  operatorNotes: string[];
};

const baseSequences: Record<string, BaseSequence> = {
  buyer: {
    key: "buyer-guide-sequence",
    label: "Buyer first-response sequence",
    primaryCtaLabel: "Review the buyer guide",
    primaryCtaHref: "/guides/first-time",
    subject: "Buyer next steps from sylvestri.com",
    previewText: "Budget, lender prep, and the first-offer path in one sequence.",
    intro: "Deliver the requested buyer guidance fast, then move toward lender readiness and town fit.",
    highlights: [
      "Acknowledge timeline, town targets, and financing stage.",
      "Move the lead toward lender prep and a focused town list.",
      "Escalate to direct follow-up when urgency or confusion is high.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the requested buyer asset and confirm timing." },
      { offsetHours: 24, objective: "Ask for towns, budget range, and lender status." },
      { offsetHours: 72, objective: "Offer a direct call to narrow the next touring plan." },
    ],
    operatorNotes: [
      "If the lead mentions a tight timeline, prioritize a same-day callback.",
      "If financing is unclear, route toward lender readiness first.",
    ],
  },
  seller: {
    key: "seller-pricing-sequence",
    label: "Seller pricing sequence",
    primaryCtaLabel: "Review pricing prep",
    primaryCtaHref: "/landing/home-valuation",
    subject: "Seller pricing prep from sylvestri.com",
    previewText: "Use this to frame value, timing, and the next valuation step.",
    intro: "Keep the first touch calm and specific so the seller sees pricing, timing, and prep in one place.",
    highlights: [
      "Reinforce that pricing and timing move together.",
      "Prompt for address, condition, and urgency if missing.",
      "Push toward a valuation conversation when intent is real.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the pricing guide and confirm property basics." },
      { offsetHours: 24, objective: "Ask about timing, condition, and any needed repairs." },
      { offsetHours: 72, objective: "Offer a valuation call or next-step pricing review." },
    ],
    operatorNotes: [
      "Property condition and urgency should shape the second reply.",
      "If the seller is also buying, route into a combined move plan quickly.",
    ],
  },
  "home-valuation": {
    key: "valuation-sequence",
    label: "Home valuation sequence",
    primaryCtaLabel: "Start the valuation route",
    primaryCtaHref: "/landing/home-valuation",
    subject: "Your home valuation next step",
    previewText: "Address, condition, and timing are the fastest way to a useful number.",
    intro: "This sequence exists to move from rough curiosity into a useful valuation request.",
    highlights: [
      "Confirm address and goal before discussing numbers.",
      "Set expectations around pricing inputs and timeline.",
      "Move quickly when the lead is already preparing to sell.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Acknowledge the valuation request and confirm property details." },
      { offsetHours: 24, objective: "Ask for timing, updates, and any condition issues." },
      { offsetHours: 72, objective: "Offer the live valuation conversation." },
    ],
    operatorNotes: [
      "Property address is required. If it is incomplete, resolve that before deeper follow-up.",
    ],
  },
  "seller-distress": {
    key: "seller-distress-sequence",
    label: "Seller distress sequence",
    primaryCtaLabel: "Review seller options",
    primaryCtaHref: "/resources/divorce",
    subject: "Urgent seller next steps from sylvestri.com",
    previewText: "Respond with clarity, options, and the fastest safe next move.",
    intro: "Distress traffic needs a direct, low-friction response that reduces uncertainty immediately.",
    highlights: [
      "Acknowledge urgency without adding pressure.",
      "Prioritize equity protection, timing, and documentation gaps.",
      "Move to direct contact quickly when legal or deadline pressure exists.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the relevant guide and acknowledge urgency." },
      { offsetHours: 12, objective: "Offer a direct call to review options and constraints." },
      { offsetHours: 48, objective: "Confirm whether the seller still needs an immediate route." },
    ],
    operatorNotes: [
      "Use the notes field to spot legal deadlines, foreclosure stages, or divorce timing.",
      "Escalate to live follow-up faster than the standard seller flow.",
    ],
  },
  investor: {
    key: "investor-sequence",
    label: "Investor intake sequence",
    primaryCtaLabel: "Submit investor criteria",
    primaryCtaHref: "/landing/investor-intake",
    subject: "Investor criteria follow-up from sylvestri.com",
    previewText: "Clarify buy box, returns, and speed before routing deal flow.",
    intro: "Investor traffic needs criteria clarity first so future opportunities are routed correctly.",
    highlights: [
      "Request buy box, target geography, and return thresholds.",
      "Separate active buyers from tire-kickers early.",
      "Move serious operators into the criteria intake route immediately.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the investor playbook and ask for buy-box details." },
      { offsetHours: 24, objective: "Confirm criteria, capital posture, and close speed." },
      { offsetHours: 72, objective: "Offer a direct criteria review call." },
    ],
    operatorNotes: [
      "If the investor already has active criteria, route into ongoing deal flow management.",
    ],
  },
  renter: {
    key: "relocation-sequence",
    label: "Relocation sequence",
    primaryCtaLabel: "Review relocation guidance",
    primaryCtaHref: "/guides/relocation",
    subject: "Relocation next steps from sylvestri.com",
    previewText: "Town fit, timing, and move-planning guidance in one route.",
    intro: "Relocation traffic converts best when town fit and move timing are clarified early.",
    highlights: [
      "Ask about commute, school, and move deadline.",
      "Reduce uncertainty by narrowing town-fit options.",
      "Move qualified leads into a live planning call.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the relocation guide and confirm timing." },
      { offsetHours: 24, objective: "Ask about towns, commute needs, and household priorities." },
      { offsetHours: 72, objective: "Offer a town-fit planning call." },
    ],
    operatorNotes: [
      "Commuter needs and school considerations should shape the follow-up order.",
    ],
  },
  "ai-coaching": {
    key: "ai-systems-sequence",
    label: "AI / systems sequence",
    primaryCtaLabel: "Use the intake layer",
    primaryCtaHref: "/intake",
    subject: "AI and systems follow-up from sylvestri.com",
    previewText: "Clarify the workflow, the bottleneck, and the fastest leverage point.",
    intro: "Keep the first reply practical: current stack, bottleneck, and the next system cut.",
    highlights: [
      "Ask for the workflow bottleneck and desired automation outcome.",
      "Move vague requests into a sharper scoped problem statement.",
      "Prioritize leverage and repeatability over generic AI advice.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Acknowledge the AI/systems request and confirm the bottleneck." },
      { offsetHours: 24, objective: "Ask for tooling, workflow shape, and the next desired automation." },
      { offsetHours: 72, objective: "Offer a scoping call or implementation review." },
    ],
    operatorNotes: [
      "Treat AI and systems leads like consulting triage, not a consumer lead funnel.",
    ],
  },
  newsletter: {
    key: "newsletter-sequence",
    label: "Newsletter welcome sequence",
    primaryCtaLabel: "View current guides",
    primaryCtaHref: "/lead-magnets",
    subject: "You're on the Sylvestri update list",
    previewText: "Market and systems updates are queued.",
    intro: "Keep this short: confirm the subscription and point to the best evergreen resources.",
    highlights: [
      "Confirm the subscription cleanly.",
      "Point to one or two high-signal evergreen resources.",
      "Keep the cadence lightweight.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Deliver the welcome email and best evergreen resources." },
      { offsetHours: 168, objective: "Send the first weekly or monthly brief." },
    ],
    operatorNotes: [
      "Newsletter signups should not be pushed into a heavier seller or buyer sequence by default.",
    ],
  },
  "agent-match": {
    key: "general-routing-sequence",
    label: "General routing sequence",
    primaryCtaLabel: "Review the intake route",
    primaryCtaHref: "/intake",
    subject: "Next steps from sylvestri.com",
    previewText: "We have the signal and can route the next step correctly.",
    intro: "Use the first reply to clarify the situation and move the lead to the right lane quickly.",
    highlights: [
      "Restate the situation in plain language.",
      "Route into the correct lane after one clarifying exchange.",
      "Avoid dropping general leads into the wrong funnel.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Acknowledge the intake and confirm the right lane." },
      { offsetHours: 24, objective: "Ask the single highest-value clarifying question." },
      { offsetHours: 72, objective: "Offer a direct call if the route is still unclear." },
    ],
    operatorNotes: [
      "General routing leads are best handled by a human quickly to avoid mismatch.",
    ],
  },
  other: {
    key: "manual-review-sequence",
    label: "Manual review sequence",
    primaryCtaLabel: "Use the intake route",
    primaryCtaHref: "/intake",
    subject: "Manual review queued from sylvestri.com",
    previewText: "This request needs a quick human read before it gets routed.",
    intro: "Keep the first step lightweight and route manually after a quick review.",
    highlights: [
      "Acknowledge receipt.",
      "Review notes manually.",
      "Route to the right lane without over-automating the first touch.",
    ],
    followUps: [
      { offsetHours: 0, objective: "Acknowledge the request and flag for manual review." },
      { offsetHours: 24, objective: "Send the clarifying follow-up or direct the right operator." },
    ],
    operatorNotes: [
      "Use this when the request does not map cleanly into a standard lane.",
    ],
  },
};

export function buildLeadAutoresponderPlan(lead: LeadAutoresponderInput): LeadAutoresponderPlan {
  const normalizedLeadType = lead.leadType.trim() || "agent-match";
  const baseSequence = baseSequences[normalizedLeadType] || baseSequences["agent-match"];
  const magnet = getLeadMagnetByValue(lead.leadMagnet);

  return {
    sequenceKey: magnet ? `${baseSequence.key}__${magnet.value}` : baseSequence.key,
    sequenceLabel: magnet ? `${baseSequence.label} + ${magnet.label}` : baseSequence.label,
    leadTypeLabel: getLeadTypeLabel(normalizedLeadType),
    deliveryWindow: "within 5 minutes of a valid submission",
    primaryCta: {
      label: magnet ? `Review ${magnet.label}` : baseSequence.primaryCtaLabel,
      href: magnet?.resourceHref || baseSequence.primaryCtaHref,
    },
    email: {
      subject: magnet ? `${magnet.label} requested from sylvestri.com` : baseSequence.subject,
      previewText: magnet
        ? `${magnet.deliveryLabel}. Reply routes into the ${baseSequence.label.toLowerCase()}.`
        : baseSequence.previewText,
      intro: magnet
        ? `Lead requested ${magnet.label}. Deliver the promised asset framing first, then move into the ${baseSequence.label.toLowerCase()}.`
        : baseSequence.intro,
    },
    highlights: magnet
      ? [`Deliver ${magnet.label} with the exact framing promised on the site.`, ...baseSequence.highlights]
      : baseSequence.highlights,
    followUps: baseSequence.followUps,
    operatorNotes: magnet
      ? [`Requested lead magnet: ${magnet.label}.`, ...baseSequence.operatorNotes]
      : baseSequence.operatorNotes,
    magnet: magnet
      ? {
          value: magnet.value,
          label: magnet.label,
          summary: magnet.summary,
          deliveryLabel: magnet.deliveryLabel,
          resourceHref: magnet.resourceHref,
        }
      : null,
  };
}
