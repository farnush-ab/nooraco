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
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between container-x py-4">
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
          <motion.aside
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950 text-ink-100 lg:hidden"
          >
            {/* ambient depth */}
            <div className="blob right-[-20%] top-[-10%] h-72 w-72 bg-ink-800/50" />
            <div className="blob left-[-20%] bottom-[-10%] h-80 w-80 bg-ink-700/30" />

            <div className="relative flex items-center justify-between px-6 pt-6 container-x">
              <Logo light />
              <button
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-100/25 text-ink-100"
                aria-label="close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center px-6 container-x">
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + 0.07 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-ink-100/12"
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="serif text-4xl text-ink-100 transition-transform group-active:-translate-x-1">
                        {l.label}
                      </span>
                      <span className="kicker text-ink-100/40">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="relative px-6 pb-10 container-x"
            >
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-ink-100 px-5 py-4 text-sm text-ink-900"
              >
                تماس با ما
                <ArrowUpLeft className="h-4 w-4" />
              </a>
              <div className="mt-6 flex items-center justify-between text-xs text-ink-100/55">
                <span>hello@nooraco.ir</span>
                <span>Tehran · IR</span>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
