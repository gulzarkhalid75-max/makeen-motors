import { createClient } from "@/lib/supabase/server";
import { fetchProfile, isProfileComplete, completeProfilePath } from "@/lib/profile";

export async function getProfileForUser(userId: string) {
  const supabase = await createClient();
  return fetchProfile(supabase, userId);
}

export async function resolvePostAuthRedirect(
  userId: string,
  redirectTo: string
): Promise<string> {
  const profile = await getProfileForUser(userId);
  if (isProfileComplete(profile)) return redirectTo;
  return completeProfilePath(redirectTo, {
    full_name: profile?.full_name ?? undefined,
    email: profile?.email ?? undefined,
    phone: profile?.phone ?? undefined,
  });
}
