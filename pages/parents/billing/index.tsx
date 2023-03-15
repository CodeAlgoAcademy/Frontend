import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import { Checkbox } from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";
import Link from "next/link";

const Billing = () => {
   const [showBill, setShowBill] = useState(false);

   const offers = [
      {
         name: "Free",
         price: "$0",
         perks: [
            {
               detail: "Access to all basic features",
               check: true,
            },
            {
               detail: "Basic chat and email support",
               check: true,
            },
            {
               detail: "Ability to run multiple accounts",
               check: true,
            },
            {
               detail: "One month free per year",
               check: false,
            },
            {
               detail: "One hour weekly mentorship",
               check: false,
            },
         ],
      },
      {
         name: "MOST POPULAR",
         price: "$19.99",
         perks: [
            {
               detail: "Access to all basic features",
               check: true,
            },
            {
               detail: "Basic chat and email support",
               check: true,
            },
            {
               detail: "Ability to run multiple accounts",
               check: true,
            },
            {
               detail: "One month free per year",
               check: true,
            },
            {
               detail: "One hour weekly mentorship",
               check: false,
            },
         ],
      },
      {
         name: "Premium",
         price: "$29.99",
         perks: [
            {
               detail: "Access to all basic features",
               check: true,
            },
            {
               detail: "Basic chat and email support",
               check: true,
            },
            {
               detail: "Ability to run multiple accounts",
               check: true,
            },
            {
               detail: "One month free per year",
               check: true,
            },
            {
               detail: "One hour weekly mentorship",
               check: true,
            },
         ],
      },
   ];

   const History = [
      {
         details: "Basic Plan",
         date: "Feb 2023",
         amount: "19.99",
         status: "Paid",
      },
      {
         details: "Basic Plan",
         date: "Jan 2023",
         amount: "19.99",
         status: "pending...",
      },
   ];

   const [active, setActive] = useState(1);
   return (
      <ParentLayout>
         <div className=" scrollbar-hide overflow-y-scroll px-4 py-6">
            <div className="flex flex-wrap gap-6">
               {offers.map((offer, Index) => (
                  <Link key={Index} href="/parents/billing/method">
                     <div
                        key={Index}
                        className="group min-w-fit flex-1 overflow-hidden rounded-lg rounded-tr-[30px] border bg-white pb-12 lg:w-fit lg:min-w-[30%]"
                        onClick={() => setActive(Index)}
                     >
                        <div className="">
                           <div
                              className={
                                 active == Index
                                    ? "flex justify-between bg-[#2073FA] px-4 py-8 text-base text-white"
                                    : "flex justify-between border-b border-[#C5C5C5] px-4 py-8 text-base text-black group-hover:bg-[#5695fa] group-hover:text-white"
                              }
                           >
                              <h4 className="ml-3 font-bold">{offer.name}</h4>
                              <p
                                 className={
                                    active == Index
                                       ? "flex h-5 w-5 items-center justify-center rounded-full border border-white"
                                       : "flex h-5 w-5 items-center justify-center rounded-full border border-black  group-hover:border-white "
                                 }
                              >
                                 <BsCheck className="" />
                              </p>
                           </div>
                           <div className="mt-5 flex items-start justify-center">
                              <h5 className="h-fit text-[32px] font-bold">{offer.price}</h5>
                              <p className="mt-4 text-sm">/Month</p>
                           </div>
                        </div>
                        <div className="mt-5 px-4">
                           {offer.perks.map((perk, Index) => (
                              <div key={Index} className="mt-2 flex items-center gap-3">
                                 <p className="flex h-5 w-5 items-center justify-center rounded-full border border-black">
                                    <BsCheck />
                                 </p>
                                 <p>{perk.detail}</p>
                              </div>
                           ))}
                           <div className="mt-8 flex justify-center">
                              <button className="w-[100px] rounded-[4px]   bg-[#2073FA] px-4 py-2 text-xs text-white">Get Started</button>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
            <div>
               <div className="mt-8 flex items-end justify-between">
                  <div onClick={() => setShowBill(!showBill)} className="flex items-center gap-3">
                     <h3 className="text-lg  font-[600]">Billing History</h3>
                     <p>
                        <BiChevronDown />
                     </p>
                  </div>
                  <button className="ml-auto flex items-center gap-1 rounded-md  bg-[#008BF8] px-5 py-2 text-white ">
                     <TbFileDownload className="text-2xl" />
                     <p className="whitespace-nowrap"> Download All</p>
                  </button>
               </div>
               {showBill && (
                  <div className="mt-4">
                     <div className=" overflow-hidden rounded-lg border  ">
                        <div className="flex bg-[#C5C5C5] px-5 py-2">
                           <p className="flex-1">Invoice</p>
                           <div className="flex flex-1">
                              <p className="flex-1">Amounts($)</p>
                              <p className="flex-1">Date</p>
                              <p className="flex-1">Status</p>
                           </div>
                        </div>
                        {History.map((data, Index) => (
                           <div key={Index} className=" flex items-center border-t border-black bg-white px-5 py-2">
                              <div className="flex flex-1 items-center justify-start">
                                 <Checkbox />
                                 <p className="text-sm">
                                    {data.details} - {data.date}
                                 </p>
                              </div>
                              <div className="flex flex-1 items-center">
                                 <p className="flex-1 text-sm">{data.amount}</p>
                                 <p className="flex-1 text-sm">Date</p>
                                 <div className="flex-1">
                                    <p className=" w-fit rounded-[20px] border border-[#D46600] bg-[#FFD3AA] px-3 py-1 text-sm text-[#D46600]">
                                       {data.status}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </ParentLayout>
   );
};

export default Billing;
