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
      <div className="lets-learn-together-bg mt-12 p-20 max-md:px-7">
         <h1 className="text-center font-tiltWarp text-[2rem]  font-bold text-white max-md:text-[1.5rem]">LET’S HAVE FUN TOGETHER!</h1>
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
                        className="mx-4 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
                     />
                  ))}
               </Marquee>
            </div>

            <div className="mt-10 h-[200px] overflow-hidden max-md:h-[150px]">
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
                        className="mx-4 h-[200px] w-[240px] rounded-md object-cover max-md:h-[150px]"
                     />
                  ))}
               </Marquee>
            </div>
         </div>
      </div>
   );
};

export default LetsLearnTogether;
