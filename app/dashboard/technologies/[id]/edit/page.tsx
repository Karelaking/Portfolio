import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateTechnology } from "@/actions/dashboard/technologies/update-technology.action";
import { TechnologyForm } from "@/components/clientComponent";
import { getProjects, getTechnologies } from "@/lib/portfolio/queries";
import type { TechnologyItem } from "@/types/technology-item.interface";

interface EditTechnologyPageProps {
	params: Promise<{ id: string }>;
}

const fetchTechnology = async (id: string): Promise<TechnologyItem | null> => {
	const technologies = await getTechnologies();
	return technologies.find((item) => item.id === id) ?? null;
};

const EditTechnologyPage = async ({
	params,
}: EditTechnologyPageProps): Promise<ReactElement> => {
	const { id } = await params;
	const [technology, projects] = await Promise.all([
		fetchTechnology(id),
		getProjects(),
	]);

	if (!technology) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Edit technology</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update technology information and project links.
					</p>
				</div>
				<Link
					className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
					href="/dashboard/technologies"
				>
					Back
				</Link>
			</div>

			<div className="rounded-3xl border border-border/70 bg-card p-6">
				<TechnologyForm
					action={updateTechnology.bind(null, technology.id)}
					defaultValues={{
						name: technology.name,
						description: technology.description,
						websiteUrl: technology.websiteUrl,
						logoKey: technology.logoKey,
						projectIds: technology.relatedProjects.map((project) => project.id),
					}}
					projects={projects}
					submitLabel="Save changes"
				/>
			</div>
		</div>
	);
};

export default EditTechnologyPage;
