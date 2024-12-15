import { CustomButton } from "@/components/UI/Button";
import React from "react";
import { BsBag, BsBagFill, BsPinMapFill } from "react-icons/bs";

const CodeToSuccess = () => {
   return (
      <section className="mx-auto mt-6 max-w-[1200px] p-6">
         <h1 className="text-center font-tiltWarp text-[2.1rem]">CODE YOUR WAY TO SUCCESS</h1>

         <div className="mt-16 flex items-center justify-center gap-8">
            <SingleJob />
            <SingleJob />
         </div>
      </section>
   );
};

const SingleJob = () => {
   return (
      <div className="max-w-[260px] rounded-xl border p-6">
         <div className="mx-auto max-w-fit rounded-xl bg-gray-300 p-2 text-[.8rem]">
            <p className="text-center font-tiltWarp font-bold">
               50 Hours of CodeAlgo <br /> Experience
            </p>
         </div>

         <p className="mt-4 text-center font-tiltWarp text-[.8rem] font-bold">Software Engineer Internship WeCode Kansas City, MO</p>

         <div className="mt-5 flex items-center justify-center gap-4">
            <p className="flex items-center gap-2 font-tiltWarp text-[.8rem]">
               <span>
                  <BsBagFill className="text-gray-500" />
               </span>
               WeCode
            </p>
            <p className="flex items-center gap-2 font-tiltWarp text-[.8rem]">
               <span>
                  <BsPinMapFill className="text-gray-500" />
               </span>
               Kansas City, MO
            </p>
         </div>
         <CustomButton variant="filled" className="mt-4 max-w-[250px] text-mainBlack">
            {"View Salary & More Info"}
         </CustomButton>
      </div>
   );
};

export default CodeToSuccess;
