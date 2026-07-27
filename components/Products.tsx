"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Plus, Star } from "lucide-react";
import { useRef } from "react";

const products = [
  { name: "سوزن DBx1 · بسته ۱۰۰ عددی", brand: "PIN", price: "۲۸۰٬۰۰۰", old: "۳۲۰٬۰۰۰", rating: 4.9, tag: "بست‌سلر", kind: "needle" },
  { name: "قیچی پارچه ۱۰ اینچ", brand: "PIN", price: "۱٬۴۵۰٬۰۰۰", old: null, rating: 4.8, tag: "جدید", kind: "scissor" },
  { name: "ماسوره فلزی ۲۵ عددی", brand: "STRONG H", price: "۸۹۰٬۰۰۰", old: "۹۹۰٬۰۰۰", rating: 4.7, tag: "تخفیف", kind: "bobbin" },
  { name: "چرخ‌دنده اصلی راسته‌دوز", brand: "STRONG H", price: "۳٬۲۰۰٬۰۰۰", old: null, rating: 5, tag: "اصل", kind: "gear" },
];

function Mark({ kind }: { kind: string }) {
  const s = {
    stroke: "#102b42",
    strokeWidth: 1.4,
    fill: "none",
    strokeLinecap: "round" as const,
  };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {kind === "needle" && (
        <g {...s}>
          <line x1="50" y1="10" x2="50" y2="90" />
          <circle cx="50" cy="20" r="3" />
          <path d="M42 86 L50 90 L58 86" />
        </g>
      )}
      {kind === "scissor" && (
        <g {...s}>
          <circle cx="34" cy="70" r="10" />
          <circle cx="66" cy="70" r="10" />
          <line x1="42" y1="62" x2="80" y2="24" />
          <line x1="58" y1="62" x2="20" y2="24" />
        </g>
      )}
      {kind === "bobbin" && (
        <g {...s}>
          <ellipse cx="50" cy="22" rx="22" ry="4" />
          <ellipse cx="50" cy="78" rx="22" ry="4" />
          <line x1="28" y1="22" x2="28" y2="78" />
          <line x1="72" y1="22" x2="72" y2="78" />
        </g>
      )}
      {kind === "gear" && (
        <g {...s}>
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="6" />
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k * Math.PI * 2) / 10;
            const x1 = 50 + Math.cos(a) * 22;
            const y1 = 50 + Math.sin(a) * 22;
            const x2 = 50 + Math.cos(a) * 32;
            const y2 = 50 + Math.sin(a) * 32;
            return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      )}
    </svg>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const rXd = useTransform(srx, (v) => `${v}deg`);
  const rYd = useTransform(sry, (v) => `${v}deg`);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 16);
        rx.set(-py * 16);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className="perspective"
    >
      <motion.div
        style={{
          rotateX: rXd,
          rotateY: rYd,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Products() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] container-x">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۴ · edit</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">this season</span>
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
              منتخبِ <span className="italic-serif italic text-ink-800">امسال</span>
            </h2>
          </div>
          <a href="#" className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900">
            همه محصولات →
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <TiltCard>
                <a
                  href="#"
                  className="group relative block overflow-hidden rounded-2xl bg-ink-50"
                >
                  {/* top */}
                  <div className="relative flex items-start justify-between p-4 sm:p-5" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex flex-col gap-1">
                      <span className="kicker">{p.brand}</span>
                      <span className="serif italic text-xs text-ink-800">— {p.tag}</span>
                    </div>
                    <button
                      aria-label="like"
                      className="grid h-8 w-8 place-items-center rounded-full border border-line bg-ink-50/70 backdrop-blur transition-colors hover:bg-ink-900 hover:text-ink-100"
                    >
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* illus */}
                  <div className="relative flex aspect-square items-center justify-center px-8">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transform: "translateZ(50px)" }}
                      className="h-3/4 w-3/4"
                    >
                      <Mark kind={p.kind} />
                    </motion.div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-4 rounded-full bg-ink-800/8 blur-2xl"
                    />
                  </div>

                  {/* bottom */}
                  <div className="relative border-t border-line p-4 sm:p-5" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-sm leading-6 text-ink-900">{p.name}</h3>
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        {p.old && (
                          <div className="text-[11px] text-ink-900/40 line-through">
                            {p.old} تومان
                          </div>
                        )}
                        <div className="serif text-lg text-ink-900">
                          {p.price}{" "}
                          <span className="text-[10px] text-ink-900/50">تومان</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-ink-900/70">
                        <Star className="h-3 w-3 fill-ink-800 text-ink-800" />
                        {p.rating.toLocaleString("fa-IR")}
                      </span>
                    </div>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/20 py-2.5 text-[11px] uppercase tracking-widest2 transition-colors hover:bg-ink-900 hover:text-ink-100">
                      <Plus className="h-3 w-3" />
                      افزودن
                    </button>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
