"use client";

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  className?: string;
}

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#social", label: "Social" },
  { href: "#blog", label: "Blog" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export const SiteHeader = ({ className }: SiteHeaderProps): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleNavClick = (): void => {
    setIsMenuOpen(false);
  };

  useEffect((): (() => void) => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) {
      return;
    }

    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const handleTrap = (event: KeyboardEvent): void => {
      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleTrap);

    return (): void => {
      window.removeEventListener("keydown", handleTrap);
    };
  }, [isMenuOpen]);

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            MRADUL
          </Link>
          <div className="flex items-center gap-3">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="transition-colors hover:text-foreground"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground transition hover:border-foreground md:hidden"
              onClick={handleToggleMenu}
              type="button"
            >
              {isMenuOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen ? (
            <>
              <motion.button
                aria-label="Close navigation"
                className="fixed inset-0 z-30 bg-background/70 md:hidden"
                onClick={handleNavClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                type="button"
              />
              <motion.div
                className="relative z-40 border-t border-border/60 bg-background/95 pb-6 pt-4 md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                ref={mobileMenuRef}
              >
                <nav
                  aria-label="Mobile"
                  className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      className="transition-colors hover:text-foreground"
                      href={link.href}
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
