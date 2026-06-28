import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const alt = "MK KATIYAR";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

const OpenGraphImage = (): ImageResponse =>
	new ImageResponse(
		<div
			style={{
				background: "#0a0a0a",
				color: "#f5f5f5",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "64px",
				gap: "18px",
				fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
			}}
		>
			<div
				style={{
					fontSize: 24,
					letterSpacing: 6,
					textTransform: "uppercase",
					opacity: 0.75,
				}}
			>
				Portfolio
			</div>
			<div
				style={{
					fontSize: 70,
					lineHeight: 1.1,
					fontWeight: 800,
					maxWidth: 980,
				}}
			>
				MK Katiyar
			</div>
			<div
				style={{
					fontSize: 34,
					opacity: 0.9,
					maxWidth: 980,
				}}
			>
				Full-Stack Developer · Next.js · TypeScript
			</div>
			<div
				style={{
					marginTop: 12,
					fontSize: 20,
					opacity: 0.65,
					maxWidth: 980,
				}}
			>
				{siteConfig.description}
			</div>
		</div>,
		{
			...size,
		}
	);

export default OpenGraphImage;
