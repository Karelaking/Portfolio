"use client";

import type React from "react";

interface GSAPRevealProps {
	children: React.ReactNode;
	variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade-in";
	delay?: number;
	className?: string;
}

export const GSAPReveal: React.FC<GSAPRevealProps> = ({
	children,
	variant = "fade-up",
	delay = 0,
	className = "",
}) => {
	return (
		<div
			className={className}
			data-gsap-delay={delay}
			data-gsap-reveal={variant}
		>
			{children}
		</div>
	);
};
