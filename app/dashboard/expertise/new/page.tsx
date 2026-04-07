import type { ReactElement } from "react";
import Link from "next/link";
import { createExpertise } from "@/actions/dashboard/expertise/create-expertise.action";
import { ExpertiseForm } from "@/components/clientComponent";

const NewExpertisePage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">New expertise</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Add a new expertise card for your portfolio.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard/expertise"
        >
          Back
        </Link>
      </div>
      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <ExpertiseForm
          action={createExpertise}
          submitLabel="Create expertise"
        />
      </div>
    </div>
  );
};

export default NewExpertisePage;
