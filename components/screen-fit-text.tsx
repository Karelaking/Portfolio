"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

export interface ScreenFitTextProps {
  text?: string;
  children?: React.ReactNode;
  minFontSize?: number;
  maxFontSize?: number;
  className?: string;
}

export const ScreenFitText: React.FC<ScreenFitTextProps> = ({
  text,
  children,
  minFontSize = 1,
  maxFontSize = 2500,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const debounceRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and scale effects based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  const resizeText = useCallback((): void => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const containerWidth = container.offsetWidth;
    let lo = minFontSize;
    let hi = maxFontSize;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      textEl.style.fontSize = mid + "px";

      if (textEl.offsetWidth <= containerWidth) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    textEl.style.fontSize = hi + "px";
  }, [minFontSize, maxFontSize]);

  const handleResize = useCallback(() => {
    if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(
      () => resizeText(),
      50,
    ) as unknown as number;
  }, [resizeText]);

  useEffect(() => {
    resizeText();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (debounceRef.current !== null)
        window.clearTimeout(debounceRef.current);
    };
  }, [handleResize, resizeText, text, children]);

  return (
    <motion.div
      className={`relative flex w-full items-center overflow-hidden ${className} bg-neutral-100 dark:bg-neutral-900 my-8 py-4`}
      ref={containerRef}
      style={{ opacity, scale, y }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute left-0 top-1/2 h-px w-16 -translate-y-1/2 bg-linear-to-r from-transparent to-green-500/50 md:w-32"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 h-px w-16 -translate-y-1/2 bg-linear-to-l from-transparent to-green-500/50 md:w-32"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ originX: 1 }}
      />

      {/* Floating accent dots */}
      <motion.div
        className="absolute left-8 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-green-500/30 md:left-16"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-8 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-green-500/30 md:right-16"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.span
        ref={textRef}
        className="mx-auto text-center font-jetbrains-mono font-extrabold whitespace-nowrap text-neutral-300 uppercase tracking-wider dark:text-neutral-700"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {text ?? children ?? "Fit text to container"}
      </motion.span>
    </motion.div>
  );
};

export default ScreenFitText;
