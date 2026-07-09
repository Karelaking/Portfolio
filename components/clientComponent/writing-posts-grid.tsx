"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type ReactElement, useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import type { WritingPost } from "@/types/writing-post.interface";

interface WritingPostsGridProps {
	posts: WritingPost[];
}

const PREVIEW_LENGTH = 120;
const MAX_COLLAPSED_TAGS = 3;

const buildPreview = (content: string): string => {
	const normalized = content.replace(/\s+/g, " ").trim();

	if (normalized.length <= PREVIEW_LENGTH) {
		return normalized;
	}

	return `${normalized.slice(0, PREVIEW_LENGTH)}...`;
};

export const WritingPostsGrid = ({
	posts,
}: WritingPostsGridProps): ReactElement => {
	const [activePost, setActivePost] = useState<WritingPost | null>(null);
	const id = useId();
	const cardRef = useRef<HTMLDivElement>(null);
	const shouldReduceMotion = useReducedMotion();

	useOutsideClick(cardRef, () => setActivePost(null));

	useEffect((): (() => void) => {
		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				setActivePost(null);
			}
		};

		window.addEventListener("keydown", onKeyDown);

		if (activePost) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return (): void => {
			window.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "auto";
		};
	}, [activePost]);

	return (
		<>
			<AnimatePresence>
				{activePost ? (
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
					/>
				) : null}
			</AnimatePresence>

			<AnimatePresence>
				{activePost ? (
					<div className="fixed inset-0 z-60 grid place-items-center px-4 py-6">
						<motion.div
							className="relative flex h-[min(90vh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-card"
							layoutId={`writing-card-${activePost.id}-${id}`}
							ref={cardRef}
						>
							<button
								aria-label="Close writing post"
								className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90 text-lg leading-none"
								onClick={(): void => setActivePost(null)}
								type="button"
							>
								×
							</button>

							<motion.div layoutId={`writing-image-${activePost.id}-${id}`}>
								<Image
									alt={activePost.coverImageAlt}
									className="h-64 w-full object-cover"
									height={640}
									sizes="(min-width: 1024px) 768px, 100vw"
									src={activePost.coverImageSrc}
									width={1200}
								/>
							</motion.div>

							<div className="flex min-h-0 flex-1 flex-col gap-4 p-6">
								<div className="space-y-3">
									<p className="text-[11px] text-muted-foreground uppercase tracking-[0.3em]">
										{activePost.publishedAt}
									</p>
									<motion.h3
										className="font-semibold text-2xl"
										layoutId={`writing-title-${activePost.id}-${id}`}
									>
										{activePost.title}
									</motion.h3>
									<div className="flex flex-wrap gap-2">
										{activePost.tags.map((tag) => (
											<span
												className="rounded-full border border-border/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
												key={tag}
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								<div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-muted-foreground text-sm leading-relaxed">
									{/* Render content as HTML for formatted display */}
									<div
										dangerouslySetInnerHTML={{ __html: activePost.content }}
									/>
								</div>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>

			<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
				{posts.map((post) => (
					<motion.button
						className="h-full border-border/70 bg-card text-left"
						key={post.id}
						layoutId={`writing-card-${post.id}-${id}`}
						onClick={(): void => setActivePost(post)}
						type="button"
						whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
					>
						<div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70">
							<motion.div layoutId={`writing-image-${post.id}-${id}`}>
								<Image
									alt={post.coverImageAlt}
									className="h-52 w-full object-cover"
									height={400}
									sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
									src={post.coverImageSrc}
									width={800}
								/>
							</motion.div>

							<div className="flex flex-1 flex-col gap-4 p-5">
								<p className="text-[10px] text-muted-foreground uppercase tracking-[0.28em]">
									{post.publishedAt}
								</p>
								<motion.h3
									className="min-h-14 overflow-hidden font-semibold text-lg [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]"
									layoutId={`writing-title-${post.id}-${id}`}
								>
									{post.title}
								</motion.h3>
								<div
									className="min-h-16 overflow-hidden text-muted-foreground text-sm leading-relaxed [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]"
									dangerouslySetInnerHTML={{
										__html: buildPreview(post.content),
									}}
								/>

								<div className="mt-auto min-h-14 overflow-hidden">
									<div className="flex flex-wrap gap-2">
										{post.tags.slice(0, MAX_COLLAPSED_TAGS).map((tag) => (
											<span
												className={cn(
													"rounded-full border border-border/70 px-2.5 py-1 text-[10px]",
													"uppercase tracking-[0.2em]"
												)}
												key={tag}
											>
												{tag}
											</span>
										))}

										{post.tags.length > MAX_COLLAPSED_TAGS ? (
											<span
												className={cn(
													"rounded-full border border-border/70 px-2.5 py-1 text-[10px]",
													"uppercase tracking-[0.2em]"
												)}
											>
												+{post.tags.length - MAX_COLLAPSED_TAGS}
											</span>
										) : null}
									</div>
								</div>
							</div>
						</div>
					</motion.button>
				))}
			</div>
		</>
	);
};
