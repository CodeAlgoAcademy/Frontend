import React, { useState, useRef, ChangeEvent, useEffect } from "react";

import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentClass } from "../../../store/currentClassSlice";
import { IClass, CurrentClassState, IUser } from "../../../types/interfaces";
import { IoChevronDown, IoSettingsSharp } from "react-icons/io5";
import { resetAuthUser, updateUser } from "store/authSlice";
import { updateEmail, updateFirstname, updateLastname } from "services/authService";
import { getAllClasses } from "services/classesService";
import { useRouter } from "next/router";

export default function ClassSelector() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const dispatch = useDispatch();
   const router = useRouter();
   const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes);
   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);

   const classDetails = classes?.map((item: CurrentClassState) => {
      const { className, color, id } = item;
      return { className, color, id };
   });
   const otherClassDetails = classDetails?.filter((item) => item.className !== currentClass.className);

   const getClass = async () => {
      const data = await dispatch(getAllClasses());
   };

   useEffect(() => {
      if (!currentClass || classes?.length === 0) {
         getClass();
      }
   }, [router?.pathname]);

   return (
      <div className="relative">
         <div
            className="flex w-[200px] cursor-pointer items-center justify-between gap-2 rounded-[20px] border border-[#bdbdbd] bg-white p-2"
            onClick={() => setIsOpen(!isOpen)}
         >
            <div className="flex items-center gap-2">
               {currentClass?.className && <span className="h-[24px] w-[24px] rounded-full" style={{ background: currentClass?.color }} />}
               <p className="font-medium">{currentClass?.className || "Select Class"}</p>
            </div>
            {
               <span>
                  <IoChevronDown />
               </span>
            }
         </div>

         {isOpen && (
            <div className="small-scroll-thumb fade-in absolute top-[110%] left-0 z-[5] h-[190px] w-[90vw] max-w-[200px] overflow-y-scroll rounded-[20px] border border-[#bdbdbd] bg-white shadow-md">
               {!otherClassDetails?.length ? (
                  <div className="flex h-full w-full items-center p-[1rem]">
                     <p className="text-center font-medium leading-[1.2]">No class has been added</p>
                  </div>
               ) : (
                  otherClassDetails?.map((singleClass, index) => {
                     return (
                        <div
                           key={index}
                           className="flex cursor-pointer items-center gap-2 p-2 hover:bg-blue-50"
                           onClick={() => {
                              dispatch(updateCurrentClass(singleClass));
                              setIsOpen(false);
                           }}
                        >
                           <span style={{ background: singleClass.color }} className="h-[24px] w-[24px] rounded-full" />
                           <p className="text-[.9rem] font-medium">{singleClass.className}</p>
                        </div>
                     );
                  })
               )}
            </div>
         )}
      </div>
   );
}
