import React,{ReactNode} from 'react';
import {Sidebar,GeneralNav} from '@/components/index';
import {ClassNames} from '@emotion/react';
interface Props {
   children?: ReactNode;
   className?: string;
}

const TeacherLayout = ({children,className}: Props) => {
   return (
      <div className="min-h-screen flex flex-col">
         <GeneralNav />
         {/* <Header /> */}
         <div className="flex items-stretch mb-auto grow">
            <div className="sidebar bg-white w-[270px]">
               <Sidebar />
            </div>
            <div className={`bg-[#E5E5E5] flex-1 px-[6%] py-8 ${className}`} >
               {children}
            </div>
         </div>
      </div>
   );
};

export default TeacherLayout;
