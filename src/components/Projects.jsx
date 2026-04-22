import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects, projectFilters, filterProjects } from "../data/content";
import { PM_HINTS } from "../data/pmHints";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import PmTerm from "./PmTerm";

const COLUMNS = [
  {
    id: "inProgress",
    title: "In progress",
    hint: "Active WIP",
    headerClass: "border-t-[2px] border-accent/45 bg-white/95",
    dotClass: "bg-accent",
  },
  {
    id: "shipped",
    title: "Shipped",
    hint: "Released",
    headerClass: "border-t-[2px] border-accent bg-white",
    dotClass: "bg-accent-light",
  },
  {
    id: "hackathon",
    title: "Hackathon",
    hint: "Competitions & time-boxed builds",
    headerClass: "border-t-[2px] border-slate-300 bg-white/95",
    dotClass: "bg-slate-400",
  },
];

const VIEWS = [
  { id: "board", label: "Board" },
  { id: "list", label: "List" },
  { id: "table", label: "Table" },
];

function priorityStyles(priority) {
  if (priority === "P0") return "bg-accent text-white border-accent";
  if (priority === "P1") return "border-accent/35 text-accent bg-accent-pale/90";
  return "border-slate-200 text-slate-500 bg-slate-50";
}

function columnLabel(id) {
  const c = COLUMNS.find((x) => x.id === id);
  return c?.title ?? id;
}

/** Ensures repo/live/slides open off-site: bare "github.com/..." is treated as same-origin path without a scheme. */
function externalUrl(url) {
  if (url == null || typeof url !== "string") return "";
  const t = url.trim();
  if (!t) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(t)) return t;
  if (/^\/\//.test(t)) return `https:${t}`;
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

const linkRepoClass =
  "inline-flex items-center gap-0.5 rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-800 transition-colors hover:border-violet-400 hover:bg-violet-100";
const linkLiveClass =
  "inline-flex items-center gap-0.5 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 transition-colors hover:border-emerald-400 hover:bg-emerald-100";
const linkSlidesClass =
  "inline-flex items-center gap-0.5 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-900 transition-colors hover:border-amber-400 hover:bg-amber-100";

/** Board lanes show this many cards before requiring "View more". */
const BOARD_LANE_PREVIEW_COUNT = 2;

function ProjectCard({ project, index, columnIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [expanded, setExpanded] = useState(false);
  const priority = project.priority ?? "P2";
  const points = project.storyPoints ?? 3;
  const keyLabel = project.issueKey ?? `PORT-${project.id}`;
  const repoUrl = externalUrl(project.github);
  const liveUrl = externalUrl(project.live);
  const slidesUrl = externalUrl(project.slides);
  const tags = project.tags ?? [];
  const hasExtraTags = tags.length > 4;
  const longDescription = (project.description?.length ?? 0) > 120;
  const canExpand = hasExtraTags || longDescription;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.99 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.36,
        delay: index * 0.04 + columnIndex * 0.04,
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:border-accent/30 hover:shadow-md"
    >
      <div
        className={`absolute left-0 top-2.5 bottom-2.5 w-px rounded-full ${
          priority === "P0" ? "bg-accent" : priority === "P1" ? "bg-accent/45" : "bg-slate-200"
        }`}
        aria-hidden
      />
      <div className="pl-3.5 pr-3 py-3.5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <PmTerm k="issueKey" className="font-mono text-[10px] font-medium uppercase tracking-wide text-slate-400">
              {keyLabel}
            </PmTerm>
            <span
              className={`rounded border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide ${priorityStyles(priority)}`}
            >
              {priority}
            </span>
          </div>
          <PmTerm
            text={`${PM_HINTS.storyPoints} (${points}).`}
            className="flex h-7 min-w-[1.75rem] shrink-0 items-center justify-center rounded-full border border-slate-200/90 bg-cream px-1.5 font-mono text-[11px] font-semibold text-accent"
          >
            {points}
          </PmTerm>
        </div>

        <h3 className="mb-1.5 text-[15px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p
          className={`mb-3 text-sm leading-relaxed text-slate-600 ${expanded ? "" : "line-clamp-4"}`}
        >
          {project.description}
        </p>

        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {(expanded ? tags : tags.slice(0, 4)).map((tag, ti) => (
              <span
                key={`${tag}-${ti}`}
                className="rounded-md border border-slate-100 bg-slate-50/90 px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
            {!expanded && hasExtraTags && (
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                +{tags.length - 4}
              </span>
            )}
          </div>
          {canExpand ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse project details" : "Expand full description and all skill tags"}
              className="flex shrink-0 items-center justify-center rounded-md p-1 text-slate-300 transition-colors hover:text-accent"
            >
              <motion.span
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg leading-none"
                aria-hidden
              >
                +
              </motion.span>
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-2.5">
          {repoUrl ? (
            <a href={repoUrl} target="_blank" rel="noreferrer" className={linkRepoClass}>
              Repo →
            </a>
          ) : null}
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noreferrer" className={linkLiveClass}>
              Live →
            </a>
          ) : null}
          {slidesUrl ? (
            <a
              href={slidesUrl}
              target="_blank"
              rel="noreferrer"
              className={linkSlidesClass}
              title="View pitch (opens in a new tab)"
            >
              View Pitch →
            </a>
          ) : null}
          {!repoUrl && !liveUrl && !slidesUrl && <span className="text-[11px] text-slate-300">No public link</span>}
        </div>
      </div>
    </motion.article>
  );
}

function ColumnShell({ col, items, columnIndex }) {
  const [laneExpanded, setLaneExpanded] = useState(false);
  const itemsKey = useMemo(() => items.map((p) => p.id).join(","), [items]);

  useEffect(() => {
    setLaneExpanded(false);
  }, [itemsKey]);

  const hasOverflow = items.length > BOARD_LANE_PREVIEW_COUNT;
  const visibleItems = hasOverflow && !laneExpanded ? items.slice(0, BOARD_LANE_PREVIEW_COUNT) : items;
  const hiddenCount = items.length - BOARD_LANE_PREVIEW_COUNT;

  return (
    <div className="flex min-w-[min(100%,272px)] flex-1 flex-col snap-start md:min-w-0">
      <div className={`mb-3 rounded-xl border border-slate-200/80 px-3 py-2 shadow-sm ${col.headerClass}`}>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${col.dotClass}`} aria-hidden />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-800">{col.title}</p>
            <p className="text-[10px] text-slate-400">{col.hint}</p>
          </div>
          <span className="ml-auto rounded-full border border-slate-200/80 bg-cream px-2 py-0.5 font-mono text-[10px] font-medium text-slate-500">
            {items.length}
          </span>
        </div>
      </div>

      <div className="flex min-h-[140px] flex-1 flex-col gap-2 rounded-xl border border-dashed border-slate-200/70 bg-slate-50/40 p-2">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-slate-200/70 py-8 text-center"
            >
              <p className="text-[11px] font-medium text-slate-400">Nothing in this lane</p>
              <p className="mt-1 max-w-[11rem] text-[10px] leading-relaxed text-slate-300">Change filters to see work here.</p>
            </motion.div>
          ) : (
            [
              ...visibleItems.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} columnIndex={columnIndex} />
              )),
              hasOverflow ? (
                <motion.button
                  key="lane-expand"
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setLaneExpanded((v) => !v)}
                  aria-expanded={laneExpanded}
                  aria-label={
                    laneExpanded
                      ? `Show only the first ${BOARD_LANE_PREVIEW_COUNT} projects in ${col.title}`
                      : `Show ${hiddenCount} more project${hiddenCount === 1 ? "" : "s"} in ${col.title}`
                  }
                  className="w-full rounded-lg border border-slate-200/90 bg-white py-2 text-center text-xs font-medium text-slate-600 shadow-sm transition-colors hover:border-accent/35 hover:bg-cream hover:text-accent"
                >
                  {laneExpanded ? "Show less" : `View more (${hiddenCount})`}
                </motion.button>
              ) : null,
            ].filter(Boolean)
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ListRow({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12px" });
  const keyLabel = project.issueKey ?? `PORT-${project.id}`;
  const repoUrl = externalUrl(project.github);
  const liveUrl = externalUrl(project.live);
  const slidesUrl = externalUrl(project.slides);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-2 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition-colors hover:border-accent/25 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <PmTerm k="issueKey" className="font-mono text-[10px] text-slate-400">
            {keyLabel}
          </PmTerm>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {columnLabel(project.column)}
          </span>
          <span className="rounded-full border border-slate-100 bg-cream px-2 py-0.5 text-[10px] text-slate-500">{project.type}</span>
        </div>
        <h3 className="font-medium leading-snug text-slate-900 group-hover:text-accent">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{project.description}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3 sm:flex-col sm:items-end">
        {repoUrl ? (
          <a href={repoUrl} target="_blank" rel="noreferrer" className={linkRepoClass}>
            Repo →
          </a>
        ) : null}
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noreferrer" className={linkLiveClass}>
            Live →
          </a>
        ) : null}
        {slidesUrl ? (
          <a
            href={slidesUrl}
            target="_blank"
            rel="noreferrer"
            className={linkSlidesClass}
            title="View pitch (opens in a new tab)"
          >
            View Pitch →
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

function TableView({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-sm"
    >
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-4 py-3 font-medium">
              <PmTerm k="issueKey">Key</PmTerm>
            </th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Lane</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 text-center font-medium">
              <PmTerm k="storyPoints">Pts</PmTerm>
            </th>
            <th className="px-4 py-3 font-medium">Links</th>
          </tr>
        </thead>
        <tbody>
          {items.map((project) => (
            <tr key={project.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
              <td className="px-4 py-3 font-mono text-xs text-slate-400">
                <PmTerm k="issueKey">{project.issueKey ?? `PORT-${project.id}`}</PmTerm>
              </td>
              <td className="max-w-[220px] px-4 py-3 font-medium text-slate-900">{project.title}</td>
              <td className="px-4 py-3 text-xs text-slate-600">{columnLabel(project.column)}</td>
              <td className="px-4 py-3 text-xs text-slate-500">{project.type}</td>
              <td className="px-4 py-3 text-center font-mono text-xs text-accent">
                <PmTerm
                  text={`${PM_HINTS.storyPoints} (${project.storyPoints ?? "N/A"}).`}
                  className="font-mono text-xs text-accent"
                >
                  {project.storyPoints ?? "N/A"}
                </PmTerm>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {externalUrl(project.github) ? (
                    <a href={externalUrl(project.github)} target="_blank" rel="noreferrer" className={linkRepoClass}>
                      Repo →
                    </a>
                  ) : null}
                  {externalUrl(project.live) ? (
                    <a href={externalUrl(project.live)} target="_blank" rel="noreferrer" className={linkLiveClass}>
                      Live →
                    </a>
                  ) : null}
                  {externalUrl(project.slides) ? (
                    <a
                      href={externalUrl(project.slides)}
                      target="_blank"
                      rel="noreferrer"
                      className={linkSlidesClass}
                      title="View pitch (opens in a new tab)"
                    >
                      View Pitch →
                    </a>
                  ) : null}
                  {!externalUrl(project.github) &&
                    !externalUrl(project.live) &&
                    !externalUrl(project.slides) && <span className="text-xs text-slate-300">N/A</span>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function initialProjectsView() {
  if (typeof window === "undefined") return "board";
  return window.matchMedia("(max-width: 1023px)").matches ? "list" : "board";
}

export default function Projects() {
  const [filterId, setFilterId] = useState("all");
  const [view, setView] = useState(initialProjectsView);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const filtered = useMemo(() => filterProjects(projects, filterId), [filterId]);

  const byColumn = useMemo(() => {
    const map = { inProgress: [], shipped: [], hackathon: [] };
    for (const p of filtered) {
      const c = ["inProgress", "shipped", "hackathon"].includes(p.column) ? p.column : "inProgress";
      map[c].push(p);
    }
    return map;
  }, [filtered]);

  const listSorted = useMemo(() => {
    const order = { inProgress: 0, shipped: 1, hackathon: 2 };
    return [...filtered].sort((a, b) => (order[a.column] ?? 9) - (order[b.column] ?? 9));
  }, [filtered]);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-7xl px-6 pt-28 pb-14 sm:px-8 lg:px-10 lg:pb-12"
    >
      <Reveal className="mb-6">
        <SectionLabel>Projects</SectionLabel>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-slate-900">
              Things I&apos;ve <span className="font-display italic text-slate-900">built</span>
            </h2>
          </div>
          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">SPACE · PORTFOLIO</span>
            <div
              className="inline-flex rounded-lg border border-slate-200/90 bg-slate-50/80 p-0.5"
              role="tablist"
              aria-label="Project layout"
            >
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={view === v.id}
                  onClick={() => setView(v.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    view === v.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.04} className="mb-8">
        <div className="rounded-xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-md">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-sm font-semibold text-slate-800">Filter by type or theme</p>
            <p className="text-sm text-slate-500">
              {filtered.length} of {projects.length} shown
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {projectFilters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterId(f.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                  filterId === f.id
                    ? "bg-accent text-white shadow-sm shadow-accent/15"
                    : "border border-slate-200/90 bg-white text-slate-600 hover:border-accent/30 hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={view + filterId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {view === "board" && (
            <motion.div
              layout
              className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
              style={{ scrollbarGutter: "stable" }}
            >
              {COLUMNS.map((col, columnIndex) => (
                <ColumnShell key={col.id} col={col} items={byColumn[col.id]} columnIndex={columnIndex} />
              ))}
            </motion.div>
          )}

          {view === "list" && (
            <div className="space-y-2">
              {listSorted.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">No projects match this filter.</p>
              ) : (
                listSorted.map((project, i) => <ListRow key={project.id} project={project} index={i} />)
              )}
            </div>
          )}

          {view === "table" && (
            <>
              {filtered.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">No projects match this filter.</p>
              ) : (
                <TableView items={filtered} />
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
