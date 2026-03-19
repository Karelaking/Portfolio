import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWritingPosts } from "@/lib";
import type { WritingPost } from "@/types/writing-post.interface";
import { updateWritingPost } from "@/actions/dashboard/writing/update-writing-post.action";
import { WritingForm } from "@/components/clientComponent";

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
          <h1 className="text-3xl font-semibold">Edit writing post</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your writing content and metadata.
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
