/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14202B",
        sand: "#F2EAE0",
        clay: "#A65C3A",
        sky: "#83B6C9",
        moss: "#65745B",
        gold: "#D8A85B"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(20, 32, 43, 0.12)"
      },
      backgroundImage: {
        "mongolway-glow":
          "radial-gradient(circle at top left, rgba(216, 168, 91, 0.28), transparent 24%), radial-gradient(circle at bottom right, rgba(131, 182, 201, 0.2), transparent 26%), linear-gradient(160deg, #f7f1e8 0%, #f4ece0 48%, #e7eef2 100%)"
      }
    }
  },
  plugins: []
};
