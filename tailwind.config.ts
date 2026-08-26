import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["var(--font-oswald)"],
        pixel: ["var(--font-pixel)"],
      },
      screens: { xs: "520px", "2xl": "1400px" },
      colors: {
        primary: {
          background: "rgba(255, 255, 255, .05)",
          foreground: "#fff",
        },
        secondary: {
          background: "rgba(255, 255, 255, .03)",
          foreground: "rgba(255,255,255,0.4)",
        },
        blue: {
          joust: "#56acff",
          cosmos: "#003049",
          hera: "#7179ef",
        },
        green: {
          benzol: "#00d372",
        },
        pink: {
          ice: "#d87cac",
        },
        border: "rgb(255 255 255 / 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
