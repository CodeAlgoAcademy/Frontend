import BarChart from '@/components/parents/BarChart';
import ContentBox from '@/components/parents/ContentBox';
import RecentInteraction from '@/components/parents/RecentInteraction';
import ParentLayout from '@/components/parents/ParentLayout';
import ProgressBar from '@/components/parents/ProgressBar';
import SkillBox from '@/components/parents/SkillBox';
import React from 'react';

const Dashboard = () => {
   return (
      <ParentLayout>
         < div className='overflow-x-auto scale-90 sm:scale-100 relative bottom-14 sm:bottom-0 mb-[-120px] sm:mb-0'>
            <div className='flex items-start justify-around flex-wrap mx-auto gap-x-3 gap-y-10 mb-10'>
               <ContentBox size="base" title='Level' padding='small'>
                  <h2 className='text-center text-[22px] font-medium mt-14'>Level 11</h2>
                  <p className='text-center font-light text-sm mt-2'>Variables & Syntax</p>
                  <div className='mt-6 ml-4'>
                     <ProgressBar color='red' percentage={65} title="Progress" titleSize='base' />
                     <div className='mt-8'>
                        <h3 className='font-semibold'>Comprehension Tracking</h3>
                        <div className='flex flex-col gap-5 mt-3 overflow-y-auto h-[70px] small-scroll-thumb blue-scroll-thumb pr-4'>
                           <ProgressBar color='green' percentage={90} title="Syntax" titleSize='small' />
                           <ProgressBar color='green' percentage={40} title="Variables" titleSize='small' />
                           <ProgressBar color='green' percentage={40} title="Variables" titleSize='small' />
                        </div>
                     </div>
                  </div>
               </ContentBox>
               <ContentBox size="base" title='Skills' padding='small'>
                  <div className='grid grid-cols-2 mt-14'>
                     <p className='text-center'>Completed Skills</p>
                     <p className='text-center'>Currently Learning</p>
                  </div>
                  <div className='grid mt-2 grid-cols-2 gap-5 h-full'>
                     <SkillBox></SkillBox>
                     <SkillBox></SkillBox>
                  </div>
               </ContentBox>
            </div>
            <div className='flex items-start justify-around flex-wrap mx-auto gap-x-3 gap-y-10 mb-6'>
               <ContentBox size="base" title='Screen Time' padding='large' showSublink={true} link="parents/screen-time">
                  <BarChart data={[2.4,3.1,4,3.9,3.5,2.9,3]} barSpace={9.6} barWidth={3.3} maxHours={4} />
               </ContentBox>
               <ContentBox size="base" title='Multiplayer' padding='large' showSublink={true} link="parents/multiplayer">
                  <RecentInteraction />
               </ContentBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;