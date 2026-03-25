import { NextResponse } from "next/server";

type LeadPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  timeline?: string;
  location?: string;
  notes?: string;
  source?: string;
  campaign?: string;
  submittedAt?: string;
};

function missingRequiredField(payload: LeadPayload) {
  return !payload.fullName || !payload.email || !payload.source || !payload.campaign;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as LeadPayload;

  if (missingRequiredField(payload)) {
    return NextResponse.json(
      { message: "Full name, email, source, and campaign are required." },
      { status: 400 },
    );
  }

  const leadRouterUrl = process.env.LEAD_ROUTER_URL;
  const leadRouterToken = process.env.LEAD_ROUTER_TOKEN;

  const normalizedLead = {
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone || "",
    interest: payload.interest || "agent-match",
    timeline: payload.timeline || "",
    location: payload.location || "",
    notes: payload.notes || "",
    source: payload.source,
    campaign: payload.campaign,
    submittedAt: payload.submittedAt || new Date().toISOString(),
  };

  if (!leadRouterUrl) {
    console.info("[lead-intake] accepted without router", normalizedLead);
    return NextResponse.json(
      {
        message:
          "Lead captured in the site layer. Set LEAD_ROUTER_URL to forward submissions into n8n and Follow Up Boss.",
      },
      { status: 202 },
    );
  }

  const response = await fetch(leadRouterUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(leadRouterToken ? { Authorization: `Bearer ${leadRouterToken}` } : {}),
    },
    body: JSON.stringify(normalizedLead),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Lead accepted locally but failed to forward to the router endpoint." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Lead captured and forwarded to the n8n intake router.",
  });
}
