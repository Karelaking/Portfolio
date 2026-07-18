"use client";

import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ZoomHollowTextProps {
	className?: string;
	duration?: number;
	fillColor?: string;
	interval?: number;
	strokeColor?: string;
	strokeWidth?: number;
	words: string[];
}

export function ZoomHollowText({
	words,
	className = "",
	duration = 0.8,
	interval = 2500,
	strokeWidth = 2,
	fillColor = "transparent",
	strokeColor = "currentColor",
}: ZoomHollowTextProps): React.ReactElement {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % words.length);
		}, interval);
		return () => clearInterval(timer);
	}, [words.length, interval]);

	return (
		<div className={cn("relative inline-block", className)}>
			<AnimatePresence mode="wait">
				<motion.span
					animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
					className="block"
					exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)" }}
					initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
					key={words[index]}
					style={{
						WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
						WebkitTextFillColor: fillColor,
						paintOrder: "stroke fill",
					}}
					transition={{
						duration,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}
