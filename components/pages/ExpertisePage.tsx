import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getTechnologyLogo } from "@/data/Technology";
import { getExpertise, getTechnologies } from "@/lib";

export const ExpertisePage = async (): Promise<React.ReactElement> => {
	const [expertisePillars, technologies] = await Promise.all([
		getExpertise(),
		getTechnologies(),
	]);

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
			id="expertise"
		>
			{/* Grid Container Wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-950">
					<div>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
							ENGINEERING PILLARS & CORE TECHNOLOGIES.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Disciplined software architecture, high-precision UI engineering, and platform tooling built for speed and resilience.
						</p>
					</div>
				</header>

				{/* Part 1: Core Domain Pillars Grid */}
				<div className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
					<div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:divide-x items-stretch dark:divide-neutral-800">
						{expertisePillars.map((pillar, idx) => {
							const formattedIndex = String(idx + 1).padStart(2, "0");

							return (
								<div
									className="group flex flex-col justify-between p-6 sm:p-8 transition hover:bg-neutral-50/80 dark:hover:bg-neutral-900/80"
									key={pillar.id}
								>
									<div>
										<span className="font-mono font-extrabold text-xs text-neutral-400 tracking-widest uppercase block mb-3 group-hover:text-black dark:text-neutral-500 dark:group-hover:text-white">
											[{formattedIndex}]
										</span>
										<h3 className="font-extrabold text-xl text-neutral-900 tracking-tight uppercase dark:text-neutral-100">
											{pillar.title}
										</h3>
										<p className="mt-2.5 text-sm text-neutral-600 font-normal leading-relaxed dark:text-neutral-400">
											{pillar.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Part 2: Tech Stack Logo Grid with Corner Intersection Node Dots */}
				<div className="flex-1 bg-white dark:bg-neutral-950">
					<div className="border-b border-neutral-200 bg-neutral-50/60 px-6 py-4 sm:px-10 dark:border-neutral-800 dark:bg-neutral-900/60">
						<span className="font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
							[ CORE TECH STACK & TOOLKITS ]
						</span>
					</div>

					<div className="grid grid-cols-2 divide-x divide-y divide-neutral-200 border-b border-neutral-200 bg-white sm:grid-cols-3 md:grid-cols-4 items-stretch dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
						{technologies.map((tech) => (
							<div
								className="group relative flex flex-col items-center justify-center p-8 text-center transition-all duration-300 hover:bg-neutral-50/80 min-h-40 sm:min-h-45 dark:hover:bg-neutral-900/80"
								key={tech.id}
							>
								{/* Grid Intersection Corner Node Dots */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

								{/* Tech Logo Icon */}
								<div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110">
									{getTechnologyLogo(tech.logoKey || tech.name)}
								</div>

								{/* Tech Name */}
								<h3 className="mt-4 font-extrabold text-base text-neutral-900 tracking-tight uppercase transition-colors duration-300 group-hover:text-black sm:text-lg dark:text-neutral-100 dark:group-hover:text-white">
									{tech.name}
								</h3>

								{/* Website Link */}
								<a
									className="mt-1 font-mono text-[10px] text-neutral-400 tracking-widest uppercase transition-colors duration-300 group-hover:text-neutral-700 hover:underline dark:text-neutral-500 dark:group-hover:text-neutral-300"
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
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-950">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						SHOWCASING {technologies.length} CORE TECHNOLOGIES & TOOLKITS
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
						href="#projects"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Explore Projects
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Explore Projects
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs dark:bg-black dark:text-white">
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
