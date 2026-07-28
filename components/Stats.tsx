"use client";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // amount-based trigger is reliable on short mobile viewports where a
  // negative root margin would fire too late (or never) and leave "۰".
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const v = useMotionValue(0);
  const rounded = useTransform(v, (latest) =>
    Math.round(latest).toLocaleString("fa-IR")
  );
  useEffect(() => {
    if (reduce) {
      v.set(to);
      return;
    }
    if (inView) {
      const controls = animate(v, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, v, reduce]);
  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span className="ml-0.5">{suffix}</span>
    </span>
  );
}

const data = [
  { value: 12, suffix: "+", label: "سال سابقه", en: "years" },
  { value: 6000, suffix: "+", label: "کد کالا", en: "SKUs" },
  { value: 32, suffix: "", label: "استان", en: "provinces" },
  { value: 99, suffix: "٪", label: "رضایت", en: "satisfaction" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-ink-50 py-10 sm:py-14">
      <div className="mx-auto max-w-[1200px] container-x">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-4">
          {data.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="border-t border-line pt-5"
            >
              <div className="flex items-baseline justify-between">
                <span className="kicker">0{i + 1}</span>
                <span className="serif italic text-ink-800 text-xs">— {d.en}</span>
              </div>
              <div className="display mt-3 text-2xl leading-none text-ink-900 sm:text-3xl lg:text-4xl">
                <Counter to={d.value} suffix={d.suffix} />
              </div>
              <div className="mt-3 text-xs text-ink-900/60">{d.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
