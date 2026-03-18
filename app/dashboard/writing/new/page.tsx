import type { ReactElement } from "react";
import Link from "next/link";
import { createWritingPost } from "@/actions/dashboard/writing/create-writing-post.action";
import { WritingForm } from "@/components/clientComponent";

const NewWritingPostPage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New writing post</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Create a new shayari, poem, or story.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/writing"
        >
          Back
        </Link>
      </div>
      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <WritingForm action={createWritingPost} submitLabel="Create post" />
      </div>
    </div>
  );
};

export default NewWritingPostPage;
