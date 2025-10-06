import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelCanvas = () => {
  // Simple rotating 3D model
  function Model() {
    const gltf = useGLTF("models/model.glb");
    const ref = useRef<THREE.Group>(null);
    useFrame(() => {
      if (ref.current) ref.current.rotation.y += 0.003;
    });
    return <primitive ref={ref} object={gltf.scene} scale={1.2} />;
  }

  return (
    <div className="w-full md:w-1/2 h-100 md:h-[600px] my-8">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} />
        <Model />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default ModelCanvas;
