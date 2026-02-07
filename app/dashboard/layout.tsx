import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({
  children,
}: DashboardLayoutProps): Promise<ReactElement> => {
  return (
    <div className="min-h-screen bg-background border">
      <header className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link className="text-sm font-semibold" href="/">
              Portfolio
            </Link>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
};

export default DashboardLayout;
