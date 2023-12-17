import ParentLayout from "@/components/layouts/ParentLayout";
import { AiOutlineMail } from "react-icons/ai";
import { ImArrowUpRight2 } from "react-icons/im";
import { BsFillCircleFill } from "react-icons/bs";
import Image from "next/image";
import { TbFileDownload } from "react-icons/tb";
import { BiChevronDown } from "react-icons/bi";
import { Checkbox } from "@mui/material";
import { useState } from "react";

const BillHistory = () => {
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
         dateFull: "06.02.2023",
      },
      {
         details: "Basic Plan",
         date: "Jan 2023",
         amount: "19.99",
         status: "pending...",
         dateFull: "06.02.2023",
      },
      {
         details: "Basic Plan",
         date: "Jan 2023",
         amount: "19.99",
         status: "pending...",
         dateFull: "06.02.2023",
      },
      {
         details: "Basic Plan",
         date: "Jan 2023",
         amount: "19.99",
         status: "pending...",
         dateFull: "06.02.2023",
      },
   ];

   return (
      <ParentLayout title="Bill History">
         <div className=" scrollbar-hide overflow-y-scroll bg-white px-6 pt-6 pb-10">
            <div className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">
               <h2 className="text-lg">Billing History</h2>
            </div>
            <div className="mt-6 flex justify-between gap-10">
               <div className="box-border flex-1 rounded-lg border border-[#C5C5C5] py-3 pb-8">
                  <div className=" flex flex-1 items-center justify-between px-6">
                     <div className="flex  gap-4 py-4">
                        <p className="font-sm font-[600]">Most Popular</p>
                        <p className="flex w-fit items-center gap-2 rounded-xl border border-[#111111] px-2 py-[2px] text-xs ">
                           <span className="text-[6px] text-green-600">
                              <BsFillCircleFill />
                           </span>{" "}
                           Active
                        </p>
                     </div>
                     <div>
                        <p className="flex gap-1 text-2xl font-bold ">
                           19.99 <span className="mt-[5px] text-xs font-[600]">per month</span>
                        </p>
                     </div>
                  </div>
                  <p className="mt-4 border-b border-[#C5C5C5] px-6 pb-3 text-base">Upgrade to Enterprise and get all unlimited offers.</p>
                  <div className="mt-6 mr-8 ml-auto flex w-fit items-center gap-2 rounded-md border border-[#C5C5C5] px-6 py-3">
                     <p className="text-sm font-bold">Upgrade plan</p>
                     <ImArrowUpRight2 className="text-sm" />
                  </div>
               </div>

               <div className="box-border flex-1 rounded-lg border border-[#C5C5C5] py-3 px-6 pb-8">
                  <p className="font-sm mt-4 font-[600]">Payment method</p>
                  <p className="mt-2 text-xs font-bold">Change how you pay for your plan.</p>
                  <div className="mt-8 flex items-center justify-around gap-3 rounded-lg border border-[#C5C5C5] px-2 py-3">
                     <div className="flex flex-col items-center  justify-center">
                        <Image height={42} width={80} src="/assets/master.png" alt="master" />
                        <p className="text-sm font-bold">mastercard</p>
                     </div>
                     <div className="text-xs leading-6 text-[#676765]">
                        <p>Card ending in 1234</p>
                        <p>Expiry 06/2024</p>
                        <p className="flex items-center">
                           <span>
                              <AiOutlineMail />
                           </span>{" "}
                           peterobi@gmail.com
                        </p>
                     </div>
                     <div>
                        <p className="flex w-fit items-center gap-2 rounded-xl border border-[#111111] px-2 py-[2px]  text-[8px] ">Default</p>
                        <button className="mt-4 rounded-[4px] bg-mainColor px-4 py-1 text-[10px] text-white">Edit</button>
                     </div>
                  </div>
               </div>
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
                  <div className="text-525251 mt-4">
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
                           <div key={Index} className="flex items-center border-t border-[#525251] bg-white px-5 py-2">
                              <div className="flex flex-1 items-center justify-start">
                                 <Checkbox />
                                 <p className="text-sm">
                                    {data.details} - {data.date}
                                 </p>
                              </div>
                              <div className="flex flex-1 items-center">
                                 <p className="flex-1 text-sm">{data.amount}</p>
                                 <p className="flex-1 text-sm">{data.dateFull}</p>
                                 <div className="flex flex-1 items-center justify-between">
                                    <p className=" w-fit rounded-[20px] border border-[#D46600] bg-[#FFD3AA] px-3 py-1 text-sm text-[#D46600]">
                                       {data.status}
                                    </p>
                                    <TbFileDownload className="text-xl" />
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

export default BillHistory;
