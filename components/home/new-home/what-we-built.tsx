import Image from "next/image";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { cn } from "utils";

const WhatWeBuilt = () => {
   const [playing, setPlaying] = useState<boolean>(false);
   const videoRef = useRef<HTMLVideoElement>();

   const toggle = () => (setPlaying(!playing), playing ? videoRef?.current?.pause() : videoRef?.current?.play());

   useEffect(() => {
      if (videoRef.current) {
         videoRef.current?.pause();
      }
   }, []);

   return (
      <section className="w-full p-6">
         <h1 className="text-center font-tiltWarp text-[2rem] font-bold">THE MAGIC WE’VE BUILT</h1>

         <div className="relative mx-auto mt-7 max-h-fit max-w-fit">
            <div className="mx-auto h-[400px] w-[700px] max-w-[90vw] overflow-hidden rounded-[2rem] object-contain shadow-xl shadow-mainBlack">
               <img src="/assets/0002.png" alt="" className={cn("h-full w-full object-cover", playing && "hidden")} />

               <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  url="https://youtu.be/cijtWZ1I2i4"
                  playing={true}
                  muted={true}
                  controls={false}
                  loop={true}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className={cn(!playing && "hidden")}
               />
            </div>

            <span onClick={toggle} className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-pointer">
               <Image width={110} height={110} src={playing ? "/assets/landing/pause-icon.png" : "/assets/landing/play-icon.png"} />
            </span>

            <img className="absolute top-[15%] right-[100%] z-[-1] w-[150px] translate-x-[30%] object-contain " src={"/assets/0013_2.png"} />
         </div>
      </section>
   );
};

export default WhatWeBuilt;
