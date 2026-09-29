import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Robot from './Robot';

// Responsive Camera Component
const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const pCam = camera as THREE.PerspectiveCamera;
    
    // Adjust FOV based on aspect ratio to ensure robot fits
    if (aspect < 1) {
      // Mobile/Portrait
      pCam.fov = 65;
      pCam.position.set(0, 1.5, 9);
    } else if (aspect < 1.5) {
      // Tablet/Small Desktop
      pCam.fov = 55;
      pCam.position.set(2, 1.2, 8.5);
    } else {
      // Widescreen Desktop
      pCam.fov = 45;
      pCam.position.set(2.5, 1.2, 8.5);
    }
    
    pCam.lookAt(2.5, 0, 0);
    pCam.updateProjectionMatrix();
  }, [camera, size]);

  return null;
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas shadows camera={{ position: [2.5, 1.2, 8.5], fov: 45 }}>
        <ResponsiveCamera />
        <color attach="background" args={['#010103']} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.15} />
        
        {/* Key Light (Cyan) - Illuminates face and chest */}
        <spotLight position={[5, 6, 4]} angle={0.4} penumbra={0.8} intensity={180} color="#00f0ff" castShadow />
        
        {/* Fill Light (Violet) - Softens shadows from the other side */}
        <spotLight position={[-4, 3, 2]} angle={0.5} penumbra={1} intensity={120} color="#a300ff" />
        
        {/* Rim Light (White/Blue) - Highlights the metallic silhouette */}
        <pointLight position={[1, 4, -5]} intensity={100} color="#ffffff" />
        
        {/* Bottom Bounce Light - Ground integration */}
        <pointLight position={[2.5, -2, 2]} intensity={30} color="#00f0ff" />

        <Stars radius={50} depth={20} count={800} factor={2} saturation={0} fade speed={0.5} />

        <Suspense fallback={null}>
          <Robot />
          {/* Environment map for realistic metallic clearcoat reflections */}
          <Environment preset="city" blur={1} />
        </Suspense>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.3} 
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
