import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import { getWritingPostById, getWritingPosts } from "@/lib";

interface WritingPostPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: WritingPostPageProps): Promise<Metadata> {
	const { id } = await params;
	const post = await getWritingPostById(id);

	if (!post) {
		return {
			title: "Article Not Found | MK Katiyar",
			description: "The requested article could not be found.",
		};
	}

	return {
		title: `${post.title} | Writing`,
		description: post.content.slice(0, 160).replace(/\s+/g, " ").trim(),
		openGraph: {
			title: post.title,
			description: post.content.slice(0, 160).replace(/\s+/g, " ").trim(),
			images: [{ url: post.coverImageSrc, alt: post.coverImageAlt }],
		},
	};
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
	const posts = await getWritingPosts();
	return posts.map((post) => ({
		id: post.id,
	}));
}

export default async function WritingPostDetailPage({
	params,
}: WritingPostPageProps): Promise<React.ReactElement> {
	const { id } = await params;
	const post = await getWritingPostById(id);

	if (!post) {
		notFound();
	}

	return (
		<article className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-neutral-50/70 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100">
			{/* Grid Container Wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />

				{/* Article Header & Navigation Top Row */}
				<header className="flex flex-col gap-6 border-b border-neutral-200 bg-neutral-50/70 px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900/60">
					{/* Back Button Link */}
					<div>
						<Link
							className="group inline-flex items-center gap-2 font-mono text-xs font-semibold text-neutral-500 tracking-widest uppercase transition hover:text-black dark:text-neutral-400 dark:hover:text-white"
							href="/writing"
						>
							<IconArrowLeft
								className="transition-transform duration-300 group-hover:-translate-x-1"
								size={14}
							/>
							<span>Back to all writing</span>
						</Link>
					</div>

					<div>
						<div className="flex items-center gap-3 font-mono font-semibold text-xs text-neutral-500 tracking-[0.25em] uppercase mb-3 dark:text-neutral-400">
							<span>// 05 . WRITING</span>
							<span>•</span>
							<span>PUBLISHED: {post.publishedAt}</span>
						</div>
						<h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight uppercase leading-tight dark:text-white">
							{post.title}
						</h1>

						{/* Tag Badges */}
						<div className="mt-6 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									className="rounded-none border border-neutral-200 bg-white px-3 py-1 font-mono text-xs font-medium text-neutral-700 tracking-wider uppercase dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
									key={tag}
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</header>

				{/* Cover Image Banner */}
				<div className="relative w-full aspect-16/9 max-h-[480px] overflow-hidden border-b border-neutral-200 bg-neutral-900 dark:border-neutral-800">
					<Image
						alt={post.coverImageAlt}
						className="h-full w-full object-cover"
						fill
						priority
						sizes="(min-width: 1280px) 1280px, 100vw"
						src={post.coverImageSrc}
					/>
				</div>

				{/* Article Main Text Content Body */}
				<div className="flex-1 bg-white px-6 py-10 sm:px-10 lg:px-16 dark:bg-neutral-950">
					<div className="mx-auto max-w-3xl">
						<div
							className="prose dark:prose-invert max-w-none text-neutral-700 font-normal text-base sm:text-lg leading-relaxed whitespace-pre-line dark:text-neutral-300"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50/70 px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-900/60">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						ARTICLE: {post.title}
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
						href="/writing"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Explore All Writing
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Explore All Writing
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs dark:bg-black dark:text-white">
							<span className="inline-flex transition-transform duration-300 group-hover:translate-x-5 group-hover:-translate-y-5">
								<IconArrowUpRight size={16} />
							</span>
							<span className="absolute inline-flex -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
								<IconArrowUpRight size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</article>
	);
}
