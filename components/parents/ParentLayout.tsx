import React,{ReactNode} from 'react';
import SideNav from '@/components/parents/ParentSideNav';
import MobileSideNav from '@/components/parents/ParentMobileSideNav';
import Image from 'next/image';

interface Props {
   children?: ReactNode;
}

const ParentLayout = ({children}: Props) => {
   return (
      <>
         <div className='parent-page min-h-screen' >
            <div className='flex items-stretch mb-auto grow bg-white px-[3%] py-11 relative'>
               <MobileSideNav />
               <SideNav />
               <main className='main bg-[#ECEDF3] rounded-[30px] grid place-items-centers w-full h-full py-9 px-[4%] mr-[1%]'>
                  <div className='flex gap-3 w-fit ml-auto items-center mb-14'>
                     <span className='relative top-1'>
                        <Image src="/assets/message.svg" alt="messages" width={22} height={22} className="blue-svg" />
                        <span className='w-5 h-5 absolute top-[-10px] right-[-10px] rounded-full text-xs text-white bg-[#FB4DAB] text-center leading-5 scale-75'>1</span>
                     </span>
                     <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7998 1C5.27695 1 0.799805 5.47715 0.799805 11C0.799805 16.5228 5.27695 21 10.7998 21C16.3226 21 20.7998 16.5228 20.7998 11C20.7998 5.47715 16.3226 1 10.7998 1Z" stroke="#2073FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.0708 17.3457C3.0708 17.3457 5.29982 14.5 10.7998 14.5C16.2998 14.5 18.5289 17.3457 18.5289 17.3457" stroke="#2073FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.7998 11C12.4567 11 13.7998 9.6569 13.7998 8C13.7998 6.34315 12.4567 5 10.7998 5C9.1429 5 7.7998 6.34315 7.7998 8C7.7998 9.6569 9.1429 11 10.7998 11Z" stroke="#2073FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <span className='text-[#2073FA] text-base'>Israel</span>
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path d="M1.7998 1.25L9.2998 8.75L16.7998 1.25" stroke="#2073FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
                  <div className='flex items-center gap-3 mb-9'>
                     <h1 className='text-3xl text-[#2073FA] font-semibold'>Connor</h1>
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" className='scale-110' fill="none">
                        <path d="M1.7998 1.25L9.2998 8.75L16.7998 1.25" stroke="#2073FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </div>
                  {children}
               </main>
            </div>
         </div>
      </>
   );
};

export default ParentLayout;