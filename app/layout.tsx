import "./globals.css";
import { gsap } from "gsap";
import type { Metadata } from "next";
import { useGSAP } from "@gsap/react";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "./provider/provider";
import Footer from "./layout/footer";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Header, NavItems } from "./layout/header";

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

const navItems: NavItems[] = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

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
          <div className="relative w-full h-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Header navItems={navItems} />
             {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
