import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { ImageKitProvider } from "@/components/providers/imagekit-provider";
import { Footer, NavigationBar } from "@/components/serverComponent";
import { FooterSkeleton } from "@/components/serverComponent/skeletons";

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): ReactElement => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ImageKitProvider>
        {children}
        <Analytics />
        <Toaster richColors closeButton />
      </ImageKitProvider>
    </ThemeProvider>
  );
};

export interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps): ReactElement => {
  return (
    <>
      <NavigationBar />
      <main className="relative mx-auto w-full">{children}</main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </>
  );
};
