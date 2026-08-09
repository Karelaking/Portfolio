import { IconCheck, IconDownload } from "@tabler/icons-react";
import type React from "react";
import { getExperience } from "@/lib/portfolio/queries";
import { splitExperienceHighlights } from "@/lib/portfolio/experience-tech";

export const ExperiencePage = async (): Promise<React.ReactElement> => {
	const experienceList = await getExperience();

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-neutral-50/70 text-neutral-900 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-100"
			data-gsap-stack="true"
			id="experience"
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Section Header Row */}
				<header
					className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-neutral-50/70 px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900/60"
					data-gsap-reveal="fade-up"
				>
					<div>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
							PROFESSIONAL CAREER & ENGINEERING ROLES.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Product, studio, and full-stack software development roles that refined the craft.
						</p>
					</div>
				</header>

				{/* 2-Column Sharp Bordered Grid Layout */}
				<div
					className="grid flex-1 grid-cols-1 md:grid-cols-2 border-b border-neutral-200 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/60"
					data-gsap-stagger="true"
				>
					{experienceList.map((item, idx) => {
						const formattedIndex = String(idx + 1).padStart(2, "0");
						const isCurrent = item.period.toLowerCase().includes("present") || item.period.toLowerCase().includes("current");
						const parsed = splitExperienceHighlights(item.highlights);

						return (
							<div
								className="group relative flex flex-col justify-between border-b border-r border-neutral-200 bg-white p-6 sm:p-8 transition hover:bg-neutral-100/70 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900"
								key={item.id}
							>
								{/* Corner Node Dots */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

								<div>
									{/* Header Row */}
									<div className="flex flex-wrap items-start justify-between gap-3">
										<div>
											<div className="flex items-center gap-2 mb-2">
												<span className="font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase dark:text-neutral-500">
													[ {formattedIndex} ]
												</span>
												{isCurrent && (
													<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 uppercase tracking-wider dark:border-emerald-900/80 dark:bg-emerald-950/60 dark:text-emerald-400">
														<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
														<span>ACTIVE</span>
													</span>
												)}
											</div>
											<h3 className="font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight uppercase transition-colors group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white">
												{item.role}
											</h3>
											<div className="mt-2 inline-flex items-center gap-2 rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 font-mono font-semibold text-xs text-neutral-800 uppercase tracking-wider dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
												<span>@ {item.company}</span>
											</div>
										</div>

										<span className="font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400 shrink-0">
											{item.period}
										</span>
									</div>

									{/* Summary Description */}
									<p className="mt-3 font-normal text-sm sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400">
										{item.summary}
									</p>

									{/* Core Tech Stack Badges */}
									{parsed.coreTech.length > 0 ? (
										<div className="mt-3 flex flex-wrap items-center gap-1.5">
											<span className="font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase mr-1 dark:text-neutral-500">
												STACK:
											</span>
											{parsed.coreTech.map((tech) => (
												<span
													className="rounded-none border border-neutral-200 bg-neutral-100/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-800 uppercase tracking-wider dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
													key={tech}
												>
													{tech}
												</span>
											))}
										</div>
									) : null}
								</div>

								{/* Compact Inline Accomplishment Pills */}
								{parsed.highlights.length > 0 ? (
									<div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
										<span className="font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase mr-1 dark:text-neutral-500">
											HIGHLIGHTS:
										</span>
										{parsed.highlights.map((highlight) => (
											<span
												className="inline-flex items-center gap-1.5 rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700 uppercase tracking-wider transition hover:border-black hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-neutral-900"
												key={highlight}
											>
												<IconCheck size={13} className="text-black dark:text-white shrink-0" />
												<span>{highlight}</span>
											</span>
										))}
									</div>
								) : null}
							</div>
						);
					})}
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50/70 px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-900/60">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						SHOWCASING {experienceList.length} ENGINEERING & PRODUCT ROLES
					</p>

					<a
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
						href="/resume.pdf"
						rel="noreferrer"
						target="_blank"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Download Resume
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Download Resume
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs dark:bg-black dark:text-white">
							<span className="inline-flex transition-transform duration-300 group-hover:translate-y-5">
								<IconDownload size={16} />
							</span>
							<span className="absolute inline-flex -translate-y-5 transition-transform duration-300 group-hover:translate-y-0">
								<IconDownload size={16} />
							</span>
						</span>
					</a>
				</div>
			</div>
		</section>
	);
};
