"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

// ── Constants ────────────────────────────────────────────────────

const NAV = [
  { label: "Home",      href: "/"          },
  { label: "Cars",      href: "/inventory" },
  { label: "About",     href: "/#about"    },
  { label: "Contact",   href: "/contact"   },
];

const HOURS = [
  { day: "Monday – Friday",  time: "9:00 – 19:00" },
  { day: "Saturday",         time: "10:00 – 17:00" },
  { day: "Sunday",           time: "By Appointment" },
];

const CHANNELS = [
  {
    label: "Phone",
    value: "+971 4 555 0199",
    sub: "Direct line",
    href: "tel:+97145550199",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@makeenmotors.com",
    sub: "Response within 2 hrs",
    href: "mailto:hello@makeenmotors.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+971 50 555 0199",
    sub: "Fastest response",
    href: "https://wa.me/971505550199?text=Hello%20Makeen%20Motors%2C%20I%27d%20like%20to%20enquire%20about%20your%20collection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        <path d="M9 10.5c.4 2.2 2.3 4 4.5 4.5"/>
      </svg>
    ),
    accent: "#25D366",
  },
  {
    label: "Location",
    value: "Downtown Dubai, UAE",
    sub: "Near Dubai Mall",
    href: "https://maps.google.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
];

// ── Animation config ─────────────────────────────────────────────

const EASE     = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-60px" };

const FADE_UP = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.75, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ── Page ────────────────────────────────────────────────────────

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        .gold-line {
          background: linear-gradient(90deg, transparent, rgba(201,163,86,0.5), transparent);
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_0%_60%,rgba(201,163,86,0.025),transparent)]" />
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
                const active = label === "Contact";
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`relative text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 py-1 group ${
                      active ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[#C9A356] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <a
              href="https://wa.me/971505550199?text=Hello%20Makeen%20Motors%2C%20I%27d%20like%20to%20enquire%20about%20your%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#25D366]/30 text-[10px] tracking-[0.35em] uppercase text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-all duration-400"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                <path d="M9 10.5c.4 2.2 2.3 4 4.5 4.5"/>
              </svg>
              WhatsApp
            </a>

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

          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/95 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV.map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 55}ms` : "0ms" }}
                  className={`py-4 text-[11px] tracking-[0.4em] uppercase border-b border-white/[0.06] last:border-0 transition-all duration-300 ${
                    label === "Contact" ? "text-white" : "text-zinc-400 hover:text-white"
                  } ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ════════════════════════════════════════════════════ */}
        {/* ── HERO ── */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative pt-[73px] min-h-[52vh] flex flex-col justify-end overflow-hidden">

          {/* Ambient glow behind hero text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_80%,rgba(201,163,86,0.05),transparent)]" />
          <div className="gold-line absolute top-[73px] inset-x-0 h-px" />

          <div className="relative px-8 md:px-16 pt-20 pb-16 md:pb-20">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER}
            >
              {/* Label */}
              <motion.div variants={FADE_UP} className="flex items-center gap-4 mb-6">
                <motion.span
                  className="block h-px bg-zinc-700"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
                <span className="text-[9px] tracking-[0.6em] uppercase text-zinc-600">
                  Get In Touch
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div variants={FADE_UP}>
                <p className="text-[10px] tracking-[0.6em] uppercase mb-3" style={{ color: "rgba(201,163,86,0.8)" }}>
                  Makeen Motors
                </p>
                <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black tracking-tight leading-[0.85] uppercase">
                  Contact
                </h1>
                <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-thin tracking-[0.06em] leading-[0.85] uppercase text-zinc-600">
                  Us
                </h2>
              </motion.div>

              {/* Sub */}
              <motion.p
                variants={FADE_UP}
                className="mt-8 text-[13px] md:text-[15px] tracking-[0.1em] text-zinc-500 max-w-sm leading-[1.9]"
              >
                Our advisors are available to guide you through every step —
                from first enquiry to white-glove delivery.
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom rule */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.05]" />
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* ── CHANNELS STRIP ── */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 py-16 md:py-20">

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={STAGGER}
          >
            {CHANNELS.map(({ label, value, sub, href, icon, accent }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                variants={{
                  hidden:  { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
                }}
                whileHover={{
                  y: -6,
                  backgroundColor: "rgba(255,255,255,0.055)",
                  borderColor: accent ? `${accent}35` : "rgba(255,255,255,0.14)",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="glass group relative flex flex-col gap-5 p-6 overflow-hidden cursor-pointer"
              >
                {/* Hover top line */}
                <div
                  className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent ?? "rgba(255,255,255,0.3)"}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-11 h-11 border bg-white/[0.03] transition-all duration-400"
                  style={{
                    borderColor: accent ? `${accent}30` : "rgba(255,255,255,0.09)",
                    color: accent ?? "rgba(161,161,170,1)",
                  }}
                >
                  {icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[8px] tracking-[0.55em] uppercase font-medium"
                    style={{ color: accent ?? "#C9A356" }}
                  >
                    {label}
                  </span>
                  <span className="text-[13px] tracking-wide text-white leading-snug group-hover:text-zinc-100 transition-colors duration-300">
                    {value}
                  </span>
                  <span className="text-[10px] text-zinc-700 group-hover:text-zinc-500 transition-colors duration-300">
                    {sub}
                  </span>
                </div>

                {/* Arrow */}
                <span className="absolute bottom-5 right-5 text-zinc-800 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-300 text-[11px]">
                  →
                </span>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* ── FORM + SIDEBAR ── */}
        {/* ════════════════════════════════════════════════════ */}
        <section className="relative px-8 md:px-16 pb-24 md:pb-32">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-20">

            {/* ── Left: Form ── */}
            <div className="lg:col-span-2">

              <motion.div
                className="flex items-center gap-4 mb-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="text-[9px] tracking-[0.6em] uppercase text-[#C9A356]">
                  Send a Message
                </p>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE }}
                className="glass-deep p-8 md:p-10"
              >
                {/* Gold top accent */}
                <div className="gold-line h-px -mx-10 -mt-10 mb-10" />
                <ContactForm />
              </motion.div>
            </div>

            {/* ── Right: Sidebar ── */}
            <div className="lg:col-span-1 flex flex-col gap-6">

              {/* ── WhatsApp CTA ── */}
              <motion.a
                href="https://wa.me/971505550199?text=Hello%20Makeen%20Motors%2C%20I%27d%20like%20to%20enquire%20about%20your%20collection."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, ease: EASE }}
                whileHover={{ scale: 1.015, borderColor: "rgba(37,211,102,0.45)" }}
                className="group relative flex flex-col gap-5 p-7 border border-[#25D366]/20 overflow-hidden cursor-pointer transition-colors duration-500"
                style={{ background: "linear-gradient(135deg, rgba(37,211,102,0.04), rgba(37,211,102,0.01))" }}
              >
                <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, rgba(37,211,102,0.5), transparent)" }} />

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-11 h-11 border border-[#25D366]/25 bg-[#25D366]/[0.06]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1.25" strokeLinecap="round" className="w-5 h-5">
                      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
                      <path d="M9 10.5c.4 2.2 2.3 4 4.5 4.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.5em] uppercase font-medium text-[#25D366]">WhatsApp</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">Fastest response</p>
                  </div>
                </div>

                <p className="text-[13px] leading-[1.85] text-zinc-400">
                  Message us directly on WhatsApp for instant assistance — available 7 days a week.
                </p>

                <div className="flex items-center gap-2 text-[#25D366] text-[9px] tracking-[0.45em] uppercase group-hover:gap-3 transition-all duration-300">
                  Start Chat
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </motion.a>

              {/* ── Business hours ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                className="glass flex flex-col gap-6 p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 border border-white/[0.08] bg-white/[0.03] text-zinc-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="w-4 h-4">
                      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>
                    </svg>
                  </div>
                  <p className="text-[9px] tracking-[0.55em] uppercase text-[#C9A356]">Business Hours</p>
                </div>

                <div className="flex flex-col gap-3.5">
                  {HOURS.map(({ day, time }) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500">{day}</span>
                      <span className="text-[11px] tracking-wide text-zinc-300">{time}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/[0.06]" />

                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-600">
                    Currently Open
                  </span>
                </div>
              </motion.div>

              {/* ── Location ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
                className="glass flex flex-col gap-6 p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 border border-white/[0.08] bg-white/[0.03] text-zinc-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="w-4 h-4">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </div>
                  <p className="text-[9px] tracking-[0.55em] uppercase text-[#C9A356]">Our Showroom</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[13px] tracking-wide text-white">Downtown Dubai</p>
                  <p className="text-[11px] text-zinc-500 leading-[1.8]">
                    Near Dubai Mall<br />Dubai, United Arab Emirates
                  </p>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[9px] tracking-[0.45em] uppercase text-zinc-600 hover:text-white transition-colors duration-300"
                >
                  Get Directions
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>

              {/* ── Makeen promise ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
                className="flex flex-col gap-4 p-7 border border-[#C9A356]/15"
                style={{ background: "linear-gradient(135deg, rgba(201,163,86,0.05), rgba(201,163,86,0.01))" }}
              >
                <p className="text-[9px] tracking-[0.55em] uppercase text-[#C9A356]">Our Promise</p>
                <p className="text-[12px] leading-[1.95] text-zinc-500">
                  Every enquiry is handled by a dedicated advisor — not a call centre.
                  Expect a response within two business hours, and a concierge experience from first contact to final delivery.
                </p>
                <div className="flex items-center gap-2">
                  <span className="block w-[7px] h-[7px] border border-[#C9A356]/40 rotate-45 shrink-0" />
                  <span className="text-[8px] tracking-[0.45em] uppercase text-[#C9A356]/70">Makeen Certified Service</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════ */}
        {/* ── FOOTER ── */}
        {/* ════════════════════════════════════════════════════ */}
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
