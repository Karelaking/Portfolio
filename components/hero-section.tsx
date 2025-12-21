"use client";

import { motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CircleText } from "./circle-text";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { SectionContainer } from "./ui/section-container";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const HeroSection = () => {
  return (
    <SectionContainer className="relative">
      <BackgroundRippleEffect />
      <section
        className="mx-auto grid min-h-dvh w-full grid-cols-1 items-center gap-8 md:grid-cols-2"
        id="home"
      >
        <div className="z-10">
          <span className="mt-2 mb-2 block border-l-2 border-indigo-500 pl-3 text-xs font-medium text-indigo-500 uppercase md:text-sm lg:mt-0 lg:mb-4 animate-pulse animation-duration-3000">
            Do better every day
          </span>
          <h3 className="derk:text-neutral-200 text-4xl font-extrabold tracking-tight text-neutral-800 uppercase md:text-7xl md:leading-18 dark:text-neutral-200">
            mradul kumar <CircleText text="katiyar" />
          </h3>
          <p className="font-jetbrains-mono my-4 text-base leading-5.5 font-semibold tracking-tighter text-neutral-500 capitalize md:my-6 md:text-xl lg:leading-relaxed lg:tracking-tight dark:text-neutral-400">
            full stack web developer | API designer | student passionate about
            building robust digital experiences.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="animate-bounce">
            <HoverBorderGradient>
              <Link href="https://www.linkedin.com/in/kumar-mradul-katiyar/">
                Hire me
              </Link>
            </HoverBorderGradient>
            </div>
            <HoverBorderGradient className="bg-white font-extrabold text-neutral-950">
              <Link href="#about">Know More</Link>
            </HoverBorderGradient>
          </div>
        </div>
        <ShuffleGrid />
      </section>
    </SectionContainer>
  );
};

type Square = { id: number; src: string };

const shuffle = <T,>(array: T[]): T[] => {
  const arr = array.slice();
  let currentIndex = arr.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
};

const squareData: Square[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1765731410178-8537793c2c38?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1737119503128-8120c87383a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://plus.unsplash.com/premium_photo-1766012368204-bf6604d32d2b?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1765651998332-a9ee2099dd3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1765993983047-4c22b0451c74?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1765915968433-86d4d13ae1a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1766033238724-959287ed5771?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1765840138769-a4c229d7f190?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const generateSquares = (data: Square[]): React.ReactElement[] => {
  return data.map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="fillter h-full w-full rounded-md grayscale hover:grayscale-0"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares(squareData));

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares(shuffle(squareData)));

    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  }, []);

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shuffleSquares]);

  return (
    <div className="z-10 grid h-[450px] grid-cols-4 grid-rows-4 gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default HeroSection;
