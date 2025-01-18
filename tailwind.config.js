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
    extend: {
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blinkCaret: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'orange' },
        },
      },
      animation: {
        typing: 'typing 3.5s steps(40, end)',
        blinkCaret: 'blinkCaret .75s step-end infinite',
      },
    },
}
}
