import axios from 'axios';
import http from 'axios.config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FiCheckCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { openErrorModal } from 'store/fetchSlice';
const VerifyWithKey = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(router.query.key);
  const verifyEmail = async () => {
    setLoading(true);
    try {
      const { data } = await http.post('/auth/confirm-email/', {
        key: router.query.key,
      });
      console.log(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      dispatch(openErrorModal({ errorText: [error.message] }));
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <section className="bg-[#e5e5e5] w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] max-w-[600px] mx-auto bg-white rounded-md shadow-lg p-6">
        {loading && (
          <div className="flex justify-center items-center flex-col gap-y-4">
            <div className="preloader flex justify-center items-center w-[60px] h-[60px] rounded-full border-x-4 border-mainPurple"></div>
            <p className="text-[21px] font-bold">Verifying your email address</p>
          </div>
        )}
        {!loading && (
          <div>
            <span className="text-[70px] flex justify-center items-center w-full text-center text-green-600 mb-2">
              <FiCheckCircle />
            </span>
            <p className="text-[21px] font-bold mt-4 text-center">
              Your Account has been verified successfully
            </p>
            <div className="mt-4 pt-4 border-t-4">
              <Link href={'/login'}>
                <button className=" flex items-center gap-x-2 py-3 px-5 mx-auto text-white bg-mainPurple rounded-md">
                  <BiArrowBack /> Back to login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyWithKey;
