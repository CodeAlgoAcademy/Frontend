/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('../public/assets/background.png')",
      },
      colors: {
        mainPurple: '#412281',
      },
    },
  },
  plugins: [],
};
