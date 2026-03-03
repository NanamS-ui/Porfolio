'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Couleurs en tons de slate/gris avec un léger bleu
      const shade = 0.3 + Math.random() * 0.4;
      colors[i3] = shade * 0.85;
      colors[i3 + 1] = shade * 0.9;
      colors[i3 + 2] = shade;
    }
    return { positions, colors };
  }, [count]);

  const handlePointerMove = useCallback((event: any) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    mesh.current.rotation.y = Math.sin(time * 0.15) * 0.1 + time * 0.02;

    // Subtile réaction à la souris
    mesh.current.rotation.x += mousePosition.current.y * 0.05;
    mesh.current.rotation.y += mousePosition.current.x * 0.05;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = particlesPosition.positions[i3];
      const y = particlesPosition.positions[i3 + 1];
      const z = particlesPosition.positions[i3 + 2];

      positions[i3] = x + Math.sin(time * 0.3 + i * 0.01) * 0.15;
      positions[i3 + 1] = y + Math.cos(time * 0.2 + i * 0.01) * 0.15;
      positions[i3 + 2] = z + Math.sin(time * 0.1 + i * 0.005) * 0.1;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingGeometry() {
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.y = time * 0.2;
      torusRef.current.position.y = Math.sin(time * 0.5) * 0.5 + 2;
      torusRef.current.position.x = Math.cos(time * 0.3) * 0.3 - 4;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.x = time * 0.2;
      icosaRef.current.rotation.z = time * 0.15;
      icosaRef.current.position.y = Math.sin(time * 0.4 + 1) * 0.5 - 1;
      icosaRef.current.position.x = Math.cos(time * 0.25 + 1) * 0.3 + 4;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = time * 0.25;
      octaRef.current.rotation.z = time * 0.3;
      octaRef.current.position.y = Math.sin(time * 0.35 + 2) * 0.5;
      octaRef.current.position.x = Math.cos(time * 0.2 + 2) * 0.3 + 5;
    }
  });

  return (
    <>
      <mesh ref={torusRef} position={[-4, 2, -3]}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#64748b"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      <mesh ref={icosaRef} position={[4, -1, -2]}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#94a3b8"
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>

      <mesh ref={octaRef} position={[5, 0, -4]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#cbd5e1"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <Particles count={600} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
