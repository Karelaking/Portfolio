"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { SectionContainer } from "./ui/section-container";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import { useEffect, useState } from "react";
import { IconArrowDown } from "@tabler/icons-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

// Animated letter component for the name
const AnimatedLetter = ({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) => {
  return (
    <motion.span
      className="inline-block cursor-default"
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.05,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        scale: 1.2,
        color: "#10b981",
        transition: { duration: 0.15 },
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
};

// Interactive skill tag
const SkillTag = ({ skill, index }: { skill: string; index: number }) => {
  return (
    <motion.span
      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-3 py-1 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-neutral-400"
        animate={{
          backgroundColor: ["#a3a3a3", "#10b981", "#a3a3a3"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3,
        }}
      />
      {skill}
    </motion.span>
  );
};

// Floating particles around the content
const FloatingParticle = ({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) => {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full bg-neutral-300 dark:bg-neutral-700"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

const HeroSection = () => {
  const name = "Mradul Kumar Katiyar";
  const skills = ["React & Next.js", "Node.js", "TypeScript", "PostgreSQL"];

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, 1], [-25, 25]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, 1], [-25, 25]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Typewriter effect for subtitle
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Full Stack Developer • API Architect • UI Enthusiast";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);
  return (
    <SectionContainer className="relative py-0 my-0">
      <BackgroundRippleEffect />
      <section
        className="mx-auto flex min-h-dvh w-full flex-col items-center justify-center"
        id="home"
      >
        {/* Floating particles */}
        <FloatingParticle delay={0} size={4} x="20%" y="30%" />
        <FloatingParticle delay={1} size={6} x="80%" y="25%" />
        <FloatingParticle delay={2} size={3} x="15%" y="70%" />
        <FloatingParticle delay={1.5} size={5} x="85%" y="65%" />
        <FloatingParticle delay={0.5} size={4} x="50%" y="20%" />

        <motion.div
          style={{ x, y }}
          className="z-10 flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            whileHover={{ scale: 1.05, borderColor: "#10b981" }}
            className="font-jetbrains-mono mb-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-neutral-500 transition-colors dark:border-neutral-700 dark:text-neutral-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for work
          </motion.span>

          <h1 className="font-mea-culpa text-6xl tracking-wide text-neutral-900 dark:text-white sm:text-7xl md:text-8xl lg:text-9xl leading-20">
            {name.split("").map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} index={i} />
            ))}
          </h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="font-jetbrains-mono mt-2 h-5 text-sm text-neutral-500 dark:text-neutral-500"
          >
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-0.5 inline-block h-4 w-0.5 bg-neutral-500"
            />
          </motion.p>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="font-jetbrains-mono mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg"
          >
            Crafting robust digital experiences through clean code and
            thoughtful design. Specialized in building scalable web applications
            and elegant APIs.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-2 font-jetbrains-mono text-xs text-neutral-500 dark:text-neutral-500"
          >
            {skills.map((skill, i) => (
              <SkillTag key={skill} skill={skill} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <HoverBorderGradient>
                <Link href="https://www.linkedin.com/in/kumar-mradul-katiyar/">
                  Let&apos;s Connect
                </Link>
              </HoverBorderGradient>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <HoverBorderGradient className="border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
                <Link href="#about">View Work</Link>
              </HoverBorderGradient>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
        >
          <span
            className="font-jetbrains-mono cursor-pointer text-[10px] uppercase tracking-widest text-neutral-100 animate-bounce bg-blue-500 size-6 p-1 rounded-full duration-500 ease-in-out md:size-8 shadow-2xs"
          >
            <IconArrowDown className="inline-block mb-1 size-full" />
          </span>
          <motion.div
            animate={{
              y: [0, 8, 0],
              scaleY: [1, 1.2, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-linear-to-b from-neutral-400 to-transparent"
          />
        </motion.div>
      </section>
    </SectionContainer>
  );
};

// type Square = { id: number; src: string };

// const shuffle = <T,>(array: T[]): T[] => {
//   const arr = array.slice();
//   let currentIndex = arr.length;
//   let randomIndex: number;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [arr[currentIndex], arr[randomIndex]] = [
//       arr[randomIndex],
//       arr[currentIndex],
//     ];
//   }

//   return arr;
// };

// const squareData: Square[] = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1765731410178-8537793c2c38?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 2,
//     src: "https://plus.unsplash.com/premium_photo-1737119503128-8120c87383a5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 3,
//     src: "https://plus.unsplash.com/premium_photo-1766012368204-bf6604d32d2b?q=80&w=737&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1765651998332-a9ee2099dd3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1765993983047-4c22b0451c74?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 6,
//     src: "https://images.unsplash.com/photo-1765915968433-86d4d13ae1a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 7,
//     src: "https://images.unsplash.com/photo-1766033238724-959287ed5771?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 8,
//     src: "https://images.unsplash.com/photo-1765840138769-a4c229d7f190?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: 9,
//     src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
//   },
//   {
//     id: 10,
//     src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
//   },
//   {
//     id: 11,
//     src: "https://images.unsplash.com/photo-1765707886601-19be939f1c1f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
//   },
//   {
//     id: 12,
//     src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
//   },
//   {
//     id: 13,
//     src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//   },
//   {
//     id: 14,
//     src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
//   },
//   {
//     id: 15,
//     src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
//   },
//   {
//     id: 16,
//     src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
//   },
// ];

// const generateSquares = (data: Square[]): React.ReactElement[] => {
//   return data.map((sq) => (
//     <motion.div
//       key={sq.id}
//       layout
//       transition={{ duration: 1.5, type: "spring" }}
//       className="fillter h-full w-full rounded-md grayscale hover:grayscale-0"
//       style={{
//         backgroundImage: `url(${sq.src})`,
//         backgroundSize: "cover",
//       }}
//     ></motion.div>
//   ));
// };

// const ShuffleGrid: React.FC = () => {
//   const timeoutRef = useRef<number | null>(null);
//   const [squares, setSquares] = useState(generateSquares(squareData));

//   const shuffleSquares = useCallback(() => {
//     setSquares(generateSquares(shuffle(squareData)));

//     timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
//   }, []);

//   useEffect(() => {
//     shuffleSquares();

//     return () => {
//       if (timeoutRef.current !== null) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [shuffleSquares]);

//   return (
//     <div className="z-10 grid h-[450px] grid-cols-4 grid-rows-4 gap-1">
//       {squares.map((sq) => sq)}
//     </div>
//   );
// };

export default HeroSection;
