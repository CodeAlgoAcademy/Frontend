import React from 'react';
import {ScheduleBox,NoteBox,SummaryBox} from '@/components/index';
import TeacherLayout from '@/components/Teachers/TeacherLayout';

const Dashboard = () => {
  return (
    <TeacherLayout>
      <h2 className="text-[28px] font-bold mb-6" data-testid="dashboard-heading">
        Today at a Glance
      </h2>
      <div className="flex gap-10 flex-wrap">
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
