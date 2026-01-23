"use client";

import React, { useRef } from "react";
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
  IconPhone,
  IconMapPin,
  IconProps,
} from "@tabler/icons-react";
import { useAnimate } from "framer-motion";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { SectionContainer } from "./ui/section-container";
import PageHeading from "./ui/page-heading";

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <SectionContainer
      id="contact"
      className="flex min-h-screen w-full items-center justify-center py-24 md:py-32"
      width="full"
    >
      <div ref={sectionRef} className="flex w-full max-w-7xl flex-col items-center gap-12 px-4 lg:px-16">
        {/* Section Header */}
        <div className="relative text-center">
          {/* Background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"
          />

          <PageHeading>Contact</PageHeading>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 font-jetbrains-mono text-sm text-neutral-500 dark:text-neutral-400 md:text-base"
          >
            Let&apos;s connect and create something amazing
          </motion.p>
        </div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid w-full gap-4 md:grid-cols-3"
        >
          <ContactInfoCard
            icon={<IconMailOpened className="h-6 w-6" />}
            label="Email"
            value="mradul@example.com"
            href="mailto:mradul@example.com"
            index={0}
          />
          <ContactInfoCard
            icon={<IconPhone className="h-6 w-6" />}
            label="Phone"
            value="+91 98765 43210"
            href="tel:+919876543210"
            index={1}
          />
          <ContactInfoCard
            icon={<IconMapPin className="h-6 w-6" />}
            label="Location"
            value="Bangalore, India"
            index={2}
          />
        </motion.div>

        {/* Social Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full"
        >
          <ClipPathLinks />
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-neutral-300 dark:to-neutral-700" />
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-neutral-400">
            Available for Work
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-neutral-300 dark:to-neutral-700" />
        </motion.div>
      </div>
    </SectionContainer>
  );
};

// Contact Info Card Component
const ContactInfoCard = ({
  icon,
  label,
  value,
  href,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  index: number;
}) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm transition-colors hover:border-green-500/50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-green-500/50"
    >
      {/* Floating accent */}
      <motion.div
        className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500/30"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      />

      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-green-500/10 group-hover:text-green-500 dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-green-500/10 dark:group-hover:text-green-400">
        {icon}
      </div>

      {/* Label */}
      <span className="font-jetbrains-mono text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {label}
      </span>

      {/* Value */}
      <span className="font-jetbrains-mono text-sm text-neutral-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400 md:text-base">
        {value}
      </span>

      {/* Hover glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at 50% 50%, rgba(16, 185, 129, 0.08), transparent 60%)",
        }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

const ClipPathLinks = () => {
  return (
    <div className="w-full rounded-2xl border border-neutral-200 bg-white/50 p-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="grid grid-cols-2 gap-2 pb-2">
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandGoogle} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandGithub} href="#" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandThreads} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandTwitter} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconMailOpened} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandFacebook} href="#" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandInstagram} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
          <LinkBox Icon={IconBrandSpotify} href="#" />
        </div>
        <div className="rounded-xl border border-neutral-200 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700">
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
      className="relative grid h-28 w-full place-content-center overflow-hidden rounded-xl sm:h-28 md:h-36"
    >
      <Icon className="text-xl text-neutral-600 transition-colors dark:text-neutral-400 sm:text-3xl lg:text-4xl" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center rounded-xl bg-neutral-900 text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </Link>
  );
};
