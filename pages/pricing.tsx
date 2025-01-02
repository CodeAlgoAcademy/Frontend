import Banner from "@/components/home/new-home/banner";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import React, { FC } from "react";
import { FiArrowRight } from "react-icons/fi";

const Pricing = () => {
   return (
      <div className="relative overflow-x-hidden font-thabit">
         <Navbar />
         <Banner />

         <section className="mt-20 bg-mainBlack px-6 py-20">
            <div className="mx-auto max-w-[1200px]">
               <h1 className="text-center text-[1.5rem] font-bold text-white">Choose the plan that is right for you</h1>

               <div className="mt-12 flex justify-around gap-8 max-md:flex-col">
                  <SinglePricing plan="Basic" amount="Free" benefits={["3 Python Units"]} />
                  <SinglePricing plan="Parent & Family" amount="$259/yr" benefits={["Entire Curriculum", "Internship Opportunities"]} />
                  <SinglePricing plan="Institution" amount="Contact us" />
               </div>
            </div>
         </section>

         <div className="mx-auto mt-12 mb-12 max-w-[1200px]">
            <div className="w-full bg-[#D9D9D9]/50 p-7 md:rounded-[2rem] md:p-20">
               <h1 className="text-center text-[1.5rem] font-bold">Institution Inquiry</h1>
               <p className="mt-2 text-center text-[1.1rem]">
                  Organization, School, and District bulk prices vary with bigger savings on larger orders.
               </p>

               <form className="mt-14 space-y-5">
                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Name</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Email</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Select a category</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Your Institution name</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Number of students</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                     <div className="max-w-fit font-bold md:min-w-[250px]">
                        <p>Any other details?</p>
                     </div>

                     <div className="w-full flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <CustomButton
                     size="medium"
                     variant="filled"
                     className="mx-auto !mt-10 justify-center font-thabit text-[1.1rem] max-md:w-full md:min-w-[250px]"
                  >
                     Get a quote
                  </CustomButton>
               </form>
            </div>
         </div>

         <Footer />
      </div>
   );
};

interface SinglePricingProps {
   plan: string;
   amount: string;
   benefits?: string[];
}

const SinglePricing: FC<SinglePricingProps> = ({ plan, amount, benefits = [] }) => {
   return (
      <div className="flex flex-col items-center justify-center gap-2 font-bold">
         <div className="mx-auto w-[100px] max-md:max-w-fit">
            <Image src={"/assets/landing/logo_no_name.png"} width={100} height={40} />
         </div>

         <h2 className="mt-1 text-center text-[1.5rem] text-white max-md:text-[1.1rem] max-md:leading-[1]">{plan}</h2>
         <h1 className="my-1 text-center text-[1.8rem] text-white max-md:text-[1.1rem] max-md:leading-[1]">{amount}</h1>
         <ul className="my-2 max-w-fit list-disc text-center">
            {benefits.map((bnf, index) => {
               return (
                  <li className="mx-auto max-w-fit text-[.9rem] text-white" key={index}>
                     {bnf}
                  </li>
               );
            })}
         </ul>

         <CustomButton icon={<FiArrowRight />} variant="filled" className="text-white">
            Get Started
         </CustomButton>
      </div>
   );
};

export default Pricing;
