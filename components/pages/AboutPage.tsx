import { IconArrowMoveRight } from "@tabler/icons-react";
import type { ReactElement } from "react";
import {getCurrentFocus} from "@/lib/portfolio/queries";
import { FadeIn } from "../motion";
import { Container, SectionHeader, SectionOrnament } from "../serverComponent";

const currentFocus = await getCurrentFocus();

export const AboutPage = (): ReactElement => (
	<Container className="relative flex flex-col gap-8 py-12" id="about">
		<SectionOrnament />
		<SectionHeader
			copy="I build full stack systems where disciplined UI meets pragmatic backend engineering. The goal is always the same: clean UX, reliable APIs, and long-term maintainability."
			label="About"
			title="Focused, detail-driven, and built for scale."
		/>
		<div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
			<FadeIn className="rounded-3xl border border-border/70 bg-card p-6">
				<p className="text-muted-foreground">
					I craft monochrome, high-precision experiences that prioritize
					performance, clarity, and resilience. Every interface I ship is meant
					to be fast, consistent, and easy to extend.
				</p>
			</FadeIn>
			<FadeIn className="rounded-3xl border border-border/70 bg-card p-6">
				<p className="font-bold text-gray-600 text-xs uppercase tracking-[0.4em]">
					Current focus
				</p>
				<ul className="mt-4 space-y-2 text-sm">
					{currentFocus.map((item) => (
						<li className="text-gray-500" key={item.id}>
							<IconArrowMoveRight className="mr-2 inline-block text-gray-900" />
							{item.label}
						</li>
					))}
				</ul>
			</FadeIn>
		</div>
	</Container>
);
