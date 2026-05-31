"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  requireAdmin,
  fetchAllVehiclesAdmin,
  storagePathsFromUrls,
} from "@/lib/admin/server";
import type { VehicleStatus } from "@/types/database";

export async function getAdminVehicles() {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized", vehicles: null };
  try {
    const vehicles = await fetchAllVehiclesAdmin();
    return { error: null, vehicles };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to load vehicles", vehicles: null };
  }
}

export async function updateVehicleStatus(
  vehicleId: string,
  status: VehicleStatus
) {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  const supabase = await createClient();
  const { error } = await supabase
    .from("vehicles")
    .update({ status })
    .eq("id", vehicleId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/inventory");
  revalidatePath("/api/listings");
  return { error: null };
}

export async function deleteVehicle(vehicleId: string) {
  const admin = await requireAdmin();
  if (!admin) return { error: "Unauthorized" };

  const supabase = await createClient();

  const { data: row, error: fetchError } = await supabase
    .from("vehicles")
    .select("images")
    .eq("id", vehicleId)
    .maybeSingle();

  if (fetchError) return { error: fetchError.message };
  if (!row) return { error: "Vehicle not found" };

  const paths = storagePathsFromUrls(row.images ?? []);
  if (paths.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("vehicle-images")
      .remove(paths);
    if (storageError) return { error: storageError.message };
  }

  const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/inventory");
  revalidatePath("/api/listings");
  return { error: null };
}
