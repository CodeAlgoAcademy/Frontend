import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { detect } from "detect-browser";

const Hero = () => {
   const features = useSelector((state: RootState) => state.accessibility.features);
   const videoRef = useRef<HTMLVideoElement>();
   const [isChrome, setIsChrome] = useState(false);

   const animationsPaused = useMemo(() => features["pause animations"], [features]);

   useEffect(() => {
      const video = videoRef?.current;

      const handleCanPlay = () => {
         if (animationsPaused) {
            video?.pause();
         } else {
            video?.play().catch((err) => {
               console.error("Error playing video:", err);
            });
         }
      };

      video?.addEventListener("canplay", handleCanPlay);

      return () => {
         video?.removeEventListener("canplay", handleCanPlay);
      };
   }, [videoRef, animationsPaused]);

   useEffect(() => {
      const browser = detect();
      const isChrome = browser?.name == "edge" || browser?.name == "chrome";
      setIsChrome(isChrome);
   }, []);

   return (
      <header className="relative">
         {!isChrome ? (
            <div className="h-[50hv] w-full  md:h-[90vh]">
               <img src="/assets/landing/hero.png" alt="hero" className="h-full w-full object-cover"></img>
            </div>
         ) : (
            <div className="h-[50vh] w-full  md:h-[90vh]">
               <video
                  src="/assets/landing/hero.mp4"
                  className="h-[50vh] w-full object-cover md:h-[90vh]"
                  loop
                  muted
                  controls={false}
                  autoPlay={true}
                  ref={videoRef as MutableRefObject<HTMLVideoElement>}
                  disablePictureInPicture
                  crossOrigin="anonymous"
               ></video>
            </div>
         )}

         <div className="z-5 absolute top-0 left-0 h-full w-full bg-black/20">
            <div className="absolute top-[40px] left-[50%] -translate-x-[50%]">
               <Image src={"/assets/landing/code-your-way-to-success.png"} width={800} height={50} />
            </div>
         </div>
      </header>
   );
};

export default Hero;
