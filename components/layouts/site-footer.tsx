import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SiteFooterProps {
  className?: string;
}

export const SiteFooter = ({ className }: SiteFooterProps): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border/60", className)}>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Portfolio
            </p>
            <p className="text-lg font-semibold text-foreground">
              Crafted in monochrome, tuned for clarity.
            </p>
            <p className="text-sm text-muted-foreground">
              Building resilient product systems with disciplined UI and pragmatic engineering.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="rounded-full border border-border/70 px-3 py-1">Remote</span>
              <span>Available for select builds</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Sections
            </p>
            <div className="grid gap-2 text-sm">
              <Link className="transition hover:text-foreground" href="#about">
                About
              </Link>
              <Link className="transition hover:text-foreground" href="#projects">
                Projects
              </Link>
              <Link className="transition hover:text-foreground" href="#experience">
                Experience
              </Link>
              <Link className="transition hover:text-foreground" href="#contact">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Connect
            </p>
            <div className="grid gap-2 text-sm">
              <a
                className="transition hover:text-foreground"
                href="https://github.com/Karelaking"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="transition hover:text-foreground"
                href="https://www.linkedin.com/in/kumar-mradul-katiyar"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="transition hover:text-foreground"
                href="mailto:karelaking277@gmail.com"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© {year} Portfolio. All rights reserved.</p>
          <p className="uppercase tracking-[0.3em]">Built with Next.js + Supabase</p>
        </div>
      </div>
    </footer>
  );
};
