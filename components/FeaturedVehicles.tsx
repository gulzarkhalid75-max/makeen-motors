"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    label: "All",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "SUV",
    icon: (
      <svg viewBox="0 0 36 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-[18px]">
        <path d="M2 14h32M2 14V10l3-7h24l3 7v4" />
        <circle cx="9" cy="14" r="2" fill="currentColor" opacity="0.45" stroke="none" />
        <circle cx="27" cy="14" r="2" fill="currentColor" opacity="0.45" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Sedan",
    icon: (
      <svg viewBox="0 0 36 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-4">
        <path d="M2 12h32M3 12l2-4 6-5h12l6 5 2 4" />
        <circle cx="10" cy="12" r="2" fill="currentColor" opacity="0.45" stroke="none" />
        <circle cx="26" cy="12" r="2" fill="currentColor" opacity="0.45" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Coupe",
    icon: (
      <svg viewBox="0 0 36 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-[14px]">
        <path d="M2 11h32M2 11l2-3 4-5 5-1h10l4 1 4 5 2 3" />
        <circle cx="10" cy="11" r="2" fill="currentColor" opacity="0.45" stroke="none" />
        <circle cx="26" cy="11" r="2" fill="currentColor" opacity="0.45" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Supercar",
    icon: (
      <svg viewBox="0 0 36 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-3">
        <path d="M2 9h32M2 9l2-2 3-5 5-1h10l3 1 3 5 2 2" />
        <circle cx="10" cy="9" r="1.5" fill="currentColor" opacity="0.45" stroke="none" />
        <circle cx="26" cy="9" r="1.5" fill="currentColor" opacity="0.45" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Electric",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
      </svg>
    ),
  },
];

const VEHICLES = [
  {
    id: "07",
    brand: "Manhart",
    model: "BMW XM MHXM 900",
    tagline: "900 HP · Hybrid PHEV",
    price: "$265,000",
    image: "/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif",
    accent: "#C9A356",
    glow: "rgba(201,163,86,0.2)",
    line: "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    types: ["SUV"],
  },
  {
    id: "04",
    brand: "BMW",
    model: "M5 CS",
    tagline: "627 HP · V8 Twin-Turbo",
    price: "$145,000",
    image: "/images/cars/b3d6c5e5-2248-4deb-8306-da702b05214b.avif",
    accent: "#C9A356",
    glow: "rgba(201,163,86,0.18)",
    line: "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    types: ["Sedan"],
  },
  {
    id: "01",
    brand: "BMW",
    model: "M4 Competition",
    tagline: "503 HP · S58 Twin-Turbo",
    price: "$98,500",
    image: "/images/cars/116592.jpg",
    accent: "#4B9CC2",
    glow: "rgba(75,156,194,0.22)",
    line: "linear-gradient(90deg,transparent,rgba(75,156,194,0.8),transparent)",
    types: ["Coupe"],
  },
  {
    id: "02",
    brand: "Manhart",
    model: "BMW M3 MH800",
    tagline: "800 HP · Stage 3 Tune",
    price: "$165,000",
    image: "/images/cars/f1925874eaec605ae9de08581c70f34c.jpg",
    accent: "#B89A3E",
    glow: "rgba(184,154,62,0.2)",
    line: "linear-gradient(90deg,transparent,rgba(184,154,62,0.75),transparent)",
    types: ["Sedan", "Coupe"],
  },
  {
    id: "05",
    brand: "BMW",
    model: "i7 M70 xDrive",
    tagline: "651 HP · Pure Electric",
    price: "$195,000",
    image: "/images/cars/c8badee3-074e-42a9-9561-991ee1fab459.avif",
    accent: "#8A8F95",
    glow: "rgba(138,143,149,0.18)",
    line: "linear-gradient(90deg,transparent,rgba(138,143,149,0.6),transparent)",
    types: ["Electric", "Sedan"],
  },
];

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, amount: 0.05 };

const CARD = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

export default function FeaturedVehicles() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? VEHICLES
    : VEHICLES.filter((v) => v.types.includes(activeCategory));

  return (
    <section id="featured" className="relative px-8 md:px-16 py-24 md:py-32">

      {/* Subtle gold top glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_30%_at_50%_0%,rgba(201,163,86,0.04),transparent)]" />

      {/* Header */}
      <motion.div
        className="flex items-end justify-between mb-10 md:mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div>
          <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-700 mb-3">
            The Collection
          </p>
          <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
            Featured Models
          </h2>
        </div>
        <Link
          href="/inventory"
          className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group mb-1"
        >
          View All 12
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>

      {/* ── Vehicle Categories ── */}
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
      >
        <div className="flex gap-3 overflow-x-auto pb-2 scroll-hide snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`group relative flex flex-col items-center gap-3 shrink-0 snap-start px-5 py-4 border transition-all duration-300 min-w-[80px] ${
                activeCategory === cat.label
                  ? "border-[#C9A356]/50 bg-[#C9A356]/[0.06] text-[#C9A356]"
                  : "border-white/[0.06] bg-white/[0.02] text-zinc-600 hover:border-white/[0.12] hover:text-zinc-300 hover:bg-white/[0.04]"
              }`}
            >
              {activeCategory === cat.label && (
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/60 to-transparent" />
              )}
              <span className={`transition-colors duration-300 ${activeCategory === cat.label ? "text-[#C9A356]" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                {cat.icon}
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase whitespace-nowrap">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards — horizontal scroll on mobile, grid on desktop */}
      <motion.div
        key={activeCategory}
        className="flex gap-4 overflow-x-auto pb-4 scroll-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 md:overflow-visible md:gap-6 md:pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        {filtered.map((v) => (
          <motion.div
            key={v.id}
            variants={CARD}
            whileHover={{
              y: -10,
              boxShadow: `0 30px 70px ${v.glow}, 0 6px 24px rgba(0,0,0,0.5)`,
              borderColor: "rgba(255,255,255,0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="shrink-0 w-[76vw] max-w-[300px] snap-center md:w-auto md:max-w-none bg-white/[0.03] border border-white/[0.07] overflow-hidden"
          >
            <Link href={`/cars/${v.id}`} className="group block">

              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={v.image}
                  alt={`${v.brand} ${v.model}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Cinematic dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                {/* Brand glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse 80% 55% at 50% 110%, ${v.glow}, transparent)` }}
                />
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: v.line }}
                />
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_60%_35%_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />
              </div>

              {/* Body */}
              <div className="p-5 md:p-6 flex flex-col gap-3">
                <span
                  className="text-[8px] tracking-[0.55em] uppercase font-semibold"
                  style={{ color: v.accent }}
                >
                  {v.brand}
                </span>

                <h3 className="text-[15px] md:text-[16px] font-thin tracking-wide text-white leading-snug group-hover:text-zinc-100 transition-colors duration-300">
                  {v.model}
                </h3>

                <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">
                  {v.tagline}
                </p>

                <div className="h-px bg-white/[0.06] my-1" />

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[7px] tracking-[0.45em] uppercase text-zinc-700">From</span>
                    <p className="text-sm font-light tracking-wide text-white mt-0.5">{v.price}</p>
                  </div>
                  <span
                    className="text-[9px] tracking-[0.4em] uppercase transition-all duration-300 group-hover:translate-x-0.5"
                    style={{ color: v.accent }}
                  >
                    View →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile view-all */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link
          href="/inventory"
          className="flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group"
        >
          View All Models
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
