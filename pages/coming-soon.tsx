import React from "react";
import { IoMdConstruct } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const comingSoon = () => {
   const router = useRouter();
   return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 bg-[#ecedf3] p-6">
         <h1 className="text-mainColor flex items-center justify-center gap-x-2 text-[27px] font-bold xs:text-[32px] sm:text-[43px] md:text-[64px]">
            Coming Soon{" "}
            <span>
               <IoMdConstruct />
            </span>
         </h1>
         <p className="text-center text-[18px] font-bold text-gray-800">This page is currently under construction</p>

         <button
            className="bg-mainColor flex items-center gap-x-2 rounded-full py-3 px-6 text-[15px] font-bold text-white"
            onClick={() => {
               router.back();
            }}
         >
            <span>
               <FaArrowLeft />
            </span>
            Return to registration
         </button>
      </div>
   );
};
export default comingSoon;
