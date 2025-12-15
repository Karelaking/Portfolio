
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
        "w-full py-12 md:py-16 lg:py-24 bg-gray-50/50 dark:bg-gray-950/50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "container px-4 md:px-6 mx-auto",
          width === "default" && "max-w-6xl",
          width === "small" && "max-w-3xl",
          width === "full" && "max-w-full"
        )}
      >
        {children}
      </div>
    </section>
  );
}
