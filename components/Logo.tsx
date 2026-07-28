"use client";

/**
 * Brand logo — the circular Noora badge (navy disc with white machine +
 * wordmark). Served from /public/logo.png with transparent corners, so it
 * drops cleanly onto both the light sections and the dark hero/footer.
 * The `light` prop is kept for API compatibility with existing callers.
 */
export default function Logo({
  className = "",
  light = false,
  large = false,
}: {
  className?: string;
  light?: boolean;
  large?: boolean;
}) {
  const size = large ? "h-14 w-14" : "h-10 w-10";
  // On dark backgrounds (light=true) the navy disc can blend in, so lift it
  // with a faint ring + soft glow. On light sections it needs nothing.
  const onDark = light
    ? "rounded-full ring-1 ring-ink-100/20 shadow-[0_0_0_3px_rgba(174,188,197,0.06)]"
    : "";
  return (
    <a
      href="#top"
      className={`inline-flex items-center ${className}`}
      aria-label="نوراکو · Nooraco"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="نوراکو"
        className={`${size} select-none object-contain ${onDark}`}
        draggable={false}
      />
    </a>
  );
}
