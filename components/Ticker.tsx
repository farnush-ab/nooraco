"use client";
import { motion } from "framer-motion";

const items = [
  "PIN",
  "STRONG H",
  "GROZ-BECKERT",
  "JUKI",
  "ORGAN",
  "BROTHER",
  "SIRUBA",
  "PEGASUS",
  "SUNSTAR",
  "TYPICAL",
];

export default function Ticker() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-900 py-3 text-ink-100">
      {/* top */}
      <div className="marquee-mask overflow-hidden">
        <motion.div
          className="flex w-max gap-14 whitespace-nowrap py-1"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-6 text-sm uppercase tracking-[0.35em]"
              style={{ fontWeight: 400 }}
            >
              <span className="serif italic text-ink-500 text-base normal-case tracking-normal">
                ✦
              </span>
              <span className="opacity-80">{b}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
