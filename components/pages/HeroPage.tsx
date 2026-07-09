import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import type React from "react";
import { getHero } from "@/lib/portfolio/queries";
import { cn } from "@/lib";
import { CountUpValue, HeroImage } from "../clientComponent";
import { Container } from "../serverComponent";
import { ZoomHollowText } from "../clientComponent/zoom-hollow";
import { GREETINGS } from "@/data/NavigationLinks";


const heroData = await getHero();

const REGEX = /[.·•]/;
export const HeroPage = (): React.ReactElement => {
	const subtitleItems: string[] = heroData.subtitle
		.split(REGEX)
		.map((item: string): string => item.trim())
		.filter((item: string): boolean => item.length > 0);

	return (
		<Container
			className="relative grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]"
			id="#"
		>
			<div className="flex flex-col gap-6">
				<ZoomHollowText
					className="text-7xl font-neutral-600"
					words={GREETINGS}
				/>
				<h1 className="text-4xl font-bold tracking-wider text-foreground sm:text-5xl uppercase text-neutral-600">
					mradul kumar katiyar
				</h1>
				<p className="max-w-xl font-sans text-base text-neutral-400 dark:text-neutral-400">
					{heroData.description}
				</p>
				<div className="flex flex-wrap items-center gap-3">
					{subtitleItems.map(
						(item: string): React.ReactElement => (
							<span
								className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 font-semibold text-[10px] text-foreground/80 uppercase leading-5 tracking-[0.22em] sm:text-xs dark:bg-muted/20"
								key={item}
							>
								{item}
							</span>
						)
					)}
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<Link
						className="group inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-600 px-5 py-2 font-medium text-background text-sm transition hover:bg-transparent hover:text-foreground hover:opacity-90 dark:bg-transparent dark:text-white"
						href="#projects"
					>
						Selected projects
						<span className="inline-flex transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
							<IconArrowUpRight size={16} />
						</span>
					</Link>
					<Link
						className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 font-medium text-foreground text-sm transition hover:border-foreground"
						href="#contact"
					>
						Let’s collaborate
					</Link>
				</div>
				<div className="grid gap-4 sm:grid-cols-3">
					{heroData.metrics.map((metric) => (
						<div
							className={cn(
								"rounded-2xl border border-border/70 px-4 py-3",
								"flex cursor-pointer items-center justify-center gap-6 bg-card text-end transition-transform duration-100 hover:scale-105 hover:border-foreground/20 hover:bg-background/80 hover:shadow sm:flex-col sm:gap-2 sm:text-center"
							)}
							key={metric.label}
						>
							<p className="font-semibold text-lg text-neutral-600">
								<CountUpValue value={metric.value} />
							</p>
							<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
								{metric.label}
							</p>
						</div>
					))}
				</div>
			</div>
			<HeroImage imageAlt={heroData.imageAlt} imageSrc={heroData.imageSrc} />
		</Container>
	);
};
