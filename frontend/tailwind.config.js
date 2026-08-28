/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050816",
          card: "#0b1026",
          accent: "#06b6d4",
          emerald: "#10b981",
        }
      }
    },
  },
  plugins: [],
}
