import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
import React from 'react';
import ContentBox from '@/components/parents/ContentBox';
import BarChart from '@/components/parents/BarChart';

const ScreenTime = () => {
   return (
      <ParentLayout>
         <div className='overflow-x-auto flex flex-col gap-9 mx-4 sm:mx-0'>
            <ContentBox size="large" title='Screen Time' padding='large'>
               <BarChart data={[2.8,6.5,4,5,3.5,7,3]} barSpace={9.6} barWidth={3.3} maxHours={8} />
            </ContentBox>
            <ContentBox size="large" title='Current screen time restrictions' padding='large'></ContentBox>
         </div>
      </ParentLayout>
   );
};

export default ScreenTime;