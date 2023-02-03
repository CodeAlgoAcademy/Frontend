import DashboardBox from '@/components/parents/DashboardBox';
import ParentLayout from '@/components/parents/ParentLayout';
import ProgressBar from '@/components/parents/ProgressBar';
import SkillBox from '@/components/parents/SkillBox';
import Image from 'next/image';
import React from 'react';

const Dashboard = () => {
   return (
      <ParentLayout>
         < div className=''>
            <div className='flex items-start justify-around flex-wrap mx-auto gap-x-4 gap-y-10 mb-10'>
               <DashboardBox title='Level' padding='large'>
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
               </DashboardBox>
               <DashboardBox title='Skills' padding='small'>
                  <div className='grid grid-cols-2 mt-14'>
                     <p className='text-center'>Completed Skills</p>
                     <p className='text-center'>Currently Learning</p>
                  </div>
                  <div className='grid mt-2 grid-cols-2 gap-5 h-full'>
                     <SkillBox></SkillBox>
                     <SkillBox></SkillBox>
                  </div>
               </DashboardBox>
            </div>
            <div className='flex items-start justify-around flex-wrap mx-auto gap-x-4 gap-y-10 mb-6'>
               <DashboardBox title='Screen Time' padding='large' showSublink={true}>
                  <p className='mt-14 text-sm font-light'>Daily Average</p>
                  <h1 className='text-3xl font-semibold'>1h 32m</h1>
               </DashboardBox>
               <DashboardBox title='Multiplayer' padding='large' showSublink={true}>
                  <p className='mt-14 text-sm font-light'>Recent interactions (last 30 days)</p>
               </DashboardBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;