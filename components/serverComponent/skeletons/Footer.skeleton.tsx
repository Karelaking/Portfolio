import { cn } from "@/lib/utils";
import { FooterProps } from "@/types";
import type { ReactElement } from "react";

export const FooterSkeleton = ({ className }: FooterProps): ReactElement => {
  return (
    <footer className={cn("border-border/60 border-t", className)}>
      <div className="mx-auto w-full max-w-5xl py-12 sm:border-x sm:border-dashed">
        <div className="grid gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 md:text-left lg:px-8">
          {/* Left column content skeleton */}
          <div className="space-y-4">
            {/* Label skeleton */}
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            
            {/* Title skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-full animate-pulse rounded bg-muted sm:w-3/4" />
              <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
            </div>
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </div>
          </div>

          {/* Right column links skeleton */}
          <div className="mx-auto flex w-full justify-center gap-20 sm:justify-end md:flex-row">
            {/* Sections column */}
            <div className="space-y-3 sm:text-end">
              {/* Label skeleton */}
              <div className="h-3 w-20 animate-pulse rounded bg-muted sm:ml-auto" />
              
              {/* Links skeleton */}
              <div className="grid gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-24 animate-pulse rounded bg-muted sm:ml-auto"
                  />
                ))}
              </div>
            </div>

            {/* Connect column */}
            <div className="space-y-3 sm:text-end">
              {/* Label skeleton */}
              <div className="h-3 w-16 animate-pulse rounded bg-muted sm:ml-auto" />
              
              {/* Links skeleton */}
              <div className="grid gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-24 animate-pulse rounded bg-muted sm:ml-auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section skeleton */}
        <div className="border-border/60 text-muted-foreground sm:text-normal mt-10 flex flex-col items-center justify-between gap-3 border-t px-4 pt-6 text-center text-xs sm:flex-row sm:px-6 sm:text-left lg:px-8">
          {/* Copyright text skeleton */}
          <div className="h-4 w-48 animate-pulse rounded bg-muted sm:w-32" />
          
          {/* Footer tagline skeleton */}
          <div className="h-4 w-56 animate-pulse rounded bg-muted sm:w-48" />
        </div>
      </div>
    </footer>
  );
};
