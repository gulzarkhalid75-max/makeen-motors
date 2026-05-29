"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import ExperienceSection from "@/components/ExperienceSection";
import MostWanted from "@/components/MostWanted";

// ── Data ────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "01",
    title: "Premium Collection",
    description:
      "Curated selection of the world's most coveted vehicles, sourced and authenticated to the highest standard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6.5 3H17.5L22 9L12 21.5L2 9L6.5 3Z" /><line x1="2" y1="9" x2="22" y2="9" />
        <path d="M12 3L8.5 9L12 21.5L15.5 9L12 3Z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Certified Quality",
    description:
      "Every vehicle passes a rigorous 200-point inspection by factory-trained technicians before it reaches you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L4 5.5V12C4 16.4 7.5 20.4 12 22C16.5 20.4 20 16.4 20 12V5.5L12 2Z" />
        <polyline points="8.5,12.5 10.5,14.5 15.5,9.5" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Fast Delivery",
    description:
      "White-glove concierge delivery anywhere in the UAE within 48 hours — on your terms, on your timeline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M13.5 2.5L5 13H11.5L10 21.5L19 11H12.5L13.5 2.5Z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "24/7 Support",
    description:
      "Dedicated personal advisors available around the clock — because exceptional service never sleeps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 4C7.6 4 4 7.6 4 12V17C4 17.6 4.4 18 5 18H7C7.6 18 8 17.6 8 17V14C8 13.4 7.6 13 7 13H5V12C5 8.1 8.1 5 12 5C15.9 5 19 8.1 19 12V13H17C16.4 13 16 13.4 16 14V17C16 17.6 16.4 18 17 18H19C19.6 18 20 17.6 20 17V12C20 7.6 16.4 4 12 4Z" />
      </svg>
    ),
  },
];

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+971 4 555 0199",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@makeenmotors.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 8l10 6 10-6" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Downtown Dubai, UAE",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Business Hours",
    value: "Mon – Sat · 9:00 – 19:00",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

const SOCIAL_LINKS = [
  {
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M18.24 4H21L14.9 11.07 22 20h-5.59l-4.13-5.6L7.16 20H4.4l6.49-7.43L3.5 4h5.73l3.73 5.07L18.24 4ZM17.3 18.35h1.55L7.8 5.59H6.15L17.3 18.35Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M7 10v7M7 7v.5M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M9 10.5c.4 2.2 2.3 4 4.5 4.5" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    id: "01",
    name: "Khalid Al Mansouri",
    role: "Serial Entrepreneur",
    location: "Dubai, UAE",
    review:
      "MAKEEN MOTORS redefined what I thought a dealership could be. From the moment I enquired about the Revuelto to the white-glove delivery at my door, every interaction was flawless.",
    rating: 5,
  },
  {
    id: "02",
    name: "Layla Hassan",
    role: "Business Owner",
    location: "Abu Dhabi, UAE",
    review:
      "I have dealt with luxury dealers across Europe and the Gulf. None matched the level of discretion, knowledge, and care that the Makeen team brought to my SF90 acquisition.",
    rating: 5,
  },
  {
    id: "03",
    name: "Omar Saeed Al Rashid",
    role: "Automotive Enthusiast",
    location: "Riyadh, KSA",
    review:
      "The 911 Turbo S I purchased through Makeen is in perfect condition — every detail immaculate. No hidden fees, no pressure. Just an honest, premium transaction.",
    rating: 5,
  },
];

const STORY_STATS = [
  { value: "500+", label: "Cars Sold"             },
  { value: "98%",  label: "Customer Satisfaction" },
  { value: "10+",  label: "Premium Brands"        },
];

const FOOTER_NAV = [
  { label: "Home",      href: "/"          },
  { label: "Cars",      href: "/inventory" },
  { label: "About",     href: "/#about"    },
  { label: "Contact",   href: "/#contact"  },
];

// ── Popular brands (public/images/logo — confirmed paths) ────────

const POPULAR_BRANDS = [
  { name: "Mercedes-Benz", logo: "/images/logo/mercedes-benz-car-logo-brand-png-3.png",                                                                                                           href: "/inventory"               },
  { name: "Porsche",       logo: "/images/logo/porsche-logo-elegant-porsche-luxury-car-logo-Lr25XDNq_t.jpg",                                                                                     href: "/inventory?brand=Porsche"  },
  { name: "Audi",          logo: "/images/logo/audi-a3-car-emblem-logo-audi-car-logo-png-brand-image.jpg",                                                                                        href: "/inventory"               },
  { name: "Lamborghini",   logo: "/images/logo/lamborghini-urus-car-audi-logo-lamborghini.jpg",                                                                                                    href: "/inventory"               },
  { name: "Jaguar",        logo: "/images/logo/jaguar-car-logo-png-701751694709228ntwu17ok7u.png",                                                                                                 href: "/inventory"               },
  { name: "Tesla",         logo: "/images/logo/kisspng-tesla-motors-car-tesla-semi-electric-vehicle-nikola-tesla-treasury-5b296403c92f99.5658832215294392358241.jpg",                            href: "/inventory?brand=Tesla"    },
  { name: "Volkswagen",    logo: "/images/logo/Volkswagen-logo-1.png",                                                                                                                             href: "/inventory"               },
];

// ── Animation config ────────────────────────────────────────────

const EASE = [0.22, 0.68, 0, 1.2] as const;

const FADE_UP = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const STAGGER_FAST = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const CARD = {
  hidden:  { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

const VIEWPORT    = { once: true, margin: "-80px" };
const SILVER_GLOW = "0 20px 50px rgba(255,255,255,0.06), 0 4px 16px rgba(255,255,255,0.04)";

// ── Page ────────────────────────────────────────────────────────

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [searchFilter, setSearchFilter] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        /* ── Loader bar ── */
        @keyframes loaderLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .loader-line {
          transform-origin: left;
          animation: loaderLine 1.85s cubic-bezier(.4,0,.2,1) forwards;
        }

        /* ── Fill button ── */
        .btn-fill {
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .btn-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.48s cubic-bezier(.22,.68,0,1.2);
        }
        .btn-fill:hover::after { transform: translateY(0); }
        .btn-fill:hover span   { color: #000; }

        /* ── Ghost button ── */
        .btn-ghost {
          position: relative;
          transition: color 0.3s ease;
        }
        .btn-ghost::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, rgba(201,163,86,0.8), rgba(201,163,86,0.2));
          transition: width 0.4s cubic-bezier(.22,.68,0,1.2);
        }
        .btn-ghost:hover::after { width: 100%; }
        .btn-ghost:hover { color: rgba(201,163,86,0.9); }

        /* ── Section gradient divider ── */
        .grad-border-t {
          position: relative;
        }
        .grad-border-t::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 80%, transparent 100%);
        }

        /* ── Hide scrollbar (horizontal scroll sections) ── */
        .scroll-hide::-webkit-scrollbar { display: none; }
        .scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Luxury page loader ── */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 0.68, 0, 1.2], delay: 0.1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={160}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </motion.div>
            <motion.div
              className="mt-10 w-36 h-px bg-white/[0.06] overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div
                className="absolute inset-y-0 left-0 w-full loader-line"
                style={{ background: "linear-gradient(90deg, rgba(201,163,86,0.8) 0%, rgba(255,255,255,0.9) 50%, rgba(201,163,86,0.6) 100%)" }}
              />
            </motion.div>
            <motion.p
              className="mt-5 text-[9px] tracking-[0.6em] uppercase"
              style={{ color: "rgba(201,163,86,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Dubai, UAE
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Global background layers ── */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_50%_at_0%_40%,rgba(201,163,86,0.025),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_50%_at_100%_60%,rgba(201,163,86,0.02),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.7))]" />
      </div>

      {/* ── Layout: fixed sidebar + mobile navbar ── */}
      <Sidebar />
      <Navbar />

      {/* ── Main content (offset by sidebar on lg+) ── */}
      <div className="lg:ml-[280px]">

        {/* Hero */}
        <Hero />

        {/* ── Premium Vehicle Search ── */}
        <section className="relative px-8 md:px-16 py-12 md:py-16 -mt-2 z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div
              className="relative border border-white/[0.1] p-7 md:p-10 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 60%, rgba(201,163,86,0.015) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Gold top line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent" />
              {/* Corner accents */}
              <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#C9A356]/25" aria-hidden />
              <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#C9A356]/25" aria-hidden />
              <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/[0.05]" aria-hidden />
              <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/[0.05]" aria-hidden />

              <div className="relative flex flex-col gap-6">
                {/* Label */}
                <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">Find Your Vehicle</p>

                {/* Search input */}
                <div className="relative group/search">
                  <input
                    type="text"
                    placeholder="Search by brand, model, or specification…"
                    className="w-full bg-white/[0.04] border border-white/[0.09] pl-5 pr-14 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/35 focus:bg-white/[0.06] transition-all duration-300"
                    style={{ height: "52px" }}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/search:text-[#C9A356] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="w-[18px] h-[18px]">
                      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                </div>

                {/* Vehicle type filter pills */}
                <div className="flex gap-2 flex-wrap">
                  {["All", "SUV", "Sedan", "Coupe", "Supercar", "Electric"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchFilter(type)}
                      className={`px-4 py-2 text-[9px] tracking-[0.4em] uppercase border transition-all duration-300 ${
                        searchFilter === type
                          ? "border-[#C9A356]/55 bg-[#C9A356]/10 text-[#C9A356]"
                          : "border-white/[0.08] bg-transparent text-zinc-600 hover:border-white/[0.14] hover:text-zinc-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured vehicles */}
        <FeaturedVehicles />

        {/* ── Popular Brands ── */}
        <section className="relative px-8 md:px-16 py-16 md:py-20">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 20%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 80%,transparent 100%)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ background: "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(201,163,86,0.025), transparent)" }}
          />

          {/* Section header */}
          <motion.div
            className="flex items-end justify-between mb-10 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[9px] tracking-[0.6em] uppercase text-zinc-700 mb-2">Browse By Brand</p>
              <h2 className="text-3xl md:text-4xl font-thin tracking-tight uppercase leading-none">
                Popular Brands
              </h2>
            </div>
            <a
              href="/inventory"
              className="hidden md:flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group mb-1"
            >
              View All
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Brand cards — horizontal scroll on mobile, responsive grid on desktop */}
          <motion.div
            className="flex gap-3 overflow-x-auto pb-2 scroll-hide snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-7 md:overflow-visible md:gap-3 md:pb-0"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER_FAST}
          >
            {POPULAR_BRANDS.map((brand) => (
              <motion.a
                key={brand.name}
                href={brand.href}
                variants={CARD}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(201,163,86,0.3)",
                  backgroundColor: "rgba(201,163,86,0.03)",
                }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                className="group relative shrink-0 w-[90px] snap-center md:w-auto flex flex-col items-center gap-2.5 py-5 px-2 border border-white/[0.06] bg-white/[0.018] overflow-hidden cursor-pointer"
              >
                {/* Gold top line reveal */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.65),transparent)" }}
                />

                {/* Logo */}
                <div className="flex items-center justify-center h-9 w-full">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={56}
                    height={28}
                    className="h-6 w-auto max-w-[52px] object-contain opacity-40 group-hover:opacity-85 group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Brand name */}
                <span className="text-[7px] tracking-[0.28em] uppercase text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 text-center leading-tight w-full truncate">
                  {brand.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Choose your experience */}
        <ExperienceSection />

        {/* Most wanted */}
        <MostWanted />

        {/* ── Why Choose Makeen Motors ── */}
        <section id="about" className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.018), transparent)" }}
          />

          <motion.div
            className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Our Promise</p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                Why Makeen Motors
              </h2>
            </div>
            <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
              From first enquiry to final delivery,<br />every detail is handled with precision.
            </p>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER_FAST}
          >
            {FEATURES.map((feat) => (
              <motion.div
                key={feat.id}
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
                  {feat.id}
                </span>
                <div className="flex items-center justify-center w-11 h-11 border border-white/[0.1] bg-white/[0.03] text-zinc-400 group-hover:text-[#C9A356] group-hover:border-[#C9A356]/30 transition-all duration-500">
                  {feat.icon}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[13px] tracking-[0.2em] uppercase font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-[12px] leading-[1.9] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                    {feat.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-white/[0.08] group-hover:w-full transition-all duration-700 delay-100" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Our Story ── */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-36 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ background: "linear-gradient(135deg, rgba(201,163,86,0.015) 0%, transparent 50%)" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
            <motion.div
              className="flex flex-col gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={FADE_UP}
            >
              <div className="flex items-center gap-3">
                <span className="block w-[10px] h-[10px] border border-[#C9A356]/40 rotate-45 shrink-0" />
                <span className="text-[10px] tracking-[0.55em] uppercase text-zinc-500">
                  Est. 2024 &nbsp;·&nbsp; Our Story
                </span>
              </div>
              <div>
                <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-black tracking-tight leading-[0.85] uppercase select-none">
                  Beyond
                </h2>
                <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-thin tracking-[0.06em] leading-[0.85] uppercase text-zinc-600 select-none">
                  Ordinary
                </h2>
              </div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 leading-loose border-l border-zinc-800 pl-5">
                Precision. Performance.<br />The future of driving — now.
              </p>
              <div>
                <button className="btn-fill relative px-8 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500">
                  <span className="relative z-10 transition-colors duration-200">Discover Our Vision</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={FADE_UP}
            >
              <div className="flex items-start gap-6">
                <div className="mt-1.5 w-px self-stretch bg-gradient-to-b from-zinc-600 via-zinc-800 to-transparent shrink-0" />
                <p className="text-[13px] md:text-[14px] leading-[2.1] text-zinc-500">
                  Founded in Dubai in 2024, MAKEEN MOTORS was built on a single belief:
                  that acquiring a world-class vehicle should feel as extraordinary as driving one.
                  <br /><br />
                  We curate only the finest machines from the world's most prestigious manufacturers —
                  each hand-selected, certified, and delivered with the precision our name demands.
                  Our collection is not simply inventory. It is a statement.
                  <br /><br />
                  Every car carries a story. We are here to help you write yours.
                </p>
              </div>
              <div className="h-px bg-zinc-900" />
              <div className="grid grid-cols-3 divide-x divide-zinc-900">
                {STORY_STATS.map(({ value, label }) => (
                  <div key={label} className="group flex flex-col gap-2 px-6 first:pl-0 cursor-default">
                    <span className="text-3xl md:text-4xl font-thin tracking-tight tabular-nums leading-none text-white">
                      {value}
                    </span>
                    <span className="text-[9px] tracking-[0.38em] uppercase text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ background: "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(255,255,255,0.022), transparent)" }}
          />

          <motion.div
            className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <div>
              <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Client Voices</p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">What They Say</h2>
            </div>
            <div className="flex items-center gap-4 md:mb-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-white/80">
                    <path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.5 3.22 9.03l.53-3.09L1.5 3.75l3.1-.45L6 .5z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">5.0 &nbsp;·&nbsp; 200+ Reviews</span>
            </div>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={CARD}
                whileHover={{
                  y: -8,
                  boxShadow: SILVER_GLOW,
                  borderColor: "rgba(255,255,255,0.14)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="glass-shine group relative flex flex-col gap-7 bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] p-8"
              >
                <div className="absolute top-0 left-0 h-px w-0 bg-[#C9A356]/50 group-hover:w-full transition-all duration-500" />
                <span className="absolute top-6 right-7 text-[4.5rem] font-black leading-none select-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500" aria-hidden>
                  "
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-[#C9A356]/60 group-hover:fill-[#C9A356] transition-colors duration-300" style={{ transitionDelay: `${i * 40}ms` }}>
                      <path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.5 3.22 9.03l.53-3.09L1.5 3.75l3.1-.45L6 .5z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] leading-[1.95] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 flex-1">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-10 h-10 border border-white/[0.1] bg-white/[0.04] shrink-0 group-hover:border-[#C9A356]/30 transition-colors duration-300">
                    <span className="text-[13px] font-light text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 select-none">
                      {t.name.charAt(0)}
                    </span>
                    <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-white/30" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-white/90 truncate">{t.name}</span>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                      {t.role} &nbsp;·&nbsp; {t.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="relative grad-border-t px-8 md:px-16 py-24 md:py-32">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.018), transparent)" }}
          />

          <motion.div
            className="relative mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={FADE_UP}
          >
            <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">Contact Us</h2>
          </motion.div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
            <div className="flex flex-col gap-10">
              <p className="text-[13px] leading-[2.1] text-zinc-500 max-w-sm">
                Whether you are searching for your next acquisition or require
                bespoke assistance, our advisors are ready to guide you — with
                the discretion and expertise our clients deserve.
              </p>
              <div className="flex flex-col gap-6">
                {CONTACT_INFO.map(({ label, value, icon }) => (
                  <div key={label} className="group flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 border border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-[#C9A356] group-hover:border-[#C9A356]/25 transition-all duration-300 shrink-0">
                      {icon}
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">{label}</span>
                      <span className="text-[13px] tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name",  label: "Full Name",     type: "text",  placeholder: "Khalid Al Mansouri" },
                  { id: "email", label: "Email Address",  type: "email", placeholder: "hello@example.com"  },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label htmlFor={id} className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">{label}</label>
                    <input
                      id={id} type={type} placeholder={placeholder}
                      className="h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/30 focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Phone Number</label>
                <input
                  id="phone" type="tel" placeholder="+971 50 000 0000"
                  className="h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/30 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Message</label>
                <textarea
                  id="message" rows={5}
                  placeholder="Tell us which model you are interested in, or how we can assist you…"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/30 focus:bg-white/[0.06] transition-all duration-300 resize-none leading-relaxed"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-fill relative w-full sm:w-auto px-10 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="relative z-10 transition-colors duration-200">Send Enquiry</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative border-t border-zinc-900">
          <div className="px-8 md:px-16 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col gap-6 md:col-span-1">
              <a href="/" className="group w-fit">
                <Image
                  src="/images/logo/makeen%20logo.PNG"
                  alt="Makeen Motors"
                  width={140}
                  height={36}
                  className="h-7 w-auto opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
              <p className="text-[12px] leading-[1.95] text-zinc-600 max-w-[240px]">
                A premium automotive destination in Dubai — curating the world's
                finest vehicles for those who demand only the extraordinary.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {SOCIAL_LINKS.map(({ label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex items-center justify-center w-8 h-8 border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-white hover:border-[#C9A356]/30 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-[9px] tracking-[0.55em] uppercase text-zinc-700">Quick Links</span>
              <ul className="flex flex-col gap-3.5">
                {FOOTER_NAV.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 w-fit"
                    >
                      <span className="block w-3 h-px bg-zinc-800 group-hover:w-5 group-hover:bg-[#C9A356]/60 transition-all duration-300" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-[9px] tracking-[0.55em] uppercase text-zinc-700">Reach Us</span>
              <ul className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ label, value }) => (
                  <li key={label} className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">{label}</span>
                    <span className="text-[12px] text-zinc-500 tracking-wide">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-900 px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">
              © 2024 Makeen Motors LLC · All rights reserved
            </span>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use"].map((link) => (
                <a key={link} href="#" className="text-[9px] tracking-[0.35em] uppercase text-zinc-800 hover:text-zinc-500 transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
