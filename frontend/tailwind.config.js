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
        LightblinkGlow: {
          "0%, 100%": { boxShadow: "0px 0px 5px 1px white" },
          "50%": { boxShadow: "0px 0px 10px 4px white" },
        },
        DarkblinkGlow: {
          "0%, 100%": { boxShadow: "0px 0px 5px 1px gray" },
          "50%": { boxShadow: "0px 0px 10px 4px gray" },
        },
      },
      animation: {
        LightblinkGlow: "LightblinkGlow 3s infinite",
        DarkblinkGlow: "DarkblinkGlow 3s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
