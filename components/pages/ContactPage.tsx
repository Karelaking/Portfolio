import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import {getSocialLinks} from "@/lib/portfolio/queries";
import type { SocialLink as SocialLinkType } from "@/types";
import { ContactForm } from "../clientComponent";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

const socialLinks = await getSocialLinks();

export const ContactPage = (): React.ReactNode => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="contact"
	>
		<SectionOrnament className="right-6" />
		<SectionHeader
			copy="Reach out for product partnerships, leadership, or speaking opportunities."
			label="Contact"
			title="Let’s craft a minimal presence for your next launch."
		/>
		<div className="grid w-full gap-6 md:grid-cols-[1.1fr_0.9fr]">
			<div className="rounded-3xl border border-border/70 bg-card p-6">
				<p className="text-muted-foreground text-sm">
					Send a note with your product goals or upcoming milestones.
				</p>
				<ContactForm />
			</div>
			<div className="rounded-3xl border border-border/70 bg-card p-6 text-center">
				<p className="text-lg text-muted-foreground uppercase tracking-[0.3em]">
					Connect with me on
				</p>
				<div className="mt-4 flex h-max w-full flex-col items-start justify-center gap-4 sm:h-full sm:items-center">
					{socialLinks.map((link: SocialLinkType) => (
						<Link
							className="flex items-center gap-4 py-2 text-sm uppercase tracking-widest hover:underline"
							href={link.href}
							key={link.id}
							rel="noreferrer"
							target="_blank"
						>
							<IconArrowUpRight size={14} />
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</div>

		<div className="my-4 flex w-full justify-center">
			<Link
				className="inline-flex w-max items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
				href="/#"
			>
				Back to the top
				<IconArrowUpRight size={14} />
			</Link>
		</div>
	</Container>
);
