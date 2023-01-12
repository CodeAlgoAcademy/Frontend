import Image from 'next/image';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12 min-h-screen">
      <header className="flex flex-row gap-x-4 items-center w-full">
        <div className="w-[60px] h-[60px]">
          <Image src="/assets/Coffee cup.png" width={'60px'} height={'60px'} />
        </div>
        <h1 className="text-orange-600 font-bold text-[28px]">CodeAlgo Academy Privacy Policy</h1>
      </header>
      <div className="mt-[25px]">
        <p>
          Welcome to the CodeAlgo, a game-based practice & assessment platform, which is owned by
          CodeAlgo, LLC (“CodeAlgo,” “we,” “us,” “our”). Please read the following Terms of Service
          (“ToS”) and our Privacy Policy.
        </p>
      </div>
      <div className="mt-[20px]">
        <h1 className="text-orange-600 text-[23px] font-bold">Acknowledgement</h1>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
