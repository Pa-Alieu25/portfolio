import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0b1117",
        surface: "#121c26",
        mint: "#7dd9c0",
        ink: "#f3f6fa",
        muted: "#b3bfcd",
        line: "#2d3b49",
      },
      fontFamily: {
        display: ["Space Grotesk Variable", "sans-serif"],
        sans: ["Source Sans 3 Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
