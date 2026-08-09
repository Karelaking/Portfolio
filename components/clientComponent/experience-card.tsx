"use client";

import { IconCheck } from "@tabler/icons-react";
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
	const isCurrent = item.period.toLowerCase().includes("present") || item.period.toLowerCase().includes("current");
	const formattedIndex = String(index + 1).padStart(2, "0");

	return (
		<motion.div
			className="group relative flex flex-col rounded-none border border-neutral-200 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-black sm:p-6 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-white"
			initial={{ opacity: 0, y: 20 }}
			transition={{ delay: (index ?? 0) * 0.1, duration: 0.5 }}
			viewport={{ once: true, amount: 0.3 }}
			whileInView={{ opacity: 1, y: 0 }}
		>
			{/* Corner Node Dots */}
			<span className="absolute -top-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -top-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -bottom-1 -left-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
			<span className="absolute -bottom-1 -right-1 z-10 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

			{/* Compact Header Line */}
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div className="flex flex-wrap items-center gap-3">
					<span className="font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase dark:text-neutral-500">
						[ {formattedIndex} ]
					</span>
					<h3 className="font-extrabold text-xl sm:text-2xl text-neutral-900 tracking-tight uppercase transition-colors group-hover:text-black dark:text-neutral-100 dark:group-hover:text-white">
						{item.role}
					</h3>
					<span className="rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 font-mono font-semibold text-xs text-neutral-800 uppercase tracking-wider dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
						@ {item.company}
					</span>
				</div>

				<div className="flex items-center gap-3 shrink-0">
					{isCurrent && (
						<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 uppercase tracking-wider dark:border-emerald-900/80 dark:bg-emerald-950/60 dark:text-emerald-400">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
							<span>ACTIVE</span>
						</span>
					)}
					<span className="font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
						{item.period}
					</span>
				</div>
			</div>

			{/* Summary Description */}
			<p className="mt-3 font-normal text-sm sm:text-base text-neutral-600 leading-relaxed dark:text-neutral-400">
				{item.summary}
			</p>

			{/* Compact Inline Accomplishment Pills */}
			{parsedHighlights.highlights.length > 0 && (
				<div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap items-center gap-2">
					<span className="font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase mr-1 dark:text-neutral-500">
						KEY HIGHLIGHTS:
					</span>
					{parsedHighlights.highlights.map((highlight) => (
						<span
							className="inline-flex items-center gap-1.5 rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-700 uppercase tracking-wider transition hover:border-black hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-neutral-900"
							key={`${item.id}-hl-${highlight}`}
						>
							<IconCheck size={13} className="text-black dark:text-white shrink-0" />
							<span>{highlight}</span>
						</span>
					))}
				</div>
			)}
		</motion.div>
	);
};
