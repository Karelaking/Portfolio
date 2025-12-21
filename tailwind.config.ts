// import type { Config } from "tailwindcss";
import fluid, { extract, fontSize, screens } from 'fluid-tailwind'

const config = {
  content: {
    files: [
      "./app/**/*.{ts,tsx,js,jsx}",
      "./components/**/*.{ts,tsx,js,jsx}",
      "./pages/**/*.{ts,tsx,js,jsx}",
    ],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {},
  },
  plugins: [
    fluid
  ],
};

export default config;