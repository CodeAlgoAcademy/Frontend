import React from 'react';
import Link from 'next/link';
import { IoMdConstruct } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
const ComingSoon = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-[#ecedf3] flex justify-center items-center flex-col gap-y-4 p-6">
      <h1 className="text-[#2073fa] font-bold text-[27px] xs:text-[32px] sm:text-[43px] md:text-[64px] flex items-center gap-x-2 justify-center">
        Coming Soon{' '}
        <span>
          <IoMdConstruct />
        </span>
      </h1>
      <p className="text-gray-800 text-[18px] font-bold text-center">
        This page is currently under construction
      </p>

      <button
        className="text-white flex gap-x-2 items-center py-3 px-6 text-[15px] rounded-full bg-[#2073fa] font-bold"
        onClick={() => {
          router.back();
        }}
      >
        <span>
          <FaArrowLeft />
        </span>
        Return to registration
      </button>
    </div>
  );
};
export default ComingSoon;
