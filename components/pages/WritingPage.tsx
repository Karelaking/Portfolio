import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type { ReactElement } from "react";
import { GSAPSVGPattern } from "@/components/animations";
import { getWritingPosts } from "@/lib";
import { WritingPostsGrid } from "../clientComponent/writing-posts-grid";

interface WritingPageProps {
	headingAs?: "h1" | "h2";
}

export const WritingPage = async ({
	headingAs = "h2",
}: WritingPageProps = {}): Promise<ReactElement> => {
	const posts = await getWritingPosts();

	return (
		<section
			className="relative flex min-h-[calc(100vh-65px)] w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-neutral-50/70 text-neutral-900 shadow-2xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-100"
			data-gsap-stack="true"
			id="writing"
		>
			<GSAPSVGPattern className="right-4 top-4 h-80 w-80 opacity-20" variant="crosshair-accent" />
			<GSAPSVGPattern className="left-4 bottom-8 h-64 w-80 opacity-25" variant="leaf-petal" />
			{/* Grid Container Wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				{/* Section Header Row */}
				<header
					className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-neutral-50/70 px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-900/60"
					data-gsap-reveal="fade-up"
				>
					<div>
						{headingAs === "h1" ? (
							<h1 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
								IDEAS, PERSPECTIVES & WRITING.
							</h1>
						) : (
							<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
								IDEAS, PERSPECTIVES & WRITING.
							</h2>
						)}
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Technical articles, thoughts, shayari, poems, and short stories from my notebook.
						</p>
					</div>
				</header>

				{/* Sharp Bordered Rectangle Grid Component */}
				<div className="flex-1" data-gsap-stagger="true">
					<WritingPostsGrid posts={posts} />
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-neutral-50/70 px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-900/60">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						SHOWCASING {posts.length} ARTICLES & ESSAYS
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
						href="/writing"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Show All Articles
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Show All Articles
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
		</section>
	);
};
