'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaveGrid() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 80;
  const sep = 0.35;

  const { positions, colors } = useMemo(() => {
    const total = count * count;
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 3);
    let idx = 0;

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = (xi - count / 2) * sep;
        const z = (zi - count / 2) * sep;
        pos[idx * 3] = x;
        pos[idx * 3 + 1] = 0;
        pos[idx * 3 + 2] = z;

        const t = xi / count;
        col[idx * 3] = 0.4 + t * 0.3;
        col[idx * 3 + 1] = 0.2 + t * 0.6;
        col[idx * 3 + 2] = 0.9 - t * 0.2;
        idx++;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;

    let idx = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = (xi - count / 2) * sep;
        const z = (zi - count / 2) * sep;
        const dist = Math.sqrt(x * x + z * z);
        pos[idx * 3 + 1] = Math.sin(dist * 0.8 - time * 1.5) * 0.4 * Math.exp(-dist * 0.04);
        idx++;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.03;
  });

  const total = count * count;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={total} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={total} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4 - 2,
      ] as [number, number, number],
      scale: 0.15 + Math.random() * 0.25,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: i % 2 === 0 ? '#8b5cf6' : '#06b6d4',
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = spheres[i];
      child.position.y = s.position[1] + Math.sin(time * s.speed + s.offset) * 0.8;
      child.position.x = s.position[0] + Math.cos(time * s.speed * 0.5 + s.offset) * 0.3;
      (child as THREE.Mesh).rotation.x = time * 0.2;
      (child as THREE.Mesh).rotation.z = time * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={s.color}
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function ConnectedLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      points.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6 - 2,
      ]);
    }

    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const threshold = 4;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePositions.push(...points[i], ...points[j]);
          lineColors.push(0.55, 0.35, 0.95, 0.55, 0.35, 0.95);
        }
      }
    }
    return {
      positions: new Float32Array(linePositions),
      colors: new Float32Array(lineColors),
    };
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    linesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  const lineCount = positions.length / 3;

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={lineCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={lineCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.08} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[-5, 3, -3]} intensity={0.3} color="#06b6d4" />
        <WaveGrid />
        <FloatingSpheres />
        <ConnectedLines />
      </Canvas>
    </div>
  );
}
