import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateWritingPost } from "@/actions/dashboard/writing/update-writing-post.action";
import { WritingForm } from "@/components/clientComponent";
import { getWritingPosts } from "@/lib";
import type { WritingPost } from "@/types/writing-post.interface";

interface EditWritingPostPageProps {
	params: Promise<{ id: string }>;
}

const fetchWritingPost = async (id: string): Promise<WritingPost | null> => {
	const posts = await getWritingPosts();
	return posts.find((post) => post.id === id) ?? null;
};

const EditWritingPostPage = async ({
	params,
}: EditWritingPostPageProps): Promise<ReactElement> => {
	const { id } = await params;
	const post = await fetchWritingPost(id);

	if (!post) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Edit writing post</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your writing content and metadata.
					</p>
				</div>
				<Link
					className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
					href="/dashboard/writing"
				>
					Back
				</Link>
			</div>
			<div className="rounded-3xl border border-border/70 bg-card p-6">
				<WritingForm
					action={updateWritingPost.bind(null, post.id)}
					defaultValues={{
						title: post.title,
						coverImageSrc: post.coverImageSrc,
						coverImageAlt: post.coverImageAlt,
						content: post.content,
						tags: post.tags.join(", "),
						publishedAt: post.publishedAt,
					}}
					submitLabel="Save changes"
				/>
			</div>
		</div>
	);
};

export default EditWritingPostPage;
