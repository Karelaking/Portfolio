import Link from "next/link";
import type { ReactElement } from "react";
import { createExperience } from "@/actions/dashboard/experience/create-experience.action";
import { ExperienceForm } from "@/components/clientComponent";

const NewExperiencePage = (): ReactElement => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-3xl">New experience</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Add a new role to your experience timeline.
				</p>
			</div>
			<Link
				className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
				href="/dashboard/experience"
			>
				Back
			</Link>
		</div>
		<div className="rounded-3xl border border-border/70 bg-card p-6">
			<ExperienceForm
				action={createExperience}
				submitLabel="Create experience"
			/>
		</div>
	</div>
);

export default NewExperiencePage;
