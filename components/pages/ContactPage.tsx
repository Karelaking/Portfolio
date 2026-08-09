import { IconArrowUp, IconArrowUpRight, IconMail, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getSocialLinks } from "@/lib/portfolio/queries";
import type { SocialLink as SocialLinkType } from "@/types";
import { ContactForm } from "../clientComponent";

export const ContactPage = async (): Promise<React.ReactElement> => {
	const socialLinks = await getSocialLinks();

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100" id="contact">
			{/* Grid Container Wrapper */}
			<div className="group relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200 dark:border-neutral-800">
				{/* Corner Node Dots at Grid Line Intersections */}
				<span className="absolute -top-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -top-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -left-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				<span className="absolute -bottom-1 -right-1 z-50 h-2 w-2 rounded-full border border-neutral-300 bg-white shadow-2xs transition-colors duration-300 group-hover:border-black group-hover:bg-black dark:border-neutral-700 dark:bg-neutral-900 dark:group-hover:border-white dark:group-hover:bg-white" />
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12 dark:border-neutral-800 dark:bg-neutral-950">
					<div>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl dark:text-white">
							LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-600 leading-relaxed sm:text-lg dark:text-neutral-400">
							Reach out for product engineering, technical consulting, leadership, or freelance collaborations.
						</p>
					</div>
				</header>

				{/* 2-Column Sharp Bordered Grid Body */}
				<div className="grid flex-1 grid-cols-1 items-stretch divide-y divide-neutral-200 border-b border-neutral-200 bg-white lg:grid-cols-2 lg:divide-y-0 lg:divide-x dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
					{/* Left Column: Direct Contact Info & Channels */}
					<div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
						<div>
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
								[ DIRECT CHANNELS ]
							</span>
							<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl dark:text-neutral-100">
								GET IN TOUCH DIRECTLY
							</h3>
							<p className="mt-3 text-neutral-600 text-sm leading-relaxed sm:text-base dark:text-neutral-400">
								Have a project in mind or want to discuss full-stack engineering, API architecture, or system design? Feel free to drop a message!
							</p>

							{/* Contact Cards List */}
							<div className="mt-8 space-y-4">
								<div className="flex items-center gap-4 rounded-none border border-neutral-200 bg-neutral-50/60 p-4 transition hover:bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-900">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
										<IconMail size={18} />
									</div>
									<div>
										<p className="font-mono font-semibold text-[10px] text-neutral-500 tracking-widest uppercase dark:text-neutral-400">EMAIL ADDRESS</p>
										<a className="font-semibold text-neutral-900 text-sm hover:underline sm:text-base dark:text-neutral-100" href="mailto:katiyarmradul@gmail.com">
											katiyarmradul@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-center gap-4 rounded-none border border-neutral-200 bg-neutral-50/60 p-4 transition hover:bg-neutral-100/80 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-900">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
										<IconMapPin size={18} />
									</div>
									<div>
										<p className="font-mono font-semibold text-[10px] text-neutral-500 tracking-widest uppercase dark:text-neutral-400">LOCATION</p>
										<p className="font-semibold text-neutral-900 text-sm sm:text-base dark:text-neutral-100">
											Kanpur, Uttar Pradesh 208015, India
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Social Channels List */}
						<div className="mt-10 border-neutral-200 border-t pt-8 dark:border-neutral-800">
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
								[ SOCIAL NETWORKS ]
							</span>
							<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
								{socialLinks.map((link: SocialLinkType) => (
									<a
										className="group flex items-center justify-between rounded-none border border-neutral-200 bg-white p-3 font-semibold text-xs text-neutral-900 tracking-wider uppercase transition hover:border-black hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white dark:hover:bg-neutral-800"
										href={link.href}
										key={link.id}
										rel="noreferrer"
										target="_blank"
									>
										<span>{link.label}</span>
										<IconArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right Column: Contact Form */}
					<div className="flex flex-col justify-between bg-white p-6 sm:p-10 lg:p-12 dark:bg-neutral-950">
						<div>
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-500 tracking-widest uppercase dark:text-neutral-400">
								[ SEND A MESSAGE ]
							</span>
							<h3 className="mb-6 font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl dark:text-neutral-100">
								START A CONVERSATION
							</h3>
							<ContactForm />
						</div>
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10 dark:border-neutral-800 dark:bg-neutral-950">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm dark:text-neutral-300">
						AVAILABLE FOR FREELANCE & FULL-TIME OPPORTUNITIES
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900 dark:bg-white dark:hover:bg-neutral-200"
						href="#main"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm dark:text-black">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Top
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Top
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs dark:bg-black dark:text-white">
							<span className="inline-flex transition-transform duration-300 group-hover:-translate-y-5">
								<IconArrowUp size={16} />
							</span>
							<span className="absolute inline-flex translate-y-5 transition-transform duration-300 group-hover:translate-y-0">
								<IconArrowUp size={16} />
							</span>
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
};
