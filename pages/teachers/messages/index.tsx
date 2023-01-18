import Messages from '@/components/Teachers/messages/Messages';
import React from 'react';
import { GeneralNav, Sidebar } from '../../../components';

const index = () => {
  return (
    <>
      <GeneralNav />
      <div className="flex items-stretch mb-auto">
        <div className="sidebar bg-white w-[270px]">
          <Sidebar />
        </div>
        <Messages />
      </div>
    </>
  );
};

export default index;
