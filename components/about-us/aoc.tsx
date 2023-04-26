import React from "react";
import Link from "next/link";

const Footer = () => {
   return (
      <footer className="relative min-h-[260px] py-10">
         <div className="text-center">
            <p className="text-3xl font-bold text-slate-600">Getting started with CodeAlgo is easy</p>
            <Link href={"/join-waitlist"}>
               <button className="mt-8 w-[200px] rounded-lg bg-orange-400 p-3 font-bold text-white">Join Our Waiting List</button>
            </Link>
         </div>
         <img src="/assets/0008_1.png" alt="" className="absolute right-0 top-0 z-[0] hidden h-[300px] w-fit object-contain md:block" />
      </footer>
   );
};

export default Footer;
