"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useRef } from "react";

// 3D Point Interface
interface Point3D {
	x: number;
	y: number;
	z: number;
}

// 3D Edge Interface
type Edge = [number, number];

// Generate 3D Icosahedron Vertices & Edges
const phi = (1 + Math.sqrt(5)) / 2;
const ICOSAHEDRON_VERTICES: Point3D[] = [
	{ x: -1, y: phi, z: 0 },
	{ x: 1, y: phi, z: 0 },
	{ x: -1, y: -phi, z: 0 },
	{ x: 1, y: -phi, z: 0 },
	{ x: 0, y: -1, z: phi },
	{ x: 0, y: 1, z: phi },
	{ x: 0, y: -1, z: -phi },
	{ x: 0, y: 1, z: -phi },
	{ x: phi, y: 0, z: -1 },
	{ x: phi, y: 0, z: 1 },
	{ x: -phi, y: 0, z: -1 },
	{ x: -phi, y: 0, z: 1 },
];

const ICOSAHEDRON_EDGES: Edge[] = [
	[0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
	[1, 5], [1, 7], [1, 8], [1, 9],
	[2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
	[3, 4], [3, 6], [3, 8], [3, 9],
	[4, 5], [4, 9], [4, 11],
	[5, 9], [5, 11],
	[6, 7], [6, 8], [6, 10],
	[7, 8], [7, 10],
	[8, 9],
	[10, 11],
];

// Inner Cube Vertices & Edges
const CUBE_VERTICES: Point3D[] = [
	{ x: -0.6, y: -0.6, z: -0.6 },
	{ x: 0.6, y: -0.6, z: -0.6 },
	{ x: 0.6, y: 0.6, z: -0.6 },
	{ x: -0.6, y: 0.6, z: -0.6 },
	{ x: -0.6, y: -0.6, z: 0.6 },
	{ x: 0.6, y: -0.6, z: 0.6 },
	{ x: 0.6, y: 0.6, z: 0.6 },
	{ x: -0.6, y: 0.6, z: 0.6 },
];

const CUBE_EDGES: Edge[] = [
	[0, 1], [1, 2], [2, 3], [3, 0],
	[4, 5], [5, 6], [6, 7], [7, 4],
	[0, 4], [1, 5], [2, 6], [3, 7],
];

export const Geometric3DPattern = (): React.ReactElement => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { resolvedTheme } = useTheme();
	const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const targetMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrameId: number;
		let angleX = 0.4;
		let angleY = 0.6;
		let angleZ = 0.2;

		const handleMouseMove = (e: MouseEvent): void => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
			const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
			targetMouse.current = { x, y };
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener("mousemove", handleMouseMove);
		}

		const resizeCanvas = (): void => {
			if (!container || !canvas) return;
			const dpr = window.devicePixelRatio || 1;
			canvas.width = container.clientWidth * dpr;
			canvas.height = container.clientHeight * dpr;
			ctx.scale(dpr, dpr);
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const isDark = resolvedTheme === "dark";

		// Render Loop
		const render = (): void => {
			if (!container || !canvas) return;
			const width = container.clientWidth;
			const height = container.clientHeight;

			ctx.clearRect(0, 0, width, height);

			// Smooth mouse tracking interpolation
			mousePos.current.x += (targetMouse.current.x - mousePos.current.x) * 0.05;
			mousePos.current.y += (targetMouse.current.y - mousePos.current.y) * 0.05;

			// Update rotation angles
			const speed = 0.005;
			angleX += speed + mousePos.current.y * 0.002;
			angleY += speed * 1.5 + mousePos.current.x * 0.002;
			angleZ += speed * 0.5;

			// Center & Scale
			const cx = width / 2;
			const cy = height / 2;
			const scale = Math.min(width, height) * 0.20;
			const fov = 400;

			// Draw 3D Grid Rays Background
			ctx.lineWidth = 1;
			ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.05)";
			const gridCount = 8;
			const gridStep = Math.min(width, height) / gridCount;

			for (let i = -gridCount; i <= gridCount; i++) {
				ctx.beginPath();
				ctx.moveTo(cx + i * gridStep, 0);
				ctx.lineTo(cx + i * gridStep, height);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(0, cy + i * gridStep);
				ctx.lineTo(width, cy + i * gridStep);
				ctx.stroke();
			}

			// Helper to Rotate & Project 3D Points
			const project = (point: Point3D, scaleFactor = 1): { x: number; y: number; z: number } => {
				let { x, y, z } = point;
				x *= scaleFactor;
				y *= scaleFactor;
				z *= scaleFactor;

				// Rotate X
				const radX = angleX;
				const y1 = y * Math.cos(radX) - z * Math.sin(radX);
				const z1 = y * Math.sin(radX) + z * Math.cos(radX);
				const x1 = x;

				// Rotate Y
				const radY = angleY;
				const x2 = x1 * Math.cos(radY) + z1 * Math.sin(radY);
				const z2 = -x1 * Math.sin(radY) + z1 * Math.cos(radY);
				const y2 = y1;

				// Rotate Z
				const radZ = angleZ;
				const x3 = x2 * Math.cos(radZ) - y2 * Math.sin(radZ);
				const y3 = x2 * Math.sin(radZ) + y2 * Math.cos(radZ);
				const z3 = z2;

				// Perspective Projection
				const distance = 4;
				const projectedX = (x3 * fov) / (z3 + distance) + cx;
				const projectedY = (y3 * fov) / (z3 + distance) + cy;

				return { x: projectedX, y: projectedY, z: z3 };
			};

			// Render Geometry helper
			const drawMesh = (vertices: Point3D[], edges: Edge[], scaleFactor = 1, isSecondary = false): void => {
				const projected = vertices.map((v) => project(v, scaleFactor));

				// Draw Edges with Z-Depth gradient alpha
				for (const [startIdx, endIdx] of edges) {
					const p1 = projected[startIdx];
					const p2 = projected[endIdx];
					if (!p1 || !p2) continue;

					const avgZ = (p1.z + p2.z) / 2;
					const alpha = Math.max(0.1, Math.min(1, (avgZ + 2) / 3.5));

					ctx.beginPath();
					ctx.moveTo(p1.x, p1.y);
					ctx.lineTo(p2.x, p2.y);

					if (isSecondary) {
						ctx.strokeStyle = isDark
							? `rgba(255, 255, 255, ${alpha * 0.4})`
							: `rgba(0, 0, 0, ${alpha * 0.35})`;
						ctx.lineWidth = 1;
						ctx.setLineDash([4, 4]);
					} else {
						ctx.strokeStyle = isDark
							? `rgba(255, 255, 255, ${alpha * 0.85})`
							: `rgba(0, 0, 0, ${alpha * 0.85})`;
						ctx.lineWidth = 1.5;
						ctx.setLineDash([]);
					}
					ctx.stroke();
				}

				// Draw Vertex Node Dots
				for (const p of projected) {
					const nodeAlpha = Math.max(0.2, Math.min(1, (p.z + 2) / 3.5));
					const nodeRadius = isSecondary ? 2.5 : 3.5;

					ctx.beginPath();
					ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
					ctx.fillStyle = isDark
						? `rgba(255, 255, 255, ${nodeAlpha})`
						: `rgba(0, 0, 0, ${nodeAlpha})`;
					ctx.fill();

					// Outer vertex halo
					ctx.beginPath();
					ctx.arc(p.x, p.y, nodeRadius + 3, 0, Math.PI * 2);
					ctx.strokeStyle = isDark
						? `rgba(255, 255, 255, ${nodeAlpha * 0.3})`
						: `rgba(0, 0, 0, ${nodeAlpha * 0.2})`;
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			};

			// Draw Dual 3D Geometry
			drawMesh(ICOSAHEDRON_VERTICES, ICOSAHEDRON_EDGES, scale * 0.009, false);
			drawMesh(CUBE_VERTICES, CUBE_EDGES, scale * 0.0055, true);

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return (): void => {
			cancelAnimationFrame(animationFrameId);
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
			}
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [resolvedTheme]);

	return (
		<motion.div
			className="relative flex h-full min-h-80 w-full flex-col justify-between overflow-hidden bg-transparent p-0 sm:min-h-96"
			initial={{ opacity: 0, scale: 0.96 }}
			ref={containerRef}
			transition={{ duration: 0.6 }}
			viewport={{ once: true }}
			whileInView={{ opacity: 1, scale: 1 }}
		>
			{/* Interactive 3D Canvas Area */}
			<div className="relative flex h-full min-h-80 w-full flex-1 items-center justify-center sm:min-h-96">
				<canvas className="absolute inset-0 h-full w-full" ref={canvasRef} />
			</div>
		</motion.div>
	);
};
