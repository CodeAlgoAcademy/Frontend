import ParentLayout from "@/components/layouts/ParentLayout";
import React from "react";
import ContentBox from "@/components/parents/UI/ContentBox";
import ProgressBar from "@/components/parents/UI/ProgressBar";
import SkillBox from "@/components/parents/student/SkillBox";
import { BiPlusCircle } from "react-icons/bi";
import { openAddChildModal } from "store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import NoChild from "@/components/parents/UI/NoChild";
import Skills from "@/components/parents/student/Skills";
import Level from "@/components/parents/student/Level";
import StudentProfile from "@/components/parents/student/StudentProfile";

const Student = () => {
   const dispatch = useDispatch();
   const parent = useSelector((state: RootState) => state.parentChild);

   if (!parent?.children || parent?.children?.length === 0) {
      return <NoChild />;
   }

   return (
      <ParentLayout>
         <div className="z-[5] mb-8 flex w-full items-center justify-end text-[1.2rem] text-[#2073fa]">
            <div
               className="z-[5] max-w-fit cursor-pointer p-2"
               onClick={() => {
                  dispatch(openAddChildModal());
               }}
               data-testid="add-child"
            >
               <span className="mr-2 inline-block align-middle">
                  <BiPlusCircle />
               </span>
               Add Child
            </div>
         </div>
         <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <StudentProfile />
            <div className=" mb-6 flex w-full flex-col gap-y-8">
               <Level size="large" />
               <Skills size="large" />
            </div>
         </div>
      </ParentLayout>
   );
};

export default Student;
