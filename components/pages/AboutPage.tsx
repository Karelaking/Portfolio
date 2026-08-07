import { IconArrowRight, IconDownload } from "@tabler/icons-react";
import Image from "next/image";
import type React from "react";
import { getCurrentFocus, getHero } from "@/lib/portfolio/queries";

export const AboutPage = async (): Promise<React.ReactElement> => {
	const heroData = await getHero();
	const currentFocus = await getCurrentFocus();

	return (
		<section
			className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900"
			id="about"
		>
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<div>
						<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
							// 01 . ABOUT ME
						</span>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
							ENGINEERING WITH PURPOSE & DISCIPLINE.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
							I build full-stack systems where disciplined UI meets pragmatic backend engineering. Clean UX, reliable APIs, and long-term maintainability.
						</p>
					</div>
				</header>

				{/* 12-Column Sharp Bordered Grid Body */}
				<div className="grid flex-1 grid-cols-1 items-stretch divide-y divide-neutral-200 border-b border-neutral-200 bg-white lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
					{/* Left Column: Hero Portrait (5 Cols) */}
					<div className="flex flex-col justify-center items-center bg-white p-6 sm:p-10 lg:col-span-5 lg:p-12">
						{/* Hero Portrait Frame */}
						<div className="relative aspect-4/5 w-full max-w-sm overflow-hidden border border-neutral-200 bg-[#ea6936]">
							<Image
								alt={heroData.imageAlt || "Mradul Katiyar Portrait"}
								className="object-cover object-center"
								fill
								priority
								sizes="(max-width: 768px) 100vw, 400px"
								src={heroData.imageSrc}
							/>
						</div>
					</div>

					{/* Right Column: Background & Current Focus (7 Cols) */}
					<div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 lg:p-12">
						<div>
							<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl">
								FOCUSED, DETAIL-DRIVEN & BUILT FOR SCALE
							</h3>
							<p className="mt-4 text-neutral-600 font-normal text-base leading-relaxed">
								As a Full-Stack Software Developer, I specialize in shipping high-precision web applications. Every system I build prioritizes performance, type safety, and clean user experience.
							</p>

							{/* Current Focus List (Replaces Tenets) */}
							<div className="mt-8">
								<span className="mb-4 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
									[ CURRENT FOCUS & ARCHITECTURAL DISCIPLINE ]
								</span>
								<div className="grid grid-cols-1 gap-3">
									{currentFocus.map((item, idx) => (
										<div
											className="group flex items-center justify-between rounded-none border border-neutral-200 bg-neutral-50/60 p-4 transition hover:border-black hover:bg-neutral-100/80"
											key={item.id}
										>
											<div className="flex items-center gap-4">
												<span className="font-mono font-extrabold text-sm text-neutral-400 tracking-widest group-hover:text-black">
													[0{idx + 1}]
												</span>
												<span className="font-extrabold text-base text-neutral-900 tracking-tight uppercase">
													{item.label}
												</span>
											</div>
											<IconArrowRight
												className="shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1"
												size={16}
											/>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						BASED IN KANPUR, INDIA • FULL-STACK SOFTWARE DEVELOPER
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
