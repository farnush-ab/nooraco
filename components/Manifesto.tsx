"use client";
import { motion } from "framer-motion";

const principles = [
  { n: "۰۱", t: "اصالت", d: "همه‌ی قطعات، مستقیم از تولیدکننده‌های مورد تأیید جهانی." },
  { n: "۰۲", t: "دقت", d: "با تلورانس‌های صنعتی و سازگاری کامل با چرخ‌های استاندارد." },
  { n: "۰۳", t: "خدمت", d: "تیم فنی همراه، آموزش، و پشتیبانی بلندمدت." },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] container-x">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest2 text-ink-900/55">
          <span>۰۱ · manifesto</span>
          <span className="h-px flex-1 bg-line" />
          <span className="serif italic normal-case text-sm text-ink-900/60">our promise</span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-4xl display text-[6vw] leading-[1.25] text-ink-900 sm:text-[3.6vw] lg:text-[2.4vw]"
        >
          ما به سه چیز باور داریم:{" "}
          <span className="italic-serif italic text-ink-800">کیفیتِ پایدار</span>،
          دقتِ صنعتی، و{" "}
          <span className="italic-serif italic text-ink-800">خدمتی که می‌ماند</span>.
        </motion.p>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-14">
          {principles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border-t border-line pt-5"
            >
              <div className="flex items-baseline justify-between">
                <span className="serif italic text-lg text-ink-800">— {b.n}</span>
                <span className="kicker">principle</span>
              </div>
              <h3 className="serif mt-2 text-xl text-ink-900 sm:text-2xl">{b.t}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-900/70">{b.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
