"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { PixelatedCanvas } from "./ui/pixelated-canvas";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

// Animated text that reveals character by character
const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => {
  return (
    <span className="inline-block">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          whileHover={{
            scale: 1.1,
            color: "#10b981",
            transition: { duration: 0.1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Magnetic button effect
const MagneticElement = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [imageHovered, setImageHovered] = useState(false);

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "20+", label: "Happy Clients" },
  ];

  const nameWords = ["Mradul", "Kumar"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <SectionContainer
      id="about"
      className="flex min-h-screen w-full items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div ref={sectionRef} className="flex w-full max-w-screen-2xl flex-col items-center gap-20 px-2 lg:flex-row lg:gap-32 lg:px-16">
        {/* Image Section */}
        <MagneticElement className="relative w-full max-w-lg lg:max-w-none lg:w-[45%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
            className="relative"
          >
            <div
              ref={containerRef}
              className="relative aspect-3/4 w-full overflow-hidden rounded-3xl"
            >
              {dimensions.width > 0 && dimensions.height > 0 && (
                <PixelatedCanvas
                  src="/photo.jpeg"
                  width={dimensions.width}
                  height={dimensions.height}
                  cellSize={4}
                  dotScale={0.9}
                  shape="square"
                  backgroundColor="#000000"
                  dropoutStrength={0.1}
                  interactive
                  distortionStrength={0.1}
                  distortionRadius={200}
                  distortionMode="repel"
                  followSpeed={0.2}
                  jitterStrength={4}
                  jitterSpeed={1}
                  sampleAverage
                  className="rounded-2xl"
                />
              )}
            </div>
            {/* Decorative frame */}
            <motion.div
              className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border border-neutral-300 dark:border-neutral-700"
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            {/* Floating accent dots */}
            <motion.div
              className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-green-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-2 left-1/4 h-4 w-4 rounded-full bg-neutral-400/30 dark:bg-neutral-600/30"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Hover glow effect */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: imageHovered
                  ? "0 0 60px 10px rgba(16, 185, 129, 0.15)"
                  : "0 0 0px 0px rgba(16, 185, 129, 0)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </MagneticElement>

        {/* Content Section */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left lg:max-w-2xl">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            whileHover={{ scale: 1.05, color: "#10b981" }}
            className="font-jetbrains-mono mb-6 cursor-default text-sm font-medium uppercase tracking-widest text-neutral-500 transition-colors dark:text-neutral-400 md:text-center w-full"
          >
            About Me
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="font-mea-culpa flex flex-wrap justify-center gap-x-4 text-6xl tracking-wide text-neutral-900 dark:text-white md:text-9xl lg:justify-start lg:text-9xl xl:text-9xl"
          >
            {nameWords.map((word, i) => (
              <AnimatedWord key={word} word={word} delay={0.3 + i * 0.15} />
            ))}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
            className="font-jetbrains-mono mt-8 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
          >
            A passionate full-stack developer crafting beautiful, intuitive, and
            performant web experiences. With expertise in React, Next.js, and Node.js,
            I transform ideas into reality through clean code and creative problem-solving.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
            className="font-jetbrains-mono mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
          >
            When I&apos;m not coding, you&apos;ll find me exploring new technologies,
            contributing to open-source, or sharing knowledge with the developer community.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.5}
            className="mt-12 flex flex-wrap justify-center gap-10 lg:justify-start lg:gap-14"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative flex cursor-pointer flex-col items-center lg:items-start"
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Hover background glow */}
                <motion.div
                  className="absolute -inset-4 rounded-xl bg-neutral-100 opacity-0 dark:bg-neutral-800/50"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="relative font-mea-culpa text-5xl text-neutral-900 transition-colors group-hover:text-green-500 dark:text-white md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.span>
                <motion.span
                  className="relative font-jetbrains-mono text-sm uppercase tracking-wider text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-neutral-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.15, duration: 0.3 }}
                >
                  {stat.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative dots with hover interaction */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.7}
            className="mt-12 flex gap-4"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 cursor-pointer rounded-full bg-neutral-400 dark:bg-neutral-600"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                whileHover={{
                  scale: 2,
                  backgroundColor: "#10b981",
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
