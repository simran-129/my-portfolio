import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PM_HINTS } from "../data/pmHints";

/**
 * PM jargon with a visible hover tooltip (portaled `fixed`, not native `title`).
 * Framer Motion and other `transform` ancestors often break or delay native tooltips.
 *
 * @param {keyof typeof PM_HINTS} [k] — lookup key in PM_HINTS
 * @param {string} [text] — overrides hint text (e.g. story points with a number)
 */
export default function PmTerm({ k, text, className = "", children }) {
  const resolved = text ?? PM_HINTS[k];
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tipId = useId();

  const updatePosition = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const margin = 8;
    const halfGuess = 48;
    let top = r.bottom + margin;
    if (top + halfGuess > window.innerHeight - margin) {
      top = Math.max(margin, r.top - margin - halfGuess);
    }
    const left = Math.min(window.innerWidth - margin, Math.max(margin, r.left + r.width / 2));
    setCoords({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (!open || !resolved) return;
    updatePosition();
  }, [open, resolved, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  if (!resolved) {
    return <span className={className ?? ""}>{children}</span>;
  }

  const mergedClass = `${className ?? ""} cursor-help`.trim();

  return (
    <>
      <span
        ref={wrapRef}
        role="term"
        aria-describedby={open ? tipId : undefined}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        className={mergedClass}
      >
        {children}
      </span>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            id={tipId}
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            className="pointer-events-none fixed z-[2147483646] max-w-[min(280px,calc(100vw-24px))] -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1.5 text-center text-[11px] leading-snug text-white shadow-lg ring-1 ring-white/10"
          >
            {resolved}
          </span>,
          document.body
        )}
    </>
  );
}
