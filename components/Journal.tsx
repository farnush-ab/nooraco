"use client";
import { motion } from "framer-motion";

const posts = [
  {
    title: "ورود سری جدید سوزن‌های تیتانیومی PIN",
    excerpt: "پوشش تیتانیوم، عمر ۲ برابر و خطای نزدیک به صفر — بازتعریف استاندارد.",
    date: "۱۸ خرداد ۱۴۰۵",
    cat: "product",
    read: "۴ دقیقه",
  },
  {
    title: "راهنمای جامع راه‌اندازی سردوز ۵ نخ",
    excerpt: "گام به گام، نخ‌اندازی، تنشن و تست دوخت — از صفر تا صد.",
    date: "۱۰ خرداد ۱۴۰۵",
    cat: "guide",
    read: "۹ دقیقه",
  },
  {
    title: "نوراکو در نمایشگاه بین‌المللی نساجی",
    excerpt: "غرفه F12 · سالن ۳۸. با ما در بزرگ‌ترین رویداد سال دیدار کنید.",
    date: "۱ خرداد ۱۴۰۵",
    cat: "event",
    read: "۲ دقیقه",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] container-x">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۷ · journal</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">notes & essays</span>
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
              مجله‌ی <span className="italic-serif italic text-ink-800">نوراکو</span>
            </h2>
          </div>
          <a href="#" className="hover-line text-[11px] uppercase tracking-widest2 text-ink-900">
            آرشیو کامل →
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-50"
            >
              {/* cover */}
              <div className="relative aspect-[5/3] w-full overflow-hidden">
                <svg
                  viewBox="0 0 500 300"
                  preserveAspectRatio="xMidYMid slice"
                  className="h-full w-full"
                >
                  <defs>
                    <linearGradient id={`jbg-${i}`} x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor={["#102b42", "#17476b", "#3a6a8a"][i]} />
                      <stop offset="1" stopColor={["#0a1d31", "#102b42", "#102b42"][i]} />
                    </linearGradient>
                  </defs>
                  <rect width="500" height="300" fill={`url(#jbg-${i})`} />
                  {/* pattern */}
                  <g stroke="#ebebee" strokeWidth="0.6" strokeOpacity="0.25" fill="none">
                    {Array.from({ length: 10 }).map((_, k) => (
                      <circle key={k} cx="250" cy="150" r={20 + k * 18} />
                    ))}
                  </g>
                  {/* mark */}
                  <g transform="translate(200,90)" fill="#ebebee" opacity="0.95">
                    <path d="M0 30 H90 V38 H72 C72 60 60 68 45 68 V80 H0 Z" />
                    <rect x="72" y="6" width="4" height="10" rx="1" />
                    <rect x="14" y="6" width="4" height="10" rx="1" />
                  </g>
                  <text
                    x="250"
                    y="270"
                    textAnchor="middle"
                    fill="#ebebee"
                    fontSize="9"
                    letterSpacing="4"
                    opacity="0.6"
                    style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                  >
                    — nooraco journal
                  </text>
                </svg>
                <div className="absolute right-4 top-4 chip bg-ink-50/90 text-ink-900">
                  {p.cat}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest2 text-ink-900/55">
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                </div>
                <h3 className="serif mt-3 flex-1 text-lg leading-[1.2] text-ink-900 sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-900/65">
                  {p.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink-900 transition-transform group-hover:-translate-x-1">
                  ادامه مطلب →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
