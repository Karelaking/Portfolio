'use client';

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MediaButtonProps } from "./media-button";
import { IconBrandFacebook, IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { CircleText } from "./circle-text";

const media: MediaButtonProps[] = [
  {
    icon: IconBrandTwitter,
    color: "bg-blue-500 hover:bg-blue-600 text-white",
    handleClick: () => window.open("https://twitter.com/mradulkatiyar", "_blank"),
  },
  {
    icon: IconBrandLinkedin,
    color: "bg-blue-700 hover:bg-blue-800 text-white",
    handleClick: () => window.open("https://www.linkedin.com/in/mradulkatiyar/", "_blank"),
  },
  {
    icon: IconBrandGithub,
    color: "bg-gray-800 hover:bg-gray-900 text-white",
    handleClick: () => window.open("  https://github.com/mradulkatiyar", "_blank"),
  },
  {
    icon: IconBrandInstagram,
    color: "bg-pink-500 hover:bg-pink-600 text-white",
    handleClick: () => window.open("https://www.instagram.com/mradulkatiyar/", "_blank"),
  },
  {
    icon: IconBrandFacebook,
    color: "bg-blue-600 hover:bg-blue-700 text-white",
    handleClick: () => window.open("https://www.facebook.com/mradulkatiyar", "_blank"),
  },
]

const HeroSection = () => {
  return (
    <section className="w-full px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto min-h-screen" id="home">
      <div className="">
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium border-l-2 border-indigo-500 pl-3 uppercase">
          Do better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-extrabold uppercase md:leading-18">
          mradul kumar <CircleText text="katiyar" />
        </h3>
        <p className="text-base md:text-xl text-slate-500 my-4 md:my-6 font-semibold">
          full stack web developer | API designer | student passionate about building robust digital experiences.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link className="relative" href="https://www.linkedin.com/in/kumar-mradul-katiyar/" target="_blank">
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-indigo-600 hover:text-white">Hire me</span>
          </Link>
          <Link href="#about" className="relative">
            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
            <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-white hover:text-indigo-600">Know more</span>
          </Link>
        </div>
      </div>
      <ShuffleGrid />
    </section>
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

    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
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
      className="w-full h-full filter grayscale hover:grayscale-0"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        // filter: "grayscale(100%)",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares(squareData));

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares(shuffle(squareData)));

    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default HeroSection;