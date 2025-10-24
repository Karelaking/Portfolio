"use clientt";

import FloatingParticles from "@/components/floating-particles";
import GridBackground from "@/components/grid-background";
import Hero from "@/components/hero-section";
import MatrixRain from "@/components/matrix-rain";
import ScanningLine from "@/components/scanning-line";

export default function Home() {
  return (
    <main className="w-full min-h-screen max-h-full bg-white dark:bg-gray-900">
      <MatrixRain />
      <ScanningLine />
      <GridBackground />
      <FloatingParticles />
      <Hero />
    </main>
  );
}
