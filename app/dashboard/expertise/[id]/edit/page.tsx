import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateExpertise } from "@/actions/dashboard/expertise/update-expertise.action";
import { ExpertiseForm } from "@/components/clientComponent";
import { getExpertise } from "@/lib/portfolio/queries";
import type { ExpertiseItem } from "@/types/expertise-item.interface";

interface EditExpertisePageProps {
	params: Promise<{ id: string }>;
}

const fetchExpertise = async (id: string): Promise<ExpertiseItem | null> => {
	const items = await getExpertise();
	return items.find((item) => item.id === id) ?? null;
};

const EditExpertisePage = async ({
	params,
}: EditExpertisePageProps): Promise<ReactElement> => {
	const { id } = await params;
	const expertise = await fetchExpertise(id);

	if (!expertise) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Edit expertise</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your expertise details.
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
				<ExpertiseForm
					action={updateExpertise.bind(null, expertise.id)}
					defaultValues={{
						title: expertise.title,
						description: expertise.description,
						icon: expertise.icon,
					}}
					submitLabel="Save changes"
				/>
			</div>
		</div>
	);
};

export default EditExpertisePage;
