"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface VehicleGalleryProps {
  images: string[];
  vehicleId: string;
  brand: string;
  name: string;
  badge: string;
  year: number;
  price: string;
  mileage: string;
  accent: string;
  glow: string;
  line: string;
}

const SLIDE = {
  enter: (d: number) => ({ opacity: 0, scale: 1.04, x: d * 40 }),
  center: { opacity: 1, scale: 1, x: 0 },
  exit:   (d: number) => ({ opacity: 0, scale: 0.97, x: d * -40 }),
};

const TRANS = { duration: 0.75, ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number] };

export default function VehicleGallery({
  images, vehicleId, brand, name, badge, year,
  price, mileage, accent, glow, line,
}: VehicleGalleryProps) {
  const [active,     setActive]     = useState(0);
  const [direction,  setDirection]  = useState(1);
  const [expanded,   setExpanded]   = useState(false);
  const [thumbHover, setThumbHover] = useState<number | null>(null);

  const hasImages = images.length > 0;
  const multi     = images.length > 1;

  const goTo = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const prev = useCallback(() => goTo((active - 1 + images.length) % images.length), [active, images.length, goTo]);
  const next = useCallback(() => goTo((active + 1)                  % images.length), [active, images.length, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft")             prev();
      if (e.key === "ArrowRight")            next();
      if (e.key === "Escape")                setExpanded(false);
      if ((e.key === "f" || e.key === "F") && document.activeElement === document.body) setExpanded(v => !v);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <>
      {/* ── Expanded fullscreen overlay ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="expanded"
            className="fixed inset-0 z-[150] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {hasImages ? (
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={`exp-${active}`}
                  custom={direction}
                  variants={SLIDE}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={TRANS}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[active]}
                    alt={`${brand} ${name}`}
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10rem] font-black text-white/[0.04] select-none">{vehicleId}</span>
              </div>
            )}

            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-black/60 backdrop-blur-md border border-white/[0.12] text-[9px] tracking-[0.5em] uppercase text-zinc-400 hover:text-white hover:border-white/[0.3] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              Close
            </button>

            {/* Navigation in expanded */}
            {multi && (
              <>
                <button onClick={prev} aria-label="Previous" className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/[0.3] hover:bg-black/70 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={next} aria-label="Next" className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/[0.1] text-zinc-400 hover:text-white hover:border-white/[0.3] hover:bg-black/70 transition-all duration-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}

            {/* Counter */}
            {multi && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`transition-all duration-300 ${i === active ? "w-6 h-px" : "w-2 h-px"}`}
                    style={{ background: i === active ? accent : "rgba(255,255,255,0.2)" }}
                  />
                ))}
              </div>
            )}

            <div className="absolute bottom-8 right-8 text-[8px] tracking-[0.45em] uppercase text-zinc-700 flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 border border-zinc-800">ESC</kbd>
              to exit
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main gallery panel ── */}
      <div className="relative h-screen overflow-hidden bg-black">

        {/* Background image */}
        {hasImages ? (
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={active}
              custom={direction}
              variants={SLIDE}
              initial="enter"
              animate="center"
              exit="exit"
              transition={TRANS}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={`${brand} ${name}`}
                fill
                priority={active === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Elegant gradient placeholder */
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 80% at 60% 40%, ${glow}, transparent)` }} />
            {/* Concentric diamonds */}
            {[700, 500, 350].map((s, i) => (
              <div
                key={s}
                className="absolute border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"
                style={{
                  width: s, height: s,
                  borderColor: `rgba(255,255,255,0.0${i + 2})`,
                }}
              />
            ))}
            <span
              className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 text-[20rem] font-black leading-none select-none pointer-events-none hidden lg:block"
              style={{ color: `${accent}07` }}
            >
              {vehicleId}
            </span>
          </div>
        )}

        {/* ── Cinematic gradient overlays ── */}
        {/* Bottom dark sweep */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        {/* Left dark panel for text area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        {/* Brand ambient glow */}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 25% at 30% 100%, ${glow}, transparent)` }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px z-10" style={{ background: line }} />

        {/* ── Top-right controls ── */}
        <div className="absolute top-[88px] right-6 md:right-10 z-20 flex items-center gap-3">
          {/* Image counter */}
          {multi && (
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/30 font-light tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          )}
          {/* Expand button */}
          {hasImages && (
            <button
              onClick={() => setExpanded(true)}
              aria-label="View fullscreen"
              className="flex items-center justify-center w-9 h-9 bg-black/40 backdrop-blur-md border border-white/[0.1] text-zinc-500 hover:text-white hover:border-white/[0.28] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Prev / Next arrows ── */}
        {multi && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 group w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.25] hover:bg-black/55 transition-all duration-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 group w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.25] hover:bg-black/55 transition-all duration-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* ── Bottom vehicle info overlay ── */}
        <div className="absolute bottom-0 inset-x-0 z-20 px-8 md:px-16 pb-8 md:pb-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[8px] tracking-[0.45em] uppercase text-zinc-700 mb-5">
            <a href="/inventory" className="hover:text-zinc-400 transition-colors duration-200">Inventory</a>
            <span className="text-zinc-800">/</span>
            <span>{brand}</span>
            <span className="text-zinc-800">/</span>
            <span style={{ color: accent }}>{name}</span>
          </div>

          <div className="flex items-end justify-between gap-6">

            {/* Left: badges + brand + name */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-[8px] tracking-[0.5em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/[0.1]"
                  style={{ color: accent }}
                >
                  {badge}
                </span>
                <span className="text-[8px] tracking-[0.4em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/[0.07] text-zinc-500">
                  {year}
                </span>
              </div>

              <p
                className="text-[10px] tracking-[0.6em] uppercase font-semibold mb-1"
                style={{ color: accent }}
              >
                {brand}
              </p>
              <h1 className="text-[clamp(2.8rem,7vw,7rem)] font-thin tracking-tight leading-[0.88] uppercase text-white">
                {name}
              </h1>
            </div>

            {/* Right: price + mileage */}
            <div className="hidden md:flex flex-col items-end gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 block">From</span>
                <span className="text-3xl font-thin tracking-wide text-white">{price}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700 block">Odometer</span>
                <span className="text-base font-thin tracking-wide text-zinc-400">{mileage}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail strip (multiple images only) */}
          {multi && (
            <div className="flex items-center gap-2 mt-6">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  onMouseEnter={() => setThumbHover(i)}
                  onMouseLeave={() => setThumbHover(null)}
                  className={`relative overflow-hidden shrink-0 transition-all duration-300 ${
                    i === active
                      ? "w-20 h-14 border opacity-100"
                      : "w-16 h-11 border opacity-40 hover:opacity-75"
                  }`}
                  style={{ borderColor: i === active ? `${accent}80` : "rgba(255,255,255,0.08)" }}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  {thumbHover === i && i !== active && (
                    <div className="absolute inset-0 bg-white/[0.06]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Single image indicator */}
          {!multi && hasImages && (
            <div className="flex items-center gap-3 mt-5">
              <div className="w-6 h-px" style={{ background: accent }} />
              <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">Main View</span>
            </div>
          )}
        </div>

        {/* ── Vertical "scroll" hint ── */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-16 hidden lg:flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent" />
        </motion.div>
      </div>
    </>
  );
}
