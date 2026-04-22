import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "../data/content";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

function EmailLogo({ className }) {
  return (
    <svg
      className={["text-accent", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LinkedInLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function GitHubLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#181717"
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.212.682-.469 0-.231-.009-.993-.014-1.717-2.782.603-3.369-1.342-3.369-1.342-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.605.069-.605 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.292 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.918.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.019 10.019 0 0022 11.969C22 6.463 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const linkCardClass =
  "group flex h-full w-full items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 text-left transition-all hover:border-accent/30";

const iconWrapClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/90";

export default function Contact() {
  const linksRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const linksInView = useInView(linksRef, { once: true, margin: "-80px" });

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-6 pt-28 pb-16 sm:px-8 lg:px-10 lg:pb-20"
    >
      <Reveal className="mb-12 text-left">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl leading-tight text-slate-900">
          Let&apos;s <span className="font-display italic text-slate-900">talk</span>
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-slate-500">
          Whether it&apos;s a job opportunity, a collaboration, or just a conversation about product, I&apos;d love to
          hear from you.
        </p>
      </Reveal>

      <motion.div
        ref={linksRef}
        initial={{ opacity: 0, y: 14 }}
        animate={linksInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className={linkCardClass}
        >
          <span className={iconWrapClass}>
            <EmailLogo className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs text-slate-400">Email</p>
            <p className="truncate text-sm text-slate-700 sm:whitespace-normal">{personal.email}</p>
          </div>
          <span className="shrink-0 text-xs text-slate-300 transition-colors group-hover:text-accent">
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>

        <a
          href={personal.linkedin}
          target="_blank"
          rel="noreferrer"
          className={linkCardClass}
        >
          <span className={iconWrapClass}>
            <LinkedInLogo className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs text-slate-400">LinkedIn</p>
            <p className="text-sm text-slate-700">Connect on LinkedIn</p>
          </div>
          <span className="shrink-0 text-xs text-slate-300 transition-colors group-hover:text-accent">→</span>
        </a>

        <a href={personal.github} target="_blank" rel="noreferrer" className={linkCardClass}>
          <span className={iconWrapClass}>
            <GitHubLogo className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs text-slate-400">GitHub</p>
            <p className="text-sm text-slate-700">View my GitHub</p>
          </div>
          <span className="shrink-0 text-xs text-slate-300 transition-colors group-hover:text-accent">→</span>
        </a>
      </motion.div>
    </motion.section>
  );
}
