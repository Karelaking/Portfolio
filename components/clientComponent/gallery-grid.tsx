"use client";

import type { ReactElement } from "react";
import { useMemo, useState } from "react";
import { packGridItems2Column } from "@/lib/utils";
import type { GalleryImage as GalleryImageType } from "@/types/gallery-image.interface";
import { GalleryImage } from "./gallery-image";

interface GalleryGridProps {
	images: GalleryImageType[];
}

export const GalleryGrid = ({ images }: GalleryGridProps): ReactElement => {
	const [orientations, setOrientations] = useState<
		Record<string, "landscape" | "portrait">
	>({});

	const packedImages = useMemo(() => {
		return packGridItems2Column(images, (img) => {
			if (orientations[img.id]) {
				return orientations[img.id];
			}
			return img.src.includes("gallery-01") || img.src.includes("gallery-02")
				? "landscape"
				: "portrait";
		});
	}, [images, orientations]);

	const handleImageOrientation = (
		id: string,
		orientation: "landscape" | "portrait"
	): void => {
		setOrientations((prev) => {
			if (prev[id] === orientation) return prev;
			return { ...prev, [id]: orientation };
		});
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 bg-white">
			{packedImages.map((image, idx) => (
				<GalleryImage
					alt={image.alt}
					index={idx + 1}
					key={image.id}
					onOrientationDetect={(orientation): void =>
						handleImageOrientation(image.id, orientation)
					}
					sizes="(min-width: 768px) 50vw, 100vw"
					src={image.src}
				/>
			))}
		</div>
	);
};
