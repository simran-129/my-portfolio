import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { experience } from "../data/content";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import PmTerm from "./PmTerm";

function ExperienceCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-36px" });
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-w-0 flex-1 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] backdrop-blur-sm md:p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-md border border-slate-200/90 bg-slate-50/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
            <PmTerm k="epic" className="font-mono text-[9px] text-accent">
              Epic
            </PmTerm>
            <span className="text-slate-800">{item.epic ?? "Product delivery"}</span>
          </p>
          <p className="font-mono text-[11px] font-medium text-slate-400">{item.objective ?? "Objective"}</p>
          <h3 className="mt-2 font-display text-2xl text-slate-900">{item.role}</h3>
          <p className="mt-1 text-sm font-medium text-accent">{item.company}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="rounded-md border border-slate-200/80 bg-cream px-2 py-0.5 font-mono">{item.duration}</span>
            <span className="text-slate-300">·</span>
            <span>{item.location}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-md border border-slate-200 bg-cream px-2 py-1 font-mono text-[10px] text-slate-500">
          {item.quarter}
        </span>
      </div>

      <button type="button" onClick={() => setExpanded(!expanded)} className="group flex w-full items-center justify-between text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Deliverables <span className="font-normal text-slate-300">({item.highlights.length})</span>
        </span>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-lg leading-none text-slate-300 transition-colors group-hover:text-accent"
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 border-t border-slate-50 pt-4">
              {item.highlights.map((point, i) => (
                <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-slate-600 md:text-base">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent/20 bg-accent-pale/70 text-[10px] font-bold text-accent"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.72", "end 0.32"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 65, damping: 26, mass: 0.5 });
  const fillScaleY = useTransform(progress, [0, 0.06, 0.94, 1], [0.03, 0.32, 0.9, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="experience"
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-6 pt-28 pb-14 sm:px-8 lg:px-10 lg:pb-12"
    >
      <Reveal className="mb-12">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl leading-tight text-slate-900">
          Where I&apos;ve <span className="font-display italic text-slate-900">worked</span>
        </h2>
      </Reveal>

      <div className="relative mx-auto max-w-4xl">
        <div className="pointer-events-none absolute left-6 top-4 bottom-16 w-px -translate-x-1/2 bg-slate-200 md:left-7" aria-hidden />
        <div className="pointer-events-none absolute left-6 top-4 bottom-16 w-1 -translate-x-1/2 overflow-hidden rounded-full md:left-7">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent via-blue-500 to-accent-light"
            style={{ scaleY: fillScaleY }}
            aria-hidden
          />
        </div>

        <ol className="relative m-0 list-none space-y-0 p-0">
          {experience.map((item, i) => (
            <li key={item.id} className="relative flex gap-5 pb-14 last:pb-3 md:gap-7">
              <div className="relative z-[2] flex w-12 shrink-0 justify-center md:w-14">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 20, delay: i * 0.04 }}
                  className="absolute left-1/2 top-11 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-accent text-[9px] font-bold text-white shadow-lg shadow-accent/25 md:top-12"
                >
                  {i + 1}
                </motion.div>
              </div>
              <ExperienceCard item={item} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}
