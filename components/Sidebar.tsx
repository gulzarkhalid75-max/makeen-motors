"use client";

import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Home",      href: "/"          },
  { label: "Inventory", href: "/inventory" },
  { label: "About",     href: "/#about"    },
  { label: "Contact",   href: "/#contact"  },
];

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "X",         href: "#" },
  { label: "WhatsApp",  href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-black z-50 hidden lg:flex flex-col border-r border-white/[0.06]">

      {/* Gold top accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent" />

      {/* Logo */}
      <div className="px-10 pt-10 pb-8">
        <Link href="/" className="group block w-fit">
          <Image
            src="/images/logo/makeen%20logo.PNG"
            alt="Makeen Motors"
            width={180}
            height={46}
            priority
            className="h-11 w-auto transition-opacity duration-300 group-hover:opacity-75"
          />
        </Link>
        <p className="mt-3 text-[8px] tracking-[0.55em] uppercase text-zinc-700">
          Dubai, UAE · Est. 2024
        </p>
      </div>

      {/* Gold divider */}
      <div className="mx-10 h-px bg-gradient-to-r from-transparent via-[#C9A356]/25 to-transparent mb-8" />

      {/* Navigation */}
      <nav className="flex flex-col px-10 gap-0.5 flex-1">
        {NAV.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 py-3.5 text-[9px] tracking-[0.5em] uppercase text-zinc-600 hover:text-white transition-all duration-300"
          >
            <span className="block h-px bg-zinc-800 group-hover:bg-[#C9A356]/60 transition-all duration-400"
              style={{ width: "18px" }}
              onMouseEnter={(e) => (e.currentTarget.style.width = "32px")}
              onMouseLeave={(e) => (e.currentTarget.style.width = "18px")}
            />
            {label}
          </Link>
        ))}

        {/* Gold divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Book a Drive CTA */}
        <Link
          href="/book-test-drive"
          className="group relative flex items-center justify-center py-3.5 border border-white/20 text-[9px] tracking-[0.5em] uppercase text-zinc-400 hover:text-black hover:border-white overflow-hidden transition-colors duration-500"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            Book a Test Drive
          </span>
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,.68,0,1.2)]" />
        </Link>
      </nav>

      {/* Bottom: contact + socials */}
      <div className="px-10 py-8 border-t border-white/[0.05]">
        <p className="text-[7px] tracking-[0.5em] uppercase text-zinc-700 mb-3">
          Reach Us
        </p>
        <p className="text-[11px] text-zinc-500 leading-[1.85] mb-0.5">
          +971 4 555 0199
        </p>
        <p className="text-[10px] text-zinc-700 leading-[1.85]">
          hello@makeenmotors.com
        </p>

        <div className="flex items-center gap-4 mt-5">
          {SOCIAL.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[7px] tracking-[0.4em] uppercase text-zinc-700 hover:text-[#C9A356] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        <p className="mt-5 text-[7px] tracking-[0.35em] uppercase text-zinc-800">
          © 2024 Makeen Motors LLC
        </p>
      </div>

      {/* Right-edge gold accent line */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#C9A356]/15 to-transparent" />
    </aside>
  );
}
