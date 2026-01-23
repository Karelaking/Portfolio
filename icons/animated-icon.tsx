"use client"
import { motion } from "motion/react"
import React from "react"
import { cn } from "@/lib/utils"

export type AnimatedIconProps = {
  title?: string
  size?: number | string
  strokeWidth?: number
  stroke?: string
  fill?: string
  className?: string
  viewBox?: string
  hover?: boolean
  motionProps?: React.ComponentProps<typeof motion.svg>
  /** play entrance animation when icon enters the viewport */
  playOnInView?: boolean
  /** options passed to the `viewport` prop of motion for in-view triggering */
  viewport?: React.ComponentProps<typeof motion.svg>["viewport"]
  /** duration in seconds for the entrance animation */
  entranceDuration?: number
  /** stagger children when playing entrance animation */
  staggerChildren?: number
  children: React.ReactNode
}

export function AnimatedIcon({
  title,
  size = 16,
  strokeWidth = 1.5,
  stroke = "currentColor",
  fill = "none",
  className,
  viewBox = "0 0 24 24",
  hover = true,
  motionProps,
  playOnInView = false,
  viewport,
  entranceDuration = 0.8,
  staggerChildren = 0.06,
  children,
}: AnimatedIconProps) {
  const baseTransition = { type: "spring" as const, stiffness: 400, damping: 28 }

  const entranceVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren, duration: entranceDuration },
    },
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block", className)}
      initial={playOnInView ? "hidden" : undefined}
      whileInView={playOnInView ? "visible" : undefined}
      variants={playOnInView ? entranceVariants : undefined}
      viewport={viewport ?? { once: false, amount: 0.5 }}
      whileHover={hover ? { scale: 1.06 } : undefined}
      whileTap={hover ? { scale: 0.95 } : undefined}
      transition={baseTransition}
      {...(motionProps as React.ComponentProps<typeof motion.svg>)}
      role={title ? "img" : "presentation"}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </motion.svg>
  )
}

export default AnimatedIcon

