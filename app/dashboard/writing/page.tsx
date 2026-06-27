import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { WritingDeleteButton } from "@/components/clientComponent";
import { getWritingPosts } from "@/lib";
import type { WritingPost } from "@/types/writing-post.interface";

interface WritingFetchResult {
	posts: WritingPost[];
}

const stripHtml = (value: string): string =>
	value
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();

const buildPreview = (content: string): string => {
	const text = stripHtml(content);
	if (text.length <= 140) {
		return text;
	}

	return `${text.slice(0, 140)}...`;
};

const fetchWriting = async (): Promise<WritingFetchResult> => {
	const posts = await getWritingPosts();
	return { posts };
};

const WritingDashboardPage = async (): Promise<ReactElement> => {
	const { posts } = await fetchWriting();

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-3">
						<h1 className="font-semibold text-3xl">Writing</h1>
						<span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-[0.35em]">
							{posts.length} total
						</span>
					</div>
					<p className="text-muted-foreground text-sm">
						Manage your shayari, poems, and stories with a rich text editor.
					</p>
				</div>
				<Link
					className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/dashboard/writing/new"
				>
					New post
				</Link>
			</div>

			{posts.length === 0 ? (
				<div className="rounded-3xl border border-border/70 border-dashed bg-card p-6">
					<div className="space-y-3">
						<p className="text-muted-foreground text-sm">
							No writing posts yet. Add your first post to get started.
						</p>
						<Link
							className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
							href="/dashboard/writing/new"
						>
							Create post
						</Link>
					</div>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2">
					{posts.map((post) => (
						<article
							className="rounded-3xl border border-border/70 bg-card p-4"
							key={post.id}
						>
							<div className="relative h-44 w-full overflow-hidden rounded-2xl border border-border/70 bg-background">
								<Image
									alt={post.coverImageAlt}
									className="h-full w-full object-cover"
									height={320}
									sizes="(min-width: 640px) 50vw, 100vw"
									src={post.coverImageSrc}
									width={480}
								/>
							</div>
							<div className="mt-4 space-y-2">
								<p className="font-semibold text-lg">{post.title}</p>
								<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
									{post.publishedAt}
								</p>
								<p className="text-muted-foreground text-sm">
									{buildPreview(post.content)}
								</p>
								<div className="mt-2 flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<span
											className="rounded-full border border-border/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
											key={`${post.id}-${tag}`}
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<div className="mt-4 flex flex-wrap gap-2">
								<Link
									className="rounded-full border border-border px-4 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
									href={`/dashboard/writing/${post.id}/edit`}
								>
									Edit
								</Link>
								<WritingDeleteButton postId={post.id} />
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
};

export default WritingDashboardPage;
