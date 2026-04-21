import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "../data/content";

const links = ["About", "Experience", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-cream/50 shadow-[0_8px_30px_-12px_rgba(30,64,175,0.08),0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-3xl backdrop-saturate-[1.2] supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--color-cream)_55%,rgba(29,78,216,0.05)_45%)]"
          : ""
      }`}
    >
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl text-accent hover:opacity-70 transition-opacity"
        >
          {personal.name}
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <button
                type="button"
                onClick={() => scrollTo(link)}
                className="text-sm text-slate-500 hover:text-accent transition-colors tracking-wide"
              >
                {link}
              </button>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-4 py-2 border border-accent text-accent rounded-full hover:bg-accent hover:text-white transition-all duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden text-slate-600 hover:text-accent transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden border-b border-slate-200/70 px-6 pb-6 backdrop-blur-3xl sm:px-8 lg:px-10 ${
              scrolled
                ? "bg-[color-mix(in_oklab,var(--color-cream)_78%,rgba(29,78,216,0.04)_22%)]"
                : "bg-cream/95 backdrop-saturate-150"
            }`}
          >
            <div className="mx-auto max-w-7xl">
              {links.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => scrollTo(link)}
                  className="block w-full border-b border-slate-100 py-3 text-left text-slate-600 transition-colors last:border-0 hover:text-accent"
                >
                  {link}
                </button>
              ))}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full border border-accent px-4 py-2 text-sm text-accent"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
