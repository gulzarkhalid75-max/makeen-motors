"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Constants ────────────────────────────────────────────────────

const NAV = [
  { label: "Home",      href: "/"          },
  { label: "Cars",      href: "/inventory" },
  { label: "About",     href: "/about"     },
  { label: "Contact",   href: "/contact"   },
];

const STATS = [
  { value: "500+",  label: "Vehicles Sold",          sub: "Since inception"       },
  { value: "98%",   label: "Client Satisfaction",    sub: "Verified reviews"      },
  { value: "10+",   label: "Premium Brands",         sub: "Curated selection"     },
  { value: "48h",   label: "Delivery Guarantee",     sub: "Anywhere in the UAE"   },
  { value: "200+",  label: "Inspection Points",      sub: "Per vehicle"           },
  { value: "24/7",  label: "Advisor Availability",   sub: "Always reachable"      },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Founded in Dubai",
    body:  "MAKEEN MOTORS was established in the heart of Downtown Dubai with a single conviction: that acquiring a world-class vehicle should feel as extraordinary as driving one.",
  },
  {
    year: "2024",
    title: "First 100 Vehicles",
    body:  "Within six months we curated and delivered our first 100 vehicles — each hand-selected, independently inspected, and shipped with white-glove care across the UAE.",
  },
  {
    year: "2025",
    title: "Multi-Brand Certification",
    body:  "We expanded our certified portfolio to cover Manhart, BMW M Division, Porsche, Bentley, Lucid and Tesla — completing partnerships with factory-trained inspection teams.",
  },
  {
    year: "2025",
    title: "Regional Expansion",
    body:  "Deliveries now extend to Saudi Arabia and Qatar, bringing the Makeen standard of service to clients across the Arabian Gulf.",
  },
  {
    year: "2026",
    title: "The Future",
    body:  "A dedicated performance workshop, bespoke configurator, and concierge trade-in programme — the next chapter of Makeen Motors is being written now.",
    future: true,
  },
];

const PILLARS = [
  {
    id: "01",
    title: "Curation",
    body:  "Every vehicle in our collection is individually sourced and authenticated. We refuse anything that does not meet our standard — which is why our standard remains exceptional.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6.5 3H17.5L22 9L12 21.5L2 9L6.5 3Z"/><line x1="2" y1="9" x2="22" y2="9"/>
        <path d="M12 3L8.5 9L12 21.5L15.5 9L12 3Z"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "Integrity",
    body:  "No hidden costs, no inflated histories, no pressure. Every transaction is transparent by design — because trust is the only currency that matters in our industry.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L4 5.5V12C4 16.4 7.5 20.4 12 22C16.5 20.4 20 16.4 20 12V5.5L12 2Z"/>
        <polyline points="8.5,12.5 10.5,14.5 15.5,9.5"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Precision",
    body:  "Our 200-point inspection protocol leaves nothing to chance. Factory-trained technicians verify every system, surface, and specification before we take ownership of a vehicle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
        <path d="M11 8v3l2 2"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Discretion",
    body:  "Our clients value their privacy. Every enquiry, negotiation, and delivery is handled with absolute confidentiality — a promise we make and consistently keep.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const BRANDS = [
  "BMW M Division", "Manhart Performance", "Porsche", "Bentley",
  "Mercedes-AMG", "Aston Martin", "Lucid Motors", "Tesla",
  "Lamborghini", "Ferrari", "McLaren",
];

// ── Animation config ─────────────────────────────────────────────

const EASE     = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-70px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const STAGGER_FAST = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// ── Page ─────────────────────────────────────────────────────────

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroTextY  = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0.25]);

  return (
    <>
      <style>{`
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .glass-deep {
          background: rgba(255,255,255,0.045);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.09);
        }
        .bg-grid {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
        .gold-gradient {
          background: linear-gradient(135deg,
            rgba(255,255,255,0.5) 0%,
            rgba(201,163,86,0.9) 40%,
            rgba(255,255,255,0.6) 70%,
            rgba(148,163,184,0.5) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grad-border-t::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 20%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 80%,
            transparent 100%
          );
        }
        .timeline-dot::before {
          content: "";
          position: absolute;
          left: -1px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 9px;
          height: 9px;
          border: 1px solid rgba(201,163,86,0.5);
          background: #000;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Fixed background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_50%,rgba(201,163,86,0.025),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_50%_at_100%_70%,rgba(201,163,86,0.018),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-[0.022]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.72))]" />
        </div>

        {/* ── Navbar ── */}
        <header className="fixed inset-x-0 top-0 z-50 bg-black/85 backdrop-blur-xl border-b border-white/[0.07]">
          <div className="flex items-center justify-between px-6 md:px-14 py-5">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={160}
                height={40}
                priority
                className="h-8 md:h-9 w-auto transition-opacity duration-300 group-hover:opacity-70"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              {NAV.map(({ label, href }) => {
                const active = label === "About";
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`relative text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 py-1 group ${
                      active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                    <span className={`absolute bottom-0 left-0 h-px bg-[#C9A356] transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-6 py-2.5 border border-white/30 text-[10px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-500 hover:border-white"
            >
              Enquire
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
            >
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/95 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 55}ms` : "0ms" }}
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 transition-all duration-300 ${
                    label === "About" ? "text-white" : "text-zinc-400 hover:text-white"
                  } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 1. HERO ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[73px]">

          {/* Gold accent line below nav */}
          <div className="absolute top-[73px] inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.4),transparent)" }} />

          {/* Decorative concentric diamond — right side */}
          <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none hidden lg:flex items-center justify-center pr-8" aria-hidden>
            <div className="relative flex items-center justify-center">
              {[380, 280, 190, 110, 50].map((s, i) => (
                <div
                  key={s}
                  className="absolute border rotate-45"
                  style={{
                    width: s, height: s,
                    borderColor: i < 2
                      ? `rgba(255,255,255,0.0${i + 2})`
                      : `rgba(201,163,86,0.${String(i * 5 + 5).padStart(2, "0")})`,
                    animationDuration: `${8 + i * 2}s`,
                  }}
                />
              ))}
              <div className="w-3 h-3 rotate-45" style={{ background: "rgba(201,163,86,0.55)" }} />
            </div>
          </div>

          <motion.div
            className="relative px-8 md:px-16 py-20"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER}
            >
              {/* Badge */}
              <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-8">
                <motion.span
                  className="block h-px bg-zinc-700"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                />
                <span className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">
                  Est. 2024 &nbsp;·&nbsp; Our Story
                </span>
              </motion.div>

              {/* Eyebrow */}
              <motion.p
                variants={FADE_UP}
                className="text-[10px] tracking-[0.65em] uppercase mb-4"
                style={{ color: "rgba(201,163,86,0.85)" }}
              >
                Makeen Motors
              </motion.p>

              {/* Title */}
              <motion.div variants={FADE_UP}>
                <h1 className="text-[clamp(4rem,12vw,11rem)] font-black tracking-tight leading-[0.82] uppercase">
                  Beyond
                </h1>
                <h2 className="text-[clamp(4rem,12vw,11rem)] font-thin tracking-[0.07em] leading-[0.82] uppercase text-zinc-600">
                  Ordinary
                </h2>
              </motion.div>

              {/* Sub-copy */}
              <motion.p
                variants={FADE_UP}
                className="mt-8 text-[13px] md:text-[15px] tracking-[0.1em] text-zinc-500 max-w-md leading-[1.95]"
              >
                Founded in Dubai, driven by conviction.
                MAKEEN MOTORS exists to make the acquisition
                of extraordinary machines feel exactly that — extraordinary.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={FADE_UP} className="flex items-center gap-8 mt-10">
                <Link
                  href="/inventory"
                  className="group relative px-8 py-4 border border-white/50 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(.22,.68,0,1.2)]" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    View Collection
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="text-[7px] tracking-[0.55em] uppercase text-zinc-700">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-zinc-700 to-transparent" />
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 2. STATISTICS ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,163,86,0.03),transparent)]" />

          <motion.div
            className="flex items-end justify-between mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356] mb-3">By the Numbers</p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                The Record
              </h2>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER_FAST}
          >
            {STATS.map(({ value, label, sub }) => (
              <motion.div
                key={label}
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }}
                whileHover={{ backgroundColor: "rgba(201,163,86,0.025)" }}
                transition={{ duration: 0.3 }}
                className="group relative bg-black px-8 py-10 md:px-12 md:py-14 flex flex-col gap-3 cursor-default overflow-hidden"
              >
                {/* Hover top line */}
                <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.5),transparent)" }} />

                <span className="gold-gradient text-[clamp(2.5rem,5vw,4rem)] font-thin tabular-nums leading-none">
                  {value}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                  {label}
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                  {sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 3. MISSION + VISION ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.75, ease: EASE }}
              whileHover={{ borderColor: "rgba(201,163,86,0.2)" }}
              className="glass-deep relative flex flex-col gap-8 p-10 md:p-14 overflow-hidden transition-colors duration-500"
            >
              {/* Gold top bar */}
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.45),transparent)" }} />

              <div className="flex items-center gap-3">
                <span className="block w-[9px] h-[9px] border border-[#C9A356]/50 rotate-45 shrink-0" />
                <span className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356]">Our Mission</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-thin tracking-tight leading-[1.15] text-white">
                To make acquiring an extraordinary vehicle feel as&nbsp;
                <em className="not-italic font-black" style={{ color: "#C9A356" }}>extraordinary</em>
                &nbsp;as driving one.
              </h3>

              <p className="text-[13px] leading-[2.05] text-zinc-500">
                Every interaction with Makeen Motors — from the first message to the
                moment you take the keys — should carry the same weight and precision
                as the machines we represent. We exist to eliminate the friction, the
                anxiety, and the compromise that too often accompanies high-value automotive
                transactions.
              </p>

              <div className="mt-auto pt-4 border-t border-white/[0.06]">
                <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">
                  Downtown Dubai, UAE · Est. 2024
                </span>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
              whileHover={{ borderColor: "rgba(255,255,255,0.12)" }}
              className="glass relative flex flex-col gap-8 p-10 md:p-14 overflow-hidden transition-colors duration-500"
            >
              <div className="flex items-center gap-3">
                <span className="block w-[9px] h-[9px] border border-white/30 rotate-45 shrink-0" />
                <span className="text-[9px] tracking-[0.6em] uppercase text-zinc-500">Our Vision</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-thin tracking-tight leading-[1.15] text-white">
                To become the Gulf's most&nbsp;
                <em className="not-italic font-black text-white">trusted</em>
                &nbsp;name in premium automotive retail.
              </h3>

              <p className="text-[13px] leading-[2.05] text-zinc-500">
                We measure success not by volume but by the relationships we keep.
                A client who returns is a client who trusts — and in this industry,
                nothing is more valuable than that. Our vision is a network of
                discerning clients across the Arabian Gulf, each confident that when
                they come to Makeen, they receive exactly what is promised.
              </p>

              {/* Vertical accent */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.06),transparent)" }} />
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 4. PILLARS — WHY CHOOSE US ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">

          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356] mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                The Makeen Standard
              </h2>
            </div>
            <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
              Four principles that govern every decision<br />we make on behalf of our clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden:  { opacity: 0, y: 44 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                whileHover={{ backgroundColor: "rgba(201,163,86,0.025)", boxShadow: "inset 0 1px 0 rgba(201,163,86,0.1)" }}
                transition={{ duration: 0.3 }}
                className="group relative bg-black p-10 md:p-12 flex flex-col gap-8 overflow-hidden cursor-default"
              >
                {/* Sweep lines */}
                <div className="absolute top-0 inset-x-0 h-px w-0 bg-[#C9A356]/50 group-hover:w-full transition-all duration-500" />
                <div className="absolute bottom-0 inset-x-0 h-px w-0 bg-white/[0.05] group-hover:w-full transition-all duration-700 delay-100" />

                {/* Number */}
                <span className="absolute top-8 right-8 text-[10px] tracking-[0.45em] uppercase text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300 select-none">
                  {p.id}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 border border-white/[0.09] bg-white/[0.03] text-zinc-400 group-hover:text-[#C9A356] group-hover:border-[#C9A356]/30 transition-all duration-500">
                  {p.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl md:text-2xl font-thin tracking-[0.08em] uppercase text-white group-hover:text-zinc-100 transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-[13px] leading-[1.95] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 5. TIMELINE ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">

          <motion.div
            className="mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356] mb-3">Our Journey</p>
            <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
              The Timeline
            </h2>
          </motion.div>

          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A356]/30 via-white/[0.06] to-transparent" />

            <div className="flex flex-col gap-0">
              {TIMELINE.map(({ year, title, body, future }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
                  className="relative pl-12 pb-14 last:pb-0"
                >
                  {/* Diamond dot on the line */}
                  <div
                    className="timeline-dot absolute left-0 top-2"
                    style={{ position: "absolute" }}
                  >
                    <div
                      className="w-[9px] h-[9px] border rotate-45 absolute -left-[4px]"
                      style={{
                        borderColor: future ? "rgba(255,255,255,0.15)" : "rgba(201,163,86,0.5)",
                        background: "#000",
                        top: "0.5rem",
                      }}
                    />
                  </div>

                  {/* Year badge */}
                  <span
                    className="inline-block text-[8px] tracking-[0.6em] uppercase px-2.5 py-1 mb-4 border"
                    style={{
                      borderColor: future ? "rgba(255,255,255,0.07)" : "rgba(201,163,86,0.25)",
                      color:       future ? "rgba(161,161,170,0.5)"  : "#C9A356",
                      background:  future ? "transparent"            : "rgba(201,163,86,0.05)",
                    }}
                  >
                    {year}
                  </span>

                  {/* Content */}
                  <h3
                    className={`text-xl md:text-2xl font-thin tracking-wide mb-3 ${future ? "text-zinc-600" : "text-white"}`}
                  >
                    {title}
                  </h3>
                  <p className={`text-[13px] leading-[1.95] max-w-xl ${future ? "text-zinc-700" : "text-zinc-500"}`}>
                    {body}
                  </p>

                  {future && (
                    <span className="inline-flex items-center gap-2 mt-4 text-[8px] tracking-[0.45em] uppercase text-zinc-700">
                      <span className="w-1.5 h-1.5 bg-zinc-700 rotate-45" />
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 6. BRAND PARTNERS ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-20 md:py-28 overflow-hidden">

          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356] mb-3">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-thin tracking-tight uppercase leading-none">
              Premium Brands
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {BRANDS.map((brand) => (
              <motion.span
                key={brand}
                variants={{
                  hidden:  { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
                }}
                whileHover={{ borderColor: "rgba(201,163,86,0.35)", color: "#C9A356", backgroundColor: "rgba(201,163,86,0.05)" }}
                transition={{ duration: 0.2 }}
                className="px-5 py-3 border border-white/[0.08] text-[9px] tracking-[0.45em] uppercase text-zinc-500 cursor-default"
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* ── 7. CTA BANNER ── */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32 overflow-hidden">

          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(201,163,86,0.04), transparent)" }} />

          <motion.div
            className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
          >
            <motion.div variants={FADE_UP} className="flex items-center gap-3">
              <span className="block w-[9px] h-[9px] border border-[#C9A356]/50 rotate-45" />
              <span className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356]">Ready to Begin</span>
              <span className="block w-[9px] h-[9px] border border-[#C9A356]/50 rotate-45" />
            </motion.div>

            <motion.h2
              variants={FADE_UP}
              className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-[1.05]"
            >
              Your Next<br />
              <span className="font-black">Extraordinary</span><br />
              Vehicle Awaits
            </motion.h2>

            <motion.p
              variants={FADE_UP}
              className="text-[13px] leading-[1.95] text-zinc-500 max-w-sm"
            >
              Browse the collection, configure your enquiry, or speak directly with a Makeen Motors advisor — we are ready when you are.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-5 pt-2">
              <Link
                href="/inventory"
                className="group relative px-10 py-4 border border-white/50 text-[10px] tracking-[0.5em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(.22,.68,0,1.2)]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  Explore Collection
                </span>
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 px-8 py-4 border border-white/[0.12] text-[10px] tracking-[0.45em] uppercase text-zinc-400 hover:text-white hover:border-white/[0.3] transition-all duration-400"
              >
                Contact an Advisor
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.05] px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="group">
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={120}
              height={30}
              className="h-5 w-auto opacity-35 transition-opacity duration-300 group-hover:opacity-65"
            />
          </Link>
          <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-800">
            © 2024 Makeen Motors LLC · All rights reserved
          </span>
        </footer>
      </div>
    </>
  );
}
