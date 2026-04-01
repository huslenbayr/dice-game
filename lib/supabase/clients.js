import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  return String(process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_URL || process.env.MONGOLWAY_SUPABASE_URL || "").trim();
}

function getSupabaseAnonKey() {
  return String(
    process.env.NEXT_PUBLIC_MONGOLWAY_SUPABASE_ANON_KEY || process.env.MONGOLWAY_SUPABASE_ANON_KEY || ""
  ).trim();
}

function getSupabaseServiceRoleKey() {
  return String(process.env.MONGOLWAY_SUPABASE_SERVICE_ROLE_KEY || "").trim();
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

export function isSupabaseAuthConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function getSupabaseStorageKey() {
  const supabaseUrl = getSupabaseUrl();

  if (!supabaseUrl) {
    return "mongolway-auth-token";
  }

  try {
    return `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
  } catch {
    return "mongolway-auth-token";
  }
}

export function createSupabaseAdminClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createClient(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    {
      auth: {
        persistSession: false
      }
    }
  );
}

export function createSupabasePublicClient(options = {}) {
  if (!isSupabaseAuthConfigured()) {
    return null;
  }

  const authOptions = {
    flowType: "pkce",
    detectSessionInUrl: false,
    persistSession: true,
    autoRefreshToken: false,
    storageKey: getSupabaseStorageKey(),
    ...(options.auth || {})
  };

  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    ...options,
    auth: authOptions
  });
}

export function createSupabaseBrowserClient() {
  return createSupabasePublicClient();
}
