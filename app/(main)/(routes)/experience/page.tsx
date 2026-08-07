import { IconArrowUpLeft, IconCheck } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getExperienceAction } from "@/actions/dashboard";
import { HeaderMenuPopover } from "@/components/clientComponent";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Engineering & Software Experience | MK Katiyar",
	description:
		"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
	alternates: {
		canonical: "/experience",
	},
	openGraph: {
		title: "Engineering & Software Experience | MK Katiyar",
		description:
			"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
		url: "/experience",
		type: "website",
	},
	twitter: {
		title: "Engineering & Software Experience | MK Katiyar",
		description:
			"Explore MK Katiyar's software engineering experience, featuring full-stack development, tech leadership, shipped products, and technical accomplishments.",
	},
};

const ExperienceRoutePage = async (): Promise<React.ReactElement> => {
	const experienceList = await getExperienceAction();

	const experienceCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Experience by MK Katiyar",
		description:
			"A record of software engineering and product development roles.",
		url: toAbsoluteUrl("/experience"),
	};

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(experienceCollectionJsonLd),
				}}
				type="application/ld+json"
			/>

			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Header Row (Single Unified Navbar) */}
				<header className="sticky top-0 z-40 flex flex-nowrap items-center justify-between gap-2 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-10 sm:py-4">
					<div className="flex items-center gap-2.5 min-w-0 sm:gap-6">
						<Link className="flex items-center gap-2 min-w-0 sm:gap-2.5" href="/">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white sm:h-8 sm:w-8">
								MK
							</span>
							<span className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase truncate sm:text-xl">
								mradul katiyar
							</span>
						</Link>
					</div>

					<div className="flex items-center gap-2 shrink-0 sm:gap-3">
						<HeaderMenuPopover />
					</div>
				</header>

				{/* Title Header */}
				<div className="border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
						// CAREER ARCHIVE
					</span>
					<h1 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
						SOFTWARE ENGINEERING & PRODUCT EXPERIENCE
					</h1>
					<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
						Comprehensive record of software development roles, technical accomplishments, and shipped product systems.
					</p>
				</div>

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
										<h2 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase transition-colors group-hover:text-black sm:text-3xl">
											{item.role}
										</h2>
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
						TOTAL {experienceList.length} CAREER ROLES
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="/"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Home
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Home
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
							<span className="inline-flex transition-transform duration-300 group-hover:-translate-x-5 group-hover:-translate-y-5">
								<IconArrowUpLeft size={16} />
							</span>
							<span className="absolute inline-flex translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
								<IconArrowUpLeft size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ExperienceRoutePage;
