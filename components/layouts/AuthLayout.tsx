import React, { FC, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../home/new-home/footer";

type AuthLayoutProps = {
   children: ReactElement;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
   const router = useRouter();

   return (
      <>
         <div className="relative flex min-h-[100vh] w-full flex-col justify-between bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] pt-[2rem] md:bg-authLayout md:bg-cover md:bg-right md:pt-[2rem]">
            <div className="flex items-center justify-between px-[.9rem] md:px-[4rem]">
               <Link data-testid="logo" href="/">
                  <Image alt="logo" src="/assets/CodeAlgo_Logo.png" className={"h-9 md:cursor-pointer"} width={110} height={55} />
               </Link>
               <div className="flex flex-wrap gap-2">
                  {router?.pathname.includes("/login") ? (
                     <>
                        <span className="hidden font-semibold sm:block">New here?</span>
                        <Link href="/signup">
                           <span className="ml-3 cursor-pointer font-semibold text-mainRed">Register</span>
                        </Link>
                     </>
                  ) : (
                     <>
                        <span className="hidden font-semibold sm:block">Already have an account?</span>
                        <Link href="/login">
                           <span className="ml-3 cursor-pointer font-semibold text-mainRed">Log in</span>
                        </Link>
                     </>
                  )}
               </div>
            </div>
            <div className={`flex items-center justify-center py-[2.4rem] md:justify-start md:py-[2.4rem] md:px-[6.4rem]`}>
               <div className="mx-auto w-[90vw] max-w-[500px] rounded-[1.5rem] bg-white bg-opacity-20 bg-clip-padding px-[1.5rem] py-[4rem] backdrop-blur-md backdrop-filter md:mr-[-2rem] md:ml-0 md:w-[600px] md:max-w-[600px] md:rounded-[2.5rem] md:px-[3rem]">
                  {children}
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default AuthLayout;
