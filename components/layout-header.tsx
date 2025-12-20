<<<<<<< HEAD
"use client";
import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import ThemeModeToggleButton from "@/components/theme-toggle-button";
import { useIconAnimation } from "@/icons/icon-animation-controller";


export interface NavItems {
  name: string;
  link: string;
  icon?: React.JSX.Element;
}

export const Header = ({
  navItems,
  className,
}: {
  navItems: NavItems[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const { triggerViewportAnimation } = useIconAnimation();
  const headerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()! - 5;

      if (scrollYProgress.get() < 0.08) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={headerRef}
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        onViewportEnter={() => triggerViewportAnimation()}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-[calc(100%-2rem)] md:max-w-[calc(100%-24rem)] fixed top-6 inset-x-0 mx-auto border border-neutral-50 backdrop-blur-[2px] dark:border-neutral-700 rounded-full dark:bg-black/15 shadow-sm z-5000 px-4  py-2 items-center justify-evenly space-x-4 sm:space-x-8 sm:pr-8 sm:pl-12",
          className
        )}
      >
        {navItems.map((navItem: NavItems, idx: number) => (
          <motion.a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "group relative dark:text-white items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <motion.span className="block sm:hidden"
            >{navItem.icon}</motion.span>
            <motion.span className="hidden sm:block text-sm group-hover:text-primary text-neutral-700 dark:text-neutral-300 text-shadow-2xs"
              layoutId="navItem"
              whileHover={
                {
                  scale: 1.1,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut"
                  },
                  color: "text-primary",
                  fontWeight: "semiBold",
                  cursor: "pointer"
                 }
            }
            >{navItem.name}</motion.span>
          </motion.a>
        ))}
        <ThemeModeToggleButton />
      </motion.div>
    </AnimatePresence>
  );
};
=======
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
            onClick={() => scrollToSection('expertise')}
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
          >
            Expertise
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
>>>>>>> dev
