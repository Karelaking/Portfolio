'use client';

import Link from 'next/link';
import { ThemeToggle } from '../theme';
import { ReactElement, useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { NavLink } from '@/types/layouts/header.interface';
import { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle } from '../ui/sheet';
import { Logo } from '../serverComponent/NavigationBar';

export const MobileMenu = ({navLinks}: { navLinks: NavLink[] }): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleToggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="sm:hidden">
      <Sheet open={isMenuOpen} onOpenChange={handleToggleMenu}>
        <SheetTrigger asChild>
          <button
            aria-label="Toggle navigation"
            className="border-border/70 text-foreground hover:border-foreground inline-flex size-10 items-center justify-center rounded-full border transition md:hidden"
            type="button"
          >
            <IconMenu2 size={18} />
          </button>
        </SheetTrigger>
        <SheetClose asChild></SheetClose>
        <SheetTitle></SheetTitle>
        <SheetContent
          side="left"
          className="bg-background/95 border-border/60 flex h-dvh w-full flex-col border-r px-0 py-0 backdrop-blur md:hidden"
        >
          <div className="border-border/60 flex items-center justify-between gap-4 border-b px-4 py-5">
            <Logo />
            <SheetClose asChild>
              <button
                aria-label="Close navigation"
                className="border-border/70 text-foreground hover:border-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
                type="button"
              >
                <IconX size={18} />
              </button>
            </SheetClose>
          </div>
          <nav
            aria-label="Mobile"
            className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-5 px-4 py-6 text-sm tracking-[0.18em] uppercase"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="group hover:text-foreground focus-visible:text-foreground relative inline-flex w-fit items-center wrap-break-word transition-colors"
                href={link.href}
                onClick={handleToggleMenu}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="bg-foreground absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </Link>
            ))}
          </nav>
          <ThemeToggle className="flex justify-center mb-6 ml-4" />
        </SheetContent>
      </Sheet>
    </div>
  );
}