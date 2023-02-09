import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { updateUser } from 'store/authSlice';
import { useRouter } from 'next/router';
import { loginUser } from 'services/authService';
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
    <div className="bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] min-h-[100vh] p-[2rem] relative">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">CodeAlgo</h1>
        <div>
          <span className="font-semibold">Yet to create account?</span>
          <Link href="/selectUserType">
            <span className="cursor-pointer ml-3 font-semibold text-[#2073FA]">Register</span>
          </Link>
        </div>
      </div>
      <div className={`flex p-[4rem] items-center justify-center `}>
        <div className="bg-white mr-[-2rem] w-[700px] px-[4rem] py-[4rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-[2.5rem]">
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
            <button
              className="block  h-[2.5rem] mt-6 text-center w-full bg-neutral-100/70 font-semibold rounded-xl text-black"
              type="button"
            >
              Sign In with Google
            </button>
          </form>
        </div>
        <div className="ml-[-2rem]">
          <Image
            src="/assets/ComputerGraphic.png"
            width="829.8"
            height="520.2"
            alt="computer graphic"
          />
        </div>
      </div>
      <div className="box-border text-[16px] text-white bg-[#2073FA] font-semibold flex justify-between w-full absolute left-0 bottom-0 py-3 px-10">
        <p>© 2023 CodeAlgoAcademy. All rights reserved.</p>
        <p className="left-0">Get help</p>
      </div>
    </div>
  );
};

export default LoginTest;
