import "./globals.css";
import { gsap } from "gsap";
import type { Metadata } from "next";
import { useGSAP } from "@gsap/react";
import Header from "./layout/header";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "./provider/provider";
import Footer from "./layout/footer";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          <div className="min-w-full min-h-screen">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
