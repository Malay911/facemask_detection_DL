import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
        label: ["Rajdhani", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        ring: "hsl(var(--ring))",
        neon: {
          blue: "#00E5FF",
          cyan: "#00BFFF",
          purple: "#7A5FFF",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #00E5FF, #00BFFF, #7A5FFF)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float-orb-1 20s ease-in-out infinite",
        "scan": "scanLine 2s ease-in-out infinite",
      },
      boxShadow: {
        "neon-sm": "0 0 10px rgba(0, 229, 255, 0.2)",
        "neon": "0 0 20px rgba(0, 229, 255, 0.3), 0 0 50px rgba(0, 229, 255, 0.08)",
        "neon-lg": "0 0 30px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
