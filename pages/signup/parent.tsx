import GoogleBtn from '@/components/googleBtn';
import ParentSignUp1 from '@/components/parentMultiForm/ParentSignUp1';
import ParentSignUp2 from '@/components/parentMultiForm/ParentSignUp2';
import ParentSignUp3 from '@/components/parentMultiForm/ParentSignUp3';
import ParentSignUp4 from '@/components/parentMultiForm/ParentSignUp4';
import ParentSignUp5 from '@/components/parentMultiForm/ParentSignUp5';
import ParentSignUp6 from '@/components/parentMultiForm/ParentSignUp6';
import ParentSignUp7 from '@/components/parentMultiForm/ParentSignUp7';
import Safety1 from '@/components/parentMultiForm/Safety1';
import Safety2 from '@/components/parentMultiForm/Safety2';
import Safety3 from '@/components/parentMultiForm/Safety3';
import ThankyouForm from '@/components/parentMultiForm/ThankyouForm';
import WelcomeForm from '@/components/parentMultiForm/WelcomeForm';
import AuthLayout from '@/components/parents/AuthLayout';
import useMultiForm from '@/components/useMultiForm';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from 'services/authService';
import { addChild } from 'store/parentSlice';

export default function Parent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm(
    [
      <ParentSignUp1 key={1} />,
      <ParentSignUp2 key={2} />,
      <ParentSignUp3 key={3} />,
      <WelcomeForm key={4} />,
      <ParentSignUp4 key={5} />,
      <ParentSignUp5 key={6} />,
      <ParentSignUp6 key={7} />,
      <ParentSignUp7 key={8} />,
      <Safety1 key={9} />,
      <Safety2 key={10} />,
      <Safety3 key={11} />,
      <ThankyouForm key={12} />,
    ],
  );

  const signUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStepIndex === 2) {
      const data = await dispatch(signUpUser());
      if (!data?.error?.message) {
        next();
      }
    } else if (currentStepIndex === 10) {
      router.push('/parents');
    } else if (currentStepIndex === 6) {
      const data = await dispatch(addChild());
      if (!data?.error?.message) {
        next();
      }
    } else {
      next();
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={signUp}>
        <div className="">{step}</div>
        <div>
          <button
            className="block  h-[2.5rem] mt-6 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl"
            type="submit"
          >
            Continue
          </button>
          {currentStepIndex === 7 && (
            <p
              onClick={() => {
                goTo(9);
              }}
              className="my-3 text-center text-[14px] cursor-pointer underline font-bold"
            >
              I do not want to set parental controls
            </p>
          )}
          {!isFirstStep && !isLastStep && (
            <button className="block text-center w-full mt-4" type="button" onClick={back}>
              Back
            </button>
          )}
          {isFirstStep && <GoogleBtn />}
          {isFirstStep && (
            <button
              className="block  h-[2.5rem] mt-6 text-center w-full bg-neutral-100/70 font-semibold rounded-xl text-black"
              type="button"
              onClick={back}
            >
              Sign Up with Facebook
            </button>
          )}
          {isLastStep && (
            <button className="block text-center underline w-full mt-4">Continue as student</button>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}
