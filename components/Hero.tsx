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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[94svh] flex-col justify-center overflow-hidden pt-28 pb-10 sm:pt-32"
    >
      {/* soft light field */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 100% at 30% 15%, #f6f7f9 0%, #ebebee 55%, #e3e7ea 100%)",
        }}
      />
      <div className="blob left-[-10%] top-[6%] -z-10 h-[380px] w-[380px] bg-ink-300/40" />
      <div className="blob right-[-8%] bottom-[2%] -z-10 h-[420px] w-[420px] bg-ink-500/20" />

      <motion.div
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : fade }}
        className="relative mx-auto grid w-full max-w-[1240px] items-center gap-8 container-x lg:grid-cols-12 lg:gap-10"
      >
        {/* text — right in RTL */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="block h-px w-8 bg-ink-900/40" />
            <span className="kicker">industrial sewing parts</span>
            <span className="serif italic text-sm text-ink-900/60">· از ۱۳۹۳</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-6 text-[10vw] leading-[1.05] text-ink-900 sm:text-[6vw] lg:text-[3.9vw]"
          >
            قطعاتی که کارگاهِ شما را{" "}
            <span className="italic-serif italic text-ink-800">زنده</span>{" "}
            نگه می‌دارند.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="mt-7 max-w-md text-sm leading-8 text-ink-900/75 sm:text-base"
          >
            نوراکو، مرجع تخصصی قطعات چرخ‌های خیاطی صنعتی در ایران —
            همراهِ کارگاه‌های حرفه‌ای، ساده و قابل‌اعتماد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <Magnetic strength={0.35}>
              <a
                href="#bento"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-900 px-6 py-3 text-sm text-ink-100 transition-colors hover:bg-ink-800"
              >
                <span>کاوش در مجموعه</span>
                <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-rotate-45" />
              </a>
            </Magnetic>
            <a
              href="#chapters"
              className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900/70"
            >
              بر اساس چرخِ شما
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex items-center gap-6 text-[10px] uppercase tracking-widest2 text-ink-900/45"
          >
            <span>۶۰۰۰+ کد کالا</span>
            <span className="h-px w-6 bg-ink-900/20" />
            <span>۳۲ استان تحت پوشش</span>
          </motion.div>
        </div>

        {/* 3D stage — left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/60 sm:aspect-[5/4] lg:aspect-square">
            {/* stage backdrop */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 80% at 50% 30%, #f3f6f8 0%, #dde5ea 60%, #cdd8e0 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(16,43,66,0.10) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
              }}
            />
            <div className="absolute inset-0">
              <HeroScene />
            </div>
            {/* corner caption */}
            <div className="pointer-events-none absolute right-5 top-5 text-right">
              <div className="kicker text-ink-900/45">figure 001</div>
              <div className="serif italic mt-1 text-sm text-ink-900/70">
                the machine
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative mx-auto mt-10 flex w-full max-w-[1240px] items-center justify-between gap-6 container-x text-[10px] uppercase tracking-widest2 text-ink-900/45"
      >
        <span className="flex items-center gap-2">
          <span className="serif italic normal-case text-sm text-ink-900/65">scroll</span>
          <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            ↓
          </motion.span>
        </span>
        <span>Nooraco Studio™ · Tehran</span>
      </motion.div>
    </section>
  );
}
