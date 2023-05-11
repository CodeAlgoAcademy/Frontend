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

const Student = () => {
   const dispatch = useDispatch();
   const { children } = useSelector((state: RootState) => state.parentChild);

   if (!children || children?.length === 0) {
      return <NoChild />;
   }

   return (
      <ParentLayout>
         <div className="z-[5] mb-8 flex w-full items-center justify-end text-[1.2rem] text-[#2073fa]">
            <div
               className="max-w-fit cursor-pointer p-2"
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
            <div className="mx-auto mb-10 flex flex-wrap items-start justify-around gap-x-3 gap-y-10">
               <ContentBox size="large" title="Level" padding="small">
                  <h2 className="mt-14 text-center text-[22px] font-medium">Level 11</h2>
                  <p className="mt-2 text-center text-sm font-light">Variables & Syntax</p>
                  <div className="mt-6 ml-4">
                     <ProgressBar color="red" percentage={65} title="Progress" titleSize="base" />
                     <div className="mt-8">
                        <h3 className="font-semibold">Comprehension Tracking</h3>
                        <div className="small-scroll-thumb blue-scroll-thumb mt-3 flex h-[70px] flex-col gap-5 overflow-y-auto pr-4">
                           <ProgressBar color="green" percentage={90} title="Syntax" titleSize="small" />
                           <ProgressBar color="green" percentage={40} title="Variables" titleSize="small" />
                           <ProgressBar color="green" percentage={40} title="Variables" titleSize="small" />
                        </div>
                     </div>
                  </div>
               </ContentBox>
               <ContentBox size="large" title="Skills" padding="small">
                  <div className="mt-14 grid grid-cols-2">
                     <p className="text-center">Completed Skills</p>
                     <p className="text-center">Currently Learning</p>
                  </div>
                  <div className="mt-2 grid h-full grid-cols-2 gap-5">
                     <SkillBox></SkillBox>
                     <SkillBox></SkillBox>
                  </div>
               </ContentBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Student;
