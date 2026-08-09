"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GSAPEmptySpaceDecorationsProps {
	section:
		| "hero"
		| "about"
		| "expertise"
		| "experience"
		| "projects"
		| "writing"
		| "gallery"
		| "cta"
		| "contact";
}

/* ──────────────────────────────────────────────────────────────────
 * Inline SVG micro-components — pure geometry, no images.
 * Each is pointer-events-none, absolutely positioned, and sized
 * via the parent className.
 * ────────────────────────────────────────────────────────────── */

/** 6-petal flower with a centre dot */
const FlowerSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 80 80"
	>
		{/* Petals */}
		<path className="stroke-neutral-400 dark:stroke-neutral-600" d="M40 40C30 20 50 20 40 40Z" strokeWidth="1" />
		<path className="stroke-neutral-400 dark:stroke-neutral-600" d="M40 40C60 30 60 50 40 40Z" strokeWidth="1" />
		<path className="stroke-neutral-400 dark:stroke-neutral-600" d="M40 40C50 60 30 60 40 40Z" strokeWidth="1" />
		<path className="stroke-neutral-400 dark:stroke-neutral-600" d="M40 40C20 50 20 30 40 40Z" strokeWidth="1" />
		<path className="stroke-neutral-300 dark:stroke-neutral-700" d="M40 40C35 22 55 35 40 40Z" strokeWidth="0.8" />
		<path className="stroke-neutral-300 dark:stroke-neutral-700" d="M40 40C58 35 45 55 40 40Z" strokeWidth="0.8" />
		<path className="stroke-neutral-300 dark:stroke-neutral-700" d="M40 40C45 58 25 45 40 40Z" strokeWidth="0.8" />
		<path className="stroke-neutral-300 dark:stroke-neutral-700" d="M40 40C22 45 35 25 40 40Z" strokeWidth="0.8" />
		{/* Centre */}
		<circle className="fill-neutral-400 dark:fill-neutral-500" cx="40" cy="40" r="2.5" />
	</svg>
);

/** Pointed leaf with midrib */
const LeafSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 60 90"
	>
		<path className="fill-neutral-200/40 stroke-neutral-400 dark:fill-neutral-800/40 dark:stroke-neutral-600" d="M30 5C10 25 10 65 30 85C50 65 50 25 30 5Z" strokeWidth="1.2" />
		<line className="stroke-neutral-400 dark:stroke-neutral-500" strokeDasharray="3 3" strokeWidth="0.8" x1="30" x2="30" y1="12" y2="78" />
		{/* Veins */}
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="18" y1="35" y2="25" />
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="42" y1="35" y2="25" />
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="16" y1="50" y2="42" />
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="44" y1="50" y2="42" />
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="20" y1="65" y2="58" />
		<line className="stroke-neutral-300 dark:stroke-neutral-600" strokeWidth="0.6" x1="30" x2="40" y1="65" y2="58" />
	</svg>
);

/** Diamond / rhombus with inner cross */
const DiamondSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 60 60"
	>
		<rect className="stroke-neutral-400 dark:stroke-neutral-600" height="36" rx="0" strokeDasharray="4 4" strokeWidth="1.2" transform="rotate(45 30 30)" width="36" x="12" y="12" />
		<line className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.8" x1="30" x2="30" y1="12" y2="48" />
		<line className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="0.8" x1="12" x2="48" y1="30" y2="30" />
		<circle className="fill-neutral-400 dark:fill-neutral-500" cx="30" cy="30" r="2" />
	</svg>
);

/** Small hexagon */
const HexSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 60 60"
	>
		<polygon className="stroke-neutral-400 dark:stroke-neutral-600" points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5" strokeDasharray="5 3" strokeWidth="1" />
		<polygon className="stroke-neutral-300 dark:stroke-neutral-700" points="30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5" strokeWidth="0.8" />
		<circle className="fill-neutral-300 dark:fill-neutral-600" cx="30" cy="30" r="2" />
	</svg>
);

/** Crosshair / target reticle */
const CrosshairSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 50 50"
	>
		<circle className="stroke-neutral-400 dark:stroke-neutral-600" cx="25" cy="25" r="18" strokeDasharray="4 4" strokeWidth="1" />
		<circle className="stroke-neutral-300 dark:stroke-neutral-700" cx="25" cy="25" r="10" strokeWidth="0.8" />
		<line className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.8" x1="25" x2="25" y1="3" y2="47" />
		<line className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="0.8" x1="3" x2="47" y1="25" y2="25" />
		<circle className="fill-neutral-500 dark:fill-neutral-400" cx="25" cy="25" r="1.5" />
	</svg>
);

/** Dotted scatter cluster */
const DotClusterSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 80 60"
	>
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="10" cy="15" r="2" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="30" cy="8" r="1.5" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="50" cy="18" r="2.5" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="70" cy="10" r="1.8" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="20" cy="35" r="2" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="45" cy="42" r="1.5" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="65" cy="38" r="2.2" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="15" cy="52" r="1.5" />
		<circle className="fill-neutral-300 dark:fill-neutral-700" cx="55" cy="55" r="1.8" />
	</svg>
);

/** Mini triple-line geometric accent */
const LineAccentSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 60 40"
	>
		<line className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1" x1="0" x2="55" y1="10" y2="10" />
		<line className="stroke-neutral-300 dark:stroke-neutral-700" strokeDasharray="4 4" strokeWidth="1" x1="5" x2="60" y1="20" y2="20" />
		<line className="stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1" x1="0" x2="45" y1="30" y2="30" />
		<circle className="fill-neutral-400 dark:fill-neutral-500" cx="55" cy="10" r="2" />
		<circle className="fill-neutral-400 dark:fill-neutral-500" cx="60" cy="20" r="2" />
		<circle className="fill-neutral-400 dark:fill-neutral-500" cx="45" cy="30" r="2" />
	</svg>
);

/** Tiny triangle */
const TriangleSVG = ({ className }: { className: string }) => (
	<svg
		className={`pointer-events-none absolute ${className}`}
		fill="none"
		viewBox="0 0 40 40"
	>
		<polygon className="stroke-neutral-400 dark:stroke-neutral-600" points="20,4 38,36 2,36" strokeDasharray="3 3" strokeWidth="1" />
		<circle className="fill-neutral-300 dark:fill-neutral-600" cx="20" cy="25" r="1.5" />
	</svg>
);

export const GSAPEmptySpaceDecorations: React.FC<
	GSAPEmptySpaceDecorationsProps
> = ({ section }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (typeof window === "undefined" || !containerRef.current) return;

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (prefersReducedMotion) return;

			// Floating parallax drift for decorative SVGs
			const floatingItems =
				containerRef.current.querySelectorAll("[data-deco-float]");

			floatingItems.forEach((item: Element, idx: number) => {
				const speed = (idx % 3 + 1) * 0.15;
				const direction = idx % 2 === 0 ? -1 : 1;

				gsap.to(item, {
					y: direction * 35,
					rotate: direction * 12,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: speed,
					},
				});
			});

			// Reveal pop for decorative shapes
			const popItems =
				containerRef.current.querySelectorAll("[data-deco-pop]");
			if (popItems.length > 0) {
				gsap.fromTo(
					popItems,
					{ scale: 0, opacity: 0, rotate: -20 },
					{
						scale: 1,
						opacity: 1,
						rotate: 0,
						duration: 0.8,
						stagger: 0.12,
						ease: "back.out(1.8)",
						transformOrigin: "center center",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					},
				);
			}
		},
		{ scope: containerRef },
	);

	return (
		<div
			className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
			ref={containerRef}
		>
			{/* ───── HERO ───── */}
			{section === "hero" && (
				<>
					<FlowerSVG className="right-[5%] top-8 hidden h-16 w-16 opacity-30 lg:block" />
					<LeafSVG className="left-[3%] top-1/3 hidden h-14 w-10 -rotate-12 opacity-25 md:block" />
					<DiamondSVG className="right-[8%] bottom-28 hidden h-12 w-12 opacity-20 lg:block" />
					<DotClusterSVG className="left-[6%] bottom-16 hidden h-10 w-16 opacity-30 md:block" />
					<TriangleSVG className="right-[15%] top-1/4 hidden h-8 w-8 opacity-20 xl:block" />
					<div data-deco-float>
						<FlowerSVG className="right-[12%] top-[55%] hidden h-10 w-10 opacity-20 xl:block" />
					</div>
					<div data-deco-float>
						<LeafSVG className="left-[2%] bottom-[40%] hidden h-12 w-8 rotate-12 opacity-20 lg:block" />
					</div>
				</>
			)}

			{/* ───── ABOUT ───── */}
			{section === "about" && (
				<>
					<LeafSVG className="right-4 top-6 hidden h-16 w-12 rotate-6 opacity-25 md:block" />
					<FlowerSVG className="right-8 bottom-20 hidden h-14 w-14 opacity-25 lg:block" />
					<HexSVG className="left-4 bottom-8 hidden h-12 w-12 opacity-20 md:block" />
					<DiamondSVG className="right-[45%] top-4 hidden h-10 w-10 opacity-15 lg:block" />
					<DotClusterSVG className="left-[40%] bottom-4 hidden h-8 w-14 opacity-25 lg:block" />
					<div data-deco-float>
						<LeafSVG className="left-8 top-[35%] hidden h-14 w-10 -rotate-20 opacity-20 xl:block" />
					</div>
					<div data-deco-float>
						<CrosshairSVG className="right-12 top-[45%] hidden h-10 w-10 opacity-20 xl:block" />
					</div>
				</>
			)}

			{/* ───── EXPERTISE ───── */}
			{section === "expertise" && (
				<>
					<HexSVG className="right-6 top-8 hidden h-14 w-14 opacity-25 md:block" />
					<FlowerSVG className="left-6 bottom-16 hidden h-12 w-12 opacity-20 lg:block" />
					<LeafSVG className="right-10 bottom-24 hidden h-14 w-10 rotate-12 opacity-20 lg:block" />
					<TriangleSVG className="left-[45%] top-6 hidden h-8 w-8 opacity-15 xl:block" />
					<LineAccentSVG className="right-4 top-[40%] hidden h-8 w-14 opacity-25 lg:block" />
					<div data-deco-float>
						<DiamondSVG className="left-4 top-[30%] hidden h-10 w-10 opacity-20 xl:block" />
					</div>
					<DotClusterSVG className="right-[20%] bottom-8 hidden h-8 w-14 opacity-20 lg:block" />
				</>
			)}

			{/* ───── EXPERIENCE ───── */}
			{section === "experience" && (
				<>
					<FlowerSVG className="right-6 top-10 hidden h-14 w-14 opacity-25 md:block" />
					<LeafSVG className="right-8 bottom-20 hidden h-16 w-12 -rotate-6 opacity-20 lg:block" />
					<DiamondSVG className="right-[30%] top-8 hidden h-10 w-10 opacity-15 lg:block" />
					<CrosshairSVG className="right-4 top-[45%] hidden h-10 w-10 opacity-20 lg:block" />
					<DotClusterSVG className="right-12 bottom-8 hidden h-8 w-14 opacity-25 md:block" />
					<div data-deco-float>
						<LeafSVG className="right-[15%] top-[60%] hidden h-10 w-8 rotate-20 opacity-15 xl:block" />
					</div>
					<LineAccentSVG className="right-6 top-[25%] hidden h-6 w-12 opacity-20 xl:block" />
				</>
			)}

			{/* ───── PROJECTS ───── */}
			{section === "projects" && (
				<>
					<FlowerSVG className="left-4 top-10 hidden h-14 w-14 opacity-25 md:block" />
					<LeafSVG className="right-6 bottom-16 hidden h-16 w-12 rotate-8 opacity-20 lg:block" />
					<HexSVG className="left-6 bottom-20 hidden h-12 w-12 opacity-20 lg:block" />
					<TriangleSVG className="right-[40%] top-6 hidden h-8 w-8 opacity-15 xl:block" />
					<DotClusterSVG className="left-[35%] bottom-4 hidden h-8 w-14 opacity-25 lg:block" />
					<div data-deco-float>
						<DiamondSVG className="left-4 top-[40%] hidden h-10 w-10 opacity-15 xl:block" />
					</div>
					<div data-deco-float>
						<FlowerSVG className="right-4 top-[35%] hidden h-10 w-10 opacity-15 xl:block" />
					</div>
				</>
			)}

			{/* ───── WRITING ───── */}
			{section === "writing" && (
				<>
					<LeafSVG className="right-6 top-8 hidden h-16 w-12 -rotate-8 opacity-25 md:block" />
					<FlowerSVG className="left-6 bottom-16 hidden h-14 w-14 opacity-20 lg:block" />
					<CrosshairSVG className="right-10 bottom-24 hidden h-10 w-10 opacity-20 lg:block" />
					<LineAccentSVG className="left-4 top-[30%] hidden h-6 w-12 opacity-25 lg:block" />
					<DotClusterSVG className="right-[25%] bottom-6 hidden h-8 w-14 opacity-20 lg:block" />
					<div data-deco-float>
						<LeafSVG className="left-8 bottom-[35%] hidden h-12 w-8 rotate-15 opacity-15 xl:block" />
					</div>
					<div data-deco-pop>
						<HexSVG className="right-4 top-[50%] hidden h-10 w-10 opacity-15 xl:block" />
					</div>
				</>
			)}

			{/* ───── GALLERY ───── */}
			{section === "gallery" && (
				<>
					<FlowerSVG className="left-6 top-10 hidden h-14 w-14 opacity-25 md:block" />
					<LeafSVG className="right-4 top-8 hidden h-14 w-10 rotate-10 opacity-20 lg:block" />
					<DiamondSVG className="left-8 bottom-16 hidden h-12 w-12 opacity-20 lg:block" />
					<TriangleSVG className="right-[35%] bottom-6 hidden h-8 w-8 opacity-15 xl:block" />
					<DotClusterSVG className="left-[40%] top-4 hidden h-8 w-14 opacity-25 lg:block" />
					<div data-deco-float>
						<FlowerSVG className="right-8 top-[40%] hidden h-10 w-10 opacity-15 xl:block" />
					</div>
					<div data-deco-float>
						<LeafSVG className="left-4 top-[50%] hidden h-12 w-8 -rotate-15 opacity-15 xl:block" />
					</div>
				</>
			)}

			{/* ───── CTA ───── */}
			{section === "cta" && (
				<>
					<FlowerSVG className="left-8 top-6 hidden h-16 w-16 opacity-25 md:block" />
					<FlowerSVG className="right-8 bottom-6 hidden h-14 w-14 opacity-25 md:block" />
					<LeafSVG className="right-6 top-4 hidden h-14 w-10 -rotate-12 opacity-20 lg:block" />
					<LeafSVG className="left-6 bottom-4 hidden h-14 w-10 rotate-12 opacity-20 lg:block" />
					<DiamondSVG className="left-[25%] top-[20%] hidden h-10 w-10 opacity-15 xl:block" />
					<DiamondSVG className="right-[25%] bottom-[20%] hidden h-10 w-10 opacity-15 xl:block" />
					<DotClusterSVG className="left-[10%] bottom-[30%] hidden h-8 w-14 opacity-20 lg:block" />
					<DotClusterSVG className="right-[10%] top-[30%] hidden h-8 w-14 opacity-20 lg:block" />
				</>
			)}

			{/* ───── CONTACT ───── */}
			{section === "contact" && (
				<>
					<FlowerSVG className="right-6 top-8 hidden h-16 w-16 opacity-25 md:block" />
					<LeafSVG className="left-4 top-10 hidden h-16 w-12 rotate-6 opacity-20 lg:block" />
					<HexSVG className="right-8 bottom-20 hidden h-12 w-12 opacity-20 lg:block" />
					<CrosshairSVG className="left-6 bottom-16 hidden h-10 w-10 opacity-20 lg:block" />
					<LineAccentSVG className="right-[30%] top-4 hidden h-6 w-12 opacity-20 xl:block" />
					<DotClusterSVG className="left-[30%] bottom-4 hidden h-8 w-14 opacity-25 lg:block" />
					<div data-deco-float>
						<LeafSVG className="right-4 top-[40%] hidden h-12 w-8 -rotate-20 opacity-15 xl:block" />
					</div>
					<div data-deco-float>
						<FlowerSVG className="left-8 top-[55%] hidden h-10 w-10 opacity-15 xl:block" />
					</div>
				</>
			)}
		</div>
	);
};
