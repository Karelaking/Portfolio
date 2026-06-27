import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateGalleryImage } from "@/actions/dashboard/gallery/update-gallery-image.action";
import { GalleryForm } from "@/components/clientComponent";
import { getGalleryImages } from "@/lib/portfolio/queries";
import type { GalleryImage } from "@/types/gallery-image.interface";

interface EditGalleryImagePageProps {
	params: Promise<{ id: string }>;
}

const fetchGalleryImage = async (id: string): Promise<GalleryImage | null> => {
	const images = await getGalleryImages();
	return images.find((image) => image.id === id) ?? null;
};

const EditGalleryImagePage = async ({
	params,
}: EditGalleryImagePageProps): Promise<ReactElement> => {
	const { id } = await params;
	const image = await fetchGalleryImage(id);

	if (!image) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Edit gallery image</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your gallery image details.
					</p>
				</div>
				<Link
					className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
					href="/dashboard/gallery"
				>
					Back
				</Link>
			</div>
			<div className="rounded-3xl border border-border/70 bg-card p-6">
				<GalleryForm
					action={updateGalleryImage.bind(null, image.id)}
					defaultValues={{
						src: image.src,
						alt: image.alt,
						imageFileId: image.imageFileId,
					}}
					submitLabel="Save changes"
				/>
			</div>
		</div>
	);
};

export default EditGalleryImagePage;
