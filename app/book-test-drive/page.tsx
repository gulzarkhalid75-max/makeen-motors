"use client";

import { useState } from "react";
import Link from "next/link";
import { VEHICLES } from "@/app/lib/vehicles";
import Image from "next/image";

// ── Constants ────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",    href: "/"                },
  { label: "Cars",    href: "/inventory"       },
  { label: "About",   href: "/#about"          },
  { label: "Contact", href: "/#contact"        },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM",
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
];

const HOURS = [
  { day: "Monday – Friday", time: "09:00 – 19:00" },
  { day: "Saturday",        time: "10:00 – 17:00" },
  { day: "Sunday",          time: "By Appointment" },
];

const BENEFITS = [
  {
    title: "Dedicated Advisor",
    description: "A specialist assigned exclusively to guide your experience from arrival to departure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: "Private Test Route",
    description: "A curated route designed to showcase the vehicle's full dynamic capability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 12h18M3 12C3 7 7 4 12 4M21 12c0 5-4 8-9 8" />
        <path d="M12 4c2.5 3 4 5.5 4 8s-1.5 5-4 8" />
      </svg>
    ),
  },
  {
    title: "VIP Hospitality",
    description: "Refreshments, climate-controlled lounge, and full concierge service upon arrival.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    description: "Six days per week, morning or evening — arranged entirely around your calendar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01" />
      </svg>
    ),
  },
];

// ── Types ─────────────────────────────────────────────────────

interface FormData {
  fullName:  string;
  email:     string;
  phone:     string;
  vehicle:   string;
  date:      string;
  time:      string;
  message:   string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  fullName: "", email: "", phone: "", vehicle: "",
  date: "", time: "", message: "",
};

// ── Validation ────────────────────────────────────────────────

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2)
    errors.fullName = "Please enter your full name";

  if (!data.email.trim())
    errors.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address";

  if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number";

  if (!data.vehicle)
    errors.vehicle = "Please select a preferred vehicle";

  if (!data.date)
    errors.date = "Please select a preferred date";

  if (!data.time)
    errors.time = "Please select a preferred time";

  return errors;
}

// ── Helpers ───────────────────────────────────────────────────

function minDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ── Page ─────────────────────────────────────────────────────

export default function BookTestDrive() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [formData,   setFormData]   = useState<FormData>(EMPTY_FORM);
  const [errors,     setErrors]     = useState<FormErrors>({});
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as soon as the user edits it
    if (errors[name as keyof FormData]) {
      setErrors((prev) => { const next = { ...prev }; delete next[name as keyof FormData]; return next; });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const first = document.querySelector("[data-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate async submit (replace with real API call)
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 900);
  }

  // Shared input/select class builder
  const fieldClass = (name: keyof FormData) =>
    `w-full bg-white/[0.04] border text-[13px] text-white placeholder-zinc-700 outline-none transition-all duration-300 ${
      errors[name]
        ? "border-red-500/60 focus:border-red-400/80"
        : "border-white/[0.08] focus:border-white/[0.25] focus:bg-white/[0.07]"
    }`;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .anim-fade-up { animation: fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) forwards; opacity: 0; }
        .btn-fill::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #fff;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(.22,.68,0,1.2);
        }
        .btn-fill:hover::after { transform: translateY(0); }
        .btn-fill:hover span   { color: #000; }
        /* Style native selects to match the dark theme */
        select option { background: #0a0a0a; color: #e4e4e7; }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans">

        {/* ── Background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.024]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "90px 90px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.7))]" />
        </div>

        {/* ── Navbar ── */}
        <header className="fixed inset-x-0 top-0 z-50">
          <div className="flex items-center justify-between px-6 md:px-14 py-5 bg-white/[0.04] backdrop-blur-xl border-b border-white/[0.07]">
            <Link href="/" className="group">
              <Image
                src="/images/logo/makeen%20logo.PNG"
                alt="Makeen Motors"
                width={160}
                height={40}
                priority
                className="h-8 md:h-9 w-auto transition-opacity duration-300 group-hover:opacity-75"
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
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
            >
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px w-6 bg-white transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-500 bg-black/85 backdrop-blur-xl border-b border-white/[0.07] ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
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
            </nav>
          </div>
        </header>

        {/* ── Page Header ── */}
        <div className="relative pt-36 pb-12 px-8 md:px-16 border-b border-zinc-900">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-zinc-600 mb-5">
            <Link href="/" className="hover:text-zinc-400 transition-colors duration-200">Home</Link>
            <span>/</span>
            <span className="text-zinc-500">Book a Test Drive</span>
          </div>
          <p className="text-[10px] tracking-[0.55em] uppercase text-zinc-600 mb-3">Reserve Your Session</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-5xl md:text-7xl font-thin tracking-tight uppercase leading-none">
                Book a Test
              </h1>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase leading-none">
                Drive
              </h1>
            </div>
            <p className="text-[12px] leading-[1.95] text-zinc-600 md:text-right max-w-xs">
              Experience the vehicle on your terms.<br />
              A specialist will confirm your session<br />within 2 business hours.
            </p>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="relative px-8 md:px-16 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ── Left: form (or success) — 2/3 width ── */}
          <div className="lg:col-span-2">

            {submitted ? (
              /* ── Success state ── */
              <div className="anim-fade-up flex flex-col items-center text-center gap-8 py-12">
                {/* Animated diamond */}
                <div className="relative flex items-center justify-center">
                  <span className="block w-20 h-20 border border-white/20 rotate-45 absolute" />
                  <span className="block w-12 h-12 border border-white/40 rotate-45" />
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="w-5 h-5 text-white absolute"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-[10px] tracking-[0.6em] uppercase text-zinc-600">
                    Request Received
                  </p>
                  <h2 className="text-4xl md:text-5xl font-thin tracking-tight uppercase leading-none">
                    Test Drive<br />Confirmed
                  </h2>
                </div>

                <p className="text-[13px] leading-[2] text-zinc-500 max-w-md">
                  Thank you, <span className="text-white">{formData.fullName}</span>. Your test drive request has been
                  received. A dedicated advisor will contact you at{" "}
                  <span className="text-white">{formData.email}</span> within 2 business hours to finalise your session.
                </p>

                {/* Booking summary card */}
                <div className="w-full max-w-md bg-white/[0.03] border border-white/[0.08] p-7 flex flex-col gap-4 text-left">
                  <p className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">Booking Summary</p>
                  <div className="h-px bg-white/[0.06]" />
                  {[
                    { label: "Vehicle",  value: formData.vehicle },
                    { label: "Date",     value: new Date(formData.date + "T00:00:00").toLocaleDateString("en-AE", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                    { label: "Time",     value: formData.time    },
                    { label: "Contact",  value: formData.phone   },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-700 shrink-0">{label}</span>
                      <span className="text-[12px] tracking-wide text-zinc-300 text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <Link
                    href="/inventory"
                    className="btn-fill relative px-10 py-4 border border-white/60 text-[10px] tracking-[0.45em] uppercase overflow-hidden hover:border-white transition-colors duration-500"
                  >
                    <span className="relative z-10 transition-colors duration-200">Browse More Vehicles</span>
                  </Link>
                  <button
                    onClick={() => { setFormData(EMPTY_FORM); setSubmitted(false); }}
                    className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors duration-300"
                  >
                    Book Another →
                  </button>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.fullName} required>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Khalid Al Mansouri"
                      autoComplete="name"
                      className={`${fieldClass("fullName")} h-12 px-4`}
                    />
                  </Field>

                  <Field label="Email Address" error={errors.email} required>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="hello@example.com"
                      autoComplete="email"
                      className={`${fieldClass("email")} h-12 px-4`}
                    />
                  </Field>
                </div>

                {/* Phone + Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Phone Number" error={errors.phone} required>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 000 0000"
                      autoComplete="tel"
                      className={`${fieldClass("phone")} h-12 px-4`}
                    />
                  </Field>

                  <Field label="Preferred Vehicle" error={errors.vehicle} required>
                    <div className="relative">
                      <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        className={`${fieldClass("vehicle")} h-12 px-4 pr-10 appearance-none cursor-pointer`}
                      >
                        <option value="">Select a vehicle…</option>
                        {VEHICLES.map((v) => (
                          <option key={v.id} value={`${v.brand} ${v.name} (${v.year})`}>
                            {v.brand} {v.name} · {v.year}
                          </option>
                        ))}
                        <option value="Not sure yet — I'd like advice">
                          Not sure yet — I&apos;d like advice
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                        <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-2">
                          <path d="M1 1l5 5 5-5" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Preferred Date" error={errors.date} required>
                    <input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate()}
                      className={`${fieldClass("date")} h-12 px-4 cursor-pointer`}
                      style={{ colorScheme: "dark" }}
                    />
                  </Field>

                  <Field label="Preferred Time" error={errors.time} required>
                    <div className="relative">
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`${fieldClass("time")} h-12 px-4 pr-10 appearance-none cursor-pointer`}
                      >
                        <option value="">Select a time…</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                        <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-2">
                          <path d="M1 1l5 5 5-5" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Message" hint="Optional — any special requests or questions">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us anything that would help us prepare the perfect experience for you…"
                    className={`${fieldClass("message")} px-4 py-3.5 resize-none leading-relaxed`}
                  />
                </Field>

                {/* Error summary — shows if submit was attempted with errors */}
                {Object.keys(errors).length > 0 && (
                  <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/[0.06] px-5 py-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4 text-red-400 shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" />
                    </svg>
                    <p className="text-[11px] tracking-[0.2em] text-red-400">
                      Please correct the highlighted fields before submitting.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex items-center gap-6 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-fill relative px-10 py-4 border border-white/60 text-[10px] tracking-[0.5em] uppercase overflow-hidden hover:border-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 transition-colors duration-200 flex items-center gap-3">
                      {submitting ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 animate-spin">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
                          </svg>
                          Submitting…
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </span>
                  </button>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-700 leading-relaxed hidden sm:block">
                    We will confirm<br />within 2 hours
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* ── Right: sidebar — 1/3 width ── */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">

              {/* Contact info */}
              <div className="bg-white/[0.03] border border-white/[0.07] p-7 flex flex-col gap-5">
                <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600">Contact</p>
                <div className="flex flex-col gap-4">
                  {CONTACT_INFO.map(({ label, value, icon }) => (
                    <div key={label} className="group flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 border border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-white group-hover:border-white/[0.18] transition-all duration-300 shrink-0">
                        {icon}
                      </div>
                      <div className="flex flex-col gap-0.5 pt-1">
                        <span className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">{label}</span>
                        <span className="text-[12px] tracking-wide text-zinc-400 group-hover:text-white transition-colors duration-300">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-white/[0.03] border border-white/[0.07] p-7 flex flex-col gap-5">
                <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600">Business Hours</p>
                <div className="flex flex-col gap-3">
                  {HOURS.map(({ day, time }) => (
                    <div key={day} className="flex items-center justify-between gap-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600">{day}</span>
                      <span className="text-[10px] tracking-[0.15em] text-zinc-400 shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test drive benefits */}
              <div className="flex flex-col gap-5">
                <p className="text-[9px] tracking-[0.55em] uppercase text-zinc-600">The Experience</p>
                <div className="flex flex-col gap-3">
                  {BENEFITS.map(({ title, description, icon }) => (
                    <div key={title} className="group flex items-start gap-4 bg-white/[0.02] border border-white/[0.06] p-5 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                      <div className="flex items-center justify-center w-8 h-8 border border-white/[0.08] text-zinc-500 group-hover:text-white group-hover:border-white/[0.2] transition-all duration-300 shrink-0">
                        {icon}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-white/80 group-hover:text-white transition-colors duration-300">
                          {title}
                        </span>
                        <span className="text-[11px] leading-[1.8] text-zinc-600 group-hover:text-zinc-500 transition-colors duration-300">
                          {description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-zinc-900 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="group">
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={120}
              height={30}
              className="h-5 w-auto opacity-40 transition-opacity duration-300 group-hover:opacity-70"
            />
          </Link>
          <span className="text-[9px] tracking-[0.4em] uppercase text-zinc-800">
            © 2024 Makeen Motors LLC · All rights reserved
          </span>
        </footer>

      </div>
    </>
  );
}

// ── Field wrapper component ───────────────────────────────────

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2" data-error={error ? true : undefined}>
      <label className="flex items-center gap-2 text-[9px] tracking-[0.5em] uppercase text-zinc-600">
        {label}
        {required && <span className="text-red-400/70">*</span>}
        {hint && <span className="text-zinc-800 normal-case tracking-normal text-[9px] ml-auto">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="text-[10px] tracking-[0.2em] text-red-400 flex items-center gap-1.5">
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-2.5 h-2.5 shrink-0">
            <circle cx="6" cy="6" r="5" /><path d="M6 4v2.5M6 8h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
