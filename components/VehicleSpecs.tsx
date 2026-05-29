"use client";

import { motion } from "framer-motion";

interface Spec {
  label: string;
  value: string;
}

interface VehicleSpecsProps {
  specs: Spec[];
  features: string[];
  description: string;
  accent: string;
  glow: string;
  horsepower: string;
  topSpeed: string;
  acceleration: string;
  fuelOrRange: string;
  fuelOrRangeLabel: string;
}

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-60px" };

const SPEC_ICONS: Record<string, React.ReactNode> = {
  Engine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <path d="M6 7V5M10 7V5M14 7V5M18 7V5M6 17v2M10 17v2M14 17v2M18 17v2" />
    </svg>
  ),
  Horsepower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
    </svg>
  ),
  "Top Speed": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2C6.5 2 2 6.5 2 12"/><path d="M12 2C17.5 2 22 6.5 22 12"/>
      <path d="M12 12L16 7"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  "0 – 100": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>
    </svg>
  ),
  Transmission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/>
      <path d="M6 7v3M18 7v3M6 10C6 14 12 17 12 17M18 10C18 14 12 17 12 17"/>
    </svg>
  ),
  "Fuel Type": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M3 22V8l7-6 7 6v14M9 22V16h4v6"/>
      <path d="M17 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>
    </svg>
  ),
  Mileage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12H3M12 5V3M19 12h2M12 19v2"/>
      <circle cx="12" cy="12" r="7"/>
      <path d="M12 12l3-4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Range: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l14 0M15 8l4 4-4 4"/>
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>
  </svg>
);

export default function VehicleSpecs({
  specs, features, description, accent, glow,
  horsepower, topSpeed, acceleration, fuelOrRange, fuelOrRangeLabel,
}: VehicleSpecsProps) {

  const KEY_STATS = [
    { label: "Horsepower",   value: horsepower,   unit: "" },
    { label: "Top Speed",    value: topSpeed,      unit: "" },
    { label: "0 – 100 km/h", value: acceleration,  unit: "" },
    { label: fuelOrRangeLabel, value: fuelOrRange, unit: "" },
  ];

  return (
    <div className="flex flex-col gap-16">

      {/* ── Key performance metrics ── */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {KEY_STATS.map(({ label, value }) => (
          <div
            key={label}
            className="group relative bg-black px-6 py-8 flex flex-col gap-2 hover:bg-white/[0.025] transition-colors duration-500 overflow-hidden cursor-default"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 80% 80% at 50% 100%, ${glow}, transparent)` }}
            />
            {/* Hover top line */}
            <div
              className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
            />

            <span className="relative text-[clamp(1.75rem,3.5vw,2.75rem)] font-thin tabular-nums leading-none text-white">
              {value}
            </span>
            <span className="relative text-[9px] tracking-[0.45em] uppercase text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Full specifications ── */}
      <div>
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[9px] tracking-[0.6em] uppercase" style={{ color: accent }}>
            Specifications
          </p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {specs.map(({ label, value }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.055)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
              transition={{ duration: 0.25 }}
              className="group flex items-center gap-4 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] px-5 py-4 cursor-default"
            >
              {/* Icon box — glassmorphism */}
              <div
                className="flex items-center justify-center w-10 h-10 shrink-0 border bg-white/[0.03] backdrop-blur-sm text-zinc-500 group-hover:text-white transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {SPEC_ICONS[label] ?? FALLBACK_ICON}
              </div>

              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">{label}</span>
                <span className="text-[13px] tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300 leading-snug">
                  {value}
                </span>
              </div>

              {/* Hover accent tick */}
              <div
                className="w-px h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
                style={{ background: `linear-gradient(to bottom, ${accent}60, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Features ── */}
      <div>
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[9px] tracking-[0.6em] uppercase" style={{ color: accent }}>Features</p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2.5"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {features.map((feat) => (
            <motion.span
              key={feat}
              variants={{
                hidden:   { opacity: 0, scale: 0.92 },
                visible:  { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
              }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#fff",
              }}
              transition={{ duration: 0.2 }}
              className="text-[9px] tracking-[0.3em] uppercase px-4 py-2.5 border border-white/[0.08] text-zinc-500 cursor-default backdrop-blur-sm bg-white/[0.02]"
            >
              {feat}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ── Description ── */}
      <div>
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-[9px] tracking-[0.6em] uppercase" style={{ color: accent }}>About This Vehicle</p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </motion.div>

        <motion.div
          className="flex items-start gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div
            className="mt-2 w-px self-stretch shrink-0"
            style={{ background: `linear-gradient(to bottom, ${accent}60, rgba(255,255,255,0.05), transparent)` }}
          />
          <p className="text-[13px] md:text-[14px] leading-[2.1] text-zinc-500">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
