"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  RoundedBox,
  ContactShadows,
} from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* Brand-locked materials -------------------------------------------------- */
function useMaterials() {
  return useMemo(() => {
    const navy = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1c4a6c"),
      metalness: 0.6,
      roughness: 0.34,
    });
    const navyDeep = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#102b42"),
      metalness: 0.6,
      roughness: 0.4,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c3cfd8"),
      metalness: 0.95,
      roughness: 0.22,
    });
    const cream = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#eef2f5"),
      metalness: 0.2,
      roughness: 0.5,
    });
    return { navy, navyDeep, steel, cream };
  }, []);
}

/* A chunky, friendly stylised sewing machine built from rounded boxes ----- */
function SewingMachine() {
  const mats = useMaterials();
  const r = 0.14;
  return (
    <group>
      {/* base */}
      <RoundedBox args={[4.2, 0.55, 1.5]} radius={r} smoothness={4} position={[0, -1.15, 0]} material={mats.navyDeep} castShadow />
      {/* little foot pads */}
      <RoundedBox args={[0.5, 0.2, 1.4]} radius={0.08} position={[-1.7, -1.45, 0]} material={mats.navy} castShadow />
      <RoundedBox args={[0.5, 0.2, 1.4]} radius={0.08} position={[1.7, -1.45, 0]} material={mats.navy} castShadow />

      {/* right column */}
      <RoundedBox args={[1.05, 2.5, 1.25]} radius={r} smoothness={4} position={[1.55, 0.15, 0]} material={mats.navy} castShadow />
      {/* arm across the top */}
      <RoundedBox args={[3.2, 0.8, 1.15]} radius={r} smoothness={4} position={[-0.1, 1.15, 0]} material={mats.navy} castShadow />
      {/* head (left) */}
      <RoundedBox args={[0.95, 1.35, 1.2]} radius={r} smoothness={4} position={[-1.5, 0.65, 0]} material={mats.navy} castShadow />

      {/* hand wheel on the right */}
      <mesh position={[1.55, 0.2, 0.75]} rotation={[Math.PI / 2, 0, 0]} material={mats.steel} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.22, 40]} />
      </mesh>
      <mesh position={[1.55, 0.2, 0.88]} rotation={[Math.PI / 2, 0, 0]} material={mats.navyDeep}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
      </mesh>

      {/* needle bar + needle under the head */}
      <mesh position={[-1.5, -0.15, 0.4]} material={mats.steel} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      </mesh>
      <mesh position={[-1.5, -0.5, 0.4]} material={mats.steel}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 10]} />
      </mesh>
      {/* presser foot hint */}
      <RoundedBox args={[0.32, 0.12, 0.5]} radius={0.04} position={[-1.5, -0.72, 0.4]} material={mats.steel} />

      {/* spool pin + thread spool on top */}
      <mesh position={[-0.2, 1.75, 0]} material={mats.steel}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 12]} />
      </mesh>
      <mesh position={[-0.2, 1.78, 0]} material={mats.cream} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.34, 24]} />
      </mesh>

      {/* stitch-plate accent line on the base */}
      <mesh position={[-0.3, -0.86, 0.5]} material={mats.steel}>
        <boxGeometry args={[2.2, 0.04, 0.06]} />
      </mesh>
    </group>
  );
}

/* Soft floating beads for a touch of whimsy (kept minimal) ---------------- */
function Bead({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(color), metalness: 0.3, roughness: 0.35 }),
    [color]
  );
  return (
    <mesh position={position} scale={scale} material={mat}>
      <sphereGeometry args={[1, 24, 24]} />
    </mesh>
  );
}

function Scene({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = pointer.current;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.22, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.12, 0.05);
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.7) * 0.12;
  });

  return (
    <>
      <group ref={group} scale={0.95}>
        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.35}>
          <SewingMachine />
        </Float>
      </group>

      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.4}>
        <Bead position={[3.2, 1.7, -0.5]} scale={0.28} color="#6f8fa3" />
      </Float>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.6}>
        <Bead position={[-3.1, -0.4, 0.6]} scale={0.2} color="#aebcc5" />
      </Float>
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.2}>
        <Bead position={[2.7, -1.5, 0.4]} scale={0.16} color="#3a6a8a" />
      </Float>

      {/* soft grounding shadow */}
      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.28}
        scale={9}
        blur={2.6}
        far={4}
        color="#102b42"
      />
    </>
  );
}

/* Bright, soft studio lighting for a light-background beauty shot --------- */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-5, 2, 3]} intensity={0.6} color="#aebcc5" />
      <Environment resolution={256}>
        <group>
          <Lightformer form="rect" intensity={2.4} position={[3, 5, 4]} scale={[7, 7, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1} position={[-5, 1, 3]} scale={[5, 5, 1]} color="#c9d6df" />
          <Lightformer form="circle" intensity={1.4} position={[0, -3, 4]} scale={[4, 4, 1]} color="#eef2f5" />
        </group>
      </Environment>
    </>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1.5);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    setDpr(Math.min(window.devicePixelRatio, 1.75));
    return () => m.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0, 0.4, 9.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        pointer.current = { x, y };
      }}
      style={{ pointerEvents: "auto" }}
    >
      <Rig />
      <Scene pointer={pointer} />
    </Canvas>
  );
}
