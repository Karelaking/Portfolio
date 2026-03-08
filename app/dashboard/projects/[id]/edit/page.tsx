import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/server";
import type { ProjectItem } from "@/types/project-item.interface";
import { updateProject } from "@/actions/dashboard/projects/update-project.action";
import { ProjectForm } from "@/components/clientComponent";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

const fetchProject = async (id: string): Promise<ProjectItem | null> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return null;
  }

  const { data } = await client
    .from("projects")
    .select(
      "id,name,description,tags,imageSrc:image_src,imageAlt:image_alt,href",
    )
    .eq("id", id)
    .single();

  return (data as ProjectItem) ?? null;
};

const EditProjectPage = async ({
  params,
}: EditProjectPageProps): Promise<ReactElement> => {
  const { id } = await params;
  const project = await fetchProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit project</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your project details.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/projects"
        >
          Back
        </Link>
      </div>
      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <ProjectForm
          action={updateProject.bind(null, project.id)}
          defaultValues={{
            name: project.name,
            description: project.description,
            tags: project.tags.join(", "),
            imageSrc: project.imageSrc,
            imageAlt: project.imageAlt,
            href: project.href,
          }}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
};

export default EditProjectPage;
