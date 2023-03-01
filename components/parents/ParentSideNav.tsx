import React from 'react';
import NavButton from '@/components/parents/NavButton';

const SideNav = () => {
  return (
    <div className="parent-sidenav hidden xl:flex min-w-[240px] gap-14 flex-col mr-[4%] mt-3 h-full sticky top-[-5.5rem] flex-auto">
      <div>
        <h1 className="text-[#2073fa] font-semibold text-[32px] leading-10 text-center">
          CodeAlgo
        </h1>
      </div>
      <div>
        <NavButton title="Main Dashboard" image="Dashboard.svg" url="/parents" />
      </div>
      <div className="relative">
        <NavButton title="Messages" image="message.svg" url="/parents/messages" notification={1} />
      </div>
      <div>
        <h2 className="text-xl text-[#A8ABB0] ml-7 font-medium mb-3">ACCOUNT</h2>
        <NavButton title="Billing" image="Billing.svg" url="/parents/billing" />
        <NavButton title="Student Accounts" image="people.svg" url="/parents/student" />
      </div>
      <div>
        <h2 className="text-xl text-[#A8ABB0] ml-7 font-medium mb-3">SAFETY</h2>
        <NavButton title="Screen Time" image="screen-time.svg" url="/parents/screen-time" />
        <NavButton title="Multiplayer" image="game.svg" url="/parents/multiplayer" />
      </div>
      <span className="text-center justify-self-end text-[#2073FA]">Get Help</span>
    </div>
  );
};

export default SideNav;
