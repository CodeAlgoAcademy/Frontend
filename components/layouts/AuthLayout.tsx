import React, { FC, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../home/Footer";

type AuthLayoutProps = {
   children: ReactElement;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
   const router = useRouter();

   return (
      <>
         <div className="relative flex min-h-[100vh] w-full flex-col justify-between bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] pt-[2rem] md:bg-authLayout md:bg-cover md:bg-right md:pt-[2rem]">
            <div className="flex items-center justify-between px-[1.3rem] md:px-[4rem]">
               <a data-testid="logo" href="/">
                  <Image alt="logo" src="/assets/CodeAlgo_Logo.png" className={"h-9 md:cursor-pointer"} width={110} height={55} />
               </a>
               <div className="flex flex-wrap gap-2">
                  {router?.pathname.includes("/login") ? (
                     <>
                        <span className="hidden font-semibold sm:block">New here?</span>
                        <Link href="/signup">
                           <span className="ml-3 cursor-pointer font-semibold text-[#2073FA]">Register</span>
                        </Link>
                     </>
                  ) : (
                     <>
                        <span className="hidden font-semibold sm:block">Already have an account?</span>
                        <Link href="/login">
                           <span className="ml-3 cursor-pointer font-semibold text-[#2073FA]">Log in</span>
                        </Link>
                     </>
                  )}
               </div>
            </div>
            <div className={`flex items-center justify-center py-[2.4rem] md:justify-start md:py-[2.4rem] md:px-[6.4rem]`}>
               <div className="mx-auto w-[90vw] max-w-[500px] rounded-[2.5rem] bg-white bg-opacity-20 bg-clip-padding px-[3rem] py-[4rem] backdrop-blur-md backdrop-filter md:mr-[-2rem] md:ml-0 md:w-[600px] md:max-w-[600px]">
                  {children}
               </div>
            </div>
            <Footer />
         </div>
      </>
   );
};

export default AuthLayout;