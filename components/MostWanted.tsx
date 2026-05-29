"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Icons ────────────────────────────────────────────────────────

const CalendarIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" className="w-3 h-3">
    <rect x="1" y="2" width="12" height="11" rx="1.5" />
    <path d="M1 5.5h12M4.5 1v2.5M9.5 1v2.5" />
  </svg>
);

const FuelIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <path d="M2 13V3.5A1.5 1.5 0 0 1 3.5 2h4A1.5 1.5 0 0 1 9 3.5V13" />
    <path d="M2 13h7M9 5h.5a2 2 0 0 1 2 2v2a1 1 0 0 0 2 0V5l-2-2" />
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" className="w-3 h-3">
    <circle cx="7" cy="7" r="2" />
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.9 2.9l1.4 1.4M9.7 9.7l1.4 1.4M2.9 11.1l1.4-1.4M9.7 4.3l1.4-1.4" />
  </svg>
);

const SpeedoIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" className="w-3 h-3">
    <path d="M1.5 10a5.5 5.5 0 0 1 11 0" />
    <path d="M7 10 5 7.5" />
    <circle cx="7" cy="10" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────

type Badge = "HOT" | "TRENDING" | "EXCLUSIVE";

const BADGE_CONFIG: Record<Badge, { label: string; cls: string }> = {
  HOT:       { label: "HOT",       cls: "border-[#C9A356]/55 bg-[#C9A356]/[0.12] text-[#C9A356]"      },
  TRENDING:  { label: "TRENDING",  cls: "border-white/20 bg-white/[0.07] text-white/75"                },
  EXCLUSIVE: { label: "EXCLUSIVE", cls: "border-zinc-600/40 bg-zinc-900/60 text-zinc-500"              },
};

const VEHICLES = [
  {
    id: "07",
    name: "Manhart BMW XM MHXM 900",
    price: "$265,000",
    year: 2024,
    mileage: "0 km",
    fuel: "Hybrid PHEV",
    transmission: "Automatic",
    badge: "HOT" as Badge,
    href: "/cars/07",
    image: "/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif",
    accentLine: "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    accentGlow: "rgba(201,163,86,0.18)",
  },
  {
    id: "04",
    name: "BMW M5 CS",
    price: "$145,000",
    year: 2023,
    mileage: "12,400 km",
    fuel: "V8 Twin-Turbo",
    transmission: "Automatic",
    badge: "TRENDING" as Badge,
    href: "/cars/04",
    image: "/images/cars/b3d6c5e5-2248-4deb-8306-da702b05214b.avif",
    accentLine: "linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)",
    accentGlow: "rgba(255,255,255,0.06)",
  },
  {
    id: "05",
    name: "BMW i7 M70 xDrive",
    price: "$195,000",
    year: 2024,
    mileage: "3,100 km",
    fuel: "Pure Electric",
    transmission: "Single-Speed",
    badge: "EXCLUSIVE" as Badge,
    href: "/cars/05",
    image: "/images/cars/c8badee3-074e-42a9-9561-991ee1fab459.avif",
    accentLine: "linear-gradient(90deg,transparent,rgba(138,143,149,0.55),transparent)",
    accentGlow: "rgba(138,143,149,0.14)",
  },
  {
    id: "bmw7",
    name: "BMW 7 Series Carbon",
    price: "$175,000",
    year: 2024,
    mileage: "8,200 km",
    fuel: "Inline-6 Petrol",
    transmission: "Automatic",
    badge: "EXCLUSIVE" as Badge,
    href: "/inventory",
    image: "/images/cars/facelift-bmw-7-series-carbon-tuning.webp",
    accentLine: "linear-gradient(90deg,transparent,rgba(201,163,86,0.55),transparent)",
    accentGlow: "rgba(201,163,86,0.14)",
  },
];

// ── Animation ────────────────────────────────────────────────────

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-60px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const CARD = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

// ── Component ────────────────────────────────────────────────────

export default function MostWanted() {
  return (
    <section className="relative px-8 md:px-16 py-24 md:py-32">

      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent 100%)" }}
      />

      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: "radial-gradient(ellipse 65% 45% at 50% 0%,rgba(201,163,86,0.03),transparent)" }}
      />

      {/* ── Header ── */}
      <motion.div
        className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-16 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={FADE_UP}
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-[8px] h-[8px] border border-[#C9A356]/50 rotate-45 shrink-0" />
            <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">Dubai's Finest</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
            Most Wanted
          </h2>
        </div>
        <div className="flex flex-col gap-2 md:items-end md:mb-1">
          <p className="text-[12px] leading-[1.9] text-zinc-500 max-w-xs md:text-right">
            The most viewed luxury vehicles<br />at MAKEEN MOTORS.
          </p>
          <Link
            href="/inventory"
            className="group flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-white transition-colors duration-300 w-fit"
          >
            Browse all vehicles
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        {VEHICLES.map((v) => {
          const badge = BADGE_CONFIG[v.badge];
          return (
            <motion.article
              key={v.id}
              variants={CARD}
              whileHover={{
                y: -10,
                boxShadow: `0 32px 72px rgba(0,0,0,0.65), 0 6px 24px ${v.accentGlow}`,
                borderColor: "rgba(255,255,255,0.14)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex flex-col border border-white/[0.07] bg-white/[0.025] overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 inset-x-0 h-px z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: v.accentLine }}
              />

              {/* ── Image ── */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={v.image}
                  alt={v.name}
                  fill
                  sizes="(max-width:640px) 100vw,(max-width:1280px) 50vw,25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* Bottom glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: `radial-gradient(ellipse 80% 50% at 50% 110%,${v.accentGlow},transparent)` }}
                  aria-hidden
                />

                {/* Badge */}
                <span className={`absolute top-3.5 right-3.5 z-10 px-2.5 py-1 text-[7px] tracking-[0.5em] uppercase border ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>

              {/* ── Body ── */}
              <div className="flex flex-col gap-4 p-5 md:p-6 flex-1">

                {/* Spec chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <CalendarIcon />, text: String(v.year) },
                    { icon: <FuelIcon />,    text: v.fuel          },
                    { icon: <GearIcon />,   text: v.transmission  },
                  ].map(({ icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 px-2.5 py-1 border border-white/[0.07] bg-white/[0.03] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                    >
                      {icon}
                      <span className="text-[8px] tracking-[0.25em] uppercase whitespace-nowrap">{text}</span>
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="text-[14px] md:text-[15px] font-thin tracking-wide text-white leading-snug group-hover:text-zinc-100 transition-colors duration-300">
                  {v.name}
                </h3>

                {/* Mileage */}
                <div className="flex items-center gap-1.5 text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                  <SpeedoIcon />
                  <span className="text-[9px] tracking-[0.3em] uppercase">{v.mileage}</span>
                </div>

                {/* Price */}
                <div>
                  <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">From</span>
                  <p className="text-xl font-thin tracking-wide text-white mt-0.5">{v.price}</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.06] group-hover:bg-white/[0.09] transition-colors duration-400" />

                {/* CTAs */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    href={v.href}
                    className="group/btn relative flex items-center justify-center gap-2 border border-white/[0.12] py-3 text-[8px] tracking-[0.45em] uppercase text-zinc-400 overflow-hidden transition-all duration-400 hover:border-white/25 hover:text-white"
                  >
                    <span
                      className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 bg-white/[0.04]"
                      style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }}
                      aria-hidden
                    />
                    <span className="relative z-10">View Details</span>
                    <span className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                  </Link>

                  <Link
                    href="/book-test-drive"
                    className="group/btn2 relative flex items-center justify-center gap-2 border border-[#C9A356]/30 py-3 text-[8px] tracking-[0.45em] uppercase text-[#C9A356]/70 overflow-hidden transition-all duration-400 hover:border-[#C9A356]/55 hover:text-[#C9A356]"
                  >
                    <span
                      className="absolute inset-0 translate-y-full group-hover/btn2:translate-y-0 transition-transform duration-500 bg-[#C9A356]/[0.07]"
                      style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }}
                      aria-hidden
                    />
                    <span className="relative z-10">Book Test Drive</span>
                  </Link>
                </div>
              </div>

              {/* Bottom-right corner accent */}
              <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/[0.06] group-hover:border-[#C9A356]/20 transition-colors duration-400" aria-hidden />
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
