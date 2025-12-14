'use client';

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
  IconProps
} from "@tabler/icons-react";
import { useAnimate } from "framer-motion";
import Link from "next/link";

export const ContactSection = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center" id="contact">
      <h1 className="text-4xl font-bold mb-12 uppercase text-center">Find me on social media</h1>
      <div className="w-full max-w-6xl">
        <ClipPathLinks />
      </div>
    </div>
  );
};

const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-neutral-900 border border-neutral-900">
      <div className="grid grid-cols-2 divide-x divide-neutral-900">
        <LinkBox Icon={IconBrandGoogle} href="#" />
        <LinkBox Icon={IconBrandGithub} href="#" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-neutral-900">
        <LinkBox Icon={IconBrandThreads} href="#" />
        <LinkBox Icon={IconBrandTwitter} href="#" />
        <LinkBox Icon={IconMailOpened} href="#" />
        <LinkBox Icon={IconBrandFacebook} href="#" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-neutral-900">
        <LinkBox Icon={IconBrandInstagram} href="#" />
        <LinkBox Icon={IconBrandSpotify} href="#" />
        <LinkBox Icon={IconBrandLinkedin} href="#" />
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

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    }, {
      duration: 0.3,
      ease: "easeOut"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    }, {
      duration: 0.3,
      ease: "easeOut"
    });
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

