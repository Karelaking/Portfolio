import Link from "next/link";
import type { ReactElement } from "react";
import { createWritingPost } from "@/actions/dashboard/writing/create-writing-post.action";
import { WritingForm } from "@/components/clientComponent";

const NewWritingPostPage = (): ReactElement => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-3xl">New writing post</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Create a new shayari, poem, or story.
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
			<WritingForm action={createWritingPost} submitLabel="Create post" />
		</div>
	</div>
);

export default NewWritingPostPage;
