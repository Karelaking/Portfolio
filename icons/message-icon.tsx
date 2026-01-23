import AnimatedIcon, { AnimatedIconProps } from "./animated-icon"
import AnimatedPath from "./animated-path"

export function MessageIcon(props: Partial<AnimatedIconProps>) {
  return (
    <AnimatedIcon
      {...props}
      title={props.title ?? "Message"}
      size={props.size ?? 24}
      viewBox={props.viewBox ?? "0 0 24 24"}
      playOnInView={props.playOnInView ?? true}
      staggerChildren={props.staggerChildren ?? 0.06}
    >
      <AnimatedPath d="M8 9h8" />
      <AnimatedPath d="M8 13h6" />
      <AnimatedPath d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" />
    </AnimatedIcon>
  )
}