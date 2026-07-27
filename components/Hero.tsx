"use client";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroFade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const rotY = useTransform(sx, (v) => (v - 0.5) * 24);
  const rotX = useTransform(sy, (v) => (v - 0.5) * -14);
  const trX = useTransform(sx, (v) => (v - 0.5) * -30);
  const trY = useTransform(sy, (v) => (v - 0.5) * -30);
  const blobX = useTransform(sx, (v) => (v - 0.5) * 60);
  const blobY = useTransform(sy, (v) => (v - 0.5) * 60);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[92svh] flex-col justify-between overflow-hidden pt-24 pb-10 sm:pt-28"
    >
      {/* ambient blobs */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="blob left-[-10%] top-[10%] h-[380px] w-[380px] bg-ink-900/25 sm:h-[520px] sm:w-[520px]"
      />
      <motion.div
        style={{ x: blobY, y: blobX }}
        className="blob right-[-10%] bottom-[10%] h-[320px] w-[320px] bg-ink-500/50 sm:h-[480px] sm:w-[480px]"
      />

      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]"
        style={{
          backgroundImage:
            "linear-gradient(#102b42 1px, transparent 1px), linear-gradient(90deg, #102b42 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroFade }}
        className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-between container-x"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex items-baseline justify-between gap-4 text-[10px] uppercase tracking-widest2 text-ink-900/60"
        >
          <span>Est. 2014 · Tehran, IR</span>
          <span className="hidden sm:block">فصل ۰۱ / ۲۰۲۶</span>
          <span className="serif italic text-sm text-ink-900/80">
            no. 001
          </span>
        </motion.div>

        {/* Big editorial headline */}
        <div className="mt-10 flex flex-1 flex-col justify-center sm:mt-14">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-ink-900"
          >
            <span className="block serif italic text-[8vw] leading-[0.95] text-ink-900/80 sm:text-[5vw] lg:text-[4vw]">
              the art of
            </span>
            <span
              className="display block text-[13vw] leading-[0.92] sm:text-[10vw] lg:text-[8vw]"
              style={{ fontWeight: 300 }}
            >
              {"نوراکو".split("").map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0)" }}
                  transition={{
                    delay: 0.25 + i * 0.08,
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 flex flex-wrap items-end gap-4 text-[10px] uppercase tracking-widest2 text-ink-900/60 sm:mt-3 sm:text-[11px]">
              <span>industrial sewing parts</span>
              <span className="hidden h-3 w-px bg-ink-900/30 sm:inline-block" />
              <span className="serif italic normal-case text-base tracking-normal text-ink-900/70 sm:text-lg">
                — کیفیت. دقت. اصالت.
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Bottom row: copy + CTAs + machine */}
        <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="lg:col-span-6"
          >
            <p className="max-w-md text-sm leading-7 text-ink-900/80 sm:text-base sm:leading-8">
              از سوزن تا موتور — نوراکو مرجع تخصصی قطعات چرخ‌های خیاطی صنعتی
              در ایران است. همراهِ کارگاه‌های حرفه‌ای، از ۱۳۹۳.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton href="#bento">
                <span>کاوش در مجموعه</span>
                <ArrowUpLeft className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#craft"
                className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900/70"
              >
                داستان برند
              </a>
            </div>
          </motion.div>

          {/* 3D perspective machine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative lg:col-span-6"
          >
            <div className="perspective mx-auto max-w-sm">
              <motion.div
                style={{
                  rotateY: rotY,
                  rotateX: rotX,
                  x: trX,
                  y: trY,
                  transformStyle: "preserve-3d",
                }}
                className="relative aspect-[5/4] w-full"
              >
                {/* stacked plates */}
                <div
                  className="absolute inset-0 rounded-3xl bg-ink-900/8"
                  style={{ transform: "translateZ(-30px)" }}
                />
                <div
                  className="absolute inset-0 rounded-3xl bg-ink-50 shadow-[0_60px_120px_-40px_rgba(11,30,48,0.5)]"
                  style={{ transform: "translateZ(0)" }}
                />
                {/* main SVG machine */}
                <div
                  className="relative h-full w-full"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <MachineArt />
                </div>

                {/* floating chips */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 right-4 chip bg-ink-50/90 text-ink-900"
                  style={{ transform: "translateZ(90px)" }}
                >
                  ● منتخب امروز — PIN
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 left-4 chip bg-ink-900 text-ink-100 border-ink-900"
                  style={{ transform: "translateZ(90px)" }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-500" />
                  دقت دوخت ۹۹٫۹٪
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-center justify-between border-t border-line pt-4 text-[10px] uppercase tracking-widest2 text-ink-900/55"
        >
          <span className="flex items-center gap-2">
            <span className="serif italic normal-case text-sm text-ink-900/70">scroll</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </span>
          <span className="hidden sm:inline">۶۰۰۰+ کد کالا · ۳۲ استان</span>
          <span>Nooraco Studio™</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink-900 px-6 py-3 text-sm text-ink-100 transition-colors hover:bg-ink-800"
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 -z-0 origin-left scale-x-0 rounded-full bg-ink-800 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100"
      />
    </motion.a>
  );
}

function MachineArt() {
  return (
    <svg viewBox="0 0 500 400" className="h-full w-full">
      <defs>
        <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#102b42" />
          <stop offset="0.5" stopColor="#17476b" />
          <stop offset="1" stopColor="#0a1d31" />
        </linearGradient>
        <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#6f8fa3" />
          <stop offset="1" stopColor="#102b42" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#6f8fa3" stopOpacity="0.6" />
          <stop offset="1" stopColor="#6f8fa3" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* soft glow behind wheel */}
      <circle cx="120" cy="240" r="80" fill="url(#glow)" />

      {/* base */}
      <rect x="30" y="290" width="440" height="70" rx="10" fill="url(#body)" />
      <rect x="30" y="285" width="440" height="6" rx="3" fill="#3a6a8a" opacity="0.35" />

      {/* body */}
      <path
        d="M60 290 V150 C60 115 90 100 130 100 H400 C425 100 440 118 440 148 V240 C440 260 425 275 400 275 H240 V290 Z"
        fill="url(#body)"
      />
      {/* head */}
      <rect x="395" y="120" width="42" height="160" rx="8" fill="#0a1d31" />
      <rect x="395" y="120" width="42" height="8" rx="3" fill="#3a6a8a" opacity="0.4" />

      {/* spool pins */}
      <g fill="#ebebee">
        <rect x="120" y="70" width="3" height="40" rx="1.5" />
        <rect x="360" y="70" width="3" height="40" rx="1.5" />
        <ellipse cx="121.5" cy="70" rx="12" ry="4" fill="#6f8fa3" />
        <ellipse cx="361.5" cy="70" rx="12" ry="4" fill="#6f8fa3" />
      </g>

      {/* hand wheel */}
      <g>
        <circle cx="120" cy="240" r="42" fill="#0a1d31" />
        <circle cx="120" cy="240" r="28" fill="url(#metal)" />
        <circle cx="120" cy="240" r="6" fill="#0a1d31" />
      </g>

      {/* needle bar */}
      <rect x="410" y="270" width="10" height="50" rx="3" fill="url(#metal)" />

      {/* fabric */}
      <path
        d="M40 355 Q250 320 460 355 L460 400 L40 400 Z"
        fill="#ebebee"
      />

      {/* stitch line */}
      <motion.path
        d="M60 370 H440"
        stroke="#102b42"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        fill="none"
      />

      {/* brand callout */}
      <g>
        <line x1="440" y1="140" x2="475" y2="105" stroke="#102b42" strokeWidth="0.8" />
        <circle cx="440" cy="140" r="2.5" fill="#102b42" />
        <text x="478" y="102" fill="#102b42" fontSize="9" letterSpacing="1.8" style={{ fontFamily: "var(--font-serif)" }}>
          steel · precision
        </text>
      </g>
      <g>
        <line x1="120" y1="240" x2="70" y2="180" stroke="#102b42" strokeWidth="0.8" />
        <circle cx="120" cy="240" r="2.5" fill="#102b42" />
        <text x="20" y="176" fill="#102b42" fontSize="9" letterSpacing="1.8" style={{ fontFamily: "var(--font-serif)" }}>
          hand wheel
        </text>
      </g>
    </svg>
  );
}
