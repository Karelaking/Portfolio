import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

const getSupabaseUrl = (): string => {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
};

const createServerClient = (url: string, key: string): SupabaseClient => {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const getSupabaseServerClient = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";

  if (!url || !key) {
    return null;
  }

  return createServerClient(url, key);
};

export const getSupabaseAdminClient = (): SupabaseClient | null => {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!url || !key) {
    return null;
  }

  return createServerClient(url, key);
};
