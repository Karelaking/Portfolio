import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

export interface SectionOrnamentProps {
  className?: string;
}

export const SectionOrnament = ({
  className,
}: SectionOrnamentProps): ReactElement => {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute right-6 top-6 hidden h-16 w-16 sm:block",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-full border border-border/50" />
      <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 bg-border/70" />
      <span className="absolute left-1/2 top-1/2 h-10 w-px -translate-y-1/2 bg-border/70" />
    </div>
  );
};
