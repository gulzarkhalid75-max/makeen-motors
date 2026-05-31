import { NextResponse } from "next/server";
import { fetchApprovedVehicleById } from "@/lib/admin/server";
import { vehicleRowToVehicle, isListingId } from "@/lib/listings";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isListingId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const row = await fetchApprovedVehicleById(id);
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ vehicle: vehicleRowToVehicle(row) });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to load vehicle" },
      { status: 500 }
    );
  }
}
