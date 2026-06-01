import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = Math.random() * 0.5 + 0.2;
    }

    return [pos, spd];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    const posArray = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3 + 1] += Math.sin(time * speeds[i] + i) * 0.002;
      posArray[i3] += Math.cos(time * speeds[i] * 0.5 + i) * 0.001;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.01) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4A853"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -3]}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshStandardMaterial
        color="#D4A853"
        transparent
        opacity={0.08}
        wireframe
        emissive="#D4A853"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingOrb2() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = Math.cos(time * 0.4) * 0.6 - 1;
    meshRef.current.rotation.x = -time * 0.08;
    meshRef.current.rotation.z = time * 0.12;
  });

  return (
    <mesh ref={meshRef} position={[-3.5, -1, -4]}>
      <octahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color="#8B6914"
        transparent
        opacity={0.06}
        wireframe
        emissive="#8B6914"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#D4A853" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8B6914" />
        <Particles count={300} />
        <FloatingOrb />
        <FloatingOrb2 />
      </Canvas>
    </div>
  );
}
