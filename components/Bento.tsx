"use client";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import TiltSpot from "./ui/TiltSpot";

const cats = [
  { title: "قیچی", en: "Scissors", count: 320, kind: "scissor", span: "col-span-2 lg:col-span-6 lg:row-span-2 aspect-[5/4] sm:aspect-square lg:aspect-auto" },
  { title: "سوزن", en: "Needles", count: 540, kind: "needle", span: "col-span-1 lg:col-span-3 aspect-square" },
  { title: "فولدر و پایه", en: "Folders & Feet", count: 410, kind: "foot", span: "col-span-1 lg:col-span-3 aspect-square" },
  { title: "ماشین‌آلات دوخت و برش", en: "Sewing & Cutting Machines", count: 96, kind: "machine", span: "col-span-1 lg:col-span-3 aspect-square" },
  { title: "ابزار برش", en: "Cutting Tools", count: 180, kind: "blade", span: "col-span-1 lg:col-span-3 aspect-square" },
  { title: "اکسسوری خیاطی", en: "Sewing Accessories", count: 260, kind: "bobbin", span: "col-span-1 lg:col-span-6 aspect-square lg:aspect-[2/1]" },
  { title: "قطعات یدکی خیاطی", en: "Spare Parts", count: 612, kind: "gear", span: "col-span-1 lg:col-span-6 aspect-square lg:aspect-[2/1]" },
];

function Illus({ kind }: { kind: string }) {
  const s = { stroke: "#ebebee", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full opacity-90">
      {kind === "scissor" && (
        <g {...s}>
          <circle cx="30" cy="70" r="9" />
          <circle cx="62" cy="70" r="9" />
          <line x1="37" y1="63" x2="84" y2="20" />
          <line x1="55" y1="63" x2="18" y2="24" />
          <circle cx="46" cy="50" r="1.6" />
        </g>
      )}
      {kind === "needle" && (
        <g {...s}>
          <line x1="50" y1="8" x2="50" y2="92" />
          <ellipse cx="50" cy="20" rx="3" ry="6" />
          <path d="M42 88 L50 92 L58 88" />
        </g>
      )}
      {kind === "foot" && (
        <g {...s}>
          <line x1="50" y1="12" x2="50" y2="30" />
          <rect x="44" y="30" width="12" height="8" rx="2" />
          <path d="M34 40 H66 V58 Q66 80 50 80 Q34 80 34 58 Z" />
          <line x1="50" y1="44" x2="50" y2="76" strokeDasharray="2 3" />
        </g>
      )}
      {kind === "machine" && (
        <g {...s}>
          <rect x="21" y="12" width="3.4" height="9" rx="1.5" />
          <rect x="72" y="12" width="3.4" height="9" rx="1.5" />
          <path d="M16 22 H84 V31 H68 C68 44 59 50 47 50 V63 C47 72 40 80 28 80 H16 Z" />
          <circle cx="30" cy="46" r="6" />
        </g>
      )}
      {kind === "blade" && (
        <g {...s}>
          <circle cx="40" cy="56" r="24" />
          <circle cx="40" cy="56" r="4" />
          <path d="M57 39 L74 22" />
          <path d="M69 18 L80 29" />
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
    </svg>
  );
}

export default function Bento() {
  return (
    <section id="bento" className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-[1180px] container-x">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۲ · collection</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">all categories</span>
            </div>
            <h2 className="display mt-4 text-2xl leading-[1] text-ink-900 sm:text-3xl lg:text-4xl">
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
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-3.5">
          {cats.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className={c.span}
            >
              <TiltSpot max={7} className="h-full w-full">
                <a
                  href="#"
                  className="group relative flex h-full w-full overflow-hidden rounded-2xl bg-ink-900 text-ink-100 sm:rounded-3xl"
                >
                  {/* corner meta */}
                  <div
                    className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5"
                    style={{ transform: "translateZ(28px)" }}
                  >
                    <span className="kicker text-ink-100/60">0{i + 1}</span>
                    <span className="kicker text-ink-100/60">
                      {c.count.toLocaleString("fa-IR")}
                    </span>
                  </div>
                  {/* illustration */}
                  <div className="absolute inset-5 sm:inset-6 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transform: "translateZ(46px)" }}
                      className="h-1/2 w-1/2 sm:h-3/5 sm:w-3/5"
                    >
                      <Illus kind={c.kind} />
                    </motion.div>
                  </div>
                  {/* label bottom */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4 sm:p-5"
                    style={{ transform: "translateZ(34px)" }}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="serif text-sm leading-tight text-ink-100 sm:text-base">
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
                </a>
              </TiltSpot>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
