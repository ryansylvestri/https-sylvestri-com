import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { getCurrentViewer } from "@/lib/supabase";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: PageProps) {
  const { id } = await params;
  const client = getServiceClient();
  if (!client) {
    return NextResponse.json({ message: "Supabase asset metadata is not configured." }, { status: 503 });
  }

  const { data, error } = await client
    .from("assets")
    .select("id, secure_url, preview_url, downloadable, access, status")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ message: "Asset not found." }, { status: 404 });
  }

  if (data.status !== "ready") {
    return NextResponse.json(
      { message: `Asset is not ready. Current status: ${data.status}` },
      { status: 425 },
    );
  }

  const viewer = await getCurrentViewer();
  const tier = viewer?.tier ?? "anon";
  const requiredAccess = data.access ?? "public";
  if (requiredAccess === "free" && tier === "anon") {
    return NextResponse.json({ message: "Login required." }, { status: 401 });
  }
  if (requiredAccess === "pro" && tier !== "pro") {
    return NextResponse.json({ message: "Pro access required." }, { status: 403 });
  }

  return NextResponse.json({
    accessUrl: data.secure_url,
    previewUrl: data.preview_url,
    downloadable: data.downloadable,
    expiresInSeconds: 300,
  });
}
