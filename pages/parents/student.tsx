import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
import React from 'react';
import ContentBox from '@/components/parents/ContentBox';
import ProgressBar from '@/components/parents/ProgressBar';
import SkillBox from '@/components/parents/SkillBox';

const Student = () => {
  return (
    <ParentLayout>
      <div className="w-full flex flex-col gap-y-6">
        <ContentBox size="large" title="Level" padding="small">
          <h2 className="text-center text-[22px] font-medium mt-14">Level 11</h2>
          <p className="text-center font-light text-sm mt-2">Variables & Syntax</p>
          <div className="mt-6 ml-4">
            <ProgressBar color="red" percentage={65} title="Progress" titleSize="base" />
            <div className="mt-8">
              <h3 className="font-semibold">Comprehension Tracking</h3>
              <div className="flex flex-col gap-5 mt-3 overflow-y-auto h-[70px] small-scroll-thumb blue-scroll-thumb pr-4">
                <ProgressBar color="green" percentage={90} title="Syntax" titleSize="small" />
                <ProgressBar color="green" percentage={40} title="Variables" titleSize="small" />
                <ProgressBar color="green" percentage={40} title="Variables" titleSize="small" />
              </div>
            </div>
          </div>
        </ContentBox>
        <ContentBox size="large" title="Skills" padding="small">
          <div className="grid grid-cols-2 mt-14">
            <p className="text-center">Completed Skills</p>
            <p className="text-center">Currently Learning</p>
          </div>
          <div className="grid mt-2 grid-cols-2 gap-5 h-full">
            <SkillBox></SkillBox>
            <SkillBox></SkillBox>
          </div>
        </ContentBox>
      </div>
    </ParentLayout>
  );
};

export default Student;
