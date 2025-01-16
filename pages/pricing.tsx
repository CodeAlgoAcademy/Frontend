import Banner from "@/components/home/new-home/banner";
import Footer from "@/components/home/new-home/footer";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import React, { FC, FormEvent, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { submitInstituionInquiry } from "services/pricingService";
import { openSuccessModal } from "store/modalSlice";
import { InstitutionInquiryDto } from "types/interfaces";

const Pricing = () => {
   return (
      <div className="relative font-thabit">
         <Navbar />
         <Banner />

         <section className="mt-20 bg-mainBlack px-6 py-12">
            <div className="mx-auto max-w-[1200px]">
               <h1 className="text-center text-[1.5rem] font-bold text-white">Choose the plan that is right for you</h1>

               <div className="mt-20 mb-10 flex items-start justify-around gap-8 max-md:flex-col max-md:items-center">
                  <SinglePricing plan="Basic" amount="Free" benefits={["3 Python Units", ""]} />
                  <SinglePricing plan="Parent & Family" amount="$259/yr" benefits={["Entire Curriculum", "Internship Opportunities"]} />
                  <SinglePricing plan="Institution" amount="Contact us" benefits={["", ""]} />
               </div>
            </div>
         </section>

         <InstitutionInquiry />

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
         <ul className="my-2 max-w-fit list-disc space-y-2 text-center">
            {benefits.map((bnf, index) => {
               return bnf ? (
                  <li className="mx-auto max-w-fit text-[.9rem] text-white" key={index}>
                     {bnf}
                  </li>
               ) : (
                  <div className="invisible text-[.9rem] max-md:hidden">Placeholder</div>
               );
            })}
         </ul>

         <CustomButton icon={<FiArrowRight />} variant="filled" className="text-white">
            Get Started
         </CustomButton>
      </div>
   );
};

const InstitutionInquiry = () => {
   const dispatch = useDispatch();
   const initialValues: InstitutionInquiryDto = {
      category: "",
      email: "",
      name: "",
      institution_name: "",
      student_count: 1,
      message: "",
   };

   const [requestBody, setRequestBody] = useState<InstitutionInquiryDto>(initialValues);

   const updateRequestBody = (key: keyof InstitutionInquiryDto, value: string | number) => {
      setRequestBody((prev) => ({ ...prev, [key]: value }));
   };

   const onSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const data = await dispatch(submitInstituionInquiry(requestBody));

      if (!data.error) {
         dispatch(openSuccessModal("Insitution inquiry submitted successfully"));
         setRequestBody(initialValues);
      }
   };

   return (
      <div className="mx-auto mb-24 max-w-[1200px] md:mt-12">
         <div className="w-full bg-[#D9D9D9]/70 p-7 md:rounded-[2rem] md:p-20">
            <h1 className="text-center text-[1.5rem] font-bold">Institution Inquiry</h1>
            <p className="mt-2 text-center text-[1.1rem]">
               Organization, School, and District bulk prices vary with bigger savings on larger orders.
            </p>

            <form onSubmit={onSubmit} className="mt-14 space-y-5">
               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Name</p>
                  </div>

                  <div className="w-full flex-1">
                     <input
                        value={requestBody.name}
                        onChange={(e) => updateRequestBody("name", e.target.value)}
                        required
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Email</p>
                  </div>

                  <div className="w-full flex-1">
                     <input
                        value={requestBody.email}
                        onChange={(e) => updateRequestBody("email", e.target.value)}
                        type="email"
                        required
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Select a category</p>
                  </div>

                  <div className="w-full flex-1">
                     <input
                        value={requestBody.category}
                        onChange={(e) => updateRequestBody("category", e.target.value)}
                        required
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
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
                        value={requestBody.institution_name}
                        onChange={(e) => updateRequestBody("institution_name", e.target.value)}
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
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
                        type="number"
                        value={requestBody.student_count}
                        onChange={(e) => updateRequestBody("student_count", e.target.value)}
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
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
                        value={requestBody.message}
                        onChange={(e) => updateRequestBody("message", e.target.value)}
                        className="w-full rounded-md border-[1.5px] border-[#D9D9D9] bg-[#D9D9D9] p-2 outline-none focus:border-mainRed"
                     />
                  </div>
               </div>

               <CustomButton
                  size="medium"
                  variant="filled"
                  className="mx-auto !mt-10 justify-center !px-2 font-thabit text-[1.1rem] font-bold text-white max-md:w-full md:min-w-[250px]"
               >
                  Get a quote
               </CustomButton>
            </form>
         </div>
      </div>
   );
};

export default Pricing;
