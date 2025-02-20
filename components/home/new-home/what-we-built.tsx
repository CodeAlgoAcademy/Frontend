import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { cn } from "utils";
import LetsLearnTogether from "./lets-learn-together";

const WhatWeBuilt = () => {
   const [mounted, setMounted] = useState<boolean>(false);
   const [playing, setPlaying] = useState<boolean>(false);
   const features = useSelector((state: RootState) => state.accessibility.features);

   const animationsPaused = useMemo(() => features.includes("pause-animations"), [features]);
   const toggle = () => {
      setPlaying(!playing);
   };

   useEffect(() => setMounted(true), []);

   return (
      <section className="w-full bg-blueToBlackGradient pt-12 pb-1">
         <h1 className="mx-auto max-w-fit rounded-md bg-mainRed py-2 px-5 text-center font-tiltWarp text-[2rem] font-bold text-white shadow-md max-md:text-[1.5rem]">
            {"LET'S HAVE FUN TOGETHER!"}
         </h1>

         <div className="relative z-[1] mx-auto mt-12 max-h-fit max-w-fit px-6">
            <div className="mx-auto h-[200px] w-[700px] max-w-[90vw] overflow-hidden rounded-[2rem] bg-white object-contain shadow-xl shadow-mainBlack md:h-[400px]">
               <img src="/assets/0002.png" alt="" className={cn("h-full w-full object-cover", playing && "hidden")} />

               {mounted && (
                  <ReactPlayer
                     width={"100%"}
                     height={"100%"}
                     url="https://youtu.be/cijtWZ1I2i4"
                     playing={!animationsPaused && playing}
                     muted={true}
                     controls={false}
                     loop={true}
                     style={{ objectFit: "cover", objectPosition: "center", display: playing ? "block" : "hidden" }}
                  />
               )}
            </div>

            <div onClick={toggle} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer">
               <img
                  className="h-[110px] w-[110px] max-sm:h-[80px] max-sm:w-[80px]"
                  src={playing ? "/assets/landing/pause-icon.png" : "/assets/landing/play-icon.png"}
               />
            </div>

            <img
               className="absolute top-[15%] right-[98.5%] z-[-1] w-[150px] translate-x-[30%] object-contain  max-md:hidden"
               src={"/assets/0013_2.png"}
            />
         </div>

         <LetsLearnTogether />
      </section>
   );
};

export default WhatWeBuilt;
