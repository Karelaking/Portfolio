/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/frontend/assets/Fonts/**/*.ttf",
    "./src/frontend/pages/**/*.tsx",
    "./src/frontend/components/**/*.tsx",
    "./src/frontend/constants/*.tsx",
    // "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
      comfortaa: ["comfortaa", "sans-serif"],
        korona_one: ["korona_one", "sans-serif"],
      lalezar:["lalezar", "sans-serif"]
    },
  },
  plugins: [
    // 'postcss-import',
    // tailwindcss,
    // autoprefixer,
  ],
}
}
