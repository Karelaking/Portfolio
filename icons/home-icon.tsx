"use client";

import { BaseIcon } from "./base-icon";
import { MotionPath } from "./motion-path";
import { SVGIconProps } from "@/types/svg-icon.interface";

export default function HomeIcon(props: SVGIconProps) {
  return (
    <BaseIcon iconName="home" strokeColor="stroke-neutral-900" {...props}>
      <MotionPath d="M0 0h24v24H0z" stroke="none" fill="none" />
      <MotionPath d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <MotionPath d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <MotionPath d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </BaseIcon>
  );
}
