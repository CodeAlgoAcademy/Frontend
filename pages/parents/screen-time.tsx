import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
import React from 'react';
import ContentBox from '@/components/parents/ContentBox';
import BarChart from '@/components/parents/BarChart';

const ScreenTime = () => {
   return (
      <ParentLayout>
         <div className='flex flex-col gap-9'>
            <ContentBox size="large" title='Screen Time' padding='large'>
               <BarChart data={[2.4,3.1,4,3.9,3.5,2.9,3]} barSpace={9.6} barWidth={3.3} maxHours={4} />
            </ContentBox>
            <ContentBox size="large" title='Current screen time restrictions' padding='large'></ContentBox>
         </div>
      </ParentLayout>
   );
};

export default ScreenTime;