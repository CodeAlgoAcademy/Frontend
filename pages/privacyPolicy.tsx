import Policies from '@/components/privacyPolicy/policies';
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
        <Policies title='Acknowloedgement' body=' By using our software, or by clicking on a box that states you agree to these terms, you
          acknowledge that you have read, understood, and agree to be bound by these Terms of
          Service ("ToS"), which may be updated from time to time without notice to you. If you do
          not agree to the terms outlined in, you may not use the website. ‍' />
        
      </div>
      <div className="mt-[20px]">
        <Policies title='Privacy' body={`At CodeAlgo, we take your privacy seriously. Please read this Non-Student User Privacy
          Policy to learn how we treat your personal data if you are note a Student User (defined
          below), such as parent or guardian, teacher or school administrator (collectively,
          “Non-Student Users”). If you’re a student user of the CodeAlgo’s Services under the age of
          18 (“Student User”), your use of CodeAlgo’s Services and our collection and processing of
          Student User’s Personal Data is governed by the Student User Privacy Policy, and the
          Additional Terms for Student Data from Educational Institution. Both Non-Student Users,
          and Student Users are encouraged to review the Student User Privacy Policy and the
          Additional Terms for Student Data from Educational Institution to learn how we treat
          Personal Data of Student Users. By using or accessing our Services in any manner, you
          acknowledge that you accept the practices and policies outlined below, and you hereby
          consent that we will collect, use and share Personal Data of you, as a Non-Student User,
          as described in this Privacy Policy. Remember that your use of CodeAlgo's Services is at
          all times subject to our Terms of Use, which incorporates this Privacy Policy. Any terms
          we use in this Policy without defining them have the definitions given to them in the
          Terms of Use. ‍`} />
        
      </div>
      <div className="mt-[20px]">
        <Policies title='Usage Requirements' body={`In order to use CodeAlgo, you must have: • an account; • a browser device, or mobile device
          that meets or exceeds the system requirements; and • Internet access. We do not guarantee
          that CodeAlgo will be compatible or operate with your browser, Internet provider’s service
          plan, mobile carrier’s service plan, or any other piece of hardware, software, equipment,
          or device you use to access CodeAlgo. You are responsible for providing, maintaining, and
          ensuring the compatibility of all hardware, software, and other system requirements
          necessary for your access to and use of CodeAlgo. You are also responsible for all third
          party charges and fees, including to your Internet service provider and mobile carrier, in
          connection with your access and use of CodeAlgo and for complying with any contracts,
          terms of service agreements, and restrictions associated with such third party services.
          Storing Credentials CodeAlgo may allow you to store your login credentials in the game so
          that you can be automatically logged in each time you access CodeAlgo. If someone else has
          access to your computer or mobile device the automatic login feature will allow that
          person to have access to your CodeAlgo account. You are responsible for our damages
          resulting from unauthorized access to CodeAlgo from your account and we will have no
          liability for your damages or loss related to such unauthorized access or use. Your
          Account You must have an account to use CodeAlgo. When you create an account, you may have
          the option to select a unique username. Your username must be appropriate and not
          offensive. We reserve the right in our sole discretion to change and disable any account
          that does not meet our naming standards. This account is personal to you and you may not
          share it or allow any other person to utilize your account. You are responsible for all
          activities that occur under your account. You must immediately notify us if your
          registration information changes or you learn of or have reason to suspect any
          unauthorized use of your account or any other breach of security. ‍ Removal of Access We
          have the right at all times and without notice to you to review and audit your access and
          use of CodeAlgo and your compliance with the terms of this ToS. We may suspend or
          terminate your CodeAlgo account and your access to CodeAlgo at our sole discretion and
          without liability to you if we believe you have violated the terms of this ToS. ‍ ‍`} />
        
      </div>
    </section>
  );
};

export default PrivacyPolicy;
