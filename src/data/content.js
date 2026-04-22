export const personal = {
  name: "Simran",
  lastName: "Singh",
  tagline:
    "Technical product manager turning ambiguous goals into shipped software, from AI/ML platforms to accessibility and safety-critical products.",
  shortBio:
    "M.S. Engineering Management candidate at Northeastern, building digital products across higher-ed IT and consulting. Previously spent 4 years at Capgemini with Mercedes-Benz R&D, leading roadmap execution, Agile delivery, and cross-functional alignment.",
  email: "singh.simran@northeastern.edu",
  phone: "(857) 707-9451",
  linkedin: "https://www.linkedin.com/in/singh-simran",
  github: "https://github.com/simran-129",
  resumeUrl: "/resume.pdf",
};

export const skills = [
  { name: "Product roadmapping & prioritization", depth: 5 },
  { name: "Agile delivery (Scrum, Kanban)", depth: 5 },
  { name: "Stakeholder & executive communication", depth: 5 },
  { name: "User research & VoC synthesis", depth: 5 },
  { name: "Requirements & acceptance criteria", depth: 5 },
  { name: "JIRA / Confluence / Linear", depth: 5 },
  { name: "Figma & design collaboration", depth: 4 },
  { name: "AI/ML product & data workflows", depth: 4 },
  { name: "Accessibility (WCAG)", depth: 4 },
  { name: "SQL & data-informed decisions", depth: 4 },
  { name: "Technical fluency (APIs, QA)", depth: 4 },
  { name: "Python & React prototyping", depth: 4 },
];

export const aboutContent = {
  userStory: {
    role: "As a Technical PM,",
    want: "I want to connect research, metrics, and engineering reality",
    outcome: "so that teams ship reliable products users trust, especially where ambiguity, compliance, or scale meet the roadmap.",
  },
  acceptanceCriteria: [
    "Goals are ambiguous. Backlogs are not.",
    "Users are interviewed before commitment, not after complaints.",
    "Three squads can ship independently because the docs actually exist.",
    "Done means metrics moved, not just merged to main.",
  ],
  /** About section impact snapshot; numbers tie to experience highlights in this file. */
  impactSnapshot: [
    {
      kr: "O3",
      value: "4 yrs",
      label: "Safety-critical delivery · AV diagnostics (Capgemini × Mercedes-Benz R&D)",
    },
    {
      kr: "O2",
      value: "5+",
      label: "AI/ML platform features shipped on schedule (NEXT · Verizon / Via)",
    },
    {
      kr: "O1",
      value: "~20%",
      label: "Accessibility compliance lift · WCAG audits (NEU ITS)",
    },
    {
      kr: "GTM",
      value: "7.2k+",
      label: "Learners reached · post-launch GTM & adoption (NEXT)",
    },
  ],
};

export const experience = [
  {
    id: 1,
    role: "Digital Product Experience Assistant",
    company: "Northeastern University · Information Technology Services",
    duration: "Feb 2025 - Present",
    location: "Boston, MA",
    roadmapLane: "Now",
    quarter: "2025 - Present",
    epic: "Enterprise web & accessibility",
    objective: "O1 · Quality, WCAG, and stakeholder satisfaction",
    highlights: [
      "Owned end-to-end delivery for enterprise web work: requirements, prototypes, and UI implementation with AI-assisted tooling (e.g. Claude Code, GitHub Copilot), improving feature quality and stakeholder satisfaction.",
      "Led structured WCAG audits, defect documentation, and remediation coordination across content and engineering, with roughly 20% improvement in accessibility compliance validated through usability reviews.",
    ],
  },
  {
    id: 2,
    role: "Technical Project Manager",
    company: "NEXT Consulting (client: Verizon · Via Separations)",
    duration: "Jul 2025 - Dec 2025",
    location: "Boston, MA",
    roadmapLane: "Then",
    quarter: "2025",
    epic: "AI/ML churn analytics platform",
    objective: "O2 · Roadmap, GTM, and cross-functional velocity",
    highlights: [
      "Owned roadmap and GTM for an AI/ML-powered churn analytics platform: MoSCoW prioritization, OKR-aligned epics, and sprint-ready backlogs from ambiguous business goals.",
      "Shipped 5+ high-impact features on schedule by running user interviews, RICE-style prioritization, and pre-sprint validation with engineering and design.",
      "Scaled product documentation (data flows, APIs, UI specs) so three engineering squads could ship independently; cut escalations ~40% as Scrum PO via ceremonies, refinement, and executive demos.",
      "Defined north-star metrics and KPIs tied to OKRs; reduced an 8-hour manual analysis workflow to under 15 minutes and improved sprint execution ~20% via Figma reviews and early requirements validation.",
      "Drove post-launch GTM for a learning platform (7,200+ enrollments), with adoption up ~35% through metric tracking, OKR alignment, and iterative UX improvements.",
    ],
  },
  {
    id: 3,
    role: "Associate Consultant",
    company: "Capgemini Technology Services (client: Mercedes-Benz R&D India)",
    duration: "Oct 2020 - Jul 2024",
    location: "Mumbai, MH",
    roadmapLane: "Foundation",
    quarter: "2020 - 2024",
    epic: "Autonomous vehicle diagnostics & R&D software",
    objective: "O3 · Safety-critical delivery & reliability",
    highlights: [
      "Drove end-to-end lifecycle for autonomous-vehicle diagnostic and R&D software, translating safety-critical requirements into prioritized features with engineering, QA, and business; ~30% UX improvement.",
      "Prioritized roadmaps using failure modes, defect trends, and production metrics, driving ~15% reduction in bug reports through backlog management, release validation, and Agile execution.",
      "Defined high-reliability requirements and acceptance criteria with engineering on architecture and performance, contributing to ~20% stability improvement.",
      "Established Confluence documentation practices that improved cross-team visibility and efficiency ~30%.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "World Cup Squad Builder",
    description:
      "Full-stack AI product: six-stage LangChain ReAct pipeline over 180K+ player records, end-to-end squad selection in ~15 seconds with constraint reasoning, automated stat verification, dual scoring engine, squad chemistry, and a Streamlit dashboard with fixed-seed LLM outputs and hallucination guardrails.",
    tags: ["AI", "LangChain", "Python", "Streamlit", "LLM", "Team"],
    type: "Course Project",
    github: "https://github.com/simran-129/AI-Powered-World-Cup-Squad-Builder",
    live: "",
    slides: "https://canva.link/1v4a0l9oqdf5kml",
    featured: true,
    issueKey: "PORT-101",
    storyPoints: 8,
    priority: "P0",
    column: "hackathon",
  },
  {
    id: 2,
    title: "Reimagining Google Maps for the Visually Impaired",
    description:
      "Team project proposing three accessibility-focused navigation features backed by market research, user interviews with the Massachusetts Commission for the Blind, competitive analysis, and prototypes. Second Runner-Up among 150+ teams at Protothon 6.0.",
    tags: ["Accessibility", "User Research", "Product Discovery", "Protothon"],
    type: "Course Project",
    github: "",
    live: "",
    slides: "https://canva.link/avm3fzwomqx65aq",
    featured: false,
    issueKey: "PORT-204",
    storyPoints: 5,
    priority: "P1",
    column: "hackathon",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "This site (React, Tailwind CSS, and Framer Motion) is designed as a technical PM portfolio with board, list, and table views for projects.",
    tags: ["React", "Tailwind", "Framer Motion", "Vite"],
    type: "Personal",
    github: "https://github.com/simran-129/my-portfolio",
    live: "",
    featured: false,
    issueKey: "PORT-301",
    storyPoints: 3,
    priority: "P2",
    column: "inProgress",
  },
  {
    id: 4,
    title: "PM Copilot",
    description:
      "Multi-agent AI system for global product launch readiness: five specialized LangGraph agents with conditional routing, hybrid RAG pipeline over 1,255 compliance chunks across 6 countries, confidence-based web search fallback, four-layer hallucination guardrails, and a five-view React dashboard purpose-built for PMs. It moves beyond chatbot paradigm to deliver grounded, cited compliance assessments in 7 to 17 seconds.",
    tags: ["AI", "LangGraph", "Python", "React", "RAG", "Multi-Agent", "FastAPI", "Team"],
    type: "Course Project",
    github: "https://github.com/DeepikaKulkarni/pm-copilot",
    live: "https://pm-copilot-chi.vercel.app",
    featured: true,
    issueKey: "PORT-102",
    storyPoints: 13,
    priority: "P0",
    column: "shipped",
  },
  {
    id: 5,
    title: "Meal Prepper",
    description:
      "Identified three unmet user needs in meal prep (decision fatigue, fragmented shopping, and inefficient execution) and defined a voice-first mobile product to solve all three. Authored full PRD covering 9 core user flows, structured recipe data model, ingredient normalization engine, and a dependency-aware prep orchestration system that merges duplicate tasks across recipes. Designed a phased go-to-market strategy across three releases, from manual grocery export to direct multi-provider cart splitting across Instacart, Weee, and Walmart. Defined north star metrics, AI guardrails for personalization and substitution, and a container-aware portioning system built around the principle that meal prep is a workflow problem, not a recipe browsing problem.",
    tags: ["Product Strategy", "PRD", "Roadmap", "AI", "Mobile", "Voice-First", "UX"],
    type: "Personal Project",
    github: "",
    live: "",
    featured: true,
    issueKey: "PORT-104",
    storyPoints: 8,
    priority: "P0",
    column: "inProgress",
  },
  {
    id: 6,
    title: "PayBridge",
    description: "Led product discovery and pitch for a zero-interest earned wage access (EWA) B2B2C platform targeting the $2.1B US hourly worker market. Conducted 10 primary research interviews across employees and employers in healthcare, retail, hospitality, and manufacturing, validating that biweekly pay cycles force workers into predatory alternatives like 400% APR payday loans and $35 overdraft fees. Defined a mobile platform with FedNow/RTP instant transfers, 50-70% earned wage access cap, under-4-week payroll API integration with ADP, Workday, and Paychex, and built-in auto-savings tools. Built a dual-sided value proposition delivering 15-30% turnover reduction for employers at $1-3 PEPM, and 87% cheaper wage access for employees. Surfaced unexpected insights including organic auto-savings demand and lending circle trust patterns that shaped product positioning. Defined key metrics spanning employer integrations live, MAU, transaction volume, time-to-go-live, and 90-day employer retention.",
    tags: ["Product Strategy", "B2B2C", "Fintech", "EWA", "Customer Discovery", "Market Sizing", "Pitch"],
    type: "Course Project",
    github: "",
    live: "",
    featured: true,
    slides: "https://drive.google.com/file/d/11i7xeGMY6oo7K1FQA2bKGLvWDxyj006W/view",
    issueKey: "PORT-105",
    storyPoints: 8,
    priority: "P0",
    column: "shipped", 
  },
  {
    id: 7,
    title: "CodeLens AI",
    description: "Led product discovery and pitch for an AI-native code quality platform targeting the $750M unserved niche of AI-generated code defect detection. Conducted 10 interviews with developers and engineering leaders across SaaS, fintech, and healthcare tech, validating that tools like SonarQube and CodeRabbit systematically miss AI-specific failures. Surfaced three critical blind spots: hallucinated API calls that pass linters, shallow AI-generated tests that inflate coverage while bug rates rise, and architectural misfit from AI code violating codebase layer boundaries. Defined a four-pillar solution covering AI origin detection, hallucination scanning, test quality analysis, and architectural fit scoring, with targets of greater than 80% detection precision, under 5 minutes per PR, and under 10% false positive rate. Sized a $750M bottom-up target market and designed a tiered pricing model from free open-source to $50-80 per seat enterprise. Positioned CodeLens as a complementary layer to existing SAST tooling and the purpose-built quality gate for the AI coding era.",
    tags: ["Product Strategy", "Developer Tools", "AI", "B2B", "Customer Discovery", "Market Sizing", "Pitch"],
    type: "Course Project",
    github: "",
    live: "",
    featured: true,
    issueKey: "PORT-106",
    storyPoints: 8,
    priority: "P0",
    column: "shipped",
  },
  {
    id: 8,
    title: "ChoreSync",
    description:
      "PRD and go-to-market strategy for a roommate task management app: algorithmic chore assignment weighted by calendar availability and task effort, Google Calendar integration with privacy filters, fairness dashboard with effort-weighted equity reports, push notification system targeting 95% delivery rate, and a four-quarter 2026 roadmap spanning gamification, Splitwise integration, and institutional partnerships. North star metric: push notifications resulting in task completion.",
    tags: ["Product Strategy", "PRD", "Mobile", "UX", "Roadmap", "Team"],
    type: "Course Project",
    github: "",
    live: "",
    slides: "https://canva.link/q1dglwtger3ti60",
    featured: false,
    issueKey: "PORT-103",
    storyPoints: 5,
    priority: "P1",
    column: "shipped",
  },
];

export const projectFilters = [
  { id: "all", label: "All", match: () => true },
  { id: "type:Course Project", label: "Course project", match: (p) => p.type === "Course Project" },
  { id: "column:hackathon", label: "Hackathon", match: (p) => p.column === "hackathon" },
  { id: "type:Personal", label: "Personal", match: (p) => p.type === "Personal" },
  { id: "tag:AI", label: "AI", match: (p) => p.tags.some((t) => /^ai$/i.test(t.trim())) },
];

export function filterProjects(list, filterId) {
  const f = projectFilters.find((x) => x.id === filterId);
  if (!f) return list;
  return list.filter((p) => f.match(p));
}
