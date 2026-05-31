"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  fetchProfile,
  isProfileComplete,
  saveProfile,
} from "@/lib/profile";

const SPRING = "cubic-bezier(0.22,0.68,0,1.2)";

const fieldCls =
  "h-12 w-full bg-white/[0.04] border border-white/[0.08] px-4 text-[13px] text-white placeholder-zinc-700 outline-none focus:border-[#C9A356]/40 focus:bg-white/[0.06] transition-all duration-300";

const labelCls = "text-[9px] tracking-[0.5em] uppercase text-zinc-600";

function Spinner() {
  return (
    <span className="w-3.5 h-3.5 rounded-full border border-[#C9A356]/35 border-t-[#C9A356] animate-spin" />
  );
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"full_name" | "email" | "phone" | "form", string>>>({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/sell-car");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    document.title = "Complete Profile | Makeen Motors";
    setMounted(true);
    const p = new URLSearchParams(window.location.search);
    setRedirectTo(p.get("redirect") || "/sell-car");
    if (p.get("name")) setFullName(p.get("name")!);
    if (p.get("email")) setEmail(p.get("email")!);
    if (p.get("phone")) setPhone(p.get("phone")!);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      const returnPath = `/complete-profile${window.location.search}`;
      router.replace(`/sign-in?redirect=${encodeURIComponent(returnPath)}`);
      return;
    }

    let cancelled = false;

    (async () => {
      const supabase = createClient();
      const profile = await fetchProfile(supabase, user.id);
      if (cancelled) return;

      const dest =
        new URLSearchParams(window.location.search).get("redirect") || "/sell-car";

      if (isProfileComplete(profile)) {
        router.replace(dest);
        return;
      }

      const meta = user.user_metadata as Record<string, string | undefined>;

      setFullName(prev => {
        if (prev) return prev;
        if (profile?.full_name) return profile.full_name;
        if (meta?.first_name) {
          return [meta.first_name, meta.last_name].filter(Boolean).join(" ");
        }
        return prev;
      });

      setEmail(prev => {
        if (prev) return prev;
        if (profile?.email) return profile.email;
        return user.email ?? prev;
      });

      setPhone(prev => {
        if (prev) return prev;
        if (profile?.phone) return profile.phone;
        if (meta?.phone) return meta.phone;
        return prev;
      });

      setChecking(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, router]);

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.full_name = "Required";
    if (!email.trim()) e.email = "Required";
    if (!phone.trim()) e.phone = "Required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    const supabase = createClient();
    const { error } = await saveProfile(supabase, user.id, {
      full_name: fullName,
      email,
      phone,
    });

    setLoading(false);

    if (error) {
      setErrors({ form: error });
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <style>{`
        .profile-grid {
          background-image:
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px);
          background-size: 90px 90px;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(255,255,255,0.04),transparent)]" />
          <div className="absolute inset-0 profile-grid opacity-[0.022]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.80))]" />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 55% 50% at 50% 110%, rgba(201,163,86,0.05), transparent)" }}
          />
        </div>

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
        </header>

        <main className="relative flex items-center justify-center min-h-screen px-6 py-24">
          <div
            className="w-full max-w-[440px]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.7s ease, transform 0.7s ${SPRING}`,
            }}
          >
            <div
              className="relative border border-white/[0.08] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.026)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A356]/55 to-transparent" />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,163,86,0.05), transparent)" }}
                aria-hidden
              />

              <div className="relative px-8 pt-10 pb-10">
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
                    <p className="text-[7px] tracking-[0.7em] uppercase text-zinc-700">Your Profile</p>
                    <span className="w-1 h-1 border border-[#C9A356]/45 rotate-45 shrink-0" />
                  </div>
                </div>

                <div className="mb-7">
                  <p className="text-[8px] tracking-[0.6em] uppercase text-zinc-600 mb-2">One More Step</p>
                  <h1 className="text-3xl md:text-[2.2rem] font-thin tracking-tight uppercase leading-none text-white mb-2">
                    Complete Profile
                  </h1>
                  <p className="text-[12px] leading-relaxed text-zinc-600">
                    Please provide your details to continue
                  </p>
                </div>

                {errors.form && (
                  <div className="mb-5 px-4 py-3 border border-red-500/25 bg-red-500/[0.06]">
                    <p className="text-[11px] text-red-400">{errors.form}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Khalid Al Mansouri"
                      autoComplete="name"
                      className={fieldCls}
                    />
                    {errors.full_name && (
                      <p className="text-[9px] text-red-400">{errors.full_name}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="hello@example.com"
                      autoComplete="email"
                      className={fieldCls}
                    />
                    {errors.email && (
                      <p className="text-[9px] text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={labelCls}>Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      autoComplete="tel"
                      className={fieldCls}
                    />
                    {errors.phone && (
                      <p className="text-[9px] text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative mt-2 w-full py-4 border border-[#C9A356]/38 text-[9px] tracking-[0.5em] uppercase overflow-hidden hover:border-[#C9A356]/65 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          <Spinner />
                          Saving…
                        </>
                      ) : (
                        "Save & Continue →"
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <p className="text-center text-[7px] tracking-[0.6em] uppercase text-zinc-800 mt-7">
              Makeen Motors · Premium Automotive Dubai
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
