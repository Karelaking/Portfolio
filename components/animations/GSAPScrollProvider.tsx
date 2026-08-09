"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type React from "react";
import { useEffect, useRef } from "react";

// Register GSAP plugins safely on client
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GSAPScrollProviderProps {
	children: React.ReactNode;
}

export const GSAPScrollProvider: React.FC<GSAPScrollProviderProps> = ({
	children,
}) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const progressBarRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			if (typeof window === "undefined" || !containerRef.current) return;

			// Check reduced motion preference
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			// 1. Scroll Progress Bar Animation
			if (progressBarRef.current) {
				gsap.to(progressBarRef.current, {
					scaleX: 1,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.2,
					},
				});
			}

			if (prefersReducedMotion) return;

			// 2. Section Card Stacking Effect
			const stackedSections = gsap.utils.toArray(
				"[data-gsap-stack]",
			) as HTMLElement[];

			if (stackedSections.length > 1) {
				stackedSections.forEach((section: HTMLElement, idx: number) => {
					// Set dynamic z-index & sticky top-0 position
					section.style.zIndex = `${idx + 1}`;
					section.classList.add("sticky", "top-0");

					const nextSection = stackedSections[idx + 1];

					if (nextSection) {
						gsap.to(section, {
							scale: 0.94,
							opacity: 0.4,
							filter: "blur(4px)",
							transformOrigin: "top center",
							ease: "none",
							scrollTrigger: {
								trigger: nextSection,
								start: "top bottom",
								end: "top top",
								scrub: true,
							},
						});
					}
				});
			}

			// 3. Reveal Animations for Elements with [data-gsap-reveal]
			const revealElements = gsap.utils.toArray(
				"[data-gsap-reveal]",
			) as HTMLElement[];
			revealElements.forEach((el: HTMLElement) => {
				const animationType = el.getAttribute("data-gsap-reveal") || "fade-up";
				const delay = Number.parseFloat(
					el.getAttribute("data-gsap-delay") || "0",
				);

				let fromState: Record<string, unknown> = { opacity: 0, y: 40 };

				if (animationType === "fade-down") {
					fromState = { opacity: 0, y: -40 };
				} else if (animationType === "fade-left") {
					fromState = { opacity: 0, x: -50 };
				} else if (animationType === "fade-right") {
					fromState = { opacity: 0, x: 50 };
				} else if (animationType === "zoom-in") {
					fromState = { opacity: 0, scale: 0.85, y: 20 };
				} else if (animationType === "fade-in") {
					fromState = { opacity: 0 };
				}

				gsap.fromTo(
					el,
					fromState,
					{
						opacity: 1,
						x: 0,
						y: 0,
						scale: 1,
						duration: 0.9,
						delay,
						ease: "power3.out",
						scrollTrigger: {
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					},
				);
			});

			// 4. Stagger Animations for Containers with [data-gsap-stagger]
			const staggerContainers = gsap.utils.toArray(
				"[data-gsap-stagger]",
			) as HTMLElement[];
			staggerContainers.forEach((container: HTMLElement) => {
				const childrenSelector = container.getAttribute("data-gsap-children");
				const children = childrenSelector
					? container.querySelectorAll(childrenSelector)
					: container.children;

				if (children.length > 0) {
					gsap.fromTo(
						children,
						{ opacity: 0, y: 30, scale: 0.96 },
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.7,
							stagger: 0.08,
							ease: "power2.out",
							scrollTrigger: {
								trigger: container,
								start: "top 82%",
								toggleActions: "play none none reverse",
							},
						},
					);
				}
			});

			// Refresh ScrollTrigger after DOM setup
			ScrollTrigger.refresh();
		},
		{ scope: containerRef },
	);

	useEffect(() => {
		// Clean up ScrollTrigger on unmount
		return () => {
			ScrollTrigger.getAll().forEach((trigger: { kill: () => void }) =>
				trigger.kill(),
			);
		};
	}, []);

	return (
		<div className="relative w-full overflow-x-hidden" ref={containerRef}>
			{/* Sleek Top GSAP Scroll Progress Indicator Bar */}
			<div className="fixed top-0 left-0 z-100 h-1 w-full pointer-events-none bg-neutral-200/30 dark:bg-neutral-800/30">
				<div
					className="h-full w-full origin-left scale-x-0 bg-neutral-900 dark:bg-white transition-colors"
					ref={progressBarRef}
				/>
			</div>

			{children}
		</div>
	);
};
