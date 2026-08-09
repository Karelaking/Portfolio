import {
	IconArrowUp,
	IconArrowUpRight,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
	IconMail,
	IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { getHero, getSocialLinks } from "@/lib/portfolio/queries";
import type { SocialLink } from "@/types/social-link.interface";
import { CountUpValue, ThemeToggle, ZoomHollowText } from "../clientComponent";

const getSocialIcon = (platform: string): React.ReactElement => {
	switch (platform.toLowerCase()) {
		case "github":
			return <IconBrandGithub size={18} />;
		case "instagram":
			return <IconBrandInstagram size={18} />;
		case "x":
		case "twitter":
			return <IconBrandX size={18} />;
		case "linkedin":
			return <IconBrandLinkedin size={18} />;
		case "email":
			return <IconMail size={18} />;
		default:
			return <IconWorld size={18} />;
	}
};

export const HeroPage = async (): Promise<React.ReactElement> => {
	const [heroData, socialLinks] = await Promise.all([
		getHero(),
		getSocialLinks(),
	]);

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between border-b border-neutral-200 bg-white text-neutral-900 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
			data-gsap-stack="true"
			id="hero"
		>
			{/* Grid Container wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				{/* Main Hero Body (2 Columns) */}
				<div className="grid flex-1 items-stretch lg:grid-cols-[1.1fr_0.9fr]">
					{/* Left Column */}
					<div className="flex flex-col justify-between border-neutral-200 border-r-0 lg:border-r dark:border-neutral-800">
						<div className="p-6 sm:p-10 md:p-12 lg:p-14">
							{/* Top Row: Prominent Hollow Greeting in 12 Global Languages */}
							<div className="flex items-center justify-between mb-4 sm:mb-6">
								<ZoomHollowText
									className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-normal dark:text-neutral-100"
									duration={0.6}
									fillColor="transparent"
									interval={2000}
									strokeColor="var(--color-foreground)"
									strokeWidth={1.5}
									words={[
										"Hello",
										"नमस्ते",
										"Bonjour",
										"¡Hola!",
										"こんにちは",
										"你好",
										"مرحبا",
										"안녕하세요",
										"Привет",
										"Γειά σου",
										"สวัสดี",
										"নমস্কার",
									]}
								/>
							</div>

							{/* Main Description Headline with Embedded Video Capsule */}
							<h1 className="mt-2 font-extrabold text-4xl text-neutral-900 tracking-tight leading-[1.12] sm:text-5xl md:text-6xl capitalize dark:text-white">
								{heroData.description}
								<span className="relative inline-block h-9 w-24 overflow-hidden rounded-full align-middle sm:h-12 sm:w-36 ml-4 sm:ml-6 ring-1 ring-neutral-300 dark:ring-neutral-700 shadow-md">
									<video
										autoPlay
										className="h-full w-full rounded-full object-cover"
										loop
										muted
										playsInline
									>
										<source src="/video/hero.mp4" type="video/mp4" />
										<source src="/video/hero-19-video.mp4" type="video/mp4" />
										<source src="/videos/hero-19-video.mp4" type="video/mp4" />
									</video>
								</span>
							</h1>

							{/* Name & Title Accent Row */}
							<div className="mt-4 flex flex-wrap items-center gap-x-2.5 font-semibold text-lg text-neutral-800 tracking-tight sm:text-xl md:text-2xl uppercase dark:text-neutral-200">
								<span>{heroData.title}</span>
								<span className="font-mono text-neutral-400 dark:text-neutral-500">—</span>
								<span className="font-mono text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
									SOFTWARE ARCHITECT
								</span>
							</div>

							{/* Subtitle Body Copy */}
							<p className="mt-5 max-w-lg font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
								{heroData.subtitle}
							</p>

							{/* Core Skills Quick Badges */}
							<div className="mt-6 flex flex-wrap gap-2">
								{["NEXT.JS 15", "TYPESCRIPT", "TAILWIND V4", "NODE.JS", "MONGODB"].map((skill) => (
									<span
										className="rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-neutral-600 tracking-wider uppercase transition hover:border-black dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 dark:hover:border-white"
										key={skill}
									>
										{skill}
									</span>
								))}
							</div>

							{/* CTA Action Row */}
							<div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
								<Link
									className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
									href="#projects"
								>
									<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-sm text-white sm:text-base dark:text-black">
										<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
											Check Projects
										</span>
										<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
											Check Projects
										</span>
									</span>
									<span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs dark:bg-black dark:text-white">
										<span className="inline-flex transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
											<IconArrowUpRight size={18} />
										</span>
										<span className="absolute inline-flex -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
											<IconArrowUpRight size={18} />
										</span>
									</span>
								</Link>

								<Link
									className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 font-mono text-xs font-semibold text-neutral-800 tracking-wider uppercase transition hover:border-black hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-neutral-900"
									href="#contact"
								>
									<span>Get In Touch</span>
									<IconArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
								</Link>
							</div>
						</div>

						{/* Metrics Section (Full-Bleed 3-Column Grid) */}
						<div className="w-full border-t border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
							<div className="grid grid-cols-3">
								{heroData.metrics.map((metric) => (
									<div
										className="group/metric flex flex-col justify-center border-r border-neutral-200 px-3 py-5 sm:px-8 sm:py-8 last:border-r-0 transition hover:bg-neutral-50/70 dark:border-neutral-800 dark:hover:bg-neutral-900/60"
										key={metric.label}
									>
										<div className="flex items-center gap-1.5 sm:gap-2">
											<span className="font-extrabold text-2xl text-neutral-900 tracking-tight sm:text-4xl md:text-5xl transition-transform duration-300 group-hover/metric:scale-105 dark:text-white">
												<CountUpValue value={metric.value} />
											</span>
											<span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100/90 font-bold text-emerald-600 text-[10px] shadow-2xs sm:h-7 sm:w-7 sm:text-xs dark:bg-emerald-950/80 dark:text-emerald-400">
												<IconArrowUp size={14} />
											</span>
										</div>
										<span className="mt-1.5 font-semibold text-[10px] text-neutral-500 uppercase tracking-wider sm:text-sm dark:text-neutral-400">
											{metric.label}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Hero Portrait */}
					<div className="flex items-center justify-center bg-white p-6 sm:p-8 md:p-10 dark:bg-neutral-950">
						<div className="relative aspect-4/5 w-full max-w-md overflow-hidden border border-neutral-200 bg-[#ea6936] dark:border-neutral-800">
							<Image
								alt={heroData.imageAlt}
								className="object-cover object-center"
								fill
								priority
								sizes="(max-width: 768px) 100vw, 450px"
								src={heroData.imageSrc}
							/>
						</div>
					</div>
				</div>

				{/* Bottom Toolbar Sub-bar */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-neutral-200 border-t px-6 py-4 sm:px-10 dark:border-neutral-800">
					<p className="font-medium text-xs text-neutral-800 sm:text-sm dark:text-neutral-300">
						{heroData.availability || "Develop, Deploy & Debug"}
					</p>

					<div className="flex flex-wrap items-center gap-2 sm:gap-3">
						{socialLinks.map((link: SocialLink) => (
							<a
								aria-label={link.label}
								className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:border-black hover:bg-neutral-100 transition dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-neutral-900"
								href={link.href}
								key={link.id}
								rel="noopener noreferrer"
								target="_blank"
							>
								{getSocialIcon(link.platform)}
							</a>
						))}
						<a
							className="rounded-full border border-neutral-200 px-5 py-2 font-medium text-xs text-neutral-800 hover:border-black hover:bg-neutral-100 transition sm:text-sm dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-neutral-900"
							href="#contact"
						>
							Download Resume
						</a>
					</div>
				</div>
			</div>

			{/* Bottom-Right Floating Theme Switch Button */}
			<div className="fixed right-6 bottom-6 z-50 flex items-center gap-2">
				<ThemeToggle />
			</div>
		</section>
	);
};
