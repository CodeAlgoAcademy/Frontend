import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const Hero = () => {
   const features = useSelector((state: RootState) => state.accessibility.features);
   const videoRef = useRef<HTMLVideoElement>();

   const animationsPaused = useMemo(() => features.includes("pause-animations"), [features]);

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

   return (
      <header className="relative">
         <video
            src="/assets/landing/hero.mp4"
            className="hide-video-controls h-[50vh] w-full object-cover md:h-[90vh]"
            loop
            muted
            controls={false}
            autoPlay={true}
            ref={videoRef as MutableRefObject<HTMLVideoElement>}
            disablePictureInPicture
            crossOrigin="anonymous"
         ></video>

         <div className="absolute top-[40px] left-[50%] -translate-x-[50%]">
            <Image src={"/assets/landing/code-your-way-to-success.png"} width={800} height={50} />
         </div>
      </header>
   );
};

export default Hero;
