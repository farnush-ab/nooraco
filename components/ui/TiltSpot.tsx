"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * A card wrapper that combines:
 *  - a subtle 3D tilt toward the cursor (perspective transform)
 *  - a soft spotlight that tracks the pointer via CSS variables
 * Both collapse gracefully when reduced-motion is requested.
 */
export default function TiltSpot({
  children,
  className = "",
  max = 8,
  spotlight = true,
  glare = "rgba(174,188,197,0.18)",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  spotlight?: boolean;
  glare?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16 });
  const rXd = useTransform(srx, (v) => `${v}deg`);
  const rYd = useTransform(sry, (v) => `${v}deg`);

  return (
    <div
      ref={ref}
      className={`perspective ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        if (spotlight) {
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        }
        if (!reduce) {
          ry.set((px - 0.5) * max * 2);
          rx.set(-(py - 0.5) * max * 2);
        }
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX: reduce ? 0 : rXd,
          rotateY: reduce ? 0 : rYd,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {children}
        {spotlight && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 [.perspective:hover_&]:opacity-100"
            style={{
              background: `radial-gradient(220px circle at var(--mx,50%) var(--my,50%), ${glare}, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
