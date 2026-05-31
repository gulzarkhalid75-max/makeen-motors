import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, ProfileRow } from "@/types/database";
import { profilesTable } from "@/lib/supabase/profiles";

type Client = SupabaseClient<Database>;

export function isProfileComplete(profile: ProfileRow | null): boolean {
  if (!profile) return false;
  return Boolean(
    profile.full_name?.trim() &&
      profile.email?.trim() &&
      profile.phone?.trim()
  );
}

export async function fetchProfile(
  supabase: Client,
  userId: string
): Promise<ProfileRow | null> {
  const { data, error } = await profilesTable(supabase)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveProfile(
  supabase: Client,
  userId: string,
  fields: { full_name: string; email: string; phone: string }
): Promise<{ error: string | null }> {
  const row: Database["public"]["Tables"]["profiles"]["Insert"] = {
    user_id: userId,
    full_name: fields.full_name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
  };

  const { error } = await profilesTable(supabase).upsert(row, {
    onConflict: "user_id",
  });

  return { error: error?.message ?? null };
}

export function completeProfilePath(redirectTo: string, prefill?: {
  full_name?: string;
  email?: string;
  phone?: string;
}): string {
  const params = new URLSearchParams({ redirect: redirectTo });
  if (prefill?.full_name) params.set("name", prefill.full_name);
  if (prefill?.email) params.set("email", prefill.email);
  if (prefill?.phone) params.set("phone", prefill.phone);
  return `/complete-profile?${params.toString()}`;
}

export async function resolvePostAuthPath(
  supabase: Client,
  userId: string,
  redirectTo: string
): Promise<string> {
  const profile = await fetchProfile(supabase, userId);
  if (isProfileComplete(profile)) return redirectTo;
  return completeProfilePath(redirectTo, {
    full_name: profile?.full_name ?? undefined,
    email: profile?.email ?? undefined,
    phone: profile?.phone ?? undefined,
  });
}
