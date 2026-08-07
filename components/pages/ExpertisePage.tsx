import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getTechnologyLogo } from "@/data/Technology";
import { getTechnologies } from "@/lib";

export const ExpertisePage = async (): Promise<React.ReactElement> => {
	const technologies = await getTechnologies();

	return (
		<section
			className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900"
			id="expertise"
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<div>
						<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
							// 02 . TECH STACK
						</span>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
							CORE TECHNOLOGIES & PLATFORMS.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
							Frameworks, languages, databases, and tooling engineered for performance, resilience, and scale.
						</p>
					</div>
				</header>

				{/* Tech Stack Logo Grid with Intersection Corner Nodes */}
				<div className="flex-1 bg-white">
					<div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 border-b border-neutral-200 bg-white sm:grid-cols-3 md:grid-cols-4 items-stretch">
						{technologies.map((tech) => (
							<div
								className="group relative flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:bg-neutral-50/80 min-h-[160px] sm:min-h-[180px]"
								key={tech.id}
							>
								{/* Grid Intersection Corner Node Dots */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />

								{/* Tech Logo Icon */}
								<div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110">
									{getTechnologyLogo(tech.logoKey || tech.name)}
								</div>

								{/* Tech Name */}
								<h3 className="mt-4 font-extrabold text-base text-neutral-900 tracking-tight uppercase transition-colors duration-300 group-hover:text-black sm:text-lg">
									{tech.name}
								</h3>

								{/* Category / Website Link */}
								<a
									className="mt-1 font-mono text-[10px] text-neutral-400 tracking-widest uppercase transition-colors duration-300 group-hover:text-neutral-700 hover:underline"
									href={tech.websiteUrl}
									rel="noreferrer"
									target="_blank"
								>
									{tech.name.toLowerCase()}.dev ↗
								</a>
							</div>
						))}
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						SHOWCASING {technologies.length} CORE TECHNOLOGIES & TOOLKITS
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="#projects"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Explore Projects
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Explore Projects
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
							<span className="inline-flex transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5">
								<IconArrowUpRight size={16} />
							</span>
							<span className="absolute inline-flex -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
								<IconArrowUpRight size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};
