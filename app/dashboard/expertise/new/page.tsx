import Link from "next/link";
import type { ReactElement } from "react";
import { createExpertise } from "@/actions/dashboard/expertise/create-expertise.action";
import { ExpertiseForm } from "@/components/clientComponent";

const NewExpertisePage = (): ReactElement => (
	<div className="space-y-6">
		<div className="flex items-center justify-between">
			<div>
				<h1 className="font-semibold text-3xl">New expertise</h1>
				<p className="mt-2 text-muted-foreground text-sm">
					Add a new expertise card for your portfolio.
				</p>
			</div>
			<Link
				className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
				href="/dashboard/expertise"
			>
				Back
			</Link>
		</div>
		<div className="rounded-3xl border border-border/70 bg-card p-6">
			<ExpertiseForm action={createExpertise} submitLabel="Create expertise" />
		</div>
	</div>
);

export default NewExpertisePage;
