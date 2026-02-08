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
      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 border-x">
        {children}
      </main>
      {footer}
    </div>
  );
};
