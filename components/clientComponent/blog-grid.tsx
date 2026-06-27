"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog-post.interface";

interface BlogGridProps {
	posts: BlogPost[];
}

export const BlogGrid = ({ posts }: BlogGridProps): ReactElement => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const shouldReduceMotion = useReducedMotion();

	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{posts.map((post, index) => {
				const isActive = activeIndex === index;

				return (
					<motion.a
						className="group relative rounded-3xl border border-border/70 bg-card/80 p-5 transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
						href={post.href}
						key={post.id}
						onBlur={(): void => setActiveIndex(null)}
						onFocus={(): void => setActiveIndex(index)}
						onMouseEnter={(): void => setActiveIndex(index)}
						onMouseLeave={(): void => setActiveIndex(null)}
						rel="noreferrer"
						target="_blank"
					>
						<AnimatePresence>
							{isActive ? (
								<motion.span
									animate={{ opacity: 1 }}
									className="absolute inset-0 rounded-3xl bg-foreground/4 ring-1 ring-foreground/10"
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									layoutId="blog-card-hover"
									transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
								/>
							) : null}
						</AnimatePresence>
						<motion.div
							animate={{ y: isActive ? -2 : 0 }}
							className="relative z-10 flex h-full flex-col gap-4"
							transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
						>
							<div className="flex items-center justify-between text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
								<span>{post.date}</span>
								<span className="flex items-center gap-2 text-foreground/70">
									Read
									<IconArrowUpRight size={12} />
								</span>
							</div>
							<div className="space-y-2">
								<h3 className="font-semibold text-foreground text-lg">
									{post.title}
								</h3>
								<p className="text-muted-foreground text-sm">{post.excerpt}</p>
							</div>
							<div className="mt-auto flex items-center justify-between text-muted-foreground text-xs uppercase tracking-[0.3em]">
								<span
									className={cn(
										"transition-colors",
										isActive && "text-foreground"
									)}
								>
									Open post
								</span>
								<IconArrowUpRight
									className={cn(
										"transition-transform",
										isActive && "translate-x-0.5 -translate-y-0.5"
									)}
									size={14}
								/>
							</div>
						</motion.div>
					</motion.a>
				);
			})}
		</div>
	);
};
