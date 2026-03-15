"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type { SocialLink as SocialLinkType } from "@/types";
import { getSocialIcon } from "@/data/SocialIcons";
import { AnimatedIcon } from "../motion";

export interface SocialLinkProps {
  link: SocialLinkType;
  index?: number;
}

export const SocialLink = ({
  link,
  index = 0,
}: SocialLinkProps): ReactElement => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link
        className="border-border/70 bg-card group hover:border-border flex items-center justify-between rounded-2xl border px-4 py-4 text-sm transition-colors"
        href={link.href}
        rel="noreferrer"
        target="_blank"
      >
        <div className="flex items-center gap-3">
          <span className="border-border flex h-9 w-9 items-center justify-center rounded-full border">
            <AnimatedIcon>{getSocialIcon(link.platform)}</AnimatedIcon>
          </span>
          <span className="font-medium">{link.label}</span>
        </div>
        <IconArrowUpRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </motion.div>
  );
};
