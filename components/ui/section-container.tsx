import React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  width?: "default" | "full" | "small";
}

export function SectionContainer({
  children,
  className,
  width = "default",
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "flex min-h-dvh w-full flex-col items-center justify-center bg-white dark:bg-neutral-950",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "container mx-auto h-full px-6 md:px-8",
          width === "default" && "max-w-6xl",
          width === "small" && "max-w-3xl",
          width === "full" && "max-w-full",
        )}
      >
        {children}
      </div>
    </section>
  );
}
