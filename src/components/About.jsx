import { useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { personal, skills, aboutContent } from "../data/content";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import PmTerm from "./PmTerm";

function SkillCapabilityTag({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [hover, setHover] = useState(false);
  const showFill = inView || hover;
  const fill = Math.min(1, Math.max(0.1, skill.depth / 5));

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.04, y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="relative inline-flex min-w-[8.5rem] cursor-default select-none overflow-hidden rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 shadow-sm outline-none transition-[box-shadow,border-color] hover:border-accent/35 hover:shadow-md"
      title={`Relative comfort: ${skill.depth} of 5`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent-pale via-sky-100/95 to-accent-light"
        animate={{ scaleX: showFill ? fill : 0 }}
        transition={{
          duration: inView ? 0.82 : 0.36,
          delay: inView ? 0.08 + index * 0.055 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden
      />
      <span className="relative z-10 text-sm font-medium leading-snug text-slate-800">{skill.name}</span>
      <span className="sr-only">{`Relative comfort in this area: ${skill.depth} of 5`}</span>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const storyBar = useSpring(scrollYProgress, { stiffness: 100, damping: 35, mass: 0.3 });
  const barScale = useTransform(storyBar, [0, 0.2, 0.7, 1], [0.15, 0.55, 1, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-6 pt-28 pb-14 sm:px-8 lg:px-10 lg:pb-12"
    >
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-slate-900 mb-8 leading-tight">
              A little about <span className="font-display italic text-slate-900">me</span>
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]">
              <div className="absolute left-0 top-0 h-full w-1 bg-accent" aria-hidden />
              <motion.div
                className="absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-accent-light to-accent"
                style={{ scaleY: barScale }}
                aria-hidden
              />
              <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-slate-400">
                  <PmTerm k="userStory" className="rounded-md border border-slate-200/90 bg-white px-2 py-0.5">
                    Story
                  </PmTerm>
                  <span className="text-slate-300">·</span>
                  <PmTerm k="issueKey" className="text-accent">
                    PM-ABOUT-01
                  </PmTerm>
                  <span className="text-slate-300">·</span>
                  <span>Priority · High</span>
                </div>
              </div>
              <div className="space-y-4 px-5 py-6 pl-6">
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-accent">{aboutContent.userStory.role}</span>{" "}
                  <span className="text-slate-800">{aboutContent.userStory.want}</span>
                </p>
                <p className="font-display text-xl italic leading-snug text-slate-800 md:text-2xl">
                  {aboutContent.userStory.outcome}
                </p>
                <p className="text-sm leading-relaxed text-slate-500">{personal.shortBio}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <PmTerm k="acceptanceCriteria">Acceptance criteria</PmTerm>
            </p>
            <ul className="space-y-2.5">
              {aboutContent.acceptanceCriteria.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-3 text-sm leading-relaxed text-slate-600"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent/25 bg-accent-pale/50 text-[10px] text-accent"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {line}
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              Outside of work, I explore open source communities, build side projects, and think about how AI is reshaping
              the PM role, both as a tool and as a product category.
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.08}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Capabilities</p>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <SkillCapabilityTag key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14} className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Impact snapshot</p>
            <div className="grid grid-cols-2 gap-3">
              {aboutContent.impactSnapshot.map((stat) => (
                <motion.div
                  key={stat.kr}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition-shadow hover:border-accent/25 hover:shadow-md"
                >
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-wider text-accent/90">
                    <PmTerm k={stat.kr === "GTM" ? "gtm" : "okrTag"}>{stat.kr}</PmTerm>
                  </p>
                  <p className="font-display mt-1 text-3xl text-accent">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </motion.section>
  );
}
