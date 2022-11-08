import React, { useState, useEffect, ReactElement, ChangeEvent } from "react";
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | undefined>("Student");
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
  };

  const signup = (event: ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // signup logic
    router.push("/addClass");
  };

  return (
    <main>
      <Head>
        <title>CodeAlgo Academy | Register</title>
      </Head>
      <section className="w-full min-h-screen bg-gray-100 flex justify-center items-center py-6">
        <div className="bg-white w-[95vw] max-w-[900px] mx-auto rounded-md p-[40px] md:p-[50px] shadow-md">
          {/* tabs */}
          <div className="w-full max-w-[600px] mx-auto mb-4 flex-row rounded-md overflow-hidden hidden md:flex">
            {tabs.map((tab: ITabs, index: number): React.ReactElement => {
              return (
                <article
                  key={index}
                  className={`
                flex-1 text-center p-3 text-[17px] cursor-pointer
                ${index === 1 ? "border-y-2" : "border-2"}  
                ${
                  tab.tabName === activeTab ? "bg-mainPurple text-white" : null
                }`}
                  onClick={() => updateTab(tab.tabName)}
                >
                  {tab.tabName}
                </article>
              );
            })}
          </div>
          {/* smaller devices tab */}
          <select
            className="w-[180px] mx-auto block md:hidden mb-4 p-2 text-[16px] outline-none border-2 rounded-md focus:border-mainPurple"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              // get the value
              const value: string =
                event.target.options[event.target.selectedIndex].value;
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
          <div className="flex flex-col gap-y-1 mb-4">
            <h1 className="md:text-3xl text-lg text-center font-bold">
              Welcome To CodeAcademy
            </h1>
            <p className="text-grey-800 md:text-lg text-[16px]">
              {"Let's get started"}
            </p>
          </div>

          {/* external providers */}
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row gap-x-6">
            <CleverBtn />
            <GoogleBtn />
          </div>

          {/* or span */}
          <span className="text-gray-700 block text-center my-5 relative after:absolute after:top-[50%] after:-translate-y-[50%] after:right-0 after:w-[42%] after:h-[1px] after:bg-gray-700 before:absolute before:top-[50%] before:-translate-y-[50%] before:left-0 before:w-[42%] before:h-[1px] before:bg-gray-700">
            OR
          </span>

          <form className="w-full" onSubmit={signup}>
            {/* display different components based on the active tab */}
            {currentTab?.component}
            <span className="flex flex-row items-center gap-x-2 mt-4">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </span>
            <div className="text-right mt-4">
              <button
                type="submit"
                className="py-3 w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex md:flex-row md:justify-between md:items-center items-end mt-4 flex-col-reverse justify-center">
            <p className="text-grey-800 text-left md:text-lg text-[15px]">
              Already have an account?{" "}
              <Link href="/login">
                <a className="underline text-mainPurple">Sign In</a>
              </Link>
            </p>
            <p className="text-grey-800 underline">Forgot Password</p>
          </div>
        </div>
      </section>
      {/* position fixed, for stundents only */}
      <Grades /> {/*Only when the grades button is clicked*/}
    </main>
  );
};

export default SignUp;
