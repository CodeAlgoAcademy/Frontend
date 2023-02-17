import TeacherLayout from '@/components/Teachers/TeacherLayout';
import React from 'react';
import {ScheduleBox,NoteBox,SummaryBox} from 'components';

const Dashboard = () => {
  return (
    <TeacherLayout>
      <h2 className="text-[28px] text-[#2073fa] font-bold mb-6" data-testid="dashboard-heading">
        Today at a Glance
      </h2>
      <div className="flex gap-10 flex-wrap md:flex-row flex-col md:justify-start md:items-start justify-center items-center">
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
