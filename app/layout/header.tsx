import React from "react";
import Link from "next/link";
import { caveat } from "@/fonts/fonts";
import ThemeModeToggleButton from "@/components/theme-toggle-button";


const Header = (): React.JSX.Element => {
  return (
    <header className="bg-white dark:bg-slate-800 border-b fixed w-full top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 shadow-lg border-0 border-transparent">
        <Link href="/" className={`text-3xl font-bold ${caveat.className}`}>
          MRADUL
        </Link>
        <div className="flex lg:gap-x-12 itecms-center justify-center">
          <ThemeModeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
