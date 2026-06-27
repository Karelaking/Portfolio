import Link from "next/link";
import type { ReactElement } from "react";
import { createTechnology } from "@/actions/dashboard/technologies/create-technology.action";
import { TechnologyForm } from "@/components/clientComponent";
import { getProjects } from "@/lib/portfolio/queries";

const NewTechnologyPage = async (): Promise<ReactElement> => {
	const projects = await getProjects();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">New technology</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Add technology details and connect relevant projects.
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
					action={createTechnology}
					projects={projects}
					submitLabel="Create technology"
				/>
			</div>
		</div>
	);
};

export default NewTechnologyPage;
