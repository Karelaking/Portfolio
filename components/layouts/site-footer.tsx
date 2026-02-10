import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SiteFooterProps {
  className?: string;
}

export const SiteFooter = ({ className }: SiteFooterProps): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-border/60 border-t", className)}>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-[1.4fr_1fr_1fr] md:text-left">
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
              Portfolio
            </p>
            <p className="text-foreground text-lg font-semibold">
              Crafted in monochrome, tuned for clarity.
            </p>
            <p className="text-muted-foreground text-sm">
              Building resilient product systems with disciplined UI and
              pragmatic engineering.
            </p>
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase sm:justify-start sm:tracking-[0.3em]">
              <span className="border-border/70 rounded-full border px-3 py-1">
                Remote
              </span>
              <span>Available for select builds</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
              Sections
            </p>
            <div className="grid gap-2 text-sm">
              <Link className="hover:text-foreground transition" href="#about">
                About
              </Link>
              <Link
                className="hover:text-foreground transition"
                href="#projects"
              >
                Projects
              </Link>
              <Link
                className="hover:text-foreground transition"
                href="#experience"
              >
                Experience
              </Link>
              <Link
                className="hover:text-foreground transition"
                href="#contact"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase sm:tracking-[0.4em]">
              Connect
            </p>
            <div className="grid gap-2 text-sm">
              <a
                className="hover:text-foreground transition"
                href="https://github.com/Karelaking"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="hover:text-foreground transition"
                href="https://www.linkedin.com/in/kumar-mradul-katiyar"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="hover:text-foreground transition"
                href="mailto:karelaking277@gmail.com"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-border/60 text-muted-foreground mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center text-xs sm:flex-row sm:text-left">
          <p>© {year} Portfolio. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase sm:tracking-[0.3em]">
            Built with Next.js + Supabase
          </p>
        </div>
      </div>
    </footer>
  );
};
