import React from "react";
import Link from "next/link";
import {IoMdConstruct} from "react-icons/io";
import {FaArrowLeft} from "react-icons/fa";

const ComingSoon = ()=>{
    return <div className="min-h-screen w-full bg-[#e5e5e5] flex justify-center items-center flex-col gap-y-4">
    <h1 className="text-[32px] md:text-[72px] lg:text-[150px] font-bold text-orange-600">Coming Soon <span>
        <IoMdConstruct /></span></h1>
    <p className="text-black text-[18px] font-bold">This page is currently under construction</p>
    <Link href={`/signup`}>
          <button className="text-white flex gap-x-2 items-center py-4 px-6 text-[15px] rounded-full bg-orange-600 font-bold">
            <span>
              <FaArrowLeft />
            </span>
            Return to homepage
          </button>
        </Link>
</div>;
}
export default ComingSoon;