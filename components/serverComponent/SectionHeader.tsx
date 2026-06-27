import type { ReactElement } from "react";

export interface SectionHeaderProps {
	as?: "h1" | "h2";
	copy?: string;
	label: string;
	title: string;
}

export const SectionHeader = ({
	label,
	title,
	copy,
	as = "h2",
}: SectionHeaderProps): ReactElement => {
	const HeadingTag = as;

	return (
		<div className="flex flex-col gap-3">
			<p className="text-muted-foreground text-xs uppercase tracking-[0.4em]">
				{label}
			</p>
			<HeadingTag className="font-extrabold font-instrument-sans text-3xl text-neutral-600 leading-8 tracking-wider sm:text-6xl sm:leading-14 sm:tracking-wide dark:text-neutral-200">
				{title}
			</HeadingTag>
			{copy ? (
				<p className="max-w-2xl font-sans text-neutral-400 text-sm sm:text-base">
					{copy}
				</p>
			) : null}
		</div>
	);
};
