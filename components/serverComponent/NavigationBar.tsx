import Link from "next/link";
import type { ReactElement } from "react";
import { navLinks } from "@/data/NavigationLinks";
import { cn } from "@/lib/utils";
import type { NavigationBarProps } from "@/types";
import { MobileMenu, ThemeToggle } from "../clientComponent";

export const Logo = (): ReactElement => (
	<Link className="font-semibold text-lg tracking-tight" href="/">
		MRADUL
	</Link>
);

export const NavigationBar = ({
	className,
}: NavigationBarProps): ReactElement => (
	<header
		className={cn(
			"sticky top-0 z-50 flex w-full max-w-full items-center justify-between border-border/60 border-b bg-background/90 px-8 py-2 backdrop-blur",
			className
		)}
	>
		<Logo />
		<nav
			aria-label="Primary"
			className="hidden w-full max-w-5xl items-center justify-center gap-x-8 text-muted-foreground text-xs uppercase tracking-[0.3em] sm:flex"
		>
			{navLinks.map((link) => (
				<Link
					className="group relative inline-flex items-center justify-center transition-colors hover:text-foreground focus-visible:text-foreground"
					href={link.href}
					key={link.href}
				>
					<span className="relative z-10">{link.label}</span>
					<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
				</Link>
			))}
		</nav>
		<MobileMenu navLinks={navLinks} />
		<ThemeToggle className="hidden sm:flex" />
	</header>
);
