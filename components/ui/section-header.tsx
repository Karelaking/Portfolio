
import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-8 md:mb-12",
        align === "center" ? "text-center items-center" : "text-left",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-[600px] text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
