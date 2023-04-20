/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["pages/**/*.{js,ts,jsx,tsx}", "components/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         backgroundImage: {
            home1: "url('../public/assets/background3.png')",
            home2: "url('../public/assets/background2.png')",
            home3: "url('../public/assets/background1.png')",
            background: "url('../public/assets/background.png')",
         },
         colors: {
            mainPurple: "#412281",
         },
         screens: {
            xs: "400px",
            lg: "1100px",
            "2xl": "1700px",
         },
      },
   },
   plugins: [],
};
