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
      <header className="relative isolate">
         {/* Media */}
         <div className="relative h-[75vh] min-h-[600px] w-full md:h-[90vh]">
            {isSafari ? (
               <img src="/assets/landing/hero.png" alt="Kids learning to code online with CodeAlgo Academy" className="h-full w-full object-cover" />
            ) : (
               <video
                  src="/assets/landing/hero.mp4"
                  className="h-full w-full object-cover"
                  loop
                  muted
                  autoPlay
                  ref={videoRef}
                  disablePictureInPicture
               />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
         </div>

         {/* Content */}
         <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
            <div className="container mx-auto px-6">
               <div className="grid max-w-6xl grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 sm:gap-12">
                  {" "}
                  {/* Text */}
                  <div className="pointer-events-auto pt-6 text-white sm:pt-0 md:pl-8">
                     <h1 className="mb-2 max-w-xl text-lg font-extrabold leading-tight sm:mb-4 sm:text-xl md:text-4xl lg:text-5xl">
                        Fun and Simple Coding for Young Minds.
                     </h1>
                     <p className="mb-3 max-w-lg text-sm text-white/90 sm:mb-5 sm:max-w-md sm:text-xl md:text-xl">
                        {" "}
                        Learn Python, explore algorithms, and build problem-solving and critical thinking skills with fun activities available
                        anytime, anywhere. Join thousands of young coders today!{" "}
                     </p>{" "}
                     <div className="flex flex-col gap-4 xs:flex-row">
                        <button
                           onClick={toLogin}
                           className="bg-primary hover:bg-primary-dark rounded-lg px-8 py-4 text-sm font-bold text-white sm:px-2 lg:text-lg"
                        >
                           {" "}
                           Try For FREE
                        </button>{" "}
                        <button
                           onClick={toPricing}
                           className="rounded-lg border-2 border-white px-4 py-4 text-sm font-bold text-white hover:bg-white/10 sm:px-2 lg:px-8 lg:text-lg"
                        >
                           {" "}
                           See Pricing Plans{" "}
                        </button>{" "}
                     </div>{" "}
                  </div>{" "}
                  {/* Offer Card */}{" "}
                  <div className="pointer-events-auto flex justify-center lg:justify-end">
                     {" "}
                     <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md sm:p-5">
                        {" "}
                        <div className="mb-3 text-center">
                           {" "}
                           <span className="rounded-full bg-mainRed px-3 py-1 text-sm font-bold uppercase"> Annual Offer </span>{" "}
                        </div>{" "}
                        <h3 className="mb-1 text-center text-xl font-bold text-mainRed sm:mb-3">
                           {" "}
                           GET UP TO <br /> <span className="text-2xl text-white md:text-3xl">20% OFF</span> <br /> MONTHLY PRICING{" "}
                        </h3>{" "}
                        <div className="mb-3 text-center  sm:mb-6">
                           {" "}
                           <span className="text-2xl font-extrabold md:text-4xl">$21</span> <span> / month</span>{" "}
                           <p className="mt-1 text-sm">Billed annually. Cancel anytime.</p>{" "}
                        </div>{" "}
                        <button onClick={toSignUp} className="w-full rounded-lg bg-mainRed py-3 font-bold text-white hover:opacity-90">
                           {" "}
                           Learn More →{" "}
                        </button>
                     </div>{" "}
                  </div>{" "}
               </div>
            </div>
         </div>
      </header>
   );
};

export default Hero;
