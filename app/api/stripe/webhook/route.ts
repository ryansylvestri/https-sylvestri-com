import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { getStripeServerClient } from "@/lib/stripe";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  const stripe = getStripeServerClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { message: "Stripe webhook is not configured." },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing stripe-signature header." }, { status: 400 });
  }

  const payload = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid signature." },
      { status: 400 },
    );
  }

  const client = getServiceClient();
  if (client) {
    const eventId = event.id;
    const existing = await client
      .from("stripe_events")
      .select("id")
      .eq("stripe_event_id", eventId)
      .maybeSingle();

    if (existing.data) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await client.from("stripe_events").insert({
      stripe_event_id: eventId,
      event_type: event.type,
      payload: event,
      created_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true, type: event.type });
}
