import React,{ReactNode} from 'react';

interface Props {
   children?: ReactNode;
   title: string;
   showSublink?: boolean;
   padding: "small" | "large";
}

const DashboardBox = ({children,title,showSublink,padding}: Props) => {
   return (
      <div className='self-center'>
         <div className='rounded-2xl max-w-[550px] min-w-[420px] relative py-6 bg-white h-[340px]' style={{paddingLeft: padding === "small" ? "24px" : "44px",paddingRight: padding === "small" ? "24px" : "44px"}}>
            <div className='absolute top-9 left-11'>
               <h1 className='text-[#2073FA] text-2xl font-semibold'>{title}</h1>
            </div>
            {children}
         </div>
         {showSublink && <span className='underline block cursor-pointer mt-3 hover:text-[#2073FA] font-light text-sm ml-auto w-fit'>Edit {title} Settings</span>}
      </div>
   );
};

export default DashboardBox;