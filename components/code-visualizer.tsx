
"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, PerspectiveCamera, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function AnimatedShape({ position, color, speed = 1, distort = 0.4 }: { position: [number, number, number], color: string, speed?: number, distort?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.2
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.2
    
    // Subtle breathing effect
    const scale = 1 + Math.sin(t * 2) * 0.05
    meshRef.current.scale.setScalar(hovered ? scale * 1.2 : scale)
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
        <mesh 
            ref={meshRef} 
            position={position} 
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <icosahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial 
                color={color} 
                speed={speed * 1.5} 
                distort={distort} 
                radius={1}
                roughness={0.1}
                metalness={0.9} // More metallic for sleek look
            />
        </mesh>
    </Float>
  )
}

export function CodeVisualizer() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Wait for mount to avoid hydration mismatch with theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-[400px] bg-white/50 dark:bg-gray-900/50 rounded-lg animate-pulse" />

  const isDark = resolvedTheme === "dark"
  
  // Minimalist / GitHub-inspired monochrome palette
  const colors = {
    primary: isDark ? "#ffffff" : "#000000",
    secondary: isDark ? "#333333" : "#e5e5e5",
    accent: isDark ? "#2ecc71" : "#10b981", // Subtle green for contributions feel
    bg: "transparent"
  }

  return (
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden relative cursor-move bg-gray-50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="absolute top-4 left-4 z-10 text-xs font-mono text-gray-500/50 dark:text-white/30 pointer-events-none select-none">
        <div>SYS.VISUALIZER_V1</div>
        <div>THEME: {isDark ? "DARK" : "LIGHT"}</div>
        <div>STATUS: ACTIVE</div>
      </div>
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Environment preset={isDark ? "city" : "studio"} />
        
        <ambientLight intensity={isDark ? 0.2 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.5} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />

        <group>
            {/* Main shapes in monochrome metallic */}
            <AnimatedShape position={[-2, 0, 0]} color={colors.secondary} speed={2} distort={0.5} />
            <AnimatedShape position={[2, 1, -1]} color={colors.primary} speed={1.5} distort={0.3} />
            <AnimatedShape position={[0, -1, 1]} color={colors.accent} speed={3} distort={0.6} /> 
            
            {/* Background elements */}
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                 <mesh position={[4, -2, -5]}>
                    <torusGeometry args={[0.5, 0.2, 16, 32]} />
                    <meshStandardMaterial color={colors.secondary} wireframe opacity={0.2} transparent />
                 </mesh>
            </Float>
             <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                 <mesh position={[-3, 3, -4]}>
                    <octahedronGeometry args={[0.8]} />
                    <meshStandardMaterial color={colors.secondary} wireframe opacity={0.2} transparent />
                 </mesh>
            </Float>
        </group>

      </Canvas>
    </div>
  )
}
