"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import type { ExperienceItem } from "@/types";

export interface ExperienceCardProps {
  item: ExperienceItem;
  index?: number;
}

export const ExperienceCard = ({
  item,
  index = 0,
}: ExperienceCardProps): ReactElement => {
  return (
    <motion.div
      className="border-border/40 bg-card/95 dark:bg-card/80 hover:border-border/60 dark:hover:bg-card/95 group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index ?? 0) * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Animated gradient background on hover - subtle for both modes */}
      <motion.div
        className="from-primary/5 dark:from-primary/8 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated glow effect on hover */}
      <motion.div
        className="from-primary/0 via-primary/5 to-primary/0 dark:via-primary/10 absolute -inset-px rounded-2xl bg-linear-to-r opacity-0 blur"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2.5">
          {/* Role - Enhanced Typography */}
          <motion.div
            className="flex items-start justify-between gap-3"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-1">
              <h2 className="text-foreground text-lg leading-snug font-bold">
                {item.role}
              </h2>
              <p className="text-muted-foreground font-500 tracking-0.5 mt-1 text-sm">
                {item.company}
              </p>
            </div>
            <span className="text-muted-foreground/60 shrink-0 text-xs font-medium tracking-widest uppercase">
              {item.period}
            </span>
          </motion.div>
        </div>

        {/* Summary - Improved readability */}
        <p className="text-foreground/80 dark:text-foreground/75 mt-3 line-clamp-2 text-sm leading-relaxed">
          {item.summary}
        </p>

        {/* Divider */}
        <div className="bg-border/20 dark:bg-border/30 my-3 h-px w-8" />

        {/* Highlights - Enhanced Typography */}
        <motion.ul className="space-y-2">
          {item.highlights.slice(0, 2).map((highlight, i) => (
            <motion.li
              key={`${item.id}-${highlight}`}
              className="text-foreground/70 dark:text-foreground/65 flex items-start gap-2.5 text-sm leading-relaxed"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: (index ?? 0) * 0.1 + i * 0.05,
                duration: 0.3,
              }}
            >
              <motion.span
                className="text-primary/80 dark:text-primary/90 mt-1.5 block shrink-0 font-bold"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                ▪
              </motion.span>
              <span className="font-500 line-clamp-1">{highlight}</span>
            </motion.li>
          ))}
          {item.highlights.length > 2 && (
            <motion.li
              className="text-muted-foreground/70 dark:text-muted-foreground/60 font-600 tracking-0.5 pt-1 text-xs uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: (index ?? 0) * 0.1 + 0.15 }}
            >
              +{item.highlights.length - 2} more skills
            </motion.li>
          )}
        </motion.ul>
      </div>

      {/* Animated border highlight on hover */}
      <motion.div
        className="from-primary/0 via-primary to-primary/0 dark:via-primary/90 absolute inset-x-0 bottom-0 h-1 bg-linear-to-r"
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Corner accent - top right */}
      <motion.div
        className="from-primary/5 dark:from-primary/10 absolute -top-1 -right-1 h-12 w-12 rounded-full bg-linear-to-bl to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
