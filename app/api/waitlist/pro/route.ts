import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type WaitlistPayload = {
  email?: string;
  slug?: string;
  source?: string;
  notes?: string;
};

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as WaitlistPayload;
  const email = payload.email?.trim().toLowerCase();
  const slug = payload.slug?.trim();

  if (!email || !slug) {
    return NextResponse.json(
      { message: "email and slug are required." },
      { status: 400 },
    );
  }

  const client = getServiceClient();
  if (!client) {
    console.info("[pro-waitlist] accepted without Supabase", payload);
    return NextResponse.json(
      { message: "Waitlist submission accepted locally. Configure Supabase to persist it." },
      { status: 202 },
    );
  }

  const { error } = await client.from("pro_waitlist").upsert(
    {
      email,
      slug,
      source: payload.source?.trim() || "site",
      notes: payload.notes?.trim() || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email,slug" },
  );

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Waitlist submission recorded." });
}
