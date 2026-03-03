import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { detect } from "detect-browser";
import { useRouter } from "next/router";

const Hero = () => {
   const { push } = useRouter();
   const features = useSelector((state: RootState) => state.accessibility.features);
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isSafari, setIsSafari] = useState(false);

   const animationsPaused = useMemo(() => features["pause animations"], [features]);

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (animationsPaused) video.pause();
      else video.play().catch(() => {});
   }, [animationsPaused]);

   useEffect(() => {
      const browser = detect();
      setIsSafari(browser?.name === "safari" || browser?.name === "ios" || browser?.name === "ios-webview");
   }, []);

   const toSignUp = () => push("/signup");
   const toLogin = () => push("/login");
   const toPricing = () => push("/pricing");

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
                  className="h-full w-full object-cover"
                  loop
                  muted
                  autoPlay
                  ref={videoRef}
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
