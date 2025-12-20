"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import React from "react";
import { AnimateIconDiv } from "./animate-icon-div";
import { SVGIconProps } from "@/types/svg-icon.interface";
import { useIconAnimation } from "./icon-animation-controller";

interface BaseIconProps extends SVGIconProps, MotionProps {
  children: React.ReactNode;
  iconName?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export function BaseIcon({
  children,
  className,
  iconName,
  strokeColor = "stroke-neutral-900",
  strokeWidth = 2,
  ...props
}: BaseIconProps): React.JSX.Element {
  const { setHoveredIcon } = useIconAnimation();
  const iconId = iconName || 'icon';
  
  return (
    <AnimateIconDiv>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        layout
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        className={cn(
          "size-4 icon icon-tabler stroke-2 cursor-pointer",
          iconName && `icon-tabler-${iconName}`,
          strokeColor,
          className
        )}
        onHoverStart={() => setHoveredIcon(iconId)}
        onHoverEnd={() => setHoveredIcon(null)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { iconId } as React.SVGAttributes<SVGElement>);
          }
          return child;
        })}
      </motion.svg>
    </AnimateIconDiv>
  );
}