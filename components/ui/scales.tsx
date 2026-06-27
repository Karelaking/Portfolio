import type React from "react";
import { cn } from "@/lib/utils";

export interface ScalesProps {
	className?: string;
	color?: string;
	orientation?: "horizontal" | "vertical" | "diagonal";
	size?: number;
}

export const Scales = ({
	orientation = "diagonal",
	size = 10,
	className,
	color,
}: ScalesProps) => {
	const getGradientAngle = () => {
		switch (orientation) {
			case "horizontal":
				return "0deg";
			case "vertical":
				return "90deg";
			case "diagonal":
			default:
				return "315deg";
		}
	};

	return (
		<div
			className={cn(
				"absolute inset-0 h-full w-full overflow-hidden",
				"[--pattern-scales:var(--color-neutral-950)]/10",
				"dark:[--pattern-scales:var(--color-white)]/10",
				className
			)}
			style={
				{
					"--scales-size": `${size}px`,
					"--scales-angle": getGradientAngle(),
					...(color && { "--pattern-scales": color }),
				} as React.CSSProperties
			}
		>
			<div
				className="h-full w-full bg-[repeating-linear-gradient(var(--scales-angle),var(--pattern-scales)_0,var(--pattern-scales)_1px,transparent_0,transparent_50%)]"
				style={{
					backgroundSize: "var(--scales-size) var(--scales-size)",
				}}
			/>
		</div>
	);
};

export interface ScalesContainerProps extends ScalesProps {
	children?: React.ReactNode;
	containerClassName?: string;
}

export const ScalesContainer = ({
	children,
	orientation = "diagonal",
	size = 10,
	className,
	containerClassName,
	color,
}: ScalesContainerProps) => (
	<div className={cn("relative", containerClassName)}>
		<Scales
			className={className}
			color={color}
			orientation={orientation}
			size={size}
		/>
		<div className="relative z-10">{children}</div>
	</div>
);

export default Scales;
