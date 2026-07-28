"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "مجموعه", href: "#bento" },
  { label: "چرخ‌ها", href: "#chapters" },
  { label: "برندها", href: "#brands" },
  { label: "مجله", href: "#journal" },
  { label: "درباره", href: "#craft" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        id="top"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-100/80 backdrop-blur-xl border-b border-line"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between container-x py-4">
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover-line text-xs text-ink-900/85">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-ink-900/25 bg-ink-50/60 px-4 py-2 text-[11px] uppercase tracking-widest2 text-ink-900 backdrop-blur transition-colors hover:bg-ink-900 hover:text-ink-100"
            >
              تماس
              <ArrowUpLeft className="h-3 w-3" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/20 bg-ink-50/40 text-ink-900 backdrop-blur lg:hidden"
              aria-label="menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
              className="absolute inset-x-0 top-0 flex flex-col gap-8 bg-ink-100 px-6 pb-10 pt-6"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex flex-col divide-y divide-line border-y border-line">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="serif text-3xl text-ink-900">{l.label}</span>
                      <span className="kicker">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-5 py-4 text-sm text-ink-100"
              >
                تماس با ما
                <ArrowUpLeft className="h-4 w-4" />
              </a>
              <div className="flex items-center justify-between text-xs text-ink-900/60">
                <span>hello@nooraco.ir</span>
                <span>Tehran · IR</span>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
