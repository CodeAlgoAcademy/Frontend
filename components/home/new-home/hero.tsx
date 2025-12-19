import Image from "next/image";
import React, { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { detect } from "detect-browser";
import { useRouter } from "next/router";

const Hero = () => {
   const { push } = useRouter();
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

    const toSignUp = () => push("/signup");

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

         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
            <div className="container mx-auto flex pt-96 ">
               <div
                  className="mx-auto grid w-full max-w-7xl -translate-x-2 grid-cols-1 gap-12 
                  lg:-translate-x-6 lg:grid-cols-2"
               >
                  <div className="text-white">
                     <h1 className="mb-6 max-w-xl text-3xl font-extrabold leading-tight md:text-5xl">
                        YOUR CHILD’S <br />
                        <span className="text-primary">Path to Coding Success</span> <br />
                        STARTS HERE
                     </h1>

                     <p className=" max-w-lg text-lg text-white/90 md:text-xl">Learn coding anywhere. Cancel anytime.</p>
                     <p className="mb-8 max-w-lg text-lg text-white/90 md:text-xl">Join 2 million+ kids learning to code.</p>

                     <div className="flex flex-col gap-4 sm:flex-row">
                        <button
                        onClick={toSignUp}
                         className="bg-primary hover:bg-primary-dark rounded-lg px-8 py-4 text-lg font-bold text-white transition">
                           Try FREE for 30 Days
                        </button>

                        <button 
                        onClick={toSignUp}
                        className="rounded-lg border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10">
                           See Pricing Plans
                        </button>
                     </div>
                  </div>
                  <div className="flex items-center lg:justify-end">
                     <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md">
                        <div className="mb-2 text-center">
                           <span className="rounded-full bg-mainRed px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                              Annual Offer
                           </span>
                        </div>

                        <h3 className="mb-1 text-center text-2xl font-bold">
                           Get up to <span className="text-mainRed">74% OFF</span>
                        </h3>

                        <p className="mb-4 text-center text-sm text-white/80">Monthly Pricing</p>

                        <div className="mb-6 text-center">
                           <span className="text-4xl font-extrabold">$45</span>
                           <span className="text-white/70"> / year</span>
                           <p className="mt-1 text-sm text-white/60">until canceled</p>
                        </div>

                        <button className="w-full rounded-lg bg-mainRed py-3 font-bold text-white transition hover:bg-mainRed">Learn More →</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Hero;
