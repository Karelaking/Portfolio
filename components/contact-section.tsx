"use client";

import React from "react";
import {
  IconBrandFacebook,
  IconMailOpened,
  IconBrandLinkedin,
  IconBrandSpotify,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandThreads,
  IconProps,
} from "@tabler/icons-react";
import { useAnimate } from "framer-motion";
import Link from "next/link";
import { SectionContainer } from "./ui/section-container";

export const ContactSection = () => {
  return (
    <SectionContainer id="contact" className="h-screen w-full">
      <h1 className="font-mea-culpa text-center text-4xl leading-13 tracking-wide text-neutral-800 first-letter:float-start first-letter:text-5xl first-letter:leading-10 first-letter:font-bold md:text-8xl md:leading-18 md:first-letter:text-9xl dark:text-neutral-200">
        Find me on social media
      </h1>
      <div className="mt-12 md:mt-25 flex w-full items-center justify-center">
        <ClipPathLinks />
      </div>
    </SectionContainer>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="w-full rounded-xl border border-neutral-900 px-2 py-1">
      <div className="grid grid-cols-2 gap-x-1 py-1">
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandGoogle} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandGithub} href="#" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-1">
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandThreads} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandTwitter} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconMailOpened} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandFacebook} href="#" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-x-1 py-1">
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandInstagram} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandSpotify} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-900">
          <LinkBox Icon={IconBrandLinkedin} href="#" />
        </div>
      </div>
    </div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

interface EntranceKeyframesType {
  [key: string]: string[];
}

const ENTRANCE_KEYFRAMES: EntranceKeyframesType = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

interface ExitKeyframesType {
  [key: string]: string[];
}

const EXIT_KEYFRAMES: ExitKeyframesType = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

interface LinkBoxProps {
  Icon: React.ComponentType<IconProps>;
  href: string;
}

const LinkBox = ({ Icon, href }: LinkBoxProps) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent) => {
    const box = (e.target as HTMLElement).getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e);

    animate(
      scope.current,
      {
        clipPath: ENTRANCE_KEYFRAMES[side],
      },
      {
        duration: 0.3,
        ease: "easeOut",
      },
    );
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e);

    animate(
      scope.current,
      {
        clipPath: EXIT_KEYFRAMES[side],
      },
      {
        duration: 0.3,
        ease: "easeOut",
      },
    );
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-35 w-full place-content-center sm:h-28 md:h-36"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </Link>
  );
};
