import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";

export const CtaPage = (): React.ReactElement => {
	return (
		<section className="relative flex w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			{/* Grid Container Wrapper with Full-Height Vertical Borders & Generous Inner Padding */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center border-x border-neutral-200 bg-white px-6 py-10 text-center sm:px-10 sm:py-18 md:py-20">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
				<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
				<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
				<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />

				{/* Soft Subtle Glow Effect */}
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-64 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
				</div>

				<h2 className="relative z-10 font-extrabold text-4xl text-neutral-900 tracking-tight sm:text-5xl md:text-6xl max-w-4xl leading-tight">
					Ready to simplify your workflow?
				</h2>
				<p className="relative z-10 mt-4 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
					Bring everything together in one place and get more done with less effort.
				</p>

				<Link
					className="group/btn relative z-10 mt-8 inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
					href="#contact"
				>
					<span className="relative flex h-6 items-center overflow-hidden pl-6 pr-4 font-semibold text-xs text-white tracking-wider uppercase sm:text-sm">
						<span className="inline-block transition-transform duration-300 group-hover/btn:-translate-y-full">
							Start your project
						</span>
						<span className="absolute left-6 inline-block translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0">
							Start your project
						</span>
					</span>
					<span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
						<span className="inline-flex transition-transform duration-300 group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5">
							<IconArrowUpRight size={18} />
						</span>
						<span className="absolute inline-flex -translate-x-5 translate-y-5 transition-transform duration-300 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0">
							<IconArrowUpRight size={18} />
						</span>
					</span>
				</Link>
			</div>
		</section>
	);
};
