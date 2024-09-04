import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(234 47 83 / <alpha-value>)',
          50: 'rgb(255 233 240 / <alpha-value>)',
          100: 'rgb(254 211 219 / <alpha-value>)',
          200: 'rgb(247 164 180 / <alpha-value>)',
          300: 'rgb(241 114 139 / <alpha-value>)',
          400: 'rgb(236 72 105 / <alpha-value>)',
          500: 'rgb(234 47 83 / <alpha-value>)',
          600: 'rgb(234 33 71 / <alpha-value>)',
          700: 'rgb(208 19 57 / <alpha-value>)',
          800: 'rgb(187 10 49 / <alpha-value>)',
          900: 'rgb(164 0 41 / <alpha-value>)',
        },
        dark: '#0e1111',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
