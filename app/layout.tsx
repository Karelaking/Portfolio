import "./globals.css";
import { gsap } from "gsap";
import type { Metadata } from "next";
import { useGSAP } from "@gsap/react";
import { Provider } from "./provider/provider";
import Footer from "@/components/layout-footer";
import { Header, NavItems } from "@/components/layout-header";
import { Geist, Geist_Mono, JetBrains_Mono, Mea_Culpa } from "next/font/google";
import { IconAnimationProvider } from "@/icons/icon-animation-controller";
import { HomeIcon, UserIcon, CvIcon, CodeIcon, BriefcaseIcon, PhotoIcon, MessageIcon } from "@/icons";
import { Analytics } from "@vercel/analytics/next"

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

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  subsets: ["latin"],
  weight: ["400"]
})

export const metadata: Metadata = {
  title: "Mradul's | Portfolio",
  description: "this is the mradul kumar's portfolio website.",
};

const navItems: NavItems[] = [
  {
    name: "Home",
    link: "#home",
    icon: <HomeIcon size={16}/>,
  },
  {
    name: "About",
    link: "#about",
    icon: <UserIcon size={16} />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <CvIcon size={16} />,
  },
  {
    name: "Expertise",
    link: "#expertise",
    icon: <CodeIcon size={16} />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: (
      <BriefcaseIcon size={16} />
    ),
  },
  {
    name: "Gallery",
    link: "#gallery",
    icon: (
      <PhotoIcon size={16} />
    ),
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <MessageIcon size={16} />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth!">
      <style>
        
      </style>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} ${meaCulpa.variable} antialiased h-max`}
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
