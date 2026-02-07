import type { ReactElement } from "react";
import { getHero } from "@/lib/portfolio/queries";
import { HeroForm } from "@/components/dashboard/hero-form";

const HeroDashboardPage = async (): Promise<ReactElement> => {
  const hero = await getHero();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Hero</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Edit the hero headline, supporting copy, and quick metrics shown on your landing page.
        </p>
      </div>

      <div className="rounded-3xl border border-border/70 bg-card p-6">
        <HeroForm initialValues={hero} />
      </div>
    </div>
  );
};

export default HeroDashboardPage;
