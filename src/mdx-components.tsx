import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-mist-50"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 text-xl font-semibold text-mist-50" {...props} />
    ),
    p: (props) => (
      <p className="mt-5 text-pretty leading-relaxed text-mist-300" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-electric-400 underline-offset-4 hover:underline"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-mist-300 marker:text-electric-400" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-mist-300 marker:text-mist-400" {...props} />
    ),
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-7 border-l-2 border-electric-400/50 pl-5 text-lg italic text-mist-200"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-electric-300"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-6 overflow-x-auto rounded-2xl border border-white/8 bg-ink-950 p-5 font-mono text-sm text-mist-200"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-white/8" />,
    strong: (props) => <strong className="font-semibold text-mist-100" {...props} />,
    ...components,
  };
}
