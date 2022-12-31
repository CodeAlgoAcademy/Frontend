import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getAccessToken } from "utils/getTokens";
const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found!</title>
      </Head>
      <div className="py-[40px] min-h-screen flex justify-center items-center flex-col gap-y-4 w-full">
        <h1 className="text-orange-600 font-bold text-[64px] md:text-[100px] lg:text-[150px]">
          Oops!
        </h1>
        <p className="text-[18px] text-gray-800 font-bold">
          The requested page doesn't exist
        </p>
        <Link href={`${getAccessToken() ? "/addClass" : "/"}`}>
          <button className="text-white flex gap-x-2 items-center py-4 px-6 text-[15px] rounded-full bg-orange-600 font-bold">
            <span>
              <FaArrowLeft />
            </span>
            Return to homepage
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
