"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { type ReactElement, useState } from "react";
import type { NavLink } from "@/types/layouts/header.interface";
import { Logo } from "../serverComponent/NavigationBar";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export const MobileMenu = ({
	navLinks,
}: {
	navLinks: NavLink[];
}): ReactElement => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const handleToggleMenu = (): void => {
		setIsMenuOpen((prev) => !prev);
	};
	return (
		<div className="sm:hidden">
			<Sheet onOpenChange={handleToggleMenu} open={isMenuOpen}>
				<SheetTrigger asChild>
					<button
						aria-label="Toggle navigation"
						className="inline-flex size-10 items-center justify-center rounded-full border border-border/70 text-foreground transition hover:border-foreground md:hidden"
						type="button"
					>
						<IconMenu2 size={18} />
					</button>
				</SheetTrigger>
				<SheetClose asChild />
				<SheetTitle />
				<SheetContent
					className="flex h-dvh w-full flex-col border-border/60 border-r bg-background/95 px-0 py-0 backdrop-blur md:hidden"
					side="left"
				>
					<div className="flex items-center justify-between gap-4 border-border/60 border-b px-4 py-5">
						<Logo />
						<SheetClose asChild>
							<button
								aria-label="Close navigation"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-foreground transition hover:border-foreground"
								type="button"
							>
								<IconX size={18} />
							</button>
						</SheetClose>
					</div>
					<nav
						aria-label="Mobile"
						className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-6 text-muted-foreground text-sm uppercase tracking-[0.18em]"
					>
						{navLinks.map((link) => (
							<Link
								className="group wrap-break-word relative inline-flex w-fit items-center transition-colors hover:text-foreground focus-visible:text-foreground"
								href={link.href}
								key={link.href}
								onClick={handleToggleMenu}
							>
								<span className="relative z-10">{link.label}</span>
								<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-foreground transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
							</Link>
						))}
					</nav>
					<ThemeToggle className="mb-6 ml-4 flex justify-center" />
				</SheetContent>
			</Sheet>
		</div>
	);
};
