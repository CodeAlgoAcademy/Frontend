import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/authSlice';

export default function SelectUserType() {
  const dispatch = useDispatch();

  return (
    <div className="">
      <h1 className="mt-[2rem] font-bold text-blue-400 text-3xl text-center">
        Who are you signing up as?
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 items-center justify-center md:mt-[13rem] md:gap-x-[5rem] md:flex-row flex-col gap-y-6 mt-[2rem]">
        <Link href="/signup/parent">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Parent' }));
            }}
          >
            <div className="md:max-w-fit max-w-[200px] md:max-h-fit max-h-[200px] mx-auto">
              <Image src="/assets/parents.png" alt="parent" height="225" width="225" />
            </div>
            <h2 className="md:mt-[2rem] mt-[.4rem] font-[500] cursor-pointer md:font-bold text-black-500 md:text-3xl text-[1.3rem] text-center">
              Parent
            </h2>
          </div>
        </Link>
        <Link href="/signup/teacher">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Teacher' }));
            }}
          >
            <div className="md:max-w-fit max-w-[200px] md:max-h-fit max-h-[200px] mx-auto">
              <Image src="/assets/teacher.png" alt="parent" height="225" width="225" />
            </div>
            <h2 className="md:mt-[2rem] mt-[.4rem] font-[500] cursor-pointer md:font-bold text-black-500 md:text-3xl text-[1.3rem] text-center">
              Teacher
            </h2>
          </div>
        </Link>
        <Link href="/signup/student">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Student' }));
            }}
          >
            <div className="md:max-w-fit max-w-[200px] md:max-h-fit max-h-[200px] mx-auto">
              <Image src="/assets/students.png" alt="parent" height="225" width="225" />
            </div>
            <h2 className="md:mt-[2rem] mt-[.4rem] font-[500] cursor-pointer md:font-bold text-black-500 md:text-3xl text-[1.3rem] text-center">
              Student
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
