import { createClient } from "@/lib/supabase/server";
import { profilesTable } from "@/lib/supabase/profiles";
import type { VehicleRow, ProfileRow } from "@/types/database";

export async function isUserAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await profilesTable(supabase)
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) return false;

  const adminFlag = (data as ProfileRow & { is_admin?: boolean }).is_admin;
  return adminFlag === true;
}

export async function requireAdmin(): Promise<{ userId: string } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  if (!(await isUserAdmin(user.id))) return null;
  return { userId: user.id };
}

export async function fetchAllVehiclesAdmin(): Promise<VehicleRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchApprovedVehicles(): Promise<VehicleRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function fetchApprovedVehicleById(
  id: string
): Promise<VehicleRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .eq("status", "approved")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export function storagePathsFromUrls(urls: string[]): string[] {
  const marker = "/vehicle-images/";
  return urls
    .map(url => {
      const i = url.indexOf(marker);
      if (i === -1) return null;
      return decodeURIComponent(url.slice(i + marker.length));
    })
    .filter((p): p is string => Boolean(p));
}
