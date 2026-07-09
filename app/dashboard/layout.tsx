import type { Metadata } from "next";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import { ViewTransition } from "react";
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
}: DashboardLayoutProps): Promise<ReactElement> => (
	<div className="min-h-screen border bg-background">
		<header className="border-border/70 border-b">
			<div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-4">
					<Link className="font-semibold text-sm" href="/">
						Portfolio
					</Link>
					<span className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Dashboard
					</span>
				</div>
				<div className="flex items-center gap-3">
					<SignOutButton />
				</div>
			</div>
		</header>
		<ViewTransition>
			<main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>
		</ViewTransition>
	</div>
);

export default DashboardLayout;
