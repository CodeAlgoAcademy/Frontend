import React, { FC, ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import Footer from "../home/new-home/footer";
import LanguageSwitcher from "../UI/LanguageSwitcher";
import { useTranslation } from "react-i18next";

// /login/teacher and /signup/parent, but not /login, /change-password or the
// multi-step pages that also use this layout.
const ROLE_SUBPAGE = /^\/(login|signup)\/[^/]+$/;

type AuthLayoutProps = {
   children: ReactElement;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
   const router = useRouter();
   const { t } = useTranslation("auth");

   const pathname = router?.pathname ?? "";
   // Picking the wrong card on the account-type screen was a dead end - the
   // only way back was the browser button or the logo, which drops you on the
   // marketing site.
   const showAccountTypeLink = ROLE_SUBPAGE.test(pathname);
   const accountTypeHref = pathname.startsWith("/signup") ? "/signup" : "/login";

   return (
      <>
         <div className="relative flex min-h-[100vh] w-full flex-col justify-between bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] pt-[2rem] md:bg-authLayout md:bg-cover md:bg-right md:pt-[2rem]">
            <div className="flex items-center justify-between px-[.9rem] md:px-[4rem]">
               <Link data-testid="logo" href="/">
                  <Image alt="logo" src="/assets/CodeAlgo_Logo.png" className={"h-9 md:cursor-pointer"} width={110} height={55} />
               </Link>
               <div className="flex flex-wrap items-center gap-2">
                  {showAccountTypeLink && (
                     <Link href={accountTypeHref}>
                        <span className="flex cursor-pointer items-center gap-0.5 rounded-lg border border-gray-200 bg-white py-1 pl-1 pr-2 text-xs font-semibold text-gray-500 transition-colors hover:text-mainRed">
                           <BiChevronLeft className="text-base" />
                           {t("changeAccountType")}
                        </span>
                     </Link>
                  )}
                  <LanguageSwitcher variant="compact" />
                  {router?.pathname.includes("/login") ? (
                     <>
                        <span className="hidden font-semibold sm:block">{t("newHere")}</span>
                        <Link href="/signup">
                           <span className="ml-3 cursor-pointer font-semibold text-mainRed">{t("signUp")}</span>
                        </Link>
                     </>
                  ) : (
                     <>
                        <span className="hidden font-semibold sm:block">{t("alreadyHaveAccount")}</span>
                        <Link href="/login">
                           <span className="ml-3 cursor-pointer font-semibold text-mainRed">{t("logIn")}</span>
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
