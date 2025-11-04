import * as THREE from "three";
import React, { useRef, forwardRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelCanvas = forwardRef<HTMLDivElement>((props, ref) => {
  // Simple rotating 3D model
  function Model() {
    const gltf = useGLTF("models/model.glb");
    const modelRef = useRef<THREE.Group>(null);
    useFrame(() => {
      if (modelRef.current) modelRef.current.rotation.y += 0.003;
    });
    return <primitive ref={modelRef} object={gltf.scene} scale={1.2} />;
  }

  return (
    <div ref={ref} className="w-full md:w-1/2 h-100 md:h-[600px] mb-8">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} />
        <Model />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
});

ModelCanvas.displayName = "ModelCanvas";

export default ModelCanvas;
