import React,{ReactNode,useEffect,useState} from 'react';
import {Sidebar,GeneralNav} from '@/components/index';
import {useRouter} from 'next/router';

interface Props {
   children?: ReactNode;
   className?: string;
}

const TeacherLayout = ({children,className}: Props) => {
   const router = useRouter();
   const [width,setWidth] = useState(window.innerWidth);
   const [detachedNavDisplay,setDetachedNavDisplay] = useState(false);

   useEffect(() => {
      const stringedToken = localStorage.getItem('token');
      const {user_type} = JSON.parse(`${stringedToken}`);
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize',handleResize);
      if(user_type !== "teacher") {
         router.push('/login');
      }
      return () => {
         window.removeEventListener('resize',handleResize);
      };
   },[router]);
   return (
      <div className="min-h-screen flex flex-col">
         {/* <Header /> */}
         <div className="flex items-stretch mb-auto grow">
            {width > 840 && (
               <div className="sidebar bg-white w-[280px]">
                  <Sidebar />
               </div>
            )}
            <div className={`flex-1 pr-8 pb-6`} style={{paddingLeft: width < 840 ? "32px" : "0"}} >
               <GeneralNav />
               {width < 640 && (
                  <div className="relative">
                     <div
                        className="absolute sm:hidden left-[-8px] cursor-pointer rounded-lg h-12 w-12"
                        onClick={() => {
                           setDetachedNavDisplay((prev) => !prev);
                        }}
                     >
                        <svg
                           viewBox="0 0 24 24"
                           version="1.1"
                           xmlns="http://www.w3.org/2000/svg"
                           xmlnsXlink="http://www.w3.org/1999/xlink"
                           fill="#000000"
                        >
                           <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                           <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                           <g id="SVGRepo_iconCarrier">
                              {' '}
                              <title>Menu</title>{' '}
                              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                 {' '}
                                 <g id="Menu">
                                    {' '}
                                    <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24">
                                       {' '}
                                    </rect>{' '}
                                    <line
                                       x1="5"
                                       y1="7"
                                       x2="19"
                                       y2="7"
                                       id="Path"
                                       stroke="#d9dadd"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                    >
                                       {' '}
                                    </line>{' '}
                                    <line
                                       x1="5"
                                       y1="17"
                                       x2="19"
                                       y2="17"
                                       id="Path"
                                       stroke="#d9dadd"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                    >
                                       {' '}
                                    </line>{' '}
                                    <line
                                       x1="5"
                                       y1="12"
                                       x2="19"
                                       y2="12"
                                       id="Path"
                                       stroke="#d9dadd"
                                       strokeWidth="2"
                                       strokeLinecap="round"
                                    >
                                       {' '}
                                    </line>{' '}
                                 </g>{' '}
                              </g>{' '}
                           </g>
                        </svg>
                     </div>
                     {detachedNavDisplay && (
                        <div className="absolute left-0 top-[48px] px-2 bg-white z-20 border border-gray-300 rounded-md">
                           A
                        </div>
                     )}
                  </div>
               )}
               <div className={`bg-[#ECEDF3] rounded-3xl px-[6%] py-8 mt-[44px] w-full min-h-[620px] ${className}`}>
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export default TeacherLayout;
