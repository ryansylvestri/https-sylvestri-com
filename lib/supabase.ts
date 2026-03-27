import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export type Viewer = {
  user: User;
  tier: "free" | "pro";
};

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;
  return { url, anonKey };
}

export async function getSupabaseServerClient() {
  const env = getSupabaseEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookieValues) {
        try {
          cookieValues.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Writes can be ignored in read-only render contexts.
        }
      },
    },
  });
}

export async function getCurrentViewer(): Promise<Viewer | null> {
  const client = await getSupabaseServerClient();
  if (!client) return null;

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) return null;

  const metadataTier = user.user_metadata?.tier;
  const appMetadataTier = user.app_metadata?.tier;
  const tier = metadataTier === "pro" || appMetadataTier === "pro" ? "pro" : "free";

  return { user, tier };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseEnv());
}
