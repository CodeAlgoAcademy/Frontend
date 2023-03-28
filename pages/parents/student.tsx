import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import React from "react";
import ContentBox from "@/components/parents/ContentBox";
import ProgressBar from "@/components/parents/ProgressBar";
import SkillBox from "@/components/parents/SkillBox";
import { BiPlusCircle } from "react-icons/bi";
import AddChildModal from "@/components/parents/AddChildModal";

const Student = () => {
   const [modalOpened, setModalOpened] = React.useState<boolean>(false);
   const openModal = () => {
      setModalOpened(true);
   };
   const closeModal = () => {
      setModalOpened(false);
   };
   return (
      <ParentLayout>
         {modalOpened && <AddChildModal closeModal={closeModal} />}
         <div className="z-[5] mb-8 flex w-full items-center justify-end text-[1.2rem] text-[#2073fa]">
            <div
               className="max-w-fit cursor-pointer p-2"
               onClick={() => {
                  openModal();
               }}
            >
               <span className="mr-2 inline-block align-middle">
                  <BiPlusCircle />
               </span>
               Add Child
            </div>
         </div>
         <div className="scale-90 overflow-x-auto sm:scale-100">
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
