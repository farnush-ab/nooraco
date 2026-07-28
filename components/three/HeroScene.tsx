"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import {
  makeGearGeometry,
  makeNeedleGeometry,
  makeBobbinGeometry,
} from "./geometries";

/* Brand-locked materials -------------------------------------------------- */
const NAVY = "#163f5c";
const NAVY_DEEP = "#0c2438";
const STEEL = "#aebcc5";
const STEEL_MID = "#6f8fa3";

function useMaterials() {
  return useMemo(() => {
    const navy = new THREE.MeshStandardMaterial({
      color: new THREE.Color(NAVY),
      metalness: 0.98,
      roughness: 0.32,
    });
    const navyDeep = new THREE.MeshStandardMaterial({
      color: new THREE.Color(NAVY_DEEP),
      metalness: 0.95,
      roughness: 0.4,
    });
    const steel = new THREE.MeshStandardMaterial({
      color: new THREE.Color(STEEL),
      metalness: 1,
      roughness: 0.16,
    });
    const steelMid = new THREE.MeshStandardMaterial({
      color: new THREE.Color(STEEL_MID),
      metalness: 1,
      roughness: 0.26,
    });
    return { navy, navyDeep, steel, steelMid };
  }, []);
}

/* Spinning gear ----------------------------------------------------------- */
function Gear({
  geometry,
  material,
  position,
  rotationSpeed = 0.2,
  scale = 1,
  tilt = [0, 0, 0],
}: {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  position: [number, number, number];
  rotationSpeed?: number;
  scale?: number;
  tilt?: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += rotationSpeed * dt;
  });
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      material={material}
      position={position}
      rotation={tilt}
      scale={scale}
    />
  );
}

/* Scissors — the hero centerpiece. Two crossed arms + finger rings + pivot.
   Sways gently rather than spinning (a spinning scissor reads oddly). */
function Scissors({
  steel,
  navy,
  position = [0, 0, 0],
  scale = 1,
}: {
  steel: THREE.Material;
  navy: THREE.Material;
  position?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.12;
    group.current.rotation.y = Math.sin(t * 0.35) * 0.25;
  });

  const Arm = ({ side }: { side: 1 | -1 }) => (
    <group rotation={[0, 0, side * 0.2]}>
      {/* full arm bar (handle → blade) */}
      <mesh position={[0, 0.35, 0]} material={steel}>
        <boxGeometry args={[0.14, 2.7, 0.05]} />
      </mesh>
      {/* blade tip */}
      <mesh position={[0, 1.78, 0]} material={steel}>
        <coneGeometry args={[0.1, 0.5, 10]} />
      </mesh>
      {/* finger ring */}
      <mesh position={[0, -1.18, 0]} material={navy}>
        <torusGeometry args={[0.3, 0.06, 16, 40]} />
      </mesh>
    </group>
  );

  return (
    <group ref={group} position={position} scale={scale}>
      <Arm side={1} />
      <Arm side={-1} />
      {/* pivot screw (axis along z) */}
      <mesh material={steel} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.18, 20]} />
      </mesh>
    </group>
  );
}

/* Cluster — parallaxes toward the pointer -------------------------------- */
function Parts({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const mats = useMaterials();

  const gearMed = useMemo(
    () => makeGearGeometry({ teeth: 12, tipRadius: 1.22, holeRadius: 0.32, thickness: 0.32 }),
    []
  );
  const gearSmall = useMemo(
    () => makeGearGeometry({ teeth: 9, tipRadius: 1.2, holeRadius: 0.3, thickness: 0.28 }),
    []
  );
  const needle = useMemo(makeNeedleGeometry, []);
  const bobbin = useMemo(makeBobbinGeometry, []);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = pointer.current;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.3, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.24, 0.05);
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.4) * 0.07;
  });

  return (
    <group ref={group} scale={0.92}>
      {/* CENTREPIECE — scissors */}
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
        <Scissors steel={mats.steel} navy={mats.navy} position={[1.7, 0.1, 0.2]} scale={1.05} />
      </Float>

      {/* smaller supporting gears */}
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.7}>
        <Gear
          geometry={gearMed}
          material={mats.navy}
          position={[3.3, 1.5, -0.8]}
          scale={0.62}
          rotationSpeed={-0.3}
          tilt={[0.4, -0.2, 0]}
        />
      </Float>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        <Gear
          geometry={gearSmall}
          material={mats.steelMid}
          position={[0.1, -1.8, 0.9]}
          scale={0.5}
          rotationSpeed={0.5}
          tilt={[0.5, 0.3, 0]}
        />
      </Float>
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.8}>
        <Gear
          geometry={gearMed}
          material={mats.navyDeep}
          position={[-2.4, -0.7, -1.2]}
          scale={0.44}
          rotationSpeed={-0.22}
          tilt={[0.3, 0.2, 0]}
        />
      </Float>

      {/* needles */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.1}>
        <mesh
          geometry={needle}
          material={mats.steel}
          position={[-1.7, 1.6, 0.4]}
          rotation={[0, 0, Math.PI * 0.28]}
          scale={0.8}
        />
      </Float>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1}>
        <mesh
          geometry={needle}
          material={mats.steelMid}
          position={[2.7, -1.5, 0.5]}
          rotation={[0, 0, -Math.PI * 0.4]}
          scale={0.62}
        />
      </Float>

      {/* bobbins */}
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh
          geometry={bobbin}
          material={mats.navy}
          position={[-3, 1.5, 0.1]}
          rotation={[Math.PI * 0.5, 0, 0.3]}
          scale={0.7}
        />
      </Float>
      <Float speed={1.9} rotationIntensity={0.3} floatIntensity={1}>
        <mesh
          geometry={bobbin}
          material={mats.steel}
          position={[2.1, 2.1, -0.4]}
          rotation={[Math.PI * 0.42, 0.2, 0]}
          scale={0.42}
        />
      </Float>
    </group>
  );
}

/* Procedural studio lighting — no HDR files ------------------------------- */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} color="#dfe8ef" />
      <directionalLight position={[-6, -2, 2]} intensity={0.8} color="#3a6a8a" />
      <Environment resolution={256}>
        <group>
          <Lightformer form="rect" intensity={3} position={[3, 4, 4]} scale={[6, 6, 1]} color="#eaf1f6" />
          <Lightformer form="rect" intensity={1.4} position={[-4, 1, 3]} scale={[5, 5, 1]} color="#6f8fa3" />
          <Lightformer form="circle" intensity={2} position={[0, -4, 3]} scale={[4, 4, 1]} color="#17476b" />
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
      dpr={dpr}
      camera={{ position: [0, 0, 9], fov: 42 }}
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
      <Parts pointer={pointer} />
    </Canvas>
  );
}
