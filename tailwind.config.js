const { default: daisyui } = require("daisyui");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // Using modern `rgb`
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary) / <alpha-value>)",
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["dark", "light", "cyberpunk", "luxury"],
  },
};
