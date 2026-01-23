"use client"
import React from "react"
import { motion } from "motion/react"
import type { TargetAndTransition } from "motion"
import { cn } from "@/lib/utils"

export type AnimatedPathProps = Omit<
  React.ComponentPropsWithoutRef<typeof motion.path>,
  "transition"
> & {
  /** animate a drawing effect on hover using stroke dashoffset */
  drawOnHover?: boolean
  /** subtle scale on hover */
  hoverScale?: number
  transition?: React.ComponentPropsWithoutRef<typeof motion.path>["transition"]
  /** play the draw animation when the path enters the viewport */
  playOnInView?: boolean
  viewport?: React.ComponentPropsWithoutRef<typeof motion.path>["viewport"]
  /** duration in seconds for the entrance animation */
  entranceDuration?: number
}

export function AnimatedPath({
  drawOnHover = true,
  hoverScale = 1.03,
  transition,
  className,
  playOnInView = false,
  viewport,
  entranceDuration = 0.8,
  ...props
}: AnimatedPathProps) {
  const baseTransition =
    (transition ?? ({ type: "spring" as const, stiffness: 360, damping: 30 } as React.ComponentPropsWithoutRef<typeof motion.path>["transition"])) as React.ComponentPropsWithoutRef<typeof motion.path>["transition"]

  const variants = {
    hidden: { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0.6 },
    visible: { strokeDasharray: 1, strokeDashoffset: 0, opacity: 1, transition: { duration: entranceDuration } },
  }

  const whileHover = drawOnHover ? ({ strokeDashoffset: 0, scale: hoverScale } as TargetAndTransition) : ({ scale: hoverScale } as TargetAndTransition)

  return (
    <motion.path
      {...(props as React.ComponentPropsWithoutRef<typeof motion.path>)}
      className={cn("origin-center", className)}
      variants={variants}
      initial={playOnInView || drawOnHover ? "hidden" : undefined}
      whileInView={playOnInView ? "visible" : undefined}
      whileHover={whileHover}
      pointerEvents={props.pointerEvents ?? "stroke"}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      viewport={viewport ?? { once: false, amount: 0.6 }}
      transition={baseTransition}
      pathLength={1}
    />
  )
}

export default AnimatedPath
