"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-80px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const CARD_VARIANTS = {
  hidden:  { opacity: 0, y: 56 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: EASE, delay: i * 0.15 },
  }),
};

const CARDS = [
  {
    index: 0,
    eyebrow: "Exclusive Appointments",
    title: "Book a\nTest Drive",
    description:
      "Reserve private time with the vehicle of your choice. Our experts guide you through every detail — on your schedule, at your pace.",
    features: [
      "Experience luxury performance",
      "Private appointment",
      "Expert consultation",
      "Priority vehicle access",
    ],
    cta: "Book Now",
    href: "/book-test-drive",
    accent: "#C9A356",
    accentRgb: "201,163,86",
    number: "01",
  },
  {
    index: 1,
    eyebrow: "Premium Inventory",
    title: "Explore\nCollection",
    description:
      "Browse every vehicle we curate — each authenticated, inspected, and ready for immediate acquisition by the most discerning buyers.",
    features: [
      "Premium inventory",
      "Exclusive vehicles",
      "Luxury specifications",
      "Instant availability",
    ],
    cta: "View Inventory",
    href: "/inventory",
    accent: "rgba(255,255,255,0.75)",
    accentRgb: "255,255,255",
    number: "02",
  },
];

export default function ExperienceSection() {
  return (
    <section className="relative px-6 md:px-16 py-14 md:py-36 overflow-hidden">
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,163,86,0.025), transparent)",
        }}
      />

      {/* Section header */}
      <motion.div
        className="relative mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={FADE_UP}
      >
        <div>
          <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600 mb-3">
            Tailored For You
          </p>
          <h2 className="text-3xl md:text-6xl font-thin tracking-tight uppercase leading-none">
            Choose Your Experience
          </h2>
        </div>
        <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
          Two paths to extraordinary.<br />Both defined by precision.
        </p>
      </motion.div>

      {/* Cards — mobile swipe, desktop side-by-side */}
      <div className="flex gap-5 overflow-x-auto pb-4 scroll-hide snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:gap-6">
        {CARDS.map((card) => (
          <motion.div
            key={card.number}
            custom={card.index}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            whileHover={{
              y: -8,
              boxShadow: `0 32px 72px rgba(${card.accentRgb},0.1), 0 8px 28px rgba(0,0,0,0.55)`,
              borderColor: `rgba(${card.accentRgb},0.2)`,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="group relative shrink-0 w-[82vw] max-w-[420px] snap-center md:w-auto md:max-w-none flex flex-col border border-white/[0.08] overflow-hidden"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.1) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Gold top accent line */}
            <div
              className="absolute top-0 inset-x-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${card.accentRgb},0.8), transparent)`,
              }}
            />

            {/* Corner accent — top left */}
            <span
              className="absolute top-5 left-5 w-4 h-4 border-t border-l opacity-30 group-hover:opacity-70 transition-opacity duration-400"
              style={{ borderColor: card.accent }}
              aria-hidden
            />
            {/* Corner accent — bottom right */}
            <span
              className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-white/20 group-hover:border-white/40 transition-colors duration-400"
              aria-hidden
            />

            {/* Card number */}
            <span
              className="absolute top-7 right-7 text-[9px] tracking-[0.5em] uppercase transition-colors duration-300"
              style={{ color: "rgba(255,255,255,0.12)" }}
            >
              {card.number}
            </span>

            {/* Content */}
            <div className="flex flex-col gap-8 p-8 md:p-10 flex-1">

              {/* Eyebrow */}
              <p
                className="text-[9px] tracking-[0.55em] uppercase transition-colors duration-300"
                style={{ color: `rgba(${card.accentRgb},0.55)` }}
              >
                {card.eyebrow}
              </p>

              {/* Title */}
              <h3 className="text-[clamp(2rem,4vw,3rem)] font-thin tracking-tight uppercase leading-[0.9] text-white whitespace-pre-line">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[12px] leading-[2] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-400 max-w-sm">
                {card.description}
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-3">
                {card.features.map((feat, i) => (
                  <li
                    key={feat}
                    className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    <span
                      className="shrink-0 w-1 h-1 rotate-45 transition-colors duration-300"
                      style={{
                        background: `rgba(${card.accentRgb},0.5)`,
                      }}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div
                className="h-px transition-opacity duration-400"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              {/* CTA */}
              <Link
                href={card.href}
                className="group/cta relative self-start flex items-center gap-3 overflow-hidden border px-8 py-4 text-[9px] tracking-[0.5em] uppercase transition-all duration-500"
                style={{ borderColor: `rgba(${card.accentRgb},0.35)` }}
              >
                {/* Fill sweep on hover */}
                <span
                  className="absolute inset-0 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500"
                  style={{
                    background: `rgba(${card.accentRgb},0.12)`,
                    transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)",
                  }}
                  aria-hidden
                />
                <span
                  className="relative z-10 text-white/70 group-hover/cta:text-white transition-colors duration-300"
                >
                  {card.cta}
                </span>
                <span
                  className="relative z-10 inline-block transition-transform duration-300 group-hover/cta:translate-x-1 text-white/50 group-hover/cta:text-white"
                >
                  →
                </span>
              </Link>
            </div>

            {/* Bottom ambient glow on hover */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse 80% 50% at 50% 110%, rgba(${card.accentRgb},0.06), transparent)`,
              }}
              aria-hidden
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
