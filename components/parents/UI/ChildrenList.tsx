import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentChild } from "store/parentChildSlice";
import { RootState } from "store/store";

interface Props {
   close(): void;
   open(): void;
   isOpen: boolean;
}

export default function ChildrenList({ close, open, isOpen }: Props) {
   const parent = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();

   if (parent.children?.length === 0) {
      return <></>;
   }

   return (
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
         <div className="relative">
            <header className="flex cursor-pointer items-center gap-2" onClick={() => (isOpen ? close() : open())}>
               <h2 className="text-lg font-medium text-mainColor">{parent?.currentChild?.username}</h2>
               <BsChevronDown size={24} color="#2073fa" />
            </header>
            {isOpen && (
               <div className="absolute top-[100%] left-0 z-[4] max-h-[200px] min-h-[200px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-md bg-white shadow-md">
                  {parent?.children?.map((child, index) => {
                     return (
                        <p
                           key={index}
                           onClick={() => {
                              dispatch(changeCurrentChild(child));
                              close();
                           }}
                           className="w-full cursor-pointer px-3 py-3 capitalize text-black hover:bg-[#ced4e9]"
                           data-testid="child"
                        >
                           {child.fullName}
                        </p>
                     );
                  })}
               </div>
            )}
         </div>

         {parent?.currentChild && (
            <a href={"https://play.codeamdoacademy.com"} target="_blank">
               <button className="min-w-fit rounded-md border-none bg-mainColor px-[.8rem] py-[5px] text-white outline-none">Log in to game</button>
            </a>
         )}
      </div>
   );
}
