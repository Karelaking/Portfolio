"use client";

import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedIconProps {
	children: ReactNode;
	className?: string;
}

export const AnimatedIcon = ({
	children,
	className,
}: AnimatedIconProps): ReactElement => (
	<motion.span
		className={cn("inline-flex", className)}
		initial={{ y: 0 }}
		transition={{
			duration: 4,
			repeat: Number.POSITIVE_INFINITY,
			ease: "easeInOut",
		}}
		viewport={{ once: false, amount: 0.6 }}
		whileHover={{ scale: 1.08, rotate: 2 }}
		whileInView={{ y: [0, -3, 0] }}
	>
		{children}
	</motion.span>
);
