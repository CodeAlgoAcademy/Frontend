import Banner from "@/components/home/new-home/banner";
import Footer from "@/components/home/new-home/footer";
import { PromoBanner } from "@/components/home/new-home/winter-banner";
import Navbar from "@/components/navbar/home/Navbar";
import { CustomButton } from "@/components/UI/Button";
import { MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getPricingPlans, submitInstituionInquiry } from "services/pricingService";
import { toast } from "sonner";
import { openSuccessModal } from "store/modalSlice";
import { RootState } from "store/store";
import { InstitutionInquiryDto, IPlan } from "types/interfaces";

const Pricing = () => {
   const { handlers: pricingHandlers, plans } = useSelector((state: RootState) => state.pricing);
   const dispatch = useDispatch();

   const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

   useEffect(() => {
      dispatch(getPricingPlans());
   }, []);

   return (
      <div className="relative font-thabit bg-[#F5FAFF]">
         <Navbar />
         <Banner />
         <section className="mt-20 px-6 py-16">
            <div className="mx-auto max-w-[1200px]">
               <h1 className="text-center text-[1.8rem] font-bold text-[#0B2C4A]">
                  Choose the plan that is right for you
               </h1>

               {/* Billing toggle */}
               <div className="mt-8 flex justify-center  border-mainRed">
                  <div className="flex rounded-full bg-[#E6F1FF] p-3">
                     <button
                        onClick={() => setBillingCycle("yearly")}
                        className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                           billingCycle === "yearly"
                              ? "bg-white text-[#0B2C4A] shadow"
                              : "text-[#4B6B88]"
                        }`}
                     >
                        Yearly
                     </button>

                     <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                           billingCycle === "monthly"
                              ? "bg-white text-[#0B2C4A] shadow"
                              : "text-[#4B6B88]"
                        }`}
                     >
                        Monthly
                     </button>
                  </div>
               </div>

               <div className="mt-16 flex justify-center gap-8 max-md:flex-col max-md:items-center">
                  {pricingHandlers.loading ? (
                     <PricingShimmer />
                  ) : plans.length === 0 ? (
                     <p className="text-[1.2rem] text-gray-500">No Plan</p>
                  ) : (
                     plans.map((plan, index) => (
                        <SinglePricing
                           key={index}
                           plan={plan}
                           billingCycle={billingCycle}
                        />
                     ))
                  )}
               </div>
            </div>
         </section>

         <InstitutionInquiry />
         <Footer />
      </div>
   );
};


const PricingShimmer = () => {
   return (
      <>
         {[null, null, null].map((_, index) => {
            return (
               <div key={index} className="flex-1">
                  <div className="mb-3 h-[200px] animate-pulse rounded-md bg-gray-200"></div>
                  <div className="mb-3 h-[50px] animate-pulse rounded-md bg-gray-200"></div>
               </div>
            );
         })}
      </>
   );
};

interface SinglePricingProps {
   plan: IPlan;
   billingCycle: "monthly" | "yearly";
}

const SinglePricing: FC<SinglePricingProps> = ({ plan, billingCycle }) => {
   const { push } = useRouter();

   const monthlyPrice = plan.amount_in_cent / 100;
   const yearlyTotal = monthlyPrice * 12 * 0.8;
   const yearlyMonthlyEquivalent = yearlyTotal / 12;

   const isYearly = billingCycle === "yearly";

   return (
      <div className="w-full max-w-[800px] rounded-2xl border border-mainRed bg-white p-10 text-center shadow-sm">
         <h2 className="text-[1.5rem] font-bold text-[#0B2C4A]">
            {plan.name}
         </h2>

         {/* Price */}
         <div className="mt-6">
            {isYearly ? (
               <>
                  <h1 className="text-[2.5rem] font-bold text-[#8B1E1E]">
                     ${yearlyMonthlyEquivalent.toFixed(2)}
                     <span className="text-base font-medium text-[#4B6B88]">/mo</span>
                  </h1>

                  <p className="mt-2 text-sm text-gray-400 line-through">
                     ${(monthlyPrice).toFixed(2)}/mo
                  </p>

                  <p className="mt-2 text-sm font-semibold text-pink-600">
                     Best value!
                  </p>
               </>
            ) : (
               <h1 className="text-[2.5rem] font-bold text-[#0B2C4A]">
                  ${monthlyPrice.toFixed(2)}
                  <span className="text-base font-medium text-[#4B6B88]">/mo</span>
               </h1>
            )}
         </div>

         {/* Description */}
         <ul className="my-6 space-y-2 text-sm text-[#4B6B88]">
            {plan.description}
         </ul>

         <CustomButton
            onClick={() => {
               toast.success("Login to your dashboard to complete payment");
               push(`/login/parent`);
            }}
            variant="filled"
            className="mx-auto text-2xl mt-6 w-full max-w-[400px] justify-center text-white"
         >
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
      student_count: 0,
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
         dispatch(openSuccessModal({ message: "Institution inquiry submitted successfully" }));
         setRequestBody(initialValues);
      }
   };

   return (
      <div className="mx-auto mb-24 max-w-[1200px] md:mt-12">
         <div className="w-full bg-gray-50 p-7 md:rounded-[2rem] md:p-20">
            <h1 className="text-center text-[1.5rem] font-bold">Institution Inquiry</h1>
            <p className="mt-2 text-center text-[1.1rem] text-gray-600">
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
                        className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-mainRed focus:ring-1 focus:ring-mainRed"
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
                        className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-mainRed focus:ring-1 focus:ring-mainRed"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Select a category</p>
                  </div>

                  <div className="w-full flex-1">
                     <Select
                        value={requestBody.category || "unselected"}
                        fullWidth
                        sx={{
                           borderRadius: ".375rem",
                           border: "1px solid #d1d5db",
                           backgroundColor: "white",
                           height: 45,
                           outline: "none",
                           "& *": {
                              outline: "none",
                              border: "none !important",
                           },
                           "&:focus": {
                              borderColor: "#FF0D11",
                              boxShadow: "0 0 0 1px #FF0D11",
                           },
                        }}
                        MenuProps={{
                           PaperProps: {
                              sx: {
                                 "& .MuiMenuItem-root": {
                                    "&:hover": {
                                       backgroundColor: "#FF575A",
                                       color: "#FFFFFF",
                                    },
                                    "&.Mui-selected": {
                                       backgroundColor: "#FF0D11",
                                       color: "#FFFFFF",
                                       "&:hover": {
                                          backgroundColor: "#FF575A",
                                       },
                                    },
                                 },
                              },
                           },
                        }}
                        onChange={(e) => updateRequestBody("category", e.target.value)}
                     >
                        <MenuItem value={"unselected"}>Please select a category</MenuItem>
                        <MenuItem value={"organization"}>Organization</MenuItem>
                        <MenuItem value={"school"}>School</MenuItem>
                        <MenuItem value={"district"}>District</MenuItem>
                     </Select>
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
                        className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-mainRed focus:ring-1 focus:ring-mainRed"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Number of classrooms</p>
                  </div>

                  <div className="w-full flex-1">
                     <input
                        required
                        type="number"
                        value={requestBody.student_count}
                        onChange={(e) => updateRequestBody("student_count", e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-mainRed focus:ring-1 focus:ring-mainRed"
                     />
                  </div>
               </div>

               <div className="flex items-center gap-12 max-md:flex-col max-md:items-start max-md:gap-3">
                  <div className="max-w-fit font-bold md:min-w-[250px]">
                     <p>Any other details?</p>
                  </div>

                  <div className="w-full flex-1">
                     <textarea
                        required
                        value={requestBody.message}
                        onChange={(e) => updateRequestBody("message", e.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:border-mainRed focus:ring-1 focus:ring-mainRed"
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