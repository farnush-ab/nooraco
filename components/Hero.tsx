"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
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

  // If /hero.jpg isn't present yet, fall back to the 3D scene.
  const [useImage, setUseImage] = useState(true);

  // gentle pointer parallax for the photo
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20 });
  const sy = useSpring(py, { stiffness: 90, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        if (reduce) return;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        px.set(-x * 22);
        py.set(-y * 16);
      }}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      {/* two-tone studio backdrop (also the base behind the 3D fallback) */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="navyBg" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0" stopColor="#28384f" />
              <stop offset="1" stopColor="#141f33" />
            </linearGradient>
            <linearGradient id="greyBg" x1="1" y1="0" x2="0.2" y2="1">
              <stop offset="0" stopColor="#cdd1d6" />
              <stop offset="1" stopColor="#a7abb1" />
            </linearGradient>
          </defs>
          <rect width="1200" height="900" fill="url(#navyBg)" />
          <path
            d="M470 -20 H1220 V920 H720 C 560 730, 700 470, 520 360 C 430 302, 470 150, 470 -20 Z"
            fill="url(#greyBg)"
          />
        </svg>
      </div>

      {/* visual layer: photo (preferred) or the 3D still-life */}
      <div aria-hidden className="absolute inset-0 z-0">
        {useImage ? (
          <motion.img
            src="/hero.png"
            alt=""
            onError={() => setUseImage(false)}
            style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}
            initial={{ scale: 1.06 }}
            animate={reduce ? { scale: 1.06 } : { scale: [1.08, 1.13, 1.08] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full select-none object-cover"
            draggable={false}
          />
        ) : (
          <HeroScene />
        )}
      </div>

      {/* top scrim for navbar legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-28"
        style={{ background: "linear-gradient(to bottom, rgba(20,28,42,0.35), transparent)" }}
      />

      {/* centre vignette to seat the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(44% 40% at 50% 46%, rgba(16,26,42,0.42) 0%, rgba(16,26,42,0.14) 46%, transparent 74%)",
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
          className="hero-glass text-[13vw] leading-none sm:text-[11vw] lg:text-[9rem]"
        >
          NOORACO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-4 text-[11px] font-medium uppercase tracking-[0.34em] text-[#eef1f4] sm:text-sm"
          style={{ textShadow: "0 1px 8px rgba(10,20,34,0.7)" }}
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
              className="inline-flex items-center gap-3 border border-white/60 bg-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink-900"
              style={{ textShadow: "0 1px 4px rgba(10,20,34,0.5)" }}
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
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-widest2 text-white/75"
        style={{ textShadow: "0 1px 4px rgba(10,20,34,0.6)" }}
      >
        <span className="serif italic normal-case text-sm">scroll</span>
        <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
