import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { supabaseDbOptions } from "@/lib/supabase/config";

export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

  const { url } = getSupabaseEnv();
  return createClient<Database>(url, serviceKey, {
    ...supabaseDbOptions,
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
