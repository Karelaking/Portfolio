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
