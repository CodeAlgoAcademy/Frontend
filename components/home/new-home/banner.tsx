import React from "react";

const Banner = () => {
   return (
      <div className="relative h-[350px] w-full overflow-y-hidden">
         <svg
            id="visual"
            viewBox="0 0 900 600"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            className="absolute bottom-0 w-full"
         >
            <path
               d="M0 563L30 561.3C60 559.7 120 556.3 180 551.7C240 547 300 541 360 535.5C420 530 480 525 540 525.5C600 526 660 532 720 533.7C780 535.3 840 532.7 870 531.3L900 530L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z"
               fill="#FFFFFF"
               stroke-linecap="round"
               stroke-linejoin="miter"
            ></path>
         </svg>
         <img src={"/assets/home-banner.png"} className="h-full w-full object-cover object-center" />
      </div>
   );
};

export default Banner;
