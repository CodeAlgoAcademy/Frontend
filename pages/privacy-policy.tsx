import Policies from "@/components/UI/policies";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { checkPolicy, unCheckPolicy } from "store/policySlice";
import Navbar from "@/components/navbar/home/Navbar";
import Footer from "@/components/home/new-home/footer";

interface BetaDisclaimerProps {
   title: string;
   body: string[];
}

const betaDisclaimers: BetaDisclaimerProps[] = [
   {
      title: "Disability, Capability and Security Compliance",
      body: [
         "We are actively working on enhancing the disability of CodeAlgo Academy to ensure a more inclusive experience for all users. Compliance with standards such as Web Content Accessibility Guidelines(WCAG) is a prority for us.",
         " Security compliance standards, including SOC II (Security Operations for Compliance) and ISO 10007 (International Security Operations), are being pursued as part of our commitment to providing a secure platform",
      ],
   },
   {
      title: "Limited Availability",
      body: [
         "During the beta testing phase, certain features, functionalities, and security measures may not be fully operational or compliant with the standards mentioned above",
         "We acknowledge that the full suite of features and compliance measures may not be available during this initial trial period",
      ],
   },
];

const PrivacyPolicy = () => {
   const dispatch = useDispatch();

   const handleAccept = () => {
      dispatch(checkPolicy());
      router.back();
   };
   const handleReject = () => {
      dispatch(unCheckPolicy());
      router.back();
   };

   const router = useRouter();
   return (
      <section className="min-h-screen w-full bg-[#ecedf3]">
         <Navbar />
         <div className="mx-auto max-w-[1200px] px-6 py-12 ">
            <header className="flex w-full flex-row items-center gap-x-4">
               <h1 className="text-[28px] font-bold text-mainRed">CodeAlgo Academy Privacy Policy</h1>
            </header>
            <div className="mt-[25px]">
               <p>
                  Welcome to the CodeAlgo, a game-based practice & assessment platform, which is owned by CodeAlgo, Inc (“CodeAlgo,” “we,” “us,”
                  “our”). Please read the following Terms of Service (“ToS”) and our Privacy Policy.
               </p>
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Acknowledgement"
                  body=' By using our software, or by clicking on a box that states you agree to these terms, you
          acknowledge that you have read, understood, and agree to be bound by these Terms of
          Service ("ToS"), which may be updated from time to time without notice to you. If you do
          not agree to the terms outlined in, you may not use the website. ‍'
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Privacy"
                  body={`At CodeAlgo, we take your privacy seriously. Please read this Non-Student User Privacy
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
          Terms of Use. ‍`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Usage Requirements"
                  body={`In order to use CodeAlgo, you must have: • an account; • a browser device, or mobile device
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
          unauthorized use of your account or any other breach of security.
           ‍ ‍`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Removal of Access"
                  body={`We
         have the right at all times and without notice to you to review and audit your access and
         use of CodeAlgo and your compliance with the terms of this ToS. We may suspend or
         terminate your CodeAlgo account and your access to CodeAlgo at our sole discretion and
         without liability to you if we believe you have violated the terms of this ToS.
           ‍ ‍`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Changes to CodeAlgo"
                  body={`We may discontinue or alter any aspect of CodeAlgo, remove Content from CodeAlgo, restrict the time CodeAlgo is available, install bug fixes, updates, patches, and other upgrades to CodeAlgo, and restrict the amount of use permitted at our sole discretion and without notice or liability. Your only remedy is to discontinue using CodeAlgo if you do not want a modification we make to CodeAlgo.‍`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Feedback"
                  body={`We welcome your comments, feedback, information, or materials regarding CodeAlgo or any of our other products or services (collectively, “Feedback”). Your Feedback will become our property when you submit it to us. You irrevocably assign to us all right, title, and interest in and to the Feedback and all copyrights and other intellectual property rights embodied in such Feedback on a worldwide basis. We will be free to use your Feedback on an unrestricted basis. You hereby assign or waive, as the case may be, any moral rights that you may have in or to the Feedback.`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Ownership & Intellectual Property"
                  body={`CodeAlgo is licensed, not sold. All images, trademarks, service marks, and logos displayed in CodeAlgo and all accounts, features, and components of CodeAlgo are our property. Third party materials in CodeAlgo are licensed to us and these third parties may enforce their ownership rights against you if you violate the terms of this ToS. CodeAlgo is our copyrighted property and it may not be reproduced, recreated, modified, accessed, or used in any manner or disseminated or distributed to any other party.

        All User Representations You represent and warrant that:
        • you are over the age of 18, have a parent’s consent to access and use CodeAlgo, have the power and authority to enter into and perform your obligations under this ToS, or have obtained consent from a student/child's parents to sign-up for accounts on their behalf;
        • all information provided by you is truthful, accurate and complete;
        • you will comply with the terms and conditions of this ToS and any other agreement that is related to your use of CodeAlgo, User Content, Feedback, or any part thereof;
        • you have provided and will maintain accurate and complete account information;
        • immediately notify us in the event you learn of or have reason to suspect any unauthorized use of your account or other breach of security;
        • your access to and use of CodeAlgo or any part thereof will not violate any other agreement, contract, terms of use, or any law or regulation; and
        • you will not use CodeAlgo in order to gain competitive intelligence about us, CodeAlgo, or to otherwise compete with us.
                  
        Feedback In the event you provide any Feedback to us, you make the following additional representations and warranties:
        • you are owner of such Feedback or have the right to grant to us the licenses or assignments granted pursuant to this ToS;
        • you have secured any and all consents necessary to provide the Feedback and to grant the foregoing licenses or assignments;
        • the Feedback does not violate the rights of any third party;
        • the Feedback does not contain any personally identifiable information about third parties;
        • the use of any Feedback will not result in harm or personal injury to any third party; and
        • all factual information contained in the Feedback is true and accurate.
`}
               />
               <div className="mt-[20px] pl-4">
                  <Policies
                     isSubtitle={true}
                     title="Patent Protection Alert"
                     body="Please be aware that certain cutting-edge features and breakthrough innovations within CodeAlgo are currently safeguarded by pending patents, not only within the United States but also in other jurisdictions worldwide. Any unauthorized utilization or replication of these patented elements could potentially expose you to rigorous legal repercussions.
"
                  />
               </div>

               <div className="mt-[20px] pl-4">
                  <Policies
                     isSubtitle={true}
                     title="Non-Compete Covenant
"
                     body="By engaging with CodeAlgo, you explicitly affirm that you are not engaged in competitive ventures with CodeAlgo, and you pledge not to exploit the platform in any way that may confer a competitive edge or facilitate the misappropriation of intellectual property, trade secrets, or confidential information disclosed on this platform. Contravening this non-compete commitment may result in stringent legal action.
"
                  />
               </div>
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Disclaimers"
                  body={`Errors and Availability We use reasonable efforts to maintain CodeAlgo, but we are not responsible for any defects or failures associated with CodeAlgo, or any damages (such as lost profits or other consequential damages) that may result from any such defects or failures. CodeAlgo may be inaccessible or inoperable at any time and for any reason.Disclaimers of Warranty To the full extent allowed under applicable law, we expressly disclaim all warranties, express, implied or otherwise, including, without limitation, warranties of merchantability, title, non-infringement, suitability, integration, currentness, accuracy, and fitness for a particular purpose. We do not warrant and specifically disclaim any representations that CodeAlgo will meet your requirements, that access to or operation or use of CodeAlgo will be uninterrupted or error free, that defects in CodeAlgo, if any, will be corrected, or that results will be timely, accurate, adequate or complete. CodeAlgo is provided “as is” and “as available” and we do not guarantee CodeAlgo’s availability or uptime.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Limitation of Liability"
                  body={`To the extent permitted by law:• under no circumstance will we be responsible for lost profits, revenues, financial losses, or indirect, special, consequential, exemplary, or punitive damages; and • our total liability for any claims under this ToS, including for any implied warranties, is limited to the amount you paid to us to access and use CodeAlgo.The limitations of this section will apply to any theory of liability, whether based on warranty, contract, statute, tort (including negligence) or otherwise, and whether or not we have been informed of the possibility of any such damage, and even if a remedy set forth herein is found to have failed of its essential purpose. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above limitations may not apply to you.

`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Indemnity"
                  body={`You agree to defend, indemnify, and hold us and our officers, members, managers, employees, and agents harmless from and against any and all claims, liabilities, damages, losses, demands, or expenses, including attorney’s fees and costs and expenses, arising out of or in any way connected with your use of CodeAlgo, your breach or alleged breach of this ToS, your unauthorized use of User Content, unauthorized use of your CodeAlgo account, or your violation of any rights of any other person.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Term and Termination"
                  body={`This ToS is effective until you or CodeAlgo terminates it. You may terminate this ToS at any time by discontinuing your use of CodeAlgo. We may terminate this ToS at any time and for any reason without prior notice to you, and accordingly, we may deny you access to CodeAlgo and discard any Feedback you provide. Termination of this ToS will not affect any right or relief to which we are entitled at law or in equity. Upon termination of this ToS, you must terminate all use of CodeAlgo and any information or materials that have been provided to you. In the event of termination, you will not be entitled to any refund of any fees or other charges, if any, paid in connection with this ToS.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Subscriptions and Renewals"
                  body={`Some of our Services include paid, but optional, subscriptions. Where a fee is paid for a subscription, we may, in our sole discretion, change the fee to be charged for your next subscription period, provided we first notify you by email in accordance with applicable law. 

Activating and maintaining a paid subscription requires either a credit card or other acceptable or approved payment method (for example, through a third-party app store). If you purchase a subscription, you will be responsible for paying all additional applicable fees and taxes. In the event that your credit card or other third-party payment method does not reach us, you agree to pay all amounts due hereunder upon demand, and will be solely responsible for any disputes between your payment provider and us. If your credit card or payment method is denied, we reserve the right to recharge the card or payment method.

All fees are payable in accordance with the payment terms in effect when payment is due. Non-payment of fees for the subscription may prevent you from accessing paid features, as well as game assets that are exclusively obtained from a paid subscription. Unless otherwise expressly stated otherwise, any fees paid for subscriptions are non-refundable.

`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Credit Card Information"
                  body={`We do not directly store credit card information - all credit card information and transactions are handled by third-party payment providers. As a result, CodeAlgo will not be responsible or liable for any breach of security suffered by third-party payment processors.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Renewals"
                  body={`Upon purchasing a subscription, you agree that we may automatically renew your subscription at the end of your previous subscription term, unless you cancel your subscription prior to the next subscription term. Please refer to the "Refunds & Subscription Cancellation" section below for instructions on how to cancel your subscription. We will charge your credit card, or any third-party method of payment you selected, each year, month or other applicable period (depending on the payment term that you selected) for the then-current applicable price. By subscribing to paid subscriptions, you authorize us to charge your credit card or other acceptable or approved payment third-party payment methods.


`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Refunds & Subscription Cancellation"
                  body={`You will not qualify for a refund if you purchased a monthly term subscription. You qualify for a refund during the first 14 days of an annual term subscription. A refund will not be granted after 14 days of an annual term. A refund will only be granted by first requesting a refund by email to support@codealgoacademy.com prior to canceling your membership subscription, and the refund amount will be issued to the method of payment used to purchase the membership - no credits will be issued.

We offer the option of canceling your subscription and avoiding future billing online through your parent portal, via our live support team, or by email. If you purchased your subscription through a third-party app store, cancellations must be processed through that app store's settings. When you cancel your subscription prior to its renewal date, you won't be billed for another subscription period. 

You will be able to access premium features for your child’s account for the period of time that has already been prepaid for all accounts. We will not charge you any subscription fees after the expiration of your then-current subscription period if you cancel your account. You will be able to use paid subscription features throughout the remainder of your subscription period. You will also be able to continue to use features that do not require a paid subscription.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="No Advertising"
                  body={`CodeAlgo does not advertise to third-parties, nor do we use/sell any personal identifiable information collected from kids/students to third-parties or services outside of CodeAlgo’s operations. References to our paid membership options may be presented to students, parents, and teachers while they are using CodeAlgo. These references and displays are only for CodeAlgo’s services, and are delivered to all students/players in the same context and placements within CodeAlgo’s services.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Governing Law and Exclusive Forum"
                  body={`You can contact us through CodeAlgo or by email. Unless you tell us otherwise, or the law requires otherwise, you agree to receive all communications from us by email or through posting notices to your account. You agree that all communications that we send to you electronically satisfy any legal requirement that communication be in writing. Send a written notification to us by certified and registered mail to 36 E Cameron St, Box 8, Tulsa, OK 74103 if you do not want to receive legal notices electronically.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Compliance with non-US Law"
                  body={`We do not make any representation that CodeAlgo, User Content, or other material or information provided through CodeAlgo is appropriate to or available in locations outside of the United States. You may not use CodeAlgo or export User Content in violation of United States export laws, regulations, or restrictions. If you access CodeAlgo from outside of the United States, you are responsible for compliance with all applicable laws.
`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title="Miscellaneous"
                  body={`You agree that breach of the provisions of this ToS would cause irreparable harm and significant injury to us which would be both difficult to ascertain and which would not be compensable by damages alone. We have the right to enforce the provisions of this ToS by injunction (without necessity of posting bond), specific performance, or other equitable relief without prejudice to any other rights and remedies we may have for your breach of this ToS. This ToS controls the relationship between CodeAlgo and you. This ToS does not create any third party beneficiary rights. Our failure to enforce the provisions of this ToS does not constitute a waiver of our right to enforce them. If any term or provision of this ToS is held to be invalid, illegal, or unenforceable, the remaining terms and provisions of this ToS will remain in full force and effect, and the invalid, illegal, or unenforceable term or provision will not be considered to be part of this ToS. You may not assign, transfer, delegate, or sell (voluntarily or by operation of law) your rights or obligations under this ToS without our prior written consent. Any assignment without our consent will be void and will be a breach of this ToS. We may assign this ToS or delegate or subcontract our obligations under this ToS at any time. The provisions of this ToS that by their content are intended to survive the expiration or termination of this ToS, including, without limitation, provisions governing ownership and use of intellectual property, representations, disclaimers, warranties, liability, indemnification, governing law, jurisdiction, venue, remedies, rights after termination, and interpretation of this ToS, will survive the expiration or termination of this ToS for their full statutory period. If there is a conflict between this ToS and any additional policies, disclaimers, guidelines, or rules of specific application, the additional policies, disclaimers, guidelines, or rules of specific application will control.
`}
               />
            </div>

            <div className="mt-[20px]">
               <Policies
                  title="Beta Testing Disclaimer"
                  body={`
               CodeAlgo Academy is currently in a beta testing phase, which means that certain features, functionalities, and standards are still under development and may not be fully available or implemented at this time. Please be aware of the following:
               `}
               />

               {betaDisclaimers.map((disclaimer, index) => {
                  return (
                     <div key={index} className="mb-3">
                        <p className="font-bold">
                           {index + 1}. {disclaimer.title}:
                        </p>

                        <ul className="pl-2">
                           {disclaimer.body.map((text, index) => {
                              return (
                                 <li key={index} className="mb-1">
                                    •{"  "}
                                    {text}
                                 </li>
                              );
                           })}
                        </ul>
                     </div>
                  );
               })}

               <p>Participating in the beta testing phase of CodeAlgo Academy, you acknowledge the following: </p>

               <ul className="pl-2">
                  <li className="mb-1">
                     • CodeAlgo Academy is an ongoing project and is subject to further development, adjustments and enhancements.
                  </li>

                  <li className="mb-1">
                     • Certain features, disability, capabilities and security compliance standards, including but not limited to SOC II and ISO
                     10007, may not be fully implemented or functional during the beta testing phase.
                  </li>

                  <li className="mb-1">
                     • The current version of CodeAlgo Academy is intended for trial and testing purposes only and is not representative of the final
                     fully-featured application
                  </li>
               </ul>

               <p>
                  We appreciate your understanding and participation in this beta testing phase. Your feedback and insights are valuable in helping us
                  improve and refine CodeAlgo Academy to meet the standards of usability, accessibility and security. <br /> For any questions,
                  concerns or feedback, please reach out to us{" "}
                  <a href="mailto:info@codealgoacademy.com" className="hover:underline">
                     <b>info@codealgoacademy.com</b>
                  </a>
               </p>
               <p className="font-[500]">Thank you for being part of our beta community!</p>
            </div>

            <div className="mt-[20px]">
               <Policies
                  title="Changes"
                  body={`We reserve the right to change, modify, add, or remove portions of this ToS at any time without prior notice. We will notify you of any changes to this ToS by sending you a communication through CodeAlgo. Changes will become effective immediately but will not apply retroactively. If you do not agree to the ToS you should immediately discontinue your use of CodeAlgo.`}
               />
            </div>
            <div className="mt-[20px]">
               <Policies
                  title=""
                  body="These Terms of Service take effect from the moment of your acceptance and are subject to potential modifications by CodeAlgo at its discretion. It is your responsibility to routinely scrutinize these Terms of Service to remain apprised of any alterations. Your continued use of CodeAlgo subsequent to any adjustments signifies your unequivocal acceptance of the updated Terms of Service."
               />
            </div>
            <p className="mt-6">CodeAlgo is designed and operated by CodeAlgo, Inc. All inquiries may be directed to:</p>
            <p>CodeAlgo, Inc</p>
            <p>720 Main St, Kansas City, MO 64105</p>
         </div>
         <Footer />
      </section>
   );
};

export default PrivacyPolicy;
