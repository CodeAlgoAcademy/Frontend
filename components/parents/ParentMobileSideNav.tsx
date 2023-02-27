import React from 'react';
import NavButton from './NavButton';

const linkDetails = [
  [{title: 'Main Dashboard',image: 'Dashboard.svg',url: '/parents'}],
  [{title: 'Messages',image: 'message.svg',url: '/parents/messages'}],
  [
    {title: 'Billing',image: 'Billing.svg',url: '/parents/billing'},
    {title: 'Student Accounts',image: 'people.svg',url: '/parents/student'},
  ],
  [
    {title: 'Screen Time',image: 'screen-time.svg',url: '/parents/screen-time'},
    {title: 'Multiplayer',image: 'game.svg',url: '/parents/multiplayer'},
  ],
];

const ParentMobileSideNav = ({className}: {className?: string;}) => {
  return (
    <div
      className={`py-2 mr-[3%] min-w-[50px] flex xl:hidden divide-y sticky top-0 h-full z-20 flex-col gap-4 first:pt-0 ${className}`}
    >
      {linkDetails.map((links,index) => {
        return (
          <div className="flex gap-3 pt-4 flex-col justify-between" key={`${index}`}>
            {links.map(({title,url,image}) => {
              return (
                <NavButton {...{image,url,title,isIcon: true}} key={title} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ParentMobileSideNav;
