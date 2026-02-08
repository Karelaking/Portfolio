import type { ReactElement } from "react";
import Link from "next/link";

type DashboardLinkItem = {
  label: string;
  href: string;
};

const dashboardLinks: DashboardLinkItem[] = [
  { label: "Manage projects", href: "/dashboard/projects" },
  { label: "Manage hero section", href: "/dashboard/hero" },
  { label: "Manage experience", href: "/dashboard/experience" },
  { label: "Manage gallery", href: "/dashboard/gallery" },
  { label: "View portfolio", href: "/" },
  { label: "Auth settings", href: "/login" },
];

const DashboardPage = (): ReactElement => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your portfolio data from one place.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {dashboardLinks.map((link) => (
          <Link
            className="rounded-2xl border border-border/70 bg-card p-5 text-sm transition hover:border-foreground"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Tell me which CRUD sections you want and I’ll add them here.
      </p>
    </div>
  );
};

export default DashboardPage;
