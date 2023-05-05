import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/authSlice";

export default function SelectUserType() {
   return (
      <div className="">
         <h1 className="mt-[2rem] text-center text-3xl font-bold text-blue-400">Who are you signing up as?</h1>
         <div className="mx-6 mt-[2rem] grid flex-col items-center justify-center gap-y-6 sm:grid-cols-2 md:mt-[13rem] md:grid-cols-3 md:flex-row md:gap-x-[5rem]">
            <Link href="/signup/parent">
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-[#2073fa]">
                  <div className="mx-auto max-h-[200px] max-w-[200px] md:max-h-fit md:max-w-fit">
                     <Image src="/assets/parents.png" alt="parent" height="225" width="225" />
                  </div>
                  <h2
                     data-testid="accountType"
                     className="text-black-500 mt-[.4rem] cursor-pointer text-center text-[1.3rem] font-[500] md:mt-[2rem] md:text-3xl md:font-bold"
                  >
                     Parent
                  </h2>
               </div>
            </Link>
            <Link href="/signup/teacher">
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-[#2073fa]">
                  <div className="mx-auto max-h-[200px] max-w-[200px] md:max-h-fit md:max-w-fit">
                     <Image src="/assets/teacher.png" alt="parent" height="225" width="225" />
                  </div>
                  <h2
                     data-testid="accountType"
                     className="text-black-500 mt-[.4rem] cursor-pointer text-center text-[1.3rem] font-[500] md:mt-[2rem] md:text-3xl md:font-bold"
                  >
                     Teacher
                  </h2>
               </div>
            </Link>
            <Link href="/signup/student">
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-[#2073fa]">
                  <div className="mx-auto max-h-[200px] max-w-[200px] md:max-h-fit md:max-w-fit">
                     <Image src="/assets/students.png" alt="parent" height="225" width="225" />
                  </div>
                  <h2
                     data-testid="accountType"
                     className="text-black-500 mt-[.4rem] cursor-pointer text-center text-[1.3rem] font-[500] md:mt-[2rem] md:text-3xl md:font-bold"
                  >
                     Student
                  </h2>
               </div>
            </Link>
         </div>
      </div>
   );
}
