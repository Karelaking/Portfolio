import { IconArrowUpLeft } from "@tabler/icons-react";
import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { getGalleryImagesAction } from "@/actions";
import { GalleryGrid, HeaderMenuPopover } from "@/components/clientComponent";
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

const page = async (): Promise<React.ReactElement> => {
	const gallery = await getGalleryImagesAction();

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
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
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

			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Title Header */}
				<div className="border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
						// GALLERY ARCHIVE
					</span>
					<h1 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
						CREATIVE GALLERY & VISUAL CAPTURES
					</h1>
					<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
						Explore the complete collection of photography, motion captures, and monochrome visual art.
					</p>
				</div>

				{/* Bin-Packed 2-Column Grid Component */}
				<div className="flex-1">
					<GalleryGrid images={gallery} />
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						TOTAL {gallery.length} GALLERY CAPTURES
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="/"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Home
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Home
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
							<span className="inline-flex transition-transform duration-300 group-hover:-translate-x-5 group-hover:-translate-y-5">
								<IconArrowUpLeft size={16} />
							</span>
							<span className="absolute inline-flex translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
								<IconArrowUpLeft size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default page;
