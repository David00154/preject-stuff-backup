/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        custom:{
          "play-btn-bg-color":"#adf144",
          "play-btn-color-blue":"#0c439e",
          "bg-color-black":"#010101",
          "bg-color-2":"#f5f4f2",
          "dark-secondary":"#1d1c18",
          light:"#ffffff"
        }
      }
    },
  },
  plugins: [],
}

