"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroFade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92svh] flex-col justify-between overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-12"
    >
      {/* subtle ambient blob (brand navy only) */}
      <div className="blob left-[-15%] top-[15%] h-[420px] w-[420px] bg-ink-800/12" />
      <div className="blob right-[-10%] bottom-[10%] h-[460px] w-[460px] bg-ink-500/18" />

      <motion.div
        style={{ y: heroY, opacity: heroFade }}
        className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col container-x"
      >
        {/* top meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between text-[10px] uppercase tracking-widest2 text-ink-900/55"
        >
          <span>Est. 1393 · Tehran</span>
          <span className="hidden sm:inline">issue 01 · ۲۰۲۶</span>
          <span className="serif italic normal-case text-sm text-ink-900/75">no. 001</span>
        </motion.div>

        {/* main content — asymmetric editorial */}
        <div className="mt-auto grid flex-1 gap-10 pt-16 sm:pt-20 lg:grid-cols-12 lg:items-end lg:gap-16">
          {/* text column */}
          <div className="lg:col-span-7 lg:pb-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <span className="block h-px w-7 bg-ink-900/40" />
              <span className="kicker">industrial sewing parts</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[9vw] leading-[1.02] text-ink-900 sm:text-[6vw] lg:text-[4.4vw]"
            >
              قطعاتی که کارگاهِ شما را{" "}
              <span className="italic-serif italic text-ink-800">زنده</span>{" "}
              نگه می‌دارند.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 max-w-md text-sm leading-8 text-ink-900/75 sm:text-base"
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
              <a
                href="#bento"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-900 px-6 py-3 text-sm text-ink-100 transition-colors hover:bg-ink-800"
              >
                <span>کاوش در مجموعه</span>
                <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-rotate-45" />
              </a>
              <a
                href="#craft"
                className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900/70"
              >
                داستان برند
              </a>
            </motion.div>
          </div>

          {/* right art column */}
          <motion.div
            style={{ y: artY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative lg:col-span-5"
          >
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-ink-50/70">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#102b42 1px, transparent 1px), linear-gradient(90deg, #102b42 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative flex h-full w-full items-center justify-center p-8">
                  <MachineArt />
                </div>

                {/* corner caption */}
                <div className="absolute right-5 top-5 text-right">
                  <div className="kicker text-ink-900/50">figure 001</div>
                  <div className="serif italic mt-1 text-sm text-ink-900/80">
                    industrial machine
                  </div>
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between text-[10px] uppercase tracking-widest2 text-ink-900/50">
                <span>plate 01 / 24</span>
                <span className="serif italic normal-case text-xs text-ink-900/60">
                  — from the noora archive
                </span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        {/* bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-14 flex items-center justify-between gap-6 border-t border-line pt-5 text-[10px] uppercase tracking-widest2 text-ink-900/50 sm:mt-16"
        >
          <span className="flex items-center gap-2">
            <span className="serif italic normal-case text-sm text-ink-900/70">scroll</span>
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

function MachineArt() {
  return (
    <svg viewBox="0 0 400 500" className="h-full w-full">
      <defs>
        <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#17476b" />
          <stop offset="1" stopColor="#102b42" />
        </linearGradient>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#aebcc5" />
          <stop offset="1" stopColor="#6f8fa3" />
        </linearGradient>
      </defs>

      {/* soft shadow */}
      <ellipse cx="200" cy="440" rx="150" ry="10" fill="#102b42" opacity="0.08" />

      {/* base */}
      <rect x="40" y="330" width="320" height="70" rx="10" fill="url(#body)" />

      {/* body */}
      <path
        d="M60 330 V180 C60 150 90 138 130 138 H320 C345 138 360 156 360 184 V270 C360 292 345 305 320 305 H200 V330 Z"
        fill="url(#body)"
      />

      {/* head */}
      <rect x="308" y="152" width="42" height="150" rx="8" fill="#102b42" />

      {/* spool pins */}
      <g fill="#aebcc5">
        <rect x="112" y="108" width="3" height="34" rx="1.5" />
        <rect x="290" y="108" width="3" height="34" rx="1.5" />
        <ellipse cx="113.5" cy="108" rx="10" ry="3.5" fill="#6f8fa3" />
        <ellipse cx="291.5" cy="108" rx="10" ry="3.5" fill="#6f8fa3" />
      </g>

      {/* hand wheel */}
      <g>
        <circle cx="100" cy="240" r="34" fill="#102b42" />
        <circle cx="100" cy="240" r="22" fill="url(#metal)" />
        <circle cx="100" cy="240" r="5" fill="#102b42" />
      </g>

      {/* needle bar */}
      <rect x="322" y="290" width="10" height="52" rx="3" fill="url(#metal)" />

      {/* fabric */}
      <path d="M50 405 Q200 372 350 405 L350 445 L50 445 Z" fill="#ebebee" />

      {/* fine stitch line */}
      <line
        x1="60"
        y1="425"
        x2="340"
        y2="425"
        stroke="#102b42"
        strokeWidth="1"
        strokeDasharray="3 6"
        fill="none"
      />
    </svg>
  );
}
