"use client";

import { IconArrowUpRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type ReactElement, useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import type { WritingPost } from "@/types/writing-post.interface";

interface WritingPostsGridProps {
	posts: WritingPost[];
}

const PREVIEW_LENGTH = 140;
const MAX_COLLAPSED_TAGS = 4;

const buildPreview = (content: string): string => {
	const plainText = content.replace(/<[^>]*>/g, " ");
	const normalized = plainText.replace(/\s+/g, " ").trim();

	if (normalized.length <= PREVIEW_LENGTH) {
		return normalized;
	}

	return `${normalized.slice(0, PREVIEW_LENGTH)}...`;
};

export const WritingPostsGrid = ({
	posts,
}: WritingPostsGridProps): ReactElement => {
	const [activePost, setActivePost] = useState<WritingPost | null>(null);
	const [orientations, setOrientations] = useState<
		Record<string, "landscape" | "portrait">
	>({});
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

	const handleImageLoad = (
		postId: string,
		naturalWidth: number,
		naturalHeight: number
	): void => {
		const isLandscape = naturalWidth >= naturalHeight;
		setOrientations((prev) => {
			if (prev[postId]) return prev;
			return { ...prev, [postId]: isLandscape ? "landscape" : "portrait" };
		});
	};

	return (
		<>
			{/* Expandable Lightbox Reading Modal */}
			<AnimatePresence>
				{activePost ? (
					<>
						<motion.div
							animate={{ opacity: 1 }}
							className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
						/>

						<div className="fixed inset-0 z-60 grid place-items-center px-4 py-6">
							<motion.div
								className="relative flex h-[min(90vh,750px)] w-full max-w-3xl flex-col overflow-hidden rounded-none border border-neutral-800 bg-neutral-950 text-white shadow-2xl"
								layoutId={`writing-card-${activePost.id}-${id}`}
								ref={cardRef}
							>
								<button
									aria-label="Close writing post"
									className="absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition"
									onClick={(): void => setActivePost(null)}
									type="button"
								>
									<IconX size={18} />
								</button>

								<motion.div
									className="relative h-64 w-full overflow-hidden bg-black rounded-none"
									layoutId={`writing-image-${activePost.id}-${id}`}
								>
									<Image
										alt={activePost.coverImageAlt}
										className="h-64 w-full object-cover rounded-none"
										height={640}
										sizes="(min-width: 1024px) 768px, 100vw"
										src={activePost.coverImageSrc}
										width={1200}
									/>
								</motion.div>

								<div className="flex min-h-0 flex-1 flex-col gap-4 p-6 sm:p-8">
									<div className="space-y-3">
										<p className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
											PUBLISHED: {activePost.publishedAt}
										</p>
										<motion.h3
											className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase"
											layoutId={`writing-title-${activePost.id}-${id}`}
										>
											{activePost.title}
										</motion.h3>
										<div className="flex flex-wrap gap-2 pt-1">
											{activePost.tags.map((tag) => (
												<span
													className="rounded-none border border-neutral-800 bg-neutral-900 px-3 py-1 font-mono text-[10px] text-neutral-300 tracking-widest uppercase"
													key={tag}
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									<div
										className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-2 text-neutral-300 font-normal text-base leading-relaxed whitespace-pre-line border-t border-neutral-800 pt-4"
										dangerouslySetInnerHTML={{ __html: activePost.content }}
									/>
								</div>
							</motion.div>
						</div>
					</>
				) : null}
			</AnimatePresence>

			{/* Max 2-Column Grid Layout (Landscape = Both Columns, Portrait = 1 Column) */}
			<div className="grid grid-cols-1 sm:grid-cols-2 border-b border-neutral-200 bg-neutral-50/70 dark:border-neutral-800 dark:bg-neutral-900/60">
				{posts.map((post, idx) => {
					const detectedOrientation = orientations[post.id];
					const isLandscape = detectedOrientation
						? detectedOrientation === "landscape"
						: idx % 3 === 2;

					const formattedIndex = String(idx + 1).padStart(2, "0");
					const cleanExcerpt = buildPreview(post.content);

					return (
						<motion.button
							className={cn(
								"group relative flex flex-col justify-between border-b border-r border-neutral-200 bg-white p-0 text-left rounded-none cursor-pointer overflow-hidden transition hover:bg-neutral-100/70 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900",
								isLandscape ? "sm:col-span-2" : "col-span-1"
							)}
							key={post.id}
							layoutId={`writing-card-${post.id}-${id}`}
							onClick={(): void => setActivePost(post)}
							type="button"
							whileHover={{ y: shouldReduceMotion ? 0 : -2 }}
						>
							<div
								className={cn(
									"flex h-full w-full justify-between",
									isLandscape ? "flex-col sm:flex-row" : "flex-col"
								)}
							>
								{/* Cover Image Container */}
								<div
									className={cn(
										"relative overflow-hidden bg-neutral-900 rounded-none shrink-0",
										isLandscape
											? "w-full sm:w-1/2 aspect-16/10 sm:aspect-auto"
											: "w-full aspect-3/4"
									)}
								>
									<motion.div
										className="h-full w-full"
										layoutId={`writing-image-${post.id}-${id}`}
									>
										<Image
											alt={post.coverImageAlt}
											className="h-full w-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
											height={600}
											onLoad={(event): void => {
												const img = event.currentTarget;
												handleImageLoad(
													post.id,
													img.naturalWidth,
													img.naturalHeight
												);
											}}
											sizes={
												isLandscape
													? "(min-width: 768px) 50vw, 100vw"
													: "(min-width: 768px) 50vw, 100vw"
											}
											src={post.coverImageSrc}
											width={900}
										/>
									</motion.div>

									{/* Sharp Index Badge */}
									<div className="absolute top-4 left-4 z-10 rounded-none bg-black/80 backdrop-blur-xs px-3 py-1 font-mono text-xs font-semibold text-white tracking-widest uppercase border border-neutral-700">
										[ {formattedIndex} ]
									</div>
								</div>

								{/* Post Card Details */}
								<div
									className={cn(
										"flex flex-1 flex-col justify-between p-6 sm:p-8",
										isLandscape ? "sm:w-1/2" : "w-full"
									)}
								>
									<div>
										<p className="font-mono text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-2 dark:text-neutral-500">
											{post.publishedAt}
										</p>
										<motion.h3
											className={cn(
												"font-extrabold text-neutral-900 tracking-tight uppercase leading-snug group-hover:text-black transition dark:text-neutral-100 dark:group-hover:text-white",
												isLandscape ? "text-xl sm:text-3xl" : "text-xl sm:text-2xl"
											)}
											layoutId={`writing-title-${post.id}-${id}`}
										>
											{post.title}
										</motion.h3>
										<p className="mt-3 text-sm text-neutral-600 font-normal leading-relaxed line-clamp-3 dark:text-neutral-400">
											{cleanExcerpt}
										</p>
									</div>

									<div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between dark:border-neutral-800">
										<div className="flex flex-wrap gap-1.5">
											{post.tags.slice(0, MAX_COLLAPSED_TAGS).map((tag) => (
												<span
													className="rounded-none border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[10px] font-medium text-neutral-700 tracking-wider uppercase dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
													key={tag}
												>
													{tag}
												</span>
											))}
										</div>
										<span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-2xs transition-transform duration-300 group-hover:scale-110 shrink-0 ml-2 dark:bg-white dark:text-black">
											<IconArrowUpRight size={18} />
										</span>
									</div>
								</div>
							</div>
						</motion.button>
					);
				})}
			</div>
		</>
	);
};
