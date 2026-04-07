"use client";

import type { CSSProperties, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroData } from "@/types/hero/hero-data.interface";

export type HeroImageProps = Pick<HeroData, "imageAlt" | "imageSrc">;

const clampValue = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const HeroImage = ({
  imageAlt,
  imageSrc,
}: HeroImageProps): ReactElement => {
  const [viewportWidth, setViewportWidth] = useState<number>(1024);
  const isMobile = viewportWidth < 640;

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

  // Tighter footprint on mobile while preserving desktop composition
  const containerWidth = clampValue(viewportWidth * 0.9, 220, 400);

  const containerStyle = useMemo((): CSSProperties => {
    if (isMobile) {
      return { width: "100%" };
    }

    return { width: `${containerWidth}px` };
  }, [containerWidth, isMobile]);

  return (
    <motion.div
      className="relative mx-auto flex w-full h-full max-w-full items-center justify-center overflow-x-hidden sm:max-w-96 md:max-w-104"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <div
        className="border-border bg-card ring-border/60 relative box-border aspect-21/26 overflow-hidden rounded-3xl border p-3 ring-1 sm:p-6 h-full w-full"
        style={containerStyle}
      >
        <Image
          alt={imageAlt}
          src={imageSrc}
          fill
          sizes="(max-width: 639px) 100vw, (min-width: 768px) 26rem, 24rem"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
    </motion.div>
  );
};
