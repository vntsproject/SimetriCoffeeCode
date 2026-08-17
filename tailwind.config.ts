import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blackCafe: "#0E0E0E",
        whiteCafe: "#FFFFFF",
        lineCafe: "rgba(14,14,14,0.10)",
        warmCafe: "#F7F5F1",
        goldCafe: "#B08D57"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(14,14,14,0.08)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22,1,0.36,1)"
      }
    }
  },
  plugins: []
};

export default config;
