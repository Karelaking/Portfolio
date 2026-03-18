"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface GalleryImageProps {
  src: string;
  alt: string;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
}

export const GalleryImage = ({
  src,
  alt,
  sizes,
  width = 520,
  height = 420,
  className,
  priority = false,
  loading = "lazy",
}: GalleryImageProps): ReactElement => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        className="block w-full p-0 text-left"
        onClick={(): void => setIsOpen(true)}
        aria-label={`Open ${alt}`}
      >
        <motion.div
          className="border-border/70 relative overflow-hidden rounded-2xl border"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {!loaded ? (
            <div className="bg-muted/60 absolute inset-0 animate-pulse" />
          ) : null}
          <Image
            alt={alt}
            src={src}
            width={width}
            height={height}
            className={cn(
              "h-48 w-full object-cover",
              className,
              !loaded ? "opacity-0" : null,
            )}
            sizes={sizes}
            priority={priority}
            loading={loading}
            quality={priority ? 85 : 75}
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
            transition={{ duration: 0.15 }}
          >
            <motion.button
              type="button"
              className="bg-background/80 absolute inset-0 backdrop-blur"
              onClick={(): void => setIsOpen(false)}
              aria-label="Close image"
            />
            <div className="relative z-10 w-fit md:w-auto">
              <motion.div
                className="border-border/70 bg-card overflow-hidden rounded-3xl border p-3"
                style={{ maxWidth: `${width}px` }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
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
                  quality={90}
                />
              </motion.div>
              <div className="text-muted-foreground mt-4 flex items-center justify-between text-xs tracking-[0.3em] uppercase">
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
