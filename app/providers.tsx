import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import type { ReactElement, ReactNode } from "react";
import { Suspense, ViewTransition } from "react";
import { Toaster } from "sonner";
import { ImageKitProvider } from "@/components/providers/imagekit-provider";
import { Footer, NavigationBar } from "@/components/serverComponent";
import { FooterSkeleton } from "@/components/serverComponent/skeletons";

export interface ProvidersProps {
	children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps): ReactElement => (
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
		<ImageKitProvider>
			{children}
			<Analytics />
			<Toaster closeButton richColors />
		</ImageKitProvider>
	</ThemeProvider>
);

export interface RootProviderProps {
	children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps): ReactElement => (
	<>
		<ViewTransition>
			<main className="relative mx-auto w-full">{children}</main>
		</ViewTransition>
		<Suspense fallback={<FooterSkeleton />}>
			<Footer />
		</Suspense>
	</>
);
