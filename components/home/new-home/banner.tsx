import { useMediaQuery } from "@mui/material";
import React from "react";

const Banner = () => {
   return (
      <div className="relative w-full overflow-y-hidden max-md:h-[150px]">
         {/* <svg
            id="wave"
            className="absolute bottom-0 w-full transition-all duration-300"
            viewBox={isMobile ? "0 0 1920 300" : "0 0 1920 120"}
            xmlns="http://www.w3.org/2000/svg"
         >
            <path
               style={{ transform: "translate(0, 0px)", opacity: 1 }}
               fill="#ffffff"
               d="M0,60 C320,120, 440,140, 960,70 C1280,30,2600,30,1920,70 L1920,360 L0,360 Z"
            ></path>
         </svg>

         <img src={"/assets/0002.png"} className="h-full w-full object-cover object-center" /> */}

         <img src={"/assets/landing/banner.svg"} className="h-full w-full object-cover object-center" />
      </div>
   );
};

export default Banner;
