export const uxPrinciples = [
  {
    title: "Accessibility is the floor",
    body: "Keyboard paths, focus management, colour contrast, and screen-reader semantics are requirements, not enhancements. I build with assistive tech in the loop from the first commit.",
  },
  {
    title: "Performance is a feature",
    body: "Latency is the most universal UX problem. A fast interface respects the user's time and attention more than any animation could.",
  },
  {
    title: "Motion with meaning",
    body: "Animation should explain change, not perform for applause. Every transition earns its place by orienting the user through space and state.",
  },
  {
    title: "Engineering the design system",
    body: "I sit at the seam between design and code — turning tokens and intent into resilient, themeable, accessible components teams actually want to use.",
  },
];

export const beforeAfter = [
  {
    title: "Data table interaction latency",
    metric: "Performance",
    before: { label: "Before", value: "4.1s", note: "UI froze on every filter; users avoided the view." },
    after: { label: "After", value: "0.7s", note: "Virtualised rendering + off-thread aggregation." },
    improvement: "83% faster",
  },
  {
    title: "Accessibility audit score",
    metric: "Accessibility",
    before: { label: "Before", value: "61", note: "Missing focus states, poor contrast, no ARIA." },
    after: { label: "After", value: "98", note: "WCAG 2.1 AA baseline across all primitives." },
    improvement: "+37 points",
  },
  {
    title: "JavaScript shipped to the client",
    metric: "Bundle",
    before: { label: "Before", value: "1.4MB", note: "Everything loaded upfront, every route." },
    after: { label: "After", value: "0.45MB", note: "Route-level code splitting + Suspense." },
    improvement: "68% smaller",
  },
  {
    title: "Time to first usable component",
    metric: "Developer experience",
    before: { label: "Before", value: "~2 wks", note: "Every team rebuilt primitives from scratch." },
    after: { label: "After", value: "Day 1", note: "Production-ready design system from the start." },
    improvement: "10x faster",
  },
];

export const uxExamples = [
  {
    title: "Keyboard-first command palette",
    body: "Designed and built a ⌘K palette so power users could navigate dense tooling without ever touching the mouse — with full focus trapping and screen-reader announcements.",
    tag: "Interaction",
  },
  {
    title: "Optimistic, reversible actions",
    body: "Replaced blocking spinners with optimistic updates and inline undo, so the interface always felt instant while staying safe.",
    tag: "Perceived performance",
  },
  {
    title: "Resilient empty & error states",
    body: "Treated empty, loading, and error states as first-class designs rather than afterthoughts — the moments that decide whether users trust a tool.",
    tag: "Trust",
  },
];
