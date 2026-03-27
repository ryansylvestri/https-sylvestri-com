import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/account";

  const client = await getSupabaseServerClient();
  if (!client || !code) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, url));
  }

  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, url));
  }

  return NextResponse.redirect(new URL(next, url));
}
