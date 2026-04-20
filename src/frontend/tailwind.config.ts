import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#131313",
        "on-background": "#e5e2e1",
        "primary": "#ffb4a8",
        "primary-container": "#ff5540",
        "on-primary-container": "#5c0000",
        "on-surface-variant": "#ebbbb4",
        "outline-variant": "#603e39",
        "surface-container": "#201f1f",
        "surface-container-lowest": "#0e0e0e",
      },
      fontFamily: {
        "headline": ["var(--font-archivo-black)", "Impact", "sans-serif"],
        "body": ["var(--font-manrope)", "system-ui", "sans-serif"],
        "label": ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: { "DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px" },
    },
  },
  plugins: [],
};
export default config;
