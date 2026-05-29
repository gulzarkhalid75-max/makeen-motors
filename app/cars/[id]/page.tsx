"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getVehicleById, getSimilarVehicles } from "@/app/lib/vehicles";
import VehicleDetails from "@/components/VehicleDetails";

const NAV_LINKS = [
  { label: "Home",    href: "/"          },
  { label: "Cars",    href: "/inventory" },
  { label: "About",   href: "/#about"    },
  { label: "Contact", href: "/#contact"  },
];

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  const vehicle = getVehicleById(id);
  const similar  = vehicle ? getSimilarVehicles(id) : [];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const waText = vehicle
    ? encodeURIComponent(
        `Hello, I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.name} (${vehicle.price}). Could you share more details?`
      )
    : "";
  const waUrl = `https://wa.me/97145550199?text=${waText}`;

  return (
    <>
      <style>{`
        /* ── Subtle grid ── */
        .bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
        /* ── Scrollbar hide ── */
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Fixed global background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-[0.022]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.72))]" />
        </div>

        {/* ── Scroll-aware navbar ── */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.07]"
              : "bg-transparent border-b border-transparent"
          }`}
        >
          <div className="flex items-center justify-between px-6 md:px-14 py-5">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={160}
                height={40}
                priority
                className="h-8 md:h-9 w-auto transition-opacity duration-300 group-hover:opacity-70"
              />
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

            {/* Mobile menu toggle */}
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

          {/* Mobile menu drawer */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/95 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
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

        {/* ── 404 ── */}
        {!vehicle ? (
          <div className="relative flex flex-col items-center justify-center min-h-screen gap-8 px-8 text-center">
            <span className="absolute text-[22rem] font-black leading-none select-none pointer-events-none text-white/[0.025]">
              404
            </span>
            <div className="relative flex flex-col items-center gap-6">
              <span className="block w-12 h-12 border border-zinc-700 rotate-45" />
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.6em] uppercase text-zinc-600">Vehicle Not Found</p>
                <h1 className="text-3xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                  This vehicle is no longer<br />available
                </h1>
              </div>
              <p className="text-[13px] leading-[2] text-zinc-600 max-w-sm">
                The listing you are looking for may have been sold or removed.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <Link
                  href="/inventory"
                  className="relative overflow-hidden flex items-center justify-center px-10 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase group hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-200">Browse Inventory</span>
                </Link>
                <a href="/#contact" className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300">
                  Contact Us →
                </a>
              </div>
            </div>
          </div>
        ) : (
          <VehicleDetails vehicle={vehicle} similar={similar} waUrl={waUrl} />
        )}

        {/* ── Footer ── */}
        {vehicle && (
          <footer className="relative border-t border-white/[0.05] px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 lg:pb-6 pb-28">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={120}
                height={30}
                className="h-5 w-auto opacity-35 transition-opacity duration-300 group-hover:opacity-65"
              />
            </Link>
            <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-800">
              © 2024 Makeen Motors LLC · All rights reserved
            </span>
          </footer>
        )}
      </div>
    </>
  );
}
