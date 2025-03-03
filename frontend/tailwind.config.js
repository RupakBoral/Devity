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
        "instrument-sans": ["Instrument Sans", "sans-serif"],
        "inter-sans-serif": ["Inter", "sans-serif"],
      },
      keyframes: {
        blinkGlow: {
          "0%, 100%": { boxShadow: "0px 0px 5px 1px #e3cba5" },
          "50%": { boxShadow: "0px 0px 10px 4px #e3cba5" },
        },
      },
      animation: {
        blinkGlow: "blinkGlow 3s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
