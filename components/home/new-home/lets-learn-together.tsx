import { useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import Marquee from "react-marquee-slider";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const images = ["subset1.webp", "subset9.jpg", "subset2.jpg", "subset13.jpg", "subset3.jpg", "subset4.jpg", "subset12.jpg", "subset5.jpg", "subset11.jpg", "subset6.jpg", "subset10.jpg", "subset7.jpg", "subset8.jpg"];

const LetsLearnTogether = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const features = useSelector((state: RootState) => state.accessibility.features);
   const animationsPaused = useMemo(() => features["pause animations"], [features]);

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
                        src={`/assets/landing/revamp/${image}`}
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
                        src={`/assets/landing/revamp/${image}`}
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
