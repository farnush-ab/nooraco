import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050e1a",
          900: "#102b42",
          800: "#17476b",
          700: "#3a6a8a",
          500: "#6f8fa3",
          300: "#aebcc5",
          100: "#ebebee",
          50:  "#f4f4f6",
        },
        line: "rgba(16,43,66,0.10)",
      },
      fontFamily: {
        sans: ["var(--font-fa)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-serif)", "var(--font-fa)", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        floaty: "floaty 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
