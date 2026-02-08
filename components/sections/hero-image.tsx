"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroData } from "@/types/hero-data.interface";

export type HeroImageProps = Pick<HeroData, "imageAlt" | "imageSrc">;

export const HeroImage = ({ imageAlt, imageSrc }: HeroImageProps): ReactElement => {
  return (
    <motion.div
      className="relative flex h-full items-center justify-center"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <motion.div
        className="absolute -left-6 top-6 h-24 w-24 rounded-full border border-border"
        initial={{ y: 0 }}
        whileInView={{ y: [0, -6, 0] }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-6 right-4 h-16 w-16 rounded-full border border-border"
        initial={{ y: 0 }}
        whileInView={{ y: [0, 5, 0] }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-4 h-px w-32 -translate-x-1/2 bg-border/60" />
      <Image
        alt={imageAlt}
        src={imageSrc}
        width={420}
        height={520}
        className="relative h-[520px] w-[420px] rounded-[2.5rem] border border-border bg-card object-cover p-6"
        loading="eager"
      />
    </motion.div>
  );
};
