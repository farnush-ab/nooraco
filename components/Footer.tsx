"use client";
import Logo from "./Logo";
import { Instagram, MessageCircle, Send } from "lucide-react";

const cols = [
  { title: "مجموعه", items: ["سوزن و قیچی", "ماسوره و قرقره", "موتور و کلاچ", "چرخ‌دنده", "بردهای الکترونیک"] },
  { title: "برندها", items: ["PIN", "STRONG H", "ORGAN", "GROZ-BECKERT", "JUKI"] },
  { title: "نوراکو", items: ["درباره ما", "مجله", "همکاری", "نمایندگی‌ها", "تماس"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-20 pb-8 text-ink-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(184,135,74,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at top, black 20%, transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light large />
            <p className="mt-8 max-w-xs text-sm leading-7 opacity-70">
              نوراکو · مرجع تخصصی قطعات چرخ‌های خیاطی صنعتی.
              ساده، دقیق، قابل اعتماد — از ۱۳۹۳.
            </p>

            {/* Newsletter */}
            <form className="mt-10 max-w-sm">
              <label htmlFor="nl" className="kicker text-ink-100/60">
                خبرنامه
              </label>
              <div className="mt-3 flex items-center gap-2 border-b border-ink-100/20 pb-2">
                <input
                  id="nl"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink-100/40"
                />
                <button
                  type="submit"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink-100/25 transition-colors hover:bg-ink-800 hover:border-ink-800"
                  aria-label="subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <div className="kicker text-ink-100/50">{c.title}</div>
              <ul className="mt-5 space-y-3 text-sm">
                {c.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="hover-line text-ink-100/80">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="kicker text-ink-100/50">تماس</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="opacity-80 leading-6">
                تهران، خ. جمهوری، پاساژ علاءالدین، ط. ۲
              </li>
              <li>
                <a href="tel:+982100000000" className="hover-line opacity-80">
                  ۰۲۱ — ۰۰۰ ۰۰ ۰۰۰
                </a>
              </li>
              <li>
                <a href="mailto:hello@nooraco.ir" className="hover-line opacity-80">
                  hello@nooraco.ir
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[Instagram, MessageCircle].map((I, k) => (
                <a
                  key={k}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink-100/25 transition-colors hover:bg-ink-800 hover:border-ink-800"
                  aria-label="social"
                >
                  <I className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* massive wordmark */}
        <div className="mt-16 select-none overflow-hidden">
          <div
            className="text-center leading-[0.85] tracking-tight text-ink-100/8"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(72px, 12vw, 200px)",
            }}
          >
            nooraco
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-ink-100/12 pt-6 text-[10px] uppercase tracking-widest2 text-ink-100/55 md:flex-row">
          <div>© {new Date().getFullYear()} Nooraco Studio™ · Tehran, IR</div>
          <div className="flex gap-6">
            <a href="#" className="hover-line">حریم خصوصی</a>
            <a href="#" className="hover-line">شرایط</a>
            <a href="#" className="hover-line">نقشه سایت</a>
          </div>
          <div className="serif italic normal-case text-sm text-ink-100/65">
            crafted with care
          </div>
        </div>
      </div>
    </footer>
  );
}
