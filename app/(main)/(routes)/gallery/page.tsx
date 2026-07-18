import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getGalleryImagesAction } from "@/actions";
import { GalleryImage } from "@/components/clientComponent";
import {
	Container,
	SectionHeader,
	SectionOrnament,
} from "@/components/serverComponent";
import { toAbsoluteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
	title: "Creative Gallery & Photography | MK Katiyar",
	description:
		"Explore MK Katiyar's creative gallery, showcasing professional visual captures, photography, dynamic moments, and creative design work.",
	alternates: {
		canonical: "/gallery",
	},
	openGraph: {
		title: "Creative Gallery & Photography | MK Katiyar",
		description:
			"Explore MK Katiyar's creative gallery, showcasing professional visual captures, photography, dynamic moments, and creative design work.",
		url: "/gallery",
		type: "website",
	},
	twitter: {
		title: "Creative Gallery & Photography | MK Katiyar",
		description:
			"Explore MK Katiyar's creative gallery, showcasing professional visual captures, photography, dynamic moments, and creative design work.",
	},
};

const gallery = await getGalleryImagesAction();

const page = (): React.ReactNode => {
	const galleryCollectionJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Creative Gallery",
		description:
			"A curated collection of portfolio visuals and creative captures.",
		url: toAbsoluteUrl("/gallery"),
	};

	const galleryListJsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Gallery images",
		itemListElement: gallery.map((image, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "ImageObject",
				name: image.alt,
				contentUrl: image.src,
			},
		})),
	};

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(galleryCollectionJsonLd),
				}}
				type="application/ld+json"
			/>
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryListJsonLd) }}
				type="application/ld+json"
			/>
			<Container
				className="relative flex flex-col gap-8 border-border/70 py-12"
				id="gallery"
			>
				<SectionOrnament className="right-10" />
				<SectionHeader
					as="h1"
					copy="A curated portfolio of dynamic moments captured through my camera with a creative perspective."
					label="Gallery"
					title="Beautiful Motion, Creatively Captured."
				/>
				<div className="grid gap-4 sm:grid-cols-2">
					{gallery.map((image) => (
						<GalleryImage
							alt={image.alt}
							key={image.id}
							sizes="(min-width: 768px) 50vw, 100vw"
							src={image.src}
						/>
					))}
				</div>
				<div className="flex justify-center">
					<Link
						className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
						href="/"
					>
						<IconArrowUpLeft size={14} />
						Back
					</Link>
				</div>
			</Container>
		</>
	);
};

export default page;
