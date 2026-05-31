"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mergeCatalogWithListings } from "@/app/lib/vehicles";
import type { Category, Vehicle } from "@/app/lib/vehicles";
import type { InventoryListing } from "@/lib/listings";
import { isNewListingYear } from "@/lib/listings";
import Image from "next/image";

// ── Constants ────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",    href: "/"          },
  { label: "Cars",    href: "/inventory" },
  { label: "About",   href: "/#about"    },
  { label: "Contact", href: "/#contact"  },
];

const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all",    label: "All"           },
  { id: "sports", label: "Sports Cars"   },
  { id: "sedan",  label: "Luxury Sedans" },
  { id: "suv",    label: "SUVs"          },
  { id: "ev",     label: "Electric"      },
];

type SortOrder = "default" | "price-asc" | "price-desc" | "year-desc" | "name";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "default",    label: "Featured"          },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "year-desc",  label: "Newest First"       },
  { value: "name",       label: "Name: A → Z"        },
];

// ── Approved listing card ─────────────────────────────────────

function ListingCard({ v }: { v: InventoryListing }) {
  const isNew = isNewListingYear(v.year);
  return (
    <Link
      href={`/cars/${v.id}`}
      className="group flex flex-col bg-white/[0.03] backdrop-blur-sm border border-[#C9A356]/18 hover:border-[#C9A356]/40 transition-all duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
        {v.photoUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.photoUrl}
              alt={`${v.brand} ${v.model}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
            <div className="w-10 h-10 border border-white/[0.06] rotate-45" />
            <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-800">No Photo</span>
          </div>
        )}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/45 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-[7px] tracking-[0.35em] uppercase px-2.5 py-1 bg-black/75 backdrop-blur-sm border text-[#C9A356] ${isNew ? "border-[#C9A356]/40" : "border-white/[0.1]"}`}>
            {isNew ? "New Vehicle" : "Pre-Owned"}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-[7px] tracking-[0.3em] uppercase px-2.5 py-1 bg-black/75 backdrop-blur-sm border border-white/[0.07] text-zinc-500">
            {v.year}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span className="text-[9px] tracking-[0.5em] uppercase font-semibold text-[#C9A356]">{v.brand}</span>
        <h2 className="text-xl font-thin tracking-wide text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300">
          {v.model}
        </h2>
        <div className="h-px bg-white/[0.06]" />

        {/* Specs */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-2">
          {[
            { label: "Mileage",  value: v.mileage ? `${parseInt(v.mileage).toLocaleString()} km` : "—" },
            { label: "Fuel",     value: v.fuelType     || "—" },
            { label: "Gearbox",  value: v.transmission || "—" },
          ].map(({ label, value }) => (
            <div key={label}>
              <span className="text-[7px] tracking-[0.45em] uppercase text-zinc-700">{label}</span>
              <p className="text-[11px] tracking-wide text-zinc-400 mt-0.5 truncate">{value}</p>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/[0.06]" />

        {/* Seller */}
        <div className="flex flex-col gap-1">
          <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">Seller</span>
          <p className="text-[12px] tracking-wide text-zinc-300 truncate">{v.sellerName}</p>
          <a
            href={`tel:${v.sellerPhone}`}
            className="text-[12px] tracking-wide text-[#C9A356] hover:text-white transition-colors duration-200"
          >
            {v.sellerPhone}
          </a>
        </div>
      </div>
    </Link>
  );
}

function BrandSection({ vehicles }: { vehicles: InventoryListing[] }) {
  const byBrand: Record<string, InventoryListing[]> = {};
  vehicles.forEach(v => {
    if (!byBrand[v.brand]) byBrand[v.brand] = [];
    byBrand[v.brand].push(v);
  });
  return (
    <div className="flex flex-col gap-10">
      {Object.entries(byBrand).map(([brand, cars]) => (
        <div key={brand}>
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#C9A356]/55 shrink-0">{brand}</span>
            <div className="flex-1 h-px bg-[#C9A356]/10" />
            <span className="text-[8px] tracking-[0.3em] uppercase text-zinc-800 shrink-0">{cars.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {cars.map(v => <ListingCard key={v.id} v={v} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function parsePriceValue(price: string): number {
  return parseInt(price.replace(/\D/g, ""), 10) || 0;
}

// ── Page ─────────────────────────────────────────────────────

function InventoryContent() {
  const searchParams = useSearchParams();
  const brandFilter = searchParams.get("brand")?.trim() ?? "";

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [sortOrder,    setSortOrder]    = useState<SortOrder>("default");
  const [approvedListings, setApprovedListings] = useState<InventoryListing[]>([]);
  const [approvedVehicles, setApprovedVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => {
        setApprovedVehicles(data.vehicles ?? []);
        setApprovedListings(data.listings ?? []);
      })
      .catch(() => {});
  }, []);

  const catalog = useMemo(
    () => mergeCatalogWithListings(approvedVehicles),
    [approvedVehicles]
  );

  const matchesBrand = (brand: string) =>
    !brandFilter || brand.toLowerCase() === brandFilter.toLowerCase();

  // Vehicles matching current search (ignoring category) — used for per-category counts
  const searchMatches = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let pool = catalog.filter(v => matchesBrand(v.brand));
    if (!q) return pool;
    return pool.filter(
      (v) => v.name.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q),
    );
  }, [searchQuery, catalog, brandFilter]);

  // Per-category counts (updates as the search query changes)
  const categoryCounts = useMemo(() => ({
    all:    searchMatches.length,
    sports: searchMatches.filter((v) => v.category === "sports").length,
    sedan:  searchMatches.filter((v) => v.category === "sedan").length,
    suv:    searchMatches.filter((v) => v.category === "suv").length,
    ev:     searchMatches.filter((v) => v.category === "ev").length,
  }), [searchMatches]);

  // Filtered + sorted result set
  const results = useMemo(() => {
    const base = searchMatches.filter(
      (v) => activeFilter === "all" || v.category === activeFilter,
    );
    switch (sortOrder) {
      case "price-asc":  return [...base].sort((a, b) => parsePriceValue(a.price) - parsePriceValue(b.price));
      case "price-desc": return [...base].sort((a, b) => parsePriceValue(b.price) - parsePriceValue(a.price));
      case "year-desc":  return [...base].sort((a, b) => b.year - a.year);
      case "name":       return [...base].sort((a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`));
      default:           return base;
    }
  }, [searchMatches, activeFilter, sortOrder]);

  const filteredListings = useMemo(
    () => approvedListings.filter(l => matchesBrand(l.brand)),
    [approvedListings, brandFilter]
  );

  const hasActiveFilters = activeFilter !== "all" || searchQuery !== "" || !!brandFilter;

  function clearAll() {
    setSearchQuery("");
    setActiveFilter("all");
    setSortOrder("default");
    if (brandFilter) {
      window.history.replaceState(null, "", "/inventory");
    }
  }

  return (
    <>
      <style>{`
        .btn-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .btn-fill:hover::after { transform: translateY(0); }
        .btn-fill:hover span   { color: #000; }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans">

        {/* ── Background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.024]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.7))]" />
        </div>

        {/* ── Navbar ── */}
        <header className="fixed inset-x-0 top-0 z-50">
          <div className="flex items-center justify-between px-6 md:px-14 py-5 bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.07]">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={160}
                height={40}
                priority
                className="h-8 md:h-9 w-auto transition-opacity duration-300 group-hover:opacity-75"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map(({ label, href }) => {
                const active = label === "Cars";
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`relative text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 py-1 group ${
                      active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                    <span className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}
            </nav>

            <a
              href="/#contact"
              className="hidden md:inline-flex items-center px-6 py-2.5 border border-white/30 text-[10px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-500 hover:border-white"
            >
              Enquire
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
            >
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/85 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 transition-all duration-300 ${
                    label === "Cars" ? "text-white" : "text-zinc-400 hover:text-white"
                  } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {label}
                </Link>
              ))}
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 mb-2 text-center py-3 border border-white/30 text-[10px] tracking-[0.35em] uppercase text-zinc-300 hover:bg-white hover:text-black transition-all duration-500"
              >
                Enquire
              </a>
            </nav>
          </div>
        </header>

        {/* ── Page Header ── */}
        <div className="relative pt-20 md:pt-36 pb-12 px-6 md:px-16 border-b border-zinc-900">
          <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Our Collection</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-4xl md:text-7xl font-thin tracking-tight uppercase leading-none">
              Inventory
            </h1>
            <p className="text-[12px] leading-[1.95] text-zinc-600 md:text-right">
              {catalog.length} premium vehicles available<br />for immediate acquisition
            </p>
          </div>
          {brandFilter && (
            <div className="mt-6 flex items-center gap-3">
              <span className="text-[9px] tracking-[0.45em] uppercase text-[#C9A356]">
                Brand: {brandFilter}
              </span>
              <Link
                href="/inventory"
                className="text-[9px] tracking-[0.35em] uppercase text-zinc-600 hover:text-white transition-colors"
              >
                Clear filter ×
              </Link>
            </div>
          )}
        </div>

        {/* ── Search · Filters · Sort (sticky toolbar) ── */}
        <div className="sticky top-14 md:top-[73px] z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-900/80 px-6 md:px-16 py-4 md:py-5 flex flex-col gap-3">

          {/* Row 1 — search + sort */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">

            {/* Search input */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand or model…"
                className="w-full h-11 bg-white/[0.04] border border-white/[0.08] pl-11 pr-9 text-[12px] text-white placeholder-zinc-700 outline-none focus:border-white/[0.22] focus:bg-white/[0.06] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative sm:shrink-0">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                aria-label="Sort vehicles"
                className="appearance-none h-11 w-full bg-white/[0.04] border border-white/[0.08] pl-4 pr-9 text-[10px] tracking-[0.28em] uppercase text-zinc-400 outline-none focus:border-white/[0.22] transition-all duration-300 cursor-pointer hover:border-white/[0.18] hover:text-white"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value} style={{ background: "#111", color: "#ccc" }}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-2">
                  <path d="M1 1l5 5 5-5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2 — category filter tabs with per-category counts */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(({ id, label }) => {
              const count = categoryCounts[id];
              const active = activeFilter === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  disabled={count === 0}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] tracking-[0.28em] uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
                    active
                      ? "bg-white text-black"
                      : "border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.25]"
                  }`}
                >
                  {label}
                  <span className={`text-[9px] tabular-nums ${active ? "text-black/50" : "text-zinc-700"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 3 — active filter chips (conditional) */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700 mr-1">
                Active:
              </span>

              {activeFilter !== "all" && (
                <button
                  onClick={() => setActiveFilter("all")}
                  className="group flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border border-white/[0.12] text-zinc-400 hover:text-white hover:border-white/[0.28] transition-all duration-200"
                >
                  {CATEGORIES.find((c) => c.id === activeFilter)?.label}
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5 text-zinc-600 group-hover:text-white transition-colors">
                    <path d="M2 2l6 6M8 2l-6 6" />
                  </svg>
                </button>
              )}

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="group flex items-center gap-1.5 text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 border border-white/[0.12] text-zinc-400 hover:text-white hover:border-white/[0.28] transition-all duration-200"
                >
                  &ldquo;{searchQuery}&rdquo;
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5 text-zinc-600 group-hover:text-white transition-colors">
                    <path d="M2 2l6 6M8 2l-6 6" />
                  </svg>
                </button>
              )}

              <button
                onClick={clearAll}
                className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 hover:text-zinc-300 transition-colors duration-200 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Row 4 — results count */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-zinc-700">
            {results.length === 0
              ? "No vehicles match your search"
              : results.length === searchMatches.length
              ? `Showing all ${searchMatches.length} vehicles`
              : `Showing ${results.length} of ${searchMatches.length} vehicles`}
            {sortOrder !== "default" && (
              <span> &nbsp;·&nbsp; {SORT_OPTIONS.find((s) => s.value === sortOrder)?.label}</span>
            )}
          </p>
        </div>

        {/* ── Vehicle Grid ── */}
        <main className="relative px-6 md:px-16 py-10 md:py-16">
          {results.length === 0 ? (

            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-36 gap-6 text-center">
              <span className="block w-10 h-10 border border-zinc-800 rotate-45" />
              <div className="flex flex-col gap-2">
                <p className="text-[11px] tracking-[0.5em] uppercase text-zinc-500">
                  No vehicles found
                </p>
                {(searchQuery || activeFilter !== "all") && (
                  <p className="text-[12px] text-zinc-700 max-w-xs">
                    {searchQuery && activeFilter !== "all"
                      ? `No ${CATEGORIES.find((c) => c.id === activeFilter)?.label.toLowerCase()} matching "${searchQuery}"`
                      : searchQuery
                      ? `No vehicles matching "${searchQuery}"`
                      : `No vehicles in ${CATEGORIES.find((c) => c.id === activeFilter)?.label}`}
                  </p>
                )}
              </div>
              <button
                onClick={clearAll}
                className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group"
              >
                Clear all filters
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>

          ) : (

            /* ── Results grid ── */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {results.map((v) => (
                <Link
                  key={v.id}
                  href={`/cars/${v.id}`}
                  className="group flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Image / placeholder */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {v.image.url ? (
                      <>
                        <Image
                          src={v.image.url}
                          alt={`${v.brand} ${v.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${v.image.glow}, transparent)` }}
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                        <div
                          className="absolute inset-0"
                          style={{ background: `radial-gradient(ellipse 80% 65% at 50% 115%, ${v.image.glow}, transparent)` }}
                        />
                        <div
                          className="absolute w-36 h-36 border border-white/[0.035] left-1/2 top-1/2"
                          style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
                        />
                        <span
                          className="absolute right-3 bottom-1 text-[5rem] font-black leading-none select-none pointer-events-none"
                          style={{ color: `${v.image.accent}0d` }}
                        >
                          {v.id}
                        </span>
                      </div>
                    )}

                    <div
                      className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: v.image.line }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/[0.1]"
                        style={{ color: v.image.accent }}
                      >
                        {v.badge}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/[0.08] text-zinc-500">
                        {v.year}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <span
                      className="text-[9px] tracking-[0.5em] uppercase font-semibold"
                      style={{ color: v.image.accent }}
                    >
                      {v.brand}
                    </span>
                    <h2 className="text-xl font-thin tracking-wide text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300">
                      {v.name}
                    </h2>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Price</span>
                        <p className="text-base font-light tracking-wide text-white mt-0.5">{v.price}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Mileage</span>
                        <p className="text-[12px] tracking-wide text-zinc-500 mt-0.5">{v.mileage}</p>
                      </div>
                    </div>
                    <div className="btn-fill relative mt-1 w-full py-3 border border-white/[0.12] text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white/[0.4] transition-colors duration-500 text-center">
                      <span className="relative z-10 transition-colors duration-200">View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* ── Approved listings (new & pre-owned by brand) ── */}
        {filteredListings.length > 0 && (() => {
          const newVehicles      = filteredListings.filter(v => isNewListingYear(v.year));
          const preOwnedVehicles = filteredListings.filter(v => !isNewListingYear(v.year));
          return (
            <div className="relative border-t border-zinc-900 px-6 md:px-16 py-12 md:py-20">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 55% 25% at 50% 0%,rgba(201,163,86,0.03),transparent)" }}
                aria-hidden
              />
              <div className="relative">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12 md:mb-16">
                  <div>
                    <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600 mb-2">Approved Listings</p>
                    <h2 className="text-3xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                      {brandFilter ? (
                        <>{brandFilter}<br /><span className="text-zinc-500">Collection</span></>
                      ) : (
                        <>Latest<br /><span className="text-zinc-500">Arrivals</span></>
                      )}
                    </h2>
                  </div>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-700">
                    {filteredListings.length} {filteredListings.length === 1 ? "vehicle" : "vehicles"}
                  </span>
                </div>

                {/* New Vehicles */}
                {newVehicles.length > 0 && (
                  <div className={preOwnedVehicles.length > 0 ? "mb-16" : ""}>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="block w-1.5 h-1.5 bg-[#C9A356]/60 rotate-45 shrink-0" />
                      <h3 className="text-[10px] tracking-[0.55em] uppercase text-white shrink-0">New Vehicles</h3>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-700 shrink-0">{newVehicles.length}</span>
                    </div>
                    <BrandSection vehicles={newVehicles} />
                  </div>
                )}

                {/* Pre-Owned Vehicles */}
                {preOwnedVehicles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="block w-1.5 h-1.5 border border-[#C9A356]/40 rotate-45 shrink-0" />
                      <h3 className="text-[10px] tracking-[0.55em] uppercase text-white shrink-0">Pre-Owned Vehicles</h3>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-700 shrink-0">{preOwnedVehicles.length}</span>
                    </div>
                    <BrandSection vehicles={preOwnedVehicles} />
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-900 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="group">
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={120}
              height={30}
              className="h-5 w-auto opacity-40 transition-opacity duration-300 group-hover:opacity-70"
            />
          </Link>
          <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">
            © 2024 Makeen Motors LLC · All rights reserved
          </span>
        </footer>

      </div>
    </>
  );
}

export default function Inventory() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <span className="w-8 h-8 rounded-full border border-[#C9A356]/35 border-t-[#C9A356] animate-spin" />
        </div>
      }
    >
      <InventoryContent />
    </Suspense>
  );
}
