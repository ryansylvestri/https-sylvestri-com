export type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  leadType?: string;
  timeline?: string;
  market?: string;
  propertyAddress?: string;
  notes?: string;
  leadMagnet?: string;
  consentEmail?: boolean;
  consentSms?: boolean;
  source?: string;
  campaign?: string;
  sourcePath?: string;
  sourceToken?: string;
  submittedAt?: string;
  honeypot?: string;
};

export type LeadSubmissionResponse = {
  message?: string;
  requestId?: string;
  sequenceKey?: string;
  sequenceLabel?: string;
  leadMagnetLabel?: string;
  leadMagnetResourceHref?: string;
};

export const ADDRESS_REQUIRED_LEAD_TYPES = new Set(["home-valuation", "seller-distress"]);

export function leadTypeRequiresPropertyAddress(leadType?: string) {
  return Boolean(leadType && ADDRESS_REQUIRED_LEAD_TYPES.has(leadType.trim()));
}

export function normalizeLeadSourceToken(sourcePath: string, sourceToken?: string) {
  if (sourceToken && sourceToken.trim()) return sourceToken.trim();
  if (sourcePath === "/") return "home";
  return sourcePath.replace(/\//g, "-").replace(/^-+|-+$/g, "") || "page";
}
