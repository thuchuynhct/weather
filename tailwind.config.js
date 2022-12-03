/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      spacing: {
        'fit-content': "fit-content",
      },
      colors: {
        "text-main": "#f5f5f5",
        "300": "rgba(0, 0, 0, .3)",
        "light": "rgba(110, 110, 110, .25)"
      },
      screens: {
        "lg": { max: "1350px" },
        "sm": { max: "600px" }
      }
    },
  },
  plugins: [],
}
