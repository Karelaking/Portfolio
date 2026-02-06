import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SiteShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const SiteShell = ({
  children,
  header,
  footer,
  className,
}: SiteShellProps): ReactElement => {
  return (
    <div className={cn("min-h-dvh bg-background text-foreground", className)}>
      {header}
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
      {footer}
    </div>
  );
};
