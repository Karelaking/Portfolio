import type { ReactElement } from "react";
import Link from "next/link";
import { getHeroAction } from "@/actions/dashboard/hero/get-hero.action";
import { HeroForm } from "@/components/clientComponent/hero-form";

const HeroDashboardPage = async (): Promise<ReactElement> => {
  const hero = await getHeroAction();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Manage hero section</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Update your landing hero content, image, and metrics.
          </p>
        </div>
        <Link
          className="text-muted-foreground hover:text-foreground text-xs tracking-[0.3em] uppercase"
          href="/dashboard"
        >
          Back
        </Link>
      </div>

      <div className="border-border/70 bg-card rounded-3xl border p-6">
        <HeroForm initialValues={hero} />
      </div>
    </div>
  );
};

export default HeroDashboardPage;
