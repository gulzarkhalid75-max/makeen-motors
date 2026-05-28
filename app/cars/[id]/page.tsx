"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getVehicleById, getSimilarVehicles } from "@/app/lib/vehicles";

const NAV_LINKS = [
  { label: "Home",    href: "/"          },
  { label: "Cars",    href: "/inventory" },
  { label: "About",   href: "/#about"    },
  { label: "Contact", href: "/#contact"  },
];

const SPEC_ICONS: Record<string, React.ReactNode> = {
  Engine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <path d="M6 7V5M10 7V5M14 7V5M18 7V5M6 17v2M10 17v2M14 17v2M18 17v2" />
    </svg>
  ),
  Horsepower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
    </svg>
  ),
  "Top Speed": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2C6.5 2 2 6.5 2 12" /><path d="M12 2C17.5 2 22 6.5 22 12" />
      <path d="M2 12C2 15.2 3.6 18 6 19.8" /><path d="M22 12C22 15.2 20.4 18 18 19.8" />
      <path d="M12 12L16 7" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  "0 – 100": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
  ),
  Transmission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" />
      <path d="M6 7v3M18 7v3M6 10C6 14 12 17 12 17M18 10C18 14 12 17 12 17" />
    </svg>
  ),
  "Fuel Type": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 22V8l7-6 7 6v14M9 22V16h4v6" />
      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    </svg>
  ),
  Mileage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12H3M12 5V3M19 12h2M12 19v2" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 12l3-4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Range: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l14 0M15 8l4 4-4 4" />
    </svg>
  ),
};

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [menuOpen, setMenuOpen] = useState(false);

  const vehicle = getVehicleById(id);
  const similar = vehicle ? getSimilarVehicles(id) : [];

  const specs = vehicle
    ? [
        { label: "Engine",       value: vehicle.engine       },
        { label: "Horsepower",   value: vehicle.horsepower   },
        { label: "Top Speed",    value: vehicle.topSpeed     },
        { label: "0 – 100",      value: vehicle.acceleration },
        { label: "Transmission", value: vehicle.transmission },
        { label: "Fuel Type",    value: vehicle.fuelType     },
        { label: "Mileage",      value: vehicle.mileage      },
        ...(vehicle.range ? [{ label: "Range", value: vehicle.range }] : []),
      ]
    : [];

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
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="relative text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
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
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 text-zinc-400 hover:text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ── 404 state ── rendered inside the page so the navbar stays */}
        {!vehicle ? (
          <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 px-8 text-center">
            {/* Large faded 404 */}
            <span className="absolute text-[22rem] font-black leading-none select-none pointer-events-none text-white/[0.025]">
              404
            </span>

            <div className="relative flex flex-col items-center gap-6">
              {/* Animated diamond */}
              <span className="block w-12 h-12 border border-zinc-700 rotate-45" />

              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.6em] uppercase text-zinc-600">
                  Vehicle Not Found
                </p>
                <h1 className="text-3xl md:text-5xl font-thin tracking-tight uppercase leading-none text-white">
                  This vehicle is no longer<br />available
                </h1>
              </div>

              <p className="text-[13px] leading-[2] text-zinc-600 max-w-sm">
                The listing you are looking for may have been sold or removed.
                Browse our current collection to find your next extraordinary vehicle.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <Link
                  href="/inventory"
                  className="btn-fill relative px-10 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="relative z-10 transition-colors duration-200">
                    Browse Inventory
                  </span>
                </Link>
                <a
                  href="/#contact"
                  className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300"
                >
                  Contact Us →
                </a>
              </div>
            </div>
          </div>
        ) : (

          /* ── Full vehicle page ── */
          <>
            {/* ── Hero ── */}
            <div className="relative pt-[73px] overflow-hidden">
              <div className="relative min-h-[65vh] flex flex-col justify-end overflow-hidden">
                <div className="absolute inset-0">
                  {vehicle.image.url ? (
                    <>
                      <img
                        src={vehicle.image.url}
                        alt={`${vehicle.brand} ${vehicle.name}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse 70% 80% at 60% 50%, ${vehicle.image.glow}, transparent)` }}
                      />
                      <div
                        className="absolute w-[700px] h-[700px] border border-white/[0.025] left-1/2 top-1/2"
                        style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
                      />
                      <div
                        className="absolute w-[400px] h-[400px] border border-white/[0.03] left-1/2 top-1/2"
                        style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
                      />
                      <span
                        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-[20rem] font-black leading-none select-none pointer-events-none hidden lg:block"
                        style={{ color: `${vehicle.image.accent}08` }}
                      >
                        {vehicle.id}
                      </span>
                    </>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
                </div>

                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: vehicle.image.line }}
                />

                {/* Breadcrumb */}
                <div className="relative px-8 md:px-16 mb-auto pt-12">
                  <div className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-zinc-600">
                    <Link href="/inventory" className="hover:text-zinc-400 transition-colors duration-200">Inventory</Link>
                    <span>/</span>
                    <span>{vehicle.brand}</span>
                    <span>/</span>
                    <span style={{ color: vehicle.image.accent }}>{vehicle.name}</span>
                  </div>
                </div>

                {/* Hero content */}
                <div className="relative px-8 md:px-16 pb-12 md:pb-16">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-[9px] tracking-[0.45em] uppercase px-3 py-1.5 border border-white/[0.1] bg-black/60 backdrop-blur-sm"
                      style={{ color: vehicle.image.accent }}
                    >
                      {vehicle.badge}
                    </span>
                    <span className="text-[9px] tracking-[0.4em] uppercase px-3 py-1.5 border border-white/[0.08] bg-black/60 backdrop-blur-sm text-zinc-500">
                      {vehicle.year}
                    </span>
                  </div>
                  <p
                    className="text-[11px] tracking-[0.5em] uppercase font-semibold mb-2"
                    style={{ color: vehicle.image.accent }}
                  >
                    {vehicle.brand}
                  </p>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight leading-none uppercase mb-6">
                    {vehicle.name}
                  </h1>
                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">From</span>
                      <p className="text-2xl md:text-3xl font-thin tracking-wide text-white mt-0.5">{vehicle.price}</p>
                    </div>
                    <div className="w-px h-10 bg-zinc-800" />
                    <div>
                      <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">Odometer</span>
                      <p className="text-lg font-thin tracking-wide text-zinc-300 mt-0.5">{vehicle.mileage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key specs strip */}
              <div className="border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-900">
                {[
                  { label: "Horsepower",   value: vehicle.horsepower   },
                  { label: "Top Speed",    value: vehicle.topSpeed     },
                  { label: "0 – 100 km/h", value: vehicle.acceleration },
                  { label: vehicle.range ? "Range" : "Fuel Type", value: vehicle.range ?? vehicle.fuelType },
                ].map(({ label, value }) => (
                  <div key={label} className="group px-6 py-6 md:px-10 md:py-8 flex flex-col gap-1.5 hover:bg-white/[0.025] transition-colors duration-500 cursor-default">
                    <span className="text-2xl md:text-3xl font-thin tabular-nums leading-none text-white">{value}</span>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Main content ── */}
            <div className="relative px-8 md:px-16 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

              {/* Left: Specs + Features + Description */}
              <div className="lg:col-span-2 flex flex-col gap-14">

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600">Details</p>
                    <div className="flex-1 h-px bg-zinc-900" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specs.map(({ label, value }) => (
                      <div
                        key={label}
                        className="group flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] px-5 py-4 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-9 h-9 border border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-white group-hover:border-white/[0.2] transition-all duration-300 shrink-0">
                          {SPEC_ICONS[label] ?? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="w-4 h-4">
                              <circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" />
                            </svg>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">{label}</span>
                          <span className="text-[13px] tracking-wide text-zinc-200 group-hover:text-white transition-colors duration-300 truncate">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600">Features</p>
                    <div className="flex-1 h-px bg-zinc-900" />
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {vehicle.features.map((feat) => (
                      <span
                        key={feat}
                        className="text-[10px] tracking-[0.25em] uppercase px-4 py-2.5 border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.18] transition-all duration-300 cursor-default"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600">About This Vehicle</p>
                    <div className="flex-1 h-px bg-zinc-900" />
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="mt-2 w-px self-stretch bg-gradient-to-b from-zinc-600 via-zinc-800 to-transparent shrink-0" />
                    <p className="text-[14px] leading-[2.05] text-zinc-500">{vehicle.description}</p>
                  </div>
                </div>
              </div>

              {/* Right: sticky sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-28 flex flex-col gap-5">

                  <div className="bg-white/[0.03] border border-white/[0.07] p-7 flex flex-col gap-5">
                    <div>
                      <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">Asking Price</span>
                      <p className="text-4xl font-thin tracking-tight text-white mt-1.5">{vehicle.price}</p>
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Year",     value: vehicle.year.toString() },
                        { label: "Mileage",  value: vehicle.mileage         },
                        { label: "Category", value: vehicle.badge           },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-700">{label}</span>
                          <span className="text-[12px] tracking-wide text-zinc-400">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex flex-col gap-3">
                      <button className="btn-fill relative w-full py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500">
                        <span className="relative z-10 transition-colors duration-200">Book a Test Drive</span>
                      </button>
                      <a
                        href="/#contact"
                        className="block w-full py-4 border border-white/[0.12] text-[10px] tracking-[0.45em] uppercase text-center text-zinc-400 hover:text-white hover:border-white/[0.3] transition-all duration-500"
                      >
                        Contact Dealer
                      </a>
                    </div>
                  </div>

                  <div
                    className="border border-white/[0.07] p-6 flex flex-col gap-3"
                    style={{ background: `linear-gradient(135deg, ${vehicle.image.glow}, transparent)` }}
                  >
                    <span
                      className="text-[9px] tracking-[0.5em] uppercase font-semibold"
                      style={{ color: vehicle.image.accent }}
                    >
                      {vehicle.brand}
                    </span>
                    <p className="text-[11px] leading-[1.9] text-zinc-500">
                      Certified, inspected, and delivered with Makeen Motors' white-glove guarantee.
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="block w-[8px] h-[8px] border rotate-45 shrink-0" style={{ borderColor: vehicle.image.accent }} />
                      <span className="text-[9px] tracking-[0.4em] uppercase" style={{ color: vehicle.image.accent }}>
                        Makeen Certified
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/inventory"
                    className="group flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-600 hover:text-white transition-colors duration-300 py-2"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
                    Back to Inventory
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Similar Vehicles ── */}
            {similar.length > 0 && (
              <section className="border-t border-zinc-900 px-8 md:px-16 py-16 md:py-20">
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">You May Also Like</p>
                    <h2 className="text-3xl md:text-5xl font-thin tracking-tight uppercase leading-none">Similar Vehicles</h2>
                  </div>
                  <Link
                    href="/inventory"
                    className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group mb-1"
                  >
                    View All
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  {similar.map((v) => (
                    <Link
                      key={v.id}
                      href={`/cars/${v.id}`}
                      className="group flex flex-col bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {v.image.url ? (
                          <>
                            <img src={v.image.url} alt={`${v.brand} ${v.name}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          </>
                        ) : (
                          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 65% at 50% 115%, ${v.image.glow}, transparent)` }} />
                            <div className="absolute w-36 h-36 border border-white/[0.035] left-1/2 top-1/2" style={{ transform: "translate(-50%,-50%) rotate(45deg)" }} />
                            <span className="absolute right-3 bottom-1 text-[5rem] font-black leading-none select-none pointer-events-none" style={{ color: `${v.image.accent}0d` }}>{v.id}</span>
                          </div>
                        )}
                        <div className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ background: v.image.line }} />
                        <div className="absolute top-3 left-3">
                          <span className="text-[8px] tracking-[0.35em] uppercase px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/[0.1]" style={{ color: v.image.accent }}>{v.badge}</span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 p-5 gap-3">
                        <span className="text-[9px] tracking-[0.5em] uppercase font-semibold" style={{ color: v.image.accent }}>{v.brand}</span>
                        <h3 className="text-xl font-thin tracking-wide text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300">{v.name}</h3>
                        <div className="h-px bg-white/[0.06]" />
                        <div className="flex items-end justify-between">
                          <p className="text-base font-light text-white">{v.price}</p>
                          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 group-hover:text-zinc-300 transition-colors duration-300">View →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── Footer ── */}
            <footer className="border-t border-zinc-900 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="block w-[10px] h-[10px] border border-white/40 rotate-45 shrink-0 transition-all duration-500 group-hover:rotate-[135deg]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">Makeen Motors</span>
              </Link>
              <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">© 2024 Makeen Motors LLC · All rights reserved</span>
            </footer>
          </>
        )}

      </div>
    </>
  );
}
