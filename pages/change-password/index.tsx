import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaPaperPlane, FaTimes } from 'react-icons/fa';
import http from 'axios.config';

const index = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await http.post('/auth/password-reset/', {
      email,
    });
    setEmail('');
    setModalOpened(true);
  };

  return (
    <main className="bg-[#E5E5E5] w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] max-w-[500px] mx-auto rounded-md shadow-md bg-white p-8">
        <div className="text-center">
          <h1 className="text-[26px] font-bold">Forgot Password</h1>
          <p className="text-gray-800">Enter your email address to reset your password</p>
        </div>
        <form className="w-full flex gap-y-4 flex-col mt-6" onSubmit={handleSubmit}>
          <div className="w-full">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              required
              className="px-3 py-3 rounded-md focus:border-mainPurple w-full border-2 outline-none"
              placeholder="Enter Your Email Address"
            />
          </div>
          <button
            className="w-full rounded-md active:scale-[0.98] bg-mainPurple text-white py-3 px-3"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        <Link href="/login">
          <p className="mt-4 flex gap-x-4 items-center justify-end cursor-pointer">
            <span className="text-[17px] w-[30px] h-[30px] border-2 rounded-full flex justify-center items-center border-black">
              <FaChevronLeft />
            </span>
            <p className="font-bold">Back to login</p>
          </p>
        </Link>
      </div>

      {modalOpened && (
        <section
          className={
            'fixed top-0 left-0 bg-[rgba(0,0,0,.6)] w-full min-h-screen flex justify-center items-center'
          }
        >
          <div
            className={` w-[90vw] mx-auto max-w-[500px] bg-white shadow-md rounded-md relative z-20 p-8`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[17px] font-bold flex gap-x-4 items-center cursor-pointer">
                <i className="text-[22px] text-mainPurple">
                  <FaPaperPlane />
                </i>{' '}
                Password Reset
              </span>
              <span
                className="text-[darkred] text-[22px] font-bold cursor-pointer"
                onClick={() => {
                  setModalOpened(false);
                }}
              >
                <FaTimes />
              </span>
            </div>
            <div className="mt-8 text-center font-bold text-[22px]">
              <h1>A password reset link has been sent to your email!</h1>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default index;
