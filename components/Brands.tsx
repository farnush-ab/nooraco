"use client";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";

const brands = [
  {
    name: "PIN",
    tagline: "قیچی و ابزار دستی",
    en: "Hand & Cutting Tools",
    desc: "خط تخصصی سوزن، قیچی و ابزار برشی. ساخت آلمان و ژاپن، دقت و ماندگاری بی‌رقیب.",
    palette: "bg-ink-50 text-ink-900",
    accent: "text-ink-800",
  },
  {
    name: "STRONG H",
    tagline: "قطعات داخلی چرخ‌های صنعتی",
    en: "Industrial Internals",
    desc: "چرخ‌دنده‌ها، یاتاقان‌ها و قطعات داخلی برای انواع چرخ‌های صنعتی پرکار.",
    palette: "bg-ink-900 text-ink-100",
    accent: "text-ink-500",
  },
];

export default function Brands() {
  return (
    <section id="brands" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] container-x">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
          <span>۰۵ · brands</span>
          <span className="h-px w-8 bg-line" />
          <span className="serif italic normal-case text-sm text-ink-900/60">
            in-house
          </span>
        </div>
        <h2 className="display mt-4 max-w-4xl text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
          دو خط، یک <span className="italic-serif italic text-ink-800">تعهد</span>
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {brands.map((b, i) => (
            <motion.a
              key={b.name}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 lg:min-h-[340px] ${b.palette}`}
            >
              {/* big shadow brand mark */}
              <div
                aria-hidden
                className={`pointer-events-none absolute -bottom-14 -left-6 select-none text-[42vw] leading-none opacity-[0.06] sm:text-[26vw] lg:text-[16vw]`}
                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
              >
                {b.name.split("")[0]}
              </div>

              <div className="relative flex items-center justify-between">
                <span className="kicker" style={{ color: "currentColor", opacity: 0.6 }}>
                  brand · 0{i + 1}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-current/25 transition-transform group-hover:-rotate-45">
                  <ArrowUpLeft className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="relative mt-10">
                <h3 className="display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                  {b.name}
                </h3>
                <div className={`mt-3 serif italic text-base ${b.accent}`}>
                  — {b.tagline}
                </div>
                <div className="kicker mt-1" style={{ color: "currentColor", opacity: 0.5 }}>
                  {b.en}
                </div>
              </div>

              <p className="relative mt-6 max-w-md text-sm leading-7 opacity-85">
                {b.desc}
              </p>

              <div
                className="relative mt-8 grid grid-cols-3 gap-2"
              >
                {[
                  ["منتخب", "۲۴"],
                  ["استاندارد", "ISO"],
                  ["گارانتی", "۱۲ ماه"],
                ].map(([k, v], j) => (
                  <div
                    key={j}
                    className="rounded-xl border border-current/15 px-3 py-2.5"
                  >
                    <div className="kicker" style={{ color: "currentColor", opacity: 0.55 }}>
                      {k}
                    </div>
                    <div className="serif mt-1 text-base">{v}</div>
                  </div>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
