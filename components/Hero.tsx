"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import MatrixRain from "./MatrixRain";

// Simple rotating 3D model
function Model() {
  const gltf = useGLTF("models/model.glb");
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003;
  });
  return <primitive ref={ref} object={gltf.scene} scale={1.2} />;
}

// Matrix-style falling code effect


export default function Hero() {
  const heading = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const buttons = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [heading.current, sub.current, buttons.current];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        setTimeout(() => {
          el.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, i * 200);
      }
    });
  }, []);

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-16 lg:px-24 bg-gradient-to-tr from-indigo-50 to-white overflow-hidden my-4 lg:my-0">
      {/* Matrix rain background */}
      <MatrixRain />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                5 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-scan" />
      </div>

      {/* Text block */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1
          ref={heading}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900"
        >
          MRADUL KUMAR
          <br />
          Web Developer | UI/UX Designer | Creative Problem Solver
        </h1>
        <p ref={sub} className="text-lg md:text-xl text-gray-700 max-w-lg">
          I design and build modern, responsive, and user-focused websites that
          don&apos;t just look good — they perform. My mission is simple: turn
          ideas into seamless digital experiences that leave a lasting
          impression.
        </p>

        <div
          ref={buttons}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <a
            href="#portfolio"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="inline-block px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
          >
            Let&apos;s Connect
          </a>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full md:w-1/2 h-100 md:h-[600px] my-8">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 5, 5]} />
          <Model />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Decorative animated circle */}
      <div className="absolute top-10 right-10 w-40 h-40 border-4 border-indigo-200 rounded-full animate-ping-slow"></div>
    </section>
  );
}
