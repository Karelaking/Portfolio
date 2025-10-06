"use client";
import ModelCanvas from "./model-canvas";
import React, { useRef, useEffect } from "react";

import Circle from "./circle";
import MatrixRain from "./matrix-rain";
import ScanningLine from "./scanning-line";
import GridBackground from "./grid-background";
import FloatingParticles from "./floating-particles";

// Matrix-style falling code effect

export default function Hero() {
  const heading = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const buttons = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [heading.current, sub.current, buttons.current];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        setTimeout(() => {
          el.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 200);
      }
    });
  }, []);

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 lg:px-24 bg-gradient-to-tr from-indigo-50 to-white overflow-hidden my-4 lg:my-0">
      <MatrixRain />
      <GridBackground />
      <FloatingParticles />
      <ScanningLine />
      {/* Text block */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1
          ref={heading}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
        >
          MRADUL KUMAR
          <br />
          Web Developer | UI/UX Designer | Creative Problem Solver
        </h1>
        <p ref={sub} className="text-lg md:text-xl text-gray-700 max-w-lg">
          I design and build modern, responsive, and user-focused websites that
          don&apos;t just look good — they perform. My mission is simple: turn
          ideas into seamless digital experiences that leave a lasting
          impression.
        </p>

        <div
          ref={buttons}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <a
            href="#portfolio"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

      <ModelCanvas />
      <Circle />
    </section>
  );
}
