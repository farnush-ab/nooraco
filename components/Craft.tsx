"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  { q: "دقتی که تو کارگاه ما لازم داشتیم، فقط با قطعات نوراکو ممکن شد.", a: "کارگاه پوشاک آرشیا · تهران" },
  { q: "سردوز ۵ نخ‌مون بعد از تعویض قطعات، سرعت‌ش ۲۰٪ بیشتر شد.", a: "تولیدی کاسپین · تبریز" },
  { q: "پشتیبانی فنی نوراکو، تفاوت اصلی‌شونه با بقیه.", a: "پوشاک نوین‌بافت · مشهد" },
  { q: "از سوزن تا موتور، همه چی توی یک سبد.", a: "کارگاه بامداد · اصفهان" },
];

export default function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="craft" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left copy */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۶ · craft</span>
              <span className="h-px w-8 bg-line" />
              <span className="serif italic normal-case text-sm text-ink-900/60">since 2014</span>
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl lg:text-5xl">
              فلسفه‌ی <span className="italic-serif italic text-ink-800">نوراکو</span>
            </h2>

            <div className="mt-10 space-y-6">
              <p className="serif text-lg leading-[1.4] text-ink-900 sm:text-xl lg:text-2xl">
                هر سوزن یک گامِ کوچک است در ماشینی که کل صنعتی را حرکت می‌دهد.
                نوراکو زاده‌ی همین باور است.
              </p>
              <p className="text-sm leading-8 text-ink-900/75 sm:text-base">
                از سال ۱۳۹۳، ما دقتِ صنعتی، اصالتِ برند و شراکتِ بلندمدت را
                گرد هم آورده‌ایم. با ۱۲ سال تجربه، بیش از ۶۰۰۰ کد کالا و شبکه‌ای
                از ۳۰۰ کارگاه همراه، نوراکو دیگر فقط یک فروشگاه نیست — بلکه یک
                شریک است.
              </p>
            </div>

            {/* testimonial marquee */}
            <div className="mt-14 overflow-hidden">
              <div className="marquee-mask">
                <motion.div
                  className="flex w-max gap-4"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {[...testimonials, ...testimonials].map((t, i) => (
                    <figure
                      key={i}
                      className="w-[280px] shrink-0 rounded-2xl border border-line bg-ink-50 p-5 sm:w-[340px] sm:p-6"
                    >
                      <div className="serif italic text-ink-800 text-lg">
                        “
                      </div>
                      <blockquote className="mt-1 serif text-base leading-7 text-ink-900 sm:text-lg">
                        {t.q}
                      </blockquote>
                      <figcaption className="mt-4 kicker">— {t.a}</figcaption>
                    </figure>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* right rotating disc */}
          <div ref={ref} className="relative lg:col-span-5">
            <motion.div
              style={{ y }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <div
                aria-hidden
                className="absolute inset-6 rounded-full bg-ink-900"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(198,154,92,0.35), transparent 60%)",
                }}
              />
              <motion.svg
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full"
                style={{ rotate }}
              >
                <defs>
                  <path
                    id="ring"
                    d="M 200,200 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
                    fill="none"
                  />
                </defs>
                <text fill="#ebebee" fontSize="14" letterSpacing="6" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                  <textPath href="#ring">
                    NOORACO · SEWING MACHINE PARTS · SINCE 2014 · TEHRAN, IR · NOORACO · SEWING MACHINE PARTS · SINCE 2014 · TEHRAN, IR ·
                  </textPath>
                </text>
              </motion.svg>
              {/* center machine icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="h-16 w-16">
                  <g fill="#ebebee">
                    <rect x="14" y="6" width="3" height="6" rx="1" />
                    <rect x="47" y="6" width="3" height="6" rx="1" />
                    <path d="M10 14 H54 V20 H44 C44 28 38 32 30 32 V40 C30 46 26 52 18 52 H10 Z" />
                  </g>
                </svg>
              </div>
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 kicker text-ink-100/80">
                est. 1393
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
