"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SellCarForm, { VehicleValuationCard } from "@/components/SellCarForm";

// ── Data ─────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",      href: "/"          },
  { label: "Cars",      href: "/inventory" },
  { label: "About",     href: "/#about"    },
  { label: "Contact",   href: "/#contact"  },
];

const BENEFITS = [
  {
    id: "01",
    title: "Fast Valuation",
    description: "Professional market assessment delivered within 24 hours of submission — no waiting, no uncertainty.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Trusted Buyers",
    description: "Access to our verified network of 500+ pre-qualified premium buyers actively seeking vehicles like yours.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L4 5.5V12C4 16.4 7.5 20.4 12 22C16.5 20.4 20 16.4 20 12V5.5L12 2Z" />
        <polyline points="8.5,12.5 10.5,14.5 15.5,9.5" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Secure Process",
    description: "100% transparent, legally compliant transactions. Zero hidden fees, zero surprises — only results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Premium Service",
    description: "A dedicated personal advisor guides you from initial valuation through final handover — the Makeen standard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6.5 3H17.5L22 9L12 21.5L2 9L6.5 3Z" /><line x1="2" y1="9" x2="22" y2="9" />
        <path d="M12 3L8.5 9L12 21.5L15.5 9L12 3Z" />
      </svg>
    ),
  },
];

const ACCEPTED_BRANDS = [
  { name: "Mercedes-Benz", logo: "/images/logo/mercedes-benz-car-logo-brand-png-3.png"                                                                                          },
  { name: "Porsche",       logo: "/images/logo/porsche-logo-elegant-porsche-luxury-car-logo-Lr25XDNq_t.jpg"                                                                      },
  { name: "Audi",          logo: "/images/logo/audi-a3-car-emblem-logo-audi-car-logo-png-brand-image.jpg"                                                                        },
  { name: "Lamborghini",   logo: "/images/logo/lamborghini-urus-car-audi-logo-lamborghini.jpg"                                                                                   },
  { name: "Jaguar",        logo: "/images/logo/jaguar-car-logo-png-701751694709228ntwu17ok7u.png"                                                                                },
  { name: "Tesla",         logo: "/images/logo/kisspng-tesla-motors-car-tesla-semi-electric-vehicle-nikola-tesla-treasury-5b296403c92f99.5658832215294392358241.jpg"             },
  { name: "Volkswagen",    logo: "/images/logo/Volkswagen-logo-1.png"                                                                                                            },
];

const TRADE_IN_STEPS = [
  { label: "Submit Your Car",     desc: "Complete the valuation form with your vehicle's details and photos."         },
  { label: "Receive Offer",       desc: "Our specialists assess your car and provide a competitive market offer."     },
  { label: "Choose Replacement",  desc: "Browse our entire collection and select your next vehicle."                  },
  { label: "Seamless Exchange",   desc: "The difference is settled and your new car is delivered white-glove."       },
];

// ── Animation ─────────────────────────────────────────────────

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
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

// ── Page ─────────────────────────────────────────────────────

export default function SellCarPage() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [isAuthed,      setIsAuthed]      = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setIsAuthed(localStorage.getItem("makeen_auth") === "1");
  }, []);

  const handleSellClick = () => {
    if (isAuthed) {
      document.getElementById("sell-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuth = () => {
    localStorage.setItem("makeen_auth", "1");
    setIsAuthed(true);
    setShowAuthModal(false);
    setTimeout(() => {
      document.getElementById("sell-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  const handleSignOut = () => {
    localStorage.removeItem("makeen_auth");
    setIsAuthed(false);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        .bg-grid-sell {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Fixed background layers ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 bg-grid-sell opacity-[0.022]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.72))]" />
        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* NAVBAR                                              */}
        {/* ════════════════════════════════════════════════════ */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.07]"
              : "bg-transparent border-b border-transparent"
          }`}
        >
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
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="relative text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <Link
              href="/inventory"
              className="hidden md:inline-flex items-center px-6 py-2.5 border border-white/30 text-[10px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-500 hover:border-white"
            >
              Browse Cars
            </Link>

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
            >
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/95 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 text-zinc-400 hover:text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {label}
                </Link>
              ))}

              {/* ── Account ── */}
              <div className="pt-1 mt-2 border-t border-white/[0.05]">
                <p
                  className={`text-[7px] tracking-[0.7em] uppercase text-zinc-700 pt-3 pb-1 transition-all duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60 + 30}ms` : "0ms" }}
                >
                  Account
                </p>

                {isAuthed ? (
                  <>
                    <p
                      style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60 + 90}ms` : "0ms" }}
                      className={`py-3.5 text-[10px] tracking-[0.4em] uppercase text-[#C9A356] border-b border-white/[0.06] transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                    >
                      Signed In ✓
                    </p>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60 + 150}ms` : "0ms" }}
                      className={`w-full text-left py-4 text-[11px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  ["Sign In", "Register"].map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => { setMenuOpen(false); setShowAuthModal(true); }}
                      style={{ transitionDelay: menuOpen ? `${(NAV_LINKS.length + i + 1) * 60 + 30}ms` : "0ms" }}
                      className={`w-full text-left py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 text-zinc-400 hover:text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                    >
                      {label}
                    </button>
                  ))
                )}
              </div>
            </nav>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════ */}
        {/* 1. HERO                                             */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative flex items-end min-h-[60vh] md:min-h-[65vh] overflow-hidden pt-20">
          {/* Background image */}
          <Image
            src="/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif"
            alt="Sell"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(201,163,86,0.08), transparent)" }}
          />

          {/* Content */}
          <div className="relative px-8 md:px-16 pb-16 md:pb-24 w-full">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-2 h-2 border border-[#C9A356]/50 rotate-45 shrink-0" />
                <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-500">Makeen Motors · Sell &amp; Trade</p>
              </div>

              <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-thin tracking-tight uppercase leading-[0.88] mb-6">
                Sell Your<br />
                <span className="text-zinc-400">Luxury Vehicle</span>
              </h1>

              <p className="text-[13px] md:text-[14px] leading-[2] text-zinc-400 max-w-md mb-8">
                Get a professional market valuation within minutes. Trusted by Dubai's most discerning vehicle owners.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#valuation-form"
                  className="group relative flex items-center gap-3 px-8 py-4 border border-white/50 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-200">Start Valuation</span>
                  <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">→</span>
                </a>
                <button
                  type="button"
                  onClick={handleSellClick}
                  className="group relative flex items-center gap-3 px-8 py-4 border border-white/50 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-200">Sell Your Vehicle</span>
                  <span className="relative z-10 inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">→</span>
                </button>
              </div>
            </motion.div>

            {/* Floating stats */}
            <motion.div
              className="absolute right-8 md:right-16 bottom-8 md:bottom-12 hidden md:flex gap-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            >
              {[
                { value: "24h",   label: "Avg. Valuation Time" },
                { value: "500+",  label: "Vehicles Sold"        },
                { value: "98%",   label: "Seller Satisfaction"  },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1 text-right">
                  <span className="text-2xl font-thin tracking-tight text-white">{value}</span>
                  <span className="text-[8px] tracking-[0.45em] uppercase text-zinc-600">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* 2. WHAT IS MY VEHICLE WORTH + MULTI-STEP FORM       */}
        {/* ════════════════════════════════════════════════════ */}
        <section id="valuation-form" className="relative px-8 md:px-16 py-20 md:py-28">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,163,86,0.03), transparent)" }}
            aria-hidden
          />

          {/* — What Is My Vehicle Worth — */}
          <motion.div
            className="relative mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-1.5 h-1.5 border border-[#C9A356]/60 rotate-45 shrink-0" />
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">Vehicle Valuation</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-thin tracking-tight uppercase leading-none">
              What Is My<br />
              <span className="text-zinc-400">Vehicle Worth?</span>
            </h2>
            <p className="text-[13px] leading-[2] text-zinc-500 mt-5 max-w-lg">
              Get an instant estimate in three steps. Powered by real market data from Dubai's luxury vehicle segment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-20 md:mb-28"
          >
            <VehicleValuationCard />
          </motion.div>

          {/* Divider */}
          <div className="mb-16 md:mb-20">
            <div
              className="h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06) 30%,rgba(255,255,255,0.10) 50%,rgba(255,255,255,0.06) 70%,transparent)" }}
            />
          </div>

          {/* — Sell  Form — */}
          <div id="sell-form-anchor">
            <motion.div
              className="relative mb-12 md:mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={FADE_UP}
            >
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600 mb-3">Valuation Request</p>
              <h2 className="text-4xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                Vehicle Information
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              <SellCarForm />
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* BRANDS WE ACCEPT                                    */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 py-10 md:py-14">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.05) 50%,transparent 100%)" }}
          />
          <motion.div
            className="flex flex-col gap-7"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">Accepted Brands</p>
              <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700 hidden sm:block">
                All luxury marques considered
              </p>
            </div>

            <div className="flex items-center gap-8 md:gap-12 overflow-x-auto pb-2 scroll-hide">
              {ACCEPTED_BRANDS.map(({ name, logo }) => (
                <div
                  key={name}
                  className="shrink-0 flex items-center justify-center opacity-25 hover:opacity-75 transition-all duration-400 grayscale hover:grayscale-0"
                >
                  <Image
                    src={logo}
                    alt={name}
                    width={80}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* 3. TRADE-IN PROGRAM                                 */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 py-20 md:py-28">
          {/* Top border gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 40% at 50% 50%, rgba(201,163,86,0.025), transparent)" }}
            aria-hidden
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: text */}
            <motion.div
              className="flex flex-col gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={FADE_UP}
            >
              <div>
                <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600 mb-3">Exchange Programme</p>
                <h2 className="text-4xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                  Trade-In<br />
                  <span className="text-zinc-500">Programme</span>
                </h2>
              </div>

              <p className="text-[13px] leading-[2.1] text-zinc-500 max-w-sm">
                Exchange your current vehicle directly against any model in our collection. Our specialists handle the entire process — from valuation to ownership transfer — with the same white-glove precision you'd expect from Makeen Motors.
              </p>

              <div className="flex flex-col gap-4">
                {TRADE_IN_STEPS.map(({ label, desc }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 border shrink-0 mt-0.5 group-hover:border-[#C9A356]/40 transition-colors duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    >
                      <span className="text-[9px] tracking-[0.1em] text-zinc-600 group-hover:text-[#C9A356] transition-colors duration-300">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <p className="text-[11px] tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                        {label}
                      </p>
                      <p className="text-[11px] leading-[1.8] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <a
                href="#valuation-form"
                className="group relative self-start flex items-center gap-3 px-8 py-4 border border-[#C9A356]/35 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-[#C9A356]/60 transition-colors duration-400"
              >
                <span className="absolute inset-0 bg-[#C9A356]/[0.08] translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                <span className="relative z-10 text-[#C9A356]">Explore Trade-In</span>
                <span className="relative z-10 text-[#C9A356] inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            {/* Right: Exchange visual — real vehicle images */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            >
              {/* Current vehicle — BMW M5 CS */}
              <div className="group relative overflow-hidden border border-white/[0.09]">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src="/images/cars/b3d6c5e5-2248-4deb-8306-da702b05214b.avif"
                    alt="Trade in your current luxury vehicle"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                </div>
                <div className="absolute top-3.5 left-3.5">
                  <span className="text-[7px] tracking-[0.45em] uppercase px-2.5 py-1 bg-black/75 backdrop-blur-sm border border-white/[0.12] text-zinc-400">
                    Trade In
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="text-[7px] tracking-[0.55em] uppercase text-zinc-500 mb-1">Your Current Vehicle</p>
                  <p className="text-sm font-thin tracking-wide text-white leading-snug">Any Luxury Vehicle</p>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 mt-0.5">Any brand · Any year</p>
                </div>
              </div>

              {/* Exchange arrow */}
              <div className="flex items-center gap-4 py-1">
                <div className="flex-1 h-px bg-gradient-to-r from-white/[0.04] to-[#C9A356]/30" />
                <div className="flex items-center justify-center w-9 h-9 border border-[#C9A356]/30 bg-[#C9A356]/[0.06] shrink-0">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#C9A356]">
                    <path d="M5 8l-3 3 3 3M15 12l3-3-3-3M2 11h16" />
                  </svg>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-white/[0.04] to-[#C9A356]/30" />
              </div>

              {/* Dream vehicle — Manhart XM 900 */}
              <div className="group relative overflow-hidden border border-[#C9A356]/22">
                <div className="absolute top-0 inset-x-0 h-px z-10 bg-gradient-to-r from-transparent via-[#C9A356]/55 to-transparent" />
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src="/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif"
                    alt="Your dream vehicle from the Makeen Motors collection"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 70% 50% at 50% 110%, rgba(201,163,86,0.14), transparent)" }}
                    aria-hidden
                  />
                </div>
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[7px] tracking-[0.45em] uppercase px-2.5 py-1 bg-black/75 backdrop-blur-sm border border-[#C9A356]/30 text-[#C9A356]">
                    Receive
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                  <p className="text-[7px] tracking-[0.55em] uppercase text-[#C9A356]/60 mb-1">Your Dream Vehicle</p>
                  <p className="text-sm font-thin tracking-wide text-white leading-snug">Any Model in Our Collection</p>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-zinc-600 mt-0.5">Offset against trade value</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* 4. WHY SELL WITH MAKEEN                             */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 py-20 md:py-28">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.018), transparent)" }}
            aria-hidden
          />

          <motion.div
            className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600 mb-3">Our Commitment</p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                Why Sell With<br />
                <span className="text-zinc-500">Makeen Motors</span>
              </h2>
            </div>
            <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
              From first inquiry to final payment,<br />every detail handled with precision.
            </p>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
          >
            {BENEFITS.map((b) => (
              <motion.div
                key={b.id}
                variants={CARD}
                whileHover={{
                  backgroundColor: "rgba(201,163,86,0.025)",
                  boxShadow: "inset 0 1px 0 rgba(201,163,86,0.1)",
                }}
                transition={{ duration: 0.3 }}
                className="group relative flex flex-col gap-8 bg-black p-8 md:p-10 overflow-hidden cursor-default"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-[#C9A356]/60 group-hover:w-full transition-all duration-500" />
                <span className="absolute top-8 right-8 text-[10px] tracking-[0.4em] uppercase text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300 select-none">
                  {b.id}
                </span>
                <div className="flex items-center justify-center w-11 h-11 border border-white/[0.1] bg-white/[0.03] text-zinc-500 group-hover:text-[#C9A356] group-hover:border-[#C9A356]/30 transition-all duration-500">
                  {b.icon}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[13px] tracking-[0.2em] uppercase font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                    {b.title}
                  </h3>
                  <p className="text-[12px] leading-[1.9] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                    {b.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-white/[0.08] group-hover:w-full transition-all duration-700 delay-100" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* BOTTOM CTA STRIP                                    */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 py-16 md:py-20">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 50%,transparent 100%)" }}
          />
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600">Ready To Begin?</p>
              <h3 className="text-2xl md:text-3xl font-thin tracking-tight uppercase text-white">
                Start Your Valuation Today
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#valuation-form"
                className="group relative flex items-center gap-3 px-10 py-4 border border-white/50 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                <span className="relative z-10 group-hover:text-black transition-colors duration-200">Get a Valuation</span>
              </a>
              <a
                href="/#contact"
                className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300"
              >
                Contact Us →
              </a>
            </div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* AUTH MODAL                                          */}
        {/* ════════════════════════════════════════════════════ */}
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center px-6"
          style={{
            background:           "rgba(0,0,0,0.87)",
            backdropFilter:       "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            opacity:              showAuthModal ? 1 : 0,
            pointerEvents:        showAuthModal ? "auto" : "none",
            transition:           "opacity 0.25s ease",
          }}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="relative w-full max-w-sm border border-[#C9A356]/25 overflow-hidden"
            style={{
              background:           "rgba(6,6,6,0.98)",
              backdropFilter:       "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              transform:            showAuthModal ? "scale(1) translateY(0)" : "scale(0.96) translateY(10px)",
              transition:           "transform 0.32s cubic-bezier(0.22,0.68,0,1.2)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Gold top accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356] to-transparent" />
            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(201,163,86,0.07), transparent)" }}
              aria-hidden
            />

            <div className="relative px-8 pt-10 pb-8 flex flex-col items-center text-center gap-6">

              {/* Close button */}
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-white transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Lock icon */}
              <div
                className="w-14 h-14 border border-[#C9A356]/28 flex items-center justify-center"
                style={{ background: "rgba(201,163,86,0.04)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#C9A356]/55">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <p className="text-[8px] tracking-[0.65em] uppercase text-[#C9A356]/65">Access Required</p>
                <h3 className="text-[1.6rem] font-thin tracking-tight uppercase text-white leading-tight">
                  Sign In Required
                </h3>
                <p className="text-[12px] leading-[2] text-zinc-500 mt-1 max-w-[240px] mx-auto">
                  Please sign in or create an account before listing a vehicle.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col w-full gap-3 mt-1">
                <button
                  type="button"
                  onClick={handleAuth}
                  className="group relative w-full py-4 border border-white/40 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-200">Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={handleAuth}
                  className="group relative w-full py-4 border border-[#C9A356]/35 text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-[#C9A356]/60 transition-colors duration-500"
                >
                  <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ background: "rgba(201,163,86,0.07)", transitionTimingFunction: "cubic-bezier(0.22,0.68,0,1.2)" }} aria-hidden />
                  <span className="relative z-10 text-[#C9A356]">Register</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}
