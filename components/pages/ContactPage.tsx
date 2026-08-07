import { IconArrowUp, IconArrowUpRight, IconMail, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getSocialLinks } from "@/lib/portfolio/queries";
import type { SocialLink as SocialLinkType } from "@/types";
import { ContactForm } from "../clientComponent";

export const ContactPage = async (): Promise<React.ReactElement> => {
	const socialLinks = await getSocialLinks();

	return (
		<section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden border-b border-neutral-200 bg-white text-neutral-900" id="contact">
			{/* Grid Container Wrapper */}
			<div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between border-x border-neutral-200">
				{/* Section Header Row */}
				<header className="flex flex-wrap items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-8 sm:px-10 sm:py-12">
					<div>
						<span className="mb-2 block font-semibold text-xs text-neutral-400 tracking-[0.3em] uppercase">
							// 06 . CONTACT
						</span>
						<h2 className="font-extrabold text-3xl text-neutral-900 tracking-tight uppercase sm:text-4xl md:text-5xl">
							LET'S BUILD SOMETHING EXTRAORDINARY TOGETHER.
						</h2>
						<p className="mt-3 max-w-2xl font-normal text-base text-neutral-500 leading-relaxed sm:text-lg">
							Reach out for product engineering, technical consulting, leadership, or freelance collaborations.
						</p>
					</div>
				</header>

				{/* 2-Column Sharp Bordered Grid Body */}
				<div className="grid flex-1 grid-cols-1 items-stretch divide-y divide-neutral-200 border-b border-neutral-200 bg-white lg:grid-cols-2 lg:divide-y-0 lg:divide-x">
					{/* Left Column: Direct Contact Info & Channels */}
					<div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
						<div>
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
								[ DIRECT CHANNELS ]
							</span>
							<h3 className="font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl">
								GET IN TOUCH DIRECTLY
							</h3>
							<p className="mt-3 text-neutral-500 text-sm leading-relaxed sm:text-base">
								Have a project in mind or want to discuss full-stack engineering, API architecture, or system design? Feel free to drop a message!
							</p>

							{/* Contact Cards List */}
							<div className="mt-8 space-y-4">
								<div className="flex items-center gap-4 rounded-none border border-neutral-200 bg-neutral-50/60 p-4 transition hover:bg-neutral-100/80">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
										<IconMail size={18} />
									</div>
									<div>
										<p className="font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase">EMAIL ADDRESS</p>
										<a className="font-semibold text-neutral-900 text-sm hover:underline sm:text-base" href="mailto:katiyarmradul@gmail.com">
											katiyarmradul@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-center gap-4 rounded-none border border-neutral-200 bg-neutral-50/60 p-4 transition hover:bg-neutral-100/80">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
										<IconMapPin size={18} />
									</div>
									<div>
										<p className="font-mono font-semibold text-[10px] text-neutral-400 tracking-widest uppercase">LOCATION</p>
										<p className="font-semibold text-neutral-900 text-sm sm:text-base">
											Kanpur, Uttar Pradesh 208015, India
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Social Channels List */}
						<div className="mt-10 border-neutral-200 border-t pt-8">
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
								[ SOCIAL NETWORKS ]
							</span>
							<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
								{socialLinks.map((link: SocialLinkType) => (
									<a
										className="group flex items-center justify-between rounded-none border border-neutral-200 bg-white p-3 font-semibold text-xs text-neutral-900 tracking-wider uppercase transition hover:border-black hover:bg-neutral-50"
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
					<div className="flex flex-col justify-between bg-white p-6 sm:p-10 lg:p-12">
						<div>
							<span className="mb-4 block font-mono font-semibold text-xs text-neutral-400 tracking-widest uppercase">
								[ SEND A MESSAGE ]
							</span>
							<h3 className="mb-6 font-extrabold text-2xl text-neutral-900 tracking-tight uppercase sm:text-3xl">
								START A CONVERSATION
							</h3>
							<ContactForm />
						</div>
					</div>
				</div>

				{/* Bottom Sub-Bar Toolbar Row */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 bg-white px-6 py-6 sm:px-10">
					<p className="font-medium text-xs text-neutral-800 tracking-widest uppercase sm:text-sm">
						AVAILABLE FOR FREELANCE & FULL-TIME OPPORTUNITIES
					</p>

					<Link
						className="group inline-flex items-center rounded-full bg-black p-1.5 shadow-sm transition hover:bg-neutral-900"
						href="#main"
					>
						<span className="relative flex h-6 items-center overflow-hidden pl-5 pr-3 font-medium text-xs text-white tracking-wider uppercase sm:text-sm">
							<span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
								Back To Top
							</span>
							<span className="absolute left-5 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
								Back To Top
							</span>
						</span>
						<span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white text-black shadow-2xs">
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
