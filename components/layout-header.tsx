import React from "react";
import Link from "next/link";
import { caveat } from "@/fonts/fonts";
import ThemeModeToggleButton from "@/components/theme-toggle-button";


const Header = (): React.JSX.Element => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 shadow-lg border-0 border-transparent">
        <Link href="/" className={`text-3xl font-bold ${caveat.className}`}>
          MRADUL
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('experience')}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Experience
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeModeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
