import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectRepository } from "@/lib/repositories/projects/get-project-repository";
import type { ProjectItem } from "@/types/project-item.interface";
import { updateProject } from "@/actions/dashboard/projects/update-project.action";
import { ProjectForm } from "@/components/clientComponent";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

const fetchProject = async (id: string): Promise<ProjectItem | null> => {
  const repository = getProjectRepository();
  return repository.getById(id);
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
