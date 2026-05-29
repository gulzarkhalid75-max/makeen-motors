"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Each entry uses a confirmed file from /public/images/logo/
//    and a confirmed file from /public/images/cars/
const BRANDS = [
  {
    name:         "Mercedes-Benz",
    origin:       "Stuttgart, Germany",
    since:        "Est. 1926",
    logo:         "/images/logo/mercedes-benz-car-logo-brand-png-3.png",
    vehicleImage: "/images/cars/range-rover-image-4k-without-600nw-2701249715.webp",
    href:         "/inventory",
    glow:         "rgba(201,163,86,0.16)",
    line:         "linear-gradient(90deg,transparent,rgba(201,163,86,0.65),transparent)",
  },
  {
    name:         "Porsche",
    origin:       "Stuttgart, Germany",
    since:        "Est. 1931",
    logo:         "/images/logo/porsche-logo-elegant-porsche-luxury-car-logo-Lr25XDNq_t.jpg",
    vehicleImage: "/images/cars/116592.jpg",
    href:         "/inventory?brand=Porsche",
    glow:         "rgba(201,163,86,0.16)",
    line:         "linear-gradient(90deg,transparent,rgba(201,163,86,0.65),transparent)",
  },
  {
    name:         "Audi",
    origin:       "Ingolstadt, Germany",
    since:        "Est. 1909",
    logo:         "/images/logo/audi-a3-car-emblem-logo-audi-car-logo-png-brand-image.jpg",
    vehicleImage: "/images/cars/facelift-bmw-7-series-carbon-tuning.webp",
    href:         "/inventory",
    glow:         "rgba(201,163,86,0.16)",
    line:         "linear-gradient(90deg,transparent,rgba(201,163,86,0.65),transparent)",
  },
  {
    name:         "Lamborghini",
    origin:       "Sant'Agata, Italy",
    since:        "Est. 1963",
    logo:         "/images/logo/lamborghini-urus-car-audi-logo-lamborghini.jpg",
    vehicleImage: "/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif",
    href:         "/inventory",
    glow:         "rgba(201,163,86,0.16)",
    line:         "linear-gradient(90deg,transparent,rgba(201,163,86,0.65),transparent)",
  },
  {
    name:         "Jaguar",
    origin:       "Coventry, England",
    since:        "Est. 1935",
    logo:         "/images/logo/jaguar-car-logo-png-701751694709228ntwu17ok7u.png",
    vehicleImage: "/images/cars/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEwL3Jhd3BpeGVsb2ZmaWNlNF9mdWxsX3F1YXJ0ZXJfZnJvbnRfdmlld19waG90b19vZl9hX2dyZXlfbW9kZXJuX18yMGIxNDdhYy1hYzRjLTQ0NGQtODRkYS04YjllNzg4MWM3NmIucG5n.webp",
    href:         "/inventory",
    glow:         "rgba(175,140,80,0.14)",
    line:         "linear-gradient(90deg,transparent,rgba(175,140,80,0.55),transparent)",
  },
  {
    name:         "Tesla",
    origin:       "Austin, Texas",
    since:        "Est. 2003",
    logo:         "/images/logo/kisspng-tesla-motors-car-tesla-semi-electric-vehicle-nikola-tesla-treasury-5b296403c92f99.5658832215294392358241.jpg",
    vehicleImage: "/images/cars/bmw-i7-schwarz-mietwagen-1920x886.webp",
    href:         "/inventory?brand=Tesla",
    glow:         "rgba(192,48,48,0.14)",
    line:         "linear-gradient(90deg,transparent,rgba(192,48,48,0.5),transparent)",
  },
];

// ── Animation ─────────────────────────────────────────────────

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-80px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const CARD = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────

export default function BrandShowcase() {
  return (
    <section className="relative px-8 md:px-16 py-24 md:py-32 overflow-hidden">

      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent 100%)" }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(201,163,86,0.03), transparent)" }}
      />

      {/* ── Header ── */}
      <motion.div
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={FADE_UP}
      >
        <div>
          <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-700 mb-3">Elite Partners</p>
          <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
            Premium Brands
          </h2>
        </div>
        <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
          The world's most prestigious marques,<br />curated for the most discerning clients.
        </p>
      </motion.div>

      {/* ── Brand cards ── */}
      {/* Mobile: horizontal snap-scroll · Tablet: 2-col · Desktop: 3-col */}
      <motion.div
        className="flex gap-5 overflow-x-auto pb-4 scroll-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        {BRANDS.map((brand) => (
          <motion.div
            key={brand.name}
            variants={CARD}
            whileHover={{
              y: -10,
              boxShadow: `0 32px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,163,86,0.18), 0 6px 24px ${brand.glow}`,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="group relative shrink-0 w-72 snap-center md:w-auto flex flex-col border border-white/[0.07] bg-black/30 overflow-hidden"
          >
            <Link href={brand.href} className="flex flex-col h-full">

              {/* ── Vehicle image ── */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={brand.vehicleImage}
                  alt={`${brand.name} luxury vehicle`}
                  fill
                  sizes="(max-width:768px) 288px,(max-width:1024px) 50vw,33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                {/* Brand glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                  style={{ background: `radial-gradient(ellipse 75% 50% at 50% 115%, ${brand.glow}, transparent)` }}
                  aria-hidden
                />
                {/* Top accent line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: brand.line }}
                />
                {/* Since badge */}
                <span className="absolute top-3.5 right-3.5 text-[7px] tracking-[0.45em] uppercase px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/[0.1] text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/[0.18] transition-all duration-300">
                  {brand.since}
                </span>
              </div>

              {/* ── Info panel ── */}
              <div className="relative flex flex-col gap-4 p-5 md:p-6 flex-1">
                {/* Subtle left accent line */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to bottom, transparent, rgba(201,163,86,0.4), transparent)` }}
                />

                {/* Brand logo */}
                <div className="flex items-center justify-center h-14 border border-white/[0.07] bg-white/[0.025] group-hover:border-[#C9A356]/22 group-hover:bg-white/[0.04] transition-all duration-400 overflow-hidden">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={100}
                    height={40}
                    className="h-7 w-auto max-w-[88px] object-contain transition-all duration-400 group-hover:scale-105"
                    style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.15))" }}
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[13px] font-light tracking-[0.1em] text-white/80 group-hover:text-white transition-colors duration-300 leading-snug">
                    {brand.name}
                  </h3>
                  <p className="text-[8px] tracking-[0.38em] uppercase text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                    {brand.origin}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[8px] tracking-[0.42em] uppercase text-zinc-700 group-hover:text-[#C9A356] transition-colors duration-300 mt-auto pt-1 border-t border-white/[0.05] group-hover:border-[#C9A356]/12">
                  <span>View Collection</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
