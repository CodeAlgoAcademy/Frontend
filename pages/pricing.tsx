import Banner from "@/components/home/new-home/banner";
import Footer from "@/components/home/new-home/footer";
import { PromoBanner } from "@/components/home/new-home/winter-banner";
import Navbar from "@/components/navbar/home/Navbar";
import PlanCard from "@/components/parents/billing/priceCard";
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
   const { push } = useRouter();

   const [selectedPriceId, setSelectedPriceId] = useState<number | null>(null);

   useEffect(() => {
      dispatch(getPricingPlans());
   }, []);

   const handleGetStarted = () => {
      toast.success("Login to your dashboard to complete payment");
      push(`/login/parent`);
   };

   return (
      <div className="relative font-thabit bg-[#F5FAFF]">
         <Navbar />
         <Banner />
         <section className="mt-20 px-6 py-16">
            <div className="mx-auto max-w-[1200px]">
               <h1 className="text-center text-[1.8rem] font-bold text-[#0B2C4A]">
                  Choose the plan that is right for you
               </h1>

               {pricingHandlers.loading ? (
                  <div className="mt-16">
                     <PricingShimmer />
                  </div>
               ) : plans.length === 0 ? (
                  <p className="mt-16 text-center text-[1.2rem] text-gray-500">No Plan</p>
               ) : (
                  <div className="mt-16">
                     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-[900px] mx-auto">
  {plans.map((plan) => {
    const monthlyPrice = plan.prices?.find(p => p.interval === "MONTH");
    const yearlyPrice = plan.prices?.find(p => p.interval === "YEAR");

    return (
      <React.Fragment key={plan.id}>
         
         {yearlyPrice && monthlyPrice && (
          <PlanCard
            key={yearlyPrice.id}
            title={`${plan.name} Annual Plan`}
            price={17.3}
            originalPrice={(monthlyPrice.amount_in_cent / 100)}
            interval="mo"
            trialText="7-Day Free Trial"
            billingText={`$ ${yearlyPrice.amount_in_cent / 100} Billed yearly`}
            badge="Save 20%"
            showButton={true}
            buttonText="Try For Free"
            onSelect={() => {
              setSelectedPriceId(yearlyPrice.id);
              handleGetStarted();
            }}
          />
        )}

        {/* MONTHLY */}
        {monthlyPrice && (
          <PlanCard
            key={monthlyPrice.id}
            title={`${plan.name} Monthly Plan`}
            price={monthlyPrice.amount_in_cent / 100}
            interval="mo"
            trialText="7-Day Free Trial"
            billingText={`$${(monthlyPrice.amount_in_cent / 100)} Billed monthly`}
            showButton={true}
            buttonText="Try For Free"
            onSelect={() => {
              setSelectedPriceId(monthlyPrice.id);
              handleGetStarted();
            }}
          />
        )}
        
      </React.Fragment>
    );
  })}
</div>
                  </div>
               )}
            </div>
         </section>

         <InstitutionInquiry />
         <Footer />
      </div>
   );
};

const PricingShimmer = () => {
   return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-[900px] mx-auto">
         {[null, null, null, null].map((_, index) => (
            <div key={index} className="h-[280px] animate-pulse rounded-2xl bg-gray-200"></div>
         ))}
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