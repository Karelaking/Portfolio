import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { updateExperience } from "@/actions/dashboard/experience/update-experience.action";
import { ExperienceForm } from "@/components/clientComponent";
import { splitExperienceHighlights } from "@/lib/portfolio/experience-tech";
import { getExperience } from "@/lib/portfolio/queries";
import type { ExperienceItem } from "@/types/experience-item.interface";

interface EditExperiencePageProps {
	params: Promise<{ id: string }>;
}

const fetchExperience = async (id: string): Promise<ExperienceItem | null> => {
	const items = await getExperience();
	return items.find((item) => item.id === id) ?? null;
};

const EditExperiencePage = async ({
	params,
}: EditExperiencePageProps): Promise<ReactElement> => {
	const { id } = await params;
	const experience = await fetchExperience(id);

	if (!experience) {
		notFound();
	}

	const parsedHighlights = splitExperienceHighlights(experience.highlights);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Edit experience</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your experience details.
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
					action={updateExperience.bind(null, experience.id)}
					defaultValues={{
						role: experience.role,
						company: experience.company,
						period: experience.period,
						summary: experience.summary,
						coreTech: parsedHighlights.coreTech.join("\n"),
						highlights: parsedHighlights.highlights.join("\n"),
					}}
					submitLabel="Save changes"
				/>
			</div>
		</div>
	);
};

export default EditExperiencePage;
