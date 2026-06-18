"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

/**
 * Reads heading IDs that rehype-slug injects into the rendered article, then
 * renders a sticky "On this page" list with scroll-spy via IntersectionObserver.
 * Hidden below xl where there's no room in the margin.
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2[id], article h3[id]"),
    );
    // Syncing from an external system (the rendered DOM) on mount — intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(
      nodes.map((n) => ({
        id: n.id,
        text: n.textContent ?? "",
        level: Number(n.tagName.substring(1)),
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-mist-400">
        On this page
      </p>
      <ul className="space-y-2 border-l border-line/10">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? 16 : 0 }}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l-2 py-0.5 pl-4 text-sm transition-colors",
                active === h.id
                  ? "border-electric-400 text-strong"
                  : "border-transparent text-mist-400 hover:text-mist-100",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
