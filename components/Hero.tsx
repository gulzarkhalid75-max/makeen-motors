"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 0.68, 0, 1.2] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Parallax: image drifts slower than scroll
  const imgY    = useTransform(scrollY, [0, 700], [0, 100]);
  // Text parallax + fade
  const textY   = useTransform(scrollY, [0, 500], [0, -55]);
  const textOp  = useTransform(scrollY, [0, 380], [1, 0.2]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">

      {/* ── Cinematic background ── */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif"
          alt="Manhart BMW XM MHXM 900"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.08]"
        />

        {/* Multi-layer cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        {/* Gold ambient glow — bottom edge */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_25%_at_50%_100%,rgba(201,163,86,0.07),transparent)]" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_50%_at_50%_0%,rgba(0,0,0,0.4),transparent)]" />
      </motion.div>

      {/* ── Gold top line ── */}
      <div
        className="absolute top-0 inset-x-0 h-px z-10"
        style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.4),transparent)" }}
      />

      {/* ── Text content ── */}
      <motion.div
        className="relative h-full flex flex-col justify-center px-8 md:px-16 pt-24 lg:pt-0 z-10"
        style={{ y: textY, opacity: textOp }}
      >

        {/* Origin badge */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="block h-px bg-zinc-700"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
          />
          <span className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">
            Est. 2024 &nbsp;·&nbsp; Dubai, UAE
          </span>
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-[10px] tracking-[0.65em] uppercase mb-4"
          style={{ color: "rgba(201,163,86,0.85)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          The Future Arrives
        </motion.p>

        {/* MAKEEN */}
        <h1
          className="text-[clamp(4.5rem,12vw,12rem)] font-black tracking-tight leading-[0.82] uppercase"
          aria-label="Makeen Motors"
        >
          {"MAKEEN".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 64, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.45 + i * 0.07, ease: EASE }}
              style={{ perspective: 800 }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        {/* MOTORS */}
        <div className="flex items-center gap-8 mb-8">
          <h2
            className="text-[clamp(4.5rem,12vw,12rem)] font-thin tracking-[0.07em] leading-[0.82] uppercase text-zinc-600"
            aria-label=""
          >
            {"MOTORS".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 64 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.68 + i * 0.065, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </h2>
          <motion.span
            className="hidden lg:block flex-1 h-px"
            style={{
              background: "linear-gradient(90deg,rgba(201,163,86,0.3),rgba(255,255,255,0.06),transparent)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          />
        </div>

        <motion.p
          className="text-[13px] md:text-[15px] tracking-[0.12em] text-zinc-500 max-w-xs leading-[1.9] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        >
          Where precision engineering<br />meets the art of motion.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
        >
          <a
            href="/inventory"
            className="group relative px-8 py-4 border border-white/50 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Explore Collection
            </span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(.22,.68,0,1.2)]" />
          </a>

          <a
            href="#featured"
            className="group flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300"
          >
            View Vehicles
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Performance callout — bottom strip ── */}
      <motion.div
        className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.06] grid grid-cols-3 divide-x divide-white/[0.06] bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 1.2, ease: EASE }}
      >
        {[
          { value: "3.1", unit: "sec",   label: "0 – 100 km/h" },
          { value: "290", unit: "km/h",  label: "Top Speed"    },
          { value: "900", unit: "hp",    label: "Horsepower"   },
        ].map(({ value, unit, label }) => (
          <div
            key={label}
            className="group flex flex-col gap-1 px-5 py-5 md:px-8 md:py-7 hover:bg-white/[0.03] transition-colors duration-500 cursor-default"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl md:text-4xl font-thin tabular-nums leading-none text-white">
                {value}
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                {unit}
              </span>
            </div>
            <span className="text-[8px] md:text-[9px] tracking-[0.45em] uppercase text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-28 right-8 md:right-16 hidden md:flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent" />
      </motion.div>
    </section>
  );
}
