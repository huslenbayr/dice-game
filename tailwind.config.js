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
        ink: "#222831",
        sand: "#EEEEEE",
        clay: "#00ADB5",
        sky: "#393E46",
        moss: "#7FD3D6",
        gold: "#0E8B92"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 28px 72px rgba(8, 10, 15, 0.34)"
      },
      backgroundImage: {
        "mongolway-glow":
          "radial-gradient(circle at top left, rgba(0, 173, 181, 0.22), transparent 26%), radial-gradient(circle at bottom right, rgba(0, 173, 181, 0.14), transparent 24%), linear-gradient(160deg, #222831 0%, #2b313a 44%, #393E46 100%)"
      }
    }
  },
  plugins: []
};
