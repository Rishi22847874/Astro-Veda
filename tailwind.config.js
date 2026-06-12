/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: { 50: "#F6F3FB", 100: "#EDE7F6", 200: "#D6C8EE", 400: "#7E57C2", 600: "#5E35B1", 700: "#4527A0", 900: "#311B92" },
        gold: { 300: "#E6C868", 400: "#D4AF37", 500: "#C9A227", 600: "#A8861C" },
        ink: "#1C1530"
      },
      fontFamily: {
        display: ["Marcellus", "serif"],
        body: ["Mulish", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(49,27,146,0.10)",
        lift: "0 16px 50px rgba(49,27,146,0.18)"
      }
    }
  },
  plugins: []
};
