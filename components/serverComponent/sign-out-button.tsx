import { UserButton } from "@clerk/nextjs";
import type { ReactElement } from "react";

export const SignOutButton = (): ReactElement => (
	<div className="rounded-full border border-border px-2 py-1 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground">
		<UserButton afterSignOutUrl="/login" />
	</div>
);
