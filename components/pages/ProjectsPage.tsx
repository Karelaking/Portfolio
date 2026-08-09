import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { GSAPEmptySpaceDecorations, GSAPSVGPattern } from "@/components/animations";
import { getProjects } from "@/lib/portfolio/queries";
import { ProjectsGrid } from "../clientComponent";

export const ProjectsPage = async (): Promise<React.ReactElement> => {
	const projects = await getProjects();
	const featuredProjects = projects.slice(0, 4);
	const hasMoreProjects = projects.length > featuredProjects.length;

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
			data-gsap-stack="true"
			id="projects"
		>
			<GSAPSVGPattern className="-right-10 top-0 h-96 w-96 opacity-15" variant="geometric-mesh" />
			<GSAPEmptySpaceDecorations section="projects" />
			{/* Grid Container Wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				{/* Section Header Row */}
				<header
					className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-950"
					data-gsap-reveal="fade-up"
				>
					<div>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
							FEATURED ENGINEERING & CASE STUDIES.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Full-stack applications, API platforms, and software architecture engineered with precision.
						</p>
					</div>
				</header>

				{/* Bin-Packed 2-Column Sharp Bordered Grid */}
				<div className="flex-1" data-gsap-stagger="true">
					<ProjectsGrid projects={featuredProjects} />
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-950">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						SHOWCASING {featuredProjects.length} OF {projects.length} FEATURED PROJECTS
					</p>

					{hasMoreProjects ? (
						<Link
							className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
							href="/projects"
						>
							<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
								<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
									Show More Projects
								</span>
								<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
									Show More Projects
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
					) : null}
				</div>
			</div>
		</section>
	);
};
