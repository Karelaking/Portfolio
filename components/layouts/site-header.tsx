"use client";

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme";
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

  useEffect((): (() => void) => {
    if (!isMenuOpen) {
      return () => undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return (): void => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "border-border/60 bg-background/90 fixed top-0 z-40 w-full border-b backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-0">
        <div className="flex items-center justify-between gap-4 py-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            MRADUL
          </Link>
          <div className="flex items-center gap-3">
            <nav
              aria-label="Primary"
              className="text-muted-foreground hidden items-center gap-4 text-xs tracking-[0.3em] uppercase md:flex"
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
            <ThemeToggle />
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              className="border-border/70 text-foreground hover:border-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden"
              onClick={handleToggleMenu}
              type="button"
            >
              {isMenuOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              className="bg-background/95 fixed inset-0 z-50 flex h-dvh flex-col overflow-y-auto backdrop-blur md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              ref={mobileMenuRef}
            >
              <div className="border-border/60 flex items-center justify-between gap-4 border-b px-4 py-5 sm:px-6">
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-tight"
                  onClick={handleNavClick}
                >
                  MRADUL
                </Link>
                <button
                  aria-label="Close navigation"
                  className="border-border/70 text-foreground hover:border-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
                  onClick={handleNavClick}
                  type="button"
                >
                  <IconX size={18} />
                </button>
              </div>
              <nav
                aria-label="Mobile"
                className="text-muted-foreground flex flex-1 flex-col gap-5 px-4 py-6 text-sm tracking-[0.18em] uppercase sm:px-6 sm:tracking-[0.3em]"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="group hover:text-foreground focus-visible:text-foreground relative inline-flex w-fit items-center wrap-break-word transition-colors"
                    href={link.href}
                    onClick={handleNavClick}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="bg-foreground absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </Link>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
