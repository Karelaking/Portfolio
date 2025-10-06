import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { LocaleSwitcher } from "lingo.dev/react-client";
import { ThemeModeToggleButton } from "./theme-toggle-button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const locales: string[] = ["en", "es", "fr", "hi-IN", "ko-KR"];

function NavLinks() {
  return (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className="px-3 py-2 rounded-md hover:bg-gray-100"
            >
              {item.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </>
  );
}

export default function NavBar() {
  return (
    <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MRADUL
        </Link>

        {/* Desktop / Tablet Nav */}
        <div className="hidden sm:flex sm:items-center sm:space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavLinks />
              <ThemeModeToggleButton />
              <LocaleSwitcher locales={locales} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 px-4 py-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Menu</span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <LocaleSwitcher locales={locales} />
                <ThemeModeToggleButton />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
