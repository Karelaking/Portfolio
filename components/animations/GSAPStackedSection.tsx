"use client";

import type React from "react";

interface GSAPStackedSectionProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
	stickyTop?: string;
}

export const GSAPStackedSection: React.FC<GSAPStackedSectionProps> = ({
	children,
	className = "",
	id,
}) => {
	return (
		<section
			className={`sticky top-0 z-10 will-change-transform transition-all duration-300 ${className}`}
			data-gsap-stack="true"
			id={id}
		>
			{children}
		</section>
	);
};
