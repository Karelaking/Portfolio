"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import Image from "next/image";
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

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70">
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
        onLoadingComplete={(): void => {
          setLoaded(true);
        }}
      />
    </div>
  );
};
