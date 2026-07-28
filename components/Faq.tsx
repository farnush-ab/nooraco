"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  { q: "آیا قطعات نوراکو دارای گارانتی هستند؟", a: "بله. تمام قطعات با ضمانت اصالت و گارانتی تعویض ۷ روزه عرضه می‌شوند." },
  { q: "چگونه سفارشم را پیگیری کنم؟", a: "پس از ثبت سفارش، کد رهگیری پیامک می‌شود و در حساب کاربری قابل مشاهده است." },
  { q: "ارسال به شهرستان چقدر طول می‌کشد؟", a: "تهران همان روز، شهرستان‌ها بین ۲۴ تا ۴۸ ساعت کاری." },
  { q: "برای کارگاه‌ها تخفیف عمده دارید؟", a: "بله، پنل ویژه نمایندگان و کارگاه‌های صنعتی با شرایط ویژه." },
  { q: "اگر قطعه مورد نظر موجود نباشد؟", a: "از فرم «درخواست قطعه» استفاده کنید. کارشناسان ما در کمتر از ۲۴ ساعت پاسخگو خواهند بود." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest2 text-ink-900/60">
              <span>۰۸ · faq</span>
              <span className="h-px w-8 bg-line" />
            </div>
            <h2 className="display mt-4 text-3xl leading-[1] text-ink-900 sm:text-4xl">
              پرسش‌های <span className="italic-serif italic text-ink-800">پرتکرار</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm text-ink-900/70 leading-7">
              جوابِ چند سؤال که پیش از خرید معمولاً از ما پرسیده می‌شود.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="border-b border-line"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start justify-between gap-6 py-6 text-right transition-colors hover:text-ink-800"
                    >
                      <div className="flex flex-1 items-baseline gap-5">
                        <span className="kicker shrink-0 text-ink-900/40">0{i + 1}</span>
                        <span className="text-sm text-ink-900 sm:text-base">{f.q}</span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-900/70"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pr-11 text-sm leading-7 text-ink-900/70">
                            {f.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
