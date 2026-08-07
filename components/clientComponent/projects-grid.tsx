"use client";

import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type ReactElement, useId, useMemo, useState } from "react";
import { cn, packGridItems2Column } from "@/lib/utils";
import type { ProjectItem } from "@/types";

interface ProjectsGridProps {
	projects: ProjectItem[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps): ReactElement => {
	const [orientations, setOrientations] = useState<
		Record<string, "landscape" | "portrait">
	>({});
	const id = useId();
	const shouldReduceMotion = useReducedMotion();

	const handleImageLoad = (
		projectId: string,
		naturalWidth: number,
		naturalHeight: number
	): void => {
		const isLandscape = naturalWidth >= naturalHeight;
		setOrientations((prev) => {
			if (prev[projectId]) return prev;
			return { ...prev, [projectId]: isLandscape ? "landscape" : "portrait" };
		});
	};

	// Pack project cards into a 2-column grid pulling future portrait projects forward
	const packedProjects = useMemo(() => {
		return packGridItems2Column(projects, (proj) => {
			if (orientations[proj.id]) {
				return orientations[proj.id];
			}
			return proj.imageSrc.includes("portrait") ? "portrait" : "landscape";
		});
	}, [projects, orientations]);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 border-b border-neutral-200 bg-white items-stretch">
			{packedProjects.map((project, idx) => {
				const detectedOrientation = orientations[project.id];
				const isLandscape = detectedOrientation
					? detectedOrientation === "landscape"
					: !project.imageSrc.includes("portrait");

				const formattedIndex = String(idx + 1).padStart(2, "0");

				return (
					<motion.div
						className={cn(
							"group relative flex flex-col justify-between border-b border-r border-neutral-200 bg-white p-0 text-left rounded-none overflow-hidden transition hover:bg-neutral-50/80",
							isLandscape ? "sm:col-span-2" : "col-span-1"
						)}
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<div
							className={cn(
								"flex h-full w-full justify-between",
								isLandscape ? "flex-col sm:flex-row" : "flex-col"
							)}
						>
							{/* Cover Image Container */}
							<div
								className={cn(
									"relative overflow-hidden bg-neutral-900 rounded-none shrink-0",
									isLandscape
										? "w-full sm:w-1/2 aspect-16/10"
										: "w-full aspect-16/10 sm:aspect-4/3"
								)}
							>
								<Image
									alt={project.imageAlt || `${project.name} preview`}
									className="h-full w-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
									height={600}
									onLoad={(event): void => {
										const img = event.currentTarget;
										handleImageLoad(
											project.id,
											img.naturalWidth,
											img.naturalHeight
										);
									}}
									sizes={
										isLandscape
											? "(min-width: 768px) 50vw, 100vw"
											: "(min-width: 768px) 50vw, 100vw"
									}
									src={project.imageSrc}
									width={900}
								/>

								{/* Sharp Index Badge */}
								<div className="absolute top-4 left-4 z-10 rounded-none bg-black/80 backdrop-blur-xs px-3 py-1 font-mono text-xs font-semibold text-white tracking-widest uppercase border border-neutral-700">
									[ {formattedIndex} ]
								</div>
							</div>

							{/* Project Details */}
							<div
								className={cn(
									"flex flex-1 flex-col justify-between p-6 sm:p-8",
									isLandscape ? "sm:w-1/2" : "w-full"
								)}
							>
								<div>
									<span className="font-mono text-xs font-semibold text-neutral-400 tracking-widest uppercase block mb-2">
										FEATURED CASE STUDY
									</span>
									<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl">
										{project.name}
									</h3>
									<p className="mt-3 text-sm text-neutral-500 font-normal leading-relaxed">
										{project.description}
									</p>
								</div>

								<div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
									<div className="flex flex-wrap gap-1.5">
										{project.tags.map((tag: string) => (
											<span
												className="rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10px] font-medium text-neutral-700 tracking-wider uppercase"
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>

									<div className="flex items-center gap-2">
										{project.githubUrl ? (
											<a
												aria-label="GitHub Repository"
												className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 hover:border-black hover:bg-neutral-100 transition"
												href={project.githubUrl}
												rel="noreferrer"
												target="_blank"
											>
												<IconBrandGithub size={18} />
											</a>
										) : null}
										<a
											className="group/btn inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 font-mono text-xs font-semibold text-white tracking-wider uppercase transition hover:bg-neutral-900"
											href={project.href}
											rel="noreferrer"
											target="_blank"
										>
											<span>Live Demo</span>
											<IconArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" size={14} />
										</a>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
};
