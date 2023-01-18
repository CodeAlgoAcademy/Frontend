import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CleverBtn from '../components/cleverBtn';
import GoogleBtn from '../components/googleBtn';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IInputFields } from '../types/interfaces';
import { loginUser } from '../services/authService';
import { clearFields, updateUser } from 'store/authSlice';
import styles from '../styles/styles';
import { useRouter } from 'next/router';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state: RootState) => state.user.auth);
  const router = useRouter();
  const inputFields: IInputFields[] = [
    {
      type: 'email',
      placeholder: 'Enter Email*',
      name: 'email',
      value: email,
    },
    {
      type: 'password',
      placeholder: 'Enter Password*',
      name: 'password',
      value: password,
    },
  ];
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const login = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await dispatch(loginUser());
    if (!data?.error?.message) {
      if (data?.payload?.is_teacher) {
        router.push('/addClass');
      } else {
        router.push('/comingSoon');
      }
    }
  };
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha('yourAction');
    fetch('/api/recaptcha', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gRecaptchaToken: token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.status === 'success') {
          setRecaptchaVerified(true);
        }
        setRecaptchaLoading(false);
        setNotification(res?.message);
      });
  }, [executeRecaptcha]);

  useEffect(() => {
    // dispatch(clearFields());
  }, []);

  return (
    <main>
      <Head>
        <title>CodeAlgo Academy | Login</title>
      </Head>
      <section className="w-full min-h-screen bg-[#E5E5E5]  flex justify-center items-center">
        <div className="bg-white w-[95vw] max-w-[600px] mx-auto rounded-md p-[40px] md:p-[50px] shadow-md">
          {/* title */}
          <div className="flex flex-col gap-y-1 mb-4">
            <h1 className="md:text-3xl text-center text-lg font-bold">
              Welcome to CodeAlgo Academy
            </h1>
            <p className="text-grey-800 md:text-lg text-[16px] text-center">
              New here?
              <Link href="/signup">
                <a className="ml-2 underline text-mainPurple" data-testid="go-to-signup">
                  Create an account
                </a>
              </Link>
            </p>
          </div>

          {/* providers button */}
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row gap-x-6">
            <CleverBtn />
            <GoogleBtn />
          </div>

          {/* or span */}
          <span className="text-gray-700 block text-center my-5 relative after:absolute after:top-[50%] after:-translate-y-[50%] after:right-0 after:w-[42%] after:h-[1px] after:bg-gray-700 before:absolute before:top-[50%] before:-translate-y-[50%] before:left-0 before:w-[42%] before:h-[1px] before:bg-gray-700">
            OR
          </span>

          <form className="w-full" onSubmit={login}>
            {/* inputs */}
            <div className="flex flex-col gap-y-3 mb-6 items-start">
              {inputFields.map((inputField: IInputFields, index: number) => {
                const { type, placeholder, name, value } = inputField;
                return (
                  <input
                    key={index}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      dispatch(updateUser({ key: name, value: e.target.value }));
                    }}
                    minLength={name === 'password' ? 8 : 0}
                    required
                    className={styles.input}
                  />
                );
              })}
            </div>
            {/* login button */}
            <span className="flex flex-row items-center gap-x-2 mt-4">
              <input type="checkbox" id="terms" className="accent-mainPurple" required />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </span>

            <div className="flex items-center justify-between">
              <Link href="/change-password">
                <p className="underline text-[16px] mt-2 opacity-80 cursor-pointer font-semibold hover:opacity-90">
                  Forgot Password
                </p>
              </Link>
              <button
                type="submit"
                // disabled={ !recaptchaVerified }
                className="py-3 w-[150px] text-[16px] rounded-[30px] text-white bg-mainPurple hover:shadow-md"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="inline w- mx-auto">
            <span className="flex items-center gap-8 mt-6 justify-center relative">
              {recaptchaLoading ? (
                <div className="relative w-3 h-3">
                  <div className="spinner center">
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                    <div className="spinner-blade"></div>
                  </div>
                </div>
              ) : (
                <label className="checkbox_container block relative cursor-pointer text-[20px] select-none">
                  <input
                    checked={recaptchaVerified}
                    type="checkbox"
                    className="absolute opacity-0 cursor-pointer h-0 w-0"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleReCaptchaVerify();
                        setRecaptchaLoading(true);
                      }
                    }}
                  />
                  <div
                    className="box_checkmark checkmark relative left-0 h-[1.3em] w-[1.3em] bg-[#606062] border rounded-[5px] shadow-md"
                    style={{ top: '-12px' }}
                  ></div>
                </label>
              )}
              {notification === 'Verification Successfull' && (
                <p className="text-green-500 text-sm font-semibold text-center">{notification}</p>
              )}
              {notification === 'Verification Failed' ||
                (notification === 'Error submitting verification data' && (
                  <p className="text-red-500 text-sm font-semibold text-center">{notification}</p>
                ))}
              {notification === '' && (
                <p className="text-sm font-semibold text-center">
                  Click to verify {"you're"} not a robot.
                </p>
              )}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default function LoginPage(): React.ReactElement {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}>
      <Login />
    </GoogleReCaptchaProvider>
  );
}
