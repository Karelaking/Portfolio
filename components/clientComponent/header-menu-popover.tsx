"use client";

import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/NavigationLinks";
import { cn } from "@/lib/utils";

export const HeaderMenuPopover = (): React.ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div className="relative" ref={containerRef}>
			{/* Combined Pill Container (Hire me CTA + Menu Toggle) */}
			<div
				className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-black p-1 sm:p-1.5 shadow-sm dark:bg-neutral-900 dark:border dark:border-neutral-800 overflow-hidden"
				onMouseLeave={(): void => setIsHovered(false)}
			>
				{/* Left Menu Toggle Button (Fades/Expands on Hover) */}
				<motion.div
					animate={{
						width: isHovered ? "auto" : 0,
						opacity: isHovered ? 1 : 0,
						scale: isHovered ? 1 : 0.6,
					}}
					className="flex shrink-0 items-center justify-center overflow-hidden"
					initial={false}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 26,
						mass: 0.8,
					}}
				>
					<button
						aria-expanded={isOpen}
						aria-label="Toggle navigation menu"
						className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-neutral-800 sm:h-8 sm:w-8 dark:hover:bg-neutral-800"
						onClick={(): void => setIsOpen((prev) => !prev)}
						type="button"
					>
						{isOpen ? <IconX size={16} /> : <IconMenu2 size={16} />}
					</button>
				</motion.div>

				{/* Inner White Pill Action Button ("Hire me" slides right) */}
				<Link
					className="group/hire inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-medium text-xs text-neutral-900 transition whitespace-nowrap hover:bg-neutral-100 sm:px-5 sm:py-2 sm:text-sm dark:bg-white dark:text-black dark:hover:bg-neutral-200"
					href="#contact"
					onMouseEnter={(): void => setIsHovered(true)}
				>
					<span>Hire me</span>
					<span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
						<span className="inline-flex transition-transform duration-300 group-hover/hire:translate-x-4 group-hover/hire:-translate-y-4">
							<IconArrowUpRight size={15} />
						</span>
						<span className="absolute inline-flex -translate-x-4 translate-y-4 transition-transform duration-300 group-hover/hire:translate-x-0 group-hover/hire:translate-y-0">
							<IconArrowUpRight size={15} />
						</span>
					</span>
				</Link>

				{/* Right Menu Toggle Button (Fades/Collapses on Hover) */}
				<motion.div
					animate={{
						width: isHovered ? 0 : "auto",
						opacity: isHovered ? 0 : 1,
						scale: isHovered ? 0.6 : 1,
					}}
					className="flex shrink-0 items-center justify-center overflow-hidden"
					initial={false}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 26,
						mass: 0.8,
					}}
				>
					<button
						aria-expanded={isOpen}
						aria-label="Toggle navigation menu"
						className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-neutral-800 sm:h-8 sm:w-8 dark:hover:bg-neutral-800"
						onClick={(): void => setIsOpen((prev) => !prev)}
						type="button"
					>
						{isOpen ? <IconX size={16} /> : <IconMenu2 size={16} />}
					</button>
				</motion.div>
			</div>

			{isOpen && (
				<>
					{/* Mobile backdrop overlay */}
					<div
						className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs sm:hidden"
						onClick={(): void => setIsOpen(false)}
					/>

					{/* Menu popover card */}
					<div className="fixed inset-x-4 top-16 z-50 max-h-[80vh] overflow-y-auto rounded-3xl border border-neutral-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 sm:absolute sm:inset-x-auto sm:right-0 sm:top-14 sm:w-80 sm:p-6 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white">
						<div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
							<span className="font-medium text-neutral-500 text-xs sm:text-sm dark:text-neutral-400">
								Menu
							</span>
							<button
								aria-label="Close menu"
								className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
								onClick={(): void => setIsOpen(false)}
								type="button"
							>
								<IconX size={14} />
							</button>
						</div>
						<nav className="flex flex-col gap-3 pt-3.5">
							{navLinks.map((link, index) => (
								<Link
									className={cn(
										"flex items-center gap-2 font-medium text-neutral-700 text-base sm:text-xl transition hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white",
										index === 0 && "font-bold text-neutral-900 text-lg sm:text-2xl dark:text-white"
									)}
									href={link.href}
									key={link.href}
									onClick={(): void => setIsOpen(false)}
								>
									{index === 0 && (
										<span className="font-normal text-neutral-400 dark:text-neutral-500">—</span>
									)}
									{link.label}
								</Link>
							))}
						</nav>
					</div>
				</>
			)}
		</div>
	);
};
