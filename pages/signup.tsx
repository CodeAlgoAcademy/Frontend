import React, { useState, useEffect, ReactElement, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import CleverBtn from "../components/cleverBtn";
import GoogleBtn from "../components/googleBtn";
import Grades from "../components/grades";
import Students from "../components/signup/students";
import Teachers from "../components/signup/teachers";
import Parents from "../components/signup/parents";
import { ITabs } from "../types/interfaces";
import { useRouter } from "next/router";
import { updateUser, clearFields } from "store/authSlice";
import { signUpUser } from "services/authService";
import { RootState } from "store/store";

const tabs: ITabs[] = [
   {
      tabName: "Student",
      component: <Students />,
   },

   {
      tabName: "Teacher",
      component: <Teachers />,
   },
   {
      tabName: "Parent",
      component: <Parents />,
   },
];

const SignUp = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [activeTab, setActiveTab] = useState<string | undefined>("Student");
   const [check, setCheck] = useState<boolean>(false);
   const checkState = useSelector((state: RootState) => state.policyCheck.checked);
   const [currentTab, setCurrentTab] = useState<ITabs>({
      tabName: "",
      component: <></>,
   });
   useEffect(() => {
      const tab = tabs.find((tab) => {
         if (tab.tabName === activeTab) {
            return tab;
         }
      });
      const tabName: string | undefined = tab?.tabName;
      const component: ReactElement | undefined = tab?.component;

      setCurrentTab({ tabName, component });
   }, [activeTab]);

   const updateTab = (tabName: string | undefined): void => {
      setActiveTab((prev) => tabName);
      dispatch(updateUser({ key: "accountType", value: tabName as string }));
   };

   useEffect(() => {
      dispatch(updateUser({ key: "accountType", value: "Student" }));
   }, [dispatch]);

   const checkHandler = () => {
      setCheck(true);
      router.push("/privacyPolicy");
   };

   const signup = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = await dispatch(signUpUser());
      if (data?.payload?.detail) {
         window.open("/verify-email", "_blank");
      }
   };

   return (
      <main>
         <Head>
            <title>CodeAlgo Academy | Register</title>
         </Head>
         <section className="flex min-h-screen w-full items-center justify-center bg-[royalblue] py-6 shadow-md">
            <div className="mx-auto w-[95vw] max-w-[900px] rounded-md bg-white p-[40px] shadow-md md:p-[50px]">
               {/* tabs */}
               <div className="mx-auto mb-4 hidden w-full max-w-[600px] flex-row overflow-hidden rounded-md md:flex">
                  {tabs.map((tab: ITabs, index: number): React.ReactElement => {
                     return (
                        <article
                           key={index}
                           className={`
                flex-1 cursor-pointer p-3 text-center text-[17px]
                ${index === 1 ? "border-y-2" : "border-2"}  
                ${tab.tabName === activeTab ? "bg-[#2073fa] text-white" : null}`}
                           onClick={() => updateTab(tab.tabName)}
                        >
                           {tab.tabName}
                        </article>
                     );
                  })}
               </div>
               {/* smaller devices tab */}
               <select
                  className="mx-auto mb-4 block w-[180px] rounded-md border-2 p-2 text-[16px] outline-none focus:border-[#2073fa] md:hidden"
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                     // get the value
                     const value: string = event.target.options[event.target.selectedIndex].value;
                     updateTab(value);
                  }}
               >
                  {tabs.map((tab: ITabs, index: number): React.ReactElement => {
                     return (
                        <option value={tab.tabName} key={index}>
                           {tab.tabName}
                        </option>
                     );
                  })}
               </select>

               {/* title */}
               <div className="mb-4 flex flex-col gap-y-1">
                  <h1 className="text-center text-lg font-bold text-[#2073fa] md:text-3xl">Welcome To CodeAlgo Academy</h1>
                  <p className="text-grey-800 text-center text-[16px] md:text-lg">{"Let's get started"}</p>
               </div>

               {/* external providers */}
               <div className="flex flex-col gap-y-2 gap-x-6 md:flex-row md:gap-y-0">
                  <CleverBtn />
                  <GoogleBtn />
               </div>

               {/* or span */}
               <span className="relative my-5 block text-center text-gray-700 before:absolute before:top-[50%] before:left-0 before:h-[1px] before:w-[42%] before:-translate-y-[50%] before:bg-gray-700 after:absolute after:top-[50%] after:right-0 after:h-[1px] after:w-[42%] after:-translate-y-[50%] after:bg-gray-700">
                  OR
               </span>

               <form className="w-full" onSubmit={signup}>
                  {/* display different components based on the active tab */}
                  {currentTab?.component}
                  <span className="mt-4 flex flex-row items-center gap-x-2">
                     <input type="checkbox" checked={checkState} onChange={checkHandler} id="terms" className="accent-[#2073fa]" required />
                     <label htmlFor="terms">I accept the terms and conditions</label>
                  </span>
                  <div className="mt-4 text-right">
                     <button type="submit" className="w-[150px] rounded-[30px] bg-[#2073fa] py-3 text-[16px] text-white hover:shadow-md">
                        Sign Up
                     </button>
                  </div>
               </form>

               <div className="mt-4 flex flex-col-reverse items-end justify-center md:flex-row md:items-center md:justify-between">
                  <p className="text-grey-800 text-left text-[15px] md:text-lg">
                     Already have an account?{" "}
                     <Link href="/login">
                        <a className="text-mainPurple underline" data-testid="sign-in">
                           Sign In
                        </a>
                     </Link>
                  </p>
               </div>
            </div>
         </section>
         {/* position fixed, for stundents only */}
         <Grades /> {/*Only when the grades button is clicked*/}
      </main>
   );
};

export default SignUp;
