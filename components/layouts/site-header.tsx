import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  className?: string;
}

export const SiteHeader = ({ className }: SiteHeaderProps): ReactElement => {
  return (
    <header className={cn("border-b border-border/60", className)}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Portfolio
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link className="transition-colors hover:text-foreground" href="#about">
            About
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#work">
            Work
          </Link>
          <Link className="transition-colors hover:text-foreground" href="#contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};
