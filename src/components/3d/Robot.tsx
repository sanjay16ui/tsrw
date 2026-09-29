import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { AudioOrchestrator } from '../../audio/AudioOrchestrator';

const Robot = () => {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  
  const { mouse } = useThree();

  // Materials
  const armorMaterial = new THREE.MeshPhysicalMaterial({
    color: '#a0aab8', // Lighter silver/gunmetal for better contrast
    metalness: 0.9,
    roughness: 0.25,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });

  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1d24', // Graphite
    metalness: 0.8,
    roughness: 0.6,
  });

  const jointMaterial = new THREE.MeshStandardMaterial({
    color: '#0a0a0c',
    metalness: 0.5,
    roughness: 0.9,
    wireframe: true,
  });

  const energyMaterial = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
  });

  const violetEnergyMaterial = new THREE.MeshBasicMaterial({
    color: '#a300ff',
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (group.current) {
      // Very subtle idle breathing
      group.current.position.y = Math.sin(t * 1.5) * 0.02 - 1.2;
      
      // Mouse tracking for whole body
      const targetX = mouse.x * 0.2;
      const targetY = mouse.y * 0.05;
      
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05);
    }

    if (chestRef.current) {
      chestRef.current.rotation.x = Math.sin(t * 1.5) * 0.02 + (AudioOrchestrator.getCurrentAmplitude() / 255) * 0.05;
    }

    if (headRef.current) {
      const headAmp = (AudioOrchestrator.getCurrentAmplitude() / 255) * 0.1;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouse.x * 0.6 + headAmp, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouse.y * 0.4 + headAmp * 0.5, 0.08);
    }
    
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.2) * 0.02 + 0.15;
      leftArmRef.current.rotation.x = Math.cos(t * 1.5) * 0.02;
      
      rightArmRef.current.rotation.z = -Math.sin(t * 1.2) * 0.02 - 0.15;
      rightArmRef.current.rotation.x = -Math.cos(t * 1.5) * 0.02;
    }

    if (coreRef.current) {
      // Audio reactive pulse (amplitude is 0 to 255)
      const amplitude = AudioOrchestrator.getCurrentAmplitude();
      const audioScale = 1 + (amplitude / 255) * 0.8; // Pulse up to 80% larger
      const idleScale = 1 + Math.sin(t * 4) * 0.1;
      const targetScale = Math.max(idleScale, audioScale);
      
      coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);
      
      // Also make the core material emissive intensity react
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat.emissiveIntensity !== undefined) {
         mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, 1 + (amplitude / 255) * 5, 0.2);
      }
    }

    if (ringRef.current && ringRef2.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef2.current.rotation.z = -t * 0.15;
    }
  });

  // Base robot position in the scene. 
  // It anchors at X=2.5 (right side) to balance the text on the left.
  return (
    <group position={[2.5, 0.5, 0]}>
      
      {/* GROUNDING ENERGY PLATFORM */}
      <group position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Ring */}
        <mesh ref={ringRef}>
          <ringGeometry args={[1.2, 1.25, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
        {/* Inner Ring */}
        <mesh ref={ringRef2}>
          <ringGeometry args={[0.9, 0.95, 64]} />
          <meshBasicMaterial color="#a300ff" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
        {/* Soft Glow Base */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[1.3, 64]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.03} />
        </mesh>
      </group>

      {/* ROBOT MESH HIERARCHY */}
      <group ref={group} scale={1.1}>
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.02}>
          
          {/* PELVIS / WAIST */}
          <group position={[0, 0, 0]}>
            <mesh material={armorMaterial}>
              <cylinderGeometry args={[0.35, 0.25, 0.5, 16]} />
            </mesh>
            <mesh position={[0, -0.25, 0]} material={darkMetalMaterial}>
              <sphereGeometry args={[0.25, 16, 16]} />
            </mesh>
          </group>

          {/* CHEST / TORSO */}
          <group ref={chestRef} position={[0, 1.0, 0]}>
            {/* Core Body */}
            <mesh material={darkMetalMaterial} position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 0.6, 16]} />
            </mesh>

            {/* Chest Armor Main */}
            <mesh material={armorMaterial} position={[0, 0.1, 0.05]}>
              <boxGeometry args={[1.0, 0.9, 0.45]} />
            </mesh>
            
            {/* Pectoral Plates (Layered) */}
            <mesh material={armorMaterial} position={[-0.25, 0.25, 0.3]}>
              <boxGeometry args={[0.4, 0.4, 0.1]} />
            </mesh>
            <mesh material={armorMaterial} position={[0.25, 0.25, 0.3]}>
              <boxGeometry args={[0.4, 0.4, 0.1]} />
            </mesh>

            {/* Glowing Core */}
            <mesh ref={coreRef} position={[0, -0.1, 0.3]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <MeshDistortMaterial color="#a300ff" envMapIntensity={2} clearcoat={1} metalness={0.9} roughness={0.1} distort={0.4} speed={4} />
            </mesh>

            {/* NECK */}
            <mesh material={jointMaterial} position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
            </mesh>

            {/* HEAD */}
            <group ref={headRef} position={[0, 0.95, 0]}>
              {/* Helmet Dome */}
              <mesh material={armorMaterial} position={[0, 0.05, -0.05]}>
                <sphereGeometry args={[0.28, 32, 32]} />
              </mesh>
              {/* Jaw / Lower Face */}
              <mesh material={darkMetalMaterial} position={[0, -0.1, 0.1]}>
                <boxGeometry args={[0.35, 0.25, 0.3]} />
              </mesh>
              {/* Visor */}
              <mesh material={energyMaterial} position={[0, 0.08, 0.22]}>
                <planeGeometry args={[0.35, 0.06]} />
              </mesh>
              {/* Ears/Sensors */}
              <mesh material={armorMaterial} position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
              </mesh>
              <mesh material={armorMaterial} position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
              </mesh>
            </group>

            {/* LEFT ARM */}
            <group ref={leftArmRef} position={[-0.65, 0.3, 0]}>
              {/* Shoulder Sphere */}
              <mesh material={darkMetalMaterial}>
                <sphereGeometry args={[0.2, 16, 16]} />
              </mesh>
              {/* Shoulder Armor Pad */}
              <mesh material={armorMaterial} position={[-0.1, 0.15, 0]} rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.35, 0.2, 0.4]} />
              </mesh>
              {/* Upper Arm */}
              <mesh material={armorMaterial} position={[0, -0.4, 0]}>
                <cylinderGeometry args={[0.1, 0.08, 0.6, 16]} />
              </mesh>
              {/* Elbow */}
              <mesh material={jointMaterial} position={[0, -0.8, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
              </mesh>
              {/* Forearm */}
              <mesh material={armorMaterial} position={[0, -1.2, 0]}>
                <cylinderGeometry args={[0.12, 0.08, 0.7, 16]} />
              </mesh>
              {/* Hand */}
              <mesh material={darkMetalMaterial} position={[0, -1.65, 0]}>
                <boxGeometry args={[0.12, 0.2, 0.1]} />
              </mesh>
            </group>

            {/* RIGHT ARM */}
            <group ref={rightArmRef} position={[0.65, 0.3, 0]}>
              {/* Shoulder Sphere */}
              <mesh material={darkMetalMaterial}>
                <sphereGeometry args={[0.2, 16, 16]} />
              </mesh>
              {/* Shoulder Armor Pad */}
              <mesh material={armorMaterial} position={[0.1, 0.15, 0]} rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.35, 0.2, 0.4]} />
              </mesh>
              {/* Upper Arm */}
              <mesh material={armorMaterial} position={[0, -0.4, 0]}>
                <cylinderGeometry args={[0.1, 0.08, 0.6, 16]} />
              </mesh>
              {/* Elbow */}
              <mesh material={jointMaterial} position={[0, -0.8, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
              </mesh>
              {/* Forearm */}
              <mesh material={armorMaterial} position={[0, -1.2, 0]}>
                <cylinderGeometry args={[0.12, 0.08, 0.7, 16]} />
              </mesh>
              {/* Hand */}
              <mesh material={darkMetalMaterial} position={[0, -1.65, 0]}>
                <boxGeometry args={[0.12, 0.2, 0.1]} />
              </mesh>
            </group>
          </group>

          {/* LEFT LEG */}
          <group position={[-0.25, -0.2, 0]}>
            {/* Thigh Joint */}
            <mesh material={jointMaterial}>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            {/* Thigh */}
            <mesh material={armorMaterial} position={[0, -0.55, 0]}>
              <cylinderGeometry args={[0.18, 0.12, 0.9, 16]} />
            </mesh>
            {/* Knee */}
            <mesh material={darkMetalMaterial} position={[0, -1.1, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            {/* Knee Armor */}
            <mesh material={armorMaterial} position={[0, -1.1, 0.1]}>
              <boxGeometry args={[0.15, 0.25, 0.1]} />
            </mesh>
            {/* Calf */}
            <mesh material={armorMaterial} position={[0, -1.75, 0]}>
              <cylinderGeometry args={[0.15, 0.1, 1.1, 16]} />
            </mesh>
            {/* Boot */}
            <mesh material={darkMetalMaterial} position={[0, -2.35, 0.05]}>
              <boxGeometry args={[0.2, 0.15, 0.3]} />
            </mesh>
          </group>

          {/* RIGHT LEG */}
          <group position={[0.25, -0.2, 0]}>
            {/* Thigh Joint */}
            <mesh material={jointMaterial}>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
            {/* Thigh */}
            <mesh material={armorMaterial} position={[0, -0.55, 0]}>
              <cylinderGeometry args={[0.18, 0.12, 0.9, 16]} />
            </mesh>
            {/* Knee */}
            <mesh material={darkMetalMaterial} position={[0, -1.1, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
            </mesh>
            {/* Knee Armor */}
            <mesh material={armorMaterial} position={[0, -1.1, 0.1]}>
              <boxGeometry args={[0.15, 0.25, 0.1]} />
            </mesh>
            {/* Calf */}
            <mesh material={armorMaterial} position={[0, -1.75, 0]}>
              <cylinderGeometry args={[0.15, 0.1, 1.1, 16]} />
            </mesh>
            {/* Boot */}
            <mesh material={darkMetalMaterial} position={[0, -2.35, 0.05]}>
              <boxGeometry args={[0.2, 0.15, 0.3]} />
            </mesh>
          </group>

        </Float>
      </group>
    </group>
  );
};

export default Robot;
