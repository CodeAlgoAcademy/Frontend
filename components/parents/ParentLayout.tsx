import Head from 'next/head';
import React,{ReactNode,useEffect} from 'react';

interface Props {
   children?: ReactNode;
}

const ParentLayout = ({children}: Props) => {
   return (
      <>
         <div className='parent-page min-h-screen'>{children}</div>
      </>
   );
};

export default ParentLayout;