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
            authLayout: "url('../public/assets/auth-layout-bg.jpg')",
         },
         colors: {
            mainPurple: "#412281",
            mainColor: "#2073fa",
            mainPink: "#FF88AF",
            mainBlack: "#191919",
         },
         screens: {
            xs: "400px",
            lg: "1100px",
            "2xl": "1700px",
            "3xl": "2400px",
            w840: "840px",
            w500: "500px",
         },
         clipPath: {
            wave: "polygon(0 75%, 50% 100%, 100% 75%, 100% 100%, 0 100%)",
         },
         fontFamily: {
            tiltWarp: ["TiltWarp"],
            thabit: ["Thabit"],
            thabitBold: ["ThabitBold"],
         },
      },
   },
   plugins: [require("tailwind-clip-path")],
};
