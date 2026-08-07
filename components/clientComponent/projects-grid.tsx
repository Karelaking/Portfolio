"use client";

import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

interface ProjectsGridProps {
	projects: ProjectItem[];
}

export const ProjectsGrid = ({ projects }: ProjectsGridProps): ReactElement => {
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="flex flex-col divide-y divide-neutral-200 border-b border-neutral-200 bg-white">
			{projects.map((project, idx) => {
				const isEven = idx % 2 === 0;
				const formattedIndex = String(idx + 1).padStart(2, "0");

				return (
					<motion.div
						className="group relative flex flex-col divide-y divide-neutral-200 bg-white transition hover:bg-neutral-50/80 sm:flex-row sm:divide-y-0 sm:divide-x items-stretch"
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.5, delay: idx * 0.1 }}
						viewport={{ once: true }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						{/* Corner Node Dots at All Grid Line Intersections */}
						<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
						<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
						<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
						<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
						<span
							className={cn(
								"hidden sm:block absolute -top-1 z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black",
								isEven ? "left-[40%]" : "left-[60%]"
							)}
						/>
						<span
							className={cn(
								"hidden sm:block absolute -bottom-1 z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black",
								isEven ? "left-[40%]" : "left-[60%]"
							)}
						/>

						{/* Text Content Column (40% Width) */}
						<div
							className={cn(
								"w-full sm:w-[40%] shrink-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10",
								isEven ? "order-2 sm:order-1" : "order-2 sm:order-2"
							)}
						>
							<div>
								<div className="flex items-center gap-2 font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase mb-3">
									<span className="h-1.5 w-1.5 rounded-full bg-black" />
									<span>{project.tags[0] || "FEATURED PROJECT"}</span>
									<span className="ml-auto font-mono text-xs text-neutral-400">
										[ {formattedIndex} ]
									</span>
								</div>

								<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl leading-tight">
									{project.name}
								</h3>

								<p className="mt-4 font-normal text-base text-neutral-500 leading-relaxed">
									{project.description}
								</p>
							</div>

							<div className="mt-8 pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
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

								<div className="flex items-center gap-2.5">
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
										<IconArrowUpRight
											className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
											size={14}
										/>
									</a>
								</div>
							</div>
						</div>

						{/* Cover Image Column (60% Width) matching exact full height of text column */}
						<div
							className={cn(
								"w-full sm:w-[60%] shrink-0 relative overflow-hidden bg-neutral-900 rounded-none min-h-[260px] sm:min-h-0",
								isEven ? "order-1 sm:order-2" : "order-1 sm:order-1"
							)}
						>
							<Image
								alt={project.imageAlt || `${project.name} preview`}
								className="h-full w-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
								fill
								priority={idx < 2}
								sizes="(min-width: 768px) 60vw, 100vw"
								src={project.imageSrc}
							/>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
};
