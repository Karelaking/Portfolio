"use client";

import type { ReactElement } from "react";
import { UserButton } from "@clerk/nextjs";

export const SignOutButton = (): ReactElement => {
  return (
    <div className="rounded-full border border-border px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-foreground">
      <UserButton afterSignOutUrl="/login" />
    </div>
  );
};
