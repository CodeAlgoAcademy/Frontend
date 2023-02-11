import GoogleBtn from '@/components/googleBtn';
import OtherInfoStudent from '@/components/parentMultiForm/OtherInfoStudent';
import ParentSignUp1 from '@/components/parentMultiForm/ParentSignUp1';
import ParentSignUp2 from '@/components/parentMultiForm/ParentSignUp2';
import WelcomeForm from '@/components/parentMultiForm/WelcomeForm';
import AuthLayout from '@/components/parents/AuthLayout';
import useMultiForm from '@/components/useMultiForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Student() {
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiForm([
    <ParentSignUp1 key={1} />,
    <ParentSignUp2 key={2} />,
    <OtherInfoStudent key={4} />,
    <WelcomeForm key={3} />,
  ]);

  return (
    <AuthLayout>
      <form>
        <div className="">{step}</div>
        <div>
          <button
            className="block  h-[2.5rem] mt-6 text-center w-full text-white bg-[#2073FA] font-bold rounded-xl"
            type="button"
            onClick={next}
          >
            Continue
          </button>
          {!isFirstStep && !isLastStep && (
            <button className="block text-center w-full mt-4" type="button" onClick={back}>
              back
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
