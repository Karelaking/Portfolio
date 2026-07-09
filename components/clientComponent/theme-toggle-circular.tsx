"use client";

import {
	type MouseEvent,
	type ReactElement,
	type ReactNode,
	useCallback,
	useRef,
} from "react";

export interface ThemeToggleCircularProps {
	/** The button element to wrap */
	children: ReactNode;
	/** Callback that performs the actual theme toggle */
	onToggle: () => void;
}

/**
 * Wraps a theme toggle button with a circular clip-path reveal animation
 * using the View Transition API. Falls back to an instant toggle in browsers
 * that don't support `startViewTransition`.
 */
export const ThemeToggleCircular = ({
	children,
	onToggle,
}: ThemeToggleCircularProps): ReactElement => {
	const triggerRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			// Fallback for browsers without View Transition API support
			if (
				!document.startViewTransition ||
				window.matchMedia("(prefers-reduced-motion: reduce)").matches
			) {
				onToggle();
				return;
			}

			// Get click coordinates for the circular origin
			const x = event.clientX;
			const y = event.clientY;

			// Calculate the maximum radius needed to cover the entire viewport
			const endRadius = Math.hypot(
				Math.max(x, window.innerWidth - x),
				Math.max(y, window.innerHeight - y),
			);

			const transition = document.startViewTransition(() => {
				onToggle();
			});

			transition.ready.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${endRadius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: 500,
						easing: "ease-in-out",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			});
		},
		[onToggle],
	);

	return (
		<div ref={triggerRef} onClick={handleClick} role="presentation">
			{children}
		</div>
	);
};
