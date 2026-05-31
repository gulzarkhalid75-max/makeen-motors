import type { VehicleRow } from "@/types/database";
import type { Category, Vehicle, VehicleImage } from "@/app/lib/vehicles";

const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_IMAGE: VehicleImage = {
  accent: "#C9A356",
  glow: "rgba(201,163,86,0.2)",
  line: "linear-gradient(90deg,transparent,rgba(201,163,86,0.75),transparent)",
};

const BRAND_ACCENTS: Record<string, VehicleImage> = {
  BMW: {
    accent: "#4B9CC2",
    glow: "rgba(75,156,194,0.22)",
    line: "linear-gradient(90deg,transparent,rgba(75,156,194,0.8),transparent)",
  },
  Porsche: {
    accent: "#B89A3E",
    glow: "rgba(184,154,62,0.2)",
    line: "linear-gradient(90deg,transparent,rgba(184,154,62,0.75),transparent)",
  },
  Ferrari: {
    accent: "#C03030",
    glow: "rgba(192,48,48,0.14)",
    line: "linear-gradient(90deg,transparent,rgba(192,48,48,0.6),transparent)",
  },
  Lamborghini: {
    accent: "#D4AF37",
    glow: "rgba(212,175,55,0.18)",
    line: "linear-gradient(90deg,transparent,rgba(212,175,55,0.7),transparent)",
  },
  Tesla: {
    accent: "#C03030",
    glow: "rgba(192,48,48,0.14)",
    line: "linear-gradient(90deg,transparent,rgba(192,48,48,0.6),transparent)",
  },
};

export function inferCategory(row: VehicleRow): Category {
  const fuel = (row.fuel_type ?? "").toLowerCase();
  const model = (row.model ?? "").toLowerCase();
  const brand = (row.brand ?? "").toLowerCase();

  if (fuel.includes("electric") || fuel.includes("plug-in")) return "ev";

  const suvHints = [
    "suv",
    "urus",
    "cayenne",
    "bentayga",
    "range rover",
    " xm",
    "x5",
    "x7",
    "g-class",
    "gle",
    "glc",
    "macan",
    "q8",
    "q7",
    "cullinan",
  ];
  if (suvHints.some(h => model.includes(h) || brand.includes("range rover"))) return "suv";

  const sportsHints = [
    "ferrari",
    "lamborghini",
    "mclaren",
    "911",
    "corvette",
    "vantage",
    " m4",
    " m3",
    "amg gt",
    "huracan",
    "aventador",
    "488",
    "f8",
  ];
  if (sportsHints.some(h => model.includes(h) || brand.includes(h))) return "sports";

  return "sedan";
}

function categoryBadge(category: Category): string {
  switch (category) {
    case "sports":
      return "Sports Car";
    case "suv":
      return "SUV";
    case "ev":
      return "Electric";
    default:
      return "Luxury Sedan";
  }
}

function imageForRow(row: VehicleRow): VehicleImage {
  const brandKey = row.brand ?? "";
  const base = BRAND_ACCENTS[brandKey] ?? DEFAULT_IMAGE;
  const url = row.images?.[0];
  return url ? { ...base, url } : base;
}

export function vehicleRowToVehicle(row: VehicleRow): Vehicle {
  const category = inferCategory(row);
  const brand = row.brand ?? "Unknown";
  const name = row.model ?? "Vehicle";
  const year = row.year ?? CURRENT_YEAR;
  const mileageRaw = row.mileage ?? "";
  const mileage = mileageRaw
    ? mileageRaw.toLowerCase().includes("km")
      ? mileageRaw
      : `${parseInt(mileageRaw.replace(/\D/g, ""), 10).toLocaleString()} km`
    : "—";

  const description =
    row.condition
      ? `Approved listing from Makeen Motors. Condition: ${row.condition}. Contact our team for pricing and inspection.`
      : "Approved listing from Makeen Motors. Contact our team for pricing and inspection.";

  return {
    id: row.id,
    brand,
    name,
    year,
    price: "Price on Request",
    mileage,
    category,
    badge: categoryBadge(category),
    image: imageForRow(row),
    engine: row.horsepower ? `${row.horsepower} (as listed)` : "—",
    horsepower: row.horsepower ?? "—",
    topSpeed: "—",
    acceleration: "—",
    transmission: row.transmission ?? "—",
    fuelType: row.fuel_type ?? "—",
    drivetrain: "—",
    location: "Dubai, UAE",
    ownership: "Private Seller",
    condition: row.condition ?? "—",
    exterior: row.exterior_color ?? "—",
    interior: "—",
    features: row.images.length > 1 ? [`${row.images.length} photos available`] : [],
    description,
  };
}

export function isNewListingYear(year: number): boolean {
  return year >= CURRENT_YEAR - 2;
}

export function isListingId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
}

/** Display shape for inventory brand sections (new / pre-owned). */
export interface InventoryListing {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  horsepower: string;
  exteriorColor: string;
  photoUrl: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  condition: string;
  createdAt: string;
}

export function vehicleRowToInventoryListing(row: VehicleRow): InventoryListing {
  return {
    id: row.id,
    brand: row.brand ?? "Unknown",
    model: row.model ?? "Vehicle",
    year: row.year ?? CURRENT_YEAR,
    mileage: row.mileage ?? "",
    fuelType: row.fuel_type ?? "",
    transmission: row.transmission ?? "",
    horsepower: row.horsepower ?? "",
    exteriorColor: row.exterior_color ?? "",
    photoUrl: row.images?.[0] ?? "",
    sellerName: row.seller_name ?? "",
    sellerEmail: row.email ?? "",
    sellerPhone: row.phone ?? "",
    condition: row.condition ?? "",
    createdAt: row.created_at,
  };
}
