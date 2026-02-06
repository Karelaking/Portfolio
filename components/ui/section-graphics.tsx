"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Floating geometric shapes that parallax on scroll
export const FloatingShapes = ({ variant = "default" }: { variant?: "default" | "circles" | "squares" | "mixed" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const shapes = {
    default: (
      <>
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute left-[10%] top-[20%] h-16 w-16 rounded-full border border-green-500/20 md:h-24 md:w-24"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[15%] top-[30%] h-8 w-8 rotate-45 border border-emerald-500/20 md:h-12 md:w-12"
        />
        <motion.div
          style={{ y: y3, rotate: rotate2 }}
          className="absolute left-[20%] bottom-[25%] h-12 w-12 rounded-full bg-green-500/5 md:h-20 md:w-20"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute right-[10%] bottom-[20%] h-6 w-6 rounded-full bg-emerald-500/10 md:h-10 md:w-10"
        />
      </>
    ),
    circles: (
      <>
        <motion.div
          style={{ y: y1 }}
          className="absolute left-[5%] top-[15%] h-32 w-32 rounded-full border border-dashed border-green-500/10 md:h-48 md:w-48"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[8%] top-[40%] h-20 w-20 rounded-full bg-linear-to-br from-green-500/5 to-transparent md:h-32 md:w-32"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute left-[15%] bottom-[20%] h-12 w-12 rounded-full border-2 border-emerald-500/15 md:h-16 md:w-16"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute right-[20%] bottom-[30%] h-8 w-8 rounded-full bg-green-500/10 blur-sm md:h-14 md:w-14"
        />
      </>
    ),
    squares: (
      <>
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute left-[8%] top-[25%] h-16 w-16 border border-green-500/15 md:h-24 md:w-24"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute right-[12%] top-[20%] h-10 w-10 bg-emerald-500/5 md:h-16 md:w-16"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute left-[25%] bottom-[15%] h-8 w-8 rotate-12 border-2 border-dashed border-green-500/10 md:h-12 md:w-12"
        />
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute right-[18%] bottom-[25%] h-14 w-14 border border-emerald-500/10 md:h-20 md:w-20"
        />
      </>
    ),
    mixed: (
      <>
        <motion.div
          style={{ y: y1 }}
          className="absolute left-[5%] top-[10%] h-24 w-24 rounded-full border border-green-500/10 md:h-36 md:w-36"
        />
        <motion.div
          style={{ y: y2, rotate: rotate1 }}
          className="absolute right-[10%] top-[35%] h-12 w-12 border border-emerald-500/15 md:h-20 md:w-20"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute left-[18%] bottom-[30%] h-8 w-8 rounded-full bg-green-500/10 md:h-12 md:w-12"
        />
        <motion.div
          style={{ y: y1, rotate: rotate2 }}
          className="absolute right-[22%] bottom-[15%] h-16 w-16 rotate-45 border-2 border-dashed border-green-500/5 md:h-24 md:w-24"
        />
      </>
    ),
  };

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes[variant]}
    </div>
  );
};

// Grid pattern background
export const GridPattern = ({ opacity = 0.03 }: { opacity?: number }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, ${opacity}) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(16, 185, 129, ${opacity}) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  );
};

// Dot pattern background
export const DotPattern = ({ opacity = 0.1, size = 2, gap = 24 }: { opacity?: number; size?: number; gap?: number }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, ${opacity}) ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
};

// Gradient orbs
export const GradientOrbs = ({ variant = "green" }: { variant?: "green" | "blue" | "purple" | "warm" }) => {
  const colors = {
    green: ["from-green-500/10", "from-emerald-500/10", "from-teal-500/5"],
    blue: ["from-blue-500/10", "from-cyan-500/10", "from-sky-500/5"],
    purple: ["from-purple-500/10", "from-violet-500/10", "from-indigo-500/5"],
    warm: ["from-orange-500/10", "from-amber-500/10", "from-yellow-500/5"],
  };

  const [c1, c2, c3] = colors[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -left-32 -top-32 h-96 w-96 rounded-full bg-linear-to-br ${c1} to-transparent blur-3xl`} />
      <div className={`absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-linear-to-bl ${c2} to-transparent blur-3xl`} />
      <div className={`absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-linear-to-tr ${c3} to-transparent blur-3xl`} />
    </div>
  );
};

// Animated lines
export const AnimatedLines = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-0 top-1/4 h-px w-full bg-linear-to-r from-transparent via-green-500/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-0 top-2/3 h-px w-full bg-linear-to-r from-transparent via-emerald-500/15 to-transparent"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/4 top-0 h-full w-px bg-linear-to-b from-transparent via-green-500/10 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-1/3 top-0 h-full w-px bg-linear-to-b from-transparent via-emerald-500/10 to-transparent"
        animate={{ y: ["100%", "-100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Noise texture overlay
export const NoiseTexture = ({ opacity = 0.03 }: { opacity?: number }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

// Corner decorations
export const CornerDecorations = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top left */}
      <div className="absolute left-4 top-4 h-16 w-16 border-l-2 border-t-2 border-green-500/20 md:left-8 md:top-8 md:h-24 md:w-24" />
      {/* Top right */}
      <div className="absolute right-4 top-4 h-16 w-16 border-r-2 border-t-2 border-green-500/20 md:right-8 md:top-8 md:h-24 md:w-24" />
      {/* Bottom left */}
      <div className="absolute bottom-4 left-4 h-16 w-16 border-b-2 border-l-2 border-green-500/20 md:bottom-8 md:left-8 md:h-24 md:w-24" />
      {/* Bottom right */}
      <div className="absolute bottom-4 right-4 h-16 w-16 border-b-2 border-r-2 border-green-500/20 md:bottom-8 md:right-8 md:h-24 md:w-24" />
    </div>
  );
};

// Section wrapper with visual theme
export const SectionVisualWrapper = ({
  children,
  variant = "default",
  showGrid = false,
  showDots = false,
  showOrbs = false,
  showLines = false,
  showNoise = false,
  showCorners = false,
  showShapes = false,
  shapesVariant = "default",
  orbsVariant = "green",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "default";
  showGrid?: boolean;
  showDots?: boolean;
  showOrbs?: boolean;
  showLines?: boolean;
  showNoise?: boolean;
  showCorners?: boolean;
  showShapes?: boolean;
  shapesVariant?: "default" | "circles" | "squares" | "mixed";
  orbsVariant?: "green" | "blue" | "purple" | "warm";
  className?: string;
}) => {
  const bgClasses = {
    light: "bg-neutral-50 dark:bg-neutral-900",
    dark: "bg-neutral-100 dark:bg-neutral-950",
    default: "bg-white dark:bg-neutral-950",
  };

  return (
    <div className={`relative ${bgClasses[variant]} ${className}`}>
      {showGrid && <GridPattern />}
      {showDots && <DotPattern />}
      {showOrbs && <GradientOrbs variant={orbsVariant} />}
      {showLines && <AnimatedLines />}
      {showNoise && <NoiseTexture />}
      {showCorners && <CornerDecorations />}
      {showShapes && <FloatingShapes variant={shapesVariant} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
