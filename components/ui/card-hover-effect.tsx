"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";

export interface HoverEffectItem {
  title: string;
  description: string;
  link: string;
  image?: string | null;
  github?: string | null;
  tags?: string[];
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverEffectItem[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <ProjectCard
          key={item.link + idx}
          item={item}
          idx={idx}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </div>
  );
};

function ProjectCard({
  item,
  idx,
  hoveredIndex,
  setHoveredIndex,
}: {
  item: HoverEffectItem;
  idx: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const rotateX = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    rotateY.set(deltaX * 10);
    rotateX.set(-deltaY * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: idx * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={handleMouseLeave}
      className="relative group h-full"
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-green-500/10 dark:bg-green-500/5 block rounded-2xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>

      <Card className="h-full">
        {/* Project Image */}
        {item.image && (
          <div className="relative h-40 md:h-48 w-full overflow-hidden rounded-xl mb-4">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className="px-2 py-1 text-xs font-jetbrains-mono rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>

        {/* Links */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          {item.link && item.link !== "#" && (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-jetbrains-mono text-neutral-600 dark:text-neutral-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              <IconExternalLink size={16} />
              <span>Live Demo</span>
            </motion.a>
          )}
          {item.github && (
            <motion.a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-jetbrains-mono text-neutral-600 dark:text-neutral-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
            >
              <IconBrandGithub size={16} />
              <span>Code</span>
            </motion.a>
          )}
        </div>

        {/* Floating accent dot */}
        <motion.div
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500/50"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.2,
          }}
        />
      </Card>
    </motion.div>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 md:p-6 overflow-hidden",
        "bg-white/80 dark:bg-neutral-900/80",
        "backdrop-blur-sm",
        "border border-neutral-200 dark:border-neutral-800",
        "shadow-sm",
        "relative z-20",
        "transition-all duration-300",
        "group-hover:border-green-500/30 dark:group-hover:border-green-500/20",
        "group-hover:shadow-lg group-hover:shadow-green-500/5",
        className
      )}
    >
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at 50% 50%, rgba(16, 185, 129, 0.08), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "font-mea-culpa text-2xl md:text-3xl tracking-wide",
        "text-neutral-900 dark:text-white",
        "transition-colors duration-200",
        "group-hover:text-green-600 dark:group-hover:text-green-400",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 md:mt-3",
        "font-jetbrains-mono text-sm leading-relaxed",
        "text-neutral-600 dark:text-neutral-400",
        "line-clamp-3",
        className
      )}
    >
      {children}
    </p>
  );
};
