"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { VEHICLES } from "@/app/lib/vehicles";

const NAV_LINKS = [
  { label: "Home",    href: "/"          },
  { label: "Cars",    href: "/inventory" },
  { label: "About",   href: "/#about"    },
  { label: "Contact", href: "/#contact"  },
];

const CATEGORIES = [
  { id: "all",    label: "All"           },
  { id: "sports", label: "Sports Cars"   },
  { id: "sedan",  label: "Luxury Sedans" },
  { id: "suv",    label: "SUVs"          },
  { id: "ev",     label: "Electric"      },
];

export default function Inventory() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery,  setSearchQuery]  = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return VEHICLES.filter((v) => {
      const matchesCategory = activeFilter === "all" || v.category === activeFilter;
      const matchesSearch   = !q || v.name.toLowerCase().includes(q) || v.brand.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

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

            <Link href="/" className="flex items-center gap-3 group">
              <span className="block w-[14px] h-[14px] border border-white rotate-45 shrink-0 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-zinc-400" />
              <span className="text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-300 group-hover:text-zinc-300">
                Makeen Motors
              </span>
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
        <div className="relative pt-36 pb-12 px-8 md:px-16 border-b border-zinc-900">
          <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Our Collection</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1 className="text-5xl md:text-7xl font-thin tracking-tight uppercase leading-none">
              Inventory
            </h1>
            <p className="text-[12px] leading-[1.95] text-zinc-600 md:text-right">
              {VEHICLES.length} premium vehicles available<br />for immediate acquisition
            </p>
          </div>
        </div>

        {/* ── Search + Filters (sticky) ── */}
        <div className="sticky top-[73px] z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-900/80 px-8 md:px-16 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

            <div className="relative w-full sm:w-72 shrink-0">
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
                className="w-full h-11 bg-white/[0.04] border border-white/[0.08] pl-11 pr-10 text-[12px] text-white placeholder-zinc-700 outline-none focus:border-white/[0.22] focus:bg-white/[0.06] transition-all duration-300"
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

            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                    activeFilter === id
                      ? "bg-white text-black"
                      : "border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.25]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[10px] tracking-[0.4em] uppercase text-zinc-700">
            Showing {filtered.length} of {VEHICLES.length} vehicles
            {activeFilter !== "all" && <span> &nbsp;·&nbsp; {CATEGORIES.find((c) => c.id === activeFilter)?.label}</span>}
            {searchQuery && <span> &nbsp;·&nbsp; &ldquo;{searchQuery}&rdquo;</span>}
          </p>
        </div>

        {/* ── Vehicle Grid ── */}
        <main className="relative px-8 md:px-16 py-12 md:py-16">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-36 gap-5 text-center">
              <span className="block w-10 h-10 border border-zinc-800 rotate-45" />
              <p className="text-[11px] tracking-[0.45em] uppercase text-zinc-600">No vehicles found</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                className="mt-1 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                Clear all filters
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {filtered.map((v) => (
                <Link
                  key={v.id}
                  href={`/cars/${v.id}`}
                  className="group flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* ── Image / placeholder area ── */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {v.image.url ? (
                      <>
                        <img
                          src={v.image.url}
                          alt={`${v.brand} ${v.name}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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

                  {/* ── Card body ── */}
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

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-900 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="block w-[10px] h-[10px] border border-white/40 rotate-45 shrink-0 transition-all duration-500 group-hover:rotate-[135deg]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
              Makeen Motors
            </span>
          </Link>
          <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">
            © 2024 Makeen Motors LLC · All rights reserved
          </span>
        </footer>

      </div>
    </>
  );
}
