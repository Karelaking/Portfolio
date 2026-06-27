"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface GalleryImageProps {
	alt: string;
	className?: string;
	height?: number;
	loading?: "lazy" | "eager";
	priority?: boolean;
	sizes?: string;
	src: string;
	width?: number;
}

export const GalleryImage = ({
	src,
	alt,
	sizes,
	width = 520,
	height = 420,
	className,
	priority = false,
	loading = "lazy",
}: GalleryImageProps): ReactElement => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

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

	return (
		<>
			<button
				aria-label={`Open ${alt}`}
				className="block w-full p-0 text-left"
				onClick={(): void => setIsOpen(true)}
				type="button"
			>
				<motion.div
					className="relative overflow-hidden rounded-2xl border border-border/70"
					initial={{ opacity: 0, y: 10 }}
					transition={{ duration: 0.3 }}
					viewport={{ once: true }}
					whileInView={{ opacity: 1, y: 0 }}
				>
					{loaded ? null : (
						<div className="absolute inset-0 animate-pulse bg-muted/60" />
					)}
					<Image
						alt={alt}
						className={cn(
							"h-48 w-full object-cover",
							className,
							loaded ? null : "opacity-0"
						)}
						height={height}
						loading={loading}
						onLoad={(): void => {
							setLoaded(true);
						}}
						priority={priority}
						quality={priority ? 95 : 75}
						sizes={sizes}
						src={src}
						width={width}
					/>
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen ? (
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
					>
						<motion.button
							aria-label="Close image"
							className="absolute inset-0 bg-background/80 backdrop-blur"
							onClick={(): void => setIsOpen(false)}
							type="button"
						/>
						<div className="relative z-10 w-fit md:w-auto">
							<motion.div
								animate={{ scale: 1, opacity: 1 }}
								className="overflow-hidden rounded-3xl border border-border/70 bg-card p-3"
								exit={{ scale: 0.95, opacity: 0 }}
								initial={{ scale: 0.95, opacity: 0 }}
								style={{ maxWidth: `${width}px` }}
								transition={{ duration: 0.15, ease: "easeOut" }}
							>
								<Image
									alt={alt}
									className="h-auto max-h-[80vh] w-fit rounded-2xl object-contain md:max-h-none"
									height={height}
									priority
									quality={90}
									sizes="100vw"
									src={src}
									style={{
										maxHeight: `${height}px`,
										width: "auto",
										height: "auto",
									}}
									width={width}
								/>
							</motion.div>
							<div className="mt-4 flex items-center justify-between text-muted-foreground text-xs uppercase tracking-[0.3em]">
								<span>{alt}</span>
								<span>Esc to close</span>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
};
