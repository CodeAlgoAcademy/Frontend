import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "store/authSlice";

export default function SelectAccountType() {
   const slug = useRouter();

   return (
      <div className="">
         <h1 className="mt-[2rem] text-center text-3xl font-bold text-orange-400">
            Who are you {slug.pathname.includes("/login") ? "logging in" : "signing up"} as?
         </h1>
         <div className="mx-6 mt-[2rem] grid flex-col items-center justify-center gap-y-6 sm:grid-cols-2 md:mt-[7rem] md:grid-cols-3 md:flex-row md:gap-x-[5rem]">
            <Link href={slug.pathname.includes("/signup") ? "/signup/parent" : "/login/parent"}>
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-orange-400">
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
            <Link href={slug.pathname.includes("signup") ? "/signup/teacher" : "/login/teacher"}>
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-orange-400">
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
            <a href={slug.pathname.includes("login") ? "https://www.play.codealgoacademy.com" : "/signup/student"}>
               <div className="transition duration-300 ease-out hover:scale-110 hover:text-orange-400">
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
            </a>
         </div>
      </div>
   );
}
