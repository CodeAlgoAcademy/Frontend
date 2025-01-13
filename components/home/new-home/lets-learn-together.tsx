import { useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import Marquee from "react-marquee-slider";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const images = ["learn1.png", "learn2.png", "learn3.png", "learn4.png", "learn5.png", "learn6.png", "learn7.png", "learn8.png"];

const LetsLearnTogether = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const features = useSelector((state: RootState) => state.accessibility.features);

   const animationsPaused = useMemo(() => features.includes("pause-animations"), [features]);

   return (
      <div className="mt-20">
         <div className="relative mt-12 w-full">
            <div className="h-[200px] overflow-hidden max-md:h-[150px]">
               <Marquee
                  scatterRandomly={false}
                  onFinish={() => {}}
                  onInit={() => {}}
                  resetAfterTries={3}
                  velocity={animationsPaused ? 0 : isMobile ? 2 : 8}
                  direction="ltr"
               >
                  {images.map((image, index) => (
                     <img
                        key={index}
                        src={`/assets/landing/${image}`}
                        alt={image}
                        className="mx-1 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
                     />
                  ))}
               </Marquee>
            </div>

            <div className="mt-5 h-[200px] overflow-hidden max-md:h-[150px]">
               <Marquee
                  scatterRandomly={false}
                  onFinish={() => {}}
                  onInit={() => {}}
                  resetAfterTries={3}
                  velocity={animationsPaused ? 0 : isMobile ? 2 : 8}
                  direction="rtl"
               >
                  {images.map((image, index) => (
                     <img
                        key={index}
                        src={`/assets/landing/${image}`}
                        alt={image}
                        className="mx-1 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
                     />
                  ))}
               </Marquee>
            </div>
         </div>
      </div>
   );
};

export default LetsLearnTogether;
