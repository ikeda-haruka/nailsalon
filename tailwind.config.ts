import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        strawberry: {
          50: "#fff5f8",
          100: "#ffe8ee",
          200: "#ffd1dc",
          300: "#ffb3c6",
          400: "#ff85a1",
          500: "#ff3366",
          600: "#e01a4f",
          dark: "#2c181b",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-sans-jp)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
