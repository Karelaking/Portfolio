import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  className?: string;
}

export const SiteHeader = ({ className }: SiteHeaderProps): ReactElement => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Portfolio
        </Link>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <Link className="transition-colors hover:text-foreground" href="#hero">
            Home
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#about">
            About
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#expertise">
            Expertise
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#experience">
            Experience
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#projects">
            Projects
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#social">
            Social
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#blog">
            Blog
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#gallery">
            Gallery
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
