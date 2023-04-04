import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { openAddChildModal } from "store/modalSlice";
import ParentLayout from "./ParentLayout";

const NoChild = () => {
   const dispatch = useDispatch();
   return (
      <ParentLayout>
         <div className="relative bottom-14 mb-[-120px] h-[500px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className="flex h-[300px] w-full flex-col items-center justify-center gap-4">
               <h2 className="text-[1.3rem] leading-[1.1] text-gray-900">You do not have a child!</h2>
               <button
                  className="p-2 text-[1rem] text-[#2073fa] hover:bg-blue-100"
                  onClick={() => {
                     dispatch(openAddChildModal());
                  }}
               >
                  <span className="mr-2 inline-block align-middle">
                     <BiPlusCircle />
                  </span>
                  Add Child
               </button>
            </div>
         </div>
      </ParentLayout>
   );
};

export default NoChild;
