"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/app/lib/vehicles";
import VehicleGallery from "@/components/VehicleGallery";

// ── Feature auto-grouping ─────────────────────────────────────

function groupFeatures(features: string[]) {
  const fl = (s: string) => s.toLowerCase();
  const matched = new Set<string>();

  const safetyKw  = ["brake", "airbag", "safety", "night vision", "parking", "collision", "blind spot", "lane", "ride control", "anti-roll", "ceramic", "brembo", "abs", "stability"];
  const comfortKw = ["leather", "seat", "heat", "ventilat", "climate", "lounge", "massage", "ambient", "sound", "audio", "dolby", "bowers", "naim", "theatre", "soft-close", "panoramic", "rotating", "comfort drive", "executive", "hide", "glass canopy", "airline"];
  const techKw    = ["key", "carplay", "android", "software", "infotainment", "communication", "gaming", "display", "digital", "camera", "radar", "over-the-air", "adas", "cockpit", "screen", "800v", "drive pro", "laser", "headlight", "charging"];

  const pick = (kw: string[]) =>
    features.filter(f => {
      if (matched.has(f)) return false;
      if (kw.some(k => fl(f).includes(k))) { matched.add(f); return true; }
      return false;
    });

  const safety     = pick(safetyKw);
  const comfort    = pick(comfortKw);
  const technology = pick(techKw);
  const performance = features.filter(f => !matched.has(f));

  return { safety, comfort, technology, performance };
}

// ── Inline SVG icons ──────────────────────────────────────────

const BoltIcon      = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M11 2L4 11h5.5L9 18l7-9h-5.5L11 2z" />
  </svg>
);
const GaugeIcon     = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <path d="M3 14a7 7 0 0 1 14 0" /><path d="M10 14 7.5 9" /><circle cx="10" cy="14" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const TimerIcon     = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <circle cx="10" cy="11" r="7" /><path d="M10 7v4l2.5 1.5" /><path d="M7.5 2.5h5M10 2.5V5" />
  </svg>
);
const FuelIcon      = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M4 17V5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v12" /><path d="M4 17h7" /><path d="M13 7h1a2 2 0 0 1 2 2v3a1 1 0 0 0 2 0V6l-2-2" />
  </svg>
);
const GearIcon      = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <circle cx="10" cy="10" r="2.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M3.6 3.6l1.4 1.4M15 15l1.4 1.4M3.6 16.4l1.4-1.4M15 5l1.4-1.4" />
  </svg>
);
const DriveIcon     = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <circle cx="10" cy="10" r="7" /><circle cx="10" cy="10" r="2.5" /><path d="M10 3v1.5M10 15.5V17M3 10h1.5M15.5 10H17" />
  </svg>
);
const CalendarIcon  = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <rect x="2" y="4" width="16" height="14" rx="2" /><path d="M2 9h16M6 2v3M14 2v3" />
  </svg>
);
const OdoIcon       = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <path d="M3 15a7 7 0 0 1 14 0" /><path d="M10 15l-2.5-4" /><circle cx="10" cy="15" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const PersonIcon    = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={cls}>
    <circle cx="10" cy="6" r="3.5" /><path d="M3 18c0-3.3 3.1-6 7-6s7 2.7 7 6" />
  </svg>
);
const StarIcon      = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={cls}>
    <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.3l-4.8 2.6.9-5.4L2.2 7.7l5.4-.8L10 2z" />
  </svg>
);
const ShieldIcon    = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" className={cls}>
    <path d="M8 1.5L2 4.5v5c0 3 2.5 5 6 6.5 3.5-1.5 6-3.5 6-6.5v-5L8 1.5z" />
  </svg>
);
const SofaIcon      = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M1 9a2 2 0 0 1 4 0v1H1V9z" /><path d="M11 9a2 2 0 0 1 4 0v1h-4V9z" />
    <path d="M5 10h6V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3z" /><path d="M1 10h14v2H1z" />
  </svg>
);
const ChipIcon      = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className={cls}>
    <rect x="4" y="4" width="8" height="8" rx="1" /><path d="M6 4V2M10 4V2M6 14v-2M10 14v-2M4 6H2M4 10H2M14 6h-2M14 10h-2" />
  </svg>
);
const TachIcon      = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className={cls}>
    <path d="M2 12a6 6 0 0 1 12 0" /><path d="M8 12 5.5 8" /><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const PinIcon       = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);
const PhoneIcon     = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M4 3h3.5l1.5 4-2 1.5a10 10 0 0 0 4.5 4.5L13 11l4 1.5v3.5a2 2 0 0 1-2 2A16 16 0 0 1 2 5a2 2 0 0 1 2-2" />
  </svg>
);
const WaIcon        = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d="M10 2C5.6 2 2 5.6 2 10c0 1.5.4 2.9 1.1 4.2L2 18l3.9-1C7.2 17.6 8.6 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
    <path d="M7.5 8.5c.3 1.8 1.8 3.2 3.5 3.5" />
  </svg>
);
const BookIcon      = ({ cls = "w-5 h-5" }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <rect x="3" y="3" width="14" height="15" rx="2" /><path d="M3 8h14M7 2v3M13 2v3" />
  </svg>
);

// ── Shared sub-components ─────────────────────────────────────

function SectionLabel({ tag, title, accent }: { tag: string; title: string; accent?: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-center gap-2.5 mb-2">
        <span
          className="block w-1.5 h-1.5 rotate-45 shrink-0 border"
          style={{ borderColor: accent ? `${accent}55` : "rgba(255,255,255,0.2)" }}
        />
        <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600">{tag}</p>
      </div>
      <h3 className="text-2xl md:text-3xl font-thin tracking-tight uppercase leading-none text-white">
        {title}
      </h3>
    </div>
  );
}

// ── Animation ─────────────────────────────────────────────────

const EASE     = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-60px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const ITEM = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } },
};

// ── Main component ────────────────────────────────────────────

interface Props {
  vehicle: Vehicle;
  similar: Vehicle[];
  waUrl: string;
}

export default function VehicleDetails({ vehicle: v, similar, waUrl }: Props) {
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const handler = () => setCtaVisible(window.scrollY > 520);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const { safety, comfort, technology, performance } = groupFeatures(v.features);

  const PERF_CARDS = [
    { label: "Horsepower",   value: v.horsepower,   icon: <BoltIcon />   },
    { label: "Top Speed",    value: v.topSpeed,     icon: <GaugeIcon />  },
    { label: "0 – 100 km/h", value: v.acceleration, icon: <TimerIcon />  },
    { label: v.range ? "Range" : "Fuel Type", value: v.range ?? v.fuelType, icon: <FuelIcon /> },
    { label: "Transmission", value: v.transmission, icon: <GearIcon />   },
    { label: "Drivetrain",   value: v.drivetrain,   icon: <DriveIcon />  },
  ];

  const HISTORY_CARDS = [
    { label: "Model Year",    value: v.year.toString(), icon: <CalendarIcon /> },
    { label: "Total Mileage", value: v.mileage,          icon: <OdoIcon />      },
    { label: "Ownership",     value: v.ownership,        icon: <PersonIcon />   },
    { label: "Condition",     value: v.condition,        icon: <StarIcon />     },
  ];

  const TECH_SPECS = [
    { label: "Engine",       value: v.engine       },
    { label: "Horsepower",   value: v.horsepower   },
    { label: "Top Speed",    value: v.topSpeed     },
    { label: "0 – 100 km/h", value: v.acceleration },
    { label: "Transmission", value: v.transmission },
    { label: "Drivetrain",   value: v.drivetrain   },
    { label: "Fuel Type",    value: v.fuelType     },
    ...(v.range ? [{ label: "Range",    value: v.range         }] : []),
    { label: "Year",         value: v.year.toString()         },
    { label: "Mileage",      value: v.mileage                 },
    { label: "Condition",    value: v.condition               },
    { label: "Location",     value: v.location                },
  ];

  const FEAT_GROUPS = [
    { label: "Safety",      icon: <ShieldIcon />, items: safety      },
    { label: "Comfort",     icon: <SofaIcon />,   items: comfort     },
    { label: "Technology",  icon: <ChipIcon />,   items: technology  },
    { label: "Performance", icon: <TachIcon />,   items: performance },
  ].filter(g => g.items.length > 0);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* 1. GALLERY HERO                                        */}
      {/* ═══════════════════════════════════════════════════════ */}
      <VehicleGallery
        images={v.image.url ? [v.image.url] : []}
        vehicleId={v.id}
        brand={v.brand}
        name={v.name}
        badge={v.badge}
        year={v.year}
        price={v.price}
        mileage={v.mileage}
        accent={v.image.accent}
        glow={v.image.glow}
        line={v.image.line}
      />

      {/* ── Quick overview strip ── */}
      <div className="border-b border-white/[0.06] bg-black/60 backdrop-blur-sm">
        <div className="px-8 md:px-16 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { label: "Year",         value: v.year.toString() },
            { label: "Mileage",      value: v.mileage         },
            { label: "Fuel",         value: v.fuelType        },
            { label: "Transmission", value: v.transmission.split(" ").slice(0, 2).join(" ") },
            { label: "Drivetrain",   value: v.drivetrain.split("(")[0].trim() },
            { label: "Location",     value: v.location        },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-3">
              {i > 0 && <span className="text-zinc-800 select-none hidden sm:block">·</span>}
              <div className="flex flex-col gap-0.5">
                <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">{label}</span>
                <span className="text-[12px] tracking-wide text-zinc-300">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT + STICKY SIDEBAR                         */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative px-8 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        {/* ── LEFT: Content ── */}
        <div className="lg:col-span-2 flex flex-col gap-20">

          {/* ════════════════════════════════════════ */}
          {/* 2. KEY SPECIFICATIONS                   */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="Performance" title="Key Specifications" accent={v.image.accent} />

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {PERF_CARDS.map(({ label, value, icon }) => (
                <motion.div
                  key={label}
                  variants={ITEM}
                  whileHover={{
                    borderColor: `${v.image.accent}35`,
                    backgroundColor: `${v.image.glow}`,
                    y: -4,
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="relative flex flex-col gap-4 p-5 md:p-6 border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden group"
                >
                  {/* Top accent on hover */}
                  <div
                    className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: v.image.line }}
                  />
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                    {icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] md:text-[16px] font-thin tracking-wide text-white leading-snug">
                      {value}
                    </p>
                    <p className="text-[8px] tracking-[0.45em] uppercase text-zinc-600">
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* ════════════════════════════════════════ */}
          {/* 3. VEHICLE HISTORY                      */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="Provenance" title="Vehicle History" accent={v.image.accent} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {HISTORY_CARDS.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="group relative flex flex-col items-center gap-3 p-6 border border-white/[0.06] bg-white/[0.02] text-center overflow-hidden"
                >
                  <div
                    className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-80 transition-opacity duration-400"
                    style={{ background: v.image.line }}
                  />
                  <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                    {icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] md:text-[14px] font-thin tracking-wide text-white leading-snug">
                      {value}
                    </p>
                    <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════════════════════════════════════════ */}
          {/* 4. TECHNICAL SPECIFICATIONS             */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="Engineering" title="Technical Specifications" accent={v.image.accent} />

            <div className="border border-white/[0.07] overflow-hidden">
              {/* Column headers */}
              <div className="grid grid-cols-2 border-b border-white/[0.06] bg-white/[0.02] px-5 py-2.5">
                <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">Specification</span>
                <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">Value</span>
              </div>
              {TECH_SPECS.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`group grid grid-cols-2 px-5 py-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors duration-200 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}`}
                >
                  <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-600 group-hover:text-zinc-500 transition-colors duration-200 self-center">
                    {label}
                  </span>
                  <span className="text-[12px] tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-200 self-center">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════════════════════════════════════════ */}
          {/* 5. FEATURES & EQUIPMENT                 */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="Equipment" title="Features & Equipment" accent={v.image.accent} />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {FEAT_GROUPS.map(({ label, icon, items }) => (
                <div
                  key={label}
                  className="group flex flex-col gap-4 p-5 border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                      {icon}
                    </span>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 font-medium">
                      {label}
                    </span>
                  </div>
                  {/* Items */}
                  <ul className="flex flex-col gap-2.5">
                    {items.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 shrink-0 w-1 h-1 rotate-45"
                          style={{ background: `rgba(${v.image.accent.replace("#", "").match(/.{2}/g)?.map(h => parseInt(h, 16)).join(",") ?? "201,163,86"},0.5)` }}
                        />
                        <span className="text-[11px] tracking-[0.05em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 leading-relaxed">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ════════════════════════════════════════ */}
          {/* 6. INTERIOR & EXTERIOR                  */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="Aesthetics" title="Interior & Exterior" accent={v.image.accent} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Exterior card */}
              <div
                className="group relative flex flex-col gap-5 p-7 border border-white/[0.07] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: v.image.line }}
                />
                <span className="text-[7px] tracking-[0.65em] uppercase text-zinc-700">Exterior</span>
                <div className="flex items-center gap-4">
                  {/* Color dot */}
                  <div
                    className="shrink-0 w-10 h-10 border border-white/[0.12] rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] font-thin tracking-wide text-white leading-snug">
                      {v.exterior}
                    </h4>
                    <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Paint Finish</p>
                  </div>
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div className="flex flex-col gap-2">
                  {["Premium Metallic Finish", "Factory Applied", "Dealer Maintained"].map(detail => (
                    <div key={detail} className="flex items-center gap-2.5">
                      <span className="w-1 h-px bg-zinc-700 shrink-0" />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interior card */}
              <div
                className="group relative flex flex-col gap-5 p-7 border border-white/[0.07] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: v.image.line }}
                />
                <span className="text-[7px] tracking-[0.65em] uppercase text-zinc-700">Interior</span>
                <div className="flex items-center gap-4">
                  <div
                    className="shrink-0 w-10 h-10 border border-white/[0.12] rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(60,40,20,0.6), rgba(20,20,20,0.8))",
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[14px] font-thin tracking-wide text-white leading-snug">
                      {v.interior}
                    </h4>
                    <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Upholstery</p>
                  </div>
                </div>
                <div className="h-px bg-white/[0.05]" />
                <div className="flex flex-col gap-2">
                  {["Premium Upholstery", "Immaculate Condition", "Odour Free"].map(detail => (
                    <div key={detail} className="flex items-center gap-2.5">
                      <span className="w-1 h-px bg-zinc-700 shrink-0" />
                      <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ════════════════════════════════════════ */}
          {/* 7. DESCRIPTION                          */}
          {/* ════════════════════════════════════════ */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <SectionLabel tag="About This Vehicle" title={`${v.brand} ${v.name}`} accent={v.image.accent} />

            <div className="flex items-start gap-6">
              <div
                className="mt-1 w-px self-stretch bg-gradient-to-b from-zinc-600 via-zinc-800 to-transparent shrink-0"
              />
              <p className="text-[13px] md:text-[14px] leading-[2.1] text-zinc-500">
                {v.description}
              </p>
            </div>
          </motion.section>
        </div>

        {/* ── RIGHT: Sticky sidebar ── */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 flex flex-col gap-5">

            {/* Price + CTA card */}
            <motion.div
              className="relative flex flex-col gap-6 p-7 border border-white/[0.09] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.045)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              {/* Accent top line */}
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: v.image.line }} />

              {/* Price */}
              <div className="pt-1">
                <span className="text-[7px] tracking-[0.65em] uppercase text-zinc-700">Asking Price</span>
                <p
                  className="text-[2.4rem] font-thin tracking-tight text-white mt-1 leading-none"
                  style={{ textShadow: `0 0 40px ${v.image.glow}` }}
                >
                  {v.price}
                </p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              {/* Meta */}
              <div className="flex flex-col gap-3.5">
                {[
                  { label: "Year",     value: v.year.toString() },
                  { label: "Mileage",  value: v.mileage         },
                  { label: "Category", value: v.badge           },
                  { label: "Fuel",     value: v.fuelType        },
                  { label: "Location", value: v.location, icon: <PinIcon /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">{label}</span>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      {icon}
                      <span className="text-[11px] tracking-wide">{value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/[0.06]" />

              {/* CTAs */}
              <div className="flex flex-col gap-3">

                {/* Book Test Drive */}
                <Link
                  href="/book-test-drive"
                  className="group relative flex items-center justify-center gap-2.5 w-full py-4 border border-white/50 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <BookIcon cls="w-3.5 h-3.5 relative z-10 text-white group-hover:text-black transition-colors duration-200" />
                  <span className="relative z-10 text-white group-hover:text-black transition-colors duration-200">Book a Test Drive</span>
                </Link>

                {/* WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2.5 w-full py-4 border text-[9px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-400 hover:bg-[#25D366]/[0.08]"
                  style={{ borderColor: "rgba(37,211,102,0.22)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(37,211,102,0.22)")}
                >
                  <WaIcon cls="w-3.5 h-3.5 text-[#25D366]" />
                  <span style={{ color: "#25D366" }}>WhatsApp</span>
                  <span className="text-zinc-500">Us</span>
                </a>

                {/* Contact Dealer */}
                <a
                  href="/#contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/[0.08] text-[8px] tracking-[0.45em] uppercase text-zinc-600 hover:text-white hover:border-white/[0.2] transition-all duration-400"
                >
                  <PhoneIcon cls="w-3 h-3" />
                  Contact Dealer
                </a>
              </div>
            </motion.div>

            {/* Makeen Certified */}
            <motion.div
              className="relative flex flex-col gap-4 p-6 border border-white/[0.07] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${v.image.glow}, rgba(255,255,255,0.02))`,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9 border shrink-0"
                  style={{ borderColor: `${v.image.accent}40` }}
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" style={{ color: v.image.accent }}>
                    <path d="M10 2L3 5.5V10c0 4 3.5 7 7 8.5C17 17 17 14 17 10V5.5L10 2Z" />
                    <polyline points="6.5,10.5 8.5,12.5 13.5,8" />
                  </svg>
                </div>
                <div>
                  <span className="text-[8px] tracking-[0.5em] uppercase font-medium" style={{ color: v.image.accent }}>
                    Makeen Certified
                  </span>
                  <p className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 mt-0.5">{v.brand}</p>
                </div>
              </div>
              <p className="text-[10px] leading-[1.9] text-zinc-600">
                Passed a comprehensive 200-point inspection and backed by our white-glove delivery guarantee.
              </p>
              <div className="flex items-center gap-5">
                {["Inspected", "Certified", "Delivered"].map(lbl => (
                  <div key={lbl} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rotate-45" style={{ background: v.image.accent }} />
                    <span className="text-[7px] tracking-[0.4em] uppercase text-zinc-600">{lbl}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Back link */}
            <Link
              href="/inventory"
              className="group flex items-center gap-2 text-[8px] tracking-[0.45em] uppercase text-zinc-700 hover:text-white transition-colors duration-300 py-2"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
              Back to Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SIMILAR VEHICLES                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      {similar.length > 0 && (
        <section className="border-t border-white/[0.05] px-8 md:px-16 py-16 md:py-24">
          <motion.div
            className="flex items-end justify-between mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div>
              <p className="text-[8px] tracking-[0.6em] uppercase mb-3" style={{ color: v.image.accent }}>
                You May Also Like
              </p>
              <h2 className="text-3xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                Similar Vehicles
              </h2>
            </div>
            <Link
              href="/inventory"
              className="hidden md:flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group mb-1"
            >
              View All
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {similar.map((sv) => (
              <motion.div
                key={sv.id}
                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } }}
                whileHover={{ y: -10, boxShadow: `0 28px 60px ${sv.image.glow}` }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Link
                  href={`/cars/${sv.id}`}
                  className="group block border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] transition-colors duration-500 overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {sv.image.url ? (
                      <>
                        <Image
                          src={sv.image.url}
                          alt={`${sv.brand} ${sv.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${sv.image.glow}, transparent)` }}
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" style={{ background: `radial-gradient(ellipse 80% 65% at 50% 115%, ${sv.image.glow}, transparent)` }} />
                    )}
                    <div
                      className="absolute top-0 inset-x-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: sv.image.line }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[7px] tracking-[0.4em] uppercase px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/[0.1]" style={{ color: sv.image.accent }}>
                        {sv.badge}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col p-5 gap-3">
                    <span className="text-[7px] tracking-[0.5em] uppercase font-semibold" style={{ color: sv.image.accent }}>
                      {sv.brand}
                    </span>
                    <h3 className="text-xl font-thin tracking-wide text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300">
                      {sv.name}
                    </h3>
                    <div className="h-px bg-white/[0.06]" />
                    <div className="flex items-end justify-between">
                      <p className="text-base font-light text-white">{sv.price}</p>
                      <span className="text-[8px] tracking-[0.35em] uppercase group-hover:translate-x-0.5 transition-transform duration-300" style={{ color: sv.image.accent }}>
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* MOBILE FIXED BOTTOM CTA BAR                           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div
        className={`fixed bottom-0 inset-x-0 z-50 lg:hidden transition-transform duration-500 ${ctaVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        <div
          className="flex items-stretch border-t border-white/[0.1]"
          style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
        >
          {/* Call */}
          <a
            href="tel:+97145550199"
            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 border-r border-white/[0.07] text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
          >
            <PhoneIcon cls="w-4 h-4" />
            <span className="text-[7px] tracking-[0.45em] uppercase">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 border-r border-white/[0.07] hover:bg-[#25D366]/[0.06] transition-all duration-300"
          >
            <WaIcon cls="w-4 h-4 text-[#25D366]" />
            <span className="text-[7px] tracking-[0.45em] uppercase" style={{ color: "#25D366" }}>WhatsApp</span>
          </a>

          {/* Book Test Drive */}
          <Link
            href="/book-test-drive"
            className="flex-[1.4] flex flex-col items-center justify-center gap-1.5 py-4 hover:bg-white/[0.06] transition-all duration-300"
            style={{ borderLeft: `1px solid rgba(255,255,255,0.07)` }}
          >
            <BookIcon cls="w-4 h-4 text-white" />
            <span className="text-[7px] tracking-[0.4em] uppercase text-white">Book Drive</span>
          </Link>
        </div>
      </div>

      {/* Spacer so mobile content doesn't hide behind fixed bar */}
      <div className="h-24 lg:hidden" aria-hidden />
    </>
  );
}
