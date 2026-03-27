import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const next = String(formData.get("next") || "/account");

  const client = await getSupabaseServerClient();
  if (!client || !email) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, request.url));
  }

  const callbackUrl = new URL("/auth/callback", request.url);
  callbackUrl.searchParams.set("next", next);

  await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: callbackUrl.toString(),
    },
  });

  return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, request.url));
}
