import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

export interface SiteFooterProps {
  className?: string;
}

export const SiteFooter = ({ className }: SiteFooterProps): ReactElement => {
  return (
    <footer className={cn("border-t border-border/60", className)}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <p className="text-foreground">Built with Next.js 16, React 19, and Tailwind CSS.</p>
        <p>© 2026 Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
};
