import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const BUCKET = "vehicle-images";

type Client = SupabaseClient<Database>;

export interface VehicleSubmissionInput {
  brand: string;
  model: string;
  year: number;
  mileage: string;
  fuel_type: string;
  transmission: string;
  horsepower: string;
  exterior_color: string;
  seller_name: string;
  email: string;
  phone: string;
  condition: string;
  images: File[];
}

async function uploadImages(
  supabase: Client,
  userId: string,
  vehicleId: string,
  files: File[]
): Promise<{ urls: string[]; error: string | null }> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "avif"].includes(ext) ? ext : "jpg";
    const path = `${userId}/${vehicleId}/${i}-${Date.now()}.${safeExt}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

    if (error) return { urls: [], error: error.message };

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return { urls, error: null };
}

export async function submitVehicleListing(
  supabase: Client,
  userId: string,
  input: VehicleSubmissionInput
): Promise<{ error: string | null }> {
  const vehicleId = crypto.randomUUID();

  let imageUrls: string[] = [];
  if (input.images.length > 0) {
    const { urls, error: uploadError } = await uploadImages(
      supabase,
      userId,
      vehicleId,
      input.images
    );
    if (uploadError) return { error: uploadError };
    imageUrls = urls;
  }

  const row: Database["public"]["Tables"]["vehicles"]["Insert"] = {
    id: vehicleId,
    user_id: userId,
    brand: input.brand,
    model: input.model,
    year: input.year,
    mileage: input.mileage,
    fuel_type: input.fuel_type,
    transmission: input.transmission,
    horsepower: input.horsepower || null,
    exterior_color: input.exterior_color,
    seller_name: input.seller_name,
    email: input.email,
    phone: input.phone,
    images: imageUrls,
    condition: input.condition,
    status: "pending",
  };

  const { error } = await supabase.from("vehicles").insert(row);
  return { error: error?.message ?? null };
}
