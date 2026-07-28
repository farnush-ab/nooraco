"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Magnetic from "./ui/Magnetic";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* two-tone studio backdrop */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="navyBg" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0" stopColor="#28384f" />
              <stop offset="1" stopColor="#141f33" />
            </linearGradient>
            <linearGradient id="greyBg" x1="1" y1="0" x2="0.2" y2="1">
              <stop offset="0" stopColor="#cdd1d6" />
              <stop offset="1" stopColor="#a7abb1" />
            </linearGradient>
            <radialGradient id="floorGlow" cx="0.5" cy="0.42" r="0.6">
              <stop offset="0" stopColor="#000000" stopOpacity="0" />
              <stop offset="1" stopColor="#050d18" stopOpacity="0.28" />
            </radialGradient>
          </defs>
          <rect width="1200" height="900" fill="url(#navyBg)" />
          <path
            d="M470 -20 H1220 V920 H720 C 560 730, 700 470, 520 360 C 430 302, 470 150, 470 -20 Z"
            fill="url(#greyBg)"
          />
          {/* soft shadow along the curve */}
          <path
            d="M470 -20 C 470 150, 430 302, 520 360 C 700 470, 560 730, 720 920"
            fill="none"
            stroke="#0b1626"
            strokeOpacity="0.16"
            strokeWidth="26"
            style={{ filter: "blur(10px)" }}
          />
          <rect width="1200" height="900" fill="url(#floorGlow)" />
        </svg>
      </div>

      {/* top scrim so the navbar stays legible over the backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28"
        style={{ background: "linear-gradient(to bottom, rgba(226,229,232,0.55), transparent)" }}
      />

      {/* 3D still-life — full bleed */}
      <div aria-hidden className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* centre vignette to seat the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(42% 38% at 50% 46%, rgba(20,32,50,0.34) 0%, rgba(20,32,50,0.10) 45%, transparent 72%)",
        }}
      />

      {/* overlay copy */}
      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : fade }}
        className="pointer-events-none relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.14em" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-glass hero-glass-frost px-4 text-[13vw] leading-none sm:text-[11vw] lg:text-[9rem]"
        >
          NOORACO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-4 text-[11px] font-medium uppercase tracking-[0.34em] text-[#e8ecef] sm:text-sm"
          style={{ textShadow: "0 1px 6px rgba(10,20,34,0.55)" }}
        >
          لوازم و ابزار تخصصی خیاطی
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="pointer-events-auto mt-9"
        >
          <Magnetic strength={0.3}>
            <a
              href="#bento"
              className="inline-flex items-center gap-3 border border-white/55 bg-white/5 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink-900"
              style={{ textShadow: "0 1px 4px rgba(10,20,34,0.4)" }}
            >
              مشاهده مجموعه
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-widest2 text-white/70"
        style={{ textShadow: "0 1px 4px rgba(10,20,34,0.5)" }}
      >
        <span className="serif italic normal-case text-sm">scroll</span>
        <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
