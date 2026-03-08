"use client";

import type { ReactElement } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps): ReactElement => {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = (): void => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80",
        "h-10 w-10 text-foreground transition hover:border-foreground",
        className,
      )}
      onClick={handleToggle}
      type="button"
    >
      <span className="relative inline-flex h-5 w-5 items-center justify-center">
        <IconSun
          className={cn(
            "absolute h-5 w-5 transition",
            isDark ? "scale-0 opacity-0" : "scale-100 opacity-100",
          )}
          strokeWidth={1.6}
        />
        <IconMoon
          className={cn(
            "absolute h-5 w-5 transition",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
          strokeWidth={1.6}
        />
      </span>
    </button>
  );
};
