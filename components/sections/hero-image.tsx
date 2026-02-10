"use client";

import type { ReactElement } from "react";
import { motion } from "framer-motion";
import type { HeroData } from "@/types/hero-data.interface";
import { PixelatedCanvas } from "../ui/pixelated-canvas";

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
      {/* <Image
        alt={imageAlt}
        src={imageSrc}
        width={420}
        height={520}
        className="relative h-[520px] w-[420px] rounded-[2.5rem] border border-border bg-card object-cover p-6"
        loading="eager"
      /> */}
      <div className="relative h-[520px] w-[420px] rounded-[2.5rem] border border-border bg-card p-6">
        <PixelatedCanvas
          src={imageSrc}
          width={372}
          height={472}
          cellSize={2}
          dotScale={0.8}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0}
          interactive
          distortionStrength={0.1}
          distortionRadius={200}
          distortionMode="repel"
          followSpeed={0.2}
          jitterStrength={4}
          jitterSpeed={1}
          sampleAverage
          alt={imageAlt}
          className="h-full w-full rounded-[2rem] object-cover brightness-140"
        />
      </div>
    </motion.div>
  );
};
