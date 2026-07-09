"use client";

import { motion } from "motion/react";
import type { ReactElement } from "react";
import { splitExperienceHighlights } from "@/lib/portfolio/experience-tech";
import type { ExperienceItem } from "@/types";

export interface ExperienceCardProps {
	index?: number;
	item: ExperienceItem;
}

export const ExperienceCard = ({
	item,
	index = 0,
}: ExperienceCardProps): ReactElement => {
	const parsedHighlights = splitExperienceHighlights(item.highlights);

	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/95 p-5 shadow-sm transition-all duration-300 hover:border-border/60 dark:bg-card/80 dark:hover:bg-card/95"
			initial={{ opacity: 0, y: 20 }}
			transition={{ delay: (index ?? 0) * 0.1, duration: 0.5 }}
			viewport={{ once: true, amount: 0.3 }}
			whileHover={{ y: -4 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{/* Animated gradient background on hover - subtle for both modes */}
			<motion.div
				className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 dark:from-primary/8"
				transition={{ duration: 0.4 }}
				whileHover={{ opacity: 1 }}
			/>

			{/* Animated glow effect on hover */}
			<motion.div
				className="absolute -inset-px rounded-2xl bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 blur dark:via-primary/10"
				transition={{ duration: 0.4 }}
				whileHover={{ opacity: 1 }}
			/>

			{/* Content */}
			<div className="relative z-10">
				{/* Header Section */}
				<div className="flex flex-col gap-2.5">
					{/* Role - Enhanced Typography */}
					<motion.div
						className="flex items-start justify-between gap-3"
						transition={{ duration: 0.2 }}
						whileHover={{ x: 2 }}
					>
						<div className="flex-1">
							<h2 className="font-bold text-foreground text-lg leading-snug">
								{item.role}
							</h2>
							<p className="mt-1 font-500 text-muted-foreground text-sm tracking-0.5">
								{item.company}
							</p>
						</div>
						<span className="shrink-0 font-medium text-muted-foreground/60 text-xs uppercase tracking-widest">
							{item.period}
						</span>
					</motion.div>
				</div>

				{/* Summary - Improved readability */}
				<p className="mt-3 line-clamp-2 text-foreground/80 text-sm leading-relaxed dark:text-foreground/75">
					{item.summary}
				</p>

				{/* Divider */}
				<div className="my-3 h-px w-8 bg-border/20 dark:bg-border/30" />

				{parsedHighlights.coreTech.length > 0 ? (
					<div className="mb-3 flex flex-wrap gap-1.5">
						{parsedHighlights.coreTech.slice(0, 3).map((tech) => (
							<span
								className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-[10px] text-primary uppercase tracking-[0.16em]"
								key={`${item.id}-core-${tech}`}
							>
								{tech}
							</span>
						))}
					</div>
				) : null}

				{/* Highlights - Enhanced Typography */}
				<motion.ul className="space-y-2">
					{parsedHighlights.highlights.slice(0, 2).map((highlight, i) => (
						<motion.li
							className="flex items-start gap-2.5 text-foreground/70 text-sm leading-relaxed dark:text-foreground/65"
							initial={{ opacity: 0, x: -8 }}
							key={`${item.id}-${highlight}`}
							transition={{
								delay: (index ?? 0) * 0.1 + i * 0.05,
								duration: 0.3,
							}}
							viewport={{ once: true, amount: 0.3 }}
							whileInView={{ opacity: 1, x: 0 }}
						>
							<motion.span
								className="mt-1.5 block shrink-0 font-bold text-primary/80 dark:text-primary/90"
								transition={{ duration: 0.2 }}
								whileHover={{ scale: 1.3, rotate: 10 }}
							>
								▪
							</motion.span>
							<span className="line-clamp-1 font-500">{highlight}</span>
						</motion.li>
					))}
					{parsedHighlights.highlights.length > 2 && (
						<motion.li
							className="pt-1 font-600 text-muted-foreground/70 text-xs uppercase tracking-0.5 dark:text-muted-foreground/60"
							initial={{ opacity: 0 }}
							transition={{ delay: (index ?? 0) * 0.1 + 0.15 }}
							whileInView={{ opacity: 1 }}
						>
							+{parsedHighlights.highlights.length - 2} more skills
						</motion.li>
					)}
				</motion.ul>
			</div>

			{/* Animated border highlight on hover */}
			<motion.div
				className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 dark:via-primary/90"
				initial={{ scaleX: 0, opacity: 0 }}
				transition={{ duration: 0.4 }}
				whileHover={{ scaleX: 1, opacity: 1 }}
			/>

			{/* Corner accent - top right */}
			<motion.div
				className="absolute -top-1 -right-1 h-12 w-12 rounded-full bg-linear-to-bl from-primary/5 to-transparent opacity-0 dark:from-primary/10"
				transition={{ duration: 0.3 }}
				whileHover={{ opacity: 1 }}
			/>
		</motion.div>
	);
};
