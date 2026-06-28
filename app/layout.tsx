import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import { siteConfig, siteUrl, toAbsoluteUrl } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const instrument_Serif = Instrument_Serif({
	subsets: ["latin"],
	variable: "--font-instrument-sans",
	weight: "400",
});

export const metadata: Metadata = {
	metadataBase: siteUrl,
	title: {
		default: "MK KATIYAR | Software Developer",
		template: "%s | MK KATIYAR",
	},
	description:
		"Explore my digital world for featuring full-stack projects, engineering experience, technical expertise, writing, and gallery work.",
	applicationName: "MK KATIYAR",
	keywords: [
		"MK KATIYAR",
		"portfolio",
		"full-stack developer",
		"software development",
		"backend development",
		"web development",
		"software engineer",
		"open source contributions",
		"captured moments gallery",
		"generation of mind",
		"poetries",
		"technical expertise"
	],
	alternates: {
		canonical: "/",
	},
	category: "technology",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "/",
		siteName: siteConfig.name,
		title: "MK KATIYAR | Software Developer",
		description: siteConfig.description,
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "MK KATIYAR | Software Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "MK KATIYAR | Software Developer",
		description: siteConfig.description,
		images: ["/twitter-image"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
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
}: RootLayoutProps): ReactElement {
	const websiteJsonLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		url: siteConfig.url,
		description: siteConfig.description,
		inLanguage: "en",
		publisher: {
			"@type": "Person",
			name: "MK KATIYAR",
		},
	};

	const organizationJsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "MK KATIYAR Portfolio",
		url: siteConfig.url,
		logo: toAbsoluteUrl("/images/hero-portrait.svg"),
		sameAs: siteConfig.profiles,
	};

	const personJsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "MK KATIYAR",
		url: siteConfig.url,
		image: toAbsoluteUrl("/images/hero-portrait.svg"),
		jobTitle: "Full-Stack Developer",
		sameAs: siteConfig.profiles,
	};

	return (
		<html
			className={cn(geistSans.variable, instrument_Serif.variable)}
			data-scroll-behavior="smooth"
			lang="en"
			suppressHydrationWarning
		>
			<body className="bg-neutral-50 font-sans antialiased dark:bg-neutral-950">
				<script
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
					type="application/ld+json"
				/>
				<script
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
					type="application/ld+json"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationJsonLd),
					}}
					type="application/ld+json"
				/>
				<ClerkProvider>
					<Providers>{children}</Providers>
				</ClerkProvider>
			</body>
		</html>
	);
}
