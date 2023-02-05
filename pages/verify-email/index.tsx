import http from 'axios.config';
import Image from 'next/image';
import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { closePreloader, openPreloader } from 'store/fetchSlice';
import { RootState } from 'store/store';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user.auth);
  const resendEmail = async () => {
    dispatch(openPreloader({ loadingText: 'Resending Email' }));
    const { data } = await http.post('/auth/registration/resend-email/', {
      email,
    });
    dispatch(closePreloader());
  };
  return (
    <section className="w-full min-h-screen bg-[#e5e5e5] flex justify-center items-center">
      <div className="w-[90vw] max-w-[600px] bg-white shadow-lg rounded-md p-8">
        <div className="py-6">
          <span className="text-[70px] flex justify-center items-center w-full text-center text-green-600 mb-2">
            <FiCheckCircle />
          </span>
          <p className="text-center text-[20px]">
            An email verification link has been sent to your email address{' '}
            <span className="font-[800]">{email}</span>
          </p>
        </div>
        <footer className="border-t-2 pt-4 w-full text-center">
          <p>If you {"didn't"} receive the link, click on</p>
          <button
            onClick={resendEmail}
            className="mt-2 p-3 rounded-md w-[150px] bg-[#2073fe] text-white shadow-md"
          >
            Resend link
          </button>
        </footer>
      </div>
    </section>
  );
};

export default EmailVerification;
