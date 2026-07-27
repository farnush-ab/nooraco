"use client";

export default function Logo({
  className = "",
  light = false,
  large = false,
}: {
  className?: string;
  light?: boolean;
  large?: boolean;
}) {
  const fill = light ? "#ebebee" : "#102b42";
  const size = large ? "h-8 w-8" : "h-5 w-5";
  const text = large ? "text-lg" : "text-xs";
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="Nooraco">
      <svg viewBox="0 0 64 64" className={size} aria-hidden>
        <g fill={fill}>
          <rect x="14" y="6" width="3" height="6" rx="1" />
          <rect x="47" y="6" width="3" height="6" rx="1" />
          <path d="M10 14 H54 V20 H44 C44 28 38 32 30 32 V40 C30 46 26 52 18 52 H10 Z" />
        </g>
      </svg>
      <span
        className={`${text} uppercase tracking-[0.32em]`}
        style={{ color: fill, fontWeight: 500 }}
      >
        nooraco
      </span>
    </a>
  );
}
