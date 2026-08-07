import { IconArrowUp, IconArrowUpRight } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import type { ReactElement } from "react";
import { socialLinks } from "@/data/FooterLinks";
import { cn } from "@/lib/utils";
import type { FooterProps } from "@/types";

export const Footer = async ({
	className,
}: FooterProps = {}): Promise<ReactElement> => {
	await headers();
	const year = new Date().getFullYear();

	const extendedSections = [
		{ href: "#about", label: "About" },
		{ href: "#expertise", label: "Expertise" },
		{ href: "#experience", label: "Experience" },
		{ href: "#projects", label: "Projects" },
		{ href: "#writing", label: "Writing" },
		{ href: "#gallery", label: "Gallery" },
		{ href: "#contact", label: "Contact" },
	];

	return (
		<footer
			className={cn(
				"relative w-full overflow-hidden border-t border-b border-neutral-200 bg-white text-neutral-900",
				className
			)}
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-col justify-between border-x border-neutral-200">
				{/* Main Compact 12-Column Grid */}
				<div className="grid grid-cols-1 divide-y divide-neutral-200 border-b border-neutral-200 bg-white md:grid-cols-12 md:divide-y-0 md:divide-x">
					{/* Left Brand Column (5 Cols) */}
					<div className="flex flex-col justify-between p-5 sm:p-6 md:col-span-5">
						<div>
							<Link className="flex items-center gap-2" href="/">
								<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-[10px] text-white">
									MK
								</span>
								<span className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase">
									mradul katiyar
								</span>
							</Link>
							<p className="mt-3 font-semibold text-xs text-neutral-800 tracking-tight uppercase">
								CRAFTED IN MONOCHROME, TUNED FOR CLARITY.
							</p>
						</div>

						<div className="mt-4 flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
							<span className="font-mono text-[10px] font-semibold text-neutral-500 tracking-wider uppercase">
								Available for new roles
							</span>
						</div>
					</div>

					{/* Middle Sections Column (4 Cols) */}
					<div className="bg-white p-5 sm:p-6 md:col-span-4">
						<span className="mb-2.5 block font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase">
							[ SECTIONS ]
						</span>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
							{extendedSections.map((link) => (
								<Link
									className="group inline-flex items-center gap-1 font-mono text-xs text-neutral-600 transition hover:text-black"
									href={link.href}
									key={link.href}
								>
									<span>{link.label}</span>
									<IconArrowUpRight
										className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
										size={12}
									/>
								</Link>
							))}
						</div>
					</div>

					{/* Right Connect Column (3 Cols) */}
					<div className="bg-white p-5 sm:p-6 md:col-span-3">
						<span className="mb-2.5 block font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase">
							[ CONNECT ]
						</span>
						<div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-1">
							{socialLinks.map((link) => (
								<Link
									className="group inline-flex items-center justify-between font-mono text-xs text-neutral-600 transition hover:text-black"
									href={link.href}
									key={link.label}
									rel="noreferrer"
									target="_blank"
								>
									<span>{link.label}</span>
									<IconArrowUpRight
										className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
										size={12}
									/>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Slim Bottom Toolbar Copyright Row */}
				<div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 sm:px-6">
					<p className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase sm:text-xs">
						© {year} MRADUL KATIYAR. ALL RIGHTS RESERVED.
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1 shadow-2xs transition hover:bg-neutral-900"
						href="#main"
					>
						<span className="relative flex h-5 items-center overflow-hidden pl-4 pr-2 font-medium text-[10px] text-white tracking-wider uppercase sm:text-xs">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Top
							</span>
							<span className="absolute left-4 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Top
							</span>
						</span>
						<span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
							<span className="inline-flex transition-transform duration-300 group-hover:-translate-y-4">
								<IconArrowUp size={12} />
							</span>
							<span className="absolute inline-flex translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
								<IconArrowUp size={12} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</footer>
	);
};
