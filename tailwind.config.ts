import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        accent: "var(--color-accent)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(18px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(18px) rotate(-360deg)" },
        },
        "orbit-rev": {
          "0%": { transform: "rotate(360deg) translateX(14px) rotate(-360deg)" },
          "100%": { transform: "rotate(0deg) translateX(14px) rotate(0deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        orbit: "orbit 6s linear infinite",
        "orbit-rev": "orbit-rev 8s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        riseIn: "riseIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
