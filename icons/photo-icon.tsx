import AnimatedIcon, { AnimatedIconProps } from "./animated-icon"
import AnimatedPath from "./animated-path"

export function PhotoIcon(props: Partial<AnimatedIconProps>) {
  return (
    <AnimatedIcon
      {...props}
      title={props.title ?? "Google Photos"}
      size={props.size ?? 24}
      viewBox={props.viewBox ?? "0 0 24 24"}
      playOnInView={props.playOnInView ?? true}
      staggerChildren={props.staggerChildren ?? 0.06}
    >
      <AnimatedPath
        playOnInView
        d="M7.5 7c2.485 0 4.5 1.974 4.5 4.409v.591h-8.397a.61 .61 0 0 1 -.426 -.173a.585 .585 0 0 1 -.177 -.418c0 -2.435 2.015 -4.409 4.5 -4.409"
      />
      <AnimatedPath
        playOnInView
        d="M16.5 17c-2.485 0 -4.5 -1.974 -4.5 -4.409v-.591h8.397c.333 0 .603 .265 .603 .591c0 2.435 -2.015 4.409 -4.5 4.409"
      />
      <AnimatedPath
        playOnInView
        d="M7 16.5c0 -2.485 1.972 -4.5 4.405 -4.5h.595v8.392a.61 .61 0 0 1 -.173 .431a.584 .584 0 0 1 -.422 .177c-2.433 0 -4.405 -2.015 -4.405 -4.5"
      />
      <AnimatedPath
        playOnInView
        d="M17 7.5c0 2.485 -1.972 4.5 -4.405 4.5h-.595v-8.397a.61 .61 0 0 1 .175 -.428a.584 .584 0 0 1 .42 -.175c2.433 0 4.405 2.015 4.405 4.5"
      />
    </AnimatedIcon>
  )
}
