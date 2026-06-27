import Link from "next/link";
import type { ReactElement } from "react";
import { createProject } from "@/actions/dashboard/projects/create-project.action";
import { ProjectForm } from "@/components/clientComponent";

const NewProjectPage = (): ReactElement => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-3xl">New project</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Add a new project to your portfolio.
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
			<ProjectForm action={createProject} submitLabel="Create project" />
		</div>
	</div>
);

export default NewProjectPage;
