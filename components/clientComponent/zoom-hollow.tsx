"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ZoomHollowTextProps {
  words: string[];
  className?: string;
  duration?: number;
  interval?: number;
  strokeWidth?: number;
  fillColor?: string;
  strokeColor?: string;
}

export function ZoomHollowText({
  words,
  className = "",
  duration = 0.8,
  interval = 2500,
  strokeWidth = 2,
  fillColor = "transparent",
  strokeColor = "currentColor",
}: ZoomHollowTextProps): React.ReactElement {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
            WebkitTextFillColor: fillColor,
            paintOrder: "stroke fill",
          }}
          className="block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
