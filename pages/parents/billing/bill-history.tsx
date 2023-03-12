import ParentLayout from "@/components/parents/ParentLayout";
import { AiOutlineMail } from "react-icons/ai";
import { ImArrowUpRight2 } from "react-icons/im";
import { BsFillCircleFill } from "react-icons/bs";
import Image from "next/image";
import { TbFileDownload } from "react-icons/tb";
import { BiChevronDown } from "react-icons/bi";
import { Checkbox } from "@mui/material";
import { useState } from "react";

const BillHistory = () => {
   const [showBill, setShowBill] = useState(false)

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
      details: 'Basic Plan',
      date: 'Feb 2023',
      amount: '19.99',
      status: 'Paid', 
      dateFull: '06.02.2023'
    },
    {
      details: 'Basic Plan',
      date: 'Jan 2023',
      amount: '19.99',
      status: 'pending...',
      dateFull: '06.02.2023'
    },
    {
      details: 'Basic Plan',
      date: 'Jan 2023',
      amount: '19.99',
      status: 'pending...',
      dateFull: '06.02.2023'
    },
    {
      details: 'Basic Plan',
      date: 'Jan 2023',
      amount: '19.99',
      status: 'pending...',
      dateFull: '06.02.2023'
    },

   ]

   return (
      <ParentLayout>
         <div className=" pt-6 pb-10 px-6 overflow-y-scroll scrollbar-hide bg-white" style={{ height: "calc(100vh - 250px)" }}>
            <div className="border-b text-lg pb-2 font-[600] border-[#C5C5C5]">
               <h2 className="text-lg">Billing History</h2>
            </div>
            <div className="flex justify-between mt-6 gap-10">
               <div className="flex-1 border border-[#C5C5C5] rounded-lg pb-8 py-3 box-border">
                  <div className=" flex items-center justify-between flex-1 px-6">
                     <div className="py-4  flex gap-4">
                        <p className="font-sm font-[600]">Most Popular</p>
                        <p className="text-xs flex items-center px-2 py-[2px] gap-2 border w-fit rounded-xl border-[#111111] ">
                           <span className="text-green-600 text-[6px]">
                              <BsFillCircleFill />
                           </span>{" "}
                           Active
                        </p>
                     </div>
                     <div>
                        <p className="flex font-bold gap-1 text-2xl ">
                           19.99 <span className="text-xs mt-[5px] font-[600]">per month</span>
                        </p>
                     </div>
                  </div>
                  <p className="text-base border-b px-6 mt-4 pb-3 border-[#C5C5C5]">Upgrade to Enterprise and get all unlimited offers.</p>
                  <div className="flex gap-2 items-center px-6 py-3 border border-[#C5C5C5] rounded-md w-fit mt-6 mr-8 ml-auto">
                     <p className="font-bold text-sm">Upgrade plan</p>
                     <ImArrowUpRight2 className="text-sm" />
                  </div>
               </div>

               <div className="flex-1 border border-[#C5C5C5] rounded-lg pb-8 py-3 px-6 box-border">
                  <p className="font-sm font-[600] mt-4">Payment method</p>
                  <p className="text-xs mt-2 font-bold">Change how you pay for your plan.</p>
                  <div className="flex gap-3 justify-around items-center border px-2 py-3 rounded-lg border-[#C5C5C5] mt-8">
                     <div className="flex items-center flex-col  justify-center">
                        <Image height={42} width={80} src="/assets/master.png" alt="master" />
                        <p className="font-bold text-sm">mastercard</p>
                     </div>
                     <div className="leading-6 text-xs text-[#676765]">
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
                        <p className="text-[8px] flex items-center px-2 py-[2px] gap-2 border w-fit rounded-xl  border-[#111111] ">
                           Default
                        </p>
                        <button className="bg-[#2073FA] mt-4 text-[10px] text-white px-4 py-1 rounded-[4px]">Edit</button>
                     </div>
                  </div>
               </div>
            </div>
            <div>
              <div className="flex justify-between items-end mt-8">
                <div onClick={() => setShowBill(!showBill)} className="flex items-center gap-3">
                  <h3 className="text-lg  font-[600]">Billing History</h3>
                  <p><BiChevronDown /></p>
                </div>
                <button className="flex bg-[#008BF8] rounded-md px-5 py-2  ml-auto items-center text-white gap-1 ">
                  <TbFileDownload  className="text-2xl"/>
                  <p className="whitespace-nowrap"> Download All</p>
                </button>
              </div>
              {showBill && <div className="mt-4 text-525251">
                <div className=" border overflow-hidden rounded-lg  ">
                  <div className="bg-[#C5C5C5] px-5 py-2 flex">
                    <p className="flex-1">Invoice</p>
                    <div className="flex flex-1">
                        <p className="flex-1">Amounts($)</p>
                        <p className="flex-1">Date</p>
                        <p className="flex-1">Status</p>
                    </div>
                  </div>
                    {History.map((data) => (
                  <div className="bg-white px-5 py-2 flex items-center border-t border-[#525251]">
                    <div className="flex-1 flex justify-start items-center">
                      <Checkbox />
                      <p className="text-sm">{data.details} - {data.date}</p>
                    </div>
                    <div className="flex items-center flex-1">
                        <p className="flex-1 text-sm">{data.amount}</p>
                        <p className="flex-1 text-sm">{data.dateFull}</p>
                        <div className="flex-1 flex items-center justify-between">
                          <p className=" text-[#D46600] border-[#D46600] border bg-[#FFD3AA] w-fit text-sm px-3 rounded-[20px] py-1">{data.status}</p>
                          <TbFileDownload  className="text-xl"/>
                        </div>
                    </div>
                  </div>
                    ))}
                </div>
              </div>}
            </div>
         </div>
      </ParentLayout>
   );
};

export default BillHistory;
