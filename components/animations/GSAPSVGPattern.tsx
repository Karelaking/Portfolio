"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export type SVGPatternVariant =
	| "tech-grid"
	| "concentric-rings"
	| "timeline-path"
	| "geometric-mesh"
	| "crosshair-accent"
	| "spiral"
	| "geometric-lines"
	| "leaf-petal"
	| "flower-mandala";

interface GSAPSVGPatternProps {
	variant?: SVGPatternVariant;
	className?: string;
	opacity?: number;
}

export const GSAPSVGPattern: React.FC<GSAPSVGPatternProps> = ({
	variant = "tech-grid",
	className = "",
	opacity = 0.25,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);

	useGSAP(
		() => {
			if (typeof window === "undefined" || !svgRef.current) return;

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (prefersReducedMotion) return;

			if (variant === "flower-mandala") {
				const petals = svgRef.current.querySelectorAll(".flower-petal");
				const center = svgRef.current.querySelector(".flower-center");

				gsap.fromTo(
					petals,
					{ scale: 0, rotate: -90, opacity: 0 },
					{
						scale: 1,
						rotate: 0,
						opacity: 1,
						duration: 1.2,
						stagger: 0.08,
						ease: "back.out(1.7)",
						transformOrigin: "center center",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					},
				);

				if (center) {
					gsap.fromTo(
						center,
						{ scale: 0 },
						{
							scale: 1,
							duration: 0.6,
							ease: "back.out(2)",
							transformOrigin: "center center",
							scrollTrigger: {
								trigger: containerRef.current,
								start: "top 80%",
								toggleActions: "play none none reverse",
							},
						},
					);
				}
			} else if (variant === "leaf-petal") {
				const leaves = svgRef.current.querySelectorAll(".leaf-shape");
				gsap.fromTo(
					leaves,
					{ opacity: 0, y: 40, rotate: -30 },
					{
						opacity: 1,
						y: 0,
						rotate: 0,
						duration: 1,
						stagger: 0.12,
						ease: "power3.out",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					},
				);
			} else if (variant === "spiral") {
				const spiralPath = svgRef.current.querySelector(".spiral-path");
				const spiralGroup = svgRef.current.querySelector(".spiral-group");

				if (spiralPath) {
					const length = (spiralPath as SVGPathElement).getTotalLength
						? (spiralPath as SVGPathElement).getTotalLength()
						: 1000;

					gsap.set(spiralPath, {
						strokeDasharray: length,
						strokeDashoffset: length,
					});

					gsap.to(spiralPath, {
						strokeDashoffset: 0,
						duration: 1.5,
						ease: "power2.out",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					});
				}

				if (spiralGroup) {
					gsap.to(spiralGroup, {
						rotate: 360,
						transformOrigin: "center center",
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.5,
						},
					});
				}
			} else if (variant === "geometric-lines") {
				const lines = svgRef.current.querySelectorAll(".geo-line");
				const dots = svgRef.current.querySelectorAll(".geo-dot");

				gsap.fromTo(
					lines,
					{ opacity: 0, scaleX: 0 },
					{
						opacity: 1,
						scaleX: 1,
						duration: 1,
						stagger: 0.08,
						transformOrigin: "left center",
						ease: "power3.out",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					},
				);

				gsap.fromTo(
					dots,
					{ scale: 0, opacity: 0 },
					{
						scale: 1,
						opacity: 1,
						duration: 0.6,
						stagger: 0.06,
						ease: "back.out(2)",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					},
				);
			} else if (variant === "concentric-rings") {
				const ring1 = svgRef.current.querySelector(".ring-outer");
				const ring2 = svgRef.current.querySelector(".ring-inner");

				if (ring1) {
					gsap.to(ring1, {
						rotate: 180,
						transformOrigin: "center center",
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.5,
						},
					});
				}

				if (ring2) {
					gsap.to(ring2, {
						rotate: -240,
						transformOrigin: "center center",
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.5,
						},
					});
				}
			} else if (variant === "tech-grid") {
				const lines = svgRef.current.querySelectorAll(".grid-line");
				const nodes = svgRef.current.querySelectorAll(".grid-node");

				if (lines.length > 0) {
					gsap.fromTo(
						lines,
						{ strokeDashoffset: 400 },
						{
							strokeDashoffset: 0,
							duration: 1.2,
							stagger: 0.05,
							ease: "power2.out",
							scrollTrigger: {
								trigger: containerRef.current,
								start: "top 80%",
								toggleActions: "play none none reverse",
							},
						},
					);
				}

				if (nodes.length > 0) {
					gsap.fromTo(
						nodes,
						{ scale: 0, opacity: 0 },
						{
							scale: 1,
							opacity: 1,
							duration: 0.6,
							stagger: 0.04,
							ease: "back.out(1.7)",
							transformOrigin: "center center",
							scrollTrigger: {
								trigger: containerRef.current,
								start: "top 75%",
								toggleActions: "play none none reverse",
							},
						},
					);
				}
			} else if (variant === "geometric-mesh") {
				const paths = svgRef.current.querySelectorAll(".mesh-polygon");
				gsap.to(paths, {
					y: (i: number) => (i % 2 === 0 ? -30 : 30),
					rotate: (i: number) => (i % 2 === 0 ? 15 : -15),
					transformOrigin: "center center",
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: 0.8,
					},
				});
			} else if (variant === "timeline-path") {
				const path = svgRef.current.querySelector(".timeline-trace");
				if (path) {
					const pathLength = (path as SVGPathElement).getTotalLength
						? (path as SVGPathElement).getTotalLength()
						: 600;

					gsap.set(path, {
						strokeDasharray: pathLength,
						strokeDashoffset: pathLength,
					});

					gsap.to(path, {
						strokeDashoffset: 0,
						ease: "none",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 70%",
							end: "bottom 30%",
							scrub: 0.4,
						},
					});
				}
			} else if (variant === "crosshair-accent") {
				const crosshairs = svgRef.current.querySelectorAll(".crosshair");
				gsap.fromTo(
					crosshairs,
					{ scale: 0, rotate: -45 },
					{
						scale: 1,
						rotate: 90,
						duration: 0.8,
						stagger: 0.1,
						ease: "power3.out",
						transformOrigin: "center center",
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 85%",
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
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
			ref={containerRef}
			style={{ opacity }}
		>
			{variant === "flower-mandala" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 300 300"
				>
					<g transform="translate(150, 150)">
						{/* 8 Geometric Petals */}
						<path className="flower-petal stroke-neutral-900 dark:stroke-neutral-100" d="M 0 0 C -20 -60 20 -60 0 0 Z" strokeWidth="1.5" />
						<path className="flower-petal stroke-neutral-900 dark:stroke-neutral-100" d="M 0 0 C 60 -20 60 20 0 0 Z" strokeWidth="1.5" />
						<path className="flower-petal stroke-neutral-900 dark:stroke-neutral-100" d="M 0 0 C -20 60 20 60 0 0 Z" strokeWidth="1.5" />
						<path className="flower-petal stroke-neutral-900 dark:stroke-neutral-100" d="M 0 0 C -60 -20 -60 20 0 0 Z" strokeWidth="1.5" />
						<path className="flower-petal stroke-neutral-600 dark:stroke-neutral-400" d="M 0 0 C 35 -35 50 -15 0 0 Z" strokeWidth="1.2" />
						<path className="flower-petal stroke-neutral-600 dark:stroke-neutral-400" d="M 0 0 C 35 35 15 50 0 0 Z" strokeWidth="1.2" />
						<path className="flower-petal stroke-neutral-600 dark:stroke-neutral-400" d="M 0 0 C -35 35 -50 15 0 0 Z" strokeWidth="1.2" />
						<path className="flower-petal stroke-neutral-600 dark:stroke-neutral-400" d="M 0 0 C -35 -35 -15 -50 0 0 Z" strokeWidth="1.2" />
						<circle className="flower-center fill-black dark:fill-white" cx="0" cy="0" r="8" />
					</g>
				</svg>
			)}

			{variant === "leaf-petal" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 400 300"
				>
					<g>
						<path className="leaf-shape stroke-neutral-800 dark:stroke-neutral-200" d="M 50 150 C 30 70 120 70 150 150 C 120 230 30 230 50 150 Z" strokeWidth="1.5" />
						<line className="leaf-shape stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1" x1="50" x2="150" y1="150" y2="150" />

						<path className="leaf-shape stroke-neutral-800 dark:stroke-neutral-200" d="M 220 150 C 200 70 290 70 320 150 C 290 230 200 230 220 150 Z" strokeWidth="1.5" />
						<line className="leaf-shape stroke-neutral-500 dark:stroke-neutral-400" strokeWidth="1" x1="220" x2="320" y1="150" y2="150" />
					</g>
				</svg>
			)}

			{variant === "spiral" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 400 400"
				>
					<g className="spiral-group" transform-origin="200 200">
						{/* Golden Archimedean Spiral */}
						<path
							className="spiral-path stroke-neutral-800 dark:stroke-neutral-200"
							d="M 200 200 A 15 15 0 0 1 215 200 A 30 30 0 0 1 185 200 A 45 45 0 0 1 230 200 A 60 60 0 0 1 170 200 A 75 75 0 0 1 245 200 A 90 90 0 0 1 155 200 A 105 105 0 0 1 260 200 A 120 120 0 0 1 140 200 A 135 135 0 0 1 275 200 A 150 150 0 0 1 125 200"
							strokeDasharray="6 6"
							strokeWidth="1.5"
						/>
						<circle className="fill-black dark:fill-white" cx="200" cy="200" r="5" />
						<circle className="stroke-neutral-400 dark:stroke-neutral-600" cx="200" cy="200" r="160" strokeDasharray="12 12" strokeWidth="1" />
					</g>
				</svg>
			)}

			{variant === "geometric-lines" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 600 400"
				>
					<g>
						{/* Intersecting Diagonal Geometric Lines */}
						<line className="geo-line stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1.5" x1="0" x2="600" y1="50" y2="350" />
						<line className="geo-line stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1.5" x1="0" x2="600" y1="150" y2="250" />
						<line className="geo-line stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1.5" x1="0" x2="600" y1="250" y2="150" />
						<line className="geo-line stroke-neutral-400 dark:stroke-neutral-600" strokeWidth="1.5" x1="0" x2="600" y1="350" y2="50" />

						{/* Sine Wave Curve Line */}
						<path
							className="geo-line stroke-neutral-800 dark:stroke-neutral-200"
							d="M 0,200 C 150,50 300,350 450,200 C 525,125 575,175 600,200"
							strokeDasharray="6 6"
							strokeWidth="2"
						/>

						{/* Geometric Node Intersections */}
						<circle className="geo-dot fill-black dark:fill-white" cx="150" cy="125" r="4" />
						<circle className="geo-dot fill-black dark:fill-white" cx="300" cy="200" r="5" />
						<circle className="geo-dot fill-black dark:fill-white" cx="450" cy="275" r="4" />
					</g>
				</svg>
			)}

			{variant === "concentric-rings" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 500 500"
				>
					<circle
						className="ring-outer stroke-neutral-400 dark:stroke-neutral-600"
						cx="250"
						cy="250"
						r="200"
						strokeDasharray="12 12"
						strokeWidth="1.5"
					/>
					<circle
						className="ring-inner stroke-neutral-500 dark:stroke-neutral-500"
						cx="250"
						cy="250"
						r="140"
						strokeDasharray="6 6"
						strokeWidth="1.5"
					/>
					<circle
						className="stroke-neutral-400 dark:stroke-neutral-600"
						cx="250"
						cy="250"
						r="80"
						strokeWidth="1"
					/>
					<path
						className="stroke-neutral-400 dark:stroke-neutral-500"
						d="M250 30 V470 M30 250 H470"
						strokeDasharray="4 8"
						strokeWidth="1"
					/>
				</svg>
			)}

			{variant === "tech-grid" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 800 600"
				>
					<defs>
						<pattern
							height="60"
							id="techGridPattern"
							patternUnits="userSpaceOnUse"
							width="60"
						>
							<path
								className="grid-line stroke-neutral-300 dark:stroke-neutral-800"
								d="M 60 0 L 0 0 0 60"
								strokeDasharray="400"
								strokeWidth="1"
							/>
						</pattern>
					</defs>
					<rect fill="url(#techGridPattern)" height="100%" width="100%" />

					{/* Intersect Node Points */}
					<circle className="grid-node fill-black dark:fill-white" cx="120" cy="120" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="360" cy="120" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="600" cy="120" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="240" cy="300" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="480" cy="300" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="180" cy="480" r="3.5" />
					<circle className="grid-node fill-black dark:fill-white" cx="540" cy="480" r="3.5" />

					{/* Technical Target Reticles */}
					<path
						className="grid-line stroke-neutral-400 dark:stroke-neutral-600"
						d="M105 120 H135 M120 105 V135"
						strokeDasharray="400"
						strokeWidth="1.5"
					/>
					<path
						className="grid-line stroke-neutral-400 dark:stroke-neutral-600"
						d="M585 120 H615 M600 105 V135"
						strokeDasharray="400"
						strokeWidth="1.5"
					/>
				</svg>
			)}

			{variant === "geometric-mesh" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 600 600"
				>
					<g className="stroke-neutral-300 dark:stroke-neutral-700" strokeWidth="1">
						<polygon className="mesh-polygon" points="150,100 250,50 350,100 250,150" />
						<polygon className="mesh-polygon" points="250,150 350,100 350,220 250,270" />
						<polygon className="mesh-polygon" points="150,100 250,150 250,270 150,220" />
						<polygon className="mesh-polygon" points="350,300 450,250 550,300 450,350" />
						<polygon className="mesh-polygon" points="450,350 550,300 550,420 450,470" />
						<polygon className="mesh-polygon" points="350,300 450,350 450,470 350,420" />
					</g>
				</svg>
			)}

			{variant === "timeline-path" && (
				<svg
					className="h-full w-full"
					fill="none"
					preserveAspectRatio="none"
					ref={svgRef}
					viewBox="0 0 100 600"
				>
					<path
						className="timeline-trace stroke-neutral-400 dark:stroke-neutral-600"
						d="M50 0 V150 L20 250 V380 L80 480 V600"
						strokeDasharray="6 6"
						strokeWidth="2"
					/>
				</svg>
			)}

			{variant === "crosshair-accent" && (
				<svg
					className="h-full w-full"
					fill="none"
					ref={svgRef}
					viewBox="0 0 400 400"
				>
					<g className="crosshair stroke-neutral-400 dark:stroke-neutral-500" strokeWidth="1.5">
						<circle cx="80" cy="80" r="24" strokeDasharray="4 4" />
						<path d="M80 48 V112 M48 80 H112" />
					</g>
					<g className="crosshair stroke-neutral-400 dark:stroke-neutral-500" strokeWidth="1.5">
						<circle cx="320" cy="320" r="30" strokeDasharray="6 6" />
						<path d="M320 280 V360 M280 320 H360" />
					</g>
				</svg>
			)}
		</div>
	);
};
