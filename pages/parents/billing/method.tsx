import ParentLayout from "@/components/layouts/ParentLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsCheck, BsChevronRight } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";

const Method = () => {
   const router = useRouter();

   const { plan_id } = router.query;

   return (
      <ParentLayout title="Payment">
         <div className=" scrollbar-hide hover:bg- h-fit overflow-y-scroll bg-white px-8 py-6">
            <h4 className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">Select a Convenient Payment Method</h4>
            <div className="mt-10 flex flex-wrap items-center gap-4">
               <Link href={`/parents/billing/payment?plan_id=${plan_id}`}>
                  <div className="flex h-[145px] w-[169px] cursor-pointer flex-col items-center justify-center gap-6  rounded-md border  border-[#C5C5C5] text-black hover:bg-mainColor hover:text-white">
                     <Image height={42} width={80} src="/assets/Master.png" alt="master" />
                     <p>Credit Card</p>
                  </div>
               </Link>
               {/* <Link href={"/parents/billing/paypal-detail"}>
                  <div className="flex h-[145px] w-[169px] flex-col items-center justify-center gap-6 rounded-md  border border-[#C5C5C5] text-black hover:bg-mainColor hover:text-white">
                     <Image height={42} width={80} src="/assets/Paypal.png" alt="master" />
                     <p>Paypal</p>
                  </div>
               </Link>
               <Link href="/parents/billing/googlepay-detail">
                  <div className="flex h-[145px] w-[169px] flex-col items-center justify-center gap-6 rounded-md border border-[#C5C5C5]  text-black hover:bg-mainColor hover:text-white">
                     <Image height={42} width={80} src="/assets/Googlep.png" alt="master" />
                     <p>Google Pay</p>
                  </div>
               </Link> */}
            </div>
            <p className="mt-4 text-xs">*Please note: Taxes will be charged according to your location</p>
            {/* <div className="mt-10">
               <div className="mt-4 flex w-[495px] items-center justify-between rounded-md border border-[#C5C5C5] px-4 pt-4 pb-6">
                  <div>
                     <h3 className="text-sm">PARENTAL CONTROLS</h3>
                     <p className="mt-2 text-xs">Set a time limit, and purchases of any kind using a code </p>
                  </div>
                  <div>
                     <BsChevronRight className="text-xl" />
                  </div>
               </div>
               <div className="mt-4 flex w-[495px] items-center justify-between rounded-md border border-[#C5C5C5] px-4 pt-4 pb-6">
                  <div>
                     <h3 className="text-sm">CONTACT INFORMATION</h3>
                     <p className="mt-2 text-xs">
                        For any questions, information or complaints please get in touch <br /> with our developer for more details.{" "}
                     </p>
                  </div>
                  <div>
                     <BsChevronRight className="text-xl" />
                  </div>
               </div>
            </div> */}
         </div>
      </ParentLayout>
   );
};

export default Method;
