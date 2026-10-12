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
        // ラベンダー・パープル・モーブ系
        lavender: {
          50: "#faf7fd",
          100: "#f4edfc",
          200: "#e9ddf9",
          300: "#d7c2f3",
          400: "#be9fe9",
          500: "#a077dc",
          600: "#8658cb",
          700: "#7043b3",
          dark: "#2a1e36",
        },
        // シャンパンゴールド系
        gold: {
          50: "#fdfbf7",
          100: "#f9f4ea",
          200: "#f0e3ca",
          300: "#e4cca2",
          400: "#d4af6e",
          500: "#c59b4b",
          600: "#a67c2e",
        },
        // パール・アイボリーホワイト系
        pearl: {
          50: "#ffffff",
          100: "#fdfcff",
          200: "#f8f6fc",
          300: "#f2eff8",
        },
        // 深みのあるパープルチャコール（可読性の高いエレガントなテキスト色）
        plum: {
          50: "#faf8fc",
          100: "#f3edf8",
          200: "#e6d8f1",
          300: "#d2bce3",
          400: "#b695d1",
          500: "#9b72be",
          600: "#8052ab",
          700: "#653a90",
          800: "#4c2870",
          900: "#2d1645",
          950: "#1a0b2b",
          dark: "#241a2f",
          body: "#463b52",
          muted: "#7c7088",
        },
      },
      fontFamily: {
        // 繊細で優美な明朝体・セリフ体を標準フォントに設定
        sans: [
          "var(--font-shippori)",
          "var(--font-noto-serif)",
          '"Hiragino Mincho ProN"',
          '"Yu Mincho"',
          '"BIZ UDPMincho"',
          "serif",
        ],
        serif: [
          "var(--font-cormorant)",
          "var(--font-shippori)",
          "var(--font-noto-serif)",
          "serif",
        ],
        mincho: [
          "var(--font-shippori)",
          "var(--font-noto-serif)",
          "serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.15em",
        luxe: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
