"use client";

import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FadeInProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export const FadeIn = ({
	children,
	className,
	delay = 0,
}: FadeInProps): ReactElement => (
	<motion.div
		className={cn(className)}
		initial={{ opacity: 0, y: 12 }}
		transition={{ duration: 0.5, ease: "easeOut", delay }}
		viewport={{ once: false, amount: 0.4 }}
		whileInView={{ opacity: 1, y: 0 }}
	>
		{children}
	</motion.div>
);
