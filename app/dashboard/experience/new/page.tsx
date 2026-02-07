import type { ReactElement } from "react";
import Link from "next/link";
import { createExperience } from "@/app/dashboard/experience/actions";
import { ExperienceForm } from "@/components/dashboard/experience-form";

const NewExperiencePage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New experience</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a new role to your experience timeline.
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
        <ExperienceForm action={createExperience} submitLabel="Create experience" />
      </div>
    </div>
  );
};

export default NewExperiencePage;
