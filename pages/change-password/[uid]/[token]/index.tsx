import http from 'axios.config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { openErrorModal } from 'store/fetchSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(openErrorModal({ errorText: ['Passwords do not match'] }));
    } else {
      const { data } = await http.patch('/auth/password-reset/change/', {
        password: password,
        token: router.query.token,
        uidb64: router.query.uid,
      });
      setModalOpened(true);
    }
  };
  return (
    <main className="bg-[#E5E5E5] w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] max-w-[500px] mx-auto rounded-md shadow-md bg-white p-8">
        <div className="text-center">
          <h1 className="text-[26px] font-bold">Forgot Password</h1>
          <p className="text-gray-800">Enter your new password</p>
        </div>
        <form className="w-full flex gap-y-4 flex-col mt-6" onSubmit={handleSubmit}>
          <div className="w-full">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={8}
              type="password"
              required
              className="px-3 py-3 rounded-md focus:border-mainPurple w-full border-2 outline-none"
              placeholder="Enter Your New Password"
            />
          </div>
          <div className="w-full">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              minLength={8}
              type="password"
              required
              className="px-3 py-3 rounded-md focus:border-mainPurple w-full border-2 outline-none"
              placeholder="Confirm Your New Password"
            />
            {password !== '' && confirmPassword !== '' && password !== confirmPassword && (
              <p className="text-red-600 text-[14px] mt-2">Passwords do not match!</p>
            )}
          </div>
          <button
            className="w-full rounded-md active:scale-[0.98] bg-mainPurple text-white py-3 px-3"
            type="submit"
          >
            Reset Password
          </button>
        </form>
        {modalOpened && (
          <section
            className={
              'fixed top-0 left-0 bg-[rgba(0,0,0,.6)] w-full min-h-screen flex justify-center items-center'
            }
          >
            <div
              className={`
          ${
            modalOpened ? 'showModal' : 'hideModal'
          } w-[90vw] mx-auto max-w-[500px] bg-white shadow-md rounded-md relative z-20 p-8`}
            >
              <div className="text-center font-bold text-[22px]">
                <h1>Password reset was successful!</h1>
              </div>
              <Link href="/login">
                <button className="mt-6 w-full bg-mainPurple py-3 rounded-md shadow-md text-white flex items-center justify-center font-bold gap-x-4">
                  <i>
                    <FaArrowLeft />
                  </i>
                  Return to login
                </button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
