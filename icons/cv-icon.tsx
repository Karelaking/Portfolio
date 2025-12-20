"use client";

import { BaseIcon } from "./base-icon";
import { MotionPath } from "./motion-path";
import { SVGIconProps } from "@/types/svg-icon.interface";

export function CvIcon(props: SVGIconProps) {
  return (
    <BaseIcon iconName="file-cv" strokeColor="stroke-slate-900" {...props}>
      <MotionPath d="M0 0h24v24H0z" stroke="none" fill="none" />
      <MotionPath d="M14 3v4a1 1 0 0 0 1 1h4" />
      <MotionPath d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <MotionPath d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
      <MotionPath d="M13 11l1.5 6l1.5 -6" />
    </BaseIcon>
  );
}
