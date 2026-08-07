import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { HeaderMenuPopover } from "@/components/clientComponent";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
	title: "About MK Katiyar | Full-Stack Software Developer",
	description:
		"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
	alternates: {
		canonical: "/about",
	},
	openGraph: {
		title: "About MK Katiyar | Full-Stack Software Developer",
		description:
			"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
		url: "/about",
		type: "website",
	},
	twitter: {
		title: "About MK Katiyar | Full-Stack Software Developer",
		description:
			"Learn about MK Katiyar's background, engineering philosophy, technical stack expertise, and full-stack software development experience.",
	},
};

const AboutRoutePage = (): React.ReactElement => {
	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900">
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Header Row (Single Unified Navbar) */}
				<header className="sticky top-0 z-40 flex flex-nowrap items-center justify-between gap-2 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-10 sm:py-4">
					<div className="flex items-center gap-2.5 min-w-0 sm:gap-6">
						<Link className="flex items-center gap-2 min-w-0 sm:gap-2.5" href="/">
							<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black font-extrabold text-xs text-white sm:h-8 sm:w-8">
								MK
							</span>
							<span className="font-extrabold text-sm text-neutral-900 tracking-tight uppercase truncate sm:text-xl">
								mradul katiyar
							</span>
						</Link>
					</div>

					<div className="flex items-center gap-2 shrink-0 sm:gap-3">
						<HeaderMenuPopover />
					</div>
				</header>

				{/* Main About Page Component */}
				<AboutPage />
			</div>
		</section>
	);
};

export default AboutRoutePage;
