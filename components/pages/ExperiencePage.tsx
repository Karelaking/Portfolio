import { IconCheck, IconDownload } from "@tabler/icons-react";
import type React from "react";
import { getExperience } from "@/lib/portfolio/queries";

export const ExperiencePage = async (): Promise<React.ReactElement> => {
	const experienceList = await getExperience();

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900"
			id="experience"
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<div>
						<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
							// 04 . EXPERIENCE
						</span>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
							PROFESSIONAL CAREER & ENGINEERING ROLES.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
							Product, studio, and full-stack software development roles that refined the craft.
						</p>
					</div>
				</header>

				{/* 12-Column Sharp Bordered Experience Rows with All-Corner Node Dots */}
				<div className="flex-1 border-b border-neutral-200 bg-white">
					{experienceList.map((item, idx) => {
						const formattedIndex = String(idx + 1).padStart(2, "0");

						return (
							<div
								className="group relative grid grid-cols-1 border-b border-neutral-200 bg-white transition hover:bg-neutral-50/80 lg:grid-cols-12 items-stretch"
								key={item.id}
							>
								{/* Corner Node Dots at All Grid Line Intersections */}
								<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="hidden lg:block absolute -top-1 left-[33.333333%] z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />
								<span className="hidden lg:block absolute -bottom-1 left-[33.333333%] z-10 h-2 w-2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black" />

								{/* Left Role & Company Column (4 Cols) */}
								<div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-200">
									<div>
										<span className="mb-3 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
											[ {formattedIndex} ]
										</span>
										<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase transition-colors group-hover:text-black sm:text-3xl">
											{item.role}
										</h3>
										<div className="mt-3 inline-flex items-center gap-2 rounded-none border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono font-semibold text-xs text-neutral-800 uppercase tracking-wider">
											<span>{item.company}</span>
										</div>
									</div>

									<p className="mt-6 font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
										PERIOD: {item.period}
									</p>
								</div>

								{/* Right Summary & Key Highlights Column (8 Cols) */}
								<div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-8">
									<div>
										<p className="font-normal text-base text-neutral-600 leading-relaxed sm:text-lg">
											{item.summary}
										</p>

										{item.highlights && item.highlights.length > 0 ? (
											<div className="mt-6 space-y-2.5 border-t border-neutral-100 pt-5">
												<span className="mb-2 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
													KEY ACCOMPLISHMENTS
												</span>
												{item.highlights.map((highlight) => (
													<div
														className="flex items-start gap-3 font-mono font-medium text-xs text-neutral-700 uppercase tracking-wider"
														key={highlight}
													>
														<IconCheck
															className="mt-0.5 shrink-0 text-black"
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
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						SHOWCASING {experienceList.length} ENGINEERING & PRODUCT ROLES
					</p>

					<a
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="/resume.pdf"
						rel="noreferrer"
						target="_blank"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Download Resume
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Download Resume
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
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
