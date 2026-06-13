export const aiWorkflow = [
  {
    title: "Code Generation",
    body: "I use AI to scaffold the boilerplate — types, tests, repetitive components — so I spend my hours on architecture and the 20% that actually requires judgement.",
    prompt: "Generate a typed, accessible <DataTable /> with sorting, keyboard nav, and virtualised rows.",
    output: "Scaffolded component + tests in minutes, then hand-refined for the edge cases.",
  },
  {
    title: "Code Review",
    body: "A first-pass AI reviewer catches the obvious before a human ever looks — naming, edge cases, missing error handling — raising the floor on every PR.",
    prompt: "Review this diff for accessibility regressions and unhandled error paths.",
    output: "Flagged a missing focus trap and an unguarded async call I'd have caught later.",
  },
  {
    title: "Architecture Planning",
    body: "I treat AI as a thinking partner for design — pressure-testing trade-offs, surfacing options I hadn't considered, and stress-testing my assumptions.",
    prompt: "Compare runtime CSS-in-JS vs CSS variables for a themeable enterprise design system.",
    output: "A structured trade-off matrix that sharpened the decision I documented.",
  },
  {
    title: "Documentation",
    body: "AI turns my terse notes and code into clear docs, ADRs, and changelogs — so knowledge actually gets written down instead of living in my head.",
    prompt: "Draft an ADR for moving auth tokens to httpOnly cookies, with context and consequences.",
    output: "A clean first draft I edited for accuracy — minutes instead of an hour.",
  },
  {
    title: "Research",
    body: "For unfamiliar domains I use AI to compress the learning curve — summarising specs, comparing libraries, and pointing me at primary sources to verify.",
    prompt: "Summarise the trade-offs of WCAG 2.2 focus-appearance criteria for custom widgets.",
    output: "A grounded summary with the exact success criteria to read in full.",
  },
  {
    title: "Rapid Prototyping",
    body: "From idea to clickable prototype in an afternoon. AI lets me explore three directions in the time it used to take to build one — so the best idea wins, not the first.",
    prompt: "Prototype three hero layouts for a premium engineering portfolio.",
    output: "Three explorable variants; I shipped the strongest after live critique.",
  },
];

export const aiPhilosophy = [
  {
    title: "Taste is the bottleneck",
    body: "AI raises everyone's floor. The differentiator is judgement — knowing what's worth building and recognising when the output is wrong.",
  },
  {
    title: "Verify, then trust",
    body: "I never ship what I can't explain. AI accelerates the draft; I own the correctness, the edge cases, and the consequences.",
  },
  {
    title: "Leverage, not replacement",
    body: "I use AI to remove drudgery and amplify intent — so a small team can ship like a large one without lowering the bar.",
  },
];
