'use client';

import { BaseIcon } from "./base-icon";
import { MotionPath } from "./motion-path";
import { SVGIconProps } from "@/types/svg-icon.interface";

export default function SingleUserIcon(props: SVGIconProps) {
  return (
    <BaseIcon iconName="user" strokeColor="stroke-neutral-900" {...props}>
      <MotionPath d="M0 0h24v24H0z" stroke="none" fill="none" />
      <MotionPath d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <MotionPath d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
    </BaseIcon>
  );
}
