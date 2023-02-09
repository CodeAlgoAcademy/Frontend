import ParentSignUp1 from '@/components/parentMultiForm/ParentSignUp1';
import ParentSignUp2 from '@/components/parentMultiForm/ParentSignUp2';
import ParentSignUp3 from '@/components/parentMultiForm/ParentSignUp3';
import ParentSignUp4 from '@/components/parentMultiForm/ParentSignUp4';
import ParentSignUp5 from '@/components/parentMultiForm/ParentSignUp5';
import ParentSignUp6 from '@/components/parentMultiForm/ParentSignUp6';
import Safety1 from '@/components/parentMultiForm/Safety1';
import Safety2 from '@/components/parentMultiForm/Safety2';
import Safety3 from '@/components/parentMultiForm/Safety3';
import ThankyouForm from '@/components/parentMultiForm/ThankyouForm';
import WelcomeForm from '@/components/parentMultiForm/WelcomeForm';
import useMultiForm from '@/components/useMultiForm';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from 'services/authService';

export default function Parent() {
  const dispatch = useDispatch();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiForm(
    [
      <ParentSignUp1 key={1} />,
      <ParentSignUp2 key={2} />,
      <ParentSignUp3 key={3} />,
      <WelcomeForm key={4} />,
      <ParentSignUp4 key={5} />,
      <ParentSignUp5 key={6} />,
      <ParentSignUp6 key={7} />,
      <Safety1 key={8} />,
      <Safety2 key={9} />,
      <Safety3 key={10} />,
      <ThankyouForm key={11} />,
    ],
  );

  const signUp = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStepIndex === 2) {
      const data = await dispatch(signUpUser());
      if (!data?.error?.message) {
        next();
      }
    } else {
      next();
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#78A8FB] to-[#C4D7F8] min-h-[100vh] p-[2rem] relative">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">CodeAlgo</h1>
        <div>
          <span className="font-semibold">Already have an account?</span>
          <Link href="/login">
            <span className="cursor-pointer ml-3 font-semibold text-[#2073FA]">Log in</span>
          </Link>
        </div>
      </div>
      <div
        className={`flex p-[4rem] items-center justify-center ${
          currentStepIndex === 8 && 'mb-[5.7rem]'
        }`}
      >
        <div className="bg-white mr-[-2rem] w-[700px] px-[4rem] py-[4rem] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 rounded-[2.5rem]">
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
                  back
                </button>
              )}
              {isFirstStep && (
                <button
                  className="block  h-[2.5rem] mt-6 text-center w-full bg-neutral-100/70 font-semibold rounded-xl text-black"
                  type="button"
                  onClick={back}
                >
                  Sign Up with Google
                </button>
              )}
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
                <button className="block text-center underline w-full mt-4">
                  Continue as student
                </button>
              )}
            </div>
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
}
