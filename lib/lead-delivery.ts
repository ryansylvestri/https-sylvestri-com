import "server-only";

import { Buffer } from "node:buffer";

import nodemailer from "nodemailer";

export type LeadDeliveryPayload = {
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

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || fullName.trim(),
    lastName: parts.slice(1).join(" "),
  };
}

function buildLeadSummary(lead: LeadDeliveryPayload) {
  return [
    `Request ID: ${lead.requestId}`,
    `Full Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "n/a"}`,
    `Lead Type: ${lead.leadType}`,
    `Timeline: ${lead.timeline || "n/a"}`,
    `Market: ${lead.market || "n/a"}`,
    `Property Address: ${lead.propertyAddress || "n/a"}`,
    `Lead Magnet: ${lead.leadMagnet || "n/a"}`,
    `Consent Email: ${lead.consentEmail ? "yes" : "no"}`,
    `Consent SMS: ${lead.consentSms ? "yes" : "no"}`,
    `Source: ${lead.source}`,
    `Campaign: ${lead.campaign}`,
    `Source Path: ${lead.sourcePath}`,
    `Source Token: ${lead.sourceToken}`,
    `Submitted At: ${lead.submittedAt}`,
    `Received At: ${lead.receivedAt}`,
    "",
    "Notes:",
    lead.notes || "n/a",
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function leadSummaryRows(lead: LeadDeliveryPayload) {
  return [
    ["Request ID", lead.requestId],
    ["Full Name", lead.fullName],
    ["Email", lead.email],
    ["Phone", lead.phone || "n/a"],
    ["Lead Type", lead.leadType],
    ["Timeline", lead.timeline || "n/a"],
    ["Market", lead.market || "n/a"],
    ["Property Address", lead.propertyAddress || "n/a"],
    ["Lead Magnet", lead.leadMagnet || "n/a"],
    ["Consent Email", lead.consentEmail ? "yes" : "no"],
    ["Consent SMS", lead.consentSms ? "yes" : "no"],
    ["Source", lead.source],
    ["Campaign", lead.campaign],
    ["Source Path", lead.sourcePath],
    ["Source Token", lead.sourceToken],
    ["Submitted At", lead.submittedAt],
    ["Received At", lead.receivedAt],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;border:1px solid #e2e8f0;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

function buildLeadSummaryHtml(lead: LeadDeliveryPayload) {
  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h2 style="margin-bottom:16px;">New sylvestri.com lead</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tbody>${leadSummaryRows(lead)}</tbody>
      </table>
      <h3 style="margin-top:20px;">Notes</h3>
      <pre style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;">${escapeHtml(lead.notes || "n/a")}</pre>
    </div>
  `;
}

function getNotificationRecipients() {
  const raw = process.env.LEAD_NOTIFICATION_EMAILS?.trim() || "bot@sylvestri.com";
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

let transporterPromise:
  | Promise<nodemailer.Transporter<nodemailer.SentMessageInfo>>
  | null = null;

async function getTransporter() {
  if (process.env.SMTP_JSON_TRANSPORT === "true") {
    if (!transporterPromise) {
      transporterPromise = Promise.resolve(
        nodemailer.createTransport({
          jsonTransport: true,
        }),
      );
    }

    return transporterPromise;
  }

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass || !Number.isFinite(port)) {
    return null;
  }

  if (!transporterPromise) {
    transporterPromise = Promise.resolve(
      nodemailer.createTransport({
        host,
        port,
        secure: process.env.SMTP_SECURE === "true" || port === 465,
        auth: {
          user,
          pass,
        },
      }),
    );
  }

  return transporterPromise;
}

function mapLeadTypeToFubEventType(leadType: string) {
  if (leadType === "home-valuation" || leadType === "seller" || leadType === "seller-distress") {
    return "Seller Inquiry";
  }
  if (leadType === "investor") {
    return "Property Inquiry";
  }
  return "General Inquiry";
}

function buildFubEventMessage(lead: LeadDeliveryPayload) {
  return buildLeadSummary(lead);
}

export function hasFubDirectConfig() {
  return Boolean(process.env.FUB_API_TOKEN?.trim());
}

export async function deliverLeadToFub(lead: LeadDeliveryPayload) {
  const token = process.env.FUB_API_TOKEN?.trim();
  if (!token) {
    return { ok: false as const, skipped: true as const, reason: "Missing FUB_API_TOKEN." };
  }

  const baseUrl = (process.env.FUB_API_BASE_URL?.trim() || "https://api.followupboss.com/v1").replace(
    /\/+$/,
    "",
  );
  const auth = Buffer.from(`${token}:`, "utf8").toString("base64");
  const { firstName, lastName } = splitFullName(lead.fullName);

  const response = await fetch(`${baseUrl}/events`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "sylvestri.com",
      system: "sylvestri.com",
      type: mapLeadTypeToFubEventType(lead.leadType),
      sourceUrl: new URL(lead.sourcePath, "https://sylvestri.com").toString(),
      message: buildFubEventMessage(lead),
      person: {
        firstName,
        lastName,
        emails: [{ value: lead.email }],
        phones: lead.phone ? [{ value: lead.phone }] : [],
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Follow Up Boss direct delivery failed (${response.status}): ${text.slice(0, 300)}`);
  }

  return { ok: true as const };
}

export async function sendLeadNotificationEmail(lead: LeadDeliveryPayload) {
  const recipients = getNotificationRecipients();
  const transporter = await getTransporter();

  if (!transporter || recipients.length === 0) {
    return {
      ok: false as const,
      skipped: true as const,
      reason: "Missing SMTP configuration or notification recipients.",
    };
  }

  const from = process.env.LEAD_NOTIFICATION_FROM?.trim() || "Sylvestri Bot <bot@sylvestri.com>";
  const subject = `[Lead] ${lead.leadType} from ${lead.fullName}`;

  const info = await transporter.sendMail({
    from,
    to: recipients.join(", "),
    replyTo: lead.email,
    subject,
    text: buildLeadSummary(lead),
    html: buildLeadSummaryHtml(lead),
  });

  if (process.env.SMTP_JSON_TRANSPORT === "true") {
    console.info("[lead-intake] notification preview", info.message);
  }

  return { ok: true as const };
}
