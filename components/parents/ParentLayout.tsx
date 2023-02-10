import React,{ReactNode,useEffect,useState} from 'react';
import SideNav from '@/components/parents/ParentSideNav';
import MobileSideNav from '@/components/parents/ParentMobileSideNav';
import Image from 'next/image';
import {useRouter} from 'next/router';

interface Props {
  children?: ReactNode;
}

const ParentLayout = ({children}: Props) => {
  const router = useRouter();
  const [detachedNavDisplay,setDetachedNavDisplay] = useState(false);
  const [width,setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize',handleResize);
    const stringedToken = localStorage.getItem('token');
    const {user_type} = JSON.parse(`${stringedToken}`);
    if(user_type !== "parent") {
      router.push('/login');
    }
    return () => {
      window.removeEventListener('resize',handleResize);
    };
  },[]);
  return (
    <>
      <div className="parent-page min-h-screen">
        <div className="flex items-stretch mb-auto grow bg-white xl:px-[4%] md:pl-0 px-4 sm:pl-0 py-11 relative">
          <MobileSideNav className="hidden sm:flex mx-6 xl:ml-0 md:mr-6" />
          <SideNav />
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
                  <MobileSideNav />
                </div>
              )}
            </div>
          )}
          <main className="main mt-12 sm:mt-0 bg-[#ECEDF3] relative z-0 rounded-2xl sm:rounded-[30px] grid place-items-centers w-full h-full py-9 px-0 sm:px-[3%] mr-[1%]">
            <div className="gap-3 w-fit absolute right-[4%] top-9 items-center mb-14 sm:flex hidden">
              <span className="relative top-1">
                <Image
                  src="/assets/message.svg"
                  alt="messages"
                  width={22}
                  height={22}
                  className="blue-svg"
                />
                <span className="w-5 h-5 absolute top-[-10px] right-[-10px] rounded-full text-xs text-white bg-[#FB4DAB] text-center leading-5 scale-75">
                  1
                </span>
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7998 1C5.27695 1 0.799805 5.47715 0.799805 11C0.799805 16.5228 5.27695 21 10.7998 21C16.3226 21 20.7998 16.5228 20.7998 11C20.7998 5.47715 16.3226 1 10.7998 1Z"
                  stroke="#2073FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.0708 17.3457C3.0708 17.3457 5.29982 14.5 10.7998 14.5C16.2998 14.5 18.5289 17.3457 18.5289 17.3457"
                  stroke="#2073FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.7998 11C12.4567 11 13.7998 9.6569 13.7998 8C13.7998 6.34315 12.4567 5 10.7998 5C9.1429 5 7.7998 6.34315 7.7998 8C7.7998 9.6569 9.1429 11 10.7998 11Z"
                  stroke="#2073FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[#2073FA] text-base">Israel</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
              >
                <path
                  d="M1.7998 1.25L9.2998 8.75L16.7998 1.25"
                  stroke="#2073FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-3 mt-4 mb-4 sm:my-9 ml-4 sm:ml-0">
              <h1 className="text-3xl text-[#2073FA] font-semibold">Israel</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="10"
                viewBox="0 0 18 10"
                className="scale-110"
                fill="none"
              >
                <path
                  d="M1.7998 1.25L9.2998 8.75L16.7998 1.25"
                  stroke="#2073FA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
