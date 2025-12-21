import "./globals.css";
import { gsap } from "gsap";
import type { Metadata } from "next";
import { useGSAP } from "@gsap/react";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Header, NavItems } from "@/components/layout-header";
import { Provider } from "./provider/provider";
import {
  IconMessage,
  IconBrandGooglePhotos,
  IconBriefcase,
  IconCode,
} from "@tabler/icons-react";
import { CvIcon, HomeIcon, SingleUserIcon } from "@/icons/icon";
import { IconAnimationProvider } from "@/icons/icon-animation-controller";
import Footer from "@/components/layout-footer";

gsap.registerPlugin(useGSAP);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mradul's | Portfolio",
  description: "this is the mradul kumar's portfolio website.",
};

const navItems: NavItems[] = [
  {
    name: "Home",
    link: "#home",
    icon: <HomeIcon />,
  },
  {
    name: "About",
    link: "#about",
    icon: <SingleUserIcon />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <CvIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Expertise",
    link: "#expertise",
    icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: (
      <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Gallery",
    link: "#gallery",
    icon: (
      <IconBrandGooglePhotos className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth!">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} antialiased h-max`}
      >
        <Provider>
          <IconAnimationProvider>
            <div className="w-full h-full dark:bg-gray-900 transition-colors duration-300 font-jetbrains-mono">
              <Header navItems={navItems} />
              {children}
            </div>
            <Footer />
          </IconAnimationProvider>
        </Provider>
      </body>
    </html>
  );
}
