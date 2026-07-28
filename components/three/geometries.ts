import * as THREE from "three";

/**
 * Procedural gear geometry — real 3D teeth via an extruded THREE.Shape.
 * No external assets; everything is generated at runtime.
 */
export function makeGearGeometry({
  teeth = 12,
  rootRadius = 1,
  tipRadius = 1.22,
  holeRadius = 0.34,
  thickness = 0.34,
  bevel = 0.05,
}: {
  teeth?: number;
  rootRadius?: number;
  tipRadius?: number;
  holeRadius?: number;
  thickness?: number;
  bevel?: number;
} = {}) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    // trapezoidal tooth (first half) followed by a root valley (second half)
    const p = [
      [a + step * 0.0, rootRadius],
      [a + step * 0.12, tipRadius],
      [a + step * 0.34, tipRadius],
      [a + step * 0.46, rootRadius],
      [a + step * 0.5, rootRadius],
      [a + step * 0.99, rootRadius],
    ] as const;
    p.forEach(([ang, r], j) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();

  // center bore
  const hole = new THREE.Path();
  hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 24,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/** A sewing needle: long tapered shaft with an eye near the tip. */
export function makeNeedleGeometry() {
  const shaft = new THREE.CylinderGeometry(0.05, 0.03, 2.6, 16);
  return shaft;
}

/** A bobbin: two flanges + a core, built as a lathe profile. */
export function makeBobbinGeometry() {
  const pts: THREE.Vector2[] = [
    new THREE.Vector2(0.0, -0.5),
    new THREE.Vector2(0.5, -0.5),
    new THREE.Vector2(0.5, -0.42),
    new THREE.Vector2(0.22, -0.36),
    new THREE.Vector2(0.22, 0.36),
    new THREE.Vector2(0.5, 0.42),
    new THREE.Vector2(0.5, 0.5),
    new THREE.Vector2(0.0, 0.5),
  ];
  const geo = new THREE.LatheGeometry(pts, 40);
  geo.center();
  return geo;
}
