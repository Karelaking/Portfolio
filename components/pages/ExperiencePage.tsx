import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import type { ExperienceItem } from "@/types";
import { ExperienceCard } from "../clientComponent";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";
import {getExperience} from "@/lib/portfolio/queries";	

const experience = await getExperience();

const featuredExperience = experience.slice(0, 3);
const hasMoreExperience = experience.length > featuredExperience.length;

export const ExperiencePage = (): React.ReactElement => (
	<Container
		className="relative flex flex-col gap-8 border-border/70 py-12"
		id="experience"
	>
		<SectionOrnament className="right-6" />
		<SectionHeader
			copy="Product, studio, and engineering roles that refined the craft."
			label="Experience"
			title="Prove of my tech life journey"
		/>
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{featuredExperience.map((item: ExperienceItem, index: number) => (
				<ExperienceCard index={index} item={item} key={item.id} />
			))}
		</div>
		{hasMoreExperience ? (
			<div className="flex justify-center">
				<Link
					className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-semibold text-foreground text-xs uppercase tracking-[0.2em] transition hover:border-foreground"
					href="/experience"
				>
					Show more
					<IconArrowUpRight size={14} />
				</Link>
			</div>
		) : null}
	</Container>
);
