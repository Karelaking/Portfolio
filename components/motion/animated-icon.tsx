"use client";

import type { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedIcon = ({
  children,
  className,
}: AnimatedIconProps): ReactElement => {
  return (
    <motion.span
      className={cn("inline-flex", className)}
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08, rotate: 2 }}
    >
      {children}
    </motion.span>
  );
};
