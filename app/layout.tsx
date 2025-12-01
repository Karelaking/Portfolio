import "./globals.css";
import {gsap} from "gsap";
import type { Metadata } from "next";
import { useGSAP } from "@gsap/react";
import NavBar from "@/components/nav-bar";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme-provider";
// import { LingoProvider, loadDictionary } from "lingo.dev/react/rsc";

gsap.registerPlugin(useGSAP);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mradul's | Portfolio",
  description: "this is the mradul kumar's portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <LingoProvider loadDictionary={(locale) => loadDictionary(locale)}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />

            <div className="min-w-full min-h-screen">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    // </LingoProvider>
  );
}
