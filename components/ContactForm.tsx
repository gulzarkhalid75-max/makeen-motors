"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

const EASE = [0.22, 0.68, 0, 1.2] as const;

const FIELDS = [
  { id: "name",    label: "Full Name",    type: "text",  placeholder: "Khalid Al Mansouri", col: "sm:col-span-1" },
  { id: "email",   label: "Email",        type: "email", placeholder: "hello@example.com",  col: "sm:col-span-1" },
  { id: "phone",   label: "Phone",        type: "tel",   placeholder: "+971 50 000 0000",   col: "sm:col-span-2" },
];

const INTERESTS = [
  "Sports Cars", "Luxury Sedans", "SUVs", "Electric Vehicles",
  "Test Drive", "Vehicle Valuation", "Partnership", "Other",
];

export default function ContactForm() {
  const [status,   setStatus]   = useState<Status>("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const [values,   setValues]   = useState({ name: "", email: "", phone: "", message: "" });

  function toggle(tag: string) {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simulate network — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">

      {/* ── Name / Email / Phone ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ id, label, type, placeholder, col }) => (
          <div key={id} className={`flex flex-col gap-2 ${col}`}>
            <label htmlFor={id} className="text-[8px] tracking-[0.55em] uppercase text-zinc-600">
              {label}
            </label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={values[id as keyof typeof values]}
              onChange={change}
              required
              className="h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        ))}
      </div>

      {/* ── Interest tags ── */}
      <div className="flex flex-col gap-3">
        <span className="text-[8px] tracking-[0.55em] uppercase text-zinc-600">
          I&apos;m interested in
        </span>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((tag) => {
            const active = selected.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggle(tag)}
                className="px-3.5 py-2 text-[8px] tracking-[0.35em] uppercase transition-all duration-300"
                style={{
                  border:  active ? "1px solid rgba(201,163,86,0.55)" : "1px solid rgba(255,255,255,0.08)",
                  color:   active ? "#C9A356"                         : "rgb(82,82,91)",
                  background: active ? "rgba(201,163,86,0.07)"        : "rgba(255,255,255,0.02)",
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[8px] tracking-[0.55em] uppercase text-zinc-600">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us which model you are interested in, or how we can assist you…"
          value={values.message}
          onChange={change}
          className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3.5 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300 resize-none leading-relaxed backdrop-blur-sm"
        />
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center gap-6 pt-1">
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="group relative w-full sm:w-auto px-10 py-4 border text-[10px] tracking-[0.5em] uppercase overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ borderColor: status === "sent" ? "rgba(201,163,86,0.5)" : "rgba(255,255,255,0.4)" }}
        >
          {/* Fill sweep */}
          <span
            className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(.22,.68,0,1.2)]"
            aria-hidden
          />
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
            {status === "sending" && (
              <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" strokeOpacity=".25" />
                <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
              </svg>
            )}
            {status === "sent"    ? "Message Sent" : status === "sending" ? "Sending…" : "Send Enquiry"}
          </span>
        </button>

        <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-700">
          We respond within 2 hours
        </p>
      </div>

      {/* ── Success toast ── */}
      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-start gap-4 p-5 border border-[#C9A356]/25 bg-[#C9A356]/[0.06] backdrop-blur-sm"
          >
            <div className="mt-0.5 w-5 h-5 flex items-center justify-center border border-[#C9A356]/40 shrink-0">
              <svg viewBox="0 0 12 12" fill="none" stroke="#C9A356" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3">
                <polyline points="2,6.5 4.5,9 10,3" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white mb-1">Enquiry Received</p>
              <p className="text-[11px] leading-[1.8] text-zinc-500">
                A Makeen Motors advisor will contact you within two business hours.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
