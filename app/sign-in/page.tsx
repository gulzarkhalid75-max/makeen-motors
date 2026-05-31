"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { resolvePostAuthPath } from "@/lib/profile";

// ── Constants ─────────────────────────────────────────────────

const SPRING = "cubic-bezier(0.22,0.68,0,1.2)";

const fieldCls =
  "h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300";

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

function Spinner({ gold = false }: { gold?: boolean }) {
  return (
    <span
      className={`w-3.5 h-3.5 rounded-full border animate-spin ${
        gold ? "border-[#C9A356]/35 border-t-[#C9A356]" : "border-zinc-600 border-t-zinc-300"
      }`}
    />
  );
}

// ── Page ─────────────────────────────────────────────────────

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();

  const [email,         setEmail]         = useState("");
  const [password,      setPassword]      = useState("");
  const [remember,      setRemember]      = useState(false);
  const [showPass,      setShowPass]      = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error,         setError]         = useState("");
  const [mounted,       setMounted]       = useState(false);
  const [redirectTo,    setRedirectTo]    = useState("/");

  useEffect(() => {
    document.title = "Sign In | Makeen Motors";
    setMounted(true);
    const p = new URLSearchParams(window.location.search);
    setRedirectTo(p.get("redirect") || "/");
    const authError = p.get("error");
    if (authError) {
      setError(
        authError === "auth_callback_failed"
          ? "Sign in could not be completed. Please try again."
          : decodeURIComponent(authError)
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: authError } = await signIn(email.trim(), password);
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (remember) localStorage.setItem("makeen_remember", "1");
    const supabase = createClient();
    const {
      data: { user: authedUser },
    } = await supabase.auth.getUser();
    const dest = authedUser
      ? await resolvePostAuthPath(supabase, authedUser.id, redirectTo)
      : redirectTo;
    router.push(dest);
    router.refresh();
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    const { error: authError } = await signInWithGoogle(redirectTo);
    setGoogleLoading(false);
    if (authError) setError(authError.message);
  };

  return (
    <>
      <style>{`
        .signin-grid {
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
          <div className="absolute inset-0 signin-grid opacity-[0.022]" />
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
            className="w-full max-w-[440px]"
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
                  <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600 mb-2">Welcome Back</p>
                  <h1 className="text-3xl md:text-[2.2rem] font-thin tracking-tight uppercase leading-none text-white mb-2">
                    Sign In
                  </h1>
                  <p className="text-[12px] leading-relaxed text-zinc-600">Access your premium account</p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 px-4 py-3 border border-red-500/25 bg-red-500/[0.06]">
                    <p className="text-[11px] text-red-400">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="hello@example.com"
                      autoComplete="email"
                      className={fieldCls}
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] tracking-[0.5em] uppercase text-zinc-600">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        autoComplete="current-password"
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
                  </div>

                  {/* Remember + Forgot */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setRemember(v => !v)}
                      className="flex items-center gap-2.5 group shrink-0"
                    >
                      <span
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-all duration-200 ${
                          remember ? "border-[#C9A356]/55 bg-[#C9A356]/10" : "border-white/[0.15]"
                        }`}
                      >
                        {remember && (
                          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-2.5 h-2.5 text-[#C9A356]">
                            <polyline points="1.5,5.5 4,8 8.5,2" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
                        Remember Me
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 hover:text-[#C9A356] transition-colors duration-200 shrink-0"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 w-full py-4 border border-white/40 text-[9px] tracking-[0.5em] uppercase overflow-hidden hover:border-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!loading && (
                      <span
                        className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                        style={{ transitionTimingFunction: SPRING }}
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 group-hover:text-black transition-colors duration-200 flex items-center justify-center gap-2.5">
                      {loading ? <><Spinner /> Signing In…</> : "Sign In"}
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
                      <><Spinner gold /> Connecting…</>
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

                {/* Register link */}
                <p className="text-center text-[11px] tracking-wide text-zinc-600 mt-7">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={redirectTo !== "/" ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"}
                    className="text-zinc-300 hover:text-[#C9A356] transition-colors duration-200"
                  >
                    Create Account →
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
