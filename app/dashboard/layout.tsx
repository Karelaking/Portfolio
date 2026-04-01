import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SignOutButton } from "@/components/serverComponent";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({
  children,
}: DashboardLayoutProps): Promise<ReactElement> => {
  return (
    <div className="bg-background min-h-screen border">
      <header className="border-border/70 border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link className="text-sm font-semibold" href="/">
              Portfolio
            </Link>
            <span className="text-muted-foreground text-xs tracking-[0.3em] uppercase">
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
