import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { personal, projects } from "../data/content";
import PmTerm from "./PmTerm";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] },
});

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const MINI_COLUMNS = [
  { id: "inProgress", label: "WIP" },
  { id: "shipped", label: "Ship" },
  { id: "hackathon", label: "Hackathon" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const briefOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.85]);

  const miniBoard = useMemo(() => {
    const map = { inProgress: [], shipped: [], hackathon: [] };
    for (const p of projects) {
      if (map[p.column]) map[p.column].push(p);
    }
    return map;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative mx-auto flex w-full max-w-7xl flex-col justify-start overflow-hidden px-6 pb-14 pt-[88px] sm:px-8 lg:px-10 lg:pb-12 lg:pt-[96px]"
    >
      <div
        className="pointer-events-none absolute -right-[18%] top-[18%] h-[min(72vw,480px)] w-[min(72vw,480px)] rounded-full bg-gradient-to-br from-accent/12 via-accent-light/20 to-transparent blur-[100px] opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[20%] bottom-[22%] h-[min(55vw,360px)] w-[min(55vw,360px)] rounded-full bg-gradient-to-tr from-accent-light/18 via-accent/6 to-transparent blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-stretch gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,min(44vw,580px))] lg:items-stretch lg:gap-8 xl:gap-10">
        <div className="min-w-0 lg:flex lg:min-h-0 lg:flex-col lg:self-stretch">
          <motion.div
            {...fadeUp(0)}
            className="relative mb-5 w-full max-w-md self-start sm:max-w-lg lg:mb-6 lg:max-w-xl lg:pr-2"
          >
            <motion.div
              style={{ opacity: briefOpacity }}
              className="rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] backdrop-blur-md md:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  <PmTerm k="prd" className="rounded-md border border-slate-200/90 bg-cream px-2 py-0.5">
                    PRD-001
                  </PmTerm>
                  <span className="hidden sm:inline">Candidate overview</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-accent/20 bg-accent-pale/70 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                    Status · Active
                  </span>
                  <PmTerm
                    k="sprint"
                    className="rounded-full border border-slate-200/90 bg-white px-2.5 py-0.5 text-[10px] text-slate-500"
                  >
                    Sprint · Portfolio ‘26
                  </PmTerm>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Objective</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-slate-800">
                    Land a PM role where I can own ambiguous 0→1 problems and earn trust by shipping.
                  </p>
                </div>
                <p className="font-mono text-[10px] text-slate-400 sm:text-right">Last groomed · Apr 2026</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            {...fadeUp(0.08)}
            className="relative mb-2 font-mono text-[11px] font-medium uppercase tracking-widest text-accent"
          >
            Role · Product Manager
          </motion.p>

          <motion.div {...fadeUp(0.12)} className="relative mb-4 text-slate-900 lg:mb-5">
            <h1 className="m-0 p-0">
              <span className="block font-display text-4xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight text-slate-800">
                Hi, I&apos;m
              </span>
              <span className="mt-0.5 block font-display text-6xl sm:text-7xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-[-0.04em]">
                {personal.name}
                <span className="text-accent">.</span>
              </span>
            </h1>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="relative mb-2 max-w-xl lg:mb-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              <PmTerm k="problemStatement">Problem statement</PmTerm>
            </p>
            <p className="mt-1.5 text-base leading-relaxed text-slate-600 md:text-lg">{personal.tagline}</p>
          </motion.div>

          <motion.div {...fadeUp(0.28)} className="relative mb-5 flex flex-wrap gap-2 text-[11px] text-slate-400 lg:mb-6">
            <PmTerm k="kr" className="rounded-md border border-slate-100 bg-white/90 px-2 py-1 font-mono shadow-sm">
              KR · Ship a credible portfolio
            </PmTerm>
            <PmTerm k="kr" className="rounded-md border border-slate-100 bg-white/90 px-2 py-1 font-mono shadow-sm">
              KR · Show technical fluency
            </PmTerm>
          </motion.div>

          <motion.div
            {...fadeUp(0.36)}
            className="relative flex flex-wrap gap-3 lg:mt-auto lg:pt-1"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToId("contact")}
              className="rounded-full border border-slate-200/90 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-600 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
            >
              Schedule intro
            </motion.button>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-w-0 w-full flex-col justify-center lg:h-full lg:min-h-0 lg:justify-start"
        >
          <div className="flex w-full flex-col rounded-2xl border border-slate-200/90 bg-white/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5 lg:h-full lg:min-h-0 lg:flex-1 lg:p-6">
            <div className="mb-3 flex shrink-0 items-center justify-between gap-2 border-b border-slate-100 pb-3 lg:mb-4">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">Board preview</p>
                <p className="mt-1 font-display text-base font-medium leading-[1.15] tracking-tight text-slate-900 sm:text-lg">
                  From idea to <span className="font-display italic text-accent">ship</span>
                </p>
              </div>
              <PmTerm k="issueKey" className="rounded-md border border-slate-200 bg-cream px-2 py-0.5 font-mono text-[10px] text-slate-500">
                PORT
              </PmTerm>
            </div>

            <div className="grid min-h-[168px] grid-cols-3 grid-rows-1 gap-2 sm:min-h-[188px] sm:gap-2.5 lg:min-h-0 lg:flex-1 lg:gap-3">
              {MINI_COLUMNS.map((col) => (
                <div
                  key={col.id}
                  className="flex h-full min-h-[168px] flex-col rounded-xl border border-slate-200/80 bg-slate-50/70 p-2 sm:min-h-[188px] lg:min-h-0 lg:p-2.5"
                >
                  <p className="mb-2 border-b border-slate-200/70 pb-1.5 text-center text-[9px] font-bold uppercase tracking-wide text-slate-500 sm:text-[10px]">
                    {col.label}
                  </p>
                  <div className="flex flex-1 flex-col gap-1.5 overflow-hidden sm:gap-2">
                    {miniBoard[col.id].length === 0 ? (
                      <p className="py-3 text-center text-[10px] text-slate-400">Empty</p>
                    ) : (
                      miniBoard[col.id].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => scrollToId("projects")}
                          className="w-full rounded-lg border border-white/90 bg-white px-1.5 py-1.5 text-left shadow-sm transition-colors hover:border-accent/35 hover:bg-accent-pale/40 sm:px-2 sm:py-2"
                        >
                          <p className="font-mono text-[8px] text-slate-400 sm:text-[9px]">{p.issueKey}</p>
                          <p className="line-clamp-3 text-[10px] font-semibold leading-snug text-slate-800 sm:line-clamp-4 sm:text-[11px] lg:text-xs">
                            {p.title}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-3 shrink-0 lg:mt-4">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-xl bg-accent/35 blur-md"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-0.5 rounded-xl border-2 border-accent/50"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut", delay: 0.15 }}
              />
              <motion.button
                type="button"
                onClick={() => scrollToId("projects")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative z-10 w-full rounded-xl bg-accent py-3.5 text-center text-sm font-bold tracking-wide text-white shadow-lg shadow-accent/30 transition-colors hover:bg-blue-800"
              >
                Open full board
              </motion.button>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
