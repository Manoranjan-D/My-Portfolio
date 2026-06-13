# Manoranjan D — Personal Brand & Portfolio

A premium personal-brand website positioning Manoranjan D as a Senior Frontend
Engineer, UX-focused Product Engineer, AI-powered builder, and future founder.
Built to feel comparable in craft to Apple, Stripe, Linear, Vercel, and Raycast —
elegant dark theme, restrained colour, motion with meaning, and typography doing
the heavy lifting.

> **Engineering Experiences, Not Just Interfaces.**

---

## Tech stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------- |
| Framework    | **Next.js 16** (App Router, RSC, Turbopack)                   |
| UI runtime   | **React 19**                                                  |
| Language     | **TypeScript** (strict)                                       |
| Styling      | **Tailwind CSS v4** (CSS-first `@theme` design tokens)        |
| Motion       | **Motion** (Framer Motion) — scroll reveals, micro-interactions |
| Content      | **MDX** (`@next/mdx`) for the writing section                 |
| Icons        | **lucide-react**                                              |
| Utilities    | `clsx`, `tailwind-merge`, `class-variance-authority`          |

> The brief specified Next.js 15 / React 19; the project ships on Next.js 16
> (current stable, same App Router + RSC model) for the latest performance and
> Turbopack build pipeline.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static + SSG)
npm run lint
```

---

## Information architecture

```
/                     Home — hero, impact strip, positioning, capabilities,
                      featured case studies, AI + ventures teasers, CTA
/about                Timeline-based journey + core values
/work                 Case-study index (deep dives, not cards)
/work/[slug]          Full case study: problem → context → challenges → role →
                      process → architecture → design → technical → results → lessons
/ux-engineering       Principles + measurable before/after + user-centred examples
/ai                   "Building with AI" — interactive workflow explorer + philosophy
/entrepreneurship     "Building Beyond Software" — founder narrative + ventures
/writing              MDX blog with category filtering + featured layout
/writing/[slug]       Long-form article (MDX)
/dashboard            "Now" — living dashboard (learning, building, goals, fitness)
/contact              Interactive, inquiry-aware contact experience
+ sitemap.xml, robots.txt, custom 404
```

A floating **"Ask Manoranjan"** assistant (⌘K / Ctrl-K) is available on every
page — a command-palette-style chat answering questions about experience, skills,
projects, philosophy, and career direction.

## Folder structure

```
src/
├─ app/                      App Router routes (one folder per page above)
│  ├─ layout.tsx             Root: fonts, SEO metadata, nav, footer, ambient bg, Ask widget
│  ├─ globals.css            Design tokens (@theme), base styles, utilities
│  ├─ sitemap.ts | robots.ts SEO route handlers
│  └─ not-found.tsx
├─ components/
│  ├─ layout/                Navbar, Footer, PageHero
│  ├─ ui/                    Button (cva variants), primitives (Container/Section/Badge…)
│  ├─ motion/                Reveal, Stagger, Counter (scroll-aware)
│  ├─ home/                  HeroVisual (animated engineering dashboard)
│  ├─ sections/              AiWorkflowExplorer, WritingList, ContactExperience
│  └─ ask/                   AskManoranjan assistant
├─ content/writing/          MDX articles
├─ lib/
│  ├─ utils.ts               cn() class merger
│  └─ data/                  Typed content: site, case-studies, about, impact,
│                            ux, ai, entrepreneurship, dashboard, writing, ask
└─ mdx-components.tsx        Styled MDX element mapping
```

## Design system

Defined as CSS-first tokens in `globals.css` (`@theme`), consumed as Tailwind
utilities. Colour is punctuation, not decoration.

- **Surfaces** — `ink-950 → ink-500` (deep charcoal → slate)
- **Foreground** — `mist-50 → mist-400`
- **Accent** — `electric-300/400/500/600` (electric blue)
- **Supporting** — `violet-300/400/500`
- **Success** — `jade-400/500` (green)
- **Type** — Geist Sans (UI), Geist Mono (code/labels), Instrument Serif (editorial accents)
- **Fluid display scale** — `--text-mega`, `--text-display` via `clamp()`
- **Motion** — `--ease-out-expo`, `--ease-spring`; keyframes for aurora, marquee, shimmer
- **Composition utilities** — `.surface`, `.surface-raised`, `.text-gradient-accent`, `.grid-noise`, `.container-px`

### Theming (light / dark)

The site is dark-first with a full light theme, toggled from the navbar (`next-themes`,
class strategy, no flash-of-wrong-theme). Rather than rewriting every component, light
mode **flips the token values** under `html.light`: the `ink-*` / `mist-*` scales invert,
and two themeable overlay tokens — `--color-line` (hairlines, subtle fills, hover
surfaces) and `--color-strong` (max-contrast text) — swap from white to near-black. Every
utility resolves through `var(--color-*)`, so changing the class recolours the whole site
with zero markup edits. Colours that sit on constant gradients (logo, accent buttons,
cover badges) intentionally stay fixed.

## Animation strategy

Meaningful, never decorative. Scroll-triggered reveals (`Reveal`/`Stagger`) fade,
lift, and de-blur once on enter; animated metric counters (`Counter`) ease in when
visible; the nav uses a shared-layout active pill; the hero renders a live-feeling
engineering dashboard with animated scores and floating chips; page-level
micro-interactions on hover. All motion respects `prefers-reduced-motion`.

## SEO

Per-route `Metadata` with title templates, Open Graph + Twitter cards,
`metadataBase`, keyword sets, a generated `sitemap.xml`, and `robots.txt`. Pages
are statically prerendered (case studies and posts via `generateStaticParams`).

## "Ask Manoranjan" architecture

Runs fully client-side with keyword intent-matching over a typed knowledge base
(`lib/data/ask.ts`), so it ships zero per-request cost and works offline. The
`answer(query)` contract is intentionally isolated so it can be swapped for a
streaming LLM endpoint later without touching the UI.

## Future scalability

- Swap the static knowledge base for a streaming LLM endpoint (RAG over real
  content) behind the existing `answer()` contract.
- Promote `lib/data/*` to a CMS or MDX frontmatter pipeline as volume grows.
- Add view transitions, OG image generation (`@vercel/og`), and analytics.
- Wire the contact form to a real backend/email service (currently `mailto:`).

---

Built with intent. © Manoranjan D.
