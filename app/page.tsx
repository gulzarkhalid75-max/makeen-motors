"use client";

import { useState } from "react";

const NAV_LINKS = ["Home", "Cars", "About", "Contact"];

const CARS = [
  {
    id: "01",
    brand: "Lamborghini",
    model: "Revuelto",
    tagline: "1,001 HP · V12 Hybrid",
    description:
      "The most powerful Lamborghini V12 ever built. A hybrid powertrain that fuses raw combustion fury with instant electric torque.",
    price: "$517,000",
    accentColor: "#C9A356",
    glowColor: "rgba(201,163,86,0.18)",
    lineGradient:
      "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
  },
  {
    id: "02",
    brand: "Ferrari",
    model: "SF90 Stradale",
    tagline: "986 HP · Plug-In Hybrid",
    description:
      "The pinnacle of Ferrari road car engineering. Three electric motors and a twin-turbo V8 produce a seamless surge to 340 km/h.",
    price: "$625,000",
    accentColor: "#CC2B2B",
    glowColor: "rgba(204,43,43,0.18)",
    lineGradient:
      "linear-gradient(90deg,transparent,rgba(204,43,43,0.7),transparent)",
  },
  {
    id: "03",
    brand: "Porsche",
    model: "911 Turbo S",
    tagline: "650 HP · Twin-Turbo",
    description:
      "The definitive performance icon, perfected. A twin-turbocharged flat-six that redefines what a sports car can feel like.",
    price: "$233,000",
    accentColor: "#9AA3AD",
    glowColor: "rgba(154,163,173,0.14)",
    lineGradient:
      "linear-gradient(90deg,transparent,rgba(154,163,173,0.6),transparent)",
  },
];

const FEATURES = [
  {
    id: "01",
    title: "Premium Collection",
    description:
      "Curated selection of the world's most coveted vehicles, sourced and authenticated to the highest standard.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6.5 3H17.5L22 9L12 21.5L2 9L6.5 3Z" />
        <line x1="2" y1="9" x2="22" y2="9" />
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
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 8l10 6 10-6" />
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
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
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
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
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
      "MAKEEN MOTORS redefined what I thought a dealership could be. From the moment I enquired about the Revuelto to the white-glove delivery at my door, every interaction was flawless. They don't just sell cars — they curate experiences.",
    rating: 5,
  },
  {
    id: "02",
    name: "Layla Hassan",
    role: "Business Owner",
    location: "Abu Dhabi, UAE",
    review:
      "I have dealt with luxury dealers across Europe and the Gulf. None matched the level of discretion, knowledge, and care that the Makeen team brought to my SF90 acquisition. The 48-hour delivery promise is not marketing — it is a guarantee they keep.",
    rating: 5,
  },
  {
    id: "03",
    name: "Omar Saeed Al Rashid",
    role: "Automotive Enthusiast",
    location: "Riyadh, KSA",
    review:
      "The 911 Turbo S I purchased through Makeen is in perfect condition — every checkpoint verified, every detail immaculate. What impressed me most was their transparency. No hidden fees, no pressure. Just an honest, premium transaction.",
    rating: 5,
  },
];

const STORY_STATS = [
  { value: "500+", label: "Cars Sold"             },
  { value: "98%",  label: "Customer Satisfaction" },
  { value: "10+",  label: "Premium Brands"        },
];

const STATS = [
  { value: "2.9", unit: "sec",    label: "0 – 100 km/h"  },
  { value: "320", unit: "km/h",   label: "Top Speed"     },
  { value: "850", unit: "hp",     label: "Horsepower"    },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .anim-fade-up   { animation: fadeUp  0.9s cubic-bezier(.22,.68,0,1.2) forwards; opacity: 0; }
        .anim-fade-in   { animation: fadeIn  0.8s ease forwards;                         opacity: 0; }
        .anim-line-grow { animation: lineGrow 1s ease forwards; transform-origin: left;  transform: scaleX(0); }
        .btn-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .btn-fill:hover::after { transform: translateY(0); }
        .btn-fill:hover span  { color: #000; }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Background layers ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          {/* Soft centre glow — mimics a dramatic overhead light */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,255,255,0.055),transparent)]" />
          {/* Subtle architectural grid */}
          <div
            className="absolute inset-0 opacity-[0.028]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
          {/* Edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.75))]" />
        </div>

        {/* ── Navbar ── */}
        <header className="fixed inset-x-0 top-0 z-50">
          <div className="flex items-center justify-between px-6 md:px-14 py-5 bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.07]">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <span className="block w-[14px] h-[14px] border border-white rotate-45 shrink-0 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-zinc-400" />
              <span className="text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-300 group-hover:text-zinc-300">
                Makeen Motors
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-[10px] tracking-[0.35em] uppercase text-zinc-400 hover:text-white transition-colors duration-300 py-1 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <a
              href="#"
              className="hidden md:inline-flex items-center px-6 py-2.5 border border-white/30 text-[10px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-all duration-500 hover:border-white"
            >
              Enquire
            </a>

            {/* Hamburger */}
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

          {/* Mobile dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/85 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((item, i) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 text-zinc-400 hover:text-white transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {item}
                </a>
              ))}
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="mt-4 mb-2 text-center py-3 border border-white/30 text-[10px] tracking-[0.35em] uppercase text-zinc-300 hover:bg-white hover:text-black transition-all duration-500"
              >
                Enquire
              </a>
            </nav>
          </div>
        </header>

        {/* ── Hero ── */}
        <main className="relative min-h-screen flex flex-col px-8 md:px-16 pt-36 pb-0">

          {/* Origin badge */}
          <div className="flex items-center gap-4 anim-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-10 h-px bg-zinc-600 anim-line-grow" style={{ animationDelay: "0.4s" }} />
            <span className="text-[10px] tracking-[0.55em] uppercase text-zinc-600">
              Est. 2024 &nbsp;·&nbsp; Dubai, UAE
            </span>
          </div>

          {/* Headline block */}
          <div className="my-auto py-8">

            <p className="text-[10px] tracking-[0.65em] uppercase text-zinc-500 mb-5 anim-fade-up" style={{ animationDelay: "0.35s" }}>
              The Future Arrives
            </p>

            <div className="anim-fade-up overflow-hidden" style={{ animationDelay: "0.5s" }}>
              <h1 className="text-[clamp(5rem,16vw,16rem)] font-black tracking-tight leading-[0.8] uppercase select-none">
                Makeen
              </h1>
            </div>

            <div className="flex items-center gap-8 anim-fade-up overflow-hidden" style={{ animationDelay: "0.65s" }}>
              <h2 className="text-[clamp(5rem,16vw,16rem)] font-thin tracking-[0.07em] leading-[0.8] uppercase text-zinc-600 select-none">
                Motors
              </h2>
              <div className="hidden lg:block flex-1 h-px bg-zinc-800" />
            </div>

            <p
              className="mt-8 text-[13px] md:text-[15px] tracking-[0.12em] text-zinc-500 max-w-xs md:max-w-sm leading-[1.9] anim-fade-up"
              style={{ animationDelay: "0.8s" }}
            >
              Where precision engineering<br />
              meets the art of motion.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-8 mt-10 anim-fade-up" style={{ animationDelay: "0.95s" }}>
              <button className="btn-fill relative px-8 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500">
                <span className="relative z-10 transition-colors duration-200">Explore Collection</span>
              </button>
              <button className="group flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300">
                Book a Drive
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </button>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="mt-auto anim-fade-up" style={{ animationDelay: "1.15s" }}>
            <div className="border-t border-zinc-900 grid grid-cols-3 divide-x divide-zinc-900">
              {STATS.map(({ value, unit, label }) => (
                <div
                  key={label}
                  className="group px-5 py-8 md:px-10 flex flex-col gap-1.5 hover:bg-white/[0.025] transition-colors duration-500 cursor-default"
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-5xl font-thin tabular-nums leading-none tracking-tight text-white">
                      {value}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
                      {unit}
                    </span>
                  </div>
                  <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom strip */}
            <div className="border-t border-zinc-900 px-5 md:px-10 py-5 flex items-center justify-between">
              <span className="text-[9px] text-zinc-800 tracking-[0.4em] uppercase">© 2024 Makeen Motors LLC</span>
              <span className="text-[9px] text-zinc-800 tracking-[0.4em] uppercase hidden md:block">
                Dubai &nbsp;·&nbsp; Abu Dhabi &nbsp;·&nbsp; Riyadh
              </span>
            </div>
          </div>
        </main>

        {/* ── Featured Cars ── */}
        <section className="relative px-8 md:px-16 py-24 md:py-32">

          {/* Section header */}
          <div className="flex items-end justify-between mb-14 md:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">
                The Collection
              </p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                Featured Models
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group mb-1"
            >
              View All
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CARS.map((car) => (
              <div
                key={car.id}
                className="group flex flex-col bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] hover:border-white/[0.14] transition-all duration-500 hover:-translate-y-2.5 cursor-pointer overflow-hidden"
              >
                {/* ── Image area ── */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Scalable inner wrapper for hover zoom */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    {/* Dark base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
                    {/* Brand glow — bottom centre */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse 80% 65% at 50% 115%, ${car.glowColor}, transparent)`,
                      }}
                    />
                    {/* Outer concentric diamond */}
                    <div
                      className="absolute w-52 h-52 border border-white/[0.035] rotate-45 left-1/2 top-1/2"
                      style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
                    />
                    {/* Inner concentric diamond */}
                    <div
                      className="absolute w-32 h-32 border border-white/[0.04] rotate-45 left-1/2 top-1/2"
                      style={{ transform: "translate(-50%,-50%) rotate(45deg)" }}
                    />
                    {/* Faded card number */}
                    <span
                      className="absolute right-4 bottom-2 text-[7rem] font-black leading-none select-none pointer-events-none"
                      style={{ color: `${car.accentColor}0a` }}
                    >
                      {car.id}
                    </span>
                  </div>
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: car.lineGradient }}
                  />
                  {/* Hover overlay shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.025),transparent)]" />
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 p-7 gap-4">
                  {/* Brand badge */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[9px] tracking-[0.55em] uppercase font-semibold"
                      style={{ color: car.accentColor }}
                    >
                      {car.brand}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-700">
                      {car.tagline}
                    </span>
                  </div>

                  {/* Model name */}
                  <h3 className="text-2xl md:text-3xl font-thin tracking-wide text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300">
                    {car.model}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] leading-[1.85] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300 flex-1">
                    {car.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06]" />

                  {/* Price + CTA row */}
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
                        From
                      </span>
                      <p className="text-lg font-light tracking-wide text-white mt-1">
                        {car.price}
                      </p>
                    </div>
                    <button
                      className="group/cta flex items-center gap-1.5 text-[9px] tracking-[0.45em] uppercase pb-0.5 border-b border-transparent hover:border-current transition-all duration-300"
                      style={{ color: car.accentColor }}
                    >
                      Discover
                      <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "View All" */}

          <div className="mt-10 flex justify-center md:hidden">
            <a
              href="#"
              className="flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 group"
            >
              View All Models
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>

        {/* ── Why Choose Makeen Motors ── */}
        <section className="relative px-8 md:px-16 py-24 md:py-32 border-t border-zinc-900/60">

          {/* Background accent — faint centre glow for this section */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.022), transparent)",
            }}
          />

          {/* Section header */}
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">
                Our Promise
              </p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                Why Makeen Motors
              </h2>
            </div>
            <p className="text-[12px] leading-[1.9] text-zinc-600 max-w-xs md:text-right">
              From first enquiry to final delivery,<br />
              every detail is handled with precision.
            </p>
          </div>

          {/* Cards grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
            {FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="group relative flex flex-col gap-8 bg-black p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-white/[0.03] cursor-default"
              >
                {/* Hover top-border sweep */}
                <div className="absolute top-0 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-500" />

                {/* Card number */}
                <span className="absolute top-8 right-8 text-[10px] tracking-[0.4em] uppercase text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300 select-none">
                  {feat.id}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center w-11 h-11 border border-white/[0.1] bg-white/[0.03] text-zinc-400 group-hover:text-white group-hover:border-white/[0.2] group-hover:bg-white/[0.06] transition-all duration-500">
                  {feat.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[13px] tracking-[0.2em] uppercase font-medium text-white/90 group-hover:text-white transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-[12px] leading-[1.9] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom fade-in line on hover */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-white/[0.08] group-hover:w-full transition-all duration-700 delay-100" />
              </div>
            ))}
          </div>

        </section>

        {/* ── Our Story ── */}
        <section className="relative px-8 md:px-16 py-24 md:py-36 border-t border-zinc-900/60 overflow-hidden">

          {/* Faint diagonal fill to visually separate this section */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.012) 0%, transparent 50%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

            {/* ── Left: badge · heading · CTA ── */}
            <div className="flex flex-col gap-10">

              {/* Badge */}
              <div className="flex items-center gap-3">
                <span className="block w-[10px] h-[10px] border border-white/40 rotate-45 shrink-0" />
                <span className="text-[10px] tracking-[0.55em] uppercase text-zinc-500">
                  Est. 2024 &nbsp;·&nbsp; Our Story
                </span>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-black tracking-tight leading-[0.85] uppercase select-none">
                  Beyond
                </h2>
                <h2 className="text-[clamp(3.2rem,7vw,7.5rem)] font-thin tracking-[0.06em] leading-[0.85] uppercase text-zinc-600 select-none">
                  Ordinary
                </h2>
              </div>

              {/* Eyebrow quote */}
              <p className="text-[11px] tracking-[0.25em] uppercase text-zinc-600 leading-loose border-l border-zinc-800 pl-5">
                Precision. Performance.<br />The future of driving — now.
              </p>

              {/* CTA */}
              <div>
                <button className="btn-fill relative px-8 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500">
                  <span className="relative z-10 transition-colors duration-200">
                    Discover Our Vision
                  </span>
                </button>
              </div>
            </div>

            {/* ── Right: story paragraph · stats ── */}
            <div className="flex flex-col gap-10">

              {/* Story text */}
              <div className="flex items-start gap-6">
                {/* Vertical accent line */}
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

              {/* Divider */}
              <div className="h-px bg-zinc-900" />

              {/* Story stats */}
              <div className="grid grid-cols-3 divide-x divide-zinc-900">
                {STORY_STATS.map(({ value, label }) => (
                  <div
                    key={label}
                    className="group flex flex-col gap-2 px-6 first:pl-0 cursor-default"
                  >
                    <span className="text-3xl md:text-4xl font-thin tracking-tight tabular-nums leading-none text-white">
                      {value}
                    </span>
                    <span className="text-[9px] tracking-[0.38em] uppercase text-zinc-700 group-hover:text-zinc-400 transition-colors duration-300 leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="relative px-8 md:px-16 py-24 md:py-32 border-t border-zinc-900/60">

          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(255,255,255,0.025), transparent)",
            }}
          />

          {/* Section header */}
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">
                Client Voices
              </p>
              <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
                What They Say
              </h2>
            </div>
            {/* Aggregate rating badge */}
            <div className="flex items-center gap-4 md:mb-1">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 12 12" className="w-3 h-3 fill-white/80">
                    <path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.5 3.22 9.03l.53-3.09L1.5 3.75l3.1-.45L6 .5z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500">
                5.0 &nbsp;·&nbsp; 200+ Reviews
              </span>
            </div>
          </div>

          {/* Cards grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="group relative flex flex-col gap-7 bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/[0.13] hover:bg-white/[0.05]"
              >
                {/* Hover top sweep */}
                <div className="absolute top-0 left-0 h-px w-0 bg-white/60 group-hover:w-full transition-all duration-500" />

                {/* Quote mark */}
                <span
                  className="absolute top-6 right-7 text-[4.5rem] font-black leading-none select-none text-white/[0.04] group-hover:text-white/[0.07] transition-colors duration-500"
                  aria-hidden
                >
                  "
                </span>

                {/* Stars */}
                <div className="flex gap-1.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white/70 group-hover:fill-white transition-colors duration-300" style={{ transitionDelay: `${i * 40}ms` }}>
                      <path d="M6 .5l1.4 2.8 3.1.45-2.25 2.19.53 3.09L6 7.5 3.22 9.03l.53-3.09L1.5 3.75l3.1-.45L6 .5z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[13px] leading-[1.95] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 flex-1">
                  "{t.review}"
                </p>

                {/* Divider */}
                <div className="h-px bg-white/[0.06]" />

                {/* Customer info */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="relative flex items-center justify-center w-10 h-10 border border-white/[0.1] bg-white/[0.04] shrink-0 group-hover:border-white/[0.2] transition-colors duration-300">
                    <span className="text-[13px] font-light text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 select-none">
                      {t.name.charAt(0)}
                    </span>
                    {/* Corner tick */}
                    <span className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-white/30" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-white/90 truncate">
                      {t.name}
                    </span>
                    <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                      {t.role} &nbsp;·&nbsp; {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ── Contact ── */}
        <section className="relative px-8 md:px-16 py-24 md:py-32 border-t border-zinc-900/60">

          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.02), transparent)",
            }}
          />

          {/* Section header */}
          <div className="relative mb-16 md:mb-20">
            <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-6xl font-thin tracking-tight uppercase leading-none">
              Contact Us
            </h2>
          </div>

          {/* Two-column: info + form */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

            {/* ── Left: contact info ── */}
            <div className="flex flex-col gap-10">
              <p className="text-[13px] leading-[2.1] text-zinc-500 max-w-sm">
                Whether you are searching for your next acquisition or require
                bespoke assistance, our advisors are ready to guide you — with
                the discretion and expertise our clients deserve.
              </p>

              <div className="flex flex-col gap-6">
                {CONTACT_INFO.map(({ label, value, icon }) => (
                  <div key={label} className="group flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 border border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-white group-hover:border-white/[0.18] transition-all duration-300 shrink-0">
                      {icon}
                    </div>
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-[9px] tracking-[0.5em] uppercase text-zinc-700">
                        {label}
                      </span>
                      <span className="text-[13px] tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name",  label: "Full Name",    type: "text",  placeholder: "Khalid Al Mansouri" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "hello@example.com"  },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label
                      htmlFor={id}
                      className="text-[9px] tracking-[0.5em] uppercase text-zinc-600"
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      className="h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-white/[0.25] focus:bg-white/[0.06] transition-all duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-[9px] tracking-[0.5em] uppercase text-zinc-600"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+971 50 000 0000"
                  className="h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-white/[0.25] focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-[9px] tracking-[0.5em] uppercase text-zinc-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us which model you are interested in, or how we can assist you…"
                  className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-white/[0.25] focus:bg-white/[0.06] transition-all duration-300 resize-none leading-relaxed"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-fill relative w-full sm:w-auto px-10 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                >
                  <span className="relative z-10 transition-colors duration-200">
                    Send Enquiry
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative border-t border-zinc-900">

          {/* Main footer body */}
          <div className="px-8 md:px-16 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="flex flex-col gap-6 md:col-span-1">
              <a href="#" className="flex items-center gap-3 group w-fit">
                <span className="block w-[14px] h-[14px] border border-white rotate-45 shrink-0 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-zinc-400" />
                <span className="text-[11px] tracking-[0.4em] uppercase font-medium transition-colors duration-300 group-hover:text-zinc-300">
                  Makeen Motors
                </span>
              </a>
              <p className="text-[12px] leading-[1.95] text-zinc-600 max-w-[240px]">
                A premium automotive destination in Dubai — curating the world's
                finest vehicles for those who demand only the extraordinary.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 pt-1">
                {SOCIAL_LINKS.map(({ label, icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex items-center justify-center w-8 h-8 border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:text-white hover:border-white/[0.22] hover:bg-white/[0.06] transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-5">
              <span className="text-[9px] tracking-[0.55em] uppercase text-zinc-700">
                Quick Links
              </span>
              <ul className="flex flex-col gap-3.5">
                {NAV_LINKS.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 w-fit"
                    >
                      <span className="block w-3 h-px bg-zinc-800 group-hover:w-5 group-hover:bg-white transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact summary */}
            <div className="flex flex-col gap-5">
              <span className="text-[9px] tracking-[0.55em] uppercase text-zinc-700">
                Reach Us
              </span>
              <ul className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ label, value }) => (
                  <li key={label} className="flex flex-col gap-0.5">
                    <span className="text-[9px] tracking-[0.45em] uppercase text-zinc-700">
                      {label}
                    </span>
                    <span className="text-[12px] text-zinc-500 tracking-wide">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-zinc-900 px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">
              © 2024 Makeen Motors LLC · All rights reserved
            </span>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[9px] tracking-[0.35em] uppercase text-zinc-800 hover:text-zinc-500 transition-colors duration-300"
                >
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
