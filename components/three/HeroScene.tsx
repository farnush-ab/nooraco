"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, ContactShadows } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

/* ---- materials (brand navy + steel + a touch of brass) ------------------ */
function useMaterials() {
  return useMemo(() => {
    const steel = new THREE.MeshStandardMaterial({ color: "#c4ccd3", metalness: 1, roughness: 0.26 });
    const navyMatte = new THREE.MeshStandardMaterial({ color: "#26374e", metalness: 0.35, roughness: 0.42 });
    const navyDeep = new THREE.MeshStandardMaterial({ color: "#1b2a3e", metalness: 0.3, roughness: 0.55 });
    const threadNavy = new THREE.MeshStandardMaterial({ color: "#26384f", metalness: 0.1, roughness: 0.8 });
    const threadCharcoal = new THREE.MeshStandardMaterial({ color: "#3b4149", metalness: 0.1, roughness: 0.82 });
    const brass = new THREE.MeshStandardMaterial({ color: "#b9975b", metalness: 1, roughness: 0.32 });
    return { steel, navyMatte, navyDeep, threadNavy, threadCharcoal, brass };
  }, []);
}

/* ---- tailoring scissors ------------------------------------------------- */
function bladeGeometry() {
  const len = 2.9;
  const w = 0.34;
  const s = new THREE.Shape();
  s.moveTo(0, -w * 0.55);
  s.lineTo(len * 0.9, -w * 0.16);
  s.lineTo(len, 0);
  s.lineTo(len * 0.9, w * 0.2);
  s.lineTo(0, w * 0.55);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2, steps: 1 });
  g.center();
  return g;
}

function Scissors({ position, scale, rotation }: { position: [number, number, number]; scale: number; rotation: [number, number, number] }) {
  const mats = useMaterials();
  const blade = useMemo(bladeGeometry, []);

  // one arm = blade (on +x from pivot) + handle neck + finger loop (on -x)
  const Arm = ({ dir, loop }: { dir: 1 | -1; loop: [number, number] }) => (
    <group rotation={[0, 0, dir * 0.16]}>
      <mesh geometry={blade} material={mats.steel} position={[1.5, 0, 0]} castShadow />
      {/* neck */}
      <mesh material={mats.navyMatte} position={[-0.75, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 0.16, 0.14]} />
      </mesh>
      {/* finger loop */}
      <mesh material={mats.navyMatte} position={[-1.85, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[loop[0], loop[1], 1]} castShadow>
        <torusGeometry args={[0.42, 0.09, 16, 40]} />
      </mesh>
    </group>
  );

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <Arm dir={1} loop={[1, 1]} />
      <Arm dir={-1} loop={[1.25, 1]} />
      {/* pivot screw */}
      <mesh material={mats.steel} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 20]} />
      </mesh>
    </group>
  );
}

/* ---- thread spool ------------------------------------------------------- */
function Spool({ material, capMaterial, position, rotation, scale = 1 }: { material: THREE.Material; capMaterial: THREE.Material; position: [number, number, number]; rotation: [number, number, number]; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={material} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 1.1, 40]} />
      </mesh>
      <mesh material={capMaterial} position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.09, 40]} />
      </mesh>
      <mesh material={capMaterial} position={[0, -0.56, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.09, 40]} />
      </mesh>
      {/* centre hole hint */}
      <mesh material={capMaterial} position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.05, 20]} />
      </mesh>
    </group>
  );
}

/* ---- curling measuring tape -------------------------------------------- */
function useTapeTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#22344a";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = "rgba(233,238,242,0.9)";
    ctx.fillStyle = "rgba(233,238,242,0.92)";
    ctx.lineWidth = 2;
    ctx.font = "600 34px sans-serif";
    ctx.textAlign = "center";
    const step = 64;
    for (let x = 0, n = 1; x <= c.width; x += step, n++) {
      const tall = n % 2 === 0;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, tall ? 34 : 20);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, c.height);
      ctx.lineTo(x, c.height - (tall ? 34 : 20));
      ctx.stroke();
      if (tall) ctx.fillText(String(n * 2), x, c.height / 2 + 12);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function tapeGeometry() {
  // helix that loosens as it descends → a curling ribbon
  const N = 240;
  const raw: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const angle = t * Math.PI * 3.1;
    const radius = 1.25 * (1 - 0.42 * t);
    raw.push(new THREE.Vector3(Math.cos(angle) * radius, 1.7 - t * 3.4, Math.sin(angle) * radius * 0.7));
  }
  const curve = new THREE.CatmullRomCurve3(raw);
  const pts = curve.getSpacedPoints(N);
  const frames = curve.computeFrenetFrames(N, false);
  const width = 0.34;
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const repeats = 11;
  for (let i = 0; i <= N; i++) {
    const p = pts[i];
    const b = frames.binormals[i];
    const lx = p.x + b.x * width, ly = p.y + b.y * width, lz = p.z + b.z * width;
    const rx = p.x - b.x * width, ry = p.y - b.y * width, rz = p.z - b.z * width;
    pos.push(lx, ly, lz, rx, ry, rz);
    const u = (i / N) * repeats;
    uv.push(u, 0, u, 1);
  }
  for (let i = 0; i < N; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, d, a, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return { geometry: g, end: pts[N], endTangent: frames.tangents[N] };
}

function Tape({ position, scale, rotation }: { position: [number, number, number]; scale: number; rotation: [number, number, number] }) {
  const mats = useMaterials();
  const tex = useTapeTexture();
  const { geometry, end } = useMemo(tapeGeometry, []);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, metalness: 0.15, roughness: 0.7, color: "#ffffff" }),
    [tex]
  );
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <mesh geometry={geometry} material={mat} castShadow />
      {/* brass end tab */}
      <mesh material={mats.brass} position={[end.x, end.y - 0.12, end.z]} castShadow>
        <boxGeometry args={[0.4, 0.28, 0.05]} />
      </mesh>
    </group>
  );
}

/* ---- the whole floating still-life ------------------------------------- */
function Scene({ pointer, compact }: { pointer: React.MutableRefObject<{ x: number; y: number }>; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mats = useMaterials();
  const spread = compact ? 0.62 : 1;
  const s = compact ? 0.82 : 1;

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = pointer.current;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.18, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.12, 0.05);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <>
      <group ref={group} scale={s}>
        {/* scissors — left */}
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.7}>
          <Scissors position={[-3.7 * spread, -0.2, 0]} scale={0.9} rotation={[0.1, -0.2, 0.62]} />
        </Float>

        {/* thread spools — top cluster */}
        <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
          <Spool material={mats.threadCharcoal} capMaterial={mats.navyDeep} position={[0.2 * spread, 2.7, -0.6]} rotation={[0.5, 0.2, 0.5]} scale={0.9} />
        </Float>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2}>
          <Spool material={mats.threadNavy} capMaterial={mats.navyDeep} position={[1.15 * spread, 3.05, -0.3]} rotation={[0.3, -0.4, 0.9]} scale={0.8} />
        </Float>

        {/* thread spools — centre cluster */}
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
          <Spool material={mats.threadNavy} capMaterial={mats.navyDeep} position={[-0.2 * spread, -1.7, 0.5]} rotation={[0.6, 0.3, 0.4]} scale={0.95} />
        </Float>
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
          <Spool material={mats.threadCharcoal} capMaterial={mats.navyDeep} position={[-1.0 * spread, -2.0, 0.2]} rotation={[0.4, 0.5, -0.5]} scale={0.78} />
        </Float>
        <Float speed={1.35} rotationIntensity={0.5} floatIntensity={1.05}>
          <Spool material={mats.threadCharcoal} capMaterial={mats.navyDeep} position={[0.7 * spread, -2.15, 0.4]} rotation={[0.5, -0.2, 0.7]} scale={0.72} />
        </Float>

        {/* measuring tape — right */}
        <Float speed={1} rotationIntensity={0.16} floatIntensity={0.7}>
          <Tape position={[4.35 * spread, 0.1, -0.2]} scale={0.92} rotation={[0.1, -0.3, -0.15]} />
        </Float>
      </group>

      <ContactShadows position={[0, -3.1, 0]} opacity={0.32} scale={16} blur={2.8} far={5} color="#0c1c2c" />
    </>
  );
}

/* ---- soft studio lighting ---------------------------------------------- */
function Rig() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 7, 5]} intensity={1.5} color="#ffffff" castShadow />
      <directionalLight position={[-6, 1, 2]} intensity={0.5} color="#8ea3b5" />
      <Environment resolution={256}>
        <group>
          <Lightformer form="rect" intensity={2.6} position={[4, 5, 5]} scale={[8, 8, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1} position={[-5, 2, 3]} scale={[6, 6, 1]} color="#9fb2c2" />
          <Lightformer form="circle" intensity={1.5} position={[0, -4, 4]} scale={[5, 5, 1]} color="#dfe6ec" />
        </group>
      </Environment>
    </>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1.5);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener("change", onChange);
    setDpr(Math.min(window.devicePixelRatio, 1.75));
    const onResize = () => setCompact(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      m.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={dpr}
      camera={{ position: [0, 0, compact ? 12 : 9.5], fov: 42 }}
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
      <Scene pointer={pointer} compact={compact} />
    </Canvas>
  );
}
