import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { Geist, Geist_Mono, JetBrains_Mono, Mea_Culpa } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const meaCulpa = Mea_Culpa({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mea-culpa",
});

export const metadata: Metadata = {
  title: {
    default: "MK Katiyar | Portfolio",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio website",
  applicationName: "Mradul's Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps):ReactElement {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        geistSans.variable,
        geistMono.variable,
        jetBrainsMono.variable,
        meaCulpa.variable,
      )}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased bg-neutral-50 dark:bg-neutral-950 ">
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}