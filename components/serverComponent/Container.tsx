import type React from "react";
import { cn } from "@/lib";
import Scales from "../ui/scales";

export interface ContainerProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export const Container = ({
	children,
	className,
	id,
}: ContainerProps): React.ReactElement => (
	<section className="w-full border-t" id={id}>
		<div className="relative mx-auto max-w-6xl border-x border-dashed px-4 py-4 sm:py-12">
			<Scales className="" />
			<div
				className={cn(
					"mx-auto flex h-full min-h-dvh w-full max-w-5xl flex-col justify-center rounded-2xl bg-background px-8 shadow-lg sm:min-h-full",
					className
				)}
			>
				{children}
			</div>
		</div>
	</section>
);
