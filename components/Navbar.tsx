"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Standard nav items ────────────────────────────────────────

const NAV_TOP = [
  { label: "Home",      href: "/"          },
  { label: "Inventory", href: "/inventory" },
];

const NAV_BOT = [
  { label: "About",   href: "/#about"   },
  { label: "Contact", href: "/#contact" },
];

// ── "Sell Your Vehicle" grouped section ───────────────────────

const SELL_LINKS = [
  { label: "Sell ", href: "/sell-car" },
];

// ── Shared link class ─────────────────────────────────────────

const linkCls = (open: boolean, delay: number) =>
  `py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 text-zinc-400 hover:text-white transition-all duration-300 ${
    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  }`;

// ── Component ─────────────────────────────────────────────────

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden fixed inset-x-0 top-0 z-50">

      {/* ── Bar ── */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-black/70 backdrop-blur-xl border-b border-[#D4AF37]/20"
        style={{ boxShadow: "0 1px 0 rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.03)" }}
      >
        <Link href="/" className="group">
          <Image
            src="/images/logo/makeen%20logo.PNG"
            alt="Makeen Motors"
            width={180}
            height={46}
            priority
            className="h-11 w-auto transition-all duration-400 group-hover:opacity-90"
            style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,0.25)) drop-shadow(0 0 24px rgba(255,255,255,0.08))" }}
          />
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
        >
          <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-200 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* ── Drawer ── */}
      <div
        className={`overflow-hidden transition-all duration-500 bg-black/92 backdrop-blur-xl border-b border-[#D4AF37]/15 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-0">

          {/* Home · Inventory */}
          {NAV_TOP.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 55}ms` : "0ms" }}
              className={linkCls(open, i * 55)}
            >
              {label}
            </Link>
          ))}

          {/* ── SELL YOUR VEHICLE section ── */}

          {/* Section heading */}
          <div
            className={`flex items-center gap-3 pt-4 pb-2 transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: open ? "110ms" : "0ms" }}
          >
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, rgba(212,175,55,0.35), transparent)" }}
            />
            <span className="text-[7px] tracking-[0.65em] uppercase text-[#D4AF37]/55 shrink-0">
              Sell 
            </span>
            <div className="w-4 h-px" style={{ background: "rgba(212,175,55,0.15)" }} />
          </div>

          {/* Sell Your Vehicle · What Is My Vehicle Worth? */}
          {SELL_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${(i + 3) * 55}ms` : "0ms" }}
              className={`py-3.5 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] text-zinc-400 hover:text-[#D4AF37] transition-all duration-300 flex items-center gap-3 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span
                className="shrink-0 w-px h-3.5 transition-all duration-300 group-hover:h-5"
                style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.5), rgba(212,175,55,0.1))" }}
              />
              {label}
            </Link>
          ))}

          {/* ── / end section ── */}

          {/* About · Contact */}
          {NAV_BOT.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${(i + 5) * 55}ms` : "0ms" }}
              className={linkCls(open, (i + 5) * 55)}
            >
              {label}
            </Link>
          ))}

          {/* Book a Test Drive */}
          <Link
            href="/book-test-drive"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? "385ms" : "0ms" }}
            className={`mt-4 mb-2 text-center py-3 border border-white/30 text-[10px] tracking-[0.35em] uppercase text-zinc-300 hover:bg-white hover:text-black transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            Book a Test Drive
          </Link>
        </nav>
      </div>
    </header>
  );
}
