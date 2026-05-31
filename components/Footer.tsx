"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────

const NAV_COLS = [
  {
    heading: "Navigate",
    links: [
      { label: "Home",      href: "/"          },
      { label: "Inventory", href: "/inventory" },
      { label: "About",     href: "/about"     },
      { label: "Contact",   href: "/contact"   },
    ],
  },
  {
    heading: "Collection",
    links: [
      { label: "Sports Cars",    href: "/inventory?category=sports" },
      { label: "Luxury Sedans",  href: "/inventory?category=sedan"  },
      { label: "SUVs",           href: "/inventory?category=suv"    },
      { label: "Electric",       href: "/inventory?category=ev"     },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Book a Test Drive", href: "/book-test-drive" },
      { label: "Vehicle Enquiry",   href: "/contact"         },
      { label: "WhatsApp Us",       href: "https://wa.me/971505550199" },
      { label: "Get Directions",    href: "https://maps.google.com"   },
    ],
  },
];

const CONTACT = [
  {
    label: "Phone",
    value: "+971 4 555 0199",
    href:  "tel:+97145550199",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "hello@makeenmotors.com",
    href:  "mailto:hello@makeenmotors.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Downtown Dubai, UAE",
    href:  "https://maps.google.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Hours",
    value: "Mon – Sat · 9:00 – 19:00",
    href:  null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>
      </svg>
    ),
  },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.24 4H21L14.9 11.07 22 20h-5.59l-4.13-5.6L7.16 20H4.4l6.49-7.43L3.5 4h5.73l3.73 5.07L18.24 4ZM17.3 18.35h1.55L7.8 5.59H6.15L17.3 18.35Z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="3"/>
        <path d="M7 10v7M7 7v.5M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/971505550199",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.4 5.2L2 22l4.9-1.3C8.4 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
        <path d="M9 10.5c.4 2.2 2.3 4 4.5 4.5"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="5" width="20" height="14" rx="3"/>
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

const LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use",   href: "#" },
  { label: "Cookie Policy",  href: "#" },
];

// ── Animation ─────────────────────────────────────────────────────

const EASE = [0.22, 0.68, 0, 1.2] as const;
const VIEWPORT = { once: true, margin: "-40px" };

const FADE = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const STAGGER = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ── Component ─────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/[0.06] overflow-hidden">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* Gold top accent */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.5),transparent)" }}
      />

      {/* Ambient gold glow — lower left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 70% at 0% 100%, rgba(201,163,86,0.04), transparent)" }} />

      {/* ── Top strip: wordmark + social ── */}
      <motion.div
        className="relative px-6 md:px-16 pt-12 md:pt-20 pb-10 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10 border-b border-white/[0.05]"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        {/* Brand block */}
        <motion.div variants={FADE} className="flex flex-col gap-5 max-w-xs">
          <Link href="/" className="group block w-fit">
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={200}
              height={50}
              className="h-12 w-auto transition-opacity duration-300 group-hover:opacity-75"
            />
          </Link>

          {/* Tagline */}
          <p className="text-[11px] leading-[1.95] text-zinc-600 max-w-[220px]">
            Dubai's premier destination for the world's most extraordinary vehicles.
          </p>

          {/* Est. badge */}
          <div className="flex items-center gap-3">
            <span className="block w-[8px] h-[8px] border border-[#C9A356]/40 rotate-45 shrink-0" />
            <span className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">
              Est. 2024 &nbsp;·&nbsp; Dubai, UAE
            </span>
          </div>
        </motion.div>

        {/* Social icons */}
        <motion.div variants={FADE} className="flex flex-col gap-4">
          <span className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">
            Follow Us
          </span>
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ y: -3, borderColor: "rgba(201,163,86,0.4)", color: "#C9A356" }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center justify-center w-10 h-10 border border-white/[0.08] bg-white/[0.03] text-zinc-500 hover:bg-white/[0.06] transition-colors duration-300"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main grid: nav columns + contact ── */}
      <motion.div
        className="relative px-6 md:px-16 py-10 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 border-b border-white/[0.05]"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={STAGGER}
      >
        {/* Navigation columns */}
        {NAV_COLS.map(({ heading, links }) => (
          <motion.div key={heading} variants={FADE} className="flex flex-col gap-5">
            <span className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">
              {heading}
            </span>
            <ul className="flex flex-col gap-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-zinc-500 hover:text-white transition-colors duration-300 w-fit"
                  >
                    <span className="block h-px bg-zinc-800 group-hover:bg-[#C9A356]/60 transition-all duration-300" style={{ width: "12px" }}
                      onMouseEnter={(e) => (e.currentTarget.style.width = "20px")}
                      onMouseLeave={(e) => (e.currentTarget.style.width = "12px")}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Contact column */}
        <motion.div variants={FADE} className="flex flex-col gap-5 col-span-2 md:col-span-1">
          <span className="text-[8px] tracking-[0.55em] uppercase text-zinc-700">
            Reach Us
          </span>
          <ul className="flex flex-col gap-4">
            {CONTACT.map(({ label, value, href, icon }) => {
              const content = (
                <div className="group flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 border border-white/[0.07] bg-white/[0.02] text-zinc-600 group-hover:text-[#C9A356] group-hover:border-[#C9A356]/25 transition-all duration-300 shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-700">{label}</span>
                    <span className="text-[11px] tracking-wide text-zinc-400 group-hover:text-white transition-colors duration-300 leading-snug">
                      {value}
                    </span>
                  </div>
                </div>
              );

              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.div>

      {/* ── Large background wordmark ── */}
      <div
        className="relative px-8 md:px-16 py-10 md:py-14 flex items-center justify-center overflow-hidden select-none pointer-events-none border-b border-white/[0.04]"
        aria-hidden
      >
        <motion.span
          className="text-[clamp(1.4rem,6vw,8rem)] font-black tracking-[0.06em] uppercase leading-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          MAKEEN MOTORS
        </motion.span>
        {/* Gold rule through the text */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(201,163,86,0.12),transparent)" }}
        />
      </div>

      {/* ── Bottom bar: copyright + legal ── */}
      <motion.div
        className="relative px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-[8px] tracking-[0.4em] uppercase text-zinc-800">
          © 2024 Makeen Motors LLC · All rights reserved · Dubai, UAE
        </span>

        <div className="flex items-center gap-1">
          {LEGAL.map(({ label, href }, i) => (
            <span key={label} className="flex items-center">
              {i > 0 && <span className="text-zinc-800 mx-2 text-[8px]">·</span>}
              <a
                href={href}
                className="text-[8px] tracking-[0.35em] uppercase text-zinc-800 hover:text-zinc-400 transition-colors duration-300"
              >
                {label}
              </a>
            </span>
          ))}
        </div>
      </motion.div>

    </footer>
  );
}
