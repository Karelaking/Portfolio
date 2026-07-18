import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getGalleryImages } from "@/lib/portfolio/queries";
import { GalleryImage } from "../clientComponent";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

const gallery = await getGalleryImages();

const featuredGallery = gallery.slice(0, 4);
const hasMoreGallery = gallery.length > featuredGallery.length;

export const GalleryPage = (): React.ReactNode => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="gallery"
	>
		<SectionOrnament className="right-10" />
		<SectionHeader
			copy="A curated portfolio of dynamic moments captured through my camera with a creative perspective."
			label="Gallery"
			title="Beautiful Motion, Creatively Captured."
		/>
		<div className="grid gap-4 sm:grid-cols-2">
			{featuredGallery.map((image) => (
				<GalleryImage
					alt={image.alt}
					key={image.id}
					sizes="(min-width: 768px) 50vw, 100vw"
					src={image.src}
				/>
			))}
		</div>
		{hasMoreGallery ? (
			<div className="flex justify-center">
				<Link
					className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/gallery"
				>
					Show more
					<IconArrowUpRight size={14} />
				</Link>
			</div>
		) : null}
	</Container>
);
