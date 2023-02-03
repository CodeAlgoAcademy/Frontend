import Link from 'next/link';
import React,{ReactNode} from 'react';

interface Props {
   children?: ReactNode;
   title: string;
   showSublink?: boolean;
   padding: "small" | "large";
   size: "base" | "large";
}
// Note: The title parameter should alao be the same name as the path of the sublink & spacing is replaced with '-' for the link href
const ContentBox = ({children,title,showSublink,padding,size}: Props) => {
   return (
      <div className='self-center overflow-y-clip overflow-x-auto sm:overflow-x-hidden short-scroll-thumb relative' style={{width: size === "large" ? "100%" : "auto"}}>
         <div className='rounded-2xl sm:min-w-[440px] relative py-6 bg-white h-[340px]' style={{paddingLeft: padding === "small" ? "24px" : "44px",paddingRight: padding === "small" ? "24px" : "44px",minWidth: size === "large" ? "100%" : "420px",maxWidth: size === "large" ? "100%" : "550px"}}>
            <div className='absolute top-9 left-11'>
               <h1 className='text-[#2073FA] text-2xl font-semibold'>{title}</h1>
            </div>
            {children}
         </div>
         <div className='mb-3 sm:mb-0'>
            {showSublink &&
               <Link href={`/parents/${title.replace(/\s+/g,'-').toLowerCase()}`}>
                  <span className='underline block cursor-pointer mt-3 hover:text-[#2073FA] font-light text-sm ml-auto w-fit'>
                     Edit {title} Settings
                  </span>
               </Link>
            }
         </div>
      </div>
   );
};

export default ContentBox;