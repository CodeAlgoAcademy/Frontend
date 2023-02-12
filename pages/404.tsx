import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { getAccessToken } from 'utils/getTokens';
import { useRouter } from 'next/router';
const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (!window.location.pathname.includes('/404')) {
      window.location.replace('404');
    }
  }, []);
  return (
    <>
      <Head>
        <title>Page Not Found!</title>
      </Head>
      <div className="bg-[#ECEDF3] py-[40px] min-h-screen flex justify-center items-center flex-col gap-y-4 w-full">
        <h1 className="text-[#2073fa] font-bold text-[27px] xs:text-[32px] sm:text-[64px] md:text-[100px] lg:text-[150px]">
          Oops!
        </h1>
        <p className="text-[18px] text-gray-800 font-bold">The requested page {"doesn't"} exist</p>

        <button
          className="text-white flex gap-x-2 items-center py-2 px-6 text-[15px] rounded-full bg-[#2073fa] font-bold"
          onClick={() => {
            router.back();
          }}
        >
          <span>
            <FaArrowLeft />
          </span>
          Back
        </button>
      </div>
    </>
  );
};

export default ErrorPage;
