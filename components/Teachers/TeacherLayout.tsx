import React,{ReactNode,useEffect} from 'react';
import {Sidebar,GeneralNav} from '@/components/index';
import {useRouter} from 'next/router';

interface Props {
   children?: ReactNode;
   className?: string;
}

const TeacherLayout = ({children,className}: Props) => {
   const router = useRouter();
   useEffect(() => {
      const stringedToken = localStorage.getItem('token');
      const {user_type} = JSON.parse(`${stringedToken}`);
      if(user_type !== "teacher") {
         router.push('/login');
      }
   },[router]);
   return (
      <div className="min-h-screen flex flex-col">
         {/* <Header /> */}
         <div className="flex items-stretch mb-auto grow">
            <div className="sidebar bg-white w-[280px]">
               <Sidebar />
            </div>
            <div className={`flex-1 pr-8 pb-6`} >
               <GeneralNav />
               <div className={`bg-[#ECEDF3] rounded-3xl px-[6%] py-8 mt-[44px] w-full min-h-[620px] ${className}`}>
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeacherLayout;
