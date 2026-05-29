"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    // Advance progress to 92% quickly, then stall — mirrors real load feel
    const t1 = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) { clearInterval(t1); return p; }
        return p + Math.random() * 14;
      });
    }, 120);

    // Fade out after 1.6 s
    const t2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 420);
    }, 1600);

    return () => { clearInterval(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center"
      style={{
        transition: "opacity 0.42s cubic-bezier(.4,0,.2,1)",
        opacity: progress === 100 ? 0 : 1,
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          opacity:   progress > 5  ? 1 : 0,
          transform: progress > 5  ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <Image
          src="/images/logo/makeen%20logo.PNG"
          alt="Makeen Motors"
          width={160}
          height={40}
          priority
          className="h-10 w-auto"
        />
      </div>

      {/* ── Progress bar ── */}
      <div
        className="mt-10 w-32 h-px bg-white/[0.07] overflow-hidden relative"
        style={{
          opacity:    progress > 5 ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.18s ease-out",
            background:
              "linear-gradient(90deg, rgba(201,163,86,0.7) 0%, rgba(255,255,255,0.9) 60%, rgba(201,163,86,0.5) 100%)",
          }}
        />
      </div>

      {/* ── City label ── */}
      <p
        className="mt-5 text-[8px] tracking-[0.65em] uppercase"
        style={{
          color:      "rgba(201,163,86,0.45)",
          opacity:    progress > 12 ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        Dubai, UAE
      </p>
    </div>
  );
}
