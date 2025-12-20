import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import React from "react";

interface Props extends MotionProps {
  children: React.ReactNode;
  className?: string
}

export function AnimateIconDiv({ children, ...props }: Props): React.JSX.Element {
  return <motion.div layout
    className={cn("size-4 icon icon-tabler icon-tabler-home stroke-2", props.className)}
  >
    {children}
  </motion.div>;
}