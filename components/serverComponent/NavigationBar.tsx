import { IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import type { ReactElement } from "react";
import { HeaderMenuPopover } from "@/components/clientComponent";
import { cn } from "@/lib/utils";
import type { NavigationBarProps } from "@/types";

export const Logo = (): ReactElement => (
	<Link className="flex items-center gap-2 min-w-0 sm:gap-2.5" href="/">
		<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white sm:h-8 sm:w-8 dark:bg-white dark:text-black">
			MK
		</span>
		<span className="font-extrabold text-neutral-900 text-sm tracking-tight uppercase truncate max-w-32.5 sm:text-xl min-[380px]:max-w-none dark:text-white">
			mradul katiyar
		</span>
	</Link>
);

export const NavigationBar = ({
	className,
}: NavigationBarProps): ReactElement => (
	<header
		className={cn(
			"sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 text-neutral-900 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95 dark:text-white",
			className
		)}
	>
		{/* Max 7xl Grid Frame Alignment */}
		<div className="group relative mx-auto flex w-full max-w-7xl items-center justify-between border-x border-neutral-200 px-4 py-3 sm:px-10 sm:py-4 dark:border-neutral-800">
			{/* Corner Node Dots at Grid Line Intersections */}
			<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

			{/* Left: Brand & Location */}
			<div className="flex items-center gap-2.5 min-w-0 sm:gap-6">
				<Logo />
				<div className="hidden items-center gap-1.5 font-medium text-neutral-800 text-xs shrink-0 md:flex sm:text-sm dark:text-neutral-300">
					<IconMapPin className="text-neutral-700 dark:text-neutral-400" size={16} />
					<span>NEW DELHI, INDIA</span>
				</div>
			</div>

			{/* Right: Combined Action Capsule (Hire me + Menu) */}
			<div className="flex items-center shrink-0">
				<HeaderMenuPopover />
			</div>
		</div>
	</header>
);
