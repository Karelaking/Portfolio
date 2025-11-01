import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
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
import {caveat } from "@/fonts/fonts";
import ThemeModeToggleButton from "./theme-toggle-button";
import LangSwitcher from "./lang-switcher";

const navItems: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

// const locales: string[] = ["en", "es", "fr", "hi-IN", "ko-KR"];

const NavLinks = (): React.JSX.Element => {
  return (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuLink asChild>
            <Link

              href={item.href}
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:text-black"
            >
              {item.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </>
  );
};

const NavBar = (): React.JSX.Element => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className={`text-3xl font-bold ${caveat.className}`}>
          MRADUL
        </Link>

        {/* Desktop / Tablet Nav */}
        <div className="hidden sm:flex sm:items-center sm:space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-4">
              <NavLinks />
              <ThemeModeToggleButton />
              <LangSwitcher />
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
                <span className={`text-lg font-semibold ${caveat.className}`}>MRADUL</span>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      replace
                      href={item.href}
                      className={`block px-3 py-2 rounded-md hover:bg-gray-100 text-black dark:text-white ${caveat.className} text-2xl`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <LangSwitcher />
                <ThemeModeToggleButton />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
