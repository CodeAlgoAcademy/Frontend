import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { cn } from "utils";

const WhatWeBuilt = () => {
   const [playing, setPlaying] = useState<boolean>(false);
   const features = useSelector((state: RootState) => state.accessibility.features);

   const animationsPaused = useMemo(() => features.includes("pause-animations"), [features]);
   const toggle = () => setPlaying(!playing);

   return (
      <section className="w-full p-6">
         <h1 className="text-center font-tiltWarp text-[2rem] font-bold max-md:text-[1.5rem]">THE MAGIC WE’VE BUILT</h1>

         <div className="relative z-[1] mx-auto mt-12 max-h-fit max-w-fit">
            <div className="mx-auto h-[200px] w-[700px] max-w-[90vw] overflow-hidden rounded-[2rem] bg-white object-contain shadow-xl shadow-mainBlack md:h-[400px]">
               <img src="/assets/0002.png" alt="" className={cn("h-full w-full object-cover", playing && "hidden")} />

               {playing && (
                  <ReactPlayer
                     width={"100%"}
                     height={"100%"}
                     url="https://youtu.be/cijtWZ1I2i4"
                     playing={!animationsPaused}
                     muted={true}
                     controls={false}
                     loop={true}
                     style={{ objectFit: "cover", objectPosition: "center" }}
                  />
               )}
            </div>

            <span onClick={toggle} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer">
               <img
                  className="h-[110px] w-[110px] max-sm:h-[80px] max-sm:w-[80px]"
                  src={playing ? "/assets/landing/pause-icon.png" : "/assets/landing/play-icon.png"}
               />
            </span>

            <img
               className="absolute top-[15%] right-[100%] z-[-1] w-[150px] translate-x-[30%] object-contain  max-md:hidden"
               src={"/assets/0013_2.png"}
            />
         </div>
      </section>
   );
};

export default WhatWeBuilt;
