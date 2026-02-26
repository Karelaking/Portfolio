import Link from "next/link";
import { cn } from "@/lib/utils";
import {MobileMenu} from "./MobileMenu";
import type { ReactElement } from "react";
import { NavigationBarProps } from "@/types";
import { ThemeToggle } from "@/components/theme";
import { navLinks } from "@/data/NavigationLinks";

export const Logo = (): ReactElement => {
  return (
    <Link href="/" className="text-lg font-semibold tracking-tight">
      MRADUL
    </Link>
  );
};

export const NavigationBar = ({
  className,
}: NavigationBarProps): ReactElement => {
  return (
    <header
      className={cn(
        "border-border/60 bg-background/90 sticky top-0 z-50 flex w-full max-w-full items-center justify-between border-b px-8 py-2 backdrop-blur",
        className,
      )}
    >
      <Logo />
      <nav
        aria-label="Primary"
        className="text-muted-foreground hidden w-full max-w-5xl items-center justify-center gap-x-8 text-xs tracking-[0.3em] uppercase sm:flex"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className="group hover:text-foreground focus-visible:text-foreground relative inline-flex items-center justify-center transition-colors"
            href={link.href}
          >
            <span className="relative z-10">{link.label}</span>
            <span className="bg-foreground absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </Link>
        ))}
      </nav>
      <MobileMenu navLinks={navLinks} />
      <ThemeToggle className="hidden sm:flex" />
    </header>
  );
};
