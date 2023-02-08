import axios from 'axios';
import http from 'axios.config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiArrowBack, BiLoaderCircle } from 'react-icons/bi';
import { BsExclamationTriangle } from 'react-icons/bs';
import { FiCheckCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { openErrorModal, openPreloader, closePreloader } from 'store/fetchSlice';
import { RootState } from 'store/store';

const VerifyWithKey = () => {
  const { email } = useSelector((state: RootState) => state.user.auth);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const key = router?.query?.key;
  const verifyEmail = async () => {
    if (key) {
      console.log(key);
      setLoading(true);
      setError(false);
      try {
        const { data } = await http.post('/auth/confirm-email/', {
          key: router.query.key,
        });
        console.log(data);
        setLoading(false);
        setError(false);
      } catch (error: any) {
        console.log(error.message);
        dispatch(openErrorModal({ errorText: [error.message] }));
        setLoading(false);
        setError(true);
      }
      setMounted(true);
    }
  };

  const resendEmail = async () => {
    dispatch(openPreloader({ loadingText: 'Resending Email' }));
    const { data } = await http.post('/auth/registration/resend-email/', {
      email,
    });
    dispatch(closePreloader());
  };

  useEffect(() => {
    if (!mounted) {
      verifyEmail();
    }
  });

  return (
    <section className="bg-[#ECEDF3] w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] max-w-[600px] mx-auto bg-white rounded-md shadow-lg p-6">
        {loading && !error && (
          <div className="flex justify-center items-center flex-col gap-y-4">
            <div className="w-[50px] h-[50px] rounded-full border-[6px] border-[lightblue] border-t-[#2073fa] animate-spin"></div>
            <p className="text-[21px] font-bold">Verifying your email address</p>
          </div>
        )}
        {!loading && !error && (
          <div>
            <span className="text-[70px] flex justify-center items-center w-full text-center text-green-600 mb-2">
              <FiCheckCircle />
            </span>
            <p className="text-[21px] font-bold mt-4 text-center">
              Your Account has been verified successfully
            </p>
            <div className="mt-4 pt-4 border-t-4">
              <Link href={'/login'}>
                <button className=" flex items-center gap-x-2 py-3 px-5 mx-auto text-white bg-[#2073fe] rounded-md">
                  <BiArrowBack /> Back to login
                </button>
              </Link>
            </div>
          </div>
        )}
        {error && (
          <div>
            <span className="text-[70px] flex justify-center items-center w-full text-center text-red-600 mb-2">
              <BsExclamationTriangle />
            </span>
            <p className="text-[21px] font-bold mt-4 text-center">Unable to verify account</p>
            <div className="mt-4 pt-4 border-t-4">
              <button
                className=" flex items-center gap-x-2 py-3 px-5 mx-auto text-white bg-[#2073fe] rounded-md"
                onClick={resendEmail}
              >
                <BiLoaderCircle /> Resend Link
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyWithKey;
