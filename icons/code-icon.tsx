import AnimatedIcon, { AnimatedIconProps } from "./animated-icon"
import AnimatedPath from "./animated-path"

export function CodeIcon(props: Partial<AnimatedIconProps>) {
  return (
    <AnimatedIcon
      {...props}
      title={props.title ?? "Notifications"}
      size={props.size ?? 24}
      viewBox={props.viewBox ?? "0 0 24 24"}
      playOnInView={props.playOnInView ?? true}
      staggerChildren={props.staggerChildren ?? 0.06}
    >
      <AnimatedPath playOnInView d="M7 8l-4 4l4 4" />
      <AnimatedPath playOnInView d="M17 8l4 4l-4 4" />
      <AnimatedPath playOnInView d="M14 4l-4 16" />
    </AnimatedIcon>
  )
}
