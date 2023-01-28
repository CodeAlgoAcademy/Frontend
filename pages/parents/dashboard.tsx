import DashboardBox from '@/components/parents/DashboardBox';
import ParentLayout from '@/components/parents/ParentLayout';
import ProgressBar from '@/components/parents/ProgressBar';
import SkillBox from '@/components/parents/SkillBox';
import Image from 'next/image';
import React from 'react';

const Dashboard = () => {
   return (
      <ParentLayout>
         <div className='flex items-stretch mb-auto grow bg-white p-11 relative'>
            <div className='parent-sidenav w-80 gap-14 flex flex-col mr-[70px] mt-3 h-full sticky top-8 flex-auto'>
               <div><h1 className='text-[#2073fa] font-semibold text-[32px] leading-10 text-center'>CodeAlgo</h1></div>
               <div>
                  <button className='py-4 px-7 flex items-center gap-5 bg-[#2073FA] rounded-3xl w-full'>
                     <Image src="/assets/Dashboard.svg" alt="Dashboard" width={20} height={20} />
                     <p className='text-white font-semibold select-none'>Main Dashboard</p>
                  </button>
               </div>
               <div className='relative'>
                  <button className='py-4 px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl'>
                     <Image src="/assets/message.svg" alt="Dashboard" width={20} height={20} />
                     <p className='font-medium select-none'>Messages</p>
                     <span className='w-5 h-5 rounded-full text-sm text-white bg-[#FB4DAB]'>1</span>
                  </button>
                  <span></span>
               </div>
               <div>
                  <h2 className='text-xl text-[#A8ABB0] ml-7 font-medium'>ACCOUNT</h2>
                  <button className='py-4 px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl'>
                     <Image src="/assets/Billing.svg" alt="Dashboard" width={20} height={20} />
                     <p className='font-medium select-none'>Billing</p>
                  </button>
                  <button className='py-4 px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl'>
                     <Image src="/assets/people.svg" alt="Dashboard" width={20} height={20} />
                     <p className='font-medium select-none'>Student Accounts</p>
                  </button>
               </div>
               <div>
                  <h2 className='text-xl text-[#A8ABB0] ml-7 font-medium'>SAFETY</h2>
                  <button className='py-4 px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl'>
                     <Image src="/assets/screen-time.svg" alt="Dashboard" width={20} height={20} />
                     <p className='font-medium select-none'>Screen Time</p>
                  </button>
                  <button className='py-4 px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl'>
                     <Image src="/assets/game.svg" alt="Dashboard" width={20} height={20} />
                     <p className='font-medium select-none'>Multiplayer</p>
                  </button>
               </div>
               <span className='text-center justify-self-end text-[#2073FA]'>Get Help</span>
            </div>
            <main className='main bg-[#ECEDF3] rounded-[30px] w-full h-full py-9 px-20'>
               <div className='flex gap-3 w-fit ml-auto items-center mb-14'>
                  <span className='relative'>
                     <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z" stroke="#2073FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M21 3L11 10L1 3" stroke="#2073FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                     </svg>
                     <span className='w-5 h-5 absolute top-[-10px] right-[-10px] rounded-full text-xs text-white bg-[#FB4DAB] text-center leading-5 scale-75'>1</span>
                  </span>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10.7998 1C5.27695 1 0.799805 5.47715 0.799805 11C0.799805 16.5228 5.27695 21 10.7998 21C16.3226 21 20.7998 16.5228 20.7998 11C20.7998 5.47715 16.3226 1 10.7998 1Z" stroke="#2073FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                     <path d="M3.0708 17.3457C3.0708 17.3457 5.29982 14.5 10.7998 14.5C16.2998 14.5 18.5289 17.3457 18.5289 17.3457" stroke="#2073FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                     <path d="M10.7998 11C12.4567 11 13.7998 9.6569 13.7998 8C13.7998 6.34315 12.4567 5 10.7998 5C9.1429 5 7.7998 6.34315 7.7998 8C7.7998 9.6569 9.1429 11 10.7998 11Z" stroke="#2073FA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span className='text-[#2073FA] text-base'>Israel</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                     <path d="M1.7998 1.25L9.2998 8.75L16.7998 1.25" stroke="#2073FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
               </div>
               <div className='flex items-center gap-3 mb-9'>
                  <h1 className='text-3xl text-[#2073FA] font-semibold'>Connor</h1>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" className='scale-110' fill="none">
                     <path d="M1.7998 1.25L9.2998 8.75L16.7998 1.25" stroke="#2073FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
               </div>
               < div className='grid grid-cols-2 justify-around gap-11'>
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

                  <DashboardBox title='Screen Time' padding='large' showSublink={true}>
                     <p className='mt-14 text-sm font-light'>Daily Average</p>
                     <h1 className='text-3xl font-semibold'>1h 32m</h1>
                  </DashboardBox>
                  <DashboardBox title='Multiplayer' padding='large' showSublink={true}>
                     <p className='mt-14 text-sm font-light'>Recent interactions (last 30 days)</p>
                  </DashboardBox>
               </div>
            </main>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;