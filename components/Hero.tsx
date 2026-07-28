"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Magnetic from "./ui/Magnetic";

// WebGL scene is client-only and lazy — never blocks first paint or SSR.
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink-950 pt-28 pb-8 text-ink-100 sm:pt-32 sm:pb-12"
    >
      {/* deep brand-navy field */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 8%, #17476b 0%, #102b42 42%, #081726 100%)",
        }}
      />
      {/* ambient glows */}
      <div className="blob left-[8%] top-[12%] -z-10 h-[420px] w-[420px] bg-ink-700/25" />
      <div className="blob right-[-6%] bottom-[6%] -z-10 h-[520px] w-[520px] bg-ink-800/40" />

      {/* 3D canvas — full bleed, sits behind the copy */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scale: sceneScale }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="pointer-events-auto absolute inset-0">
          <HeroScene />
        </div>
      </motion.div>

      {/* legibility scrim on the reading (right, RTL) side */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(270deg, rgba(8,23,38,0.85) 0%, rgba(8,23,38,0.45) 34%, rgba(8,23,38,0) 62%)",
        }}
      />
      {/* fine grid + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#ebebee 1px, transparent 1px), linear-gradient(90deg, #ebebee 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at 60% 40%, black 0%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : fade }}
        className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col container-x"
      >
        {/* top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between text-[10px] uppercase tracking-widest2 text-ink-100/55"
        >
          <span>Est. 1393 · Tehran</span>
          <span className="hidden sm:inline">issue 01 · ۲۰۲۶</span>
          <span className="serif italic normal-case text-sm text-ink-100/70">no. 001</span>
        </motion.div>

        {/* headline block */}
        <div className="mt-auto max-w-3xl pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="block h-px w-8 bg-ink-100/40" />
            <span className="kicker text-ink-100/60">industrial sewing parts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-6 text-[9.5vw] leading-[1.04] text-ink-100 sm:text-[6vw] lg:text-[4.2vw]"
          >
            قطعاتی که کارگاهِ شما را{" "}
            <span className="italic-serif italic text-ink-300">زنده</span>{" "}
            نگه می‌دارند.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-8 max-w-md text-sm leading-8 text-ink-100/75 sm:text-base"
          >
            نوراکو، مرجع تخصصی قطعات چرخ‌های خیاطی صنعتی در ایران —
            همراهِ کارگاه‌های حرفه‌ای از سال ۱۳۹۳.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            <Magnetic strength={0.35}>
              <a
                href="#bento"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-100 px-6 py-3 text-sm text-ink-900 transition-colors hover:bg-white"
              >
                <span>کاوش در مجموعه</span>
                <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-rotate-45" />
              </a>
            </Magnetic>
            <a
              href="#craft"
              className="hover-line text-[11px] uppercase tracking-widest2 text-ink-100/70"
            >
              داستان برند
            </a>
          </motion.div>
        </div>

        {/* bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-14 flex items-center justify-between gap-6 border-t border-ink-100/15 pt-5 text-[10px] uppercase tracking-widest2 text-ink-100/50 sm:mt-16"
        >
          <span className="flex items-center gap-2">
            <span className="serif italic normal-case text-sm text-ink-100/70">scroll</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </span>
          <span className="hidden sm:inline">۶۰۰۰+ کد کالا · ۳۲ استان تحت پوشش</span>
          <span>Nooraco Studio™</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
