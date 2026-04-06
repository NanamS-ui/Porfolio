'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const targetX = state.pointer.x * 0.9;
    const targetY = 2.7 + state.pointer.y * 0.5 + Math.sin(t * 0.35) * 0.12;
    const targetZ = 8 + Math.cos(t * 0.25) * 0.28;

    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.06);
    state.camera.lookAt(0, 0.1, -1.4);
  });

  return null;
}

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
        col[idx * 3] = 0.12 + t * 0.82;
        col[idx * 3 + 1] = 0.56 + t * 0.3;
        col[idx * 3 + 2] = 0.88 - t * 0.42;
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

function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.z = t * (0.12 + i * 0.03);
      mesh.rotation.y = Math.sin(t * 0.2 + i) * 0.25;
      mesh.position.y = -0.75 + Math.sin(t * 0.6 + i * 1.8) * 0.22;

      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = 0.09 + (Math.sin(t * 0.9 + i) + 1) * 0.035;
    });
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation-x={Math.PI / 2} position={[0, -0.75, -1.2]} scale={1 + i * 0.45}>
          <torusGeometry args={[2.2, 0.035, 18, 180]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#38bdf8' : '#f59e0b'}
            emissive={i % 2 === 0 ? '#0ea5e9' : '#f59e0b'}
            emissiveIntensity={0.55}
            transparent
            opacity={0.13}
            metalness={0.25}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null);
  const starCount = 900;

  const positions = useMemo(() => {
    const arr = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 9 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.45;
      arr[i * 3 + 2] = -radius * Math.cos(phi) - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;
    const t = state.clock.getElapsedTime();
    starsRef.current.rotation.y = t * 0.01;
    starsRef.current.rotation.x = Math.sin(t * 0.07) * 0.02;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#dbeafe"
        size={0.035}
        transparent
        opacity={0.42}
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
      color: i % 2 === 0 ? '#0ea5e9' : '#f59e0b',
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
          lineColors.push(0.4, 0.78, 1, 0.4, 0.78, 1);
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
        <fog attach="fog" args={['#041019', 9, 29]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.55} color="#0ea5e9" />
        <pointLight position={[-5, 3, -3]} intensity={0.35} color="#f59e0b" />
        <pointLight position={[0, -2, 2]} intensity={0.3} color="#2dd4bf" />
        <CameraRig />
        <StarField />
        <WaveGrid />
        <EnergyRings />
        <FloatingSpheres />
        <ConnectedLines />
      </Canvas>
    </div>
  );
}
