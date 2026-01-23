import AnimatedIcon, { AnimatedIconProps } from "./animated-icon"
import AnimatedPath from "./animated-path"

export function BriefcaseIcon(props: Partial<AnimatedIconProps>) {
  return (
    <AnimatedIcon
      {...props}
      title={props.title ?? "Notifications"}
      size={props.size ?? 24}
      viewBox={props.viewBox ?? "0 0 24 24"}
      playOnInView={props.playOnInView ?? true}
      staggerChildren={props.staggerChildren ?? 0.06}
    >
      <AnimatedPath playOnInView d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
      <AnimatedPath playOnInView d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <AnimatedPath playOnInView d="M12 12l0 .01" />
      <AnimatedPath playOnInView d="M3 13a20 20 0 0 0 18 0" />
    </AnimatedIcon>
  )
}

