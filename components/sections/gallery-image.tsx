"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryImageProps {
  src: string;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const GalleryImage = ({
  src,
  alt,
  sizes,
  width = 520,
  height = 420,
  className,
}: GalleryImageProps): ReactElement => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const layoutId = `gallery-image-${src}`;

  useEffect((): (() => void) => {
    if (!isOpen) {
      return () => undefined;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return (): void => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="w-full text-left"
        onClick={(): void => setIsOpen(true)}
        aria-label={`Open ${alt}`}
      >
        <motion.div
          layoutId={layoutId}
          className="relative overflow-hidden rounded-2xl border border-border/70"
        >
          {!loaded ? (
            <div className="absolute inset-0 animate-pulse bg-muted/60" />
          ) : null}
          <Image
            alt={alt}
            src={src}
            width={width}
            height={height}
            className={cn("h-48 w-full object-cover", className, !loaded ? "opacity-0" : null)}
            sizes={sizes}
            onLoad={(): void => {
              setLoaded(true);
            }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur"
              onClick={(): void => setIsOpen(false)}
              aria-label="Close image"
            />
            <div className="relative z-10 w-fit md:w-auto">
              <motion.div
                layoutId={layoutId}
                className="overflow-hidden rounded-3xl border border-border/70 bg-card p-3"
                style={{ maxWidth: `${width}px` }}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Image
                  alt={alt}
                  src={src}
                  width={width}
                  height={height}
                  className="h-auto max-h-[80vh] w-fit rounded-2xl object-contain md:max-h-none"
                  style={{ maxHeight: `${height}px` }}
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span>{alt}</span>
                <span>Esc to close</span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
