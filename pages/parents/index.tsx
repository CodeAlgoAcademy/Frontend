import BarChart from "@/components/parents/UI/BarChart";
import ContentBox from "@/components/parents/UI/ContentBox";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import ParentLayout from "@/components/layouts/ParentLayout";
import ProgressBar from "@/components/parents/UI/ProgressBar";
import SkillBox from "@/components/parents/student/SkillBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChildren, getChildProgress, getChildSkills } from "store/parentChildSlice";
import { RootState } from "store/store";
import { IParentChild, screentimeTypes } from "types/interfaces";
import Skills from "@/components/parents/student/Skills";
import Level from "@/components/parents/student/Level";
import Screentime from "@/components/parents/screentime/Screentime";

const Dashboard = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getChildren());
   }, []);

   return (
      <ParentLayout title="Dashboard">
         <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className=" mb-6 grid max-w-fit grid-cols-1 justify-start gap-x-6 gap-y-8 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
               <Level size="base" />
               <Skills size="base" />
               <Screentime size="base" />
               <RecentInteraction />
            </div>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;
