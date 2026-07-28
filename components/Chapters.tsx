"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useRef } from "react";

const chapters = [
  {
    en: "Straight Stitch",
    name: "راسته دوز",
    desc: "چرخ‌های تک‌سوزن صنعتی برای دوخت مستقیم؛ سرعت بالا و دقت میلی‌متری.",
    speed: "۵۵۰۰",
    illus: "straight",
    accent: "bg-ink-900 text-ink-100",
  },
  {
    en: "Overlock",
    name: "سردوز",
    desc: "اورلاک‌های ۳ تا ۵ نخ برای پرداخت لبه و دوخت کشسان.",
    speed: "۷۰۰۰",
    illus: "overlock",
    accent: "bg-ink-100 text-ink-900",
  },
  {
    en: "Coverstitch",
    name: "میاندوز",
    desc: "کاوراستیچ برای دوخت تزئینی و حاشیه‌ای روی پارچه‌های کشی.",
    speed: "۶۲۰۰",
    illus: "cover",
    accent: "bg-ink-800 text-ink-900",
  },
];

function ChapterArt({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-auto">
      <defs>
        <linearGradient id="c-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g fill="url(#c-body)">
        {kind === "straight" && (
          <>
            <rect x="20" y="180" width="360" height="40" rx="6" />
            <path d="M40 180 V90 C40 65 60 55 90 55 H340 C360 55 370 70 370 90 V150 H220 V180 Z" />
            <rect x="345" y="80" width="30" height="80" rx="4" opacity="0.55" />
            <circle cx="70" cy="130" r="20" opacity="0.55" />
          </>
        )}
        {kind === "overlock" && (
          <>
            <rect x="20" y="180" width="360" height="40" rx="6" />
            <path d="M30 180 V110 C30 85 55 70 85 70 H340 C360 70 370 90 370 108 V180 Z" />
            <circle cx="70" cy="140" r="14" opacity="0.55" />
            <circle cx="130" cy="100" r="8" opacity="0.55" />
            <circle cx="170" cy="100" r="8" opacity="0.55" />
            <circle cx="210" cy="100" r="8" opacity="0.55" />
          </>
        )}
        {kind === "cover" && (
          <>
            <rect x="20" y="180" width="360" height="40" rx="6" />
            <path d="M40 180 V80 C40 60 55 50 80 50 H340 C360 50 370 65 370 82 V180 Z" />
            <rect x="300" y="75" width="45" height="100" rx="5" opacity="0.6" />
            <rect x="308" y="180" width="4" height="18" opacity="0.7" />
            <rect x="318" y="180" width="4" height="18" opacity="0.7" />
            <rect x="328" y="180" width="4" height="18" opacity="0.7" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function Chapters() {
  return (
    <section id="chapters" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] container-x">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۳ · chapters</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">by machine</span>
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
              بر اساس <span className="italic-serif italic text-ink-800">چرخِ شما</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-900/70 leading-7">
            سه چرخ صنعتی، سه دنیای متفاوت از قطعات. انتخاب هدفمند مطابق نیاز کارگاه.
          </p>
        </div>
      </div>

      {/* sticky-ish stacking chapters */}
      <div className="mt-12 flex flex-col gap-4 sm:gap-6">
        {chapters.map((c, i) => (
          <ChapterCard key={c.name} chapter={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function ChapterCard({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-6 sm:mx-14 lg:mx-24 xl:mx-[140px]"
    >
      <a
        href="#"
        className={`group relative flex flex-col overflow-hidden rounded-3xl ${chapter.accent} md:min-h-[300px] md:flex-row`}
      >
        {/* left copy */}
        <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between">
            <span className="kicker" style={{ color: "currentColor", opacity: 0.65 }}>
              chapter · 0{index + 1}
            </span>
            <span className="serif italic text-sm opacity-70">— {chapter.en}</span>
          </div>

          <div className="mt-8">
            <h3 className="display text-[9vw] leading-[0.95] sm:text-[5vw] lg:text-[4vw]">
              {chapter.name}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-7 opacity-80">
              {chapter.desc}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div>
              <div className="kicker" style={{ color: "currentColor", opacity: 0.65 }}>
                Max speed
              </div>
              <div className="serif mt-1 text-lg">
                {chapter.speed} <span className="text-xs opacity-60">spm</span>
              </div>
            </div>
            <span className="hover-line text-[11px] uppercase tracking-widest2">
              مشاهده قطعات →
            </span>
          </div>
        </div>

        {/* right visual */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6 sm:p-8">
          <motion.div
            style={{ y }}
            className="relative flex h-40 w-full max-w-md items-center justify-center sm:h-52 lg:h-60"
          >
            <div className="pointer-events-none absolute inset-0">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                  color: "currentColor",
                  maskImage:
                    "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                }}
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", damping: 14 }}
              className="relative h-full"
            >
              <ChapterArt kind={chapter.illus} />
            </motion.div>
          </motion.div>

          {/* corner big index */}
          <span
            className="pointer-events-none absolute bottom-3 left-6 select-none text-[24vw] leading-none opacity-[0.06] sm:text-[14vw] lg:text-[10vw]"
            style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            0{index + 1}
          </span>
        </div>
      </a>
    </motion.div>
  );
}
