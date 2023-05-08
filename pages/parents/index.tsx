import BarChart from "@/components/parents/UI/BarChart";
import ContentBox from "@/components/parents/UI/ContentBox";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import ParentLayout from "@/components/layouts/ParentLayout";
import ProgressBar from "@/components/parents/UI/ProgressBar";
import SkillBox from "@/components/parents/student/SkillBox";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChildren } from "store/parentChildSlice";

const Dashboard = () => {
   return (
      <ParentLayout>
         <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className="mx-auto mb-6 flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
               <ContentBox size="base" title="Level" padding="small">
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
               <ContentBox size="base" title="Skills" padding="small">
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
            <div className="mx-auto mb-6 flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
               <ContentBox size="base" title="Screen Time" padding="large" showSublink={true} link="parents/screen-time">
                  <BarChart data={[2.4, 3.1, 4, 3.9, 3.5, 2.9, 3]} barSpace={9.6} barWidth={3.3} maxHours={4} />
               </ContentBox>
               <ContentBox size="base" title="Multiplayer" padding="large" showSublink={true} link="parents/multiplayer">
                  <RecentInteraction />
               </ContentBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;
