"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { major_mono } from "@/fonts/fonts";

const MatrixRain = (): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = "01アイウエオカधキクケऊコサシスセソABCDEFअ";
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Determine current theme (resolvedTheme handles 'system' theme)
    const currentTheme = resolvedTheme || theme;
    const isDark = currentTheme === "dark";

    // Theme-based colors
    const bgFade = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
    const textColor = isDark ? "#064207" : "#86efac"; // dark green for dark mode, light green for light mode

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = bgFade;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px ${major_mono.className} uppercase`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, [theme, resolvedTheme]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full min-h-full opacity-30 pointer-events-none dark:opacity-20"
    />
  );
};

export default MatrixRain;
