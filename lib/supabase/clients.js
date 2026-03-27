import { createClient } from "@supabase/supabase-js";

export function isSupabaseConfigured() {
  return Boolean(process.env.MONGOLWAY_SUPABASE_URL && process.env.MONGOLWAY_SUPABASE_SERVICE_ROLE_KEY);
}

export function createSupabaseAdminClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient(
    process.env.MONGOLWAY_SUPABASE_URL,
    process.env.MONGOLWAY_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false
      }
    }
  );
}

export function createSupabaseBrowserClient() {
  if (!process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_URL || !process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_ANON_KEY) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_URL,
    process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_ANON_KEY
  );
}
