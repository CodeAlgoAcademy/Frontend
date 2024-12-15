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
         <Image src={"/assets/home-banner.png"} width={1500} height={400} />

         <section className="mt-20 bg-mainBlack px-6 py-20">
            <div className="mx-auto max-w-[1200px]">
               <h1 className="text-center text-[1.5rem] font-bold text-white">Choose the plan that is right for you</h1>

               <div className="mt-12 flex justify-around gap-4">
                  <SinglePricing plan="Basic" amount="Free" />
                  <SinglePricing plan="Parent & Family" amount="$259/yr" />
                  <SinglePricing plan="Institution" amount="Contact us" />
               </div>
            </div>
         </section>

         <div className="mx-auto mt-12 max-w-[1200px]">
            <div className="w-full rounded-[2rem] bg-gray-300 p-20">
               <h1 className="text-center text-[1.5rem]">Institution Inquiry</h1>
               <p className="mt-2 text-center text-[1.1rem]">
                  Organization, School, and District bulk prices vary with bigger savings on larger orders.
               </p>

               <form className="mt-14 space-y-5">
                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Name</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Email</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Select a category</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Your Institution name</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Number of students</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-12">
                     <div className="min-w-[250px] max-w-fit">
                        <p>Any other details?</p>
                     </div>

                     <div className="flex-1">
                        <input
                           required
                           className="w-full rounded-md border-[1.5px] border-[#F4F4F4] bg-[#f4f4f4] p-2 outline-none focus:border-mainPink"
                        />
                     </div>
                  </div>

                  <CustomButton size="medium" variant="filled" className="mx-auto !mt-10 min-w-[250px] justify-center">
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
}

const SinglePricing: FC<SinglePricingProps> = ({ plan, amount }) => {
   return (
      <div className="flex flex-col items-center justify-center gap-2 font-bold">
         <div className="mx-auto w-[120px]">
            <Image src={"/assets/landing/logo_no_name.png"} width={120} height={40} />
         </div>

         <h2 className="mt-2 text-center text-[1.5rem] text-white">{plan}</h2>
         <h1 className="my-2 text-center text-[1.8rem] text-white">{amount}</h1>

         <CustomButton icon={<FiArrowRight />} variant="filled" className="text-white">
            Get Started
         </CustomButton>
      </div>
   );
};

export default Pricing;
