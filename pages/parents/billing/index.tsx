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
      status: 'Paid'
    },
    {
      details: 'Basic Plan',
      date: 'Jan 2023',
      amount: '19.99',
      status: 'pending...'
    },

   ]

   const [active, setActive] = useState(1)
   return (
      <ParentLayout>
         <div className=" pt-6 px-4 overflow-y-scroll scrollbar-hide" style={{height: 'calc(100vh - 250px)'}}>
            <div className="flex gap-8 ">
               {offers.map((offer, Index) => (
                  <Link key={Index} href="/parents/billing/method"><div  key={Index} className="border bg-white pb-12 flex-1 rounded-lg rounded-tr-[30px] overflow-hidden group" onClick={() => setActive(Index)}>
                     <div className="">
                      <div className={active == Index ? "flex justify-between px-4 text-base py-8 text-white bg-[#2073FA]" : 'flex justify-between px-4 text-base py-8 text-black border-b border-[#C5C5C5] group-hover:text-white group-hover:bg-[#5695fa]'}>
                          <h4 className="ml-3 font-bold">{offer.name}</h4>
                          <p className={active == Index ? "h-5 w-5 border flex justify-center items-center rounded-full border-white" : 'h-5 w-5 border flex justify-center items-center rounded-full border-black  group-hover:border-white '}>
                              <BsCheck className=""/>
                          </p>
                      </div>
                        <div className="flex items-start justify-center mt-5">
                           <h5 className="text-[32px] font-bold h-fit">{offer.price}</h5>
                           <p className="text-sm mt-4">/Month</p>
                        </div>
                     </div>
                     <div className="mt-5 px-4">
                        {offer.perks.map((perk, Index) => (
                           <div key={Index} className="flex items-center gap-3 mt-2">
                              <p className="h-5 w-5 border flex justify-center items-center rounded-full border-black">
                                 <BsCheck />
                              </p>
                              <p>{perk.detail}</p>
                           </div>
                        ))}
                        <div className="flex justify-center mt-8">
                           <button className="bg-[#2073FA] w-[100px]   text-xs text-white px-4 py-2 rounded-[4px]">Get Started</button>
                        </div>
                     </div>
                  </div></Link>
               ))}
            </div>
            <div>
              <div className="flex justify-between items-end mt-8">
                <div onClick={() => setShowBill(!showBill)} className="flex items-center gap-3">
                  <h3 className="text-lg  font-[600]">Billing History</h3>
                  <p><BiChevronDown /></p>
                </div>
                <button className="flex bg-[#008BF8] rounded-md px-5 py-2  ml-auto items-center text-white gap-1 ">
                  <TbFileDownload  className="text-2xl"/>
                  <p className="whitespace-nowrap"> Download All</p>g
                </button>
              </div>
              {showBill && <div className="mt-4">
                <div className=" border overflow-hidden rounded-lg  ">
                  <div className="bg-[#C5C5C5] px-5 py-2 flex">
                    <p className="flex-1">Invoice</p>
                    <div className="flex flex-1">
                        <p className="flex-1">Amounts($)</p>
                        <p className="flex-1">Date</p>
                        <p className="flex-1">Status</p>
                    </div>
                  </div>
                    {History.map((data, Index) => (
                  <div  key={Index} className=" bg-white px-5 py-2 flex items-center border-t border-black">
                    <div className="flex-1 flex justify-start items-center">
                      <Checkbox />
                      <p className="text-sm">{data.details} - {data.date}</p>
                    </div>
                    <div className="flex items-center flex-1">
                        <p className="flex-1 text-sm">{data.amount}</p>
                        <p className="flex-1 text-sm">Date</p>
                        <div className="flex-1">
                          <p className=" text-[#D46600] border-[#D46600] border bg-[#FFD3AA] w-fit text-sm px-3 rounded-[20px] py-1">{data.status}</p>
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

export default Billing;
