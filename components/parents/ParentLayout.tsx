import Head from 'next/head';
import React,{ReactNode,useEffect} from 'react';
import SideNav from '@/components/parents/ParentSideNav';

interface Props {
   children?: ReactNode;
}

const ParentLayout = ({children}: Props) => {
   return (
      <>
         <div className='parent-page min-h-screen'>
            <div className='flex items-stretch mb-auto grow bg-white p-11 relative'>
               <SideNav />
               <main className='main bg-[#ECEDF3] rounded-[30px] w-full h-full py-9 px-20'>
                  {children}
               </main>
            </div>
         </div>
      </>
   );
};

export default ParentLayout;