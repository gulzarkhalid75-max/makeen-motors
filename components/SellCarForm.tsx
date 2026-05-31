"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { fetchProfile } from "@/lib/profile";
import { submitVehicleListing } from "@/lib/vehicle-submission";

// ── Constants ─────────────────────────────────────────────────

const EASE = [0.22, 0.68, 0, 1.2] as const;

const BRANDS = [
  "Mercedes-Benz", "BMW", "Audi", "Porsche", "Lamborghini", "Ferrari",
  "Aston Martin", "Bentley", "Rolls-Royce", "McLaren", "Bugatti",
  "Maserati", "Range Rover", "Lexus", "Other",
];
const FUEL_TYPES    = ["Petrol", "Diesel", "Hybrid", "Plug-in Hybrid", "Electric"];
const TRANSMISSIONS = ["Automatic", "Manual", "Semi-Automatic", "PDK / DCT"];
const COLORS        = [
  "White", "Black", "Silver", "Grey", "Blue", "Navy", "Red",
  "Green", "Yellow", "Orange", "Brown", "Gold", "Beige", "Other",
];
const CURRENT_YEAR  = new Date().getFullYear();

// ── Valuation ─────────────────────────────────────────────────

const BRAND_BASE: Record<string, number> = {
  "Ferrari": 280000, "Lamborghini": 250000, "Bugatti": 900000,
  "Rolls-Royce": 380000, "Bentley": 200000, "McLaren": 220000,
  "Porsche": 130000, "Aston Martin": 160000, "Mercedes-Benz": 90000,
  "BMW": 75000, "Audi": 65000, "Maserati": 90000,
  "Range Rover": 85000, "Lexus": 55000,
};

function estimateValue(brand: string, year: string, mileage: string) {
  const base = BRAND_BASE[brand] ?? 50000;
  const y = parseInt(year);
  const m = parseInt(mileage.replace(/\D/g, ""));
  if (!brand || isNaN(y) || isNaN(m) || y < 1990) return null;
  const age      = CURRENT_YEAR - y;
  const ageFac   = Math.max(0.32, 1 - age * 0.085);
  const kmFac    = Math.max(0.50, 1 - (m / 300_000) * 0.5);
  const est      = base * ageFac * kmFac;
  return {
    low:  Math.round(est * 0.88 / 500) * 500,
    high: Math.round(est * 1.12 / 500) * 500,
  };
}

const usd = (n: number) => "$" + n.toLocaleString("en-US");

// ── Steps ─────────────────────────────────────────────────────

const STEPS = [
  { label: "Vehicle",  desc: "Basic vehicle information" },
  { label: "Specs",    desc: "Technical specifications"  },
  { label: "Photos",   desc: "Upload vehicle images"     },
  { label: "Contact",  desc: "Your contact details"      },
];

// ── Form state ────────────────────────────────────────────────

interface FormState {
  brand: string; model: string; year: string; mileage: string;
  fuelType: string; transmission: string; horsepower: string; exteriorColor: string;
  condition: string;
  photos: File[];
  name: string; email: string; phone: string; notes: string;
}

const INIT: FormState = {
  brand: "", model: "", year: "", mileage: "",
  fuelType: "", transmission: "", horsepower: "", exteriorColor: "",
  condition: "",
  photos: [],
  name: "", email: "", phone: "", notes: "",
};

// ── Shared field styles ───────────────────────────────────────

const inputCls =
  "h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300";

const selectCls =
  inputCls + " appearance-none cursor-pointer pr-10";

// ── Inline SVG icons ──────────────────────────────────────────

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <polyline points="1.5,6.5 4.5,9.5 10.5,3" />
  </svg>
);
const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5 pointer-events-none">
    <path d="M3 5.5l5 5 5-5" />
  </svg>
);
const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5">
    <path d="M1 1l10 10M11 1L1 11" />
  </svg>
);
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3l-4.8 2.6.9-5.4L4.3 7.7l5.4-.8L12 2z" />
  </svg>
);

// ── Valuation Card ────────────────────────────────────────────

const VALUATION_STEPS = [
  { label: "Basics",  desc: "Brand, model & year"       },
  { label: "Details", desc: "Fuel, gearbox & condition" },
  { label: "Photos",  desc: "Upload vehicle photos"     },
];

const VALUATION_CONDITIONS = ["Excellent", "Good", "Fair", "Poor"] as const;
type Condition = (typeof VALUATION_CONDITIONS)[number];

const LISTING_CONDITIONS = ["Excellent", "Good", "Fair", "Poor"];

const CONDITION_META: Record<Condition, { factor: number; score: number; desc: string }> = {
  Excellent: { factor: 1.05, score: 9.5, desc: "Like new — no visible wear"     },
  Good:      { factor: 1.00, score: 8.0, desc: "Minor cosmetic imperfections"   },
  Fair:      { factor: 0.87, score: 6.5, desc: "Visible wear, fully functional" },
  Poor:      { factor: 0.73, score: 4.5, desc: "Significant wear or damage"     },
};

const DEMAND_SCORES: Record<string, number> = {
  "Ferrari": 9.8, "Lamborghini": 9.8, "Bugatti": 9.9,
  "Rolls-Royce": 9.7, "Bentley": 9.5, "McLaren": 9.4,
  "Aston Martin": 9.2, "Porsche": 9.4, "Mercedes-Benz": 9.1,
  "BMW": 9.0, "Audi": 8.7, "Range Rover": 8.9,
  "Maserati": 8.5, "Lexus": 8.2,
};

interface ValState {
  brand: string; model: string; year: string; mileage: string;
  fuelType: string; transmission: string; condition: string;
  photos: File[];
}

interface ValResult {
  low: number; high: number;
  demandScore: number; conditionScore: number; tradeIn: number;
}

const VAL_EMPTY: ValState = {
  brand: "", model: "", year: "", mileage: "",
  fuelType: "", transmission: "", condition: "",
  photos: [],
};

function computeVal(s: ValState): ValResult | null {
  const base = estimateValue(s.brand, s.year, s.mileage);
  if (!base) return null;
  const cm = CONDITION_META[s.condition as Condition] ?? CONDITION_META.Good;
  return {
    low:            Math.round(base.low  * cm.factor / 500) * 500,
    high:           Math.round(base.high * cm.factor / 500) * 500,
    demandScore:    DEMAND_SCORES[s.brand] ?? 7.5,
    conditionScore: cm.score,
    tradeIn:        Math.round(base.low  * cm.factor * 0.87 / 500) * 500,
  };
}

const ScoreBar = ({ label, score, delay = 0 }: { label: string; score: number; delay?: number }) => (
  <div className="flex flex-col gap-2.5">
    <div className="flex items-center justify-between">
      <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-500">{label}</span>
      <span className="text-sm font-thin tracking-tight text-white">
        {score.toFixed(1)}<span className="text-zinc-600 text-[9px]"> / 10</span>
      </span>
    </div>
    <div className="relative h-[2px] bg-white/[0.07] overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A356]/60 to-[#C9A356]"
        initial={{ width: "0%" }}
        animate={{ width: `${score * 10}%` }}
        transition={{ duration: 1.4, ease: [0.22, 0.68, 0, 1.2], delay }}
      />
    </div>
  </div>
);

export function VehicleValuationCard() {
  const [step,     setStep]     = useState(0);
  const [form,     setForm]     = useState<ValState>(VAL_EMPTY);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [result,   setResult]   = useState<ValResult | null>(null);
  const vFileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof ValState, v: string) =>
    setForm(p => ({ ...p, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return !!(form.brand && form.model && form.year && form.mileage);
    if (step === 1) return !!(form.fuelType && form.transmission && form.condition);
    return true;
  };

  const handleValFiles = (list: FileList | null) => {
    if (!list) return;
    const files = Array.from(list).slice(0, 10);
    setForm(p => ({ ...p, photos: files }));
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const removeValPhoto = (i: number) => {
    setForm(p => ({ ...p, photos: p.photos.filter((_, idx) => idx !== i) }));
    setPreviews(p => p.filter((_, idx) => idx !== i));
  };

  const handleGetValuation = () => {
    const r = computeVal(form);
    if (r) setResult(r);
  };

  const reset = () => { setStep(0); setForm(VAL_EMPTY); setPreviews([]); setResult(null); };

  /* ── Result view ─────────────────────────────────────────── */
  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative border border-[#C9A356]/25 overflow-hidden"
        style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356] to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,163,86,0.07), transparent)" }}
          aria-hidden
        />

        <div className="relative p-5 sm:p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center w-5 h-5 border border-[#C9A356]/60 bg-[#C9A356]/10 text-[#C9A356]">
                  <CheckIcon />
                </div>
                <span className="text-[8px] tracking-[0.6em] uppercase text-[#C9A356]/70">Valuation Complete</span>
              </div>
              <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Estimated Market Value</p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                className="text-2xl sm:text-4xl md:text-[3.25rem] font-thin tracking-tight text-white leading-none flex flex-wrap items-baseline gap-x-2"
              >
                <span>{usd(result.low)}</span>
                <span className="text-zinc-500 text-xl sm:text-3xl">—</span>
                <span>{usd(result.high)}</span>
              </motion.p>
            </div>
            <button
              onClick={reset}
              className="self-start shrink-0 text-[8px] tracking-[0.4em] uppercase text-zinc-600 hover:text-white transition-colors duration-300 mt-1"
            >
              ← Recalculate
            </button>
          </div>

          <div className="h-px bg-white/[0.06] mb-8" />

          {/* Score bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-8">
            <ScoreBar label="Market Demand Score"     score={result.demandScore}    delay={0.25} />
            <ScoreBar label="Vehicle Condition Score" score={result.conditionScore} delay={0.45} />
          </div>

          <div className="h-px bg-white/[0.06] mb-8" />

          {/* Trade-in */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">
            <div>
              <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-600 mb-1.5">Estimated Trade-In Value</p>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                className="text-xl md:text-3xl font-thin tracking-tight text-white"
              >
                {usd(result.tradeIn)}
              </motion.p>
            </div>
            <p className="text-[9px] leading-[1.8] text-zinc-700 max-w-[220px]">
              Typically 85–90% of market value. Final figure subject to physical inspection.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <a
              href="/#contact"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 border border-white/40 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
              <span className="relative z-10 group-hover:text-black transition-colors duration-200">Get Professional Appraisal</span>
            </a>
            <a
              href="#sell-form-anchor"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A356]/50 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-[#C9A356] transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-[#C9A356]/[0.08] translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
              <span className="relative z-10 text-[#C9A356]">Sell To Makeen Motors</span>
              <span className="relative z-10 text-[#C9A356] inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-700">
            Based on: {form.year} {form.brand} {form.model} · {parseInt(form.mileage || "0").toLocaleString()} km · {form.condition} Condition
          </p>
        </div>
      </motion.div>
    );
  }

  /* ── Step form ───────────────────────────────────────────── */
  return (
    <div
      className="relative border border-white/[0.09] overflow-hidden"
      style={{ background: "rgba(8,8,8,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent" />

      {/* Step indicator */}
      <div className="px-5 sm:px-7 pt-5 sm:pt-7">
        <div className="flex items-center gap-0 mb-6">
          {VALUATION_STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                className={`relative flex items-center justify-center w-7 h-7 border shrink-0 transition-all duration-400 ${
                  i < step
                    ? "border-[#C9A356]/60 bg-[#C9A356]/10 cursor-pointer"
                    : i === step
                    ? "border-white/50 bg-white/[0.06] cursor-default"
                    : "border-white/[0.1] cursor-default"
                }`}
              >
                {i < step ? (
                  <span className="text-[#C9A356]"><CheckIcon /></span>
                ) : (
                  <span className={`text-[8px] font-medium ${i === step ? "text-white" : "text-zinc-700"}`}>{i + 1}</span>
                )}
                {i === step && (
                  <span
                    className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.8),transparent)" }}
                  />
                )}
              </button>
              <span className={`hidden sm:block ml-2 mr-1 text-[8px] tracking-[0.4em] uppercase whitespace-nowrap transition-colors duration-300 ${
                i === step ? "text-white" : i < step ? "text-zinc-500" : "text-zinc-700"
              }`}>
                {s.label}
              </span>
              {i < VALUATION_STEPS.length - 1 && (
                <div
                  className="flex-1 mx-2 sm:mx-3 h-px"
                  style={{ background: i < step ? "rgba(201,163,86,0.4)" : "rgba(255,255,255,0.06)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step header */}
        <div className="pb-5 border-b border-white/[0.05]">
          <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-600 mb-1">Step {step + 1} of {VALUATION_STEPS.length}</p>
          <h3 className="text-xl font-thin tracking-tight uppercase text-white">{VALUATION_STEPS[step].label}</h3>
          <p className="text-[11px] text-zinc-600 mt-0.5">{VALUATION_STEPS[step].desc}</p>
        </div>
      </div>

      {/* Step content */}
      <div className="px-5 sm:px-7 py-5 sm:py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Step 1: Basics */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Brand *</label>
                  <div className="relative">
                    <select value={form.brand} onChange={e => set("brand", e.target.value)} className={selectCls}>
                      <option value="" disabled>Select brand</option>
                      {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"><ChevronDown /></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Model *</label>
                  <input
                    type="text" value={form.model}
                    onChange={e => set("model", e.target.value)}
                    placeholder="e.g. M5 CS, 911 Turbo S"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Year *</label>
                  <div className="relative">
                    <select value={form.year} onChange={e => set("year", e.target.value)} className={selectCls}>
                      <option value="" disabled>Select year</option>
                      {Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i).map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"><ChevronDown /></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Mileage (km) *</label>
                  <input
                    type="number" min="0" value={form.mileage}
                    onChange={e => set("mileage", e.target.value)}
                    placeholder="e.g. 15000"
                    className={inputCls}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Fuel Type *</label>
                  <div className="flex flex-wrap gap-2">
                    {FUEL_TYPES.map(f => (
                      <button key={f} type="button" onClick={() => set("fuelType", f)}
                        className={`px-4 py-2 border text-[9px] tracking-[0.3em] uppercase transition-all duration-250 ${
                          form.fuelType === f
                            ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                            : "border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                        }`}
                      >{f}</button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Transmission *</label>
                  <div className="flex flex-wrap gap-2">
                    {TRANSMISSIONS.map(t => (
                      <button key={t} type="button" onClick={() => set("transmission", t)}
                        className={`px-4 py-2 border text-[9px] tracking-[0.3em] uppercase transition-all duration-250 ${
                          form.transmission === t
                            ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                            : "border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Vehicle Condition *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {VALUATION_CONDITIONS.map(c => (
                      <button
                        key={c} type="button" onClick={() => set("condition", c)}
                        className={`relative flex flex-col gap-1.5 p-4 border text-left transition-all duration-250 ${
                          form.condition === c
                            ? "border-[#C9A356]/55 bg-[#C9A356]/[0.07]"
                            : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        {form.condition === c && (
                          <span className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/60 to-transparent" />
                        )}
                        <span className={`text-[10px] tracking-[0.3em] uppercase font-medium ${form.condition === c ? "text-[#C9A356]" : "text-zinc-400"}`}>
                          {c}
                        </span>
                        <span className="text-[8px] leading-[1.6] text-zinc-700">{CONDITION_META[c].desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div
                  className={`relative flex flex-col items-center justify-center gap-4 p-6 sm:p-10 border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    dragOver
                      ? "border-[#C9A356]/60 bg-[#C9A356]/[0.04]"
                      : "border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.02]"
                  }`}
                  onClick={() => vFileRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleValFiles(e.dataTransfer.files); }}
                >
                  <input
                    ref={vFileRef} type="file" accept="image/*" multiple className="hidden"
                    onChange={e => handleValFiles(e.target.files)}
                  />
                  <span className={`transition-colors duration-300 ${dragOver ? "text-[#C9A356]" : "text-zinc-600"}`}>
                    <UploadIcon />
                  </span>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-[12px] tracking-[0.15em] text-zinc-400">
                      <span className="text-white">Click to upload</span> or drag & drop
                    </p>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">JPG, PNG, WEBP · Max 10 photos</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Exterior all angles", "Interior & dashboard", "Engine bay", "Any damage or wear"].map(tip => (
                    <span key={tip} className="flex items-center gap-1.5 text-[8px] tracking-[0.3em] uppercase text-zinc-700">
                      <span className="w-1 h-1 bg-zinc-700 rotate-45 shrink-0" />{tip}
                    </span>
                  ))}
                </div>

                {previews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {previews.map((src, i) => (
                      <div key={i} className="group relative aspect-square overflow-hidden border border-white/[0.08] bg-white/[0.03]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); removeValPhoto(i); }}
                          className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 bg-black/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
                        >
                          <XIcon />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 text-[6px] tracking-[0.4em] uppercase bg-black/80 px-1.5 py-0.5 text-[#C9A356]">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-5 sm:px-7 pb-5 sm:pb-7 pt-2">
        <button
          type="button"
          onClick={() => setStep(s => s - 1)}
          className={`flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-white transition-colors duration-300 ${step === 0 ? "invisible" : ""}`}
        >
          <span>←</span> Previous
        </button>

        {step < VALUATION_STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => canAdvance() && setStep(s => s + 1)}
            className={`group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 border text-[9px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-400 ${
              canAdvance()
                ? "border-white/50 text-white hover:border-white cursor-pointer"
                : "border-white/[0.12] text-zinc-600 cursor-not-allowed"
            }`}
          >
            {canAdvance() && (
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
            )}
            <span className={`relative z-10 transition-colors duration-200 ${canAdvance() ? "group-hover:text-black" : ""}`}>Next Step</span>
            <span className={`relative z-10 inline-block transition-all duration-300 ${canAdvance() ? "group-hover:translate-x-1 group-hover:text-black" : ""}`}>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGetValuation}
            className="group relative flex items-center gap-2 px-8 py-3.5 border border-[#C9A356]/60 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-[#C9A356] transition-colors duration-500 cursor-pointer"
          >
            <span className="absolute inset-0 bg-[#C9A356]/[0.1] translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
            <span className="relative z-10 text-[#C9A356]">Get My Valuation</span>
            <span className="relative z-10 text-[#C9A356] inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

export default function SellCarForm() {
  const { user } = useAuth();
  const [step,      setStep]      = useState(0);
  const [form,      setForm]      = useState<FormState>(INIT);
  const [previews,  setPreviews]  = useState<string[]>([]);
  const [dragOver,  setDragOver]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const profile = await fetchProfile(supabase, user.id);
      if (cancelled) return;
      setForm(p => ({
        ...p,
        name:  p.name  || profile?.full_name || "",
        email: p.email || profile?.email     || user.email || "",
        phone: p.phone || profile?.phone     || "",
      }));
    })();
    return () => { cancelled = true; };
  }, [user]);

  const setField = (k: keyof FormState, v: string) =>
    setForm(p => ({ ...p, [k]: v }));

  const valuation = estimateValue(form.brand, form.year, form.mileage);

  const canNext = () => {
    if (step === 0) return !!(form.brand && form.model && form.year && form.mileage);
    if (step === 1) return !!(form.fuelType && form.transmission && form.exteriorColor && form.condition);
    if (step === 2) return true;
    if (step === 3) return !!(form.name && form.email && form.phone);
    return false;
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const files = Array.from(list).slice(0, 10);
    setForm(p => ({ ...p, photos: files }));
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const removePhoto = (i: number) => {
    const photos   = form.photos.filter((_, idx) => idx !== i);
    const prevUrls = previews.filter((_, idx) => idx !== i);
    setForm(p => ({ ...p, photos }));
    setPreviews(prevUrls);
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmitForm = async () => {
    if (!canNext() || isSaving) return;
    if (!user) {
      setSubmitError("You must be signed in to submit a listing.");
      return;
    }

    setIsSaving(true);
    setSubmitError("");

    const supabase = createClient();
    const { error } = await submitVehicleListing(supabase, user.id, {
      brand: form.brand,
      model: form.model,
      year: parseInt(form.year, 10),
      mileage: form.mileage,
      fuel_type: form.fuelType,
      transmission: form.transmission,
      horsepower: form.horsepower,
      exterior_color: form.exteriorColor,
      seller_name: form.name,
      email: form.email,
      phone: form.phone,
      condition: form.condition,
      images: form.photos,
    });

    setIsSaving(false);

    if (error) {
      setSubmitError(error);
      return;
    }

    setSubmitted(true);
  };

  // ── Submitted state ──────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative flex flex-col items-center gap-8 border border-white/[0.09] p-10 md:p-16 text-center overflow-hidden"
        style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/60 to-transparent" />

        <Image
          src="/images/logo/makeen logo.PNG"
          alt="Makeen Motors"
          width={140}
          height={35}
          className="h-8 w-auto opacity-60"
        />
        <div
          className="flex items-center justify-center w-12 h-12 border"
          style={{ borderColor: "rgba(201,163,86,0.35)" }}
        >
          <SparkleIcon />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356]/70">Submission Received</p>
          <h3 className="text-3xl md:text-4xl font-thin tracking-tight uppercase leading-none text-white">
            Your listing is under review.
          </h3>
          <p className="text-[13px] leading-[2] text-zinc-500 max-w-md mt-2">
            Your <span className="text-white">{form.year} {form.brand} {form.model}</span> listing has been submitted. Our team will review it and notify you once it is approved.
          </p>
        </div>

        {valuation && (
          <div
            className="w-full max-w-sm border border-[#C9A356]/20 p-6 flex flex-col gap-3"
            style={{ background: "rgba(201,163,86,0.04)" }}
          >
            <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-600">Preliminary Estimate</p>
            <p className="text-2xl font-thin tracking-tight text-white">
              {usd(valuation.low)} <span className="text-zinc-600">—</span> {usd(valuation.high)}
            </p>
            <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-700">
              Final offer subject to inspection
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/inventory"
            className="group relative flex items-center justify-center px-8 py-3.5 border border-white/50 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
          >
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
            <span className="relative z-10 group-hover:text-black transition-colors duration-200">Browse Inventory</span>
          </Link>
          <Link href="/" className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 hover:text-white transition-colors duration-300">
            Back to Home →
          </Link>
        </div>

        {/* Vehicles available for trade */}
        <div className="w-full border-t border-white/[0.06] pt-6 flex flex-col gap-4">
          <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">Vehicles Available for Trade</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif", name: "Manhart XM 900" },
              { src: "/images/cars/c8badee3-074e-42a9-9561-991ee1fab459.avif",         name: "BMW i7 M70"    },
              { src: "/images/cars/facelift-bmw-7-series-carbon-tuning.webp",           name: "BMW 7 Series"  },
            ].map(({ src, name }) => (
              <Link key={name} href="/inventory" className="group relative block aspect-[3/2] overflow-hidden border border-white/[0.07] hover:border-white/[0.16] transition-colors duration-300">
                <Image src={src} alt={name} fill sizes="(max-width:640px) 33vw,20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 text-[7px] tracking-[0.3em] uppercase text-zinc-500 group-hover:text-white transition-colors duration-300 truncate">
                  {name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Active form ──────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

      {/* ── Form column ── */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1 last:flex-none">
              {/* Circle */}
              <button
                onClick={() => i < step && setStep(i)}
                className={`relative flex items-center justify-center w-8 h-8 border shrink-0 transition-all duration-400 ${
                  i < step
                    ? "border-[#C9A356]/60 bg-[#C9A356]/10 cursor-pointer"
                    : i === step
                    ? "border-white/50 bg-white/[0.06] cursor-default"
                    : "border-white/[0.12] bg-transparent cursor-default"
                }`}
              >
                {i < step ? (
                  <span className="text-[#C9A356]"><CheckIcon /></span>
                ) : (
                  <span className={`text-[9px] tracking-[0.1em] font-medium ${i === step ? "text-white" : "text-zinc-600"}`}>
                    {i + 1}
                  </span>
                )}
                {i === step && (
                  <span
                    className="absolute top-0 inset-x-0 h-px"
                    style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.8),transparent)" }}
                  />
                )}
              </button>

              {/* Label — hidden on small screens */}
              <span className={`hidden sm:block ml-2.5 text-[8px] tracking-[0.4em] uppercase whitespace-nowrap transition-colors duration-300 ${i === step ? "text-white" : i < step ? "text-zinc-500" : "text-zinc-700"}`}>
                {s.label}
              </span>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-3 h-px" style={{
                  background: i < step
                    ? "rgba(201,163,86,0.4)"
                    : i === step
                    ? "linear-gradient(90deg,rgba(255,255,255,0.2),rgba(255,255,255,0.04))"
                    : "rgba(255,255,255,0.06)",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step card */}
        <div
          className="relative border border-white/[0.08] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

          {/* Step header */}
          <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-white/[0.05]">
            <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-600 mb-1">
              Step {step + 1} of {STEPS.length}
            </p>
            <h3 className="text-xl md:text-2xl font-thin tracking-tight uppercase text-white">
              {STEPS[step].label}
            </h3>
            <p className="text-[11px] tracking-wide text-zinc-600 mt-1">{STEPS[step].desc}</p>
          </div>

          {/* Step content */}
          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {/* ─── STEP 1: Vehicle ─── */}
                {step === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Brand *</label>
                      <div className="relative">
                        <select
                          value={form.brand}
                          onChange={e => setField("brand", e.target.value)}
                          className={selectCls}
                        >
                          <option value="" disabled>Select brand</option>
                          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
                          <ChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Model */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Model *</label>
                      <input
                        type="text"
                        value={form.model}
                        onChange={e => setField("model", e.target.value)}
                        placeholder="e.g. M5 CS, 911 Turbo S"
                        className={inputCls}
                      />
                    </div>

                    {/* Year */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Year *</label>
                      <div className="relative">
                        <select
                          value={form.year}
                          onChange={e => setField("year", e.target.value)}
                          className={selectCls}
                        >
                          <option value="" disabled>Select year</option>
                          {Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i).map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
                          <ChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Mileage */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Mileage (km) *</label>
                      <input
                        type="number"
                        min="0"
                        value={form.mileage}
                        onChange={e => setField("mileage", e.target.value)}
                        placeholder="e.g. 15000"
                        className={inputCls}
                      />
                    </div>
                  </div>
                )}

                {/* ─── STEP 2: Specs ─── */}
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Fuel Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Fuel Type *</label>
                      <div className="flex flex-wrap gap-2">
                        {FUEL_TYPES.map(f => (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setField("fuelType", f)}
                            className={`px-4 py-2 border text-[9px] tracking-[0.3em] uppercase transition-all duration-250 ${
                              form.fuelType === f
                                ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                                : "border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Transmission */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Transmission *</label>
                      <div className="flex flex-wrap gap-2">
                        {TRANSMISSIONS.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setField("transmission", t)}
                            className={`px-4 py-2 border text-[9px] tracking-[0.3em] uppercase transition-all duration-250 ${
                              form.transmission === t
                                ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                                : "border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Horsepower */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Horsepower</label>
                      <input
                        type="text"
                        value={form.horsepower}
                        onChange={e => setField("horsepower", e.target.value)}
                        placeholder="e.g. 503 hp"
                        className={inputCls}
                      />
                    </div>

                    {/* Exterior Color */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Exterior Color *</label>
                      <div className="relative">
                        <select
                          value={form.exteriorColor}
                          onChange={e => setField("exteriorColor", e.target.value)}
                          className={selectCls}
                        >
                          <option value="" disabled>Select color</option>
                          {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none">
                          <ChevronDown />
                        </div>
                      </div>
                    </div>

                    {/* Condition */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Condition *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {LISTING_CONDITIONS.map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setField("condition", c)}
                            className={`px-3 py-3 border text-[9px] tracking-[0.25em] uppercase transition-all duration-250 ${
                              form.condition === c
                                ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                                : "border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-300"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── STEP 3: Photos ─── */}
                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    {/* Drop zone */}
                    <div
                      className={`relative flex flex-col items-center justify-center gap-4 p-6 sm:p-10 border-2 border-dashed cursor-pointer transition-all duration-300 ${
                        dragOver
                          ? "border-[#C9A356]/60 bg-[#C9A356]/[0.04]"
                          : "border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.02]"
                      }`}
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={e => handleFiles(e.target.files)}
                      />
                      <span className={`transition-colors duration-300 ${dragOver ? "text-[#C9A356]" : "text-zinc-600"}`}>
                        <UploadIcon />
                      </span>
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-[12px] tracking-[0.15em] text-zinc-400">
                          <span className="text-white">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">
                          JPG, PNG, WEBP · Max 10 photos
                        </p>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="flex flex-wrap gap-3">
                      {["Exterior all angles", "Interior & dashboard", "Engine bay", "Any damage or wear"].map(tip => (
                        <span key={tip} className="flex items-center gap-1.5 text-[8px] tracking-[0.3em] uppercase text-zinc-700">
                          <span className="w-1 h-1 bg-zinc-700 rotate-45 shrink-0" />{tip}
                        </span>
                      ))}
                    </div>

                    {/* Preview grid */}
                    {previews.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {previews.map((src, i) => (
                          <div key={i} className="group relative aspect-square overflow-hidden border border-white/[0.08] bg-white/[0.03]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); removePhoto(i); }}
                              className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 bg-black/80 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
                            >
                              <XIcon />
                            </button>
                            {i === 0 && (
                              <span className="absolute bottom-1.5 left-1.5 text-[6px] tracking-[0.4em] uppercase bg-black/80 px-1.5 py-0.5 text-[#C9A356]">
                                Main
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ─── STEP 4: Contact ─── */}
                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setField("name", e.target.value)}
                        placeholder="Khalid Al Mansouri"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setField("email", e.target.value)}
                        placeholder="hello@example.com"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Phone Number *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setField("phone", e.target.value)}
                        placeholder="+971 50 000 0000"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Additional Notes</label>
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={e => setField("notes", e.target.value)}
                        placeholder="Any additional information about the vehicle's history, modifications, or condition…"
                        className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300 resize-none leading-relaxed"
                      />
                    </div>

                    {/* Summary preview */}
                    <div className="sm:col-span-2 border border-white/[0.06] bg-white/[0.02] p-4 flex flex-col gap-3">
                      <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">Submission Summary</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { label: "Vehicle",      value: form.brand ? `${form.year} ${form.brand} ${form.model}` : "—" },
                          { label: "Mileage",      value: form.mileage ? `${parseInt(form.mileage).toLocaleString()} km` : "—" },
                          { label: "Fuel",         value: form.fuelType || "—" },
                          { label: "Transmission", value: form.transmission || "—" },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">{label}</p>
                            <p className="text-[11px] tracking-wide text-zinc-300 mt-0.5 truncate">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-5 sm:px-7 pb-6 sm:pb-7 pt-2">
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className={`flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-white transition-colors duration-300 ${step === 0 ? "invisible" : ""}`}
            >
              <span>←</span> Previous
            </button>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => canNext() && setStep(s => s + 1)}
                className={`group relative flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 border text-[9px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-400 ${
                  canNext()
                    ? "border-white/50 text-white hover:border-white cursor-pointer"
                    : "border-white/[0.12] text-zinc-600 cursor-not-allowed"
                }`}
              >
                {canNext() && (
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${canNext() ? "group-hover:text-black" : ""}`}>
                  Next Step
                </span>
                <span className={`relative z-10 inline-block transition-all duration-300 ${canNext() ? "group-hover:translate-x-1 group-hover:text-black" : ""}`}>→</span>
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-[10px] text-red-400 max-w-xs text-right">{submitError}</p>
                )}
                <button
                  type="button"
                  onClick={() => handleSubmitForm()}
                  disabled={isSaving}
                  className={`group relative flex items-center gap-2 px-8 py-3.5 border text-[9px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-400 ${
                    canNext() && !isSaving
                      ? "border-[#C9A356]/60 text-[#C9A356] hover:border-[#C9A356] cursor-pointer"
                      : "border-white/[0.12] text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  {canNext() && !isSaving && (
                    <span className="absolute inset-0 bg-[#C9A356]/[0.12] translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  )}
                  <span className="relative z-10">
                    {isSaving ? "Submitting…" : "Submit Listing"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right: Valuation + tips ── */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-28 flex flex-col gap-5">

          {/* Valuation card */}
          <motion.div
            className="relative flex flex-col gap-5 border border-white/[0.09] overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent" />

            <div className="px-6 pt-6">
              <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600 mb-4">Live Estimate</p>

              {valuation ? (
                <motion.div
                  key={`${form.brand}-${form.year}-${form.mileage}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-1"
                >
                  <p className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">Estimated Market Value</p>
                  <p className="text-2xl md:text-3xl font-thin tracking-tight text-white leading-none">
                    {usd(valuation.low)}
                  </p>
                  <p className="text-[11px] tracking-[0.2em] text-zinc-500">
                    to {usd(valuation.high)}
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="h-7 w-3/4 bg-white/[0.04] rounded-sm" />
                  <div className="h-4 w-1/2 bg-white/[0.03] rounded-sm" />
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700 mt-1">
                    Fill in step 1 to see estimate
                  </p>
                </div>
              )}
            </div>

            <div className="h-px bg-white/[0.05] mx-6" />

            <div className="px-6 pb-6 flex flex-col gap-3">
              <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">Based On</p>
              {[
                { label: "Brand",    value: form.brand || "—", active: !!form.brand   },
                { label: "Year",     value: form.year  || "—", active: !!form.year    },
                { label: "Mileage",  value: form.mileage ? `${parseInt(form.mileage).toLocaleString()} km` : "—", active: !!form.mileage },
              ].map(({ label, value, active }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-700">{label}</span>
                  <span className={`text-[11px] tracking-wide transition-colors duration-300 ${active ? "text-zinc-300" : "text-zinc-700"}`}>
                    {value}
                  </span>
                </div>
              ))}

              <div className="h-px bg-white/[0.04] my-1" />
              <p className="text-[9px] leading-[1.75] text-zinc-700">
                Preliminary estimate only. Final offer subject to physical inspection and current market conditions.
              </p>
            </div>
          </motion.div>

          {/* Quick tips */}
          <div
            className="flex flex-col gap-4 border border-white/[0.06] p-6"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">Seller Tips</p>
            {[
              "Have service records ready",
              "Clean photos boost offers",
              "Disclose all modifications",
              "Include all original keys",
            ].map(tip => (
              <div key={tip} className="flex items-start gap-3">
                <span className="mt-1.5 shrink-0 w-1 h-1 bg-[#C9A356]/50 rotate-45" />
                <span className="text-[10px] tracking-[0.1em] text-zinc-600 leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
