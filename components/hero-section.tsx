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
        className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 mx-auto min-h-dvh"
        id="home"
      >
        <div className="z-10">
          <span className="block mt-2 mb-2 lg:mt-0 lg:mb-4 text-xs md:text-sm text-indigo-500 font-medium border-l-2 border-indigo-500 pl-3 uppercase">
            Do better every day
          </span>
          <h3 className="text-4xl md:text-6xl font-extrabold uppercase md:leading-18 text-neutral-800 dark:text-neutral-200 derk:text-neutral-200">
            mradul kumar <CircleText text="katiyar" />
          </h3>
          <p className="text-base md:text-xl text-neutral-500 dark:text-neutral-400 my-4 md:my-6 font-semibold capitalize font-jetbrains-mono leading-5.5 lg:leading-relaxed tracking-tighter lg:tracking-tight">
            full stack web developer | API designer | student passionate about
            building robust digital experiences.
          </p>
          <div className="flex flex-wrap gap-2">
            <HoverBorderGradient>
              <Link href="https://www.linkedin.com/in/kumar-mradul-katiyar/">
                Hire me
              </Link>
            </HoverBorderGradient>
            <HoverBorderGradient className="bg-white text-neutral-950 font-extrabold">
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
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
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
      className="w-full h-full fillter grayscale hover:grayscale-0 rounded-md"
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
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 z-10">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default HeroSection;
