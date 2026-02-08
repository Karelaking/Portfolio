"use client";

import dynamic from "next/dynamic";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "sonner";
import { AppThemeProvider } from "@/components/providers";
import { useMounted } from "@/hooks/use-mounted";

const LazyAnalyticsProvider = dynamic(
  () =>
    import("@/components/providers").then((mod) => mod.AnalyticsProvider),
  {
    ssr: false,
  },
);

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): ReactElement => {
  const mounted = useMounted();

  return (
    <AppThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      {mounted ? <LazyAnalyticsProvider /> : null}
      {mounted ? <Toaster richColors closeButton /> : null}
    </AppThemeProvider>
  );
};
