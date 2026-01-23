"use client";

import { useMemo, useRef } from "react";
import { SectionContainer } from "./ui/section-container";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import {
  IconBrandReactNative,
  IconBrandTailwind,
  IconBrandRedux,
  IconBrandNodejs,
  IconBrandNpm,
  IconBrandNextjs,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandPython,
  IconBrandTypescript,
  IconBrandMongodb,
  IconApi,
  IconCoffee,
  IconBrandSupabase,
} from "@tabler/icons-react";
import PageHeading from "./ui/page-heading";

/* =========================
   SKILLS DATA
========================= */
const skills = [
  { id: "js", name: "JavaScript", icon: <IconBrandNodejs /> },
  { id: "ts", name: "TypeScript", icon: <IconBrandTypescript /> },
  { id: "react", name: "React", icon: <IconBrandReactNative /> },
  { id: "next", name: "Next.js", icon: <IconBrandNextjs /> },
  { id: "node", name: "Node.js", icon: <IconBrandNpm /> },
  { id: "express", name: "Express" },
  { id: "docker", name: "Docker", icon: <IconBrandDocker /> },
  { id: "git", name: "Git & GitHub", icon: <IconBrandGithub /> },
  { id: "tailwind", name: "Tailwind CSS", icon: <IconBrandTailwind /> },
  { id: "redux", name: "Redux", icon: <IconBrandRedux /> },
  { id: "fastapi", name: "FastAPI", icon: <IconApi /> },
  { id: "python", name: "Python", icon: <IconBrandPython /> },
  { id: "mongodb", name: "MongoDB", icon: <IconBrandMongodb /> },
  { id: "java", name: "Java", icon: <IconCoffee /> },
  { id: "supabase", name: "Supabase", icon: <IconBrandSupabase /> },
];

/* =========================
   TYPES
========================= */
type Skill = {
  id: string;
  name: string;
  icon?: React.ReactNode;
};

type Variant = "small" | "wide" | "tall" | "large";

type TSkillCard = Skill & {
  variant: Variant;
};

/* =========================
   WORD-COUNT AWARE LAYOUT
========================= */
function getVariantFromWordCount(name: string): Variant {
  const words = name.trim().split(/\s+/).length;
  const chars = name.length;

  if (words >= 3 || chars > 18) return "large";
  if (words >= 2 || chars > 16) return "tall";
  if (chars > 8) return "wide";
  return "small";
}

function generateSkillLayout(skills: Skill[]): TSkillCard[] {
  const shuffled = [...skills].sort(() => Math.random() - 0.5);

  const MAX_LARGE = Math.max(1, Math.floor(skills.length / 5));
  let largeCount = 0;

  return shuffled.map((skill, index) => {
    let variant = getVariantFromWordCount(skill.name);

    // Cap large cards to avoid grid fragmentation
    if (variant === "large") {
      if (largeCount >= MAX_LARGE) {
        variant = "tall";
      } else {
        largeCount++;
      }
    }

    // Early vertical anchoring
    if (index < 2 && variant === "small") {
      variant = "tall";
    }

    return {
      ...skill,
      variant,
    };
  });
}

/* =========================
   CARD COMPONENT
========================= */
const variantStyles: Record<Variant, string> = {
  small: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-2 row-span-2",
  large: "col-span-3 row-span-2",
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

function SkillCard({ name, variant, icon, index }: TSkillCard & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    rotateY.set(deltaX * 15);
    rotateX.set(-deltaY * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      custom={index * 0.05}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      className={`
        ${variantStyles[variant]}
        group relative
        flex flex-col items-center justify-center
        gap-2 md:gap-3
        rounded-2xl
        border border-neutral-200
        bg-white/50
        backdrop-blur-sm
        shadow-sm
        dark:border-neutral-800
        dark:bg-neutral-900/50
        px-3 py-3 md:px-4 md:py-4
        overflow-hidden
        cursor-pointer
        transition-colors duration-300
        hover:border-neutral-300
        dark:hover:border-neutral-700
      `}
    >
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at 50% 50%, rgba(16, 185, 129, 0.1), transparent 60%)",
        }}
      />

      {/* Floating accent dot */}
      <motion.div
        className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-green-500/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
      />

      {/* Icon */}
      {icon && (
        <motion.span
          className="shrink-0 text-neutral-600 dark:text-neutral-300 transition-colors duration-200 group-hover:text-green-500"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Text */}
      <span
        className="
          text-center
          font-jetbrains-mono
          text-xs md:text-sm
          font-medium
          leading-snug
          text-neutral-700
          dark:text-neutral-200
          line-clamp-2
          wrap-break-word
          transition-colors duration-200
          group-hover:text-neutral-900
          dark:group-hover:text-white
        "
        title={name}
      >
        {name}
      </span>
    </motion.div>
  );
}


/* =========================
   SECTION COMPONENT
========================= */
export function ExpertiseSection() {
  const layout = useMemo(() => generateSkillLayout(skills), []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <SectionContainer
      id="expertise"
      className="flex min-h-screen w-full items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div
        ref={sectionRef}
        className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 lg:px-16"
      >
        {/* Section Header */}
        <div className="relative text-center">
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"
          />

<PageHeading>Expertise</PageHeading>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 font-jetbrains-mono text-sm text-neutral-500 dark:text-neutral-400 md:text-base"
          >
            Technologies I work with daily
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid w-full grid-cols-4 md:grid-cols-6 lg:grid-cols-8 grid-flow-dense auto-rows-[80px] md:auto-rows-[100px] lg:auto-rows-[120px] gap-3 md:gap-4">
          {layout.map((skill, index) => (
            <SkillCard key={skill.id} {...skill} index={index} />
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-neutral-300 dark:to-neutral-700" />
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-neutral-400">
            Always Learning
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
        </motion.div>
      </div>
    </SectionContainer>
  );
}
