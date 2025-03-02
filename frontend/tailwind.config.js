/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        playwrite: ["Playwrite IT Moderna", "cursive"],
        merriweather: ["Merriweather", "serif"],
      },
      keyframes: {
        blinkGlow: {
          "0%, 100%": { boxShadow: "0px 0px 20px 3px #FFFFE0" },
          "50%": { boxShadow: "0px 0px 25px 5px #FFFFE0" },
        },
      },
      animation: {
        blinkGlow: "blinkGlow 3s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
