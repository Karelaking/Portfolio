"use client";

import { gsap } from "gsap";
import Circle from "./circle";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import MediaButton from "./media-button";
import ModelCanvas from "./model-canvas";
import React, { useRef, useEffect } from "react";
import { MediaButtonProps } from "./media-button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caveat, montserrat } from "@/fonts/fonts";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const mediaButtons: MediaButtonProps[] = [
  {
    icon: GithubIcon,
    color: "bg-purple-200 hover:bg-purple-300 text-purple-700",
    handleClick: () => window.open("https://github.com/karelaking", "_blank"),
  },
  {
    icon: LinkedinIcon,
    color: "bg-blue-200 hover:bg-blue-300 text-blue-700",
    handleClick: () =>
      window.open("https://linkedin.com/in/kumar-mradul-katiyar", "_blank"),
  },
  {
    icon: TwitterIcon,
    color: "bg-sky-200 hover:bg-sky-300 text-sky-700",
    handleClick: () => window.open("https://twitter.com/karelaking", "_blank"),
  },
  {
    icon: InstagramIcon,
    color: "bg-pink-200 hover:bg-pink-300 text-pink-700",
    handleClick: () =>
      window.open("https://www.instagram.com/katiyar_karela_king/", "_blank"),
  },
];

export default function HeroAnimatedContent() {
  const heading = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const buttons = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const nameHeadingRef = useRef<HTMLHeadingElement>(null);
  const mediaButtonsRef = useRef<HTMLDivElement>(null);
  const modelCanvasRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation using GSAP
      const entranceElements = [heading.current, sub.current, buttons.current];
      entranceElements.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 2,
              ease: "power3.out",
              delay: i * 0.2 
            }
          );
        }
      });

      // Left side elements (text content)
      const leftElements = [
        nameHeadingRef.current,
        heading.current,
        sub.current,
      ].filter(Boolean);

      // Right side elements (3D model and circle)
      const rightElements = [
        modelCanvasRef.current,
        circleRef.current,
      ].filter(Boolean);

      // Animate left elements to the left on scroll
      leftElements.forEach((element, index) => {
        gsap.fromTo(element, 
          {
            x: 0,
            opacity: 1,
          },
          {
            x: -300 - (index * 50),
            opacity: 0,
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "center center",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // Animate right elements to the right on scroll
      rightElements.forEach((element, index) => {
        gsap.fromTo(element,
          {
            x: 0,
            opacity: 1,
          },
          {
            x: 300 + (index * 50),
            opacity: 0,
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroSectionRef} className="w-full">
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-2 md:px-4 lg:px-8 bg-transparent overflow-hidden lg:py-0 py-12">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left mt-4">
          <h1
            ref={nameHeadingRef}
            className={`text-6xl md:text-8xl tracking-tight text-gray-900 dark:text-gray-300 text-shadow-2xl ${caveat.className}`}
          >
            <span className="text-[#6ee7b7] left-out">MRADUL</span>
            <span className="text-[#a5b4fc] mx-4">KUMAR</span>&nbsp;
            {"  "} &nbsp;
            <span className="relative text-[#fca5a5]">
              KATIYAR
              <svg
                viewBox="0 0 286 73"
                fill="none"
                className="absolute -left-2 -right-2 -top-1 bottom-0 translate-y-1"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                  }}
                  d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                  stroke="#101828"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h1>
          <h1
            ref={heading}
            className={`text-5xl md:text-6xl tracking-tight text-gray-900 dark:text-gray-300 text-shadow-2xl leading-10 md:leading-16 font-bold `}
          >
            Web Developer | UI/UX Designer | Creative Problem
          </h1>
          <p
            ref={sub}
            className={`text-lg md:text-xl text-gray-700 dark:text-gray-500 max-w-lg ${montserrat.className} text-shadow-2xl`}
          >
            I design and build modern, responsive, and user-focused websites that
            don&apos;t just look good — they perform. My mission is simple: turn
            ideas into seamless digital experiences that leave a lasting
            impression.
          </p>

          {/* Media buttons */}
          <div ref={mediaButtonsRef} className="flex gap-4 justify-between w-full md:justify-normal px-4 md:px-0">
            {mediaButtons.map(({ icon, color, handleClick }, index: number) => {
              return <MediaButton key={index} icon={icon} color={color} handleClick={handleClick} />;
            })}
          </div>

          <div
            ref={buttons}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start px-4 md:px-0"
          >
            <Button className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-300 text-white rounded-lg shadow hover:bg-indigo-700 transition h-12">
              Explore My Work
            </Button>
            <Button
              className="inline-block px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition h-12"
              variant="outline"
            >
              Let&apos;s Connect
            </Button>
          </div>
        </div>
        <ModelCanvas ref={modelCanvasRef} />
        <Circle ref={circleRef} />
      </section>
    </div>
  );
}
