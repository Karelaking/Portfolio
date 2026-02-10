import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdminClient, getSupabaseServerClient } from "@/lib/supabase/server";
import type { ExperienceItem } from "@/types/experience-item.interface";
import { updateExperience } from "@/actions/dashboard/experience/update-experience.action";
import { ExperienceForm } from "@/components/dashboard";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

const fetchExperience = async (id: string): Promise<ExperienceItem | null> => {
  const client = getSupabaseAdminClient() ?? getSupabaseServerClient();
  if (!client) {
    return null;
  }

  const { data } = await client
    .from("experience")
    .select("id,role,company,period,summary,highlights")
    .eq("id", id)
    .single();

  return (data as ExperienceItem) ?? null;
};

const EditExperiencePage = async ({
  params,
}: EditExperiencePageProps): Promise<ReactElement> => {
  const { id } = await params;
  const experience = await fetchExperience(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Edit experience</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update your experience details.
          </p>
        </div>
        <Link
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
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
            highlights: experience.highlights.join("\n"),
          }}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
};

export default EditExperiencePage;
