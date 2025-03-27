/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  extend: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      playwrite: ["Playwrite IT Moderna", "cursive"],
      merriweather: ["Merriweather", "serif"],
      "instrument-sans": ["Instrument Sans", "sans-serif"],
      "inter-sans-serif": ["Inter", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  keyframes: {
    // other keyframes...
    floating: {
      "0%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-15px)" },
      "100%": { transform: "translateY(0px)" },
    },
  },
  animation: {
    // other animations...
    floating: "floating 3s ease-in-out infinite",
  },
  theme: [],
};
