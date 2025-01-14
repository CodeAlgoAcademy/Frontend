import Button, { CustomButton } from "@/components/UI/Button";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { cn } from "utils";

const GetStarted = () => {
   const isMobile = useMediaQuery("(max-width:768px)");
   const { push } = useRouter();

   const buttonClassName = cn(
      "!bg-white !text-black !shadow-md absolute bottom-10 left-[40%] max-md:left-[40%] -translate-x-[50%] max-w-fit min-w-fit min-w-[150px] !mx-auto font-thabit font-bold text-[1.1rem] max-md:text-[.9rem] justify-center"
   );

   return (
      <section className="bg-redToBlackGradient">
         <div className="px-2 pt-12 pb-12">
            <button
               className="mx-auto block cursor-pointer rounded-3xl bg-white px-6 py-2 text-center font-tiltWarp text-[1.8rem] text-black max-md:text-[1.5rem]"
               onClick={() => push("/signup")}
            >
               SIGN UP TODAY!
            </button>
         </div>

         <div className="mt-8 flex h-[650px] items-center justify-center max-md:mt-0 max-md:h-[300px]">
            {!isMobile && (
               <article className="relative -mr-24 grid h-full w-full flex-1 place-content-center bg-whiteToBlueGradient clip-path-right-parallelogram">
                  <img src={"/assets/landing/get-started-1.png"} className="h-[550px] w-[450px]" />
                  <CustomButton className={buttonClassName} variant="filled" size="medium">
                     CREATE YOUR AVATAR
                  </CustomButton>
               </article>
            )}

            <article className="relative -mx-8 grid h-[650px] w-full flex-1 place-content-center bg-red-500 clip-path-center-parallelogram max-md:-ml-0 max-md:-mr-10 max-md:h-[300px] max-md:clip-path-right-parallelogram">
               <img src={"/assets/landing/get-started-2.png"} className="h-[650px] w-full object-cover max-md:h-[300px]" />
               <CustomButton className={cn(buttonClassName)} variant="filled" size={isMobile ? "extra-small" : "medium"}>
                  LEARN BY PLAYING
               </CustomButton>
            </article>

            <article className="relative -ml-24 grid h-full w-full flex-1 place-content-center overflow-hidden clip-path-left-parallelogram max-md:-ml-0">
               <img
                  src={"/assets/landing/get-started-3.png"}
                  className="h-[650px] min-w-[40vw] object-cover object-right-top max-md:h-[300px] max-sm:min-w-[58vw]"
               />
               <CustomButton
                  className={cn(buttonClassName, "left-[50%] max-md:left-[50%]")}
                  variant="filled"
                  size={isMobile ? "extra-small" : "medium"}
               >
                  CODE YOUR WORLD
               </CustomButton>
            </article>
         </div>
      </section>
   );
};

export default GetStarted;
