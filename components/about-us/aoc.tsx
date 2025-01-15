import React from "react";
import Link from "next/link";

const Footer = () => {
   return (
      <footer className="relative min-h-[260px] py-10 px-6">
         <div className="text-center">
            <p className="text-3xl font-bold max-md:text-2xl">Getting started with CodeAlgo is easy</p>
            <Link href={"/login"}>
               <button className="no-contrast-adjust mt-8 w-[150px] rounded-lg bg-mainRed p-3 font-bold text-white max-md:p-2 md:w-[200px]">
                  Sign in
               </button>
            </Link>
         </div>
         <img src="/assets/0008_1.png" alt="" className="absolute right-0 top-0 z-[0] hidden h-[300px] w-fit object-contain md:block" />
      </footer>
   );
};

export default Footer;
