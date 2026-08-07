import {
	IconArrowUp,
	IconArrowUpRight,
	IconBrandGithub,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
	IconMail,
	IconMapPin,
	IconMessageCircle,
	IconRocket,
	IconWorld,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { getHero, getSocialLinks } from "@/lib/portfolio/queries";
import type { SocialLink } from "@/types/social-link.interface";
import { CountUpValue, HeaderMenuPopover } from "../clientComponent";

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
		<section className="relative flex min-h-screen w-full flex-col justify-between border-b border-neutral-200 bg-white text-neutral-900">
			{/* Grid Container wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Header Row (Single Unified Navbar) */}
				<header className="sticky top-0 z-40 flex flex-nowrap items-center justify-between gap-2 sm:gap-4 border-b border-neutral-200 bg-white/95 px-4 py-3 sm:px-10 sm:py-4 backdrop-blur-md">
					{/* Left: Brand & Location */}
					<div className="flex items-center gap-2.5 sm:gap-6 min-w-0">
						<Link className="flex items-center gap-2 sm:gap-2.5 min-w-0" href="/">
							<span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white">
								MK
							</span>
							<span className="font-extrabold text-sm sm:text-xl text-neutral-900 tracking-tight uppercase truncate max-w-[130px] min-[380px]:max-w-none">
								mradul katiyar
							</span>
						</Link>
						<div className="hidden md:flex items-center gap-1.5 font-medium text-xs sm:text-sm text-neutral-800 shrink-0">
							<IconMapPin className="text-neutral-700" size={16} />
							<span>{heroData.location}</span>
						</div>
					</div>

					{/* Right: Combined Action Capsule (Hire me + Menu) */}
					<div className="flex items-center shrink-0">
						<HeaderMenuPopover />
					</div>
				</header>

				{/* Main Hero Body (2 Columns) */}
				<div className="grid flex-1 items-stretch lg:grid-cols-[1.1fr_0.9fr]">
					{/* Left Column */}
					<div className="flex flex-col justify-between border-neutral-200 border-r-0 lg:border-r">
						<div className="p-6 sm:p-10 md:p-12 lg:p-14">
							<p className="font-medium text-lg text-neutral-900 tracking-tight sm:text-xl md:text-2xl uppercase">
								{heroData.title}
							</p>
							<h1 className="mt-3 font-extrabold text-4xl text-neutral-900 tracking-tight leading-[1.1] sm:mt-4 sm:text-5xl md:text-6xl capitalize">
								{heroData.description}
								<span className="relative inline-block h-9 w-24 overflow-hidden rounded-full align-middle sm:h-12 sm:w-36 ml-6">
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
							<p className="mt-6 max-w-lg font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
								{heroData.subtitle}
							</p>
							<Link
								className="group mt-8 inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 sm:mt-10"
								href="#projects"
							>
								<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-sm text-white sm:text-base">
									<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
										Check Projects
									</span>
									<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
										Check Projects
									</span>
								</span>
								<span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
									<span className="inline-flex transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6">
										<IconArrowUpRight size={18} />
									</span>
									<span className="absolute inline-flex -translate-x-6 translate-y-6 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
										<IconArrowUpRight size={18} />
									</span>
								</span>
							</Link>
						</div>

						{/* Metrics Section (Full-Bleed 3-Column Grid) */}
						<div className="w-full border-t border-b border-neutral-200 bg-white">
							<div className="grid grid-cols-3">
								{heroData.metrics.map((metric) => (
									<div
										className="flex flex-col justify-center border-r border-neutral-200 px-3 py-5 sm:px-8 sm:py-8 last:border-r-0 transition hover:bg-neutral-50/60"
										key={metric.label}
									>
										<div className="flex items-center gap-1.5 sm:gap-2">
											<span className="font-extrabold text-2xl text-neutral-900 tracking-tight sm:text-4xl md:text-5xl">
												<CountUpValue value={metric.value} />
											</span>
											<span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100/90 font-bold text-emerald-600 text-[10px] shadow-2xs sm:h-7 sm:w-7 sm:text-xs">
												<IconArrowUp size={14} />
											</span>
										</div>
										<span className="mt-1.5 font-semibold text-[10px] text-neutral-500 uppercase tracking-wider sm:text-sm">
											{metric.label}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Hero Portrait */}
					<div className="flex items-center justify-center bg-white p-6 sm:p-8 md:p-10">
						<div className="relative aspect-4/5 w-full max-w-md overflow-hidden  border border-neutral-200 bg-[#ea6936]">
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
				<div className="flex flex-wrap items-center justify-between gap-4 border-neutral-200 border-t px-6 py-4 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 sm:text-sm">
						{heroData.availability || "Develop, Deploy & Debug"}
					</p>

					<div className="flex flex-wrap items-center gap-2 sm:gap-3">
						{socialLinks.map((link: SocialLink) => (
							<a
								aria-label={link.label}
								className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:border-black hover:bg-neutral-100 transition"
								href={link.href}
								key={link.id}
								rel="noopener noreferrer"
								target="_blank"
							>
								{getSocialIcon(link.platform)}
							</a>
						))}
						<a
							className="rounded-full border border-neutral-200 px-5 py-2 font-medium text-xs text-neutral-800 hover:border-black hover:bg-neutral-100 transition sm:text-sm"
							href="#contact"
						>
							Download Resume
						</a>
					</div>
				</div>
			</div>

			{/* Bottom-Right Floating Action Widgets */}
			<div className="fixed right-6 bottom-6 z-50 flex items-center gap-2">
				<button
					aria-label="Launch quick action"
					className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-neutral-900 shadow-md hover:scale-105 transition cursor-pointer"
					type="button"
				>
					<IconRocket size={20} />
				</button>
				<button
					aria-label="Open chat"
					className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105 transition cursor-pointer"
					type="button"
				>
					<IconMessageCircle size={20} />
				</button>
			</div>
		</section>
	);
};
