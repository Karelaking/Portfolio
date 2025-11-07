import React from "react";
import Link from "next/link";
import {caveat } from "@/fonts/fonts";
import LangSwitcher from "./lang-switcher";
import ThemeModeToggleButton from "./theme-toggle-button";


const NavBar = (): React.JSX.Element => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 shadow-lg border-0 border-transparent">
        <Link href="/" className={`text-3xl font-bold ${caveat.className}`}>
          MRADUL
        </Link>
        <div className="flex gap-x-2 lg:gap-x-12 itecms-center justify-center">
          <LangSwitcher />
          <ThemeModeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
