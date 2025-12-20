"use client";

import { motion, MotionProps } from "motion/react";
import { useIconAnimation } from "./icon-animation-controller";

interface MotionPathProps extends MotionProps {
  d: string;
  stroke?: string;
  fill?: string;
  iconId?: string;
  animationDuration?: number;
}

export function MotionPath({
  d,
  stroke,
  fill,
  iconId,
  animationDuration = 1.25,
  ...props
}: MotionPathProps): React.JSX.Element {
  const { navbarInView, hoveredIcon } = useIconAnimation();
  
  const shouldAnimate = navbarInView || (hoveredIcon === iconId);
  
  return (
    <motion.path
      layout
      initial={{ pathLength: 0 }}
      animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut" as const,
      }}
      d={d}
      stroke={stroke}
      fill={fill}
      {...props}
    />
  );
}