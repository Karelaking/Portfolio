"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import type { ReactElement } from "react";
import { ThemeToggleCircular } from "@/components/animations/transitions/theme-toggle-circular";
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
		<ThemeToggleCircular onToggle={handleToggle}>
			<button
				aria-label="Toggle theme"
				className={cn(
					"inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-md hover:scale-105 transition cursor-pointer dark:border-neutral-800 dark:bg-neutral-900 dark:text-white",
					"h-11 w-11",
					className
				)}
				type="button"
			>
				<span className="relative inline-flex h-5 w-5 items-center justify-center">
					<IconSun
						className={cn(
							"absolute h-5 w-5 transition-transform duration-300",
							isDark ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
						)}
						strokeWidth={1.8}
					/>
					<IconMoon
						className={cn(
							"absolute h-5 w-5 transition-transform duration-300",
							isDark ? "scale-100 opacity-100 rotate-0" : "scale-0 opacity-0 -rotate-90"
						)}
						strokeWidth={1.8}
					/>
				</span>
			</button>
		</ThemeToggleCircular>
	);
};
