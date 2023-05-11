import TeacherLayout from "@/components/layouts/TeacherLayout";
import React from "react";
import NoteBox from "@/components/Teachers/dashboard/NoteBox";
import SummaryBox from "@/components/Teachers/dashboard/SummaryBox";
import ScheduleBox from "@/components/Teachers/dashboard/ScheduleBox";

const Dashboard = () => {
   return (
      <TeacherLayout>
         <h2 className="mb-6 text-[28px] font-bold text-[#2073fa]" data-testid="dashboard-heading">
            Today at a Glance
         </h2>
         <div className="flex flex-col flex-wrap items-center justify-center gap-10 md:flex-row md:items-start md:justify-start">
            <SummaryBox />
            <div className="grid gap-6">
               <ScheduleBox />
               <NoteBox />
            </div>
         </div>
      </TeacherLayout>
   );
};

export default Dashboard;
