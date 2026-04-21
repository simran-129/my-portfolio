import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionLabel({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <p
      ref={ref}
      className="relative inline-block text-slate-500 text-sm tracking-widest uppercase mb-4 font-medium pb-1.5"
    >
      {children}
      <motion.span
        aria-hidden
        className="absolute left-0 bottom-0 block h-px w-full origin-left rounded-full bg-gradient-to-r from-accent from-5% via-accent-light to-accent to-95%"
        initial={{ scaleX: 0, opacity: 0.35 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />
    </p>
  );
}
