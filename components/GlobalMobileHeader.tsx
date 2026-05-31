"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";

// ── Types ─────────────────────────────────────────────────────

type PanelId = "nav" | "notifications" | "favorites";

// ── Data ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",    href: "/"          },
  { label: "Cars",    href: "/inventory" },
  { label: "Sell",    href: "/sell-car"  },
  { label: "About",   href: "/#about"   },
  { label: "Contact", href: "/#contact" },
];

const SPRING = "cubic-bezier(0.22,0.68,0,1.2)";
const BAR_TOP = 56; // h-14 in px

// ── SVG Icons ─────────────────────────────────────────────────

function BurgerLines() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-[18px] h-[18px]">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-[18px] h-[18px]">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function BellIcon({ cls = "w-[18px] h-[18px]" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function StarIcon({ cls = "w-[18px] h-[18px]" }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ── Gold ring illustration ────────────────────────────────────

function GoldRings({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <div className="absolute inset-0    rounded-full" style={{ border: "1px solid rgba(201,163,86,0.12)" }} />
      <div className="absolute inset-[18px] rounded-full" style={{ border: "1px solid rgba(201,163,86,0.07)" }} />
      <div className="absolute inset-[36px] rounded-full" style={{ border: "1px solid rgba(201,163,86,0.04)" }} />
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,163,86,0.045), transparent 65%)" }} />
      <div className="w-12 h-12 border border-[#C9A356]/20 flex items-center justify-center" style={{ background: "rgba(201,163,86,0.03)" }}>
        {children}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function GlobalMobileHeader() {
  const [open, setOpen] = useState<PanelId | null>(null);
  const { user, signOut } = useAuth();
  const isAuthed = !!user;

  const close       = () => setOpen(null);
  const handleLeft  = () => setOpen(p => (p ? null : "nav"));
  const togglePanel = (id: "notifications" | "favorites") =>
    setOpen(p => (p === id ? null : id));

  const handleSignOut = async () => {
    await signOut();
    setOpen(null);
  };

  const slideStyle = (id: PanelId, dir: "left" | "right") => ({
    top:       BAR_TOP,
    transform: open === id
      ? "translateX(0)"
      : dir === "left" ? "translateX(-100%)" : "translateX(100%)",
    transition: `transform 0.48s ${SPRING}`,
  });

  return (
    <>
      {/* ════════════════════════════════════════════════════ */}
      {/* TOP BAR  [X/☰]  ·  [LOGO]  ·  [🔔] [★]            */}
      {/* ════════════════════════════════════════════════════ */}
      <header className="md:hidden fixed inset-x-0 top-0 z-[60] h-14 flex items-center px-3 bg-black/95 backdrop-blur-xl border-b border-white/[0.07]">

        {/* Left — animated hamburger ↔ X */}
        <button
          aria-label={open ? "Close" : "Menu"}
          onClick={handleLeft}
          className="relative w-10 h-10 shrink-0 flex items-center justify-center text-zinc-300 hover:text-white transition-colors duration-200"
        >
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              opacity:   open ? 0 : 1,
              transform: open ? "rotate(-45deg) scale(0.55)" : "rotate(0deg) scale(1)",
            }}
          >
            <BurgerLines />
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              opacity:   open ? 1 : 0,
              transform: open ? "rotate(0deg) scale(1)" : "rotate(45deg) scale(0.55)",
            }}
          >
            <XMark />
          </span>
        </button>

        {/* Center — logo (absolutely centred so icons don't push it) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" onClick={close}>
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={140}
              height={35}
              priority
              className="h-7 w-auto"
            />
          </Link>
        </div>

        {/* Right — bell + star */}
        <div className="ml-auto flex items-center gap-0.5 shrink-0">
          <button
            aria-label="Notifications"
            onClick={() => togglePanel("notifications")}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              open === "notifications" ? "text-[#C9A356]" : "text-zinc-500 hover:text-white"
            }`}
          >
            <BellIcon />
          </button>
          <button
            aria-label="Wishlist"
            onClick={() => togglePanel("favorites")}
            className={`w-10 h-10 flex items-center justify-center transition-colors duration-200 ${
              open === "favorites" ? "text-[#C9A356]" : "text-zinc-500 hover:text-white"
            }`}
          >
            <StarIcon />
          </button>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        aria-hidden
        className="md:hidden fixed inset-x-0 bottom-0 z-[58]"
        style={{
          top:                  BAR_TOP,
          background:           "rgba(0,0,0,0.68)",
          backdropFilter:       "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity:              open ? 1 : 0,
          pointerEvents:        open ? "auto" : "none",
          transition:           "opacity 0.35s ease",
        }}
        onClick={close}
      />

      {/* ════════════════════════════════════════════════════ */}
      {/* NAV DRAWER — slides from left                       */}
      {/* ════════════════════════════════════════════════════ */}
      <aside
        className="md:hidden fixed left-0 bottom-0 z-[59] w-[min(288px,85vw)] bg-[#050505] border-r border-white/[0.07] flex flex-col overflow-hidden"
        style={slideStyle("nav", "left")}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/35 to-transparent" />

        {/* Links */}
        <nav className="flex flex-col px-6 pt-8 pb-4 flex-1 overflow-y-auto">
          <p className="text-[7px] tracking-[0.7em] uppercase text-zinc-700 mb-7">Navigation</p>
          {NAV_LINKS.map(({ label, href }, i) => (
            <div
              key={label}
              style={{
                opacity:               open === "nav" ? 1 : 0,
                transform:             open === "nav" ? "translateX(0)" : "translateX(-14px)",
                transitionProperty:    "opacity, transform",
                transitionDuration:    "0.38s",
                transitionTimingFunction: "ease",
                transitionDelay:       open === "nav" ? `${i * 48}ms` : "0ms",
              }}
            >
              <Link
                href={href}
                onClick={close}
                className="flex items-center justify-between py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.05] last:border-0 text-zinc-400 hover:text-white transition-colors duration-300 group"
              >
                {label}
                <span className="text-zinc-800 group-hover:text-zinc-400 transition-colors duration-300">→</span>
              </Link>
            </div>
          ))}
          {/* ── Account ── */}
          <div className="pt-4 mt-4 border-t border-white/[0.05]">
            <p className="text-[7px] tracking-[0.7em] uppercase text-zinc-700 mb-3">Account</p>

            {isAuthed ? (
              <>
                <div
                  style={{
                    opacity:               open === "nav" ? 1 : 0,
                    transitionProperty:    "opacity",
                    transitionDuration:    "0.38s",
                    transitionDelay:       open === "nav" ? `${NAV_LINKS.length * 48 + 40}ms` : "0ms",
                  }}
                  className="py-3.5 text-[10px] tracking-[0.4em] uppercase text-[#C9A356] border-b border-white/[0.05]"
                >
                  Signed In ✓
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  style={{
                    opacity:               open === "nav" ? 1 : 0,
                    transform:             open === "nav" ? "translateX(0)" : "translateX(-14px)",
                    transitionProperty:    "opacity, transform",
                    transitionDuration:    "0.38s",
                    transitionDelay:       open === "nav" ? `${NAV_LINKS.length * 48 + 88}ms` : "0ms",
                  }}
                  className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group"
                >
                  Sign Out
                  <span className="text-zinc-800 group-hover:text-zinc-400 transition-colors duration-300">→</span>
                </button>
              </>
            ) : (
              ([
                { label: "Sign In",        href: "/sign-in"  },
                { label: "Create Account", href: "/register" },
              ] as const).map(({ label, href }, i) => (
                <div
                  key={label}
                  style={{
                    opacity:                  open === "nav" ? 1 : 0,
                    transform:                open === "nav" ? "translateX(0)" : "translateX(-14px)",
                    transitionProperty:       "opacity, transform",
                    transitionDuration:       "0.38s",
                    transitionDelay:          open === "nav" ? `${(NAV_LINKS.length + i) * 48 + 40}ms` : "0ms",
                  }}
                >
                  <Link
                    href={href}
                    onClick={close}
                    className="w-full flex items-center justify-between py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.05] last:border-0 text-zinc-400 hover:text-white transition-colors duration-300 group"
                  >
                    {label}
                    <span className="text-zinc-800 group-hover:text-zinc-400 transition-colors duration-300">→</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </nav>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-white/[0.05]">
          <Link
            href="/inventory"
            onClick={close}
            className="group relative flex items-center justify-center w-full py-3.5 border border-white/25 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
          >
            <span
              className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              style={{ transitionTimingFunction: SPRING }}
              aria-hidden
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">Browse Collection</span>
          </Link>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════ */}
      {/* NOTIFICATIONS PANEL — slides from right             */}
      {/* ════════════════════════════════════════════════════ */}
      <aside
        className="md:hidden fixed right-0 bottom-0 z-[59] w-full sm:w-96 bg-[#050505] border-l border-white/[0.07] flex flex-col"
        style={slideStyle("notifications", "right")}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/35 to-transparent" />

        {/* Panel header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5">
            <BellIcon cls="w-3.5 h-3.5 text-[#C9A356]/55" />
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-300">Personal Updates</p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-white transition-colors duration-200"
          >
            <XMark />
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center flex-1 gap-10 px-8 pb-10">
          <GoldRings>
            <BellIcon cls="w-5 h-5 text-[#C9A356]/35" />
          </GoldRings>

          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">No Notifications</p>
            <p className="text-[12px] leading-[2.1] text-zinc-600 max-w-[220px]">
              As soon as new results matching your recent searches become available, they will appear here.
            </p>
          </div>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════ */}
      {/* FAVORITES PANEL — slides from right                 */}
      {/* ════════════════════════════════════════════════════ */}
      <aside
        className="md:hidden fixed right-0 bottom-0 z-[59] w-full sm:w-96 bg-[#050505] border-l border-white/[0.07] flex flex-col"
        style={slideStyle("favorites", "right")}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/35 to-transparent" />

        {/* Panel header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5">
            <StarIcon cls="w-3.5 h-3.5 text-[#C9A356]/55" />
            <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-300">Wishlist</p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-white transition-colors duration-200"
          >
            <XMark />
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-col items-center justify-center flex-1 gap-10 px-8 pb-10">
          <GoldRings>
            <StarIcon cls="w-5 h-5 text-[#C9A356]/35" />
          </GoldRings>

          <div className="flex flex-col items-center gap-7 text-center">
            <div className="flex flex-col gap-2.5">
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">Wishlist Empty</p>
              <p className="text-[12px] leading-[2.1] text-zinc-600 max-w-[220px]">
                Save vehicles you like and compare them later.
              </p>
            </div>

            <Link
              href="/inventory"
              onClick={close}
              className="group relative flex items-center gap-2 px-8 py-3.5 border border-[#C9A356]/35 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-[#C9A356]/60 transition-colors duration-500"
            >
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ background: "rgba(201,163,86,0.07)", transitionTimingFunction: SPRING }}
                aria-hidden
              />
              <span className="relative z-10 text-[#C9A356]">Browse Inventory</span>
              <span className="relative z-10 text-[#C9A356] inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </aside>

    </>
  );
}
