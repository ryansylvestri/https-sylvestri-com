import { createHmac, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import {
  leadTypeRequiresPropertyAddress,
  normalizeLeadSourceToken,
  type LeadPayload,
} from "@/lib/lead-contract";
import { deliverLeadToFub, hasFubDirectConfig, sendLeadNotificationEmail } from "@/lib/lead-delivery";

type NormalizedLead = {
  requestId: string;
  fullName: string;
  email: string;
  phone: string;
  leadType: string;
  timeline: string;
  market: string;
  propertyAddress: string;
  notes: string;
  leadMagnet: string;
  consentEmail: boolean;
  consentSms: boolean;
  source: string;
  campaign: string;
  sourcePath: string;
  sourceToken: string;
  submittedAt: string;
  receivedAt: string;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
const rateLimitStore = new Map<string, number[]>();

function requiredText(value?: string) {
  return Boolean(value && value.trim());
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(rateKey: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(rateKey) || [];
  const trimmed = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (trimmed.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(rateKey, trimmed);
    return true;
  }

  trimmed.push(now);
  rateLimitStore.set(rateKey, trimmed);
  return false;
}

function getMissingFields(payload: LeadPayload) {
  const missing: string[] = [];
  if (!requiredText(payload.fullName)) missing.push("fullName");
  if (!requiredText(payload.email)) missing.push("email");
  if (!requiredText(payload.leadType)) missing.push("leadType");
  if (!requiredText(payload.source)) missing.push("source");
  if (!requiredText(payload.campaign)) missing.push("campaign");
  if (!requiredText(payload.sourcePath)) missing.push("sourcePath");
  if (!requiredText(payload.submittedAt)) missing.push("submittedAt");

  if (leadTypeRequiresPropertyAddress(payload.leadType) && !requiredText(payload.propertyAddress)) {
    missing.push("propertyAddress");
  }

  return missing;
}

function normalizeLead(payload: LeadPayload): NormalizedLead {
  const sourcePath = payload.sourcePath!.trim();

  return {
    requestId: randomUUID(),
    fullName: payload.fullName!.trim(),
    email: payload.email!.trim().toLowerCase(),
    phone: payload.phone?.trim() || "",
    leadType: payload.leadType!.trim(),
    timeline: payload.timeline?.trim() || "",
    market: payload.market?.trim() || "",
    propertyAddress: payload.propertyAddress?.trim() || "",
    notes: payload.notes?.trim() || "",
    leadMagnet: payload.leadMagnet?.trim() || "",
    consentEmail: Boolean(payload.consentEmail),
    consentSms: Boolean(payload.consentSms),
    source: payload.source!.trim(),
    campaign: payload.campaign!.trim(),
    sourcePath,
    sourceToken: normalizeLeadSourceToken(sourcePath, payload.sourceToken),
    submittedAt: payload.submittedAt!.trim(),
    receivedAt: new Date().toISOString(),
  };
}

function signPayload(payload: NormalizedLead, secret?: string) {
  if (!secret) return "";
  return createHmac("sha256", secret).update(JSON.stringify(payload)).digest("hex");
}

async function triggerAutoresponder(lead: NormalizedLead) {
  const autoresponderUrl = process.env.LEAD_AUTORESPONDER_WEBHOOK_URL;
  if (!autoresponderUrl) return;

  try {
    await fetch(autoresponderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId: lead.requestId,
        eventType: "lead_autoresponder",
        leadType: lead.leadType,
        leadMagnet: lead.leadMagnet,
        email: lead.email,
        fullName: lead.fullName,
        source: lead.source,
        campaign: lead.campaign,
        sourcePath: lead.sourcePath,
      }),
    });
  } catch (error) {
    console.error("[lead-intake] autoresponder webhook failed", error);
  }
}

async function triggerLeadNotifications(lead: NormalizedLead) {
  const [notificationResult, autoresponderResult] = await Promise.allSettled([
    sendLeadNotificationEmail(lead),
    triggerAutoresponder(lead),
  ]);

  if (notificationResult.status === "rejected") {
    console.error("[lead-intake] notification email failed", notificationResult.reason);
  }

  if (autoresponderResult.status === "rejected") {
    console.error("[lead-intake] autoresponder fanout failed", autoresponderResult.reason);
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  if (payload.honeypot && payload.honeypot.trim()) {
    return NextResponse.json(
      { message: "Lead accepted." },
      {
        status: 202,
      },
    );
  }

  const missingFields = getMissingFields(payload);
  if (missingFields.length > 0) {
    return NextResponse.json(
      { message: `Missing required fields: ${missingFields.join(", ")}.` },
      { status: 400 },
    );
  }

  const normalizedLead = normalizeLead(payload);
  const clientIp = getClientIp(request);
  const rateKey = `${clientIp}:${normalizedLead.email}:${normalizedLead.leadType}`;

  if (isRateLimited(rateKey)) {
    return NextResponse.json(
      { message: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const leadRouterUrl = process.env.LEAD_ROUTER_URL;
  const leadRouterToken = process.env.LEAD_ROUTER_TOKEN;
  const leadRouterSigningSecret = process.env.LEAD_ROUTER_SIGNING_SECRET;
  const signature = signPayload(normalizedLead, leadRouterSigningSecret);

  let deliveryMessage =
    "Lead captured in the site layer. Set LEAD_ROUTER_URL or FUB_API_TOKEN to forward submissions.";
  let deliveryStatus = 202;

  if (leadRouterUrl) {
    try {
      const response = await fetch(leadRouterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lead-Request-Id": normalizedLead.requestId,
          ...(signature ? { "X-Lead-Signature": signature } : {}),
          ...(leadRouterToken ? { Authorization: `Bearer ${leadRouterToken}` } : {}),
        },
        body: JSON.stringify(normalizedLead),
      });

      if (response.ok) {
        deliveryMessage = "Lead captured and forwarded to the n8n intake router.";
        deliveryStatus = 200;
      } else if (hasFubDirectConfig()) {
        await deliverLeadToFub(normalizedLead);
        deliveryMessage =
          "Lead captured and delivered to Follow Up Boss via direct fallback after router failure.";
        deliveryStatus = 200;
      } else {
        return NextResponse.json(
          { message: "Lead accepted locally but failed to forward to the router endpoint." },
          { status: 502 },
        );
      }
    } catch (error) {
      if (hasFubDirectConfig()) {
        await deliverLeadToFub(normalizedLead);
        deliveryMessage =
          "Lead captured and delivered to Follow Up Boss via direct fallback after router error.";
        deliveryStatus = 200;
      } else {
        console.error("[lead-intake] router forward failed", error);
        return NextResponse.json(
          { message: "Lead accepted locally but failed to forward to the router endpoint." },
          { status: 502 },
        );
      }
    }
  } else if (hasFubDirectConfig()) {
    await deliverLeadToFub(normalizedLead);
    deliveryMessage = "Lead captured and delivered directly to Follow Up Boss.";
    deliveryStatus = 200;
  } else {
    console.info("[lead-intake] accepted without router", normalizedLead);
  }

  await triggerLeadNotifications(normalizedLead);

  return NextResponse.json(
    {
      message: deliveryMessage,
      requestId: normalizedLead.requestId,
    },
    { status: deliveryStatus },
  );
}
