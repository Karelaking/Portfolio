import AnimatedIcon, { AnimatedIconProps } from "./animated-icon"
import AnimatedPath from "./animated-path"

export function UserIcon(props: Partial<AnimatedIconProps>) {
  return (
    <AnimatedIcon
      {...props}
      title={props.title ?? "Notifications"}
      size={props.size ?? 24}
      viewBox={props.viewBox ?? "0 0 24 24"}
      playOnInView={props.playOnInView ?? true}
      staggerChildren={props.staggerChildren ?? 0.06}
    >
      <AnimatedPath playOnInView d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <AnimatedPath playOnInView d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </AnimatedIcon>
  )
}