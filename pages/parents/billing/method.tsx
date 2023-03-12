import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import { Checkbox } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { BsCheck, BsChevronRight } from "react-icons/bs";
import { TbFileDownload } from "react-icons/tb";

const Method = () => {
   const [active, setActive] = useState(1);
   return (
      <ParentLayout>
         <div className=" pt-6 px-8 overflow-y-scroll scrollbar-hide bg-white" style={{ height: "calc(100vh - 250px)" }}>
            <h4 className="border-b text-lg pb-2 font-[600] border-[#C5C5C5]">Select a Convenient Payment Method</h4>
            <div className="mt-10 flex gap-4">
               <div className="w-[169px] h-[145px] border-[#C5C5C5] border rounded-md flex gap-6 flex-col items-center justify-center">
                  <Image height={42} width={80} src="/assets/master.png" alt="master" />
                  <p>Credit Card</p>
               </div>
               <div className="w-[169px] h-[145px] border-[#C5C5C5] border rounded-md flex gap-6 flex-col items-center justify-center">
                  <Image height={42} width={80} src="/assets/paypal.png" alt="master" />
                  <p>Paypal</p>
               </div>
               <div className="w-[169px] h-[145px] border-[#C5C5C5] border rounded-md flex gap-6 flex-col items-center justify-center">
                  <Image height={42} width={80} src="/assets/googlep.png" alt="master" />
                  <p>Google Pay</p>
               </div>
            </div>
            <p className="text-xs mt-4">*Please note: Taxes will be charged according to your location</p>
            <div className="mt-20">
                <div className="border border-[#C5C5C5] w-[495px] px-4 pt-4 pb-6 rounded-md mt-4 flex justify-between items-center">
                <div>
                    <h3 className="text-sm">PARENTAL CONTROLS</h3>
                    <p className="mt-2 text-xs">Set a time limit, and purchases of any kind using a code </p>
                </div>
                <div>
                    <BsChevronRight className="text-xl" />
                </div>
                </div>
                <div className="border border-[#C5C5C5] w-[495px] px-4 pt-4 pb-6 rounded-md mt-4 flex items-center justify-between">
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
            </div>
         </div>
      </ParentLayout>
   );
};

export default Method;
