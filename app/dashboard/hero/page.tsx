import Link from "next/link";
import type { ReactElement } from "react";
import { getHeroAction } from "@/actions/dashboard/hero/get-hero.action";
import { HeroForm } from "@/components/clientComponent/hero-form";

const HeroDashboardPage = async (): Promise<ReactElement> => {
	const hero = await getHeroAction();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-semibold text-3xl">Manage hero section</h1>
					<p className="mt-2 text-muted-foreground text-sm">
						Update your landing hero content, image, and metrics.
					</p>
				</div>
				<Link
					className="text-muted-foreground text-xs uppercase tracking-[0.3em] hover:text-foreground"
					href="/dashboard"
				>
					Back
				</Link>
			</div>

			<div className="rounded-3xl border border-border/70 bg-card p-6">
				<HeroForm initialValues={hero} />
			</div>
		</div>
	);
};

export default HeroDashboardPage;
