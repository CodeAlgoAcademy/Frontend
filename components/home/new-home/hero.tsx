import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { detect } from "detect-browser";

const Hero = () => {
   const features = useSelector((state: RootState) => state.accessibility.features);
   const videoRef = useRef<HTMLVideoElement>();
   const [isSafari, setIsSafari] = useState(false);

   const animationsPaused = useMemo(() => features["pause animations"], [features]);

   console.log(animationsPaused);

   useEffect(() => {
      const video = videoRef?.current;

      if (animationsPaused) {
         video?.pause();
      } else {
         video?.play()?.catch((err) => {
            console.error("Error playing video:", err);
         });
      }
   }, [videoRef, animationsPaused]);

   useEffect(() => {
      const browser = detect();
      const isSafari = browser?.name == "safari" || browser?.name == "ios" || browser?.name == "ios-webview";
      setIsSafari(isSafari);
   }, []);

   return (
      <header className="relative">
         {isSafari ? (
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
