"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const GSAPSectionConnector: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const flowerGroupRef = useRef<SVGGElement | null>(null);
	const leafVineRef = useRef<SVGPathElement | null>(null);
	const leavesRef = useRef<SVGGElement | null>(null);
	const driftingLeaf1Ref = useRef<HTMLDivElement | null>(null);
	const driftingLeaf2Ref = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (typeof window === "undefined" || !containerRef.current) return;

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (prefersReducedMotion) return;

			// 1. Geometric Flower Petal Mandala traveling down sections
			if (flowerGroupRef.current) {
				gsap.to(flowerGroupRef.current, {
					y: "85vh",
					rotate: 720,
					scale: 1.35,
					transformOrigin: "center center",
					ease: "none",
					scrollTrigger: {
						trigger: document.body,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.5,
					},
				});
			}

			// 2. Geometric Leaf Vine Stem Path drawing down sections
			if (leafVineRef.current) {
				const pathLength = leafVineRef.current.getTotalLength
					? leafVineRef.current.getTotalLength()
					: 3000;

				gsap.set(leafVineRef.current, {
					strokeDasharray: pathLength,
					strokeDashoffset: pathLength,
				});

				gsap.to(leafVineRef.current, {
					strokeDashoffset: 0,
					ease: "none",
					scrollTrigger: {
						trigger: document.body,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.2,
					},
				});
			}

			// 3. Geometric Leaves unfurling along the vine stem as you scroll
			if (leavesRef.current) {
				const individualLeaves = leavesRef.current.querySelectorAll(".geo-leaf");
				gsap.fromTo(
					individualLeaves,
					{ scale: 0, rotate: -45, opacity: 0 },
					{
						scale: 1,
						rotate: 0,
						opacity: 1,
						duration: 0.8,
						stagger: 0.15,
						transformOrigin: "center center",
						ease: "back.out(1.8)",
						scrollTrigger: {
							trigger: document.body,
							start: "top top",
							end: "bottom bottom",
							scrub: 0.4,
						},
					},
				);
			}

			// 4. Drifting Geometric Leaf Particles floating across sections
			if (driftingLeaf1Ref.current) {
				gsap.to(driftingLeaf1Ref.current, {
					y: "80vh",
					x: "-40px",
					rotate: 420,
					ease: "none",
					scrollTrigger: {
						trigger: document.body,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.8,
					},
				});
			}

			if (driftingLeaf2Ref.current) {
				gsap.to(driftingLeaf2Ref.current, {
					y: "75vh",
					x: "50px",
					rotate: -360,
					ease: "none",
					scrollTrigger: {
						trigger: document.body,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
					},
				});
			}
		},
		{ scope: containerRef },
	);

	return (
		<div
			className="pointer-events-none absolute inset-0 z-40 h-full w-full overflow-hidden"
			ref={containerRef}
		>
			{/* Left-Side Geometric Leaf Vine Stem SVG */}
			<svg
				className="h-full w-full"
				fill="none"
				preserveAspectRatio="none"
				viewBox="0 0 100 100"
			>
				{/* Continuous Organic Geometric Vine Line */}
				<path
					className="stroke-neutral-400/80 dark:stroke-neutral-600/80"
					d="M 5,0 C 12,10 2,20 8,30 C 14,40 2,50 8,60 C 14,70 2,80 8,90 C 12,95 5,100 5,100"
					ref={leafVineRef}
					strokeDasharray="4 4"
					strokeWidth="0.3"
					vectorEffect="non-scaling-stroke"
				/>

				{/* Unfurling Geometric Leaf Petals on the Stem */}
				<g ref={leavesRef}>
					{/* Leaf 1 */}
					<path className="geo-leaf fill-neutral-800/20 stroke-neutral-800 dark:fill-neutral-200/20 dark:stroke-neutral-200" d="M 8 15 C 2 10 2 20 8 15 Z" vectorEffect="non-scaling-stroke" />
					{/* Leaf 2 */}
					<path className="geo-leaf fill-neutral-800/20 stroke-neutral-800 dark:fill-neutral-200/20 dark:stroke-neutral-200" d="M 6 32 C 12 28 12 36 6 32 Z" vectorEffect="non-scaling-stroke" />
					{/* Leaf 3 */}
					<path className="geo-leaf fill-neutral-800/20 stroke-neutral-800 dark:fill-neutral-200/20 dark:stroke-neutral-200" d="M 8 48 C 2 42 2 54 8 48 Z" vectorEffect="non-scaling-stroke" />
					{/* Leaf 4 */}
					<path className="geo-leaf fill-neutral-800/20 stroke-neutral-800 dark:fill-neutral-200/20 dark:stroke-neutral-200" d="M 6 65 C 12 60 12 70 6 65 Z" vectorEffect="non-scaling-stroke" />
					{/* Leaf 5 */}
					<path className="geo-leaf fill-neutral-800/20 stroke-neutral-800 dark:fill-neutral-200/20 dark:stroke-neutral-200" d="M 8 82 C 2 76 2 88 8 82 Z" vectorEffect="non-scaling-stroke" />
				</g>
			</svg>

			{/* Floating Right-Side Geometric Flower Petal Mandala Traveling Down Sections */}
			<div className="absolute right-6 top-20 hidden md:block">
				<svg
					className="h-28 w-28 text-neutral-900 dark:text-neutral-100 opacity-40 dark:opacity-50"
					fill="none"
					viewBox="0 0 200 200"
				>
					<g ref={flowerGroupRef}>
						{/* 8-Petal Geometric Flower Core */}
						{/* Top Petal */}
						<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 100 100 C 80 40 120 40 100 100 Z" strokeWidth="1.5" />
						{/* Bottom Petal */}
						<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 100 100 C 80 160 120 160 100 100 Z" strokeWidth="1.5" />
						{/* Left Petal */}
						<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 100 100 C 40 80 40 120 100 100 Z" strokeWidth="1.5" />
						{/* Right Petal */}
						<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 100 100 C 160 80 160 120 100 100 Z" strokeWidth="1.5" />

						{/* Diagonal Petals */}
						<path className="stroke-neutral-600 dark:stroke-neutral-400" d="M 100 100 C 55 55 85 40 100 100 Z" strokeWidth="1.2" />
						<path className="stroke-neutral-600 dark:stroke-neutral-400" d="M 100 100 C 145 55 160 85 100 100 Z" strokeWidth="1.2" />
						<path className="stroke-neutral-600 dark:stroke-neutral-400" d="M 100 100 C 145 145 115 160 100 100 Z" strokeWidth="1.2" />
						<path className="stroke-neutral-600 dark:stroke-neutral-400" d="M 100 100 C 55 145 40 115 100 100 Z" strokeWidth="1.2" />

						{/* Flower Center Circle */}
						<circle className="fill-black dark:fill-white" cx="100" cy="100" r="6" />
						<circle className="stroke-neutral-400 dark:stroke-neutral-600" cx="100" cy="100" r="70" strokeDasharray="4 4" strokeWidth="1" />
					</g>
				</svg>
			</div>

			{/* Drifting Geometric Leaf Particle 1 (Right Side) */}
			<div className="absolute right-16 top-48 hidden lg:block" ref={driftingLeaf1Ref}>
				<svg className="h-12 w-12 text-neutral-800 dark:text-neutral-200 opacity-40" fill="none" viewBox="0 0 60 60">
					<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 30 5 C 10 20 10 40 30 55 C 50 40 50 20 30 5 Z" strokeWidth="1.5" />
					<line className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1" x1="30" x2="30" y1="10" y2="50" />
				</svg>
			</div>

			{/* Drifting Geometric Leaf Particle 2 (Left Side) */}
			<div className="absolute left-16 top-96 hidden lg:block" ref={driftingLeaf2Ref}>
				<svg className="h-10 w-10 text-neutral-800 dark:text-neutral-200 opacity-40" fill="none" viewBox="0 0 60 60">
					<path className="stroke-neutral-900 dark:stroke-neutral-100" d="M 5 30 C 20 10 40 10 55 30 C 40 50 20 50 5 30 Z" strokeWidth="1.5" />
					<line className="stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1" x1="10" x2="50" y1="30" y2="30" />
				</svg>
			</div>
		</div>
	);
};
