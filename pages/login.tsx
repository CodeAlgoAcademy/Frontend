import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { updateUser } from 'store/authSlice';
import { useRouter } from 'next/router';
import { loginUser } from 'services/authService';
import AuthLayout from '@/components/parents/AuthLayout';
import GoogleBtn from '@/components/googleBtn';
const LoginTest = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email, password } = useSelector((state: RootState) => state.user.auth);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const login = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await dispatch(loginUser());
    if (!data?.error?.message) {
      if (data?.payload?.is_teacher) {
        router.push('/addClass');
      } else if (data?.payload?.is_parent) {
        router.push('/parents');
      } else {
        router.push('/comingSoon');
      }
    }
  };

  const onReCaptchaVerify = useCallback(async () => {
    setRecaptchaVerified(() => true);
  }, []);

  const onReCaptchaExpire = useCallback(async () => {
    setRecaptchaVerified(() => false);
  }, []);
  const onReCaptchaLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    // if(captchaRef.current !== null) {
    //   captchaRef.current.execute();
    // }
  };

  useEffect(() => {
    // dispatch(clearFields());
  }, []);
  return (
    <AuthLayout>
      <>
        <h1 className="font-bold text-[32px]">Log in to your account</h1>
        <form onSubmit={login}>
          <label className="block text-xl font-semibold mt-6">Your email</label>
          <input
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateUser({ key: 'email', value: e.target.value }));
            }}
            type="email"
            className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
            placeholder="schoolTeach@gmail.com"
            required
          />
          <label className="block text-xl font-semibold mt-6">Password</label>
          <input
            className="block w-full h-[2.5rem] rounded-xl px-4 py-2 focus:outline-0 mt-3"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch(updateUser({ key: 'password', value: e.target.value }));
            }}
            type="password"
            required
          />
          <button
            className="block  h-[2.5rem] mt-6 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl"
            type="submit"
          >
            Login
          </button>
          <GoogleBtn />
        </form>
      </>
    </AuthLayout>
  );
};

export default LoginTest;
