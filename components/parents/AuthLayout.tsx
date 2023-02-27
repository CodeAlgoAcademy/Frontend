import React, { FC, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

type AuthLayoutProps = {
   children: ReactElement;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
   const router = useRouter();

   return (
      <>
         <div className="bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] min-h-[100vh] md:pt-[2rem] pt-[2rem] relative w-full flex flex-col justify-between">
            <div className="flex justify-between items-center md:px-[4rem] px-[1.3rem]">
               <h1 className="text-white text-3xl font-bold">CodeAlgo</h1>
               <div className="flex flex-wrap gap-2">
                  {router.pathname === "/login" ? (
                     <>
                        <span className="font-semibold sm:block hidden">Yet to create account?</span>
                        <Link href="/selectUserType">
                           <span className="cursor-pointer ml-3 font-semibold text-[#2073FA]">Register</span>
                        </Link>
                     </>
                  ) : (
                     <>
                        <span className="font-semibold sm:block hidden">Already have an account?</span>
                        <Link href="/login">
                           <span className="cursor-pointer ml-3 font-semibold text-[#2073FA]">Log in</span>
                        </Link>
                     </>
                  )}
               </div>
            </div>
            <div className={`flex md:py-[2.4rem] md:px-[6.4rem] py-[2.4rem] items-center justify-center`}>
               <div className="bg-white md:mr-[-2rem] md:ml-0 md:w-[700px] md:max-w-[700px] px-[3rem] py-[4rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-[2.5rem] w-[90vw] max-w-[500px] mx-auto">
                  {children}
               </div>
               <div className="ml-[-2rem] md:block hidden">
                  <Image src="/assets/ComputerGraphic.png" width="829.8" height="520.2" alt="computer graphic" />
               </div>
            </div>
            <div className="box-border w-full text-[16px] text-white bg-[#2073FA] font-semibold flex justify-center items-center py-3 px-10 md:flex-row flex-col-reverse gap-2 flex-wrap md:justify-between">
               <p>© 2023 CodeAlgoAcademy. All rights reserved.</p>
               <p className="left-0">Get help</p>
            </div>
         </div>
      </>
   );
};

export default AuthLayout;
