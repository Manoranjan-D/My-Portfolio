import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site, socials } from "@/lib/data/site";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/8 pt-20">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-electric-400 to-violet-500 text-sm font-bold text-white">
                M
              </span>
              <span className="text-sm font-semibold text-mist-50">
                Manoranjan D
              </span>
            </Link>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-mist-300">
              Product-minded frontend engineer building scalable products,
              exceptional experiences, and future-focused ventures.
            </p>
            <p className="mt-4 text-sm text-mist-400">{site.location}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-mist-400">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist-200 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-mist-400">
              Connect
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-mist-200 transition-colors hover:text-white"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      className="text-mist-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-400"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/8 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-mist-400">
            © {new Date().getFullYear()} Manoranjan D. Built with intent.
          </p>
          <p className="text-xs text-mist-500">
            Next.js · React · TypeScript · Tailwind · Motion
          </p>
        </div>
      </Container>
    </footer>
  );
}
