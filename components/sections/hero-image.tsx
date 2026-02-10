"use client";

import type { CSSProperties, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { HeroData } from "@/types/hero-data.interface";
import { PixelatedCanvas } from "../ui/pixelated-canvas";

export type HeroImageProps = Pick<HeroData, "imageAlt" | "imageSrc">;

const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const HeroImage = ({
  imageAlt,
  imageSrc,
}: HeroImageProps): ReactElement => {
  const [viewportWidth, setViewportWidth] = useState<number>(1024);

  useEffect((): (() => void) => {
    const updateViewportWidth = (): void => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth, { passive: true });

    return (): void => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  const padding = viewportWidth < 640 ? 16 : 24;
  const containerWidth = clampValue(viewportWidth * 0.9, 280, 420);
  const canvasWidth = Math.max(containerWidth - padding * 2, 200);
  const canvasHeight = Math.round((canvasWidth * 26) / 21);

  const containerStyle = useMemo((): CSSProperties => {
    return { width: `${containerWidth}px` };
  }, [containerWidth]);

  return (
    <motion.div
      className="relative flex w-full items-center justify-center overflow-x-hidden"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <motion.div
        className="border-border absolute top-6 left-2 h-24 w-24 rounded-full border sm:-left-6"
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
        className="border-border absolute right-2 bottom-6 h-16 w-16 rounded-full border sm:right-4"
        initial={{ y: 0 }}
        whileInView={{ y: [0, 5, 0] }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <div className="bg-border/60 pointer-events-none absolute top-4 left-1/2 h-px w-32 -translate-x-1/2" />
      {/* <Image
        alt={imageAlt}
        src={imageSrc}
        width={420}
        height={520}
        className="relative h-[520px] w-[420px] rounded-[2.5rem] border border-border bg-card object-cover p-6"
        loading="eager"
      /> */}
      <div
        className="border-border bg-card ring-border/60 relative box-border aspect-21/26 overflow-hidden rounded-[2.5rem] border p-4 ring-1 sm:p-6"
        style={containerStyle}
      >
        <PixelatedCanvas
          src={imageSrc}
          width={canvasWidth}
          height={canvasHeight}
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
