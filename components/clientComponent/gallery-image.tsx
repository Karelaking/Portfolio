"use client";

import { IconArrowUpRight, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryImageProps {
	alt: string;
	className?: string;
	height?: number;
	index?: number;
	loading?: "lazy" | "eager";
	onOrientationDetect?: (orientation: "landscape" | "portrait") => void;
	priority?: boolean;
	sizes?: string;
	src: string;
	width?: number;
}

export const GalleryImage = ({
	src,
	alt,
	index = 1,
	sizes = "(min-width: 768px) 50vw, 100vw",
	width = 800,
	height = 600,
	className,
	priority = false,
	loading = "eager",
	onOrientationDetect,
}: GalleryImageProps): ReactElement => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLandscape, setIsLandscape] = useState<boolean>(index % 3 === 0);

	useEffect((): (() => void) => {
		if (!isOpen) {
			return () => undefined;
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return (): void => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const formattedIndex = String(index).padStart(2, "0");

	return (
		<>
			<motion.div
				className={cn(
					"group relative w-full overflow-hidden border-b border-r border-neutral-200 bg-black cursor-pointer rounded-none",
					isLandscape ? "sm:col-span-2" : "col-span-1"
				)}
				initial={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: index * 0.1 }}
				viewport={{ once: true }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<button
					aria-label={`View ${alt}`}
					className="block h-full w-full cursor-pointer p-0 text-left rounded-none"
					onClick={(): void => setIsOpen(true)}
					type="button"
				>
					<div
						className={cn(
							"relative w-full overflow-hidden bg-neutral-900 rounded-none",
							isLandscape ? "aspect-video sm:aspect-16/10" : "aspect-3/4"
						)}
					>
						{!loaded && (
							<div className="absolute inset-0 animate-pulse bg-neutral-800" />
						)}
						<Image
							alt={alt}
							className={cn(
								"h-full w-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90",
								className,
								loaded ? "opacity-100" : "opacity-0"
							)}
							height={height}
							loading={loading}
							onLoad={(event): void => {
								setLoaded(true);
								const img = event.currentTarget;
								if (img.naturalWidth && img.naturalHeight) {
									const orientation =
										img.naturalWidth >= img.naturalHeight
											? "landscape"
											: "portrait";
									setIsLandscape(orientation === "landscape");
									if (onOrientationDetect) {
										onOrientationDetect(orientation);
									}
								}
							}}
							priority={priority}
							quality={90}
							sizes={isLandscape ? "(min-width: 768px) 100vw, 100vw" : sizes}
							src={src}
							width={width}
						/>

						{/* Sharp Monochromatic Hover Overlay */}
						<div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/80 via-black/30 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="flex items-center justify-between">
								<span className="font-mono text-xs font-semibold text-neutral-300 tracking-widest uppercase">
									[ {formattedIndex} ]
								</span>
								<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform duration-300 group-hover:scale-110">
									<IconArrowUpRight size={18} />
								</span>
							</div>
							<div>
								<p className="font-extrabold text-lg text-white tracking-tight uppercase">
									{alt}
								</p>
								<p className="mt-1 font-medium text-xs text-neutral-300 tracking-widest uppercase">
									CLICK TO EXPAND
								</p>
							</div>
						</div>
					</div>
				</button>
			</motion.div>

			{/* Lightbox Modal */}
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<button
							aria-label="Close image lightbox"
							className="absolute inset-0 h-full w-full cursor-pointer border-none bg-transparent"
							onClick={(): void => setIsOpen(false)}
							type="button"
						/>
						<div className="relative z-10 w-full max-w-4xl rounded-none border border-neutral-800 bg-neutral-950 p-4 shadow-2xl sm:p-6">
							<div className="flex items-center justify-between border-neutral-800 border-b pb-4">
								<span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
									[ {formattedIndex} ] — {alt}
								</span>
								<button
									aria-label="Close"
									className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-white hover:bg-neutral-700 transition"
									onClick={(): void => setIsOpen(false)}
									type="button"
								>
									<IconX size={16} />
								</button>
							</div>
							<div className="relative mt-4 aspect-4/3 w-full overflow-hidden bg-black rounded-none">
								<Image
									alt={alt}
									className="h-full w-full object-contain"
									fill
									priority
									quality={95}
									src={src}
								/>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
};
