/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home': "url('../assets/imgs/img1.jpg')",
      },
      colors: {
        mainPurple: '#412281'
      }
    },
  },
  plugins: [],
}
