"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { completeProfilePath } from "@/lib/profile";

// ── Constants ─────────────────────────────────────────────────

const SPRING = "cubic-bezier(0.22,0.68,0,1.2)";

const fieldCls =
  "h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300";

const labelCls = "text-[9px] tracking-[0.5em] uppercase text-zinc-600";

// ── Icons ─────────────────────────────────────────────────────

function EyeOn() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-2.5 h-2.5 text-[#C9A356]">
      <polyline points="1.5,5.5 4,8 8.5,2" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="w-3.5 h-3.5 rounded-full border border-[#C9A356]/35 border-t-[#C9A356] animate-spin" />
  );
}

// ── Page ─────────────────────────────────────────────────────

interface FormState {
  firstName: string; lastName:  string;
  email:     string; phone:     string;
  city:      string; country:   string;
  password:  string; confirm:   string;
}

const INIT: FormState = {
  firstName: "", lastName:  "",
  email:     "", phone:     "",
  city:      "", country:   "",
  password:  "", confirm:   "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [form,          setForm]          = useState<FormState>(INIT);
  const [terms,         setTerms]         = useState(false);
  const [showPass,      setShowPass]      = useState(false);
  const [showConf,      setShowConf]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors,        setErrors]        = useState<Partial<Record<keyof FormState | "terms" | "form", string>>>({});
  const [mounted,       setMounted]       = useState(false);
  const [redirectTo,    setRedirectTo]    = useState("/sell-car");
  const [successMsg,    setSuccessMsg]    = useState("");

  useEffect(() => {
    document.title = "Create Account | Makeen Motors";
    setMounted(true);
    const p = new URLSearchParams(window.location.search);
    setRedirectTo(p.get("redirect") || "/sell-car");
  }, []);

  const set = (k: keyof FormState, v: string) =>
    setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.trim())     e.email     = "Required";
    if (!form.phone.trim())     e.phone     = "Required";
    if (!form.password)         e.password  = "Required";
    if (form.password.length > 0 && form.password.length < 8)
      e.password = "Minimum 8 characters";
    if (form.confirm !== form.password)
      e.confirm = "Passwords do not match";
    if (!terms)
      e.terms = "You must agree to the Terms & Conditions";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setErrors({});
    setSuccessMsg("");
    const { error: authError, session } = await signUp(form.email.trim(), form.password, {
      first_name: form.firstName.trim(),
      last_name:  form.lastName.trim(),
      phone:      form.phone.trim(),
      city:       form.city.trim(),
      country:    form.country.trim(),
    });
    setLoading(false);
    if (authError) {
      setErrors({ form: authError.message });
      return;
    }
    if (session) {
      router.push(
        completeProfilePath(redirectTo, {
          full_name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        })
      );
      router.refresh();
      return;
    }
    setSuccessMsg(
      "Account created. Check your email to confirm your address, then sign in to continue."
    );
    setTimeout(() => {
      router.push(`/sign-in?redirect=${encodeURIComponent(redirectTo)}`);
      router.refresh();
    }, 2800);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setErrors({});
    const { error: authError } = await signInWithGoogle(redirectTo);
    setGoogleLoading(false);
    if (authError) setErrors({ form: authError.message });
  };

  return (
    <>
      <style>{`
        .register-grid {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">

        {/* ── Background ── */}
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 register-grid opacity-[0.022]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.80))]" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 110%, rgba(201,163,86,0.05), transparent)" }}
          />
        </div>

        {/* ── Minimal nav ── */}
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 md:px-14 py-5">
          <Link href="/" className="group">
            <Image
              src="/images/logo/makeen%20logo.PNG"
              alt="Makeen Motors"
              width={160}
              height={40}
              priority
              className="h-8 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
          <Link
            href="/inventory"
            className="hidden md:inline-flex text-[9px] tracking-[0.4em] uppercase text-zinc-600 hover:text-white transition-colors duration-300"
          >
            Browse Cars →
          </Link>
        </header>

        {/* ── Main ── */}
        <main className="relative flex items-center justify-center min-h-screen px-6 py-24">
          <div
            className="w-full max-w-[560px]"
            style={{
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.7s ease, transform 0.7s ${SPRING}`,
            }}
          >
            {/* Card */}
            <div
              className="relative border border-white/[0.08] overflow-hidden"
              style={{
                background:           "rgba(255,255,255,0.026)",
                backdropFilter:       "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Gold top line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/55 to-transparent" />
              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,163,86,0.05), transparent)" }}
                aria-hidden
              />

              <div className="relative px-8 pt-10 pb-10">

                {/* Logo + badge */}
                <div className="flex flex-col items-center gap-3 mb-8">
                  <Image
                    src="/images/logo/makeen%20logo.PNG"
                    alt="Makeen Motors"
                    width={130}
                    height={33}
                    className="h-7 w-auto opacity-50"
                  />
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 border border-[#C9A356]/45 rotate-45 shrink-0" />
                    <p className="text-[7px] tracking-[0.7em] uppercase text-zinc-700">Premium Authentication</p>
                    <span className="w-1 h-1 border border-[#C9A356]/45 rotate-45 shrink-0" />
                  </div>
                </div>

                {/* Heading */}
                <div className="mb-7">
                  <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600 mb-2">New Member</p>
                  <h1 className="text-3xl md:text-[2.2rem] font-thin tracking-tight uppercase leading-none text-white mb-2">
                    Create Account
                  </h1>
                  <p className="text-[12px] leading-relaxed text-zinc-600">
                    Join Dubai&apos;s premier automotive community
                  </p>
                </div>

                {errors.form && (
                  <div className="mb-5 px-4 py-3 border border-red-500/25 bg-red-500/[0.06]">
                    <p className="text-[11px] text-red-400">{errors.form}</p>
                  </div>
                )}

                {successMsg && (
                  <div className="mb-5 px-4 py-3 border border-[#C9A356]/25 bg-[#C9A356]/[0.06]">
                    <p className="text-[11px] text-[#C9A356]">{successMsg}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* First + Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={e => set("firstName", e.target.value)}
                        placeholder="Khalid"
                        autoComplete="given-name"
                        className={fieldCls}
                      />
                      {errors.firstName && <p className="text-[9px] text-red-400">{errors.firstName}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={e => set("lastName", e.target.value)}
                        placeholder="Al Mansouri"
                        autoComplete="family-name"
                        className={fieldCls}
                      />
                      {errors.lastName && <p className="text-[9px] text-red-400">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="hello@example.com"
                      autoComplete="email"
                      className={fieldCls}
                    />
                    {errors.email && <p className="text-[9px] text-red-400">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Phone Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      placeholder="+971 50 000 0000"
                      autoComplete="tel"
                      className={fieldCls}
                    />
                    {errors.phone && <p className="text-[9px] text-red-400">{errors.phone}</p>}
                  </div>

                  {/* City + Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>City</label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={e => set("city", e.target.value)}
                        placeholder="Dubai"
                        autoComplete="address-level2"
                        className={fieldCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>Country</label>
                      <input
                        type="text"
                        value={form.country}
                        onChange={e => set("country", e.target.value)}
                        placeholder="United Arab Emirates"
                        autoComplete="country-name"
                        className={fieldCls}
                      />
                    </div>
                  </div>

                  {/* Password + Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>Password *</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={form.password}
                          onChange={e => set("password", e.target.value)}
                          placeholder="Min 8 characters"
                          autoComplete="new-password"
                          className={fieldCls + " pr-12"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(v => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                        >
                          {showPass ? <EyeOff /> : <EyeOn />}
                        </button>
                      </div>
                      {errors.password && <p className="text-[9px] text-red-400">{errors.password}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={labelCls}>Confirm Password *</label>
                      <div className="relative">
                        <input
                          type={showConf ? "text" : "password"}
                          value={form.confirm}
                          onChange={e => set("confirm", e.target.value)}
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          className={fieldCls + " pr-12"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConf(v => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                        >
                          {showConf ? <EyeOff /> : <EyeOn />}
                        </button>
                      </div>
                      {errors.confirm && <p className="text-[9px] text-red-400">{errors.confirm}</p>}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06]" />

                  {/* Terms */}
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTerms(v => !v)}
                      className="flex items-start gap-3 group text-left"
                    >
                      <span
                        className={`mt-0.5 w-4 h-4 border shrink-0 flex items-center justify-center transition-all duration-200 ${
                          terms ? "border-[#C9A356]/55 bg-[#C9A356]/10" : "border-white/[0.15]"
                        }`}
                      >
                        {terms && <Check />}
                      </span>
                      <span className="text-[11px] leading-[1.8] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
                        I agree to the{" "}
                        <span className="text-[#C9A356]/70 hover:text-[#C9A356] transition-colors duration-200 underline underline-offset-2 decoration-[#C9A356]/25">
                          Terms &amp; Conditions
                        </span>
                        {" "}and Privacy Policy
                      </span>
                    </button>
                    {errors.terms && (
                      <p className="text-[9px] text-red-400 pl-7">{errors.terms}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-1 w-full py-4 border border-[#C9A356]/38 text-[9px] tracking-[0.5em] uppercase overflow-hidden hover:border-[#C9A356]/65 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!loading && (
                      <span
                        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ background: "rgba(201,163,86,0.08)", transitionTimingFunction: SPRING }}
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 text-[#C9A356] flex items-center justify-center gap-2.5">
                      {loading ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border border-[#C9A356]/35 border-t-[#C9A356] animate-spin" />
                          Creating Account…
                        </>
                      ) : "Create Account →"}
                    </span>
                  </button>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-7">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[7px] tracking-[0.5em] uppercase text-zinc-800">or</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading || googleLoading}
                  className="group relative w-full py-4 border border-white/[0.12] text-[9px] tracking-[0.45em] uppercase overflow-hidden hover:border-white/25 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-zinc-300 group-hover:text-white transition-colors duration-200">
                    {googleLoading ? (
                      <><Spinner /> Connecting…</>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-hidden>
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </span>
                </button>

                {/* Sign in link */}
                <p className="text-center text-[11px] tracking-wide text-zinc-600 mt-7">
                  Already have an account?{" "}
                  <Link
                    href={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`}
                    className="text-zinc-300 hover:text-[#C9A356] transition-colors duration-200"
                  >
                    Sign In →
                  </Link>
                </p>

              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-[7px] tracking-[0.6em] uppercase text-zinc-800 mt-7">
              Makeen Motors · Premium Automotive Dubai
            </p>
          </div>
        </main>

      </div>
    </>
  );
}
