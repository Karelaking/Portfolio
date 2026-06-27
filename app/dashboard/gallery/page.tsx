import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { GalleryDeleteButton } from "@/components/clientComponent";
import { getGalleryImages } from "@/lib/portfolio/queries";
import type { GalleryImage } from "@/types/gallery-image.interface";

interface GalleryFetchResult {
	images: GalleryImage[];
}

const fetchGallery = async (): Promise<GalleryFetchResult> => {
	const images = await getGalleryImages();
	return { images };
};

const GalleryPage = async (): Promise<ReactElement> => {
	const { images } = await fetchGallery();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Gallery</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{images.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Manage the gallery images shown on your portfolio.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/gallery/new"
				>
					New image
				</Link>
			</div>

			{images.length === 0 ? (
				<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm">
							No gallery images yet. Add your first image to get started.
						</p>
						<Link
							className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/gallery/new"
						>
							Add image
						</Link>
					</div>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2">
					{images.map((image) => (
						<article
							className="rounded-3xl border border-border/70 bg-card p-4"
							key={image.id}
						>
							<div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/70 bg-background">
								<Image
									alt={image.alt}
									className="h-full w-full object-cover"
									height={320}
									sizes="(min-width: 640px) 50vw, 100vw"
									src={image.src}
									width={480}
								/>
							</div>
							<div className="mt-4 space-y-2">
								<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
									Alt text
								</p>
								<p className="text-foreground text-sm">{image.alt}</p>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								<Link
									className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
									href={`/dashboard/gallery/${image.id}/edit`}
								>
									Edit
								</Link>
								<GalleryDeleteButton imageId={image.id} />
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
};

export default GalleryPage;
