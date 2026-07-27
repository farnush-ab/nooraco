"use client";
import { motion } from "framer-motion";
import { ArrowUpLeft, Instagram, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-3xl bg-ink-900 text-ink-100 p-8 sm:p-12 lg:p-16"
        >
          <div className="blob -right-10 -top-10 h-72 w-72 bg-ink-800/40" />
          <div className="blob -bottom-16 -left-10 h-96 w-96 bg-ink-800/60" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(rgba(239,232,214,0.25) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-100/60">
                <span>۰۹ · contact</span>
                <span className="h-px w-8 bg-ink-50/25" />
                <span className="serif italic normal-case text-sm text-ink-100/70">
                  let's talk
                </span>
              </div>
              <h2 className="display mt-4 text-[8vw] leading-[0.95] sm:text-[5vw] lg:text-[4vw]">
                با ما <span className="italic-serif italic text-ink-500">صحبت</span> کنید
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-ink-100/75 sm:text-base">
                دنبال قطعه‌ی خاصی هستید یا سؤال فنی دارید؟ همکاران ما آماده‌ی
                راهنمایی و ارسال پیش‌فاکتور اختصاصی هستند.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <a
                href="tel:+982100000000"
                className="group inline-flex items-center gap-3 rounded-full bg-ink-50 px-6 py-4 text-ink-900 transition-colors hover:bg-ink-500"
              >
                <Phone className="h-4 w-4" />
                <span className="serif text-lg">۰۲۱ — ۰۰۰ ۰۰ ۰۰۰</span>
              </a>
              <a
                href="#"
                className="hover-line text-[11px] uppercase tracking-widest2 text-ink-100/80"
              >
                ارسال درخواست قطعه →
              </a>
            </div>
          </div>

          {/* channels row */}
          <div className="relative mt-14 grid gap-3 border-t border-ink-100/20 pt-8 sm:grid-cols-3">
            {[
              { Icon: Phone, k: "تلفن", v: "۰۲۱ — ۰۰۰ ۰۰ ۰۰۰" },
              { Icon: MessageCircle, k: "ایمیل", v: "hello@nooraco.ir" },
              { Icon: Instagram, k: "اینستاگرام", v: "@nooraco.ir" },
            ].map((c, i) => (
              <a
                key={i}
                href="#"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-ink-100/15 px-5 py-4 transition-colors hover:bg-ink-50/5"
              >
                <div className="flex items-center gap-3">
                  <c.Icon className="h-4 w-4 text-ink-500" />
                  <div>
                    <div className="kicker text-ink-100/55">{c.k}</div>
                    <div className="serif mt-0.5 text-base">{c.v}</div>
                  </div>
                </div>
                <ArrowUpLeft className="h-4 w-4 opacity-40 transition-all group-hover:-rotate-45 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
