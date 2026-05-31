import { NextResponse } from "next/server";
import { fetchApprovedVehicles } from "@/lib/admin/server";
import { vehicleRowToInventoryListing, vehicleRowToVehicle } from "@/lib/listings";

export async function GET() {
  try {
    const rows = await fetchApprovedVehicles();
    return NextResponse.json({
      vehicles: rows.map(vehicleRowToVehicle),
      listings: rows.map(vehicleRowToInventoryListing),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to load listings" },
      { status: 500 }
    );
  }
}
