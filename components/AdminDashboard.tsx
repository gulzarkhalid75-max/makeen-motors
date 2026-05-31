"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { VehicleRow, VehicleStatus } from "@/types/database";
import {
  getAdminVehicles,
  updateVehicleStatus,
  deleteVehicle,
} from "@/app/admin/actions";

const STATUS_STYLES: Record<VehicleStatus, string> = {
  pending:  "border-amber-500/35 bg-amber-500/10 text-amber-400",
  approved: "border-emerald-500/35 bg-emerald-500/10 text-emerald-400",
  rejected: "border-red-500/35 bg-red-500/10 text-red-400",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminDashboard({
  initialVehicles,
}: {
  initialVehicles: VehicleRow[];
}) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [filter, setFilter] = useState<"all" | VehicleStatus>("all");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const refreshList = async () => {
    const { vehicles: next, error } = await getAdminVehicles();
    if (!error && next) setVehicles(next);
    router.refresh();
  };

  const filtered =
    filter === "all" ? vehicles : vehicles.filter(v => v.status === filter);

  const counts = {
    all:      vehicles.length,
    pending:  vehicles.filter(v => v.status === "pending").length,
    approved: vehicles.filter(v => v.status === "approved").length,
    rejected: vehicles.filter(v => v.status === "rejected").length,
  };

  const runAction = (
    action: () => Promise<{ error: string | null }>,
    successMsg: string,
    optimistic?: (prev: VehicleRow[]) => VehicleRow[]
  ) => {
    setMessage("");
    startTransition(async () => {
      if (optimistic) setVehicles(optimistic);
      const { error } = await action();
      if (error) {
        setMessage(error);
        setVehicles(initialVehicles);
        return;
      }
      setMessage(successMsg);
      await refreshList();
    });
  };

  return (
    <>
      <style>{`
        .admin-grid {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans">
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 admin-grid opacity-[0.022]" />
        </div>

        <header className="relative z-10 border-b border-white/[0.07] bg-black/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 md:px-14 py-5">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={140}
                height={35}
                className="h-7 w-auto opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/inventory"
                className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 hover:text-white transition-colors"
              >
                View Site →
              </Link>
              <span className="text-[9px] tracking-[0.5em] uppercase text-[#C9A356]/70">
                Admin
              </span>
            </div>
          </div>
        </header>

        <main className="relative z-10 px-6 md:px-14 py-10 md:py-14 max-w-[1400px] mx-auto">
          <div className="mb-10">
            <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600 mb-2">
              Makeen Motors
            </p>
            <h1 className="text-3xl md:text-4xl font-thin tracking-tight uppercase">
              Vehicle Submissions
            </h1>
            <p className="text-[12px] text-zinc-500 mt-2">
              Approve listings to publish on inventory. Pending and rejected stay hidden.
            </p>
          </div>

          {message && (
            <div className="mb-6 px-4 py-3 border border-white/[0.1] bg-white/[0.03]">
              <p className="text-[11px] text-zinc-300">{message}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {(["all", "pending", "approved", "rejected"] as const).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-4 py-2 border text-[9px] tracking-[0.35em] uppercase transition-all duration-300 ${
                  filter === key
                    ? "border-[#C9A356]/50 bg-[#C9A356]/10 text-[#C9A356]"
                    : "border-white/[0.08] text-zinc-600 hover:border-white/20"
                }`}
              >
                {key} ({counts[key]})
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="border border-white/[0.08] p-16 text-center">
              <p className="text-[11px] tracking-[0.4em] uppercase text-zinc-600">
                No vehicles in this view
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filtered.map(v => (
                <article
                  key={v.id}
                  className="relative border border-white/[0.08] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/30 to-transparent" />
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative w-full lg:w-56 h-40 lg:h-auto shrink-0 bg-zinc-950">
                      {v.images?.[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={v.images[0]}
                          alt={`${v.brand} ${v.model}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] tracking-[0.4em] uppercase text-zinc-800">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-6 flex flex-col gap-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="text-[9px] tracking-[0.5em] uppercase text-[#C9A356]">
                            {v.brand}
                          </span>
                          <h2 className="text-xl font-thin tracking-wide text-white mt-1">
                            {v.year} {v.model}
                          </h2>
                          <p className="text-[10px] text-zinc-600 mt-1">
                            Submitted {formatDate(v.created_at)}
                          </p>
                        </div>
                        <span
                          className={`text-[8px] tracking-[0.4em] uppercase px-3 py-1 border ${STATUS_STYLES[v.status]}`}
                        >
                          {v.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
                        <div>
                          <span className="text-zinc-700 uppercase tracking-[0.3em] text-[7px]">Mileage</span>
                          <p className="text-zinc-400 mt-0.5">{v.mileage || "—"}</p>
                        </div>
                        <div>
                          <span className="text-zinc-700 uppercase tracking-[0.3em] text-[7px]">Fuel</span>
                          <p className="text-zinc-400 mt-0.5">{v.fuel_type || "—"}</p>
                        </div>
                        <div>
                          <span className="text-zinc-700 uppercase tracking-[0.3em] text-[7px]">Seller</span>
                          <p className="text-zinc-400 mt-0.5 truncate">{v.seller_name || "—"}</p>
                        </div>
                        <div>
                          <span className="text-zinc-700 uppercase tracking-[0.3em] text-[7px]">Contact</span>
                          <p className="text-zinc-400 mt-0.5 truncate">{v.phone || v.email || "—"}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                        {v.status !== "approved" && (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() =>
                              runAction(
                                () => updateVehicleStatus(v.id, "approved"),
                                "Vehicle approved."
                              )
                            }
                            className="group relative px-5 py-2.5 border border-emerald-500/40 text-[8px] tracking-[0.35em] uppercase text-emerald-400 hover:border-emerald-400/60 transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        {v.status !== "rejected" && (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() =>
                              runAction(
                                () => updateVehicleStatus(v.id, "rejected"),
                                "Vehicle rejected."
                              )
                            }
                            className="px-5 py-2.5 border border-red-500/30 text-[8px] tracking-[0.35em] uppercase text-red-400 hover:border-red-400/50 transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}
                        {v.status !== "pending" && (
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() =>
                              runAction(
                                () => updateVehicleStatus(v.id, "pending"),
                                "Moved to pending."
                              )
                            }
                            className="px-5 py-2.5 border border-white/[0.12] text-[8px] tracking-[0.35em] uppercase text-zinc-500 hover:text-white transition-colors disabled:opacity-50"
                          >
                            Set Pending
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => {
                            if (!confirm("Delete this vehicle permanently?")) return;
                            runAction(
                              () => deleteVehicle(v.id),
                              "Vehicle deleted.",
                              prev => prev.filter(x => x.id !== v.id)
                            );
                          }}
                          className="ml-auto px-5 py-2.5 border border-white/[0.08] text-[8px] tracking-[0.35em] uppercase text-zinc-600 hover:text-red-400 hover:border-red-500/30 transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {pending && (
            <p className="fixed bottom-6 right-6 text-[9px] tracking-[0.4em] uppercase text-zinc-500 bg-black/90 border border-white/10 px-4 py-2">
              Updating…
            </p>
          )}
        </main>
      </div>
    </>
  );
}
