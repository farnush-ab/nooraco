"use client";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";

const cats = [
  { title: "سوزن و قیچی", en: "Needles & Scissors", count: 540, kind: "needle", span: "lg:col-span-6 lg:row-span-2 aspect-[4/5] lg:aspect-auto" },
  { title: "چرخ‌دنده", en: "Gears", count: 612, kind: "gear", span: "lg:col-span-3 aspect-square" },
  { title: "ماسوره", en: "Bobbins", count: 280, kind: "bobbin", span: "lg:col-span-3 aspect-square" },
  { title: "موتور و کلاچ", en: "Motors & Clutches", count: 124, kind: "motor", span: "lg:col-span-4 aspect-[4/3]" },
  { title: "ابزار سرویس", en: "Service Tools", count: 89, kind: "tool", span: "lg:col-span-4 aspect-[4/3]" },
  { title: "برد الکترونیک", en: "Electronic Boards", count: 67, kind: "board", span: "lg:col-span-4 aspect-[4/3]" },
];

function Illus({ kind }: { kind: string }) {
  const s = { stroke: "#ebebee", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full opacity-90">
      {kind === "needle" && (
        <g {...s}>
          <line x1="50" y1="8" x2="50" y2="92" />
          <circle cx="50" cy="18" r="3" />
          <path d="M40 88 L50 92 L60 88" />
          <line x1="45" y1="45" x2="55" y2="45" strokeDasharray="1 3" />
        </g>
      )}
      {kind === "gear" && (
        <g {...s}>
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="6" />
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k * Math.PI * 2) / 10;
            const x1 = 50 + Math.cos(a) * 24;
            const y1 = 50 + Math.sin(a) * 24;
            const x2 = 50 + Math.cos(a) * 34;
            const y2 = 50 + Math.sin(a) * 34;
            return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}
      {kind === "bobbin" && (
        <g {...s}>
          <ellipse cx="50" cy="24" rx="22" ry="4" />
          <ellipse cx="50" cy="76" rx="22" ry="4" />
          <line x1="28" y1="24" x2="28" y2="76" />
          <line x1="72" y1="24" x2="72" y2="76" />
          <rect x="34" y="30" width="32" height="40" rx="1" strokeDasharray="1 3" />
        </g>
      )}
      {kind === "motor" && (
        <g {...s}>
          <rect x="14" y="30" width="50" height="40" rx="3" />
          <circle cx="76" cy="50" r="10" />
          <line x1="70" y1="30" x2="70" y2="70" />
          <circle cx="26" cy="42" r="2" />
          <circle cx="26" cy="58" r="2" />
        </g>
      )}
      {kind === "tool" && (
        <g {...s}>
          <path d="M18 80 L58 40 M32 26 a10 10 0 1 0 14 14 L64 58" />
          <circle cx="18" cy="80" r="4" />
        </g>
      )}
      {kind === "board" && (
        <g {...s}>
          <rect x="12" y="20" width="76" height="60" rx="2" />
          <circle cx="24" cy="34" r="3" />
          <circle cx="76" cy="34" r="3" />
          <line x1="24" y1="50" x2="76" y2="50" strokeDasharray="1 2" />
          <line x1="24" y1="60" x2="76" y2="60" strokeDasharray="1 2" />
          <line x1="24" y1="70" x2="76" y2="70" strokeDasharray="1 2" />
        </g>
      )}
    </svg>
  );
}

export default function Bento() {
  return (
    <section id="bento" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] container-x">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۲ · collection</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">six chapters</span>
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
              مجموعه‌ی <span className="italic-serif italic text-ink-800">کامل</span>
            </h2>
          </div>
          <a
            href="#"
            className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900"
          >
            همه ۲۴ دسته →
          </a>
        </div>

        {/* bento grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
          {cats.map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className={`group relative col-span-2 overflow-hidden rounded-2xl bg-ink-900 text-ink-100 sm:rounded-3xl ${c.span}`}
            >
              {/* corner meta */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
                <span className="kicker text-ink-100/60">0{i + 1}</span>
                <span className="kicker text-ink-100/60">
                  {c.count.toLocaleString("fa-IR")}
                </span>
              </div>
              {/* illustration */}
              <div className="absolute inset-6 sm:inset-8 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -4 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-2/3 w-2/3 sm:h-3/4 sm:w-3/4"
                >
                  <Illus kind={c.kind} />
                </motion.div>
              </div>
              {/* label bottom */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4 sm:p-5">
                <div>
                  <div className="serif text-base text-ink-100 sm:text-lg">
                    {c.title}
                  </div>
                  <div className="mt-0.5 kicker text-ink-100/50">{c.en}</div>
                </div>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-ink-100/30 text-ink-100 transition-transform group-hover:-rotate-45">
                  <ArrowUpLeft className="h-3 w-3" />
                </span>
              </div>
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink-800/0 via-ink-800/0 to-ink-800/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
