import { IconCheck, IconDownload } from "@tabler/icons-react";
import type React from "react";
import { getExperience } from "@/lib/portfolio/queries";

export const ExperiencePage = async (): Promise<React.ReactElement> => {
	const experienceList = await getExperience();

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-neutral-50/70 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100"
			id="experience"
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-neutral-50/70 px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900/60">
					<div>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
							PROFESSIONAL CAREER & ENGINEERING ROLES.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Product, studio, and full-stack software development roles that refined the craft.
						</p>
					</div>
				</header>

				{/* 12-Column Sharp Bordered Experience Rows with All-Corner Node Dots */}
				<div className="flex-1 border-b border-neutral-200 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/60">
					{experienceList.map((item, idx) => {
						const formattedIndex = String(idx + 1).padStart(2, "0");

						return (
							<div
								className="group relative grid grid-cols-1 border-b border-neutral-200 bg-neutral-50/70 transition hover:bg-white lg:grid-cols-12 items-stretch dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-900"
								key={item.id}
							>
								{/* Corner Node Dots at All Grid Line Intersections */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="hidden lg:block absolute -top-1 left-[33.333333%] z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
								<span className="hidden lg:block absolute -bottom-1 left-[33.333333%] z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

								{/* Left Role & Company Column (4 Cols) */}
								<div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800">
									<div>
										<span className="mb-3 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase dark:text-neutral-500">
											[ {formattedIndex} ]
										</span>
										<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase transition-colors group-hover:text-black sm:text-3xl dark:text-neutral-100 dark:group-hover:text-white">
											{item.role}
										</h3>
										<div className="mt-3 inline-flex items-center gap-2 rounded-none border border-neutral-200 bg-white px-3 py-1 font-mono font-semibold text-xs text-neutral-800 uppercase tracking-wider dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
											<span>{item.company}</span>
										</div>
									</div>

									<p className="mt-6 font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase dark:text-neutral-500">
										PERIOD: {item.period}
									</p>
								</div>

								{/* Right Summary & Key Highlights Column (8 Cols) */}
								<div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8">
									<div>
										<p className="font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
											{item.summary}
										</p>

										{item.highlights && item.highlights.length > 0 ? (
											<div className="mt-6 space-y-2.5 border-t border-neutral-200 pt-5 dark:border-neutral-800">
												<span className="mb-2 block font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
													KEY ACCOMPLISHMENTS
												</span>
												{item.highlights.map((highlight) => (
													<div
														className="flex items-start gap-3 font-mono font-medium text-xs text-neutral-700 uppercase tracking-wider dark:text-neutral-300"
														key={highlight}
													>
														<IconCheck
															className="mt-0.5 shrink-0 text-black dark:text-white"
															size={14}
														/>
														<span>{highlight}</span>
													</div>
												))}
											</div>
										) : null}
									</div>
								</div>
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
