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
      <div className="flex items-center justify-center mt-[13rem] gap-x-[5rem]">
        <Link href="/signup/parent">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Parent' }));
            }}
          >
            <Image src="/assets/parents.png" alt="parent" height="225" width="225" />
            <h2 className="mt-[2rem] font-bold text-black-500 text-3xl text-center">Parent</h2>
          </div>
        </Link>
        <Link href="/signup/teacher">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Teacher' }));
            }}
          >
            <Image src="/assets/teacher.png" alt="parent" height="225" width="225" />
            <h2 className="mt-[2rem] font-bold text-black-500 text-3xl text-center">Teacher</h2>
          </div>
        </Link>
        <Link href="/signup/student">
          <div
            className="hover:scale-110 transition duration-300 ease-out hover:text-[#2073fa]"
            onClick={() => {
              dispatch(updateUser({ key: 'accountType', value: 'Student' }));
            }}
          >
            <Image src="/assets/students.png" alt="parent" height="225" width="225" />
            <h2 className="mt-[2rem] font-bold text-black-500 text-3xl text-center">Student</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
