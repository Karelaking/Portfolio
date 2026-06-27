import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateProject } from "@/actions/dashboard/projects/update-project.action";
import { ProjectForm } from "@/components/clientComponent";
import { getProjectRepository } from "@/lib/repositories/projects/get-project-repository";
import type { ProjectItem } from "@/types/project-item.interface";

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
					<h1 className="font-semibold text-3xl">Edit project</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your project details.
					</p>
				</div>
				<Link
					className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
					href="/dashboard/projects"
				>
					Back
				</Link>
			</div>
			<div className="rounded-3xl border border-border/70 bg-card p-6">
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
