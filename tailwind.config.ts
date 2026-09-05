import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brick: {
          50: '#fdf2f0',
          100: '#fce5e0',
          200: '#f9ccc3',
          300: '#f3a99a',
          400: '#e97d6a',
          500: '#d95842',
          600: '#B23B23',
          700: '#9a3320',
          800: '#7f2d1f',
          900: '#6a2a1e',
        },
        slate: {
          850: '#1F2937',
          950: '#0f172a',
        },
        accent: {
          orange: '#F97316',
        }
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
