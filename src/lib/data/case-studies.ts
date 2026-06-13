export type CaseStudySection = {
  heading: string;
  body: string[];
  list?: { label: string; detail: string }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  summary: string;
  cover: { from: string; to: string };
  tags: string[];
  role: string[];
  timeline: string;
  team: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  sections: {
    problem: CaseStudySection;
    context: CaseStudySection;
    challenges: CaseStudySection;
    role: CaseStudySection;
    process: CaseStudySection;
    architecture: CaseStudySection;
    design: CaseStudySection;
    technical: CaseStudySection;
    results: CaseStudySection;
    lessons: CaseStudySection;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-design-system",
    title: "Unifying 20+ Enterprise Apps Behind One Design System",
    client: "Mercedes-Benz R&D — Internal Platforms",
    year: "2024",
    category: "Design Systems · Platform Engineering",
    summary:
      "Replaced a fragmented landscape of inconsistent internal tools with a single, accessible, themeable component library — cutting feature delivery time by 40% and standardising the experience across two dozen applications.",
    cover: { from: "#1f5ae6", to: "#7c5cff" },
    tags: ["Design System", "React", "TypeScript", "Accessibility", "Tokens"],
    role: ["Lead Frontend Engineer", "Design System Architect"],
    timeline: "9 months",
    team: "3 engineers · 2 designers · 1 PM",
    stack: ["React", "TypeScript", "Storybook", "Style Dictionary", "Radix", "Vitest"],
    metrics: [
      { value: "40%", label: "Faster feature delivery" },
      { value: "20+", label: "Apps onboarded" },
      { value: "98", label: "Lighthouse a11y score" },
      { value: "−62%", label: "Duplicate UI code" },
    ],
    sections: {
      problem: {
        heading: "The Problem",
        body: [
          "Two dozen internal engineering and operations tools had grown independently over six years. Every team rebuilt buttons, tables, modals, and form logic from scratch, each with subtly different behaviour, spacing, and accessibility characteristics.",
          "The result was a slow, inconsistent, and fragile experience: engineers spent the first third of every project re-implementing primitives instead of solving domain problems, and users had to relearn interactions every time they switched tools.",
        ],
      },
      context: {
        heading: "Business Context",
        body: [
          "These applications support diagnostics, fleet operations, and manufacturing workflows used daily by hundreds of internal users. Inconsistency translated directly into training overhead, support tickets, and slower release cycles.",
          "Leadership wanted a measurable reduction in time-to-market for new internal tools without growing headcount — which made shared infrastructure, not more hands, the obvious lever.",
        ],
      },
      challenges: {
        heading: "Challenges",
        body: [
          "A design system only pays off if teams adopt it. The hard part was never the components — it was migration, governance, and trust across teams that each owned their roadmap.",
        ],
        list: [
          { label: "Zero downtime", detail: "Apps were in active use; migration had to be incremental, never a big-bang rewrite." },
          { label: "Theming", detail: "Multiple sub-brands and a light/dark requirement meant tokens, not hard-coded values." },
          { label: "Accessibility debt", detail: "Years of inaccessible custom widgets had to be replaced without changing muscle memory." },
          { label: "Adoption", detail: "Teams needed a reason to switch — DX had to be better than rolling their own." },
        ],
      },
      role: {
        heading: "My Role",
        body: [
          "I led the frontend architecture and owned the component API design end to end — from token pipeline to published package to migration tooling.",
          "I partnered daily with two product designers to translate Figma libraries into a token contract, and ran a weekly office hour to unblock adopting teams.",
        ],
      },
      process: {
        heading: "Process",
        body: [
          "We started with an audit: a spreadsheet of every UI pattern across all apps, clustered into a prioritised primitive backlog. The 12 most-duplicated components covered ~70% of surface area, so we shipped those first.",
          "Each component went through a design-engineering pairing session, an accessibility review against WCAG 2.1 AA, and a real-world adoption in one pilot app before being marked stable.",
        ],
      },
      architecture: {
        heading: "Architecture",
        body: [
          "A monorepo with a tokens package (Style Dictionary) feeding a headless primitive layer (Radix) wrapped by a styled component layer. Tokens compiled to CSS variables so theming was runtime-switchable with zero rebuilds.",
          "Storybook served as living documentation and the visual-regression surface; every PR ran Chromatic-style snapshots and axe accessibility checks in CI.",
        ],
        list: [
          { label: "tokens/", detail: "Source-of-truth JSON → CSS vars, TS types, Figma sync" },
          { label: "primitives/", detail: "Behaviour & a11y (Radix) — unstyled, headless" },
          { label: "ui/", detail: "Styled, themeable components consumed by apps" },
          { label: "codemods/", detail: "jscodeshift transforms to migrate legacy markup" },
        ],
      },
      design: {
        heading: "Design Decisions",
        body: [
          "We treated tokens as an API contract. Designers owned semantic tokens (surface, accent, danger); engineers owned how they mapped to primitives. This decoupling let the brand evolve without touching component code.",
          "Every interactive component shipped with documented keyboard interactions and focus management by default — accessibility became the path of least resistance, not an afterthought.",
        ],
      },
      technical: {
        heading: "Technical Decisions",
        body: [
          "Headless primitives over a heavy component framework: this gave us control over markup and styling while inheriting battle-tested accessibility behaviour.",
          "CSS variables for theming over CSS-in-JS runtime: zero runtime cost, instant theme switching, and SSR-safe by construction.",
          "Codemods over manual migration: we shipped jscodeshift transforms so adopting teams could migrate hundreds of files in minutes with a reviewable diff.",
        ],
      },
      results: {
        heading: "Results",
        body: [
          "Within nine months, 20+ applications consumed the shared library. New internal tools that previously took weeks to reach a polished baseline now started from a production-ready foundation on day one.",
          "Accessibility scores climbed from inconsistent (often failing) to a steady 98 across audited surfaces, and duplicate UI code dropped 62% as teams deleted bespoke implementations.",
        ],
      },
      lessons: {
        heading: "Lessons Learned",
        body: [
          "Adoption is a product problem, not a technical one. The codemods and weekly office hours moved the needle more than any single component.",
          "Naming is architecture. The hours spent agreeing on semantic token names paid back tenfold every time the brand or theme changed.",
        ],
      },
    },
  },
  {
    slug: "security-remediation",
    title: "Hardening a Legacy Frontend: 100+ Vulnerabilities to Zero",
    client: "Mercedes-Benz R&D — Connected Services",
    year: "2023",
    category: "Security · Frontend Modernisation",
    summary:
      "Led the systematic remediation of 100+ security findings across a large Angular and React estate, introducing a secure-by-default pipeline that kept the backlog at zero without slowing feature work.",
    cover: { from: "#1fbf86", to: "#1f5ae6" },
    tags: ["Security", "Angular", "React", "CI/CD", "Dependency Health"],
    role: ["Frontend Engineer", "Security Champion"],
    timeline: "6 months",
    team: "4 engineers · 1 security analyst",
    stack: ["Angular", "React", "Snyk", "OWASP ZAP", "GitHub Actions", "Dependabot"],
    metrics: [
      { value: "100+", label: "Findings resolved" },
      { value: "0", label: "Critical/high open" },
      { value: "−75%", label: "Mean time to patch" },
      { value: "100%", label: "Pipelines gated" },
    ],
    sections: {
      problem: {
        heading: "The Problem",
        body: [
          "A long-lived product carried a heavy security backlog: outdated dependencies, unsafe DOM patterns, missing security headers, and tokens handled insecurely on the client. Findings arrived faster than the team could close them.",
          "Each fix was treated as a one-off ticket, so the same classes of vulnerability kept reappearing in new code.",
        ],
      },
      context: {
        heading: "Business Context",
        body: [
          "As a connected-vehicle service, the product sat under strict internal security and compliance scrutiny. Open high-severity findings could block releases entirely, directly threatening the delivery roadmap.",
          "The mandate was clear: reach zero critical/high findings and stay there, without freezing feature development.",
        ],
      },
      challenges: {
        heading: "Challenges",
        body: [
          "Remediation in a live enterprise codebase is a balance between safety and momentum.",
        ],
        list: [
          { label: "Breaking changes", detail: "Major dependency upgrades risked regressions across critical flows." },
          { label: "Recurrence", detail: "Fixes didn't stick — new PRs reintroduced the same patterns." },
          { label: "Visibility", detail: "No single source of truth for what was open, fixed, or accepted." },
          { label: "Mixed stack", detail: "Angular and React surfaces needed different tooling and idioms." },
        ],
      },
      role: {
        heading: "My Role",
        body: [
          "I became the team's security champion: triaging findings, defining the remediation strategy, and building the automation that prevented regressions.",
          "I personally owned the highest-risk fixes — auth token handling, XSS-prone rendering paths, and the dependency upgrade train.",
        ],
      },
      process: {
        heading: "Process",
        body: [
          "We triaged every finding into severity × effort quadrants and attacked high-severity/low-effort first to shrink the at-risk surface fast.",
          "For each vulnerability class we wrote a short 'pattern note' — the unsafe shape, the safe replacement, and a lint rule or test to enforce it going forward.",
        ],
      },
      architecture: {
        heading: "Pipeline Architecture",
        body: [
          "Security moved left into the pull-request pipeline: SCA on dependencies, SAST on code, and a dynamic scan against preview deployments. Anything critical/high failed the build.",
          "A scheduled job kept dependency hygiene continuous via automated upgrade PRs with grouped, reviewable changesets.",
        ],
        list: [
          { label: "Pre-merge", detail: "Snyk SCA + ESLint security rules gate every PR" },
          { label: "Dynamic", detail: "OWASP ZAP baseline scan against preview env" },
          { label: "Continuous", detail: "Dependabot grouped upgrades, weekly cadence" },
          { label: "Reporting", detail: "Single dashboard: open / fixed / accepted with owners" },
        ],
      },
      design: {
        heading: "Design Decisions",
        body: [
          "We made the secure path the default and the easy one — sanitisation helpers, a hardened HTTP client, and typed wrappers meant engineers fell into the pit of success.",
          "Findings became visible and owned. A shared dashboard turned an invisible backlog into a tracked, attributable workstream.",
        ],
      },
      technical: {
        heading: "Technical Decisions",
        body: [
          "Replaced direct DOM/innerHTML usage with framework-sanitised rendering and a strict Content-Security-Policy, eliminating the largest XSS class.",
          "Moved auth tokens to secure, httpOnly cookie-based handling and removed sensitive data from client storage.",
          "Introduced incremental dependency upgrades with contract tests around critical flows so major bumps were safe to merge.",
        ],
      },
      results: {
        heading: "Results",
        body: [
          "Over six months we closed 100+ findings and drove critical/high to zero — then kept it there as the pipeline blocked regressions automatically.",
          "Mean time to patch dropped roughly 75% because upgrades became continuous and low-drama rather than a quarterly fire drill.",
        ],
      },
      lessons: {
        heading: "Lessons Learned",
        body: [
          "You don't fix security once; you make insecurity hard to ship. Automation and defaults beat heroics every time.",
          "Turning an invisible risk backlog into a visible, owned dashboard changed team behaviour more than any individual patch.",
        ],
      },
    },
  },
  {
    slug: "performance-modernisation",
    title: "From 4s to Sub-Second: Re-architecting a Heavy Dashboard",
    client: "Mercedes-Benz R&D — Operations Console",
    year: "2024",
    category: "Performance · UX Engineering",
    summary:
      "Rebuilt a data-dense operations dashboard that buckled under real-world data volumes, taking interaction latency from multi-second freezes to a fluid sub-second experience and lifting Core Web Vitals into the green.",
    cover: { from: "#7c5cff", to: "#34d39e" },
    tags: ["Performance", "React", "Virtualisation", "Web Vitals", "DX"],
    role: ["Frontend Engineer", "Performance Lead"],
    timeline: "4 months",
    team: "2 engineers · 1 designer",
    stack: ["React", "TanStack Virtual", "Web Workers", "Suspense", "Lighthouse CI"],
    metrics: [
      { value: "4.1s → 0.7s", label: "Interaction latency" },
      { value: "92", label: "Lighthouse perf" },
      { value: "−68%", label: "JS bundle size" },
      { value: "60fps", label: "Sustained scroll" },
    ],
    sections: {
      problem: {
        heading: "The Problem",
        body: [
          "An operations console rendered thousands of rows and live-updating widgets on a single screen. As real data grew, the UI froze for seconds on every filter, sort, and update — and users started avoiding the tool.",
          "The root causes were classic: rendering everything at once, recomputing on every keystroke, and a bundle that shipped far more than any single view needed.",
        ],
      },
      context: {
        heading: "Business Context",
        body: [
          "This console is the daily cockpit for operations teams making time-sensitive decisions. Latency wasn't a vanity metric — sluggishness directly slowed the workflows it was built to accelerate.",
          "With more data sources coming online, the performance ceiling was about to become a hard blocker for the roadmap.",
        ],
      },
      challenges: {
        heading: "Challenges",
        body: [
          "Performance work on a live product means improving the engine while it's running.",
        ],
        list: [
          { label: "Data volume", detail: "10k+ rows with live updates and rich per-cell rendering." },
          { label: "Main-thread work", detail: "Heavy aggregation blocked input and scrolling." },
          { label: "Over-rendering", detail: "A single state change re-rendered the entire tree." },
          { label: "Bundle bloat", detail: "Everything loaded upfront regardless of the active view." },
        ],
      },
      role: {
        heading: "My Role",
        body: [
          "I led the performance re-architecture: profiling, setting budgets, and rebuilding the rendering and data layers.",
          "I introduced a performance budget into CI so the wins couldn't silently regress, and coached the team on the profiling workflow.",
        ],
      },
      process: {
        heading: "Process",
        body: [
          "We started by measuring, not guessing — flame charts and React Profiler traces against production-scale fixtures pinpointed the real bottlenecks.",
          "We fixed in priority order of user-perceived impact: input latency first, then scroll smoothness, then initial load.",
        ],
      },
      architecture: {
        heading: "Architecture",
        body: [
          "Row virtualisation meant only visible rows ever mounted. Expensive aggregation moved off the main thread into a Web Worker, keeping input and scrolling buttery.",
          "Route- and view-level code splitting with Suspense boundaries meant each screen loaded only what it needed, with graceful streaming states.",
        ],
        list: [
          { label: "Virtual list", detail: "TanStack Virtual — constant DOM node count" },
          { label: "Web Worker", detail: "Aggregation & filtering off the main thread" },
          { label: "Code splitting", detail: "Per-view chunks + Suspense streaming" },
          { label: "Memoisation", detail: "Stable selectors; surgical re-renders only" },
        ],
      },
      design: {
        heading: "Design Decisions",
        body: [
          "We worked with the designer to add intentional loading and streaming states so perceived performance improved even before raw numbers did.",
          "Interactions were debounced and optimistic where safe, so the UI always felt responsive to the user's intent.",
        ],
      },
      technical: {
        heading: "Technical Decisions",
        body: [
          "Virtualisation over pagination: preserved the operators' need to scan continuously while bounding DOM cost.",
          "Web Workers over chunked timeouts: truly freed the main thread instead of merely yielding it.",
          "Lighthouse CI budgets: codified performance as a gate, not a one-time cleanup.",
        ],
      },
      results: {
        heading: "Results",
        body: [
          "Interaction latency fell from ~4.1s to ~0.7s, scrolling held a sustained 60fps, and the initial JS payload shrank 68%.",
          "Lighthouse performance reached 92 and Core Web Vitals moved firmly into the green — the tool went from avoided to relied-upon.",
        ],
      },
      lessons: {
        heading: "Lessons Learned",
        body: [
          "Measure against production-scale data. The bottlenecks at 100 rows are nothing like the ones at 10,000.",
          "Perceived performance is half the battle — thoughtful loading states bought goodwill while deeper fixes landed.",
        ],
      },
    },
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
